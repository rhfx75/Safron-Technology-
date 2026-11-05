'use client'

import { useForm } from 'react-hook-form'
import { Button } from './ui/Button'
import { Mail, Phone, Send } from 'lucide-react'

interface ContactFormValues {
  fullName: string
  companyName: string
  email: string
  phone: string
  service: string
  location: string
  message: string
}

const SERVICE_OPTIONS = [
  'Fire Protection System Design',
  'Fire Detection & Alarm Installation',
  'Fire Suppression & Extinguishing',
  'Fire Pump & Hydrant System',
  'Fire Door & Emergency Exit',
  'Electrical & Lightning Safety',
  'Inspection, Testing & Commissioning',
  'Maintenance (AMC)',
  'Fire Safety Equipment Supply',
  'Fire Safety Audit & Compliance',
]

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ defaultValues: { service: '' } })

  const onSubmit = (data: ContactFormValues) => {
    // Prepare for backend integration. No messages are sent without a backend.
    console.log('Inquiry submitted:', data)
    alert('Thank you for your inquiry. We have received your details and will get back to you shortly.')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-charcoal">Full Name</label>
          <input
            {...register('fullName', { required: 'Full name is required' })}
            type="text"
            placeholder="Enter your full name"
            className={`w-full px-4 py-3 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-safron-secondary focus:border-transparent transition-colors ${
              errors.fullName ? 'border-red' : 'border-light'
            }`}
          />
          {errors.fullName && (
            <p className="text-xs text-safron-accent">{errors.fullName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-charcoal">Company Name</label>
          <input
            {...register('companyName')}
            type="text"
            placeholder="Company or organization"
            className="w-full px-4 py-3 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-safron-secondary focus:border-transparent transition-colors border-light"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-charcoal">Email Address</label>
          <input
            {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' } })}
            type="email"
            placeholder="you@company.com"
            className={`w-full px-4 py-3 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-safron-secondary focus:border-transparent transition-colors ${
              errors.email ? 'border-red' : 'border-light'
            }`}
          />
          {errors.email && <p className="text-xs text-safron-accent">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-charcoal">Phone Number</label>
          <input
            {...register('phone', { required: 'Phone number is required' })}
            type="tel"
            placeholder="+880 1XXX-XXXXXX"
            className={`w-full px-4 py-3 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-safron-secondary focus:border-transparent transition-colors ${
              errors.phone ? 'border-red' : 'border-light'
            }`}
          />
          {errors.phone && <p className="text-xs text-safron-accent">{errors.phone.message}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-charcoal">Service Required</label>
          <select
            {...register('service')}
            className="w-full px-4 py-3 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-safron-secondary focus:border-transparent transition-colors border-light"
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-charcoal">Project Location</label>
          <input
            {...register('location')}
            type="text"
            placeholder="City or site address"
            className="w-full px-4 py-3 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-safron-secondary focus:border-transparent transition-colors border-light"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-charcoal">Message</label>
        <textarea
          {...register('message', { required: 'Message is required' })}
          rows={4}
          placeholder="Tell us about your project requirements..."
          className={`w-full px-4 py-3 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-safron-secondary focus:border-transparent transition-colors ${
            errors.message ? 'border-red' : 'border-light'
          }`}
        />
        {errors.message && <p className="text-xs text-safron-accent">{errors.message.message}</p>}
      </div>

      <div className="pt-4">
        <Button type="submit" variant="primary" className="w-full py-4" disabled={isSubmitting}>
          {isSubmitting ? <Send className="w-4 h-4 mr-2" /> : <Send className="w-4 h-4 mr-2" />}Submit Inquiry
        </Button>
      </div>

      <div className="mt-8 border-t border-light pt-6">
        <h3 className="text-sm font-bold text-safron-primary uppercase tracking-wider mb-6">Or Reach Us Directly</h3>
        <div className="space-y-4">
          <a href="https://wa.me/8801788585741" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#25D366] flex items-center justify-center text-white">
              <span className="text-sm">WA</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-safron-primary">WhatsApp</div>
              <div className="text-xs text-charcoal/60">01788585741</div>
            </div>
          </a>
          <a href="tel:+8801788585741" className="flex items-center gap-3 w-full">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-safron-background flex items-center justify-center text-safron-primary">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-safron-primary">Call Us</div>
              <div className="text-xs text-charcoal/60">01788585741</div>
            </div>
          </a>
          <a href="mailto:safrontechnology01@gmail.com" className="flex items-center gap-3 w-full">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-safron-background flex items-center justify-center text-safron-primary">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-safron-primary">Email Us</div>
              <div className="text-xs text-charcoal/60">safrontechnology01@gmail.com</div>
            </div>
          </a>
        </div>
      </div>
    </form>
  )
}
