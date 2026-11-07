/**
 * selectors — the ONLY way to derive numbers or lists from the catalog.
 *
 * Every count shown anywhere in the UI comes out of this file, so the homepage,
 * the products page and the detail pages cannot disagree: they render the same
 * arithmetic over the same normalised array.
 */
import type { CatalogCategory, CatalogProduct } from './catalog'

export interface Totals {
  products: number
  categories: number
  brands: number
}

export interface CategoryCount {
  key: string
  slug: string
  name: string
  icon: string
  count: number
  order: number
}

export interface BrandCount {
  name: string
  key: string
  count: number
}

export interface ProductFilters {
  q?: string
  brand?: string
  model?: string
  availability?: string
  categorySlug?: string
  subCategorySlug?: string
}

/** Locale-grouped integer, e.g. 1204 -> "1,204". */
export function formatCount(value: number): string {
  return value.toLocaleString('en-US')
}

/** "0 products" / "1 product" / "1,204 products" */
export function plural(count: number, singular: string, pluralForm?: string): string {
  const word = count === 1 ? singular : (pluralForm ?? `${singular}s`)
  return `${formatCount(count)} ${word}`
}

function distinctBrandKeys(products: CatalogProduct[]): Set<string> {
  const keys = new Set<string>()
  for (const product of products) {
    const brand = (product.brand ?? '').trim()
    if (brand) keys.add(brand.toLowerCase())
  }
  return keys
}

export function getTotals(products: CatalogProduct[]): Totals {
  return {
    products: products.length,
    categories: new Set(products.map((p) => p.categorySlug)).size,
    brands: distinctBrandKeys(products).size,
  }
}

/**
 * Counts for every canonical category, including ones with zero products.
 * Order follows the canonical list so homepage cards and the sidebar always agree.
 */
export function getCategoryCounts(
  products: CatalogProduct[],
  categories: CatalogCategory[]
): CategoryCount[] {
  const counts = new Map<string, number>()
  for (const product of products) {
    counts.set(product.categorySlug, (counts.get(product.categorySlug) ?? 0) + 1)
  }
  return categories.map((category) => ({
    key: category.key,
    slug: category.slug,
    name: category.name,
    icon: category.icon,
    order: category.order,
    count: counts.get(category.slug) ?? 0,
  }))
}

export function getBrandCounts(products: CatalogProduct[]): BrandCount[] {
  const counts = new Map<string, BrandCount>()
  for (const product of products) {
    const name = (product.brand ?? '').trim()
    if (!name) continue
    const key = name.toLowerCase()
    const existing = counts.get(key)
    if (existing) existing.count += 1
    else counts.set(key, { name, key, count: 1 })
  }
  return [...counts.values()].sort((a, b) => a.name.localeCompare(b.name))
}

export function getSubCategoryCounts(
  products: CatalogProduct[],
  categorySlug: string
): Map<string, number> {
  const counts = new Map<string, number>()
  for (const product of products) {
    if (product.categorySlug !== categorySlug) continue
    const key = product.subcategory
    if (!key) continue
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return counts
}

/** Featured first, then alphabetical. Deterministic, so cards never reshuffle. */
export function getFeatured(products: CatalogProduct[], limit: number): CatalogProduct[] {
  return [...products]
    .sort((a, b) => {
      const featuredDelta = Number(Boolean(b.featured)) - Number(Boolean(a.featured))
      if (featuredDelta !== 0) return featuredDelta
      return a.name.localeCompare(b.name)
    })
    .slice(0, limit)
}

export function getRelated(
  products: CatalogProduct[],
  product: CatalogProduct,
  limit: number
): CatalogProduct[] {
  return products
    .filter(
      (candidate) => candidate.id !== product.id && candidate.categorySlug === product.categorySlug
    )
    .slice(0, limit)
}

export function findProductBySlug(
  products: CatalogProduct[],
  slug: string | undefined
): CatalogProduct | undefined {
  if (!slug) return undefined
  return products.find((product) => product.slug === slug)
}

function matchesQuery(product: CatalogProduct, query: string): boolean {
  const haystack: (string | undefined)[] = [
    product.name,
    product.brand,
    product.model,
    product.categoryName,
    product.subcategory,
    product.shortDescription,
    product.description,
    ...(product.keywords ?? []),
  ]
  return haystack.some((value) => (value ?? '').toLowerCase().includes(query))
}

export function filterProducts(
  products: CatalogProduct[],
  filters: ProductFilters
): CatalogProduct[] {
  let list = products

  if (filters.categorySlug) {
    list = list.filter((product) => product.categorySlug === filters.categorySlug)
  }
  if (filters.subCategorySlug) {
    list = list.filter((product) => product.subcategory === filters.subCategorySlug)
  }
  if (filters.q) {
    const query = filters.q.toLowerCase().trim()
    if (query) list = list.filter((product) => matchesQuery(product, query))
  }
  if (filters.brand) {
    const brand = filters.brand.toLowerCase().trim()
    list = list.filter((product) => (product.brand ?? '').toLowerCase().trim() === brand)
  }
  if (filters.model) {
    list = list.filter((product) => (product.model ?? '').trim() === filters.model)
  }
  if (filters.availability) {
    list = list.filter((product) => (product.availability ?? '') === filters.availability)
  }

  return list
}

export type SortOption = 'featured' | 'name-asc' | 'name-desc' | 'recent'

export function sortProducts(products: CatalogProduct[], sort: SortOption): CatalogProduct[] {
  const sorted = [...products]
  if (sort === 'name-asc') return sorted.sort((a, b) => a.name.localeCompare(b.name))
  if (sort === 'name-desc') return sorted.sort((a, b) => b.name.localeCompare(a.name))
  if (sort === 'recent') return sorted
  return sorted.sort((a, b) => {
    const featuredDelta = Number(Boolean(b.featured)) - Number(Boolean(a.featured))
    if (featuredDelta !== 0) return featuredDelta
    return a.name.localeCompare(b.name)
  })
}
