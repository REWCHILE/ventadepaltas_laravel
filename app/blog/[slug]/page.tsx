import React from 'react'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PublicLayout from '@/components/PublicLayout'
import JsonLdSchema from '@/components/JsonLdSchema'
import { Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

interface PostProps {
  params: Promise<{ slug: string }>
}

async function getBlogPost(slug: string) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Safeguard: mock posts if Supabase is not configured
    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
      return getMockPost(slug)
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('publicada', true)
      .single()

    if (error || !data) {
      if (process.env.NODE_ENV === 'development') {
        return getMockPost(slug)
      }
      return null
    }

    return data
  } catch (e) {
    console.error('Error fetching blog post:', e)
    return null
  }
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: 'Artículo no encontrado | VENTADEPALTAS.CL',
      description: 'El artículo de blog que buscas no existe.',
    }
  }

  const baseUrl = 'https://ventadepaltas.cl'
  const canonicalUrl = `${baseUrl}/blog/${slug}`

  return {
    title: post.meta_title || `${post.titulo} | Blog VENTADEPALTAS.CL`,
    description: post.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.meta_title || post.titulo,
      description: post.meta_description,
      url: canonicalUrl,
      images: [{ url: `${baseUrl}/images/premium_hass_avocados.png` }],
    },
  }
}

export default async function BlogPostPage({ params }: PostProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // Create standard BlogPosting JSON-LD schema
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.titulo,
    'description': post.meta_description,
    'datePublished': post.created_at,
    'author': {
      '@type': 'Organization',
      'name': 'VENTADEPALTAS.CL'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'VENTADEPALTAS.CL',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://ventadepaltas.cl/images/premium_hass_avocados.png'
      }
    }
  }

  return (
    <PublicLayout>
      <JsonLdSchema schema={blogSchema} />

      <div className="bg-zinc-50 dark:bg-zinc-950 py-12 flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Back button */}
          <Link 
            href="/blog"
            className="inline-flex items-center gap-1 text-xs font-bold text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Volver al Blog
          </Link>

          {/* Article Header */}
          <header className="space-y-4 mb-8">
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" />
              <span>{new Date(post.created_at).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span>•</span>
              <span className="uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                {post.keyword_principal || 'Palta Hass'}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-display leading-[1.2]">
              {post.titulo}
            </h1>
          </header>

          {/* Article Content */}
          <article className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
            <div 
              dangerouslySetInnerHTML={{ __html: post.contenido }} 
              className="prose prose-zinc dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed space-y-4 font-sans [&>h2]:text-lg [&>h2]:font-bold [&>h2]:font-display [&>h2]:text-zinc-950 [&>h2]:dark:text-white [&>h2]:mt-6 [&>h2]:mb-2 [&>p]:mt-2"
            />
          </article>

        </div>
      </div>
    </PublicLayout>
  )
}

function getMockPost(slug: string) {
  const mocks: Record<string, any> = {
    'como-conservar-palta-hass-restaurantes': {
      titulo: 'Cómo conservar la Palta Hass en Restaurantes para evitar mermas',
      meta_title: 'Cómo conservar la Palta Hass en Restaurantes | Evita Mermas',
      meta_description: 'Consejos profesionales para prolongar la vida útil de tus paltas en cocinas comerciales. Aprende trucos térmicos y de almacenamiento.',
      keyword_principal: 'conservar palta',
      created_at: new Date('2026-05-15T12:00:00Z').toISOString(),
      contenido: `
        <h2>El Desafío de la Maduración en Restaurantes</h2>
        <p>Para un restaurante o sushi bar, la palta es uno de los insumos más costosos y delicados. Servir una palta oxidada daña la experiencia, y botar palta demasiado madura daña tu margen de ganancia. Conservar las paltas adecuadamente es clave.</p>
        
        <h2>1. Separación de Lotes por Maduración</h2>
        <p>Nunca almacenes todas las paltas juntas. Agrupa las paltas según su estado: verdes, en proceso y listas. Almacena las paltas verdes a temperatura ambiente (15-20°C) con buena ventilación. Las que ya estén maduras, llévalas de inmediato a la cámara de frío a 5-7°C para detener su maduración.</p>
        
        <h2>2. Evita la Oxidación Directa</h2>
        <p>Si te sobra palta molida o cortada en láminas al final del turno, guárdala en recipientes herméticos rociando un poco de jugo de limón o aceite de cocina sobre la superficie. También es efectivo aplicar film plástico de contacto ("a piel") sobre el puré para eliminar todo el oxígeno de la superficie.</p>
      `
    },
    'guia-calibres-de-palta-hass': {
      titulo: 'Guía Completa de Calibres de Palta: ¿Cuál es el mejor para tu negocio?',
      meta_title: 'Guía Completa de Calibres de Palta Hass | VENTADEPALTAS.CL',
      meta_description: 'Diferencias entre calibres Super Extra, Extra, Primera y Segunda. Conoce cuál rinde más en sangucherías, sushis y casinos institucionales.',
      keyword_principal: 'calibres de palta',
      created_at: new Date('2026-05-10T12:00:00Z').toISOString(),
      contenido: `
        <h2>¿Qué significa el calibre en las paltas?</h2>
        <p>El calibre determina el tamaño y el peso unitario del fruto. En el mercado mayorista de Chile, los calibres están estandarizados para clasificar el producto en cajas de cartón o madera de 10 kg o 18 kg.</p>
        
        <h2>Calibres Comunes y Rendimiento Gastronómico</h2>
        <h2>Calibre Super Extra (260g - 300g)</h2>
        <p>Paltas de gran tamaño. Ideales para exhibición o para hoteles de lujo y bufés que sirven la palta en mitades perfectas. Al ser tan grandes, requieren un pelado rápido.</p>
        
        <h2>Calibre Extra (220g - 250g)</h2>
        <p>El preferido por las sangucherías de primer nivel. Ofrece una gran cantidad de pulpa y un hueso mediano, maximizando el rendimiento por kilo.</p>
        
        <h2>Calibre Primera (180g - 210g)</h2>
        <p>El calibre estándar y más balanceado del mercado. Es muy demandado por locales de sushi y casinos ya que permite porcionar de manera homogénea en platos individuales.</p>
      `
    },
    'origen-temporada-palta-hass-chile': {
      titulo: 'El origen de la Palta Hass en Chile: Temporadas y abastecimiento anual',
      meta_title: 'Temporada de Palta Hass en Chile | Distribución Anual',
      meta_description: '¿Por qué comemos palta de Perú o México en invierno? Conoce el ciclo anual del aguacate y cómo asegurar stock permanente.',
      keyword_principal: 'temporada de palta',
      created_at: new Date('2026-05-01T12:00:00Z').toISOString(),
      contenido: `
        <h2>El Ciclo de la Palta Hass</h2>
        <p>La palta es un árbol perenne, pero sus frutos tienen una estacionalidad definida. Conocer los periodos de cosecha nacional e internacional te ayudará a planificar los costos en tu cocina.</p>
        
        <h2>Temporada Chilena (Julio a Marzo)</h2>
        <p>Es la palta de mejor calidad por su alto contenido de aceite y pulpa mantecosa. Se cosecha principalmente en los valles de la Región de Valparaíso (Cabildo, Quillota, Cruz) y la Región Metropolitana. Comienza a recolectarse en invierno y dura hasta fines del verano.</p>
        
        <h2>Temporada de Importación (Abril a Junio)</h2>
        <p>Durante el otoño chileno, la producción nacional disminuye drásticamente. Para sostener el consumo nacional de más de 8 kg por persona al año, se importa palta principalmente de Perú (valles costeros) y México (Michoacán). Esta palta es algo más acuosa pero de gran calibre y piel limpia.</p>
      `
    }
  }

  return mocks[slug] || null
}
