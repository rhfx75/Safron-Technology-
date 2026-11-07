import { useState } from 'react'
import { SectionTitle } from '../components/SectionTitle'
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

const STANDARDS_MARQUEE_ITEMS = [
  { src: '/assets/partners/rsc.jpg', label: 'RSC', alt: 'Royal Society for the Prevention of Accidents logo' },
  { src: '/assets/partners/nirapan.jpg', label: 'NIRAPON', alt: 'NIRAPON logo' },
  { src: '/assets/partners/leed.png', label: 'LEED', alt: 'LEED green building logo' },
  { src: '/assets/partners/bfscd.png', label: 'BFSCD', alt: 'Bangladesh Fire Service and Civil Defence logo' },
  { src: '/assets/partners/buet.jpg', label: 'BUET', alt: 'Bangladesh University of Engineering and Technology logo' },
  { src: '/assets/partners/dife.jpg', label: 'DIFE', alt: 'Department of Inspection for Factories and Establishments logo' },
  { src: '/assets/partners/ul.avif', label: 'UL', alt: 'UL Listed logo' },
]

const COMPLETED_PROJECTS = [
  {
    title: 'Garment Factory Fire Protection',
    category: 'Fire Protection',
    location: 'Gazipur, Bangladesh',
    image: '/images/projects/ananta-huaxiang-main.jpg',
    href: '/projects',
  },
  {
    title: 'Fakir Eco Knitwears Ltd.',
    category: 'Fire Detection',
    location: 'Bangladesh',
    image: '/images/projects/fakir-exo.webp',
    href: '/projects',
  },
  {
    title: 'Fakir Knitwears Ltd. – New Building',
    category: 'Fire Protection',
    location: 'Bangladesh',
    image: '/images/projects/fakir-new-building.jpg',
    href: '/projects',
  },
  {
    title: 'Maheen Label Tex Ltd.',
    category: 'Fire Detection',
    location: 'Siddhirgonj, Narayanganj',
    image: '/images/projects/maheen-label-tex-main.webp',
    href: '/projects',
  },
  {
    title: 'Ananta Huaxiang Ltd.',
    category: 'Fire Protection',
    location: 'Adamjee EPZ, Bangladesh',
    image: '/images/projects/ananta-huaxiang-main.jpg',
    href: '/projects',
  },
  {
    title: 'N.K.K. Knitwear Limited',
    category: 'Fire Detection',
    location: 'Narayanganj, Bangladesh',
    image: '/images/projects/n-k-k-knitwear-main.jpg',
    href: '/projects',
  },
]

function StandardsMarquee() {
  return (
    <section className="standards-marquee-section">
      <div className="standards-marquee-card">
        <div className="standards-marquee-accent" />
        <div className="standards-marquee-heading">
          <h2 className="standards-marquee-title">Standards, Authorities &amp; Institutions We Work With</h2>
          <p className="standards-marquee-subtitle">Trusted compliance, safety, and engineering partners across Bangladesh.</p>
        </div>
        <div className="marquee">
          <div className="marquee__track">
            <div className="marquee__group">
              {STANDARDS_MARQUEE_ITEMS.map((item) => (
                <div key={item.label} className="marquee__item">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="marquee__logo"
                    width={160}
                    height={80}
                    loading="eager"
                    decoding="async"
                  />
                  <span className="marquee__name">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="marquee__group" aria-hidden="true">
              {STANDARDS_MARQUEE_ITEMS.map((item) => (
                <div key={item.label + '-copy'} className="marquee__item">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="marquee__logo"
                    width={160}
                    height={80}
                    loading="eager"
                    decoding="async"
                  />
                  <span className="marquee__name">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CompletedProjects() {
  return (
    <section className="completed-projects-section">
      <div className="completed-projects-container container section">
        <div className="completed-projects-header text-center mb-16">
          <span className="completed-projects-label">OUR WORK</span>
          <h2 className="completed-projects-title">Completed Projects</h2>
          <p className="completed-projects-description">Fire protection, detection, and electrical safety projects delivered across Bangladesh.</p>
        </div>

        <div className="completed-projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPLETED_PROJECTS.map((project) => (
            <article key={project.title} className="completed-project-card" aria-label={project.title}>
              <div className="completed-project-card__image relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="completed-project-card__overlay absolute inset-0 bg-gradient-to-t from-[#05140e]/90 to-transparent" />
                <span className="completed-project-card__category absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#F58A1F] text-white text-[10px] font-bold uppercase tracking-tight z-10">
                  {project.category}
                </span>
              </div>
              <div className="completed-project-card__content p-4 pt-3">
                <h3 className="completed-project-card__title text-white font-bold text-base mb-1 leading-tight">{project.title}</h3>
                <p className="completed-project-card__meta text-[#CFE0D8] text-xs mb-3">{project.location}</p>
                <a href={project.href} className="completed-project-card__link text-[#F58A1F] text-xs font-bold uppercase tracking-tight hover:underline">
                  View Project <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="completed-projects-footer mt-12 text-center">
          <a href="/projects" className="completed-projects-button inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#F58A1F] text-white font-semibold rounded-md min-h-[48px] whitespace-nowrap hover:bg-[#e67a23] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus-ring-[#F58A1F]">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  )
}

export function Home() {
  return (
    <div>
      <StandardsMarquee />
      <CompletedProjects />
      <CompanyIntroduction />
      <OurServices />
      <OurProducts />
      <FeaturedProjects />
      <WhyChoose />
      <Industries />
      <CTA />
    </div>
  )
}

function CompanyIntroduction() {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <section className="bg-light">
      <div className="container section">
        <div className="lg:max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                className="text-left"
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
            <div className="h-[320px] aspect-[4/3] rounded-xl overflow-hidden border border-light bg-white shadow-sm relative">
              {!imageFailed && (
                <img
                  src="https://images.unsplash.com/photo-1581579258858-82d7880a4192?w=800&q=80"
                  alt="Engineering team reviewing fire safety plans"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={() => setImageFailed(true)}
                />
              )}
              {imageFailed && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6 text-white bg-gradient-to-br from-[#0B5D36] to-[#0F7A45]">
                  <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mb-3 mx-auto">
                    <Shield className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Engineering Excellence</h3>
                  <p className="text-sm md:text-base max-w-sm mx-auto leading-relaxed opacity-90">
                    Professional design, quality installation, and responsive after-sales support across Bangladesh.
                  </p>
                  <span className="mt-4 inline-block px-3 py-1 rounded-full bg-orange-500 text-[#061E1B] text-xs font-bold uppercase tracking-wider">
                    10+ Years of Engineering Excellence
                  </span>
                </div>
              )}
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
  const [ctaImageFailed, setCtaImageFailed] = useState(false)

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {!ctaImageFailed && (
          <img
            src="https://images.unsplash.com/photo-1576792782483-390e7a597e35?w=1920&q=80"
            alt="Fire safety engineering"
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setCtaImageFailed(true)}
          />
        )}
        {ctaImageFailed && (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0B5D36] to-[#0F7A45]" />
        )}
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
