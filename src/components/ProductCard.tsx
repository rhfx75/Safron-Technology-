import { Link } from 'react-router-dom'
import { findCategory } from '../data/products'

interface ProductCardProps {
  slug: string
  name: string
  category: string
  brand?: string
  model?: string
  shortDescription: string
  image: string | null
}

export function ProductCard({
  slug,
  name,
  category,
  brand,
  model,
  shortDescription,
  image,
}: ProductCardProps) {
  const categoryLabel = findCategory(category)?.label || category
  const href = `/products/${slug}`

  return (
    <article className="product-card">
      <Link to={href} className="product-card-link" tabIndex={-1}>
        <div className="product-card-image">
          {image ? (
            <img
              src={image}
              alt={name}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="product-card-placeholder">
              <span className="placeholder-label">Image Coming Soon</span>
            </div>
          )}
        </div>
        <div className="product-card-bar">
          <span className="product-card-category">{categoryLabel}</span>
          <h3 className="product-card-name">{name}</h3>
        </div>
      </Link>
      <div className="product-card-meta">
        {brand && (
          <span className="product-card-brand">{brand}</span>
        )}
        {model && (
          <span className="product-card-model">Model: {model}</span>
        )}
      </div>
      <p className="product-card-description">{shortDescription}</p>
      <div className="product-card-actions">
        <Link to={href} className="product-card-view-details">
          View Details
        </Link>
      </div>
    </article>
  )
}
