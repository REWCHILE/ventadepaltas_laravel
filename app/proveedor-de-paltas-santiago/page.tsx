import React from 'react'
import PublicLayout from '@/components/PublicLayout'
import LeadForm from '@/components/LeadForm'
import JsonLdSchema from '@/components/JsonLdSchema'
import AvocadoParticles from '@/components/AvocadoParticles'
import { MapPin, Navigation, Truck, Calendar, Thermometer, ShieldCheck } from 'lucide-react'

export const metadata = {
  title: 'Proveedor de Paltas en Santiago | Despacho Rápido',
  description: 'Distribuidor y proveedor oficial de palta Hass en todo Santiago. Reparto mayorista para restaurantes, minimarkets y casinos en Las Condes, Vitacura, Providencia y toda la RM.',
}

export default function ProveedorSantiago() {
  const pagePath = '/proveedor-de-paltas-santiago'

  const localSchema = {
    '@context': 'https://schema.org',
    '@type': 'FruitAndVegetableStore',
    'name': 'VENTADEPALTAS.CL Santiago',
    'image': 'https://ventadepaltas.cl/images/premium_hass_avocados.png',
    'priceRange': '$$',
    'telephone': '+56912345678',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Mercado Mayorista Lo Valledor',
      'addressLocality': 'Santiago',
      'addressRegion': 'Metropolitana',
      'postalCode': '9170000',
      'addressCountry': 'CL'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '-33.4761',
      'longitude': '-70.6865'
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      'opens': '06:00',
      'closes': '18:00'
    }
  }

  const comunas = [
    { name: 'Las Condes', zone: 'Z. Oriente', freq: 'Diario' },
    { name: 'Vitacura', zone: 'Z. Oriente', freq: 'Diario' },
    { name: 'Providencia', zone: 'Z. Oriente', freq: 'Diario' },
    { name: 'Santiago Centro', zone: 'Z. Centro', freq: 'Diario' },
    { name: 'Ñuñoa', zone: 'Z. Oriente', freq: 'Diario' },
    { name: 'La Reina', zone: 'Z. Oriente', freq: 'Diario' },
    { name: 'Lo Barnechea', zone: 'Z. Oriente', freq: 'Diario' },
    { name: 'Peñalolén', zone: 'Z. Oriente', freq: '48 Hrs' },
    { name: 'Macul', zone: 'Z. Sur', freq: '48 Hrs' },
    { name: 'San Miguel', zone: 'Z. Sur', freq: '48 Hrs' },
    { name: 'Maipú', zone: 'Z. Poniente', freq: '48 Hrs' },
    { name: 'Pudahuel', zone: 'Z. Poniente', freq: '48 Hrs' },
  ]

  return (
    <PublicLayout>
      <JsonLdSchema schema={localSchema} />

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 py-20 text-white text-center relative overflow-hidden border-b border-zinc-150 dark:border-zinc-900">
        {/* Animated Avocado Particles canvas */}
        <AvocadoParticles />

        {/* Mesh glow behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <span data-reveal className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 mb-4 delay-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Cobertura Regional
          </span>
          <h1 data-reveal className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white mt-2 delay-200">
            Proveedor de Paltas en Santiago
          </h1>
          <p data-reveal className="text-emerald-100 mt-4 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed delay-300">
            Logística y distribución programada en toda la Región Metropolitana. Recibe paltas de primera calidad en la puerta de tu negocio.
          </p>
        </div>

        {/* Organic curved shape divider at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-white dark:bg-zinc-950" style={{ clipPath: 'ellipse(65% 100% at 50% 100%)' }} />
      </section>

      {/* Logistics & Delivery Details */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200/30 dark:border-zinc-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Logistics descriptions */}
          <div data-reveal className="lg:col-span-5 space-y-6 text-left delay-100">
            <span className="text-[10px] uppercase font-extrabold tracking-[0.2em] text-emerald-600 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full border border-emerald-200/40 dark:border-emerald-900/30 inline-block">
              Eficiencia Operativa
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-zinc-950 dark:text-white leading-tight mt-2">
              Tu Aliado Logístico en Santiago
            </h2>
            <p className="text-sm sm:text-base text-zinc-650 dark:text-zinc-400 leading-relaxed">
              Santiago es un mercado gastronómico dinámico y competitivo. Por eso, no solo entregamos paltas de excelente calidad, sino también un servicio puntual y confiable. Contamos con furgones y camiones climatizados que preservan el estado del fruto en cada trayecto.
            </p>

            <div className="space-y-4 pt-4 border-t border-zinc-200/60 dark:border-zinc-850">
              {/* Point 1 */}
              <div className="group flex gap-4 p-4 bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-950/2 dark:hover:shadow-emerald-500/2 transition-all duration-300 animate-fadeIn">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-sm">Despacho 24 horas</h4>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Pedidos programados antes de las 17:00 son entregados al día siguiente en tu local.</p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="group flex gap-4 p-4 bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-950/2 dark:hover:shadow-emerald-500/2 transition-all duration-300 animate-fadeIn">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-sm">Frecuencia Programada</h4>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Establecemos rutas fijas de despacho semanal de acuerdo a tu flujo de caja y stock.</p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="group flex gap-4 p-4 bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-950/2 dark:hover:shadow-emerald-500/2 transition-all duration-300 animate-fadeIn">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <Thermometer className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-sm">Cadena de Frío Activa</h4>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Monitoreamos el rango óptimo de 4°C a 8°C para mitigar deshidratación y merma.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map/Coverage Box */}
          <div data-reveal className="lg:col-span-7 bg-white dark:bg-zinc-900/60 p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/80 shadow-xl space-y-6 delay-200 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-500" />
                <h3 className="text-xl font-bold font-display text-zinc-950 dark:text-white">
                  Cobertura y Frecuencias en RM
                </h3>
              </div>
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-100/50 dark:border-emerald-900/20">
                Logística Propia
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Despachamos de forma gratuita (pedidos desde 100 kg) con las siguientes rutas asignadas por comuna:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {comunas.map((com, idx) => (
                <div 
                  key={idx} 
                  className="group flex items-center justify-between bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 p-3.5 rounded-2xl hover:border-emerald-500/40 dark:hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-500 shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                      <Navigation className="w-3.5 h-3.5 rotate-45" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                        {com.name}
                      </span>
                      <span className="block text-[9px] text-zinc-400 mt-0.5">
                        {com.zone}
                      </span>
                    </div>
                  </div>
                  
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                    com.freq === 'Diario'
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/20'
                      : 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/20'
                  }`}>
                    {com.freq}
                  </span>
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
              Abastece tu Negocio en Santiago
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              ¿Tu restaurante está ubicado en el sector oriente, centro o poniente de Santiago? Escríbenos para enviarte la lista de precios actualizada y coordinar una primera entrega de muestra.
            </p>
          </div>
          <div className="lg:col-span-7">
            <LeadForm paginaOrigen={pagePath} title="Cotización Proveedor Santiago" />
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
