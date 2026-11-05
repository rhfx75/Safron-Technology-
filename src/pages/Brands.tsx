import { SectionTitle } from '../components/SectionTitle'
import { brands } from '../data/brands'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'

export function Brands() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80"
            alt="Technology brands"
            className="w-full h-[400px] object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-safron-deep-teal/85" />
        </div>
        <div className="relative z-10 container section pt-20 pb-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Technology Brands</h1>
          <p className="text-lg text-white max-w-xl mx-auto">
            Working with trusted industry brands to deliver quality fire safety solutions.
          </p>
        </div>
      </section>

      <section className="bg-[#F5FAF8]">
        <div className="container section">
          <SectionTitle
            title="Our Technology Partners"
            subtitle="We source and install products from leading fire safety and protection brands."
          />

          {/* Dual-direction infinite marquee */}
          <div className="brand-marquee-wrapper overflow-hidden" aria-label="Brand partners">
            <div className="brand-marquee-track">
              {brands.map((b) => (
                <div key={b.id} className="brand-marquee-item">
                  <img src={b.image} alt={b.alt} className="h-10 grayscale opacity-70" loading="lazy" />
                </div>
              ))}
              {brands.map((b) => (
                <div key={`reverse-${b.id}`} className="brand-marquee-item">
                  <img src={b.image} alt={b.alt} className="h-10 grayscale opacity-70" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="brand-marquee-track brand-marquee-track-reverse">
              {brands.map((b) => (
                <div key={b.id} className="brand-marquee-item">
                  <img src={b.image} alt={b.alt} className="h-10 grayscale opacity-70" loading="lazy" />
                </div>
              ))}
              {brands.map((b) => (
                <div key={`reverse-${b.id}`} className="brand-marquee-item">
                  <img src={b.image} alt={b.alt} className="h-10 grayscale opacity-70" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-charcoal/60 text-lg mb-6">
              Interested in a specific brand or product? Contact our team for availability and pricing.
            </p>
            <Link to="/contact">
              <Button className="w-auto">Get in Touch</Button>
            </Link>
          </div>
          <p className="text-center text-sm text-charcoal/60 mt-10 max-w-2xl mx-auto">
            Brand logos shown are for illustrative purposes. SAFRON TECHNOLOGY does not claim authorized dealership or partnership unless confirmed.
          </p>
        </div>
      </section>
    </div>
  )
}
