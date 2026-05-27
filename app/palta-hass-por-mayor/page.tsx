import React from 'react'
import PublicLayout from '@/components/PublicLayout'
import LeadForm from '@/components/LeadForm'
import JsonLdSchema from '@/components/JsonLdSchema'
import AvocadoParticles from '@/components/AvocadoParticles'
import { Award, Zap, Heart, Check } from 'lucide-react'

export const metadata = {
  title: 'Palta Hass por Mayor | Proveedor y Distribuidor Premium',
  description: 'Comprar Palta Hass por mayor en Chile. Importadores y distribuidores directos de palta Hass seleccionada. Alto contenido de aceite y sabor óptimo.',
}

export default function PaltaHass() {
  const pagePath = '/palta-hass-por-mayor'

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'Palta Hass Premium',
    'image': 'https://ventadepaltas.cl/images/premium_hass_avocados.png',
    'description': 'Palta Hass de piel rugosa y pulpa cremosa, ideal para preparaciones gourmet y consumo mayorista.',
    'brand': {
      '@type': 'Brand',
      'name': 'VENTADEPALTAS.CL'
    }
  }

  const origins = [
    { season: 'Julio - Marzo', country: 'Chile (Origen Nacional)', notes: 'Sabor intenso, máxima concentración de aceites y textura ultra cremosa.' },
    { season: 'Abril - Junio', country: 'Perú / México (Importada)', notes: 'Piel fina, calibres homogéneos y excelente comportamiento post-cosecha.' },
  ]

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
            Calidad Superior Hass
          </span>
          <h1 data-reveal className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white delay-200">
            Palta Hass por Mayor
          </h1>
          <p data-reveal className="text-emerald-100 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed delay-300">
            La reina de las paltas. Rugosa, cremosa y con el porcentaje de materia seca perfecto para el deleite de tus clientes.
          </p>
        </div>

        {/* Organic curved shape divider at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-white dark:bg-zinc-950" style={{ clipPath: 'ellipse(65% 100% at 50% 100%)' }} />
      </section>

      {/* Hass Attributes */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-zinc-950 dark:text-white">
              ¿Por qué la Palta Hass es la Preferida?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
              La palta Hass destaca por su piel verde que madura a morado oscuro/negro, facilitando el control de madurez visual. Su pulpa tiene un bajo contenido de fibra y una alta concentración de aceites saludables, dándole una cremosidad incomparable ideal para la alta cocina, sushi y sanguchería chilena.
            </p>

            <div className="space-y-4">
              <div className="flex gap-3">
                <Heart className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-zinc-950 dark:text-white">Excelente Post-Cosecha</h4>
                  <p className="text-xs text-zinc-550">Resiste muy bien el transporte y almacenamiento refrigerado, minimizando mermas en tu cocina.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-zinc-950 dark:text-white">Estándar Premium</h4>
                  <p className="text-xs text-zinc-550">Seleccionamos frutos libres de golpes, manchas negras y con el pedúnculo intacto para evitar la oxidación interna.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Seasonal Origins */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm space-y-6">
            <h3 className="text-lg font-bold font-display text-zinc-950 dark:text-white">
              Calendario de Abastecimiento Anual
            </h3>
            <p className="text-xs text-zinc-500">
              Mantenemos stock durante todo el año combinando la producción nacional con importaciones directas de origen certificado:
            </p>
            <div className="space-y-4">
              {origins.map((ori, idx) => (
                <div key={idx} className="border-l-4 border-emerald-500 pl-4 space-y-1">
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">{ori.season}</div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{ori.country}</h4>
                  <p className="text-xs text-zinc-500">{ori.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-zinc-100 dark:bg-zinc-900/50 py-16 border-t border-zinc-200/30 dark:border-zinc-800/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-zinc-900 dark:text-white">
              Cotiza Palta Hass Seleccionada
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Solicita cotización por cajas de 10 kg, 18 kg o bins industriales. Indícanos el calibre de tu preferencia y la maduración requerida (verde, semi-maduro o listo para consumo).
            </p>
          </div>
          <div className="lg:col-span-7">
            <LeadForm paginaOrigen={pagePath} title="Cotización Palta Hass Mayorista" />
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
