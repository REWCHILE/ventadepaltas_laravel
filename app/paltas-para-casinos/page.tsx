import React from 'react'
import PublicLayout from '@/components/PublicLayout'
import LeadForm from '@/components/LeadForm'
import AvocadoParticles from '@/components/AvocadoParticles'
import { ShieldCheck, Truck, BarChart3, Check } from 'lucide-react'

export const metadata = {
  title: 'Paltas para Casinos de Alimentación y Catering | Gran Volumen',
  description: 'Proveedor de palta Hass al por mayor para casinos institucionales, de empresas, clínicas y colegios. Cumplimiento de estándares de inocuidad y gran volumen.',
}

export default function PaltasCasinos() {
  const pagePath = '/paltas-para-casinos'

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
            Alimentación Colectiva
          </span>
          <h1 data-reveal className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white delay-200">
            Paltas para Casinos y Catering
          </h1>
          <p data-reveal className="text-emerald-100 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed delay-300">
            Suministro de alto volumen para concesionarias de alimentos. Cumplimiento de BPM, trazabilidad y logística certificada.
          </p>
        </div>

        {/* Organic curved shape divider at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-white dark:bg-zinc-950" style={{ clipPath: 'ellipse(65% 100% at 50% 100%)' }} />
      </section>

      {/* Casino Focus Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-zinc-950 dark:text-white">
              Trazabilidad e Inocuidad Alimentaria
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
              Las empresas concesionarias de casinos institucionales requieren proveedores homologados que cumplan rigurosas normas sanitarias. En **VENTADEPALTAS.CL** contamos con certificaciones de inocuidad, guías de despacho electrónicas, facturación ordenada y trazabilidad completa de lotes para auditorías HACCP.
            </p>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-white text-sm">Embalaje Industrial</h4>
                  <p className="text-xs text-zinc-550">Entrega en bins plásticos de gran capacidad o cajas reforzadas para proteger el producto en despachos masivos.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-white text-sm">Maduración Programada</h4>
                  <p className="text-xs text-zinc-550">Coordinamos la entrega de paltas con distintos niveles de madurez para su consumo escalonado a lo largo de la semana comercial.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm space-y-6">
            <h3 className="text-lg font-bold font-display text-zinc-950 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-500" />
              Especificaciones de Volumen
            </h3>
            <p className="text-xs text-zinc-500">
              Diseñado para grandes centrales de producción de alimentos y catering corporativo:
            </p>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-850 rounded-lg">
                <strong className="block text-zinc-900 dark:text-white mb-1">Pedidos desde 500 kg semanales</strong>
                Condiciones comerciales especiales, contratos anuales con tarifas corporativas estables y prioridad en rutas.
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-850 rounded-lg">
                <strong className="block text-zinc-900 dark:text-white mb-1">Logística con Frío Seguro</strong>
                Flota de camiones refrigerados equipados con sensores térmicos digitales para asegurar la cadena de frío B2B.
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
              Cotiza Convenios para Concesionarias
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Registra tu casino o central de compras. Enviamos fichas técnicas de calibres, resoluciones sanitarias vigentes y propuestas comerciales personalizadas.
            </p>
          </div>
          <div className="lg:col-span-7">
            <LeadForm paginaOrigen={pagePath} title="Cotización para Casinos y Catering" />
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
