import React from 'react'
import Link from 'next/link'
import PublicLayout from '@/components/PublicLayout'
import { createClient } from '@/lib/supabase/server'
import { Calendar, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Blog de la Palta Hass | Artículos y Consejos Mayoristas',
  description: 'Aprende sobre calibres de palta Hass, técnicas de maduración, conservación, recetas mayoristas y el mercado de frutas B2B en Chile.',
}

async function getBlogPosts() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Safeguard: mock posts if Supabase is not configured
    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
      return getMockPosts()
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('publicada', true)
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) {
      return getMockPosts()
    }

    return data
  } catch (e) {
    console.error('Error fetching blog posts:', e)
    return getMockPosts()
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <PublicLayout>
      <div className="bg-zinc-50 dark:bg-zinc-950 py-12 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Blog Informativo B2B
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-display mt-2">
              Consejos y Novedades de la Palta Hass
            </h1>
            <p className="text-zinc-650 dark:text-zinc-400 mt-3 text-sm">
              Artículos especializados en conservación, maduración, recetas industriales y tendencias del mercado hortofrutícola en Chile.
            </p>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <article 
                key={post.id}
                className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(post.created_at).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-display group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.titulo}
                    </Link>
                  </h3>
                  
                  <p className="text-xs text-zinc-550 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                    {post.meta_description}
                  </p>
                </div>
                
                <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-850/50 border-t border-zinc-155/30 dark:border-zinc-800/30 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    {post.keyword_principal || 'Palta Hass'}
                  </span>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform"
                  >
                    Leer Artículo <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </PublicLayout>
  )
}

function getMockPosts() {
  return [
    {
      id: 'mock-1',
      titulo: 'Cómo conservar la Palta Hass en Restaurantes para evitar mermas',
      slug: 'como-conservar-palta-hass-restaurantes',
      meta_description: 'Consejos profesionales para prolongar la vida útil de tus paltas en cocinas comerciales. Aprende trucos térmicos y de almacenamiento.',
      keyword_principal: 'conservar palta',
      created_at: new Date('2026-05-15T12:00:00Z').toISOString(),
      publicada: true
    },
    {
      id: 'mock-2',
      titulo: 'Guía Completa de Calibres de Palta: ¿Cuál es el mejor para tu negocio?',
      slug: 'guia-calibres-de-palta-hass',
      meta_description: 'Diferencias entre calibres Super Extra, Extra, Primera y Segunda. Conoce cuál rinde más en sangucherías, sushis y casinos institucionales.',
      keyword_principal: 'calibres de palta',
      created_at: new Date('2026-05-10T12:00:00Z').toISOString(),
      publicada: true
    },
    {
      id: 'mock-3',
      titulo: 'El origen de la Palta Hass en Chile: Temporadas y abastecimiento anual',
      slug: 'origen-temporada-palta-hass-chile',
      meta_description: '¿Por qué comemos palta de Perú o México en invierno? Conoce el ciclo anual del aguacate y cómo asegurar stock permanente.',
      keyword_principal: 'temporada de palta',
      created_at: new Date('2026-05-01T12:00:00Z').toISOString(),
      publicada: true
    }
  ]
}
