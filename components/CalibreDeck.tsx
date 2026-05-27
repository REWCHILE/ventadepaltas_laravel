"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Scale, Ruler, Droplets, ShieldAlert, Sparkles, X, ChevronRight, CheckCircle2 } from 'lucide-react'

interface CalibreDetails {
  name: string
  short: string
  weight: string
  use: string
  image: string
  sizeApprox: string
  whyName: string
  dryMatter: string
  oxidation: string
  highlights: string[]
}

const calibresData: CalibreDetails[] = [
  {
    name: 'Calibre Súper Extra',
    short: 'SE',
    weight: '260g - 300g por fruto',
    use: 'Hotelería y Eventos Gourmet',
    image: '/images/calibre_se.png',
    sizeApprox: '10.5 cm - 12.0 cm de largo',
    whyName: 'Se le denomina "Súper Extra" debido a que supera el estándar comercial de exportación, siendo la categoría de frutos más grandes y vistosos cosechados en el huerto.',
    dryMatter: '24% - 26% (Máxima concentración de aceites naturales)',
    oxidation: 'Baja velocidad de oxidación. Su gran volumen y densidad de pulpa reducen la relación superficie/contacto con el aire, logrando mayor estabilidad post-corte.',
    highlights: [
      'Presentación visual imponente para buffet y platos gourmet.',
      'Excelente rendimiento de pulpa limpia por unidad.',
      'Textura ultra-cremosa ideal para láminas continuas.'
    ]
  },
  {
    name: 'Calibre Extra',
    short: 'EX',
    weight: '220g - 250g por fruto',
    use: 'Restaurantes y Sándwich Premium',
    image: '/images/calibre_ex.png',
    sizeApprox: '9.0 cm - 10.5 cm de largo',
    whyName: 'Es el calibre premium estándar internacional. Se le llama "Extra" por ser la clasificación seleccionada con la proporción perfecta entre semilla (cuesco) pequeña y abundante pulpa.',
    dryMatter: '23% - 24% (Excelente cremosidad y untuosidad)',
    oxidation: 'Resistencia media-alta. Mantiene su tono verde brillante por más tiempo gracias a su balance óptimo de acidez y aceites oleicos.',
    highlights: [
      'Proporción ideal pulpa/cuesco para maximizar el uso.',
      'Estándar preferido por chefs para cortes en cubos y abanicos.',
      'Fácil manipulación y pelado uniforme.'
    ]
  },
  {
    name: 'Calibre Primera',
    short: '1A',
    weight: '180g - 210g por fruto',
    use: 'Casinos y Sushi bars',
    image: '/images/calibre_1a.png',
    sizeApprox: '8.0 cm - 9.0 cm de largo',
    whyName: 'Clasificado como "Primera" por ser el calibre líder y de mayor consumo masivo en el canal B2B, ofreciendo el balance comercial más eficiente entre costo y rendimiento.',
    dryMatter: '22% - 23% (Gran equilibrio de sabor y humedad)',
    oxidation: 'Oxidación estándar. Se recomienda procesar en frío o aplicar unas gotas de limón si la palta molida va a permanecer expuesta más de 3-4 horas.',
    highlights: [
      'Excelente relación costo-beneficio para alta producción diaria.',
      'Tamaño perfecto para rolls de sushi y porciones individuales.',
      'Maduración homogénea en cámara controlada.'
    ]
  },
  {
    name: 'Calibre Segunda',
    short: '2A',
    weight: '140g - 170g por fruto',
    use: 'Minimarkets y Procesados',
    image: '/images/calibre_2a.png',
    sizeApprox: '6.8 cm - 8.0 cm de largo',
    whyName: 'Se le llama "Segunda" debido a su clasificación por calibre físico menor. No afecta su sabor ni calidad nutricional, pero su empaque y precio son más económicos.',
    dryMatter: '21% - 22% (Ligera y de maduración rápida)',
    oxidation: 'Velocidad de oxidación media. Por su tamaño menor, al molerse se aconseja mantener sellado al vacío o consumir rápidamente en el día.',
    highlights: [
      'El precio más competitivo por kilogramo del catálogo.',
      'Ideal para preparar aderezos, salsas y guacamole diario.',
      'Muy rápida maduración para rotación inmediata de stock.'
    ]
  }
]

export default function CalibreDeck() {
  const [selectedCalibre, setSelectedCalibre] = useState<CalibreDetails | null>(null)

  return (
    <div className="space-y-3">
      {calibresData.map((cal, idx) => {
        const delays = ['delay-200', 'delay-300', 'delay-400', 'delay-500']
        return (
          <button
            key={idx}
            data-reveal
            onClick={() => setSelectedCalibre(cal)}
            className={`w-full text-left group relative bg-zinc-950/40 backdrop-blur-md p-5 rounded-2xl border border-zinc-800/60 hover:border-emerald-500/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/40 ${delays[idx]}`}
          >
            <div className="flex items-center gap-4">
              {/* Calibre image badge */}
              <div className="relative w-12 h-12 rounded-xl border border-zinc-800/80 overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300 bg-zinc-950/20 shadow-inner">
                <Image
                  src={cal.image}
                  alt={cal.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-sm sm:text-base group-hover:text-emerald-450 transition-colors duration-300">
                    {cal.name}
                  </h4>
                  <span className="text-[9px] bg-emerald-950/80 text-emerald-400 px-1.5 py-0.5 rounded-full border border-emerald-900/40 font-mono">
                    {cal.short}
                  </span>
                </div>
                <span className="inline-block text-[10px] text-zinc-300 bg-zinc-800/60 px-2 py-0.5 rounded font-medium mt-1">
                  {cal.use}
                </span>
              </div>
            </div>

            {/* Weight badge & interaction indicator */}
            <div className="flex items-center gap-3 text-right shrink-0">
              <div className="flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 transition-colors duration-300" />
                <span className="text-xs sm:text-sm font-bold text-zinc-200">
                  {cal.weight.split(' ')[0]} {cal.weight.split(' ')[1]}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all duration-300" />
            </div>
          </button>
        )
      })}

      {/* Premium Glassmorphic Modal */}
      {selectedCalibre && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
          onClick={() => setSelectedCalibre(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh] transition-all duration-300 animate-scaleUp text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Title */}
            <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl border border-zinc-700/60 overflow-hidden shrink-0 shadow-lg">
                  <Image
                    src={selectedCalibre.image}
                    alt={selectedCalibre.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                      {selectedCalibre.name}
                    </h3>
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold font-mono">
                      {selectedCalibre.short}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-400 font-semibold mt-0.5">
                    {selectedCalibre.use}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedCalibre(null)}
                className="p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors duration-200"
                aria-label="Cerrar detalles"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-zinc-800">
              <div className="flex items-center gap-3 bg-zinc-950/50 p-3 rounded-2xl border border-zinc-800/40">
                <Scale className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="block text-[10px] text-zinc-500 font-medium">PESO PROMEDIO</span>
                  <span className="block text-sm font-bold text-white mt-0.5">{selectedCalibre.weight}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-zinc-950/50 p-3 rounded-2xl border border-zinc-800/40">
                <Ruler className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="block text-[10px] text-zinc-500 font-medium">TAMAÑO APROXIMADO</span>
                  <span className="block text-sm font-bold text-white mt-0.5">{selectedCalibre.sizeApprox}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-zinc-950/50 p-3 rounded-2xl border border-zinc-800/40">
                <Droplets className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="block text-[10px] text-zinc-500 font-medium">MATERIA SECA / ACEITES</span>
                  <span className="block text-sm font-bold text-white mt-0.5">{selectedCalibre.dryMatter.split(' ')[0]}</span>
                </div>
              </div>
            </div>

            {/* In-depth details */}
            <div className="space-y-5 py-6">
              
              {/* Why Named So */}
              <div className="space-y-1.5">
                <h4 className="flex items-center gap-2 text-sm font-extrabold text-zinc-200 tracking-wider uppercase text-xs">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Origen de Clasificación
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed pl-6">
                  {selectedCalibre.whyName}
                </p>
              </div>

              {/* Behavior & Oxidation */}
              <div className="space-y-1.5">
                <h4 className="flex items-center gap-2 text-sm font-extrabold text-zinc-200 tracking-wider uppercase text-xs">
                  <ShieldAlert className="w-4 h-4 text-emerald-400" />
                  Oxidación y Conservación
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed pl-6">
                  {selectedCalibre.oxidation}
                </p>
              </div>

              {/* Benefits list */}
              <div className="space-y-2 pt-2">
                <h4 className="text-sm font-extrabold text-zinc-200 tracking-wider uppercase text-xs">
                  Ventajas para tu Operación B2B
                </h4>
                <ul className="space-y-2 pl-2">
                  {selectedCalibre.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300 leading-normal">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Footer action button */}
            <div className="border-t border-zinc-800 pt-6 flex justify-end">
              <button 
                onClick={() => setSelectedCalibre(null)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/20 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              >
                Cerrar Detalle
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
