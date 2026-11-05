import type { ButtonHTMLAttributes } from 'react'
import { forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'orange' | 'whatsapp' | 'whatsapp-sm' | 'ghost'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'primary', ...props }, ref) => {
  const base = 'inline-flex items-center justify-center text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  const variants: Record<string, string> = {
    primary: 'bg-safron-secondary text-white border border-safron-secondary hover:bg-[rgb(0,168,107)] hover:text-white focus:ring-safron-secondary',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-safron-primary focus:ring-safron-secondary',
    accent: 'bg-safron-secondary text-white hover:bg-[rgb(0,168,107)] focus:ring-safron-secondary',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#20ad5a] focus:ring-green-500 px-5 py-2.5 gap-2',
    'whatsapp-sm': 'bg-[#25D366] text-white hover:bg-[#20ad5a] focus:ring-green-500 px-4 py-2 gap-1.5 text-xs',
    ghost: 'text-safron-body-text hover:bg-safron-light-bg focus:ring-safron-secondary',
  }
  return (
    <button ref={ref} className={`${base} ${variants[variant]} ${className ?? ''}`} {...props} />
  )
})

Button.displayName = 'Button'

export { Button }
