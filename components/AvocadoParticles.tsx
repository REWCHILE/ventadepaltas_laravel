'use client'

import React, { useRef, useEffect } from 'react'

export default function AvocadoParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    // Handle container resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (canvas) {
          width = canvas.width = entry.contentRect.width || canvas.offsetWidth
          height = canvas.height = entry.contentRect.height || canvas.offsetHeight
        }
      }
    })

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement)
    }

    // Mouse coordinates tracking
    const mouse = { x: -1000, y: -1000, radius: 110 }

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    // Particle object defining a floating avocado
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      angle: number
      spinSpeed: number

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 8 + 8 // scale size
        this.speedX = (Math.random() - 0.5) * 0.4
        this.speedY = (Math.random() - 0.5) * 0.4
        this.angle = Math.random() * Math.PI * 2
        this.spinSpeed = (Math.random() - 0.5) * 0.012
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)

        // Draw avocado outer shell (Dark Green)
        ctx.fillStyle = '#0f5132' // Dark green
        ctx.beginPath()
        ctx.ellipse(0, 0, this.size, this.size * 1.35, 0, 0, Math.PI * 2)
        ctx.fill()

        // Draw avocado inner flesh (Lime Green / Light Yellow)
        ctx.fillStyle = '#bef264' // Light lime yellow
        ctx.beginPath()
        ctx.ellipse(0, 0, this.size * 0.85, this.size * 1.18, 0, 0, Math.PI * 2)
        ctx.fill()

        // Draw avocado seed (Warm Brown) in the lower half
        ctx.fillStyle = '#78350f' // Brown
        ctx.beginPath()
        ctx.arc(0, this.size * 0.25, this.size * 0.42, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      }

      update() {
        // Floating movement
        this.x += this.speedX
        this.y += this.speedY
        this.angle += this.spinSpeed

        // Border wrap around
        if (this.x < -this.size * 2) this.x = width + this.size * 2
        if (this.x > width + this.size * 2) this.x = -this.size * 2
        if (this.y < -this.size * 2) this.y = height + this.size * 2
        if (this.y > height + this.size * 2) this.y = -this.size * 2

        // Mouse repulsion physics (similar to particles.js)
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.hypot(dx, dy)

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius
          const angle = Math.atan2(dy, dx)
          // Smooth push away
          this.x -= Math.cos(angle) * force * 2.8
          this.y -= Math.sin(angle) * force * 2.8
        }
      }
    }

    const particles: Particle[] = []
    // Particle count relative to container width
    const count = Math.min(Math.floor((width * height) / 12000), 40)

    for (let i = 0; i < count; i++) {
      particles.push(new Particle())
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      particles.forEach((p) => {
        p.update()
        p.draw()
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      resizeObserver.disconnect()
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseleave', handleMouseLeave)
      }
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0 opacity-20 dark:opacity-15"
    />
  )
}
