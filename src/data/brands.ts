export interface Brand {
  id: string
  name: string
  image: string
  alt: string
}

export const brands: Brand[] = [
  { id: 'naffco', name: 'NAFFCO', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&q=80', alt: 'NAFFCO brand' },
  { id: 'simplex', name: 'SIMPLEX', image: 'https://images.unsplash.com/photo-1558488887-d9ad34e72142?w=200&q=80', alt: 'SIMPLEX brand' },
  { id: 'bosch', name: 'BOSCH', image: 'https://images.unsplash.com/photo-1550684787-e1d66d8e50cb?w=200&q=80', alt: 'BOSCH brand' },
  { id: 'shield', name: 'SHIELD', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&q=80', alt: 'SHIELD brand' },
  { id: 'hochiki', name: 'HOCHIKI', image: 'https://images.unsplash.com/photo-1593028287119-0388217698e9?w=200&q=80', alt: 'HOCHIKI brand' },
  { id: 'cooper', name: 'COOPER', image: 'https://images.unsplash.com/photo-1576792782483-390e7a597e35?w=200&q=80', alt: 'COOPER brand' },
]

export const brandCategories = ['Fire Alarm', 'Suppression', 'Detection', 'Extinguishing', 'Valves', 'Lighting']
