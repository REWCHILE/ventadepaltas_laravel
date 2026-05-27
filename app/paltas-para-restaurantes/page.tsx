import React from 'react'
import PublicLayout from '@/components/PublicLayout'
import LeadForm from '@/components/LeadForm'
import AvocadoParticles from '@/components/AvocadoParticles'
import { Sparkles, Utensils, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Paltas para Restaurantes y Locales de Comida | Suministro Diario',
  description: 'Abastecimiento de palta Hass seleccionada para restaurantes, sushis y sangucherías en Santiago. Consistencia en maduración y calibres adecuados.',
}

export default function PaltasRestaurantes() {
  const pagePath = '/paltas-para-restaurantes'

  return (
    <PublicLayout>
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 py-20 text-white text-center relative overflow-hidden border-b border-zinc-150 dark:border-zinc-900">
        {/* Animated Avocado Particles canvas */}
        <AvocadoParticles />
        
        {/* Mesh glow behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span data-reveal className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 mb-4 delay-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Solución Gastronómica
          </span>
          <h1 data-reveal className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white delay-200">
            Paltas para Restaurantes
          </h1>
          <p data-reveal className="text-emerald-100 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed delay-300">
            Garantizamos la madurez exacta y regularidad de suministro que la cocina de tu restaurante necesita para evitar pérdidas.
          </p>
        </div>

        {/* Organic curved shape divider at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-white dark:bg-zinc-950" style={{ clipPath: 'ellipse(65% 100% at 50% 100%)' }} />
      </section>

      {/* Restaurant Focus Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400">
              <Utensils className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-zinc-950 dark:text-white">
              Cero Merma, Máxima Cremocidad
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
              En el rubro gastronómico, una palta hilachosa, aguada o excesivamente madura arruina un plato y genera pérdidas económicas. Clasificamos y maduramos de forma controlada en nuestras cámaras especiales para que recibas palta Hass lista para usar (madurez de mesa) o en transición para tu stock semanal.
            </p>

            <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                Ideal para sándwiches, sushi rolls (calibres homogéneos para láminas perfectas) y ensaladas.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                Despacho temprano por la mañana para no interrumpir tu puesta a punto (mise en place).
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                Precios fijos acordados mensualmente para facilitar el costo de tu carta.
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-display text-zinc-950 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              Nuestra Oferta Gastronómica
            </h3>
            <p className="text-xs text-zinc-500">
              Entendemos las exigencias de un servicio de comida rápido y de alta calidad. Ofrecemos:
            </p>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-850 rounded-lg">
                <strong className="block text-zinc-900 dark:text-white mb-1">Paltas Ripe & Ready (Listas para Servir)</strong>
                Perfectas para consumo inmediato en sangucherías y sushi. Despachadas en su punto óptimo de maduración.
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-850 rounded-lg">
                <strong className="block text-zinc-900 dark:text-white mb-1">Despacho Programado Bisemanal</strong>
                Dividimos tus entregas semanales para asegurar frescura constante y evitar saturar tu cámara de refrigeración.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-zinc-100 dark:bg-zinc-900/50 py-16 border-t border-zinc-200/30 dark:border-zinc-800/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-zinc-900 dark:text-white">
              Suministro Confiable para tu Carta
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Consúltanos por muestras gratuitas en Santiago para validar la calidad de nuestro calibre gastronómico. Déjanos tus datos de consumo estimado mensual.
            </p>
          </div>
          <div className="lg:col-span-7">
            <LeadForm paginaOrigen={pagePath} title="Cotización para Restaurantes" />
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
