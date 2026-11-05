import { useEffect, useRef, useState } from 'react'

export function EmberParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(media.matches)
    const handler = () => setReducedMotion(media.matches)
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl || reducedMotion) return

    const ctx = canvasEl.getContext('2d')!

    let width = 0
    let height = 0

    function resize() {
      const rect = canvasEl!.parentElement?.getBoundingClientRect() || { width: 0, height: 0 }
      width = rect.width
      height = rect.height
      canvasEl!.width = width
      canvasEl!.height = height
    }

    const particleCount = 30
    const particles: Array<{ x: number; y: number; vx: number; vy: number; opacity: number; size: number; life: number; maxLife: number }> = []

    function createParticle() {
      return {
        x: Math.random() * width,
        y: height + Math.random() * 50,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 1.5 - 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        size: Math.random() * 3 + 1,
        life: 0,
        maxLife: Math.random() * 100 + 100,
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle())
    }

    let lastTime = 0
    let rafId: number

    function loop(time: number) {
      const dt = time - lastTime
      lastTime = time

      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.x += p.vx
        p.y += p.vy
        p.life += dt * 0.001

        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
          p.life = 0
        }

        const pulse = Math.sin(p.life * 2) * 0.5 + 0.5
        const alpha = p.opacity * pulse * (1 - p.life / p.maxLife)

        ctx.fillStyle = `rgba(242, 140, 40, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        if (p.life > p.maxLife) {
          particles[i] = createParticle()
        }
      }

      rafId = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId)
    }
  }, [reducedMotion])

  return <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />
}
