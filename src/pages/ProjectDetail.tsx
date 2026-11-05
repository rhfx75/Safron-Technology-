import { useParams } from 'react-router-dom'
import { getProjectById } from '../data/projects'
import { SectionTitle } from '../components/SectionTitle'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'
import { Building, CheckCircle } from 'lucide-react'

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = getProjectById(id ?? '')

  if (!project) {
    return (
      <div className="container section text-center py-24">
        <h1 className="text-2xl font-bold text-safron-primary mb-4">Project Not Found</h1>
        <Link to="/projects" className="text-safron-secondary hover:underline">
          Back to Projects
        </Link>
      </div>
    )
  }


  const relatedProjects = project.related.map((rid) => getProjectById(rid)).filter(Boolean)

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-[400px] object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-safron-primary/70" />
        </div>
        <div className="relative z-10 container section pt-20 pb-16 text-center">
          <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20 mb-6 inline-block">
            {project.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{project.name}</h1>
          <div className="flex items-center justify-center gap-4 text-white text-sm mb-2">
            <span>{project.location}</span>
            <span className="w-px h-4 bg-light/40 mx-2" />
            <span>{project.system}</span>
          </div>
          <p className="text-lg text-white max-w-2xl mx-auto mt-4">{project.overview}</p>
        </div>
      </section>

      <section>
        <div className="container section">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <SectionTitle title="Project Overview" className="text-left mb-0" />
              <div className="space-y-6">
                <div className="p-6 rounded-xl border border-light bg-white">
                  <h3 className="font-bold text-safron-primary mb-3">Scope of Work</h3>
                  <ul className="space-y-3 text-sm text-charcoal/70">
                    {project.scope.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-safron-secondary mt-0.5 flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 rounded-xl border border-light bg-white">
                  <h3 className="font-bold text-safron-primary mb-3">Systems Supplied & Installed</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.systems.map((sys) => (
                      <span key={sys} className="px-3 py-1.5 rounded-full border border-light text-sm text-charcoal bg-light/50">
                        {sys}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6 rounded-xl border border-light bg-white">
                  <h3 className="font-bold text-safron-primary mb-4">Project Gallery</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {project.gallery.map((img, i) => (
                      <div key={i} className="aspect-square rounded-lg overflow-hidden border border-light bg-light">
                        <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-light bg-white sticky top-24">
                  <h3 className="font-bold text-safron-primary mb-4 flex items-center gap-2">
                    <Building className="w-5 h-5 text-safron-secondary" /> Project Information
                </h3>
                <div className="space-y-4 text-sm text-charcoal/70">
                  <div className="flex justify-between border-b border-light pb-2">
                    <span className="text-charcoal/60">Client / Project</span>
                    <span className="font-medium text-safron-primary">{project.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-light pb-2">
                    <span className="text-charcoal/60">Location</span>
                    <span className="font-medium text-safron-primary">{project.location}</span>
                  </div>
                  <div className="flex justify-between border-b border-light pb-2">
                    <span className="text-charcoal/60">Category</span>
                    <span className="font-medium text-safron-primary">{project.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/60">System Installed</span>
                    <span className="font-medium text-safron-primary">{project.system}</span>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-xl border border-light bg-white">
                <h3 className="font-bold text-safron-primary mb-4">Need a Similar Solution?</h3>
                <p className="text-sm text-charcoal/70 mb-6">
                  Discuss your project requirements with our engineering team.
                </p>
                <Link to="/contact">
                  <Button variant="primary" className="w-full py-3">
                    Request a Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {relatedProjects.length > 0 && (
            <div className="mt-16">
              <SectionTitle title="Related Projects" className="text-left mb-8" />
              <div className="grid md:grid-cols-3 gap-6">
                {relatedProjects.map((p) => (
                  <div key={p!.id} className="group">
                    <div className="h-32 overflow-hidden rounded-lg border border-light">
                      <img src={p!.image} alt={p!.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                    <h4 className="font-bold text-safron-primary mt-3 text-sm">{p!.name}</h4>
                    <p className="text-xs text-charcoal/60">{p!.location}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
