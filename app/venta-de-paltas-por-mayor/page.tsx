import React from 'react'
import Image from 'next/image'
import PublicLayout from '@/components/PublicLayout'
import LeadForm from '@/components/LeadForm'
import JsonLdSchema from '@/components/JsonLdSchema'
import AvocadoParticles from '@/components/AvocadoParticles'
import CalibreDeck from '@/components/CalibreDeck'
import { Check, ClipboardList, ShieldAlert, Award, Coins, Package, FileText } from 'lucide-react'

export const metadata = {
  title: 'Venta de Paltas por Mayor | Proveedor Directo Chile',
  description: 'Comprar paltas por mayor en Chile. Distribución de palta Hass de primera calidad para empresas. Precios directo de huerto con logística propia.',
}

export default function VentaPorMayor() {
  const pagePath = '/venta-de-paltas-por-mayor'

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'Palta Hass al por Mayor',
    'image': 'https://ventadepaltas.cl/images/premium_hass_avocados.png',
    'description': 'Palta Hass clasificada por calibre y nivel de maduración para abastecimiento B2B.',
    'brand': {
      '@type': 'Brand',
      'name': 'VENTADEPALTAS.CL'
    },
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'CLP',
      'lowPrice': '2500',
      'highPrice': '4500',
      'offerCount': '10',
      'priceRange': 'CLP 2.500 - CLP 4.500 por kg'
    }
  }



  return (
    <PublicLayout>
      <JsonLdSchema schema={productSchema} />

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 py-20 text-white text-center relative overflow-hidden border-b border-zinc-150 dark:border-zinc-900">
        {/* Animated Avocado Particles canvas */}
        <AvocadoParticles />
        
        {/* Mesh glow behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span data-reveal className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 mb-4 delay-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Distribución RM Exclusiva
          </span>
          <h1 data-reveal className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white delay-200">
            Venta de Paltas por Mayor
          </h1>
          <p data-reveal className="text-emerald-100 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed delay-300">
            Abastecimiento directo y continuo para distribuidores, cadenas de restaurantes, casinos y minimarkets en Santiago.
          </p>
        </div>

        {/* Organic curved shape divider at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-white dark:bg-zinc-950" style={{ clipPath: 'ellipse(65% 100% at 50% 100%)' }} />
      </section>

      {/* Commercial Details & Calibres with Premium Background */}
      <section className="py-24 premium-pan-bg text-white relative overflow-hidden border-y border-zinc-150 dark:border-zinc-900">
        {/* Premium Tech Dotted/Grid Pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.025)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        {/* Slow organic glowing mesh auroras */}
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
        <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[10000ms]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Col: Core values list */}
          <div data-reveal className="lg:col-span-5 space-y-6 text-left delay-100">
            <span className="text-[10px] uppercase font-extrabold tracking-[0.2em] text-emerald-400 bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-900/40 inline-block">
              Estandarización B2B
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white leading-tight mt-2">
              Suministro Mayorista Profesional
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              En <strong>VENTADEPALTAS.CL</strong> entendemos que la regularidad de entrega, la estabilidad de precio y la uniformidad de los calibres son vitales para tu negocio culinario. Trabajamos con empacadoras automatizadas para garantizar cero sorpresas.
            </p>

            <div className="space-y-4 pt-4 border-t border-zinc-800">
              {/* Point 1 */}
              <div className="group flex gap-4 p-4 bg-zinc-950/40 backdrop-blur-md rounded-2xl border border-zinc-800/60 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/40 flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Precios Competitivos</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">Reducimos intermediarios entregando directo de packing nacional e importación directa.</p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="group flex gap-4 p-4 bg-zinc-950/40 backdrop-blur-md rounded-2xl border border-zinc-800/60 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/40 flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Estabilidad de Stock</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">Aseguramos suministro continuo incluso durante las temporadas de baja producción en Chile.</p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="group flex gap-4 p-4 bg-zinc-950/40 backdrop-blur-md rounded-2xl border border-zinc-800/60 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/40 flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Crédito Comercial B2B</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">Ofrecemos opciones de facturación directa a 30 días sujeto a evaluación de riesgo comercial.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Modern deck of Calibre Cards */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div data-reveal className="mb-6 delay-150">
              <h3 className="text-xl font-bold font-display text-white">
                Calibres Disponibles
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Clasificación estandarizada por peso del fruto según los estándares chilenos de exportación:
              </p>
            </div>

            <div className="space-y-3">
              <CalibreDeck />
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-zinc-100 dark:bg-zinc-900/50 py-16 border-t border-zinc-200/30 dark:border-zinc-800/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-zinc-900 dark:text-white">
              Cotiza tu Compra Mayorista
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Trabajamos con despachos mínimos a partir de 100 kg. Si representas a una cadena o distribuidora regional de frutas, consulta por precios especiales sobre 1 tonelada semanal.
            </p>
            <div className="flex gap-2 items-center text-xs font-semibold text-zinc-500">
              <ClipboardList className="w-4 h-4 text-emerald-500" />
              <span>Plazo de cotización en menos de 2 horas.</span>
            </div>
          </div>
          <div className="lg:col-span-7">
            <LeadForm paginaOrigen={pagePath} title="Cotización de Paltas por Mayor" />
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
