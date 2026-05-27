import React from 'react'
import PublicLayout from '@/components/PublicLayout'
import LeadForm from '@/components/LeadForm'
import JsonLdSchema from '@/components/JsonLdSchema'
import AvocadoParticles from '@/components/AvocadoParticles'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Truck, Award, ShieldCheck, Users, HelpCircle, Utensils, Hotel, Calendar, MapPin, Package, Clock } from 'lucide-react'

export const metadata = {
  title: 'Venta de Paltas Hass al por Mayor | Proveedor Premium Chile',
  description: 'Distribuidor y proveedor premium de Palta Hass para restaurantes, casinos, hoteles y minimarkets en Santiago. Calibres seleccionados y despacho directo.',
}

export default function Home() {
  const pagePath = '/'

  // Organization & LocalBusiness schemas
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'VENTADEPALTAS.CL',
    'url': 'https://ventadepaltas.cl',
    'logo': 'https://ventadepaltas.cl/images/premium_hass_avocados.png',
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+56912345678',
      'contactType': 'sales',
      'areaServed': 'CL',
      'availableLanguage': 'Spanish'
    }
  }

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'VENTADEPALTAS.CL - Venta de Paltas al por Mayor',
    'image': 'https://ventadepaltas.cl/images/premium_hass_avocados.png',
    'telephone': '+56912345678',
    'email': 'contacto@ventadepaltas.cl',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Santiago',
      'addressRegion': 'Metropolitana',
      'addressCountry': 'CL'
    },
    'priceRange': '$$',
    'areaServed': ['Santiago', 'Región Metropolitana']
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': '¿Cuál es el pedido mínimo para despachos mayoristas?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Nuestro pedido mínimo habitual para despacho gratuito en Santiago es de 100 kg, ideal para restaurantes y casinos medianos.'
        }
      },
      {
        '@type': 'Question',
        'name': '¿Cómo aseguran la madurez adecuada de la palta Hass?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Clasificamos nuestras paltas por calibres y estados de maduración (verde, en transición o lista para consumo) según el requerimiento de tu negocio.'
        }
      },
      {
        '@type': 'Question',
        'name': '¿Qué comunas de la Región Metropolitana cubren con su despacho?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Cubrimos de forma exclusiva las 52 comunas de la Región Metropolitana con flota propia refrigerada. No realizamos despachos a otras regiones de Chile para asegurar un control estricto de la maduración y la cadena de frío.'
        }
      }
    ]
  }

  const stats = [
    { value: '+50 Ton', label: 'Despachadas al Mes' },
    { value: '24 hrs', label: 'Despacho en Santiago' },
    { value: '100%', label: 'Calidad Garantizada' },
    { value: '+120', label: 'Clientes Felices' },
  ]

  const values = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Calidad Seleccionada',
      badge: 'Materia Seca >23%',
      detail: 'Hass chilena e importada',
      desc: 'Clasificamos cada lote garantizando el porcentaje óptimo de materia seca. Sin sorpresas, paltas sabrosas y uniformes.'
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Cadena de Frío 100%',
      badge: 'Temp. 4°C a 8°C',
      detail: 'Despacho refrigerado',
      desc: 'Mantenemos un control térmico digital estricto desde la recolección. Evitamos la deshidratación y extendemos la vida útil.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Suministro Todo el Año',
      badge: 'Disponibilidad 365',
      detail: 'Stock garantizado',
      desc: 'Alianzas directas con productores en Chile, Perú y México. Aseguramos continuidad operativa sin importar la estación.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Atención B2B Dedicada',
      badge: 'Respuesta < 2 hrs',
      detail: 'Facturación directa',
      desc: 'Gestión ágil con ejecutivos de cuentas exclusivos para tu empresa, emisión rápida de guías de despacho y reposiciones.'
    }
  ]

  const sectors = [
    { 
      name: 'Restaurantes y Cadenas', 
      slug: '/paltas-para-restaurantes', 
      icon: <Utensils className="w-5 h-5" />,
      desc: 'Abastecimiento calibrado y programado para locales de sushi, sangucherías y restaurantes. Entregamos paltas Hass en el grado de madurez exacto (verde, en transición o lista para consumo) para asegurar consistencia y sabor en cada plato.'
    },
    { 
      name: 'Casinos de Alimentos', 
      slug: '/paltas-para-casinos', 
      icon: <Users className="w-5 h-5" />,
      desc: 'Suministro continuo de gran volumen con calibres homogéneos. Cumplimos con estándares sanitarios HACCP, guías de despacho digitalizadas y logística refrigerada que simplifica el porcionamiento y optimiza el costo de tu operación.'
    },
    { 
      name: 'Hoteles y Catering', 
      slug: '/paltas-para-empresas', 
      icon: <Hotel className="w-5 h-5" />,
      desc: 'Calidad uniforme ultra-seleccionada para eventos de banquetería, catering aéreo y buffets hoteleros. Cajas reforzadas y selección manual rigorosa para garantizar merma cero y una presentación impecable.'
    },
  ]

  return (
    <PublicLayout>
      <JsonLdSchema schema={[orgSchema, businessSchema, faqSchema]} />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-emerald-50/50 via-white to-transparent dark:from-emerald-950/10 dark:via-zinc-950 dark:to-transparent">
        <div className="hero-glow top-1/4 left-1/10" />
        <div className="hero-glow bottom-1/4 right-1/10" />
        <AvocadoParticles />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Text */}
            <div data-reveal className="lg:col-span-7 space-y-6 delay-100">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                Abastecimiento Mayorista Directo
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-display leading-[1.1]">
                Proveedor de <span className="gradient-text">Palta Hass</span> por Mayor en Chile
              </h1>
              
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
                Abastecemos a restaurantes, casinos, hoteles y comercializadoras con la mejor palta Hass del mercado. Calibres estandarizados, maduración controlada y despacho directo a tu negocio.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="#cotizar"
                  className="cursor-pointer inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 hover:shadow-emerald-600/30 transition-all active:scale-[0.97]"
                >
                  Cotizar Mayorista
                </Link>
                <Link
                  href="/venta-de-paltas-por-mayor"
                  className="inline-flex items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 py-3 text-base font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
                >
                  Ver Variedades
                </Link>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-zinc-200/60 dark:border-zinc-800/60">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">
                      {stat.value}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 uppercase font-semibold tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Image */}
            <div data-reveal className="lg:col-span-5 relative flex justify-center delay-200">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl border border-zinc-200/40 dark:border-zinc-800/40">
                <Image
                  src="/images/premium_hass_avocados.png"
                  alt="Paltas Hass Premium al por mayor en Chile"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200/30 dark:border-zinc-800/30 relative overflow-hidden">
        {/* Soft background glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/2 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-80 h-80 bg-green-500/5 dark:bg-green-500/2 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div data-reveal className="text-center max-w-3xl mx-auto mb-16 delay-0">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full border border-emerald-200/40 dark:border-emerald-900/30 mb-3 inline-block">
              Ventajas Competitivas B2B
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-display mt-2 leading-tight">
              ¿Por qué elegirnos como tu distribuidor de paltas?
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed">
              Optimizamos toda la cadena de abastecimiento y frío para entregar un producto fresco, maduro y listo para la operación comercial de tu negocio culinario, casino o supermercado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => {
              const delays = ['delay-100', 'delay-200', 'delay-300', 'delay-400']
              return (
                <div
                  key={i}
                  data-reveal
                  className={`group relative bg-white dark:bg-zinc-900/60 p-8 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/80 shadow-md shadow-zinc-100/50 dark:shadow-none hover:border-emerald-500/50 dark:hover:border-emerald-500/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-900/5 dark:hover:shadow-emerald-500/5 transition-all duration-500 flex flex-col justify-between overflow-hidden ${delays[i]}`}
                >
                  {/* Decorative background gradient glow */}
                  <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-emerald-500/5 dark:bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors duration-500" />
                  
                  <div>
                    {/* Top row with icon & badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100/50 dark:border-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:bg-emerald-500 shadow-sm group-hover:shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-500">
                        <div className="group-hover:scale-110 transition-transform duration-500">
                          {v.icon}
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-100/50 dark:border-emerald-900/20">
                        {v.badge}
                      </span>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-display mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      {v.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                      {v.desc}
                    </p>
                  </div>

                  {/* Micro-metric or key bullet */}
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 mt-4 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">{v.detail}</span>
                    <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-emerald-600 dark:text-emerald-400 font-bold">
                      Saber más →
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Target Sectors Grid */}
      <section className="py-24 premium-pan-bg text-white relative overflow-hidden border-t border-zinc-900">
        {/* Premium Tech Dotted/Grid Pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.025)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        {/* Slow organic glowing mesh auroras */}
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
        <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[10000ms]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div data-reveal className="text-center max-w-3xl mx-auto mb-20 delay-0">
            <span className="text-[10px] uppercase font-extrabold tracking-[0.2em] text-emerald-400 bg-emerald-950/60 px-4 py-1.5 rounded-full border border-emerald-900/40 mb-4 inline-block">
              Soluciones por Segmento
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-display mt-2 leading-tight">
              Soluciones Especiales para cada Sector B2B
            </h2>
            <p className="text-zinc-400 mt-4 leading-relaxed text-sm sm:text-base max-w-2xl mx-auto">
              Diseñamos programas de abastecimiento a la medida, adaptando calibres, maduración y empaques a la logística de tu negocio.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sectors.map((sec, i) => {
              const delays = ['delay-100', 'delay-200', 'delay-300']
              return (
                <div
                  key={i}
                  data-reveal
                  className={`group relative bg-zinc-900/30 backdrop-blur-md p-8 rounded-2xl border border-zinc-850 hover:border-emerald-500/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500 flex flex-col justify-between overflow-hidden ${delays[i]}`}
                >
                  {/* Subtle inner grid lines or visual details */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full opacity-35 pointer-events-none" />
                  
                  <div>
                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-900/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm shadow-emerald-500/5">
                      {sec.icon}
                    </div>

                    <h3 className="text-xl font-bold text-white font-display mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                      {sec.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-8">
                      {sec.desc}
                    </p>
                  </div>
                  <Link
                    href={sec.slug}
                    className="inline-flex items-center text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 gap-1.5 transition-colors group/link mt-auto pt-4 border-t border-zinc-800/40"
                  >
                    Ver detalles del servicio 
                    <span className="group-hover/link:translate-x-1.5 transition-transform duration-300">→</span>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quotation Form Section */}
      <section id="cotizar" className="py-20 bg-zinc-950 relative overflow-hidden border-t border-zinc-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_50%)] pointer-events-none" />
        <div className="absolute -left-20 top-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Form Description */}
          <div data-reveal className="lg:col-span-5 space-y-6 text-white delay-100">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-900/40 mb-3 inline-block">
              Despacho Directo RM
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight">
              Suministro Exclusivo en Santiago
            </h2>
            <p className="text-zinc-400 leading-relaxed text-base sm:text-lg">
              Operamos con nuestra propia flota de camiones refrigerados en la <strong>Región Metropolitana</strong>. No tercerizamos la logística para asegurar que cada calibre llegue en el grado de madurez exacto que solicita tu cocina.
            </p>

            {/* Logistics RM Interactive Widget */}
            <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800/80 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full opacity-30 pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4 border-b border-zinc-800/80 pb-3 text-xs text-zinc-400">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  Logística Activa
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider">Flota Propia RM</span>
              </div>

              <div className="space-y-3.5 text-xs text-zinc-300">
                {/* Las Condes / Vitacura / Providencia Freq */}
                <div className="flex justify-between items-center gap-4">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
                    <span>Frecuencia Las Condes/Vitacura/Providencia:</span>
                  </span>
                  <span className="font-bold text-white bg-zinc-800/60 px-2.5 py-1 rounded-lg border border-zinc-700/50 shrink-0">Diaria (L-S)</span>
                </div>

                {/* Rest of RM Freq */}
                <div className="flex justify-between items-center gap-4">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Resto de comunas RM:</span>
                  </span>
                  <span className="font-bold text-white bg-zinc-800/60 px-2.5 py-1 rounded-lg border border-zinc-700/50 shrink-0">Cada 48 hrs</span>
                </div>

                {/* Pedido Minimo */}
                <div className="flex justify-between items-center gap-4">
                  <span className="text-zinc-400 flex items-center gap-2">
                    <Package className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Pedido Mínimo Despacho:</span>
                  </span>
                  <span className="font-bold text-white bg-zinc-800/60 px-2.5 py-1 rounded-lg border border-zinc-700/50 shrink-0">100 KG</span>
                </div>

                {/* Dispatch Status */}
                <div className="flex justify-between items-center border-t border-zinc-800/60 pt-3 text-[11px] gap-4">
                  <span className="text-zinc-500 font-semibold flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-500 animate-pulse shrink-0" />
                    <span>Estado de Despacho:</span>
                  </span>
                  <span className="font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-2.5 py-0.5 rounded-full shrink-0">Rutas en curso</span>
                </div>
              </div>

              {/* Interactive Route Map */}
              <div className="mt-5 pt-4 border-t border-zinc-800/60">
                <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-2">
                  <span>Monitoreo de Rutas (RM)</span>
                  <span className="text-emerald-400 flex items-center gap-1 text-[9px]">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    En Tránsito
                  </span>
                </div>
                <div className="relative bg-zinc-950/60 border border-zinc-800/40 rounded-xl overflow-hidden p-3 h-28 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.015)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />
                  
                  <svg viewBox="0 0 280 80" className="w-full h-full">
                    {/* Dotted Track */}
                    <path 
                      id="transit-track" 
                      d="M 25,55 C 65,55 85,20 130,35 C 175,50 195,15 255,20" 
                      fill="none" 
                      stroke="#27272a" 
                      strokeWidth="2.5" 
                      strokeDasharray="4 4" 
                    />
                    
                    {/* Glowing Progress Dotted Line */}
                    <path 
                      d="M 25,55 C 65,55 85,20 130,35 C 175,50 195,15 255,20" 
                      fill="none" 
                      stroke="url(#route-glow)" 
                      strokeWidth="2.5" 
                      strokeDasharray="16 80" 
                    >
                      <animate 
                        attributeName="stroke-dashoffset" 
                        values="96;0" 
                        dur="5s" 
                        repeatCount="indefinite" 
                      />
                    </path>

                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="route-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
                        <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>

                    {/* VentaDePaltas Packing Pin */}
                    <g transform="translate(25, 55)">
                      <circle cx="0" cy="0" r="4.5" fill="#ef4444" className="animate-pulse" />
                      <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
                      <text x="0" y="16" textAnchor="middle" fill="#71717a" fontSize="7" fontWeight="bold">VentaDePaltas</text>
                    </g>

                    {/* Providencia Node */}
                    <g transform="translate(130, 35)">
                      <circle cx="0" cy="0" r="3" fill="#10b981" />
                      <text x="-25" y="-8" fill="#52525b" fontSize="6.5" fontWeight="medium">Providencia</text>
                    </g>

                    {/* Las Condes / Vitacura Pin */}
                    <g transform="translate(255, 20)">
                      <circle cx="0" cy="0" r="4.5" fill="#f59e0b" className="animate-pulse" />
                      <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
                      <text x="-40" y="14" fill="#71717a" fontSize="7" fontWeight="bold">Las Condes / Vitacura</text>
                    </g>

                    {/* Animated Delivery Truck */}
                    <g>
                      {/* Truck Shape centered around (0,0) */}
                      <g transform="translate(-8, -8)" fill="#34d399">
                        <path d="M 9,3 L 13,3 L 16,7 L 16,11 L 9,11 Z" fill="#34d399" />
                        <rect x="1" y="2" width="8" height="9" rx="0.5" fill="#10b981" />
                        <circle cx="4" cy="12" r="1.5" fill="#000" />
                        <circle cx="12" cy="12" r="1.5" fill="#000" />
                      </g>
                      <animateMotion 
                        path="M 25,55 C 65,55 85,20 130,35 C 175,50 195,15 255,20" 
                        dur="8s" 
                        repeatCount="indefinite" 
                        rotate="auto" 
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Actual LeadForm */}
          <div data-reveal className="lg:col-span-7 delay-200">
            <div className="relative bg-zinc-900/80 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-zinc-800/60 shadow-2xl">
              <LeadForm paginaOrigen={pagePath} />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900/30 border-t border-zinc-200/30 dark:border-zinc-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div data-reveal className="text-center mb-16 delay-0">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full border border-emerald-200/40 dark:border-emerald-900/30 mb-3 inline-block">
              Preguntas Frecuentes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-display mt-2">
              Todo lo que necesitas saber
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-base sm:text-lg">
              Respuestas rápidas a las dudas comunes sobre el abastecimiento y la compra de paltas por mayor.
            </p>
          </div>

          <div className="space-y-6">
            <div data-reveal className="bg-white dark:bg-zinc-900/60 p-6 sm:p-8 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-900/2 dark:hover:shadow-emerald-500/2 transition-all duration-300 delay-100">
              <h3 className="font-bold text-zinc-900 dark:text-white flex gap-3 items-start font-display text-base sm:text-lg">
                <HelpCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                ¿Cuál es el pedido mínimo para despachos mayoristas?
              </h3>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 pl-9 leading-relaxed">
                Nuestro pedido mínimo habitual para despacho gratuito en Santiago es de 100 kg, ideal para restaurantes y casinos medianos. Consúltanos por volúmenes menores retirando en centro de distribución.
              </p>
            </div>

            <div data-reveal className="bg-white dark:bg-zinc-900/60 p-6 sm:p-8 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-900/2 dark:hover:shadow-emerald-500/2 transition-all duration-300 delay-200">
              <h3 className="font-bold text-zinc-900 dark:text-white flex gap-3 items-start font-display text-base sm:text-lg">
                <HelpCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                ¿Cómo aseguran la madurez adecuada de la palta Hass?
              </h3>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 pl-9 leading-relaxed">
                Clasificamos nuestras paltas por calibres y estados de maduración (verde, en transición o lista para consumo) según el requerimiento de tu negocio. Si necesitas paltas listas para moler hoy mismo, te entregamos calibres a punto.
              </p>
            </div>

            <div data-reveal className="bg-white dark:bg-zinc-900/60 p-6 sm:p-8 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-900/2 dark:hover:shadow-emerald-500/2 transition-all duration-300 delay-300">
              <h3 className="font-bold text-zinc-900 dark:text-white flex gap-3 items-start font-display text-base sm:text-lg">
                <HelpCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                ¿Qué comunas de la Región Metropolitana cubren con su despacho?
              </h3>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 pl-9 leading-relaxed">
                Cubrimos de forma exclusiva las 52 comunas de la Región Metropolitana con flota propia refrigerada. No despachamos a otras regiones para asegurar un control estricto de la temperatura, logrando merma cero y el grado de madurez exacto que tu negocio solicita.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
