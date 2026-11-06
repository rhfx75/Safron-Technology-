import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getProjectsByBrand, getProjectById } from '../data/projects'
import { getBrandById } from '../data/brands'
import { ArrowRight } from 'lucide-react'

export function BrandDetail() {
  const { id } = useParams<{ id: string }>()
  const brand = getBrandById(id ?? '')

  if (!brand) {
    return (
      <div className="section text-center py-24">
        <h1 className="text-2xl font-bold text-safron-primary mb-4">Brand Not Found</h1>
        <Link to="/brands" className="text-safron-secondary hover:underline">
          Back to Brands
        </Link>
      </div>
    )
  }

  const brandProjects = getProjectsByBrand(brand.id).map((p) => getProjectById(p.id)).filter(Boolean)

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80"
            alt="Technology brand"
            className="w-full h-[400px] object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-safron-deep-teal/85" />
        </div>
        <div className="relative z-10 container section pt-20 pb-24 text-center">
          <Link to="/brands" className="brand-back-link">
            ← Back to Brands
          </Link>
          <div className="brand-logo-container mb-6">
            <img src={brand.image} alt={brand.alt} className="brand-detail-logo" loading="lazy" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{brand.name}</h1>
          <p className="text-lg text-white max-w-xl mx-auto">{brand.description}</p>
        </div>
      </section>

      <section className="bg-[#F5FAF8]">
        <div className="container section max-w-[1200px]">
          <div className="text-center mb-16">
            <p className="text-center text-sm text-charcoal/60 mt-10 max-w-2xl mx-auto">
              Brand logos shown are for illustrative purposes. SAFRON TECHNOLOGY does not claim authorized dealership or partnership unless confirmed.
            </p>
          </div>

          {brandProjects.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-[4px] bg-[#f58a1f] rounded-full" />
                <h2 className="text-2xl font-bold text-safron-deep-forest">Projects Using {brand.name}</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {brandProjects.map((p) => (
                  <div key={p!.id} className="group project-card-reveal">
                    <div className="h-48 overflow-hidden rounded-lg border border-light">
                      <img src={p!.image} alt={p!.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                    <h4 className="font-bold text-safron-primary mt-3 text-sm">{p!.name}</h4>
                    <p className="text-xs text-charcoal/60">{p!.location}</p>
                    <Link
                      to={`/projects/${p!.id}`}
                      className="flex items-center gap-1 mt-2 text-sm font-semibold text-safron-secondary hover:underline transition-colors"
                    >
                      View Project <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center mt-16">
            <Link to="/brands" className="text-safron-primary font-semibold hover:text-safron-secondary transition-colors">
              ← Back to Brands
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
