import React from 'react'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PublicLayout from '@/components/PublicLayout'
import LeadForm from '@/components/LeadForm'
import JsonLdSchema from '@/components/JsonLdSchema'
import AvocadoParticles from '@/components/AvocadoParticles'
import { Metadata } from 'next'
import Image from 'next/image'
import { CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Map slugs to generated images
const slugImages: Record<string, string> = {
  'palta-edranol-por-mayor': '/images/palta_edranol.png',
  'palta-fuerte-por-mayor': '/images/palta_fuerte.png',
  'palta-chilena-premium': '/images/palta_chilena.png',
  'palta-hass-peruana': '/images/palta_peruana.png',
  'venta-de-paltas-en-las-condes': '/images/premium_hass_avocados.png',
  'venta-de-paltas-en-vitacura': '/images/premium_hass_avocados.png',
  'venta-de-paltas-en-providencia': '/images/premium_hass_avocados.png',
  'compra-de-paltas-al-por-mayor': '/images/premium_hass_avocados.png',
  'proveedor-de-frutas-para-empresas': '/images/premium_hass_avocados.png',
  'frutas-y-verduras-para-casinos': '/images/premium_hass_avocados.png',
}

async function getSeoPage(slug: string) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Safeguard: Check if Supabase is not configured yet
    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
      return getMockPage(slug)
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('seo_pages')
      .select('*')
      .eq('slug', slug)
      .eq('publicada', true)
      .single()

    if (error || !data) {
      if (process.env.NODE_ENV === 'development') {
        return getMockPage(slug)
      }
      return null
    }

    return data
  } catch (e) {
    console.error('Error fetching SEO page:', e)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getSeoPage(slug)

  if (!page) {
    return {
      title: 'Página no encontrada | VENTADEPALTAS.CL',
      description: 'La página que buscas no existe.',
    }
  }

  const baseUrl = 'https://ventadepaltas.cl'
  const canonicalUrl = `${baseUrl}/${slug}`

  return {
    title: page.meta_title || `${page.titulo} | VENTADEPALTAS.CL`,
    description: page.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.meta_title || page.titulo,
      description: page.meta_description,
      url: canonicalUrl,
      images: [{ url: slugImages[slug] || `${baseUrl}/images/premium_hass_avocados.png` }],
    },
  }
}

export default async function DynamicSEOPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getSeoPage(slug)

  if (!page) {
    notFound()
  }

  // Parse FAQ
  let faqSchema: any = null
  if (page.faq_json) {
    const rawFaqs = typeof page.faq_json === 'string' ? JSON.parse(page.faq_json) : page.faq_json
    if (Array.isArray(rawFaqs) && rawFaqs.length > 0) {
      faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': rawFaqs.map((faq: any) => ({
          '@type': 'Question',
          'name': faq.question || faq.pregunta,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer || faq.respuesta
          }
        }))
      }
    }
  }

  const customSchema = page.schema_json 
    ? (typeof page.schema_json === 'string' ? JSON.parse(page.schema_json) : page.schema_json)
    : null

  // Determine Hero image
  const heroImage = slugImages[slug] || '/images/premium_hass_avocados.png'

  return (
    <PublicLayout>
      {faqSchema && <JsonLdSchema schema={faqSchema} />}
      {customSchema && <JsonLdSchema schema={customSchema} />}

      {/* Split Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 text-white border-b border-zinc-150 dark:border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_40%)] pointer-events-none" />
        <AvocadoParticles />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Text & Badges */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 animate-pulse" />
              Variedad / Servicio Especializado
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display leading-[1.15]">
              {page.titulo}
            </h1>
            <h2 className="text-base sm:text-lg text-emerald-100 font-sans font-medium leading-relaxed max-w-xl">
              {page.meta_description}
            </h2>
            <div className="pt-2">
              <a 
                href="#cotizar"
                className="cursor-pointer inline-flex items-center justify-center rounded-xl bg-white text-emerald-950 font-bold px-6 py-3 shadow-md hover:bg-zinc-50 active:scale-95 transition-all text-sm"
              >
                Solicitar Cotización Directa
              </a>
            </div>
          </div>

          {/* Right: Beautiful Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src={heroImage}
                alt={page.titulo}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 350px"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Organic curved shape divider at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-white dark:bg-zinc-950" style={{ clipPath: 'ellipse(65% 100% at 50% 100%)' }} />
      </section>

      {/* Dynamic Content */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <article className="prose prose-zinc dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-350 text-sm leading-relaxed">
          <div 
            dangerouslySetInnerHTML={{ __html: page.contenido }} 
            className="space-y-5 font-sans [&>h2]:text-xl [&>h2]:font-bold [&>h2]:font-display [&>h2]:text-zinc-950 [&>h2]:dark:text-white [&>h2]:mt-8 [&>h2]:border-b [&>h2]:border-zinc-200 [&>h2]:dark:border-zinc-800 [&>h2]:pb-2 [&>p]:mt-2"
          />
        </article>
      </section>

      {/* Dynamic FAQ List */}
      {faqSchema && (
        <section className="py-16 bg-zinc-100 dark:bg-zinc-900/40 border-y border-zinc-200/40 dark:border-zinc-800/40">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h3 className="text-xl font-bold font-display text-zinc-950 dark:text-white mb-8 text-center">
              Preguntas Frecuentes Relacionadas
            </h3>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq: any, idx: number) => (
                <div key={idx} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-250/50 dark:border-zinc-800/50 shadow-xs">
                  <h4 className="font-bold text-zinc-900 dark:text-white text-sm flex gap-2 items-start font-display">
                    <HelpCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    {faq.name}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 pl-7 leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Form Submission */}
      <section id="cotizar" className="py-16 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-zinc-900 dark:text-white">
              Cotiza en Segundos
            </h2>
            <p className="text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed">
              Completa los datos de tu empresa y requerimientos. La solicitud quedará ingresada en nuestro panel de control de inmediato indicando procedencia desde la página: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">/{slug}</strong>.
            </p>
          </div>
          <div className="lg:col-span-7">
            <LeadForm paginaOrigen={`/${slug}`} title={`Cotizar: ${page.titulo}`} />
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

// 10 Mock Pages for developer testing. Matches Google Keyword Plan.
function getMockPage(slug: string) {
  const mocks: Record<string, any> = {
    'palta-edranol-por-mayor': {
      titulo: 'Palta Edranol por Mayor',
      keyword_principal: 'palta edranol',
      meta_title: 'Palta Edranol por Mayor | Distribución Directa Chile',
      meta_description: 'Proveedor mayorista de Palta Edranol en Chile. Fruto de piel verde y lisa con excelente calibre, ideal como polinizador y de gran sabor.',
      contenido: `
        <h2>Características de la Palta Edranol</h2>
        <p>La palta **Edranol** es una de las variedades de piel verde más cultivadas en Chile, utilizada comúnmente como polinizadora en huertos de palta Hass. Destaca por su forma de pera alargada, piel lisa y un sabor suave con notas a frutos secos.</p>
        <h2>¿Por qué comprar palta Edranol al por mayor?</h2>
        <p>Al ser cosechada a principios de la temporada, la Edranol representa una alternativa económica y de excelente calidad cuando la palta Hass nacional está en sus etapas iniciales. Su rendimiento por kilo es excelente, lo que la hace muy cotizada por casinos de alimentos y procesadores industriales de pulpa.</p>
      `,
      faq_json: JSON.stringify([
        { question: '¿Cuál es la temporada de la palta Edranol?', answer: 'Se cosecha principalmente a fines del otoño y durante el invierno en Chile (Mayo a Agosto).' },
        { question: '¿Sirve para moler en sangucherías?', answer: 'Sí, tiene una textura muy cremosa y un excelente color verde brillante que resiste muy bien la oxidación al vacío.' }
      ]),
      publicada: true
    },
    'palta-fuerte-por-mayor': {
      titulo: 'Palta Fuerte por Mayor',
      keyword_principal: 'palta fuerte',
      meta_title: 'Palta Fuerte por Mayor | Distribución Directa Chile',
      meta_description: 'Proveedor mayorista de Palta Fuerte. Fruto de piel verde y cremocidad única. Ideal para casinos, restaurantes y reventa.',
      contenido: `
        <h2>¿Qué es la variedad de Palta Fuerte?</h2>
        <p>La variedad **Fuerte** es una palta híbrida de origen mexicano-guatemalteco. Destaca por su piel verde opaca, lisa y delgada. Es conocida comercialmente como una de las paltas con mayor concentración de grasas saludables, otorgándole una textura extremadamente mantecosa.</p>
        <h2>Ideal para la Cocina Profesional</h2>
        <p>Su pulpa no tiene hebras y su semilla se separa con suma facilidad, agilizando el tiempo de preparación en cocinas de alto volumen como casinos corporativos y restaurantes tradicionales.</p>
      `,
      faq_json: JSON.stringify([
        { question: '¿Cómo identificar una palta Fuerte madura?', answer: 'A diferencia de la Hass, la Fuerte no cambia de color al madurar; se mantiene verde. Para saber si está lista, debe ceder a una suave presión con la palma de la mano.' }
      ]),
      publicada: true
    },
    'palta-chilena-premium': {
      titulo: 'Palta Chilena Premium por Mayor',
      keyword_principal: 'palta chilena',
      meta_title: 'Palta Chilena Premium al por Mayor | Abastecimiento B2B',
      meta_description: 'Distribución de palta chilena seleccionada de los valles de Quillota, Cabildo y Cruz. Máxima cremosidad y calibre para restaurantes.',
      contenido: `
        <h2>El Estándar de la Palta Chilena</h2>
        <p>La **palta chilena** (cosechada en los valles de Quillota, Petorca, Cabildo y la RM) es reconocida a nivel mundial por sus condiciones ideales de cultivo. La oscilación térmica de los valles chilenos permite una acumulación lenta y óptima de materia seca, dando origen a una palta más sabrosa, cremosa y aceitosa que la de otros orígenes.</p>
        <h2>Abastecimiento Directo de Packing</h2>
        <p>Trabajamos de forma directa con agricultores locales, garantizando un proceso de cosecha óptimo, cadena de frío y transporte rápido hasta Santiago para asegurar la frescura de los frutos.</p>
      `,
      faq_json: JSON.stringify([
        { question: '¿Por qué la palta chilena es más cremosa?', answer: 'Debido al clima de los valles centrales de Chile, el fruto permanece más tiempo en el árbol acumulando aceites esenciales antes de su recolección.' }
      ]),
      publicada: true
    },
    'palta-hass-peruana': {
      titulo: 'Palta Hass Peruana por Mayor',
      keyword_principal: 'palta hass peruana',
      meta_title: 'Palta Hass Peruana al por Mayor | Importación Directa',
      meta_description: 'Importadores directos de palta Hass peruana. Abastecimiento garantizado durante la temporada de otoño-invierno con calibres uniformes.',
      contenido: `
        <h2>Abastecimiento de Palta Hass Peruana</h2>
        <p>Durante los meses de otoño e invierno en Chile (Abril a Julio), la producción nacional entra en receso. Para mantener el abastecimiento constante de tu restaurante o casino, importamos **palta Hass de Perú** de zonas agrícolas certificadas.</p>
        <h2>Beneficios de la Palta Importada</h2>
        <p>Esta variedad destaca por calibres muy homogéneos y pieles limpias, lo que reduce las pérdidas por descarte en reventas de minimarket o preparación de platos masivos.</p>
      `,
      faq_json: JSON.stringify([
        { question: '¿Cuál es la diferencia de sabor con la chilena?', answer: 'La palta peruana posee un porcentaje ligeramente menor de aceite debido al clima tropical de origen, haciéndola un poco más fresca e ideal para ensaladas y guacamole.' }
      ]),
      publicada: true
    },
    'compra-de-paltas-al-por-mayor': {
      titulo: 'Compra de Paltas al por Mayor',
      keyword_principal: 'compra de paltas al por mayor',
      meta_title: 'Compra de Paltas al por Mayor | Proveedor Directo Chile',
      meta_description: '¿Buscas comprar paltas al por mayor? Abastecemos a minimarkets, distribuidores y centrales de compra con las mejores tarifas de packing.',
      contenido: `
        <h2>Optimiza tu Compra Mayorista de Paltas</h2>
        <p>Comprar paltas por volumen requiere de un proveedor confiable que garantice peso neto, calibres correctos y continuidad de despacho. En **VENTADEPALTAS.CL** simplificamos tu canal de compras hortofrutícolas B2B.</p>
      `,
      faq_json: '[]',
      publicada: true
    },
    'proveedor-de-frutas-para-empresas': {
      titulo: 'Proveedor de Frutas y Verduras para Empresas',
      keyword_principal: 'proveedor de frutas para empresas',
      meta_title: 'Proveedor de Frutas para Empresas | Servicios de Oficina',
      meta_description: 'Abastecimiento de frutas saludables para oficinas y comedores corporativos en Santiago. Cajas listas de palta Hass y frutas de estación.',
      contenido: `
        <h2>Fruta Saludable en tu Espacio de Trabajo</h2>
        <p>Fomentar la alimentación saludable en la oficina mejora el clima laboral y el bienestar de tus colaboradores. Entregamos cajas surtidas de fruta fresca y cajas exclusivas de palta Hass seleccionada listas para el consumo del personal.</p>
      `,
      faq_json: '[]',
      publicada: true
    },
    'frutas-y-verduras-para-casinos': {
      titulo: 'Frutas y Verduras para Casinos y Concesiones',
      keyword_principal: 'frutas y verduras para casinos',
      meta_title: 'Frutas y Verduras para Casinos | Distribuidor Mayorista',
      meta_description: 'Distribuidor mayorista de frutas y verduras para casinos institucionales y colegios. Trazabilidad, certificaciones sanitarias y volumen continuo.',
      contenido: `
        <h2>Abastecimiento Mayorista para Alimentación Colectiva</h2>
        <p>Entregamos suministros a gran escala para empresas concesionarias de casinos. Cumplimos con estándares de inocuidad alimentaria, embalajes adecuados y despacho puntual.</p>
      `,
      faq_json: '[]',
      publicada: true
    },
    'venta-de-paltas-en-las-condes': {
      titulo: 'Venta de Paltas en Las Condes',
      keyword_principal: 'venta de paltas en las condes',
      meta_title: 'Venta de Paltas en Las Condes por Mayor | Proveedor Directo',
      meta_description: 'Comprar paltas por mayor en Las Condes. Distribución de palta Hass premium para restaurantes, cafeterías y sushi de Las Condes. Despacho rápido.',
      contenido: '<h2>Proveedor de Palta Hass en Las Condes</h2><p>Contáctanos para despacho rápido...</p>',
      faq_json: '[]',
      publicada: true
    },
    'venta-de-paltas-en-vitacura': {
      titulo: 'Venta de Paltas en Vitacura',
      keyword_principal: 'venta de paltas en vitacura',
      meta_title: 'Venta de Paltas en Vitacura por Mayor | Proveedor Hass',
      meta_description: 'Abastecimiento de palta Hass seleccionada en Vitacura. Despacho express para restaurantes, locales y banqueterías de Vitacura.',
      contenido: '<h2>Proveedor en Vitacura</h2><p>Calidad de exportación...</p>',
      faq_json: '[]',
      publicada: true
    },
    'venta-de-paltas-en-providencia': {
      titulo: 'Venta de Paltas en Providencia',
      keyword_principal: 'venta de paltas en providencia',
      meta_title: 'Venta de Paltas en Providencia por Mayor | Proveedor Premium',
      meta_description: 'Distribución de palta Hass para restaurantes y cafeterías de Providencia. Despacho diario temprano por la mañana. Calibres seleccionados.',
      contenido: '<h2>Proveedor en Providencia</h2><p>Paltas listas para moler y servir en Providencia...</p>',
      faq_json: '[]',
      publicada: true
    }
  }

  return mocks[slug] || null
}
