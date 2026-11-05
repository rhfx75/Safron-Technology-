import { SectionTitle } from '../components/SectionTitle'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'
import { motion } from 'framer-motion'
import { useState } from 'react'

const CATEGORIES = [
  'All Projects',
  'Industrial Facility',
  'Commercial Building',
  'Healthcare Facility',
  'Educational Institution',
  'Manufacturing',
] as const

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('All Projects')

  const filteredProjects = activeCategory === 'All Projects'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558828659-3f4d618c61cf?w=1920&q=80"
            alt="Engineering projects"
            className="w-full h-[400px] object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-safron-deep-teal/85" />
        </div>
        <div className="relative z-10 container section pt-20 pb-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Featured Projects</h1>
          <p className="text-lg text-white max-w-xl mx-auto">
            Completed engineering projects across industrial, commercial, and institutional facilities.
          </p>
        </div>
      </section>

      <section className="bg-[#F5FAF8]">
        <div className="container section">
          <SectionTitle
            title="Project Portfolio"
            subtitle="Explore our completed fire safety and engineering projects across Bangladesh."
          />

          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-safron-primary text-white border-safron-primary shadow-md'
                    : 'border-light text-charcoal hover:bg-safron-secondary hover:text-white hover:border-safron-secondary bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="projects-masonry">
            {filteredProjects.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: filteredProjects.indexOf(p) * 0.05 }}
                className="project-masonry-item"
              >
                <ProjectCard key={p.id} {...p} />
              </motion.div>
            ))}
          </div>

          {filteredProjects.length > 0 && (
            <div className="text-center mt-12">
              <a
                href="/projects"
                className="inline-flex items-center gap-2 text-safron-primary font-semibold hover:text-safron-secondary transition-colors"
              >
                View All Projects <span aria-hidden="true">→</span>
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
