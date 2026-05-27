import React from 'react'
import PublicLayout from '@/components/PublicLayout'
import LeadForm from '@/components/LeadForm'
import AvocadoParticles from '@/components/AvocadoParticles'
import { Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react'

export const metadata = {
  title: 'Paltas para Empresas y Oficinas | Suministro Saludable',
  description: 'Distribuidor de palta Hass para empresas, oficinas, catering de eventos corporativos y regalos institucionales en Santiago. Facturación directa y puntualidad.',
}

export default function PaltasEmpresas() {
  const pagePath = '/paltas-para-empresas'

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
            Bienestar B2B y Eventos
          </span>
          <h1 data-reveal className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white delay-200">
            Paltas para Empresas
          </h1>
          <p data-reveal className="text-emerald-100 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed delay-300">
            Suministro premium para oficinas saludables, comedores corporativos, catering de eventos e integraciones institucionales.
          </p>
        </div>

        {/* Organic curved shape divider at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-white dark:bg-zinc-950" style={{ clipPath: 'ellipse(65% 100% at 50% 100%)' }} />
      </section>

      {/* Corporate Focus Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-zinc-950 dark:text-white">
              Sabor y Salud en tu Entorno de Trabajo
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
              Cada vez más empresas en Santiago incorporan hábitos de alimentación saludable para mejorar la calidad de vida y el bienestar laboral de sus colaboradores. Entregamos paltas Hass listas para el consumo diario en casinos de oficinas, desayunos corporativos o eventos exclusivos.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-700 dark:text-zinc-300">
              <div className="flex gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>**Facturación Directa:** Proceso contable ágil en 30 días para compras corporativas recurrentes.</span>
              </div>
              <div className="flex gap-2">
                <HeartHandshake className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>**Flexibilidad Horaria:** Despachos adaptados al horario de oficina y áreas de recepción empresarial.</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm space-y-4">
            <h3 className="text-lg font-bold font-display text-zinc-950 dark:text-white">
              Servicios para el Sector Corporativo
            </h3>
            <p className="text-xs text-zinc-550">
              Diseñamos alternativas a la medida para oficinas y productoras de eventos:
            </p>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-850 rounded-lg">
                <strong className="block text-zinc-900 dark:text-white mb-1">Incentivo de Oficina Saludable</strong>
                Cajas semanales de palta Hass seleccionada listas para el consumo del personal en cocinas y áreas comunes.
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-850 rounded-lg">
                <strong className="block text-zinc-900 dark:text-white mb-1">Catering y Producción de Eventos</strong>
                Entregas puntuales en recintos feriales, centros de convenciones o directorios ejecutivos en Santiago.
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
              Abastece tu Empresa Hoy
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Solicita cotización indicando el rut de tu empresa y el volumen de consumo semanal o mensual requerido. Nos contactaremos de inmediato.
            </p>
          </div>
          <div className="lg:col-span-7">
            <LeadForm paginaOrigen={pagePath} title="Cotización para Empresas B2B" />
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
