/**
 * productsSource — the ONLY module allowed to read raw product/category/brand data.
 *
 * Everything else in the app goes through `catalog.ts` (normalisation) and
 * `selectors.ts` (derivation), reached via `useCatalog()`.
 *
 * This module also re-exports the presentational helpers that live alongside the
 * raw data (icon map, WhatsApp config, catalogue documents) so that no page needs
 * to import `products.ts` directly.
 */
import { products as rawProducts, productCategories as rawCategories } from './products'
import { brands as rawBrands } from './brands'
import type { Product, ProductCategory } from './products'
import type { Brand } from './brands'

export { whatsAppConfig, getProductIcon, catalogueDocuments } from './products'
export type {
  Product,
  ProductCategory,
  ProductSubCategory,
  ProductDocument,
  Specification,
  CatalogueDocument,
  WhatsAppConfig,
} from './products'
export type { Brand } from './brands'

/** Raw, un-normalised catalog exactly as stored. */
export interface RawCatalog {
  products: Product[]
  categories: ProductCategory[]
  brands: Brand[]
}

/**
 * Async so the UI has a real loading state today, and so swapping the static
 * arrays for an API call later requires no change in any consumer.
 */
export async function loadCatalog(): Promise<RawCatalog> {
  return {
    products: rawProducts,
    categories: rawCategories,
    brands: rawBrands,
  }
}
