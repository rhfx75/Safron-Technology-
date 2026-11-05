import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface ProjectCardProps {
  id: string
  name: string
  location: string
  category: string
  system: string
  image: string
}

export function ProjectCard({ id, name, location, category, system, image }: ProjectCardProps) {
  return (
    <article className="rounded-xl border border-light bg-white overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="h-52 overflow-hidden relative">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent">
          <span className="text-xs font-semibold text-safron-heading-dark uppercase tracking-wider bg-safron-secondary/10 text-safron-secondary px-2 py-1 rounded">{category}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-safron-primary mb-1">{name}</h3>
        <p className="text-charcoal/70 text-sm mb-3">{location}</p>
        <div className="flex items-center gap-2 text-sm text-charcoal mb-4">
          <ArrowRight className="w-3 h-3 text-charcoal/40" />
          <span>{system}</span>
        </div>
        <Link to={`/projects/${id}`} className="flex items-center gap-1 text-sm font-semibold text-safron-secondary hover:underline transition-colors">
          View Project <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </article>
  )
}
