import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Compass, Wrench, Clock, Flame, Zap, Mail } from 'lucide-react'

const STATS = [
  { label: 'Projects Completed', value: '100+', icon: ShieldCheck },
  { label: 'Satisfied Clients', value: '50+', icon: Compass },
  { label: 'Engineers', value: '25+', icon: Wrench },
  { label: 'Years of Service', value: '10+', icon: Clock },
]

const SERVICES = [
  { label: 'Fire Protection', icon: Flame, desc: 'Sprinkler, hydrant & suppression systems' },
  { label: 'Fire Detection', icon: Zap, desc: 'Addressable & conventional alarm panels' },
  { label: 'Electrical Safety', icon: Mail, desc: 'Earthing, lightning & surge protection' },
]

export function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [counterVisible, setCounterVisible] = useState(false)
  const [counterValues, setCounterValues] = useState<Record<string, string>>({
    '100+': '0+',
    '50+': '0+',
    '25+': '0+',
    '10+': '0+',
  })
  const mousePos = useRef({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(media.matches)
    const handler = () => setReducedMotion(media.matches)
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [])

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
    const el = document.querySelector('.hero-stats')
    if (el) observer.observe(el)
  }, [])

  useEffect(() => {
    if (!counterVisible || reducedMotion) return
    const targets: Record<string, number> = { '100+': 100, '50+': 50, '25+': 25, '10+': 10 }
    const intervals: Record<string, ReturnType<typeof setInterval>> = {}
    Object.entries(targets).forEach(([key, target]) => {
      let current = 0
      intervals[key] = setInterval(() => {
        current += 1
        setCounterValues((prev) => ({ ...prev, [key]: current >= target ? `${target}+` : `${current}+` }))
        if (current >= target) clearInterval(intervals[key])
      }, 25)
    })
    return () => Object.values(intervals).forEach(clearInterval)
  }, [counterVisible, reducedMotion])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const rect = heroRef.current?.getBoundingClientRect()
    if (!rect) return
    mousePos.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    mousePos.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
  }, [reducedMotion])

  useEffect(() => {
    // Mouse parallax only; framer-motion handles entrance animations
    const el = heroRef.current
    if (!el) return
    el.addEventListener('mousemove', handleMouseMove as unknown as EventListener)
    return () => el.removeEventListener('mousemove', handleMouseMove as unknown as EventListener)
  }, [handleMouseMove])

  return (
    <section
      ref={heroRef}
      className="relative isolation overflow-hidden min-h-[850px] md:min-h-[100vh] max-w-full bg-[#0B2A22] text-white"
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-35"
        style={{
          backgroundImage: `
            linear-gradient(rgba(15, 61, 46, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 61, 46, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: `${50 + mousePos.current.x * 10}% ${50 + mousePos.current.y * 10}%`,
        }}
      />

      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-35 max-w-full"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 48%, rgba(15, 138, 75, 0.03) 48%, rgba(15, 138, 75, 0.03) 52%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, rgba(242, 140, 40, 0.02) 48%, rgba(242, 140, 40, 0.02) 52%, transparent 52%)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="absolute inset-0 z-0 pointer-events-none opacity-35 max-w-full">
        <svg
          className="w-full h-full max-w-full"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0F8A4B" />
              <stop offset="50%" stopColor="#0A8F4F" />
              <stop offset="100%" stopColor="#064E3B" />
            </linearGradient>
            <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F28C28" stop-opacity="0" />
              <stop offset="50%" stopColor="#F28C28" stop-opacity="0.8" />
              <stop offset="100%" stopColor="#F28C28" stop-opacity="0" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d="M 60 300 L 1380 300"
            stroke="url(#pipeGradient)"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            className="pipeline-main"
          />

          <path
            d="M 300 300 L 300 120 L 420 120"
            stroke="url(#pipeGradient)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            className="pipeline-branch"
          />

          <path
            d="M 700 300 L 700 180 L 820 180 L 820 60"
            stroke="url(#pipeGradient)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            className="pipeline-branch"
          />

          <path
            d="M 1100 300 L 1100 80 L 1220 80"
            stroke="url(#pipeGradient)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            className="pipeline-branch"
          />

          <circle cx="300" cy="300" r="10" fill="#F28C28" className="valve" />
          <circle cx="700" cy="300" r="10" fill="#F28C28" className="valve" />
          <circle cx="1100" cy="300" r="10" fill="#F28C28" className="valve" />
          <circle cx="420" cy="120" r="8" fill="#F28C28" className="valve" />
          <circle cx="820" cy="180" r="8" fill="#F28C28" className="valve" />
          <circle cx="820" cy="60" r="8" fill="#F28C28" className="valve" />
          <circle cx="1220" cy="80" r="8" fill="#F28C28" className="valve" />

          <path id="pulsePath" d="M 60 300 L 1380 300" fill="none" />
          <path
            d="M 60 300 L 140 300"
            stroke="url(#pulseGradient)"
            strokeWidth="14"
            strokeLinecap="round"
            filter="url(#glow)"
            className="flow-pulse"
          />
        </svg>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="floating-element"
          style={{
            top: '15%',
            left: '8%',
            animationDelay: '0s',
            transform: `translate(${mousePos.current.x * 15}px, ${mousePos.current.y * 15}px)`,
          }}
        >
          <div className="gear" />
        </div>
        <div
          className="floating-element"
          style={{
            top: '25%',
            right: '10%',
            animationDelay: '1.5s',
            transform: `translate(${mousePos.current.x * -12}px, ${mousePos.current.y * -12}px)`,
          }}
        >
          <div className="flange" />
        </div>
        <div
          className="floating-element"
          style={{
            bottom: '20%',
            left: '12%',
            animationDelay: '2.5s',
            transform: `translate(${mousePos.current.x * 10}px, ${mousePos.current.y * 10}px)`,
          }}
        >
          <div className="valve-wheel" />
        </div>
      </div>

      <div className="relative z-2 container section pt-24 pb-32 max-w-full">
        <div className="mx-auto text-center max-w-[1000px] px-4 sm:px-6 lg:px-8">
          <motion.div
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-2 mb-10 opacity-90 max-w-full"
          >
            <span className="w-2 h-2 rounded-full bg-[#F28C28]" />
            <span className="px-4 py-1.5 rounded-full hero-badge text-[11px] font-bold tracking-wider text-[#0F8A4B] uppercase border border-[#0F8A4B]/30 bg-[#0F8A4B]/10">
              Precision Engineering
            </span>
          </motion.div>

          <motion.h1
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-headline text-[clamp(2.5rem,6vw,5.5rem)] font-[800] text-[#e9fff3] mb-8 leading-[1.05] max-w-[1000px] mx-auto"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.6)' }}
          >
            Engineering Safety.
            <br />
            <span style={{ color: '#f58a1f' }}>Protecting What Matters.</span>
          </motion.h1>

          <motion.p
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-subtext text-lg md:text-xl text-white/[0.9] mb-12 max-w-[680px] mx-auto leading-[1.7]"
          >
            SAFRON TECHNOLOGY delivers reliable fire detection, fire protection, electrical safety, and
            engineering solutions for industrial, commercial, and institutional facilities across Bangladesh.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4 mb-14">
            {SERVICES.map((s) => (
              <motion.div
                key={s.label}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + SERVICES.indexOf(s) * 0.1 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0F3D2E]/40 border border-[#0F8A4B]/20 text-sm font-medium text-[#7DE3B0] hover:bg-[#0F8A4B]/20 hover:border-[#0F8A4B]/40 transition-all group cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <s.icon className="w-4 h-4 text-[#0F8A4B]" />
                <span>{s.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hero-cta flex flex-col sm:flex-row gap-5 justify-center items-center max-w-full"
          >
            <Link to="/services">
              <button className="hero-cta-btn relative inline-flex items-center justify-center gap-2 px-9 py-4 bg-[#0F8A4B] text-white font-semibold rounded-xl overflow-hidden group shadow-[0_0_30px_rgba(15,138,75,0.5)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus-ring-[#0F8A4B]">
                <span className="relative z-10 whitespace-nowrap">Explore Our Solutions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                <span className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors duration-300" />
              </button>
            </Link>
            <Link to="/contact">
              <button className="hero-cta-btn relative inline-flex items-center justify-center gap-2 px-9 py-4 border-2 border-white text-white font-semibold rounded-xl overflow-hidden group hover:bg-white hover:text-[#061E1B] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus-ring-white">
                <span className="relative z-10 whitespace-nowrap">Request a Consultation</span>
                <span className="absolute inset-0 bg-white/10 group-hover:bg-white transition-colors duration-300" />
              </button>
            </Link>
          </motion.div>

          <motion.div
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: counterVisible ? 0.3 : 0 }}
            className="mt-24 relative hero-stats max-w-full"
          >
            <div className="absolute inset-0 z-0 stats-bg rounded-[24px] border border-[#0F8A4B]/20 bg-[#0F3D2E]/20" />
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 py-14 px-6 sm:px-8 lg:px-12">
              {STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: STATS.indexOf(stat) * 0.08 }}
                  className="hero-stat text-center group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#0F8A4B]/15 flex items-center justify-center mb-4 group-hover:bg-[#0F8A4B]/30 transition-colors">
                    <stat.icon className="w-5 h-5 text-[#0F8A4B]" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {counterValues[stat.value]}
                  </div>
                  <div className="text-sm text-[#7DE3B0]/90 uppercase tracking-wider">{stat.label}</div>
                  <div className="w-full h-[3px] bg-[#0F8A4B]/20 mt-6 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0F8A4B] w-0 group-hover:w-full transition-all duration-700 ease-out" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-0 max-w-full">
        <svg className="w-full h-[80px] max-w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0 40 C240 90 480 0 720 40 S1200 80 1440 30 V80 H0Z" fill="#0B2A22" />
        </svg>
      </div>
    </section>
  )
}
