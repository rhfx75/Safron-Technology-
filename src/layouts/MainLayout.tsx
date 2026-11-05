import { Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-charcoal">
      <Navbar />
      <main className="flex-grow pt-[var(--navbar-height)]">
        <AnimatePresence mode="wait">
          <motion.div
            key="page"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="min-h-[calc(100vh-var(--navbar-height))]"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
