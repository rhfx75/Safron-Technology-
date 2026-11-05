import { SectionTitle } from '../components/SectionTitle'
import { Hero } from '../components/Hero'
import { ServiceCard } from '../components/ServiceCard'
import { ProductCard } from '../components/ProductCard'
import { ProjectCard } from '../components/ProjectCard'
import { services } from '../data/services'
import { products } from '../data/products'
import { projects } from '../data/projects'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'
import { Shield, Users, Zap } from 'lucide-react'

const WHY_CHOOSE = [
  {
    title: 'Professional Engineering Approach',
    description: 'Every solution is engineered by qualified professionals with site-specific risk assessment and code-compliant design.',
    icon: <HardHat />,
  },
  {
    title: 'Reliable Technical Solutions',
    description: 'Dependable fire detection, protection, and suppression systems that perform when it matters most.',
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: 'Quality-Focused Installation',
    description: 'Certified installation by trained technicians using quality-tested equipment and materials.',
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: 'Responsive After-Sales Support',
    description: 'Annual maintenance contracts and rapid response support to keep your systems operational year-round.',
    icon: <Zap className="w-6 h-6" />,
  },
]

const INDUSTRIES = [
  'Ready-Made Garments (RMG)',
  'Textile & Manufacturing',
  'Commercial Buildings',
  'Industrial Facilities',
  'Healthcare Facilities',
  'Educational Institutions',
  'Residential & Mixed-Use Buildings',
]

export function Home() {
  return (
    <div>
      <Hero />
      <CompanyIntroduction />
      <OurServices />
      <OurProducts />
      <FeaturedProjects />
      <BrandsSection />
      <WhyChoose />
      <Industries />
      <CTA />
    </div>
  )
}

function CompanyIntroduction() {
  return (
    <section className="bg-light">
      <div className="container section">
        <div className="lg:max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                title="Your Trusted Engineering & Safety Partner"
                subtitle="SAFRON TECHNOLOGY is a dedicated engineering solutions provider focused on safety, reliability, innovation, and technical excellence."
              />
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-safron-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-safron-primary">Fire Protection & Detection</h4>
                    <p className="text-charcoal/70 text-sm">Complete fire protection and detection systems engineered for your facility's unique risks.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-safron-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-safron-primary">Electrical Safety</h4>
                    <p className="text-charcoal/70 text-sm">Lightning protection, earthing, and surge protection to eliminate electrical fire hazards.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-safron-secondary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-safron-primary">Engineering Excellence</h4>
                    <p className="text-charcoal/70 text-sm">Professional design, quality installation, and responsive after-sales support across Bangladesh.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-64 rounded-xl overflow-hidden border border-light bg-white shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1581579258858-82d7880a4192?w=800&q=80"
                alt="Engineering team reviewing fire safety plans"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function OurServices() {
  return (
    <section>
      <div className="container section">
        <SectionTitle
          title="Our Services"
          subtitle="Comprehensive fire safety and engineering solutions tailored to your facility."
        />
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.id} {...s} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/services" className="text-safron-primary font-semibold hover:text-safron-secondary transition-colors">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}

function OurProducts() {
  return (
    <section className="bg-light">
      <div className="container section">
        <SectionTitle
          title="Our Products"
          subtitle="Quality fire safety equipment and protection systems from leading technology brands."
        />
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {['All Products', 'Fire Alarm Systems', 'Fire Pumps', 'Fire Extinguishers', 'Fire Suppression Systems', 'Fire Doors', 'Electrical Safety'].map((cat, i) => (
             <button key={i} className="px-4 py-2 rounded-full border border-light text-sm text-charcoal hover:bg-safron-secondary hover:text-white hover:border-safron-secondary transition-colors">
              {cat}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((p) => (
            <ProductCard
              key={p.id}
              slug={p.slug}
              name={p.name}
              category={p.category}
              shortDescription={p.shortDescription}
              image={p.image}
            />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/products" className="text-safron-primary font-semibold hover:text-safron-secondary transition-colors">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}

function FeaturedProjects() {
  return (
    <section>
      <div className="container section">
        <SectionTitle
          title="Featured Projects"
          subtitle="Completed engineering projects across industrial, commercial, and institutional facilities."
        />
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {projects.slice(0, 6).map((p) => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/projects" className="text-safron-primary font-semibold hover:text-safron-secondary transition-colors">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}

function BrandsSection() {
  return (
    <section className="bg-light border-y border-light">
      <div className="container section">
        <SectionTitle title="Technology Brands" subtitle="Working with trusted industry brands to deliver quality fire safety solutions." />
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center">
          {[
            { name: 'NAFFCO', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80' },
            { name: 'SIMPLEX', img: 'https://images.unsplash.com/photo-1558488887-d9ad34e72142?w=200&q=80' },
            { name: 'BOSCH', img: 'https://images.unsplash.com/photo-1550684787-e1d66d8e50cb?w=200&q=80' },
            { name: 'SHIELD', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&q=80' },
            { name: 'HOCHIKI', img: 'https://images.unsplash.com/photo-1593028287119-0388217698e9?w=200&q=80' },
            { name: 'COOPER', img: 'https://images.unsplash.com/photo-1576792782483-390e7a597e35?w=200&q=80' },
          ].map((b) => (
            <div key={b.name} className="flex items-center justify-center p-4 rounded-lg border border-light bg-white hover:shadow-md transition-colors group">
              <img src={b.img} alt={b.name} className="h-10 grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100" loading="lazy" />
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-charcoal/60 mt-8 max-w-2xl mx-auto">
          Brand logos shown are for illustrative purposes. SAFRON TECHNOLOGY does not claim authorized dealership or partnership unless confirmed.
        </p>
      </div>
    </section>
  )
}

function WhyChoose() {
  return (
    <section>
      <div className="container section">
        <SectionTitle
          title="Why Choose Safron Technology?"
          subtitle="Commitment to safety, quality, and technical excellence in every project we undertake."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE.map((item, i) => (
            <div key={i} className="p-6 rounded-xl border border-light bg-white card-hover">
              <div className="w-10 h-10 rounded-lg bg-safron-secondary/10 flex items-center justify-center text-safron-secondary mb-4">{item.icon}</div>
              <h4 className="font-bold text-safron-primary mb-2">{item.title}</h4>
              <p className="text-charcoal/70 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Industries() {
  return (
    <section className="bg-light">
      <div className="container section">
        <SectionTitle
          title="Industries We Serve"
          subtitle="Engineering safety solutions for a wide range of facilities across Bangladesh."
        />
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {INDUSTRIES.map((industry, i) => (
            <div key={i} className="p-6 rounded-xl border border-light bg-white card-hover text-center">
              <span className="text-charcoal font-medium">{industry}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1576792782483-390e7a597e35?w=1920&q=80"
          alt="Fire safety engineering"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-safron-primary/90" />
      </div>
      <div className="relative z-10 container section pt-24 pb-24 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Let's Build a Safer Future Together.</h2>
        <p className="text-lg text-white mb-10 max-w-xl mx-auto">
          Looking for reliable fire safety and engineering solutions for your facility? Our team is ready to
          discuss your requirements.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/contact">
            <Button variant="primary" className="px-8 py-3 text-base">
              Request a Quote
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="px-8 py-3 text-base border-safron-white text-safron-white hover:bg-safron-white hover:text-safron-primary">
              Contact Our Team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function HardHat() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  )
}

export default Home
