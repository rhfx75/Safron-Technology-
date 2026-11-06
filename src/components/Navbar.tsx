import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { gsap, ScrollTrigger } from '../components/ui/use-gsap'

const LOGO_SRC = '/images/safron-logo.png'
const WHATSAPP_URL = 'https://wa.me/8801788585741'

const NAV_ITEMS = [
  { label: 'Home', to: '/', hasDropdown: false },
  { label: 'About Us', to: '/about', hasDropdown: false },
  { label: 'Services', to: '/services', hasDropdown: true },
  { label: 'Products', to: '/products', hasDropdown: true },
  { label: 'Projects', to: '/projects', hasDropdown: true },
  { label: 'Brands', to: '/brands', hasDropdown: false },
] as const

const DROPDOWN_ITEMS: Record<string, { label: string; to: string }[]> = {
  Services: [
    { label: 'All Services', to: '/services' },
    { label: 'Fire Protection Design', to: '/services/fire-protection-system-design' },
    { label: 'Fire Detection & Alarm', to: '/services/fire-detection-alarm-installation' },
    { label: 'Fire Suppression', to: '/services/fire-suppression-extinguishing' },
    { label: 'Fire Pump & Hydrant', to: '/services/fire-pump-hydrant' },
    { label: 'Fire Door & Exit', to: '/services/fire-door-emergency-exit' },
    { label: 'Electrical & Lightning', to: '/services/electrical-lightning-safety' },
    { label: 'Inspection & Commissioning', to: '/services/inspection-testing-commissioning' },
    { label: 'Maintenance (AMC)', to: '/services/maintenance-amc' },
    { label: 'Equipment Supply', to: '/services/fire-safety-equipment-supply' },
    { label: 'Fire Safety Audit', to: '/services/fire-safety-audit-compliance' },
  ],
  Products: [
    { label: 'All Products', to: '/products' },
    { label: 'Fire Protection System', to: '/products/fire-protection' },
    { label: 'Fire Detection & Alarm', to: '/products/fire-detection' },
    { label: 'Fire-Rated Doors', to: '/products/fire-rated-doors' },
    { label: 'Passive Fire Protection', to: '/products/passive-fire-protection' },
    { label: 'Electrical & Lightning', to: '/products/electrical-safety' },
  ],
  Projects: [
    { label: 'All Projects', to: '/projects' },
    { label: 'Industrial Facilities', to: '/projects?category=industrial' },
    { label: 'Commercial Buildings', to: '/projects?category=commercial' },
    { label: 'Healthcare Facilities', to: '/projects?category=healthcare' },
    { label: 'Educational Institutions', to: '/projects?category=educational' },
    { label: 'Textile & Manufacturing', to: '/projects?category=textile' },
  ],
}

export function Navbar() {
  const location = useLocation()
  const pathname = location.pathname
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  const navRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)

  const activeKey = useMemo(() => {
    const exact = NAV_ITEMS.find((i) => i.to === pathname)
    if (exact) return exact.label
    const dropdown = NAV_ITEMS.find(
      (i) => i.hasDropdown && pathname.startsWith(i.to + '/')
    )
    if (dropdown) return dropdown.label
    return 'Home'
  }, [pathname])

  const toggleDropdown = useCallback((key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key))
  }, [])

  const closeDrawer = useCallback(() => setIsOpen(false), [])

  const handleDrawerLinkClick = useCallback(() => {
    closeDrawer()
  }, [closeDrawer])

  // Scroll-driven header shadow: vanilla passive listener, toggles after 10px
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y > 10 && !scrolled) setScrolled(true)
      if (y <= 10 && scrolled) setScrolled(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrolled])

  // GSAP logo resize on scroll
  useEffect(() => {
    if (!logoRef.current) return
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: '+=80',
      onUpdate: (self: { progress: number }) => {
        const progress = self.progress
        const scale = 1 - progress * 0.15
        gsap.set(logoRef.current, { scale: Math.max(0.85, scale) })
      },
    })
  }, [])

  useEffect(() => {
    if (!isOpen && hamburgerRef.current) {
      ;(hamburgerRef.current as HTMLElement).focus()
    }
  }, [isOpen])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null)
        if (isOpen) closeDrawer()
      }
    },
    [isOpen, closeDrawer]
  )

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (!isOpen) return
      const drawer = drawerRef.current
      const hamburger = hamburgerRef.current
      const target = e.target as Node | null
      if (drawer && !drawer.contains(target) && hamburger && !hamburger.contains(target)) {
        closeDrawer()
      }
    },
    [isOpen, closeDrawer]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleOutsideClick, handleKeyDown])

  return (
    <nav
      ref={navRef}
      className={`nav fixed top-0 left-0 right-0 transition-all duration-300 ${scrolled ? 'nav-scrolled' : ''}`}
      onKeyDown={(e) => handleKeyDown(e.nativeEvent)}
    >
      <div className="nav-inner w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 h-full grid grid-cols-[auto_1fr_auto] items-center gap-4">
        {/* Brand */}
        <Link
          to="/"
          className="nav-brand flex items-center gap-2 flex-shrink-0 justify-self-start"
        >
          <img
            ref={logoRef}
            src={LOGO_SRC}
            alt="SAFRON TECHNOLOGY"
            className="w-auto h-[40px] md:h-[44px] object-contain block flex-shrink-0"
            loading="eager"
          />
          <span className="nav-brand-name hidden lg:block whitespace-nowrap font-extrabold text-safron-deep-teal tracking-tight text-[20px] md:text-[22px]">
            SAFRON<span className="text-safron-primary ml-1">TECHNOLOGY</span>
          </span>
        </Link>

        {/* Desktop navigation links */}
        <div className="nav-links hidden lg:flex [@media(max-width:1199px)]:hidden flex-1 min-w-0 justify-center gap-3 justify-self-center">
          {NAV_ITEMS.map((item) => {
            const hasDropdown = item.hasDropdown
            const isActive = activeKey === item.label
            const dropdownOpen = openDropdown === item.label
            return (
              <div key={item.label} className="relative group">
                <Link
                  to={item.to}
                  className={`nav-link ${hasDropdown ? 'has-dd' : ''} ${isActive ? 'active' : ''} text-[13px] md:text-sm`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => { setOpenDropdown(null); closeDrawer() }}
                >
                  {item.label}
                  {hasDropdown && <ChevronDown className="chev w-3 h-3 ml-1" />}
                  <div className="nav-underline" />
                </Link>
                {hasDropdown && (
                  <div
                    className="dropdown-wrap"
                    data-open={dropdownOpen ? 'true' : 'false'}
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15 }}
                          id={`dropdown-${item.label}`}
                          role="menu"
                          className="dropdown-menu"
                        >
                          {DROPDOWN_ITEMS[item.label].map((d) => (
                            <Link
                              key={d.label}
                              to={d.to}
                              role="menuitem"
                              className="block"
                              onClick={() => { setOpenDropdown(null); closeDrawer() }}
                            >
                              {d.label}
                              <ChevronDown className="w-3 h-3 ml-2 text-safron-deep-teal/40 flex-shrink-0" />
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Right CTA group */}
        <div className="nav-actions flex items-center gap-3 flex-shrink-0 min-w-0 justify-self-end">
          <Link to="/contact">
            <button className="get-quote-btn px-5 py-2.5 text-[13px] font-medium text-safron-deep-teal border border-safron-deep-teal/30 rounded-md hover:bg-safron-mint transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-safron-primary whitespace-nowrap shrink-0 hidden lg:inline-flex">
              Get a Quote
            </button>
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-whatsapp flex items-center gap-3 px-4 py-2.5 bg-[#0F8A4B] text-white text-sm font-bold rounded-md min-h-[40px] whitespace-nowrap shrink-0 transition-all hover:bg-[#097b42] [@media(max-width:1179px)]:gap-2 [@media(max-width:1179px)]:px-3 [@media(max-width:1179px)]:py-2"
            aria-label="Contact SAFRON TECHNOLOGY on WhatsApp"
          >
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span className="wa-text whitespace-nowrap shrink-0 [@media(max-width:1179px)]:hidden">WhatsApp</span>
          </a>
          <button
            ref={hamburgerRef}
            className="nav-hamburger hidden [@media(max-width:1179px)]:flex p-2 rounded-md hover:bg-safron-mint transition-colors focus:outline-none focus-visible:ring-2 focus-visible-ring-safron-primary"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            aria-controls="nav-drawer"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="nav-drawer-overlay open fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={closeDrawer} />
            <motion.div
              ref={drawerRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
              className="nav-drawer open fixed top-[var(--header-h)] bottom-0 right-0 z-50 w-full max-w-[420px] bg-white border-l border-safron-border shadow-2xl"
              id="nav-drawer"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="nav-drawer-head flex items-center justify-between p-6 border-b border-safron-border">
                <div className="flex items-center gap-2">
                  <img src={LOGO_SRC} alt="SAFRON TECHNOLOGY" className="h-[32px] w-auto block" loading="eager" />
                  <span className="font-extrabold text-safron-deep-teal text-[18px] leading-none tracking-tight">
                    SAFRON<span className="text-safron-primary ml-1">TECHNOLOGY</span>
                  </span>
                </div>
                <button className="nav-drawer-close p-2 hover:bg-safron-mint rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-safron-primary" onClick={closeDrawer} aria-label="Close navigation menu">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="nav-drawer-links p-6 space-y-2">
                {NAV_ITEMS.map((item) => {
                  const hasDropdown = item.hasDropdown
                  const drawerOpen = openDropdown === item.label
                  return (
                    <div key={item.label} className="relative border-b border-safron-border pb-2 mb-2 last:border-0 last:pb-0 last:mb-0">
                      <button
                        className={`nav-drawer-link w-full text-left py-2.5 text-lg font-medium transition-colors ${drawerOpen ? 'bg-safron-mint text-safron-primary' : ''}`}
                        onClick={() => {
                          if (hasDropdown) {
                            toggleDropdown(item.label)
                          } else {
                            handleDrawerLinkClick()
                          }
                        }}
                        aria-expanded={drawerOpen}
                        aria-haspopup={hasDropdown ? 'menu' : undefined}
                        aria-controls={`drawer-dropdown-${item.label}`}
                      >
                        {item.label}
                        {hasDropdown && <ChevronDown className="chev w-4 h-4 float-right mt-0.5" />}
                      </button>
                      <AnimatePresence mode="wait">
                        {drawerOpen && (
                          <motion.div
                            key="sub"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="nav-drawer-sub open pl-4 space-y-1"
                            id={`drawer-dropdown-${item.label}`}
                            role="menu"
                          >
                            {DROPDOWN_ITEMS[item.label].map((d) => (
                              <Link
                                key={d.label}
                                to={d.to}
                                role="menuitem"
                                onClick={handleDrawerLinkClick}
                                className="block py-1.5 px-2 text-sm text-safron-muted-text hover:text-safron-primary hover:bg-safron-light-bg rounded-md transition-colors"
                              >
                                {d.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>

              <div className="nav-drawer-actions p-6 border-t border-safron-border space-y-4">
                <div className="nav-drawer-contact space-y-2">
                  <a href="tel:+8801788585741" className="flex items-center gap-3 text-safron-deep-teal font-medium">
                    <Phone className="w-4 h-4 text-safron-primary shrink-0" />
                    <span>01788585741</span>
                  </a>
                  <a href="mailto:safrontechnology01@gmail.com" className="flex items-center gap-3 text-safron-muted-text text-sm hover:text-safron-primary transition-colors">
                    <span>✉ safrontechnology01@gmail.com</span>
                  </a>
                </div>
                <Link to="/contact" className="get-quote-btn w-full py-3 text-center">
                  Get a Quote
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-whatsapp flex items-center gap-3 w-full justify-center px-4 py-2.5 bg-[#0F8A4B] text-white text-sm font-bold rounded-md whitespace-nowrap hover:bg-[#097b42] transition-colors"
                  aria-label="Contact SAFRON TECHNOLOGY on WhatsApp"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="wa-text whitespace-nowrap shrink-0">WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
