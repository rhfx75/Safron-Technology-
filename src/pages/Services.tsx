import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { services } from '../data/services'
import { ServiceCard } from '../components/ServiceCard'
import { gsap, ScrollTrigger } from '../components/ui/use-gsap'

const COUNTER_STATS = [
  { label: 'Projects', value: '21+', icon: 'Building' },
  { label: 'Clients', value: '21+', icon: 'Users' },
  { label: 'Engineers', value: '16+', icon: 'HardHat' },
  { label: 'Years', value: '10+', icon: 'Clock' },
]

const FILTER_CHIPS = [
  { label: 'All', category: null },
  { label: 'Fire Protection', category: 'Fire Protection' },
  { label: 'Detection & Alarm', category: 'Detection & Alarm' },
  { label: 'Electrical Safety', category: 'Electrical Safety' },
  { label: 'Maintenance', category: 'Maintenance' },
]

const ICON_MAP: Record<string, React.ElementType> = {
  Building: (props: any) => <span className="text-[#0F8A4B]" {...props}>🏗️</span>,
  Users: (props: any) => <span className="text-[#0F8A4B]" {...props}>👥</span>,
  HardHat: (props: any) => <span className="text-[#0F8A4B]" {...props}>🦺</span>,
  Clock: (props: any) => <span className="text-[#0F8A4B]" {...props}>⏱️</span>,
}

export function Services() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [counterVisible, setCounterVisible] = useState(false)
  const [counterValues, setCounterValues] = useState<Record<string, string>>({
    '21+': '21+',
    '16+': '16+',
    '10+': '10+',
  })

  const filteredServices = useCallback(() => {
    if (!activeFilter) return services
    return services.filter((s) => s.category === activeFilter)
  }, [activeFilter])

  // GSAP animations
  useEffect(() => {
    if (isVisible) return

    // Section header line
    gsap.from('.services-underline', {
      scrollTrigger: { trigger: '.services-section', start: 'top 80%' },
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1,
      ease: 'power2.out',
    })

    // Heading
    gsap.from('.services-heading', {
      scrollTrigger: { trigger: '.services-heading', start: 'top 85%' },
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
    })

    // Subtext
    gsap.from('.services-subtext', {
      scrollTrigger: { trigger: '.services-subtext', start: 'top 85%' },
      y: 30,
      duration: 0.8,
    })

    // Filter chips
    gsap.from('.filter-chip', {
      scrollTrigger: { trigger: '.filter-chips', start: 'top 85%' },
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    })

    // Service cards
    gsap.from('.service-card-premium', {
      scrollTrigger: { trigger: '.services-grid', start: 'top 85%' },
      y: 50,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power3.out',
    })

    setIsVisible(true)

    return () => {
      ScrollTrigger.getAll().forEach((t: any) => t.kill())
    }
  }, [isVisible])

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCounterVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    const el = document.querySelector('.services-counter-strip')
    if (el) observer.observe(el)
  }, [])

  useEffect(() => {
    if (!counterVisible) return
    const targets: Record<string, number> = { '21+': 21, '16+': 16, '10+': 10 }
    const intervals: Record<string, ReturnType<typeof setInterval>> = {}
    Object.entries(targets).forEach(([key, target]) => {
      let current = 0
      intervals[key] = setInterval(() => {
        current += 1
        setCounterValues((prev) => ({ ...prev, [key]: current >= target ? `${target}+` : `${current}+` }))
        if (current >= target) clearInterval(intervals[key])
      }, 30)
    })
    return () => Object.values(intervals).forEach(clearInterval)
  }, [counterVisible])

  return (
    <div data-custom-cursor>
      <section
        ref={cardsRef}
        className="services-section relative overflow-hidden min-h-[100vh] py-20 pt-24 pb-32 bg-safron-light-bg"
      >
        {/* Blueprint grid background */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(15, 61, 46, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15, 61, 46, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Drifting soft green circles */}
        <div className="absolute top-[-12%] left-[-12%] w-[700px] h-[700px] rounded-full bg-[#0F8A4B]/12 blur-[140px] animate-drift-slow" />
        <div className="absolute bottom-[-12%] right-[-12%] w-[800px] h-[800px] rounded-full bg-[#F28C28]/10 blur-[140px] animate-drift-slow-reverse" />

        {/* Pipe line behind cards */}
        <svg
          className="absolute top-[40%] left-0 w-full h-[16px] pointer-events-none z-0"
          viewBox="0 0 1400 16"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="8" x2="1400" y2="8" stroke="#064E3B" strokeWidth="5" opacity={0.12} />
          <line
            className="flow-line"
            x1="0" y1="8" x2="1400" y2="8"
            stroke="#0F8A4B" strokeWidth="2.5" strokeDasharray="14 18"
          />
        </svg>

        <div className="container relative z-10 max-w-[1300px] px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-18">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span
                className="relative w-[70px] h-[2px] bg-[#0F8A4B] origin-left services-underline"
                data-service-underline
              />
            </div>
            <h1 className="services-heading text-5xl md:text-7xl font-bold text-safron-heading-dark mb-6 tracking-tight leading-[1.1]">
              Our Services
            </h1>
            <p className="services-subtext text-lg md:text-xl text-safron-body-text max-w-2xl mx-auto leading-relaxed">
              Comprehensive fire safety and engineering solutions tailored to your facility.
            </p>
          </div>

          {/* Filter chips */}
          <div className="filter-chips flex flex-wrap justify-center gap-3 mb-16">
            {FILTER_CHIPS.map((chip) => (
              <button
                key={chip.label}
                onClick={() => setActiveFilter(chip.category)}
                className={`filter-chip px-7 py-3 rounded-full text-sm font-medium transition-all duration-300 border cursor-pointer whitespace-nowrap
                  ${activeFilter === chip.category || (chip.category === null && !activeFilter)
                    ? 'bg-[#0F8A4B] text-white border-[#0F8A4B] shadow-[0_0_20px_rgba(15,138,75,0.35)]'
                    : 'border-[#DBE8E2] bg-white text-safron-body-text hover:bg-[#0F3D2E]/5 hover:border-[#0F8A4B]/50 hover:text-safron-heading-dark'}`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Card grid */}
          <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence initial={false}>
              {filteredServices().map((s, i) => (
                <ServiceCard
                  key={s.id}
                  {...s}
                  index={i}
                  className="service-card-premium"
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Counter strip */}
          <div className="services-counter-strip mt-24 pt-16 border-t border-[#DBE8E2]/40">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {COUNTER_STATS.map((stat, i) => {
                const Icon = ICON_MAP[stat.icon as keyof typeof ICON_MAP]
                return (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center gap-2 transition-opacity duration-700"
                    style={{
                      opacity: 1,
                      transform: counterVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.6s ease ${i * 100}ms`,
                    }}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#0F8A4B]/15 flex items-center justify-center flex-shrink-0">
                      {Icon && <Icon className="w-5 h-5 text-[#0F8A4B]" />}
                    </div>
                    <div className="font-bold text-2xl md:text-3xl text-safron-heading-dark">
                      {counterValues[stat.value as keyof typeof counterValues]}
                    </div>
                    <div className="text-xs text-safron-body-text/70 uppercase tracking-wider">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* View All button */}
          <div className="mt-20 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#0F8A4B] text-white font-semibold rounded-xl hover:bg-[#097b42] transition-all duration-300 shadow-[0_0_25px_rgba(15,138,75,0.4)]"
            >
              View All Services <ArrowRight className="w-4 h-4 transition-transform hover:translate-x-1 duration-200" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
