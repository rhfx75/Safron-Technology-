/**
 * catalog — normalises raw data exactly once and is the single source of truth
 * for category identity.
 *
 * The root defect this module exists to kill: a product stores its category as a
 * *key* (`fire-protection-system`), while links and URLs use a *slug*
 * (`fire-protection`). For three of five categories those strings are identical,
 * which is why a slug lookup silently returned 0 for only the two largest
 * categories. Here a category is resolved through one normalised key, and every
 * consumer reads `categorySlug` / `categoryName` computed once.
 */
import type { Product, ProductCategory, ProductSubCategory, RawCatalog } from './productsSource'

export const UNCATEGORIZED_SLUG = 'uncategorized'
export const UNCATEGORIZED_NAME = 'Uncategorized'

export interface CatalogProduct extends Product {
  /** Canonical URL slug, e.g. "fire-protection" — safe for links. */
  categorySlug: string
  /** Display label, e.g. "Fire Protection System". */
  categoryName: string
  /** Canonical key, e.g. "fire-protection-system". */
  categoryKey: string
}

export interface CatalogCategory {
  key: string
  slug: string
  name: string
  icon: string
  image: string | null
  description: string
  order: number
  subCategories: ProductSubCategory[]
}

export interface CatalogBrand {
  /** Display name as used by products, e.g. "NAFFCO". */
  name: string
  /** Normalised match key, e.g. "naffco". */
  key: string
  /** Matching id from brands.ts when one exists. */
  brandId: string | null
  description: string
  image: string | null
}

export interface Catalog {
  products: CatalogProduct[]
  categories: CatalogCategory[]
  brands: CatalogBrand[]
  models: string[]
  uncategorized: CatalogProduct[]
}

/**
 * Normalised match key: lowercase, trim, treat "&" and "and" identically,
 * strip punctuation, collapse whitespace.
 */
export function normalizeKey(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Explicit aliases for variants that actually exist in this dataset. Each entry
 * exists because the raw data contains that spelling somewhere; the map is
 * deliberately small and commented rather than clever.
 */
export const CATEGORY_ALIASES: Record<string, string> = {
  // products.ts stores the key, but every link/URL uses the shorter `slug`.
  'fire protection': 'fire-protection-system',
  'fire detection': 'fire-detection-system',
  // Human-written variants that appear in headings and copy.
  'fire detection and alarm': 'fire-detection-system',
  'fire detection and alarm system': 'fire-detection-system',
  'fire protection system': 'fire-protection-system',
  'fire rated doors and emergency exit solutions': 'fire-rated-doors',
  'fire rated doors': 'fire-rated-doors',
  'passive fire protection system': 'passive-fire-protection',
  'passive fire protection': 'passive-fire-protection',
  'electrical and lightning safety system': 'electrical-safety',
  'electrical and lightning safety': 'electrical-safety',
  'electrical safety': 'electrical-safety',
}

export interface CategoryIndex {
  /** every normalised spelling -> canonical key */
  lookup: Map<string, string>
  byKey: Map<string, CatalogCategory>
}

export function buildCategoryIndex(rawCategories: ProductCategory[]): CategoryIndex {
  const lookup = new Map<string, string>()
  const byKey = new Map<string, CatalogCategory>()

  rawCategories.forEach((raw, order) => {
    const category: CatalogCategory = {
      key: raw.key,
      slug: raw.slug,
      name: raw.label,
      icon: raw.icon,
      image: raw.image,
      description: raw.description,
      order,
      subCategories: raw.subCategories,
    }
    byKey.set(category.key, category)

    const spellings = [category.key, category.slug, category.name, category.name.replace(/&/g, 'and')]
    for (const spelling of spellings) {
      const normalised = normalizeKey(spelling)
      if (normalised) lookup.set(normalised, category.key)
    }
  })

  for (const [alias, key] of Object.entries(CATEGORY_ALIASES)) {
    if (!byKey.has(key)) continue
    lookup.set(normalizeKey(alias), key)
  }

  return { lookup, byKey }
}

/** Resolve any category spelling (key, slug, label, or alias) to a canonical key. */
export function resolveCategoryKey(
  value: string | undefined | null,
  index: CategoryIndex
): string | null {
  if (!value) return null
  const normalised = normalizeKey(value)
  if (!normalised) return null
  const direct = index.lookup.get(normalised)
  if (direct) return direct
  const viaAlias = CATEGORY_ALIASES[value.toLowerCase().trim()]
  if (viaAlias && index.byKey.has(viaAlias)) return viaAlias
  return null
}

function brandKey(name: string): string {
  return normalizeKey(name)
}

export function buildCatalog(raw: RawCatalog): Catalog {
  const index = buildCategoryIndex(raw.categories)
  const uncategorized: CatalogProduct[] = []

  const products: CatalogProduct[] = raw.products.map((product) => {
    const key = resolveCategoryKey(product.category, index)
    const category = key ? index.byKey.get(key) : undefined

    const normalised: CatalogProduct = {
      ...product,
      categoryKey: category?.key ?? UNCATEGORIZED_SLUG,
      categorySlug: category?.slug ?? UNCATEGORIZED_SLUG,
      categoryName: category?.name ?? UNCATEGORIZED_NAME,
    }

    if (!category) uncategorized.push(normalised)
    return normalised
  })

  const categories = [...index.byKey.values()].sort((a, b) => a.order - b.order)
  if (uncategorized.length > 0) {
    categories.push({
      key: UNCATEGORIZED_SLUG,
      slug: UNCATEGORIZED_SLUG,
      name: UNCATEGORIZED_NAME,
      icon: 'Shield',
      image: null,
      description: 'Products whose category could not be matched to the canonical list.',
      order: categories.length,
      subCategories: [],
    })
  }

  const brandMap = new Map<string, CatalogBrand>()
  for (const brand of raw.brands) {
    const key = brandKey(brand.name)
    if (!brandMap.has(key)) {
      brandMap.set(key, {
        name: brand.name,
        key,
        brandId: brand.id,
        description: brand.description,
        image: brand.image,
      })
    }
  }
  for (const product of products) {
    const name = (product.brand ?? '').trim()
    if (!name) continue
    const key = brandKey(name)
    if (!brandMap.has(key)) {
      brandMap.set(key, { name, key, brandId: null, description: '', image: null })
    }
  }

  const brands = [...brandMap.values()].sort((a, b) => a.name.localeCompare(b.name))
  const models = [...new Set(products.map((p) => (p.model ?? '').trim()).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  )

  return { products, categories, brands, models, uncategorized }
}

/** Convenience lookup used by detail pages and cards. */
export function findCategoryByAny(catalog: Catalog, value: string | undefined | null): CatalogCategory | undefined {
  if (!value) return undefined
  const index = buildCategoryIndex([])
  for (const category of catalog.categories) {
    index.byKey.set(category.key, category)
    for (const spelling of [category.key, category.slug, category.name]) {
      const normalised = normalizeKey(spelling)
      if (normalised) index.lookup.set(normalised, category.key)
    }
  }
  const key = resolveCategoryKey(value, index)
  return key ? index.byKey.get(key) : undefined
}
