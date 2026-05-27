'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Sparkles, MessageSquare, ArrowRight } from 'lucide-react'
import AvocadoParticles from './AvocadoParticles'

export default function MascotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Auto-open speech bubble after 3 seconds on first load
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  const handleScrollToForm = () => {
    setIsOpen(false)
    const element = document.getElementById('cotizar')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/contacto'
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-45 flex flex-col items-end gap-3 font-sans">
      {/* Speech Bubble Card */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 sm:bottom-0 sm:right-24 w-[280px] sm:w-[320px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-2xl animate-fade-in z-50 overflow-hidden">
          {/* Moving Avocado Background Particles (low opacity, non-clickable) */}
          <AvocadoParticles className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-25 dark:opacity-20" />

          {/* Arrow pointing down on mobile, pointing right on desktop */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-zinc-900 border-r border-b border-zinc-200 dark:border-zinc-800 rotate-45 sm:hidden z-10" />
          <div className="absolute bottom-6 -right-2 w-4 h-4 bg-white dark:bg-zinc-900 border-t border-r border-zinc-200 dark:border-zinc-800 rotate-45 hidden sm:block z-10" />

          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-650 dark:hover:text-white transition-colors cursor-pointer z-20"
            aria-label="Cerrar mensaje"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Content Wrapper */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-50/85 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-450 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Mascota Oficial
              </span>
              <span className="text-xs font-bold text-zinc-900 dark:text-white">Soy Paltín</span>
            </div>

            {/* Content */}
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">
              ¡Hola! ¿Buscando palta Hass premium para tu negocio?
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
              Te ayudo a cotizar al por mayor de forma directa y exclusiva en la Región Metropolitana. ¡Merma cero garantizada!
            </p>

            {/* Action */}
            <button
              onClick={handleScrollToForm}
              className="mt-3.5 w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/10 active:scale-[0.98] transition-all"
            >
              Cotizar Mayorista <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Mascot Circle Badge */}
      <div className="flex items-center gap-2.5">
        {/* Toggle message label on hover (desktop only) */}
        {!isOpen && (
          <div className="hidden md:block bg-zinc-900/90 dark:bg-zinc-800/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md pointer-events-none transition-all border border-zinc-700/30">
            ¿Cotizar Palta Hass?
          </div>
        )}

        <div className="relative group">
          {/* Green Pulse Ring */}
          <span className="absolute -inset-1 rounded-full bg-emerald-500/25 animate-ping duration-1000 pointer-events-none" />

          {/* Mascot Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-emerald-500 bg-white dark:bg-zinc-800 shadow-xl overflow-hidden cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 animate-premium-float"
            title="Hablar con Paltín"
          >
            <Image
              src="/images/avocado_mascot.png"
              alt="Paltín - Mascota Oficial de VENTADEPALTAS.CL"
              width={64}
              height={64}
              className="object-contain"
            />
          </button>


        </div>
      </div>
    </div>
  )
}
