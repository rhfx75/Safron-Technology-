import { useState, useCallback, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import {
  productCategories,
  products,
  getProductsByCategory,
  getProductCount,
  findCategory,
  getProductIcon,
  getCategoryProductCount,
} from '../data/products'
import { Search, Grid, ChevronRight } from 'lucide-react'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured Products' },
  { value: 'name-asc', label: 'Product Name: A–Z' },
  { value: 'name-desc', label: 'Product Name: Z–A' },
  { value: 'recent', label: 'Recently Added' },
] as const

interface ProductsProps {
  category?: string
}

export function Products({ category: initialCategory }: ProductsProps) {
  const [searchParams] = useSearchParams()
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const navigate = useNavigate()

  const urlCategory = searchParams.get('category') || initialCategory || ''
  const urlSubcategory = searchParams.get('subcategory') || ''
  const urlSearch = searchParams.get('search') || ''
  const urlSort = searchParams.get('sort') || 'featured'
  const urlBrand = searchParams.get('brand') || ''
  const urlModel = searchParams.get('model') || ''
  const urlAvailability = searchParams.get('availability') || ''

  const activeCategoryKey = useMemo(() => {
    if (!urlCategory) return null
    const cat = findCategory(urlCategory)
    return cat ? cat.key : urlCategory
  }, [urlCategory])

  const activeSubKey = urlSubcategory || null

  const [searchQuery, setSearchQuery] = useState(urlSearch)
  const [sort, setSort] = useState(urlSort)
  const [brandFilter, setBrandFilter] = useState(urlBrand)
  const [modelFilter, setModelFilter] = useState(urlModel)
  const [availabilityFilter, setAvailabilityFilter] = useState(urlAvailability)

  // Available brands
  const availableBrands = useMemo(() => {
    const brands = new Set<string>()
    products.forEach((p) => {
      if (p.brand) brands.add(p.brand)
    })
    return Array.from(brands).sort()
  }, [])

  // Available models
  const availableModels = useMemo(() => {
    const models = new Set<string>()
    products.forEach((p) => {
      if (p.model) models.add(p.model)
    })
    return Array.from(models).sort()
  }, [])

  // Filtered products
  const filteredProducts = useMemo(() => {
    let list = products

    if (activeCategoryKey) {
      list = getProductsByCategory(activeCategoryKey)
    }
    if (activeSubKey) {
      list = list.filter((p) => p.subcategory === activeSubKey)
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.model?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          findCategory(p.category)?.label.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.keywords?.some((k) => k.toLowerCase().includes(q)) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }
    if (brandFilter) {
      list = list.filter((p) => p.brand === brandFilter)
    }
    if (modelFilter) {
      list = list.filter((p) => p.model === modelFilter)
    }
    if (availabilityFilter) {
      list = list.filter((p) => p.availability === availabilityFilter)
    }

    // Sort
    const sorted = [...list].sort((a, b) => {
      if (sort === 'name-asc') return a.name.localeCompare(b.name)
      if (sort === 'name-desc') return b.name.localeCompare(a.name)
      if (sort === 'recent') return 0
      // featured: featured first, then by name
      const aFeatured = a.featured ? 0 : 1
      const bFeatured = b.featured ? 0 : 1
      if (aFeatured !== bFeatured) return aFeatured - bFeatured
      return a.name.localeCompare(b.name)
    })
    return sorted
  }, [activeCategoryKey, activeSubKey, searchQuery, brandFilter, modelFilter, availabilityFilter, sort])

  const activeCat = useMemo(
    () => (activeCategoryKey ? findCategory(activeCategoryKey) : null),
    [activeCategoryKey]
  )
  const activeSub = useMemo(
    () =>
      activeSubKey && activeCat
        ? activeCat.subCategories.find((s) => s.key === activeSubKey || s.slug === activeSubKey)
        : null,
    [activeCat, activeSubKey]
  )

  const totalCount = getProductCount()

  const updateUrl = useCallback(
    (params: Record<string, string>) => {
      const newParams = new URLSearchParams(searchParams)
      Object.entries(params).forEach(([key, value]) => {
        if (value) newParams.set(key, value)
        else newParams.delete(key)
      })
      navigate(`?${newParams.toString()}`)
    },
    [navigate, searchParams]
  )

  const setSearch = useCallback(
    (value: string) => {
      setSearchQuery(value)
      updateUrl({ search: value })
    },
    [updateUrl]
  )

  const setSortOption = useCallback(
    (value: string) => {
      setSort(value)
      updateUrl({ sort: value })
    },
    [updateUrl]
  )

  const selectCategory = useCallback((key: string, slug: string) => {
    setOpenCategory(key)
    updateUrl({ category: slug, subcategory: '', search: '' })
  }, [updateUrl])

  const selectSubCategory = useCallback(
    (catKey: string, subSlug: string) => {
      setOpenCategory(catKey)
      updateUrl({ category: findCategory(catKey)?.slug || '', subcategory: subSlug, search: '' })
    },
    [updateUrl]
  )

  const clearFilters = useCallback(() => {
    setOpenCategory(null)
    setSearchQuery('')
    setSort('featured')
    setBrandFilter('')
    setModelFilter('')
    setAvailabilityFilter('')
    updateUrl({})
  }, [updateUrl])

  const toggleCategory = useCallback((key: string) => {
    setOpenCategory((prev) => (prev === key ? null : key))
  }, [])

  // Detail view not here — handled by ProductDetail route
  const categoryCount = activeCat ? getCategoryProductCount(activeCat.key) : totalCount

  return (
    <div className="product-container page-container listing-page">
      <section className="listing-header">
        <div className="container-inner">
          <div className="listing-banner">
            <div className="listing-banner-content">
              <h1 className="listing-title">
                {activeSub?.label || activeCat?.label || 'All Products'}
              </h1>
              <p className="listing-description">
                {activeSub
                  ? activeSub.label
                  : activeCat
                  ? activeCat.description
                  : 'Browse our complete range of fire protection, fire detection, fire suppression, passive fire protection, and electrical safety products.'}
              </p>
              <span className="listing-count">{categoryCount} products</span>
            </div>
          </div>
        </div>
      </section>

      <section className="listing-body">
        <div className="container-inner">
          <div className="listing-layout">
            <aside className="listing-sidebar">
              <div className="sidebar-category-header">Category</div>

              <div className="sidebar-search">
                <div className="search-wrapper">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search products by name, model, brand, or category…"
                    value={searchQuery}
                    onChange={(e) => setSearch(e.target.value)}
                    className="sidebar-search-input"
                  />
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearch('')}
                    className="sidebar-clear"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="sidebar-view-all">
                <button
                  onClick={clearFilters}
                  className={`view-all-button ${!activeCategoryKey && !activeSubKey && !searchQuery && !brandFilter && !modelFilter && !availabilityFilter ? 'view-all-active' : ''}`}
                >
                  <Grid className="w-4 h-4" />
                  <span>View All Products</span>
                  <span className="view-all-count">{totalCount}</span>
                </button>
              </div>

              <div className="sidebar-filters">
                <h3 className="sidebar-filter-title">Filters</h3>

                <div className="sidebar-filter-group">
                  <label className="sidebar-filter-label">Brand</label>
                  <select
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                    className="sidebar-filter-select"
                  >
                    <option value="">All Brands</option>
                    {availableBrands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sidebar-filter-group">
                  <label className="sidebar-filter-label">Model</label>
                  <select
                    value={modelFilter}
                    onChange={(e) => setModelFilter(e.target.value)}
                    className="sidebar-filter-select"
                  >
                    <option value="">All Models</option>
                    {availableModels.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sidebar-filter-group">
                  <label className="sidebar-filter-label">Availability</label>
                  <select
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className="sidebar-filter-select"
                  >
                    <option value="">All</option>
                    <option value="available">Available</option>
                    <option value="inquiry-required">Inquiry Required</option>
                    <option value="not-specified">Not Specified</option>
                  </select>
                </div>
              </div>

              <div className="sidebar-accordion">
                {productCategories.map((cat) => {
                  const isActive = activeCategoryKey === cat.key
                  const isExpanded = openCategory === cat.key
                  const catCount = getCategoryProductCount(cat.key)
                  const CatIcon = getProductIcon(cat.icon)

                  return (
                    <div key={cat.key} className="accordion-item">
                      <button
                        onClick={() => {
                          if (isActive) {
                            selectCategory(cat.key, cat.slug)
                          } else {
                            toggleCategory(cat.key)
                            selectCategory(cat.key, cat.slug)
                          }
                        }}
                        className={`accordion-button ${isActive ? 'accordion-active' : ''} ${isExpanded ? '' : 'accordion-collapsed'}`}
                        aria-expanded={isExpanded}
                        aria-controls={`accordion-${cat.key}`}
                      >
                        <div className="accordion-header">
                          <span className="accordion-icon">
                            {CatIcon && <CatIcon />}
                          </span>
                          <span className="accordion-label">{cat.label}</span>
                          <span className="accordion-count">{catCount}</span>
                          <ChevronRight className="accordion-chevron" />
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="accordion-subcategories" id={`accordion-${cat.key}`}>
                          {cat.subCategories.map((sub) => {
                            const isSubActive = activeSubKey === sub.key || activeSubKey === sub.slug
                            const subCount = getProductCount(cat.key, sub.key)
                            const SubIcon = getProductIcon(sub.icon)
                            return (
                              <button
                                key={sub.key}
                                onClick={() =>
                                  selectSubCategory(cat.key, sub.slug)
                                }
                                className={`subcategory-button ${isSubActive ? 'subcategory-active' : ''}`}
                              >
                                <span className="subcategory-icon">
                                  {SubIcon && <SubIcon />}
                                </span>
                                <span className="subcategory-label">{sub.label}</span>
                                <span className="subcategory-count">{subCount}</span>
                                <ChevronRight className="subcategory-chevron" />
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </aside>

            <main className="listing-main">
              <div className="listing-header-row">
                <div>
                  <h2 className="listing-section-title">
                    {activeSub?.label || activeCat?.label || 'All Products'}
                  </h2>
                  <p className="listing-section-count">
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                <div className="listing-sort">
                  <label htmlFor="sort-select" className="sort-label">Sort by:</label>
                  <select
                    id="sort-select"
                    value={sort}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="sort-select"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="listing-grid">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      slug={p.slug}
                      name={p.name}
                      category={p.category}
                      brand={p.brand}
                      model={p.model}
                      shortDescription={p.shortDescription}
                      image={p.image}
                    />
                  ))
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <h3 className="empty-title">No products found</h3>
                    <p className="empty-description">
                      Try adjusting your search or removing some filters to find the products you need.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="empty-button"
                    >
                      <Grid className="w-4 h-4 mr-2" />
                      View All Products
                    </button>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}
