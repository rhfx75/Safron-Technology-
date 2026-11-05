import {
  ShieldCheck,
  ShowerHead,
  Droplets,
  DoorClosed,
  Wind,
  Radar,
  LayoutDashboard,
  Cloud,
  Thermometer,
  BellRing,
  FireExtinguisher,
  Gauge,
  Fuel,
  Zap,
  Activity,
  Lightbulb,
  PlugZap,
  Shield,
  Loader,
} from 'lucide-react'

const ICON_MAP: Record<string, any> = {
  ShieldCheck,
  ShowerHead,
  Droplets,
  DoorClosed,
  Wind,
  Radar,
  LayoutDashboard,
  Cloud,
  Thermometer,
  BellRing,
  FireExtinguisher,
  Gauge,
  Fuel,
  Zap,
  Activity,
  Lightbulb,
  PlugZap,
  Shield,
  Loader,
}

export interface Specification {
  label: string
  value: string
}

export interface ProductDocument {
  label: string
  url: string | null
}

export interface Product {
  id: string
  slug: string
  name: string
  category: string
  subcategory: string
  brand?: string
  model?: string
  shortDescription: string
  description: string
  image: string | null
  gallery?: string[]
  specifications?: Specification[]
  features?: string[]
  applications?: string[]
  compatibility?: string[]
  certifications?: string[]
  documents?: ProductDocument[]
  availability?: 'available' | 'inquiry-required' | 'not-specified'
  featured?: boolean
  keywords?: string[]
}

export interface ProductSubCategory {
  key: string
  slug: string
  label: string
  icon: string
}

export interface ProductCategory {
  key: string
  slug: string
  label: string
  icon: string
  image: string | null
  description: string
  subCategories: ProductSubCategory[]
}

export interface WhatsAppConfig {
  number: string
  messageTemplate: (productName: string) => string
}

export interface CatalogueDocument {
  id: string
  title: string
  manufacturer: string
  type: 'datasheet' | 'catalogue' | 'manual' | 'certificate'
  url: string | null
  fileSize?: string
  lastUpdated?: string
}

export const whatsAppConfig: WhatsAppConfig = {
  number: '8801788585741',
  messageTemplate: (productName: string) =>
    `Hello SAFRON TECHNOLOGY, I would like to request a quotation for ${productName}. Please share the price, specifications, availability, and delivery details.`,
}

export const productCategories: ProductCategory[] = [
  {
    key: 'fire-protection-system',
    slug: 'fire-protection',
    label: 'Fire Protection System',
    icon: 'ShieldCheck',
    image: null,
    description:
      'Complete fire protection systems including pumps, sprinklers, valves, hydrants, extinguishers, and suppression for commercial, industrial, and institutional buildings.',
    subCategories: [
      { key: 'fire-fighting-pumps', slug: 'fire-fighting-pumps', label: 'Fire Fighting Pumps', icon: 'Gauge' },
      { key: 'fire-sprinkler-systems', slug: 'fire-sprinkler-systems', label: 'Fire Sprinkler Systems', icon: 'ShowerHead' },
      { key: 'fire-protection-valves', slug: 'fire-protection-valves', label: 'Fire Protection Valves', icon: 'Valve' },
      { key: 'fire-hydrant-accessories', slug: 'fire-hydrant-accessories', label: 'Fire Hydrant & Standpipe Accessories', icon: 'Droplets' },
      { key: 'pipes-fittings-accessories', slug: 'pipes-fittings-accessories', label: 'Pipes, Fittings & Accessories', icon: 'PlugZap' },
      { key: 'fire-extinguishers', slug: 'fire-extinguishers', label: 'Fire Extinguishers', icon: 'FireExtinguisher' },
      { key: 'fire-suppression-systems', slug: 'fire-suppression-systems', label: 'Fire Suppression Systems', icon: 'Wind' },
    ],
  },
  {
    key: 'fire-detection-system',
    slug: 'fire-detection',
    label: 'Fire Detection & Alarm System',
    icon: 'Radar',
    image: null,
    description:
      'Fire alarm panels, smoke detectors, heat detectors, multi-sensor detectors, manual call points, sounders, interface modules, and alarm cables for early fire detection.',
    subCategories: [
      { key: 'fire-alarm-panels', slug: 'fire-alarm-panels', label: 'Fire Alarm Control Panels', icon: 'LayoutDashboard' },
      { key: 'smoke-detectors', slug: 'smoke-detectors', label: 'Smoke Detectors', icon: 'Cloud' },
      { key: 'heat-detectors', slug: 'heat-detectors', label: 'Heat Detectors', icon: 'Thermometer' },
      { key: 'multi-sensor-detectors', slug: 'multi-sensor-detectors', label: 'Multi-Sensor Detectors', icon: 'Shield' },
      { key: 'manual-call-points', slug: 'manual-call-points', label: 'Manual Call Points', icon: 'BellRing' },
      { key: 'sounders-notification', slug: 'sounders-notification', label: 'Sounders & Notification Appliances', icon: 'Zap' },
      { key: 'input-output-modules', slug: 'input-output-modules', label: 'Input, Output & Interface Modules', icon: 'Activity' },
      { key: 'fire-alarm-cables', slug: 'fire-alarm-cables', label: 'Fire Alarm Cables & Accessories', icon: 'PlugZap' },
    ],
  },
  {
    key: 'fire-rated-doors',
    slug: 'fire-rated-doors',
    label: 'Fire-Rated Doors & Emergency Exit Solutions',
    icon: 'DoorClosed',
    image: null,
    description:
      'Steel and timber fire-rated doors, glazed doors, acoustic doors, fire curtains, rolling shutters, hardware, frames, and emergency exit solutions.',
    subCategories: [
      { key: 'steel-fire-doors', slug: 'steel-fire-doors', label: 'Steel Fire-Rated Doors', icon: 'DoorClosed' },
      { key: 'single-double-leaf-fire-doors', slug: 'single-double-leaf-fire-doors', label: 'Single-Leaf & Double-Leaf Fire Doors', icon: 'DoorClosed' },
      { key: 'glazed-fire-doors', slug: 'glazed-fire-doors', label: 'Glazed Fire-Rated Doors', icon: 'DoorClosed' },
      { key: 'acoustic-fire-doors', slug: 'acoustic-fire-doors', label: 'Acoustic Fire Doors', icon: 'DoorClosed' },
      { key: 'fire-smoke-curtains', slug: 'fire-smoke-curtains', label: 'Fire & Smoke Curtains', icon: 'Wind' },
      { key: 'fire-rolling-shutters', slug: 'fire-rolling-shutters', label: 'Fire-Rated Rolling Shutters', icon: 'DoorClosed' },
      { key: 'fire-door-hardware', slug: 'fire-door-hardware', label: 'Fire Door Hardware', icon: 'Shield' },
      { key: 'fire-door-frames', slug: 'fire-door-frames', label: 'Fire Door Frames & Accessories', icon: 'DoorClosed' },
    ],
  },
  {
    key: 'passive-fire-protection',
    slug: 'passive-fire-protection',
    label: 'Passive Fire Protection System',
    icon: 'Shield',
    image: null,
    description:
      'Intumescent paint, cementitious fireproofing, fire-rated wall systems, firestop sealants, mortars, collars, building panels, sandwich panels, dampers, and volume control dampers.',
    subCategories: [
      { key: 'intumescent-paint', slug: 'intumescent-paint', label: 'Intumescent Fire-Retardant Paint', icon: 'Shield' },
      { key: 'cementitious-fireproofing', slug: 'cementitious-fireproofing', label: 'Cementitious Fireproofing', icon: 'Shield' },
      { key: 'fire-rated-wall-systems', slug: 'fire-rated-wall-systems', label: 'Fire-Rated Wall Systems', icon: 'Shield' },
      { key: 'firestop-sealants-mortars-collars', slug: 'firestop-sealants-mortars-collars', label: 'Firestop Sealants, Mortars & Collars', icon: 'Shield' },
      { key: 'fire-rated-building-panels', slug: 'fire-rated-building-panels', label: 'Fire-Rated Building Panels', icon: 'Shield' },
      { key: 'fire-rated-sandwich-panels', slug: 'fire-rated-sandwich-panels', label: 'Fire-Rated Sandwich Panels', icon: 'Shield' },
      { key: 'fire-smoke-dampers', slug: 'fire-smoke-dampers', label: 'Fire & Smoke Dampers', icon: 'Wind' },
      { key: 'volume-control-dampers', slug: 'volume-control-dampers', label: 'Volume Control Dampers', icon: 'Wind' },
    ],
  },
  {
    key: 'electrical-safety',
    slug: 'electrical-safety',
    label: 'Electrical & Lightning Safety System',
    icon: 'PlugZap',
    image: null,
    description:
      'Lightning protection systems, air terminals, conductors, down conductors, earth electrodes, earthing accessories, surge protection devices, and electrical protection accessories.',
    subCategories: [
      { key: 'lightning-protection-systems', slug: 'lightning-protection-systems', label: 'Lightning Protection Systems', icon: 'Zap' },
      { key: 'air-terminals', slug: 'air-terminals', label: 'Air Terminals', icon: 'Zap' },
      { key: 'lightning-conductors', slug: 'lightning-conductors', label: 'Lightning Protection Conductors', icon: 'Zap' },
      { key: 'down-conductors', slug: 'down-conductors', label: 'Down Conductors', icon: 'Zap' },
      { key: 'earth-electrodes', slug: 'earth-electrodes', label: 'Earth Electrodes', icon: 'Activity' },
      { key: 'earthing-accessories', slug: 'earthing-accessories', label: 'Earthing Accessories', icon: 'Activity' },
      { key: 'surge-protection-devices', slug: 'surge-protection-devices', label: 'Surge Protection Devices', icon: 'Zap' },
      { key: 'electrical-protection-accessories', slug: 'electrical-protection-accessories', label: 'Electrical Protection Accessories', icon: 'PlugZap' },
    ],
  },
]

function placeholderImage(label: string, accent: string = '#087A43'): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
      <rect width="600" height="450" fill="#F5FAF8" />
      <rect x="20" y="20" width="560" height="410" rx="12" fill="none" stroke="${accent}" stroke-width="2" />
      <text x="300" y="210" font-family="Poppins, sans-serif" font-size="14" fill="#5B726C" text-anchor="middle" dominant-baseline="middle">${label}</text>
      <text x="300" y="232" font-family="Poppins, sans-serif" font-size="12" fill="#5B726C" text-anchor="middle" dominant-baseline="middle">Product image placeholder</text>
    </svg>
  `.trim()
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export const products: Product[] = [
  // ---- Fire Protection System - Fire Fighting Pumps ----
  {
    id: 'diesel-engine-fire-pump-set',
    slug: 'diesel-engine-fire-pump-set',
    name: 'Diesel Engine Fire Pump Set',
    category: 'fire-protection-system',
    subcategory: 'Fire Fighting Pumps',
    brand: 'Patterson',
    model: 'VDF-150',
    shortDescription: 'High-pressure diesel fire pump with controller.',
    description:
      'High-pressure diesel fire pump with controller for reliable water supply during power failure. Compliant with NFPA 20 standards.',
    image: '/images/products/fire-protection/patterson-vdf-150.png',
    featured: true,
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'VDF-150' },
      { label: 'Type', value: 'Diesel engine driven' },
      { label: 'Flow Rate', value: 'Up to 1,500 GPM' },
      { label: 'Certification', value: 'NFPA 20, UL listed' },
    ],
    features: ['Diesel engine', 'Controller included', 'NFPA 20 compliant'],
    applications: ['Fire pump rooms', 'Industrial facilities', 'Commercial buildings'],
    documents: [{ label: 'Operation Manual', url: null }],
  },
  {
    id: 'electric-motor-driven-fire-pump',
    slug: 'electric-motor-driven-fire-pump',
    name: 'Electric Motor Driven Fire Pump',
    category: 'fire-protection-system',
    subcategory: 'Fire Fighting Pumps',
    brand: 'Patterson',
    model: 'VEF-200',
    shortDescription: 'Electric fire pump with UL-listed motor and controller.',
    description:
      'Electric fire pump with UL-listed motor and controller for reliable water supply in fire protection systems.',
    image: '/images/products/fire-protection/patterson-vef-200.webp',
    featured: true,
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'VEF-200' },
      { label: 'Type', value: 'Electric motor driven' },
      { label: 'Flow Rate', value: 'Up to 2,000 GPM' },
      { label: 'Certification', value: 'NFPA 20, UL listed' },
    ],
    features: ['Electric motor', 'UL-listed controller', 'NFPA 20 compliant'],
    applications: ['Fire pump rooms', 'Commercial buildings', 'Industrial facilities'],
    documents: [{ label: 'Installation Guide', url: null }],
  },
  {
    id: 'jockey-pump',
    slug: 'jockey-pump',
    name: 'Jockey Pump',
    category: 'fire-protection-system',
    subcategory: 'Fire Fighting Pumps',
    brand: 'Patterson',
    model: 'VJP-25',
    shortDescription: 'Compact jockey pump to maintain system pressure.',
    description: 'Compact jockey pump to maintain system pressure in fire protection systems.',
    image: placeholderImage('Jockey Pump'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'VJP-25' },
      { label: 'Type', value: 'Jockey pump' },
      { label: 'Flow Rate', value: 'Up to 25 GPM' },
      { label: 'Certification', value: 'NFPA 20' },
    ],
    features: ['Pressure maintenance', 'Compact design', 'Electric driven'],
    applications: ['Pressure maintenance', 'Fire protection systems', 'Commercial buildings'],
  },
  {
    id: 'diesel-jockey-pump',
    slug: 'diesel-jockey-pump',
    name: 'Diesel Jockey Pump',
    category: 'fire-protection-system',
    subcategory: 'Fire Fighting Pumps',
    brand: 'Patterson',
    model: 'VDJ-50',
    shortDescription: 'Compact diesel jockey pump to maintain system pressure.',
    description: 'Compact diesel jockey pump to maintain system pressure.',
    image: placeholderImage('Diesel Jockey Pump'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'VDJ-50' },
      { label: 'Type', value: 'Diesel jockey pump' },
      { label: 'Flow Rate', value: 'Up to 50 GPM' },
      { label: 'Certification', value: 'NFPA 20' },
    ],
    features: ['Pressure maintenance', 'Compact design', 'Diesel driven'],
    applications: ['Pressure maintenance', 'Fire pump systems', 'Commercial buildings'],
  },

  // ---- Fire Protection System - Fire Sprinkler Systems ----
  {
    id: 'wet-pipe-sprinkler-system',
    slug: 'wet-pipe-sprinkler-system',
    name: 'Wet Pipe Sprinkler System',
    category: 'fire-protection-system',
    subcategory: 'Fire Sprinkler Systems',
    brand: 'Tyco',
    model: 'TP-100',
    shortDescription: 'Closed-head wet pipe sprinkler system with automatic activation.',
    description: 'Closed-head wet pipe sprinkler system with automatic activation for fire protection.',
    image: '/images/products/fire-protection/tyco-tp-100.jpg',
    featured: true,
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'TP-100' },
      { label: 'System Type', value: 'Wet pipe' },
      { label: 'Operating Pressure', value: 'Up to 175 psi' },
      { label: 'Certification', value: 'UL 199, NFPA 13' },
    ],
    features: ['Closed-head sprinklers', 'Automatic activation', 'Water-filled piping'],
    applications: ['Commercial buildings', 'Residential complexes', 'Hotels'],
    documents: [{ label: 'Design Guide', url: null }],
  },
  {
    id: 'dry-pipe-sprinkler-system',
    slug: 'dry-pipe-sprinkler-system',
    name: 'Dry Pipe Sprinkler System',
    category: 'fire-protection-system',
    subcategory: 'Fire Sprinkler Systems',
    brand: 'Tyco',
    model: 'DP-200',
    shortDescription: 'Dry pipe system for cold storage and unheated areas.',
    description: 'Dry pipe sprinkler system for cold storage and unheated areas where freezing is a concern.',
    image: placeholderImage('Dry Pipe Sprinkler System'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'DP-200' },
      { label: 'System Type', value: 'Dry pipe' },
      { label: 'Operating Pressure', value: 'Up to 175 psi' },
      { label: 'Certification', value: 'UL 199, NFPA 13' },
    ],
    features: ['Dry pipe', 'Freeze protection', 'NFPA 13 compliant'],
    applications: ['Cold storage', 'Unheated areas', 'Parking garages'],
  },
  {
    id: 'preaction-sprinkler-system',
    slug: 'preaction-sprinkler-system',
    name: 'Pre-Action Sprinkler System',
    category: 'fire-protection-system',
    subcategory: 'Fire Sprinkler Systems',
    brand: 'Tyco',
    model: 'PA-300',
    shortDescription: 'Double-interlock pre-action system for sensitive environments.',
    description: 'Double-interlock pre-action sprinkler system for sensitive environments such as data centers.',
    image: placeholderImage('Pre-Action Sprinkler System'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'PA-300' },
      { label: 'System Type', value: 'Pre-action' },
      { label: 'Interlock Type', value: 'Double-interlock' },
      { label: 'Certification', value: 'UL 199, NFPA 13' },
    ],
    features: ['Double-interlock', 'Sensitive environments', 'False discharge prevention'],
    applications: ['Server rooms', 'Data centers', 'Museums'],
  },

  // ---- Fire Protection System - Fire Protection Valves ----
  {
    id: 'osy-gate-valve',
    slug: 'osy-gate-valve',
    name: 'OS&Y Gate Valve',
    category: 'fire-protection-system',
    subcategory: 'Fire Protection Valves',
    brand: 'Viking',
    model: 'OSY-1',
    shortDescription: 'Outside screw and yoke gate valve for fire protection systems.',
    description: 'OS&Y gate valve for fire protection system isolation and control.',
    image: placeholderImage('OS&Y Gate Valve'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'OSY-1' },
      { label: 'Type', value: 'OS&Y Gate Valve' },
      { label: 'Certification', value: 'UL listed' },
    ],
    features: ['OS&Y design', 'Fire protection rated', 'Isolation control'],
    applications: ['Fire protection systems', 'Water supply lines', 'Industrial facilities'],
  },
  {
    id: 'butterfly-valve',
    slug: 'butterfly-valve',
    name: 'Butterfly Valve',
    category: 'fire-protection-system',
    subcategory: 'Fire Protection Valves',
    brand: 'Viking',
    model: 'BFV-200',
    shortDescription: 'Butterfly valve for fire protection flow control.',
    description: 'Butterfly valve for flow control in fire protection piping systems.',
    image: '/images/products/fire-protection/viking-bfv-200.webp',
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'BFV-200' },
      { label: 'Type', value: 'Butterfly Valve' },
      { label: 'Certification', value: 'UL listed' },
    ],
    features: ['Quarter-turn operation', 'Fire protection rated', 'Low pressure drop'],
    applications: ['Fire protection piping', 'Flow control', 'Isolation'],
  },
  {
    id: 'swing-check-valve',
    slug: 'swing-check-valve',
    name: 'Swing Check Valve',
    category: 'fire-protection-system',
    subcategory: 'Fire Protection Valves',
    brand: 'Viking',
    model: 'SCV-1',
    shortDescription: 'Swing check valve for backflow prevention in fire systems.',
    description: 'Swing check valve to prevent backflow in fire protection piping.',
    image: placeholderImage('Swing Check Valve'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'SCV-1' },
      { label: 'Type', value: 'Swing Check Valve' },
      { label: 'Certification', value: 'UL listed' },
    ],
    features: ['Backflow prevention', 'Fire protection rated', 'Automatic operation'],
    applications: ['Fire protection systems', 'Pump discharge', 'Water supply'],
  },

  // ---- Fire Protection System - Fire Hydrant & Standpipe Accessories ----
  {
    id: 'fire-hydrant-landing-valve',
    slug: 'fire-hydrant-landing-valve',
    name: 'Fire Hydrant Landing Valve',
    category: 'fire-protection-system',
    subcategory: 'Fire Hydrant & Standpipe Accessories',
    brand: 'Viking',
    model: 'F-1',
    shortDescription: 'Bronze landing valve with instantaneous coupling for fire hydrant systems.',
    description: 'Bronze landing valve with instantaneous coupling for fire hydrant systems.',
    image: placeholderImage('Fire Hydrant Landing Valve'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'F-1' },
      { label: 'Material', value: 'Bronze' },
      { label: 'Connection', value: 'Instantaneous coupling' },
      { label: 'Certification', value: 'UL 668' },
    ],
    features: ['Bronze construction', 'Instantaneous coupling', 'UL listed'],
    applications: ['Fire hydrant systems', 'Industrial facilities', 'Commercial buildings'],
  },
  {
    id: 'fire-hose-reel',
    slug: 'fire-hose-reel',
    name: 'Fire Hose Reel',
    category: 'fire-protection-system',
    subcategory: 'Fire Hydrant & Standpipe Accessories',
    brand: 'Viking',
    model: 'HR-30',
    shortDescription: 'Wall-mounted fire hose reel with 30m hose and brass nozzle.',
    description: 'Wall-mounted fire hose reel with 30m hose and brass nozzle.',
    image: placeholderImage('Fire Hose Reel'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'HR-30' },
      { label: 'Hose Length', value: '30 m' },
      { label: 'Nozzle', value: 'Brass' },
      { label: 'Mounting', value: 'Wall-mounted' },
    ],
    features: ['30m hose', 'Brass nozzle', 'Wall-mounted'],
    applications: ['Commercial buildings', 'Industrial facilities', 'Warehouses'],
  },
  {
    id: 'fire-hydrant-cabinet',
    slug: 'fire-hydrant-cabinet',
    name: 'Fire Hydrant Cabinet',
    category: 'fire-protection-system',
    subcategory: 'Fire Hydrant & Standpipe Accessories',
    brand: 'Viking',
    model: 'HC-400',
    shortDescription: 'Fire-rated steel hydrant cabinet with glass door and lock.',
    description: 'Fire-rated steel hydrant cabinet with glass door and lock.',
    image: placeholderImage('Fire Hydrant Cabinet'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'HC-400' },
      { label: 'Material', value: 'Fire-rated steel' },
      { label: 'Door', value: 'Glass with lock' },
      { label: 'Certification', value: 'UL listed' },
    ],
    features: ['Fire-rated steel', 'Glass door', 'Lockable'],
    applications: ['Building exteriors', 'Industrial facilities', 'Commercial complexes'],
  },

  // ---- Fire Protection System - Pipes, Fittings & Accessories ----
  {
    id: 'ms-fire-protection-pipe',
    slug: 'ms-fire-protection-pipe',
    name: 'MS Fire Protection Pipe',
    category: 'fire-protection-system',
    subcategory: 'Pipes, Fittings & Accessories',
    brand: 'To Be Specified',
    model: 'To Be Specified',
    shortDescription: 'Mild steel pipe for fire protection systems.',
    description: 'Mild steel pipe for fire protection systems including sprinkler and hydrant networks.',
    image: placeholderImage('MS Fire Protection Pipe'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Material', value: 'Mild Steel' },
      { label: 'Application', value: 'Fire protection piping' },
    ],
    features: ['Fire protection rated', 'Durable construction', 'Standard sizes'],
    applications: ['Sprinkler systems', 'Hydrant systems', 'Standpipe systems'],
  },
  {
    id: 'threaded-fittings',
    slug: 'threaded-fittings',
    name: 'Threaded Fittings',
    category: 'fire-protection-system',
    subcategory: 'Pipes, Fittings & Accessories',
    brand: 'To Be Specified',
    model: 'To Be Specified',
    shortDescription: 'Threaded pipe fittings for fire protection systems.',
    description: 'Threaded pipe fittings for fire protection piping connections.',
    image: placeholderImage('Threaded Fittings'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Material', value: 'Steel' },
      { label: 'Connection', value: 'Threaded' },
    ],
    features: ['Fire protection rated', 'Threaded connection', 'Multiple sizes'],
    applications: ['Fire protection piping', 'System connections'],
  },

  // ---- Fire Protection System - Fire Extinguishers ----
  {
    id: 'abc-dry-powder-extinguisher-6kg',
    slug: 'abc-dry-powder-fire-extinguisher-6kg',
    name: 'ABC Dry Powder Fire Extinguisher 6kg',
    category: 'fire-protection-system',
    subcategory: 'Fire Extinguishers',
    brand: 'NAFFCO',
    model: 'FHE-6',
    shortDescription: '6kg ABC dry powder extinguisher suitable for Class A, B, and C fires.',
    description: '6kg ABC dry powder extinguisher suitable for Class A, B, and C fires.',
    image: '/images/products/fire-protection/naffco-fhe-6.jpg',
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'FHE-6' },
      { label: 'Capacity', value: '6 kg' },
      { label: 'Fire Class', value: 'A, B, C' },
      { label: 'Certification', value: 'UL 299' },
    ],
    features: ['6kg capacity', 'ABC class', 'Refillable'],
    applications: ['General use', 'Commercial buildings', 'Workshops'],
    documents: [{ label: 'Datasheet', url: null }],
  },
  {
    id: 'abc-dry-powder-extinguisher-9kg',
    slug: 'abc-dry-powder-fire-extinguisher-9kg',
    name: 'ABC Dry Powder Fire Extinguisher 9kg',
    category: 'fire-protection-system',
    subcategory: 'Fire Extinguishers',
    brand: 'NAFFCO',
    model: 'FHE-9',
    shortDescription: '9kg ABC dry powder extinguisher for industrial risk areas.',
    description: '9kg ABC dry powder extinguisher for industrial risk areas.',
    image: '/images/products/fire-protection/naffco-fhe-9.jpg',
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'FHE-9' },
      { label: 'Capacity', value: '9 kg' },
      { label: 'Fire Class', value: 'A, B, C' },
      { label: 'Certification', value: 'UL 299' },
    ],
    features: ['9kg capacity', 'ABC class', 'Industrial grade'],
    applications: ['Industrial areas', 'Warehouses', 'Factories'],
  },
  {
    id: 'co2-extinguisher-2kg',
    slug: 'co2-fire-extinguisher-2kg',
    name: 'CO2 Fire Extinguisher 2kg',
    category: 'fire-protection-system',
    subcategory: 'Fire Extinguishers',
    brand: 'NAFFCO',
    model: 'FCE-2',
    shortDescription: '2kg CO2 extinguisher for electrical fires (Class B & C).',
    description: '2kg CO2 extinguisher for electrical fires (Class B & C).',
    image: '/images/products/fire-protection/naffco-fce-2.jpg',
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'FCE-2' },
      { label: 'Capacity', value: '2 kg' },
      { label: 'Fire Class', value: 'B, C' },
      { label: 'Certification', value: 'UL 299' },
    ],
    features: ['CO2 agent', 'Electrical fires', 'No residue'],
    applications: ['Electrical rooms', 'Switchgear rooms', 'Server rooms'],
  },
  {
    id: 'co2-extinguisher-5kg',
    slug: 'co2-fire-extinguisher-5kg',
    name: 'CO2 Fire Extinguisher 5kg',
    category: 'fire-protection-system',
    subcategory: 'Fire Extinguishers',
    brand: 'NAFFCO',
    model: 'FCE-5',
    shortDescription: '5kg CO2 extinguisher for electrical switchgear rooms.',
    description: '5kg CO2 extinguisher for electrical switchgear rooms.',
    image: '/images/products/fire-protection/naffco-fce-5.webp',
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'FCE-5' },
      { label: 'Capacity', value: '5 kg' },
      { label: 'Fire Class', value: 'B, C' },
      { label: 'Certification', value: 'UL 299' },
    ],
    features: ['5kg capacity', 'CO2 agent', 'No residue'],
    applications: ['Switchgear rooms', 'Electrical panels', 'Control rooms'],
  },
  {
    id: 'afff-foam-extinguisher-6ltr',
    slug: 'afff-foam-fire-extinguisher-6ltr',
    name: 'AFFF Foam Fire Extinguisher 6ltr',
    category: 'fire-protection-system',
    subcategory: 'Fire Extinguishers',
    brand: 'NAFFCO',
    model: 'FF-6',
    shortDescription: '6 litre AFFF foam extinguisher for Class A and B fires.',
    description: '6 litre AFFF foam extinguisher for Class A and B fires.',
    image: '/images/products/fire-protection/naffco-ff-6.jpg',
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'FF-6' },
      { label: 'Capacity', value: '6 litre' },
      { label: 'Fire Class', value: 'A, B' },
      { label: 'Certification', value: 'UL 299' },
    ],
    features: ['AFFF foam', '6 litre capacity', 'Class A & B'],
    applications: ['Flammable liquid storage', 'Workshops', 'Garages'],
  },
  {
    id: 'water-extinguisher-9ltr',
    slug: 'water-fire-extinguisher-9ltr',
    name: 'Water Fire Extinguisher 9ltr',
    category: 'fire-protection-system',
    subcategory: 'Fire Extinguishers',
    brand: 'NAFFCO',
    model: 'FW-9',
    shortDescription: '9 litre water extinguisher for Class A fires.',
    description: '9 litre water extinguisher for Class A fires.',
    image: placeholderImage('Water Fire Extinguisher 9ltr'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'FW-9' },
      { label: 'Capacity', value: '9 litre' },
      { label: 'Fire Class', value: 'A' },
      { label: 'Certification', value: 'UL 299' },
    ],
    features: ['Water agent', '9 litre capacity', 'Class A fires'],
    applications: ['Offices', 'Residential buildings', 'Storage areas'],
  },

  // ---- Fire Protection System - Fire Suppression Systems ----
  {
    id: 'fm200-clean-agent-suppression-system',
    slug: 'fm200-clean-agent-suppression-system',
    name: 'FM-200 Clean Agent Suppression System',
    category: 'fire-protection-system',
    subcategory: 'Fire Suppression Systems',
    brand: '3M',
    model: 'FM-200',
    shortDescription: 'Gaseous fire suppression system for server rooms and critical electrical enclosures.',
    description: 'Gaseous fire suppression system for server rooms and critical electrical enclosures.',
    image: '/images/products/fire-protection/3m-fm-200.webp',
    featured: true,
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'FM-200' },
      { label: 'Agent Type', value: 'Clean agent (HFC-227ea)' },
      { label: 'Application', value: 'Server rooms, electrical enclosures' },
      { label: 'Certification', value: 'NFPA 2001, UL listed' },
    ],
    features: ['Clean agent', 'Electrically non-conductive', 'No residue'],
    applications: ['Server rooms', 'Data centers', 'Electrical enclosures'],
    documents: [{ label: 'Design Manual', url: null }],
  },
  {
    id: 'novec1230-clean-agent-system',
    slug: 'novec-1230-clean-agent-system',
    name: 'Novec 1230 Clean Agent System',
    category: 'fire-protection-system',
    subcategory: 'Fire Suppression Systems',
    brand: '3M',
    model: 'Novec 1230',
    shortDescription: 'Novec 1230 fluid-based clean agent suppression for data centers.',
    description: 'Novec 1230 fluid-based clean agent suppression for data centers.',
    image: placeholderImage('Novec 1230 Clean Agent System'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'Novec 1230' },
      { label: 'Agent Type', value: 'Clean agent (FK-5-1-12)' },
      { label: 'Application', value: 'Data centers' },
      { label: 'Certification', value: 'NFPA 2001, UL listed' },
    ],
    features: ['Clean agent', 'Environmentally friendly', 'No residue'],
    applications: ['Data centers', 'Server rooms', 'Control rooms'],
  },

  // ---- Fire Detection & Alarm System - Fire Alarm Control Panels ----
  {
    id: 'addressable-fire-alarm-control-panel',
    slug: 'addressable-fire-alarm-control-panel',
    name: 'Addressable Fire Alarm Control Panel',
    category: 'fire-detection-system',
    subcategory: 'Fire Alarm Control Panels',
    brand: 'Notifier',
    model: 'NFS2-3030',
    shortDescription: 'Intelligent fire alarm control panel with loop-based device management.',
    description: 'Intelligent fire alarm control panel with loop-based device management and real-time event monitoring.',
    image: '/images/products/fire-detection/notifier-nfs2-3030.jpg',
    featured: true,
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'NFS2-3030' },
      { label: 'Capacity', value: 'Up to 3,030 points' },
      { label: 'Operating Voltage', value: '24 VDC' },
      { label: 'Communication', value: 'SLC loop' },
      { label: 'Certification', value: 'UL 864, ULC S527' },
    ],
    features: ['Loop-based device management', 'Real-time event monitoring', 'Networkable'],
    applications: ['Commercial buildings', 'Industrial facilities', 'Healthcare facilities'],
    documents: [
      { label: 'Product Page (Honeywell)', url: 'https://buildings.honeywell.com/us/en/products/by-category/fire-life-safety/control-panels/fire-alarm-control-panels/nfs2-3030-intelligent-fire-alarm-control-panel' },
      { label: 'Installation Manual', url: null },
      { label: 'Programming Guide', url: null },
    ],
  },
  {
    id: 'conventional-fire-alarm-panel',
    slug: 'conventional-fire-alarm-panel',
    name: 'Conventional Fire Alarm Panel',
    category: 'fire-detection-system',
    subcategory: 'Fire Alarm Control Panels',
    brand: 'Hochiki',
    model: 'CHQ-ZC',
    shortDescription: 'Conventional zone-based fire alarm panel for small to medium installations.',
    description: 'Conventional zone-based fire alarm panel for small to medium installations.',
    image: '/images/products/fire-detection/hochiki-chq-zc.png',
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'CHQ-ZC' },
      { label: 'Capacity', value: 'Up to 8 zones' },
      { label: 'Operating Voltage', value: '24 VDC' },
      { label: 'Certification', value: 'UL 864' },
    ],
    features: ['Zone-based detection', 'Simple wiring', 'Cost-effective'],
    applications: ['Small offices', 'Retail stores', 'Warehouses'],
    documents: [{ label: 'Installation Manual', url: null }],
  },
  {
    id: 'analog-addressable-fire-panel',
    slug: 'analog-addressable-fire-panel',
    name: 'Analog Addressable Fire Panel',
    category: 'fire-detection-system',
    subcategory: 'Fire Alarm Control Panels',
    brand: 'Hochiki',
    model: 'ESP',
    shortDescription: 'Analog addressable panel with per-device sensitivity and drift compensation.',
    description: 'Analog addressable panel with per-device sensitivity and drift compensation.',
    image: '/images/products/fire-detection/hochiki-esp.jpg',
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'ESP' },
      { label: 'Capacity', value: 'Up to 250 devices per loop' },
      { label: 'Operating Voltage', value: '24 VDC' },
      { label: 'Certification', value: 'UL 864, ULC S527' },
    ],
    features: ['Per-device sensitivity', 'Drift compensation', 'Analog addressable'],
    applications: ['Commercial buildings', 'Educational institutions'],
    documents: [],
  },

  // ---- Fire Detection & Alarm System - Smoke Detectors ----
  {
    id: 'photoelectric-smoke-detector',
    slug: 'photoelectric-smoke-detector',
    name: 'Photoelectric Smoke Detector',
    category: 'fire-detection-system',
    subcategory: 'Smoke Detectors',
    brand: 'Hochiki',
    model: 'SLK-Z',
    shortDescription: 'Ceiling-mounted smoke detector with 360-degree sensing and low-profile design.',
    description: 'Ceiling-mounted smoke detector with 360-degree sensing and low-profile design.',
    image: placeholderImage('Photoelectric Smoke Detector'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'SLK-Z' },
      { label: 'Detection Type', value: 'Photoelectric' },
      { label: 'Operating Voltage', value: '24 VDC' },
      { label: 'Certification', value: 'UL 268' },
    ],
    features: ['360-degree sensing', 'Low-profile design', 'Ceiling-mounted'],
    applications: ['Office buildings', 'Hotels', 'Residential complexes'],
    documents: [{ label: 'Datasheet', url: null }],
  },
  {
    id: 'ionization-smoke-detector',
    slug: 'ionization-smoke-detector',
    name: 'Ionization Smoke Detector',
    category: 'fire-detection-system',
    subcategory: 'Smoke Detectors',
    brand: 'Hochiki',
    model: 'SLK-ZI',
    shortDescription: 'Fast-response ionization smoke detector for fast-flaming fires.',
    description: 'Fast-response ionization smoke detector for fast-flaming fires.',
    image: placeholderImage('Ionization Smoke Detector'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'SLK-ZI' },
      { label: 'Detection Type', value: 'Ionization' },
      { label: 'Operating Voltage', value: '24 VDC' },
      { label: 'Certification', value: 'UL 268' },
    ],
    features: ['Fast-response', 'Ionization technology', 'Ceiling-mounted'],
    applications: ['Storage areas', 'Garages', 'Industrial spaces'],
  },
  {
    id: 'duct-mounted-smoke-detector',
    slug: 'duct-mounted-smoke-detector',
    name: 'Duct-Mounted Smoke Detector',
    category: 'fire-detection-system',
    subcategory: 'Smoke Detectors',
    brand: 'System Sensor',
    model: 'DH100ACDCL',
    shortDescription: 'HVAC duct smoke detector for air-handling systems.',
    description: 'HVAC duct smoke detector for air-handling systems.',
    image: placeholderImage('Duct-Mounted Smoke Detector'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'DH100ACDCL' },
      { label: 'Detection Type', value: 'Photoelectric' },
      { label: 'Operating Voltage', value: '24 VDC' },
      { label: 'Certification', value: 'UL 268A' },
    ],
    features: ['Duct-mounted', 'Air-sampling', 'Photoelectric'],
    applications: ['HVAC systems', 'Air handling units', 'Commercial buildings'],
  },

  // ---- Fire Detection & Alarm System - Heat Detectors ----
  {
    id: 'fixed-temperature-heat-detector',
    slug: 'fixed-temperature-heat-detector',
    name: 'Fixed Temperature Heat Detector',
    category: 'fire-detection-system',
    subcategory: 'Heat Detectors',
    brand: 'System Sensor',
    model: '5601',
    shortDescription: 'Fixed temperature heat detector for kitchens and boiler rooms.',
    description: 'Fixed temperature heat detector for kitchens and boiler rooms.',
    image: placeholderImage('Fixed Temperature Heat Detector'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: '5601' },
      { label: 'Detection Type', value: 'Fixed temperature' },
      { label: 'Operating Voltage', value: '24 VDC' },
      { label: 'Certification', value: 'UL 521' },
    ],
    features: ['Fixed temperature', 'Ceiling-mounted', 'Rugged design'],
    applications: ['Kitchens', 'Boiler rooms', 'Mechanical rooms'],
  },
  {
    id: 'rate-of-rise-heat-detector',
    slug: 'rate-of-rise-heat-detector',
    name: 'Rate-of-Rise Heat Detector',
    category: 'fire-detection-system',
    subcategory: 'Heat Detectors',
    brand: 'System Sensor',
    model: '5602',
    shortDescription: 'Rate-of-rise heat detector detecting rapid temperature increase.',
    description: 'Rate-of-rise heat detector detecting rapid temperature increase.',
    image: placeholderImage('Rate-of-Rise Heat Detector'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: '5602' },
      { label: 'Detection Type', value: 'Rate-of-rise' },
      { label: 'Operating Voltage', value: '24 VDC' },
      { label: 'Certification', value: 'UL 521' },
    ],
    features: ['Rate-of-rise detection', 'Rapid temperature response', 'Ceiling-mounted'],
    applications: ['Furnace rooms', 'Kitchens', 'Dryer rooms'],
  },

  // ---- Fire Detection & Alarm System - Manual Call Points ----
  {
    id: 'manual-call-point-break-glass',
    slug: 'manual-call-point-break-glass',
    name: 'Manual Call Point (Break Glass)',
    category: 'fire-detection-system',
    subcategory: 'Manual Call Points',
    brand: 'Hochiki',
    model: 'CHQ-MCP',
    shortDescription: 'Surface-mounted manual fire alarm call point with resettable element.',
    description: 'Surface-mounted manual fire alarm call point with resettable element.',
    image: placeholderImage('Manual Call Point'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'CHQ-MCP' },
      { label: 'Type', value: 'Break glass' },
      { label: 'Mounting', value: 'Surface-mounted' },
      { label: 'Certification', value: 'UL 38' },
    ],
    features: ['Break glass activation', 'Resettable element', 'Surface-mounted'],
    applications: ['Corridors', 'Exit routes', 'Public buildings'],
    documents: [],
  },

  // ---- Fire-Rated Doors - Steel Fire-Rated Doors ----
  {
    id: 'fire-rated-steel-door',
    slug: 'fire-rated-steel-door',
    name: 'Fire Rated Steel Door',
    category: 'fire-rated-doors',
    subcategory: 'Steel Fire-Rated Doors',
    brand: 'Assa Abloy',
    model: 'FD-120',
    shortDescription: '2-hour fire rated steel door with vision panel and self-closing hardware.',
    description: '2-hour fire rated steel door with vision panel and self-closing hardware.',
    image: placeholderImage('Fire Rated Steel Door'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'FD-120' },
      { label: 'Fire Rating', value: '2 hours' },
      { label: 'Material', value: 'Steel' },
      { label: 'Certification', value: 'UL 10B, NFPA 80' },
    ],
    features: ['2-hour fire rating', 'Vision panel', 'Self-closing hardware'],
    applications: ['Building exits', 'Stairwells', 'Fire-rated walls'],
    documents: [{ label: 'Datasheet', url: null }],
  },
  {
    id: 'fire-rated-timber-door',
    slug: 'fire-rated-timber-door',
    name: 'Fire Rated Timber Door',
    category: 'fire-rated-doors',
    subcategory: 'Steel Fire-Rated Doors',
    brand: 'Assa Abloy',
    model: 'FT-60',
    shortDescription: '1-hour fire rated timber door with intumescent seals.',
    description: '1-hour fire rated timber door with intumescent seals.',
    image: placeholderImage('Fire Rated Timber Door'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'FT-60' },
      { label: 'Fire Rating', value: '1 hour' },
      { label: 'Material', value: 'Timber' },
      { label: 'Certification', value: 'UL 10B, NFPA 80' },
    ],
    features: ['1-hour fire rating', 'Intumescent seals', 'Timber finish'],
    applications: ['Building exits', 'Residential corridors', 'Office partitions'],
  },

  // ---- Passive Fire Protection - Intumescent Paint ----
  {
    id: 'intumescent-fire-retardant-paint',
    slug: 'intumescent-fire-retardant-paint',
    name: 'Intumescent Fire-Retardant Paint',
    category: 'passive-fire-protection',
    subcategory: 'Intumescent Fire-Retardant Paint',
    brand: 'To Be Specified',
    model: 'To Be Specified',
    shortDescription: 'Intumescent fire-retardant paint for structural steel protection.',
    description: 'Intumescent fire-retardant paint for structural steel protection.',
    image: placeholderImage('Intumescent Fire-Retardant Paint'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Type', value: 'Intumescent paint' },
      { label: 'Application', value: 'Structural steel' },
    ],
    features: ['Fire-retardant', 'Intumescent', 'Structural protection'],
    applications: ['Commercial buildings', 'Industrial facilities', 'Warehouses'],
  },

  // ---- Electrical & Lightning - Surge Protection Devices ----
  {
    id: 'surge-protection-device-type-2',
    slug: 'surge-protection-device-type-2',
    name: 'Surge Protection Device (SPD) Type 2',
    category: 'electrical-safety',
    subcategory: 'Surge Protection Devices',
    brand: 'Eaton',
    model: 'SPD-T2',
    shortDescription: 'Type 2 surge protection device for electrical panel transient overvoltage protection.',
    description: 'Type 2 surge protection device for electrical panel transient overvoltage protection.',
    image: placeholderImage('Surge Protection Device Type 2'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'SPD-T2' },
      { label: 'Type', value: 'Type 2' },
      { label: 'Application', value: 'Electrical panel' },
      { label: 'Certification', value: 'UL 1449' },
    ],
    features: ['Type 2 SPD', 'Transient overvoltage protection', 'UL 1449'],
    applications: ['Distribution boards', 'Electrical panels', 'Commercial buildings'],
    documents: [{ label: 'Datasheet', url: null }],
  },
  {
    id: 'surge-protection-device-type-1-2',
    slug: 'surge-protection-device-type-1-2',
    name: 'Surge Protection Device Type 1+2',
    category: 'electrical-safety',
    subcategory: 'Surge Protection Devices',
    brand: 'Eaton',
    model: 'SPD-T12',
    shortDescription: 'Type 1+2 combined SPD for main distribution board protection.',
    description: 'Type 1+2 combined SPD for main distribution board protection.',
    image: placeholderImage('Surge Protection Device Type 1+2'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'SPD-T12' },
      { label: 'Type', value: 'Type 1+2' },
      { label: 'Application', value: 'Main distribution board' },
      { label: 'Certification', value: 'UL 1449' },
    ],
    features: ['Type 1+2 combined', 'Main board protection', 'UL 1449'],
    applications: ['Main distribution boards', 'Service entrance', 'Industrial facilities'],
  },

  // ---- Electrical & Lightning - MCB & MCCB ----
  {
    id: 'miniature-circuit-breaker-mcb',
    slug: 'miniature-circuit-breaker-mcb',
    name: 'Miniature Circuit Breaker (MCB)',
    category: 'electrical-safety',
    subcategory: 'MCB & MCCB',
    brand: 'Eaton',
    model: 'MCB-1P',
    shortDescription: 'Thermal-magnetic MCB for overload and short-circuit protection.',
    description: 'Thermal-magnetic MCB for overload and short-circuit protection.',
    image: placeholderImage('Miniature Circuit Breaker MCB'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'MCB-1P' },
      { label: 'Type', value: 'Thermal-magnetic' },
      { label: 'Poles', value: '1' },
      { label: 'Certification', value: 'UL 489' },
    ],
    features: ['Thermal-magnetic', 'Overload protection', 'Short-circuit protection'],
    applications: ['Distribution boards', 'Residential panels', 'Commercial panels'],
    documents: [{ label: 'Datasheet', url: null }],
  },
  {
    id: 'moulded-case-circuit-breaker-mccb',
    slug: 'moulded-case-circuit-breaker-mccb',
    name: 'Moulded Case Circuit Breaker (MCCB)',
    category: 'electrical-safety',
    subcategory: 'MCB & MCCB',
    brand: 'Eaton',
    model: 'MCCB-3P',
    shortDescription: 'Adjustable MCCB for industrial distribution boards.',
    description: 'Adjustable MCCB for industrial distribution boards.',
    image: placeholderImage('Moulded Case Circuit Breaker MCCB'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'MCCB-3P' },
      { label: 'Type', value: 'Thermal-magnetic' },
      { label: 'Poles', value: '3' },
      { label: 'Certification', value: 'UL 489' },
    ],
    features: ['Adjustable trip', '3-pole', 'Industrial grade'],
    applications: ['Industrial distribution boards', 'Commercial panels', 'Factories'],
  },

  // ---- Electrical & Lightning - RCBO & RCCB ----
  {
    id: 'residual-current-breaker-with-overcurrent-rcbo',
    slug: 'residual-current-breaker-with-overcurrent-rcbo',
    name: 'Residual Current Breaker with Overcurrent (RCBO)',
    category: 'electrical-safety',
    subcategory: 'RCBO & RCCB',
    brand: 'Eaton',
    model: 'RCBO-2P',
    shortDescription: 'RCBO combining MCB and RCD protection in one device.',
    description: 'RCBO combining MCB and RCD protection in one device.',
    image: placeholderImage('Residual Current Breaker with Overcurrent RCBO'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'RCBO-2P' },
      { label: 'Type', value: 'RCBO' },
      { label: 'Poles', value: '2' },
      { label: 'Certification', value: 'UL 489' },
    ],
    features: ['MCB + RCD combined', '2-pole', 'Shock protection'],
    applications: ['Distribution boards', 'Residential panels', 'Commercial panels'],
  },
  {
    id: 'residual-current-circuit-breaker-rccb',
    slug: 'residual-current-circuit-breaker-rccb',
    name: 'Residual Current Circuit Breaker (RCCB)',
    category: 'electrical-safety',
    subcategory: 'RCBO & RCCB',
    brand: 'Eaton',
    model: 'RCCB-2P',
    shortDescription: 'RCCB for earth leakage and shock protection.',
    description: 'RCCB for earth leakage and shock protection.',
    image: placeholderImage('Residual Current Circuit Breaker RCCB'),
    availability: 'inquiry-required',
    specifications: [
      { label: 'Product Series', value: 'RCCB-2P' },
      { label: 'Type', value: 'RCCB' },
      { label: 'Poles', value: '2' },
      { label: 'Certification', value: 'UL 489' },
    ],
    features: ['Earth leakage protection', 'Shock protection', '2-pole'],
    applications: ['Distribution boards', 'Residential panels', 'Commercial panels'],
  },
]

/* ------------------------------------------------------------------ */
/*  Helper functions                                                  */
/* ------------------------------------------------------------------ */

export function getProductById(id: string) {
  return products.find((p) => p.id === id)
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getProductIcon(iconName: string) {
  return ICON_MAP[iconName] || Shield
}

export function getProductsByCategory(categoryKey: string) {
  if (categoryKey === 'all') return products
  return products.filter((p) => p.category === categoryKey)
}

export function getProductsBySubCategory(categoryKey: string, subCategory: string) {
  return products.filter(
    (p) => p.category === categoryKey && p.subcategory === subCategory
  )
}

export function findCategory(keyOrSlug: string) {
  return productCategories.find(
    (c) => c.key === keyOrSlug || c.slug === keyOrSlug
  )
}

export function findCategoryBySlug(slug: string) {
  return productCategories.find((c) => c.slug === slug)
}

export function findSubCategory(categoryKey: string, subKey: string) {
  const cat = findCategory(categoryKey)
  return cat?.subCategories.find((s) => s.key === subKey || s.slug === subKey)
}

export function getProductCount(categoryKey?: string, subCategory?: string) {
  if (!categoryKey || categoryKey === 'all') {
    return subCategory
      ? products.filter((p) => p.subcategory === subCategory).length
      : products.length
  }
  return subCategory
    ? getProductsBySubCategory(categoryKey, subCategory).length
    : getProductsByCategory(categoryKey).length
}

export function getCategoryProductCount(keyOrSlug: string) {
  return products.filter((p) => p.category === keyOrSlug).length
}

export function getTotalProductCount() {
  return products.length
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/* ------------------------------------------------------------------ */
/*  Catalogue documents (placeholder structure for future PDFs)       */
/* ------------------------------------------------------------------ */

export const catalogueDocuments: CatalogueDocument[] = [
  {
    id: 'company-product-catalogue',
    title: 'Company Product Catalogue',
    manufacturer: 'SAFRON TECHNOLOGY',
    type: 'catalogue',
    url: null,
    lastUpdated: 'To Be Specified',
  },
  {
    id: 'fire-pump-catalogue',
    title: 'Fire Pump Catalogue',
    manufacturer: 'SAFRON TECHNOLOGY',
    type: 'catalogue',
    url: null,
    lastUpdated: 'To Be Specified',
  },
  {
    id: 'fire-alarm-catalogue',
    title: 'Fire Alarm Catalogue',
    manufacturer: 'SAFRON TECHNOLOGY',
    type: 'catalogue',
    url: null,
    lastUpdated: 'To Be Specified',
  },
  {
    id: 'fire-door-catalogue',
    title: 'Fire Door Catalogue',
    manufacturer: 'SAFRON TECHNOLOGY',
    type: 'catalogue',
    url: null,
    lastUpdated: 'To Be Specified',
  },
  {
    id: 'fire-suppression-catalogue',
    title: 'Fire Suppression Catalogue',
    manufacturer: 'SAFRON TECHNOLOGY',
    type: 'catalogue',
    url: null,
    lastUpdated: 'To Be Specified',
  },
  {
    id: 'fire-protection-accessories',
    title: 'Fire Protection Accessories',
    manufacturer: 'SAFRON TECHNOLOGY',
    type: 'catalogue',
    url: null,
    lastUpdated: 'To Be Specified',
  },
  {
    id: 'technical-datasheets',
    title: 'Technical Datasheets',
    manufacturer: 'Various',
    type: 'datasheet',
    url: null,
    lastUpdated: 'To Be Specified',
  },
  {
    id: 'installation-manuals',
    title: 'Installation Manuals',
    manufacturer: 'Various',
    type: 'manual',
    url: null,
    lastUpdated: 'To Be Specified',
  },
]
