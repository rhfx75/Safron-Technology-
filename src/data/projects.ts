import { Building, Users, Shield, CheckCircle, Trophy } from 'lucide-react'

const ICON_MAP: Record<string, any> = {
  Building,
  Users,
  Shield,
  CheckCircle,
  Trophy,
}

export interface Project {
  id: string
  name: string
  location: string
  category: string
  system: string
  image: string
  overview: string
  scope: string[]
  systems: string[]
  gallery: string[]
  related: string[]
}

export const projects: Project[] = [
  {
    id: 'rmg-factory-fire-protection',
    name: 'Garment Factory Fire Protection',
    location: 'Gazipur, Bangladesh',
    category: 'Industrial Facility',
    system: 'Fire Hydrant & Alarm System',
    image: 'https://images.unsplash.com/photo-1558828659-3f4d618c61cf?w=800&q=80',
    overview: 'Comprehensive fire protection solution for a large-scale ready-made garments facility, including hydrant network, fire alarm system, and portable extinguishers.',
    scope: [
      'Site survey and fire risk assessment',
      'Design of external hydrant network',
      'Supply and installation of fire pump set',
      'Installation of addressable fire alarm system',
      'Supply and placement of fire extinguishers',
      'Testing, commissioning, and handover',
    ],
    systems: ['Fire Hydrant System', 'Addressable Fire Alarm', 'Fire Pump Set', 'Fire Extinguishers'],
    gallery: [
      'https://images.unsplash.com/photo-1558828659-3f4d618c61cf?w=800&q=80',
      'https://images.unsplash.com/photo-1576792782483-390e7a597e35?w=800&q=80',
      'https://images.unsplash.com/photo-1584988048167-4b673067b710?w=800&q=80',
    ],
    related: ['textile-mill-suppression', 'commercial-building-alarm'],
  },
  {
    id: 'textile-mill-suppression',
    name: 'Textile Mill Suppression System',
    location: 'Narayanganj, Bangladesh',
    category: 'Manufacturing',
    system: 'Clean Agent Suppression',
    image: 'https://images.unsplash.com/photo-1581579258858-82d7880a4192?w=800&q=80',
    overview: 'Clean agent fire suppression system installed in electrical and control rooms of a textile manufacturing mill.',
    scope: [
      'Hazard area identification',
      'Design of FM-200 suppression system',
      'Cylinder bank and piping installation',
      'Integration with fire alarm panel',
      'Room integrity testing',
      'Commissioning and operator training',
    ],
    systems: ['FM-200 Clean Agent Suppression', 'Fire Alarm Integration'],
    gallery: [
      'https://images.unsplash.com/photo-1581579258858-82d7880a4192?w=800&q=80',
      'https://images.unsplash.com/photo-1623124703085-30db99557798?w=800&q=80',
    ],
    related: ['rmg-factory-fire-protection', 'industrial-facility-hydrant'],
  },
  {
    id: 'commercial-building-alarm',
    name: 'Commercial Building Fire Alarm',
    location: 'Dhaka, Bangladesh',
    category: 'Commercial Building',
    system: 'Addressable Fire Alarm System',
    image: 'https://images.unsplash.com/photo-1590433731297-3c917351e73a?w=800&q=80',
    overview: 'Addressable fire detection and alarm system for a multi-storey commercial office building.',
    scope: [
      'Building-wide detector layout design',
      'Installation of fire alarm control panels',
      'Smoke, heat, and manual call point deployment',
      'Notification appliances and strobes',
      'System testing and certification',
    ],
    systems: ['Addressable Fire Alarm System', 'Emergency Voice Communication'],
    gallery: [
      'https://images.unsplash.com/photo-1590433731297-3c917351e73a?w=800&q=80',
      'https://images.unsplash.com/photo-1552682459-9069f097579e?w=800&q=80',
    ],
    related: ['rmg-factory-fire-protection', 'healthcare-facility-safety'],
  },
  {
    id: 'industrial-facility-hydrant',
    name: 'Industrial Facility Hydrant Network',
    location: 'Chittagong, Bangladesh',
    category: 'Industrial Facility',
    system: 'Fire Pump & Hydrant System',
    image: 'https://images.unsplash.com/photo-1576792782483-390e7a597e35?w=800&q=80',
    overview: 'External fire hydrant network with diesel and electric fire pump sets for an industrial facility.',
    scope: [
      'Hydrant network design and hydraulic calculation',
      'Supply and installation of fire pump sets',
      'Underground and aboveground piping',
      'Hydrant valves, landing valves, and hose boxes',
      'Flow testing and commissioning',
    ],
    systems: ['Fire Pump Set', 'External Hydrant Network', 'Fire Water Tank'],
    gallery: [
      'https://images.unsplash.com/photo-1576792782483-390e7a597e35?w=800&q=80',
      'https://images.unsplash.com/photo-1558828659-3f4d618c61cf?w=800&q=80',
    ],
    related: ['textile-mill-suppression', 'rmg-factory-fire-protection'],
  },
  {
    id: 'healthcare-facility-safety',
    name: 'Healthcare Facility Safety Systems',
    location: 'Dhaka, Bangladesh',
    category: 'Healthcare Facility',
    system: 'Fire Detection & Alarm',
    image: 'https://images.unsplash.com/photo-1623124703085-30db99557798?w=800&q=80',
    overview: 'Fire detection, alarm, and emergency lighting systems for a healthcare facility.',
    scope: [
      'Fire risk assessment for patient areas',
      'Installation of smoke and heat detectors',
      'Fire alarm control and monitoring',
      'Emergency exit lighting',
      'Staff training and fire drills support',
    ],
    systems: ['Fire Detection & Alarm', 'Emergency Lighting'],
    gallery: [
      'https://images.unsplash.com/photo-1623124703085-30db99557798?w=800&q=80',
      'https://images.unsplash.com/photo-1593028287119-0388217698e9?w=800&q=80',
    ],
    related: ['commercial-building-alarm', 'educational-institution-safety'],
  },
  {
    id: 'educational-institution-safety',
    name: 'Educational Institution Fire Safety',
    location: 'Sylhet, Bangladesh',
    category: 'Educational Institution',
    system: 'Fire Alarm & Extinguishers',
    image: 'https://images.unsplash.com/photo-1552682459-9069f097579e?w=800&q=80',
    overview: 'Fire safety systems for an educational institution including alarm system and extinguisher deployment.',
    scope: [
      'Campus-wide fire alarm system design',
      'Detector and call point installation',
      'Fire extinguisher supply and placement',
      'Emergency exit signage',
      'Testing and certification',
    ],
    systems: ['Fire Alarm System', 'Fire Extinguishers', 'Exit Signage'],
    gallery: [
      'https://images.unsplash.com/photo-1552682459-9069f097579e?w=800&q=80',
      'https://images.unsplash.com/photo-1590433731297-3c917351e73a?w=800&q=80',
    ],
    related: ['healthcare-facility-safety', 'commercial-building-alarm'],
  },
]

export function getProjectById(id: string) {
  return projects.find((p) => p.id === id)
}

export function getProjectIcon(iconName: string) {
  return ICON_MAP[iconName] || Building
}
