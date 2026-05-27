'use client'

import React, { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Edit3, Trash2, CheckCircle2, Eye, Sparkles } from 'lucide-react'

interface BlogPost {
  id: string
  titulo: string
  slug: string
  contenido: string
  meta_title: string
  meta_description: string
  keyword_principal: string
  schema_json: any
  publicada: boolean
  created_at: string
}

export default function BlogCrud() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [isDemo, setIsDemo] = useState(false)

  // Form State
  const [formOpen, setFormOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)

  const [titulo, setTitulo] = useState('')
  const [slug, setSlug] = useState('')
  const [contenido, setContenido] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [keywordPrincipal, setKeywordPrincipal] = useState('')
  const [schemaJson, setSchemaJson] = useState('{}')
  const [publicada, setPublicada] = useState(false)

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
        setIsDemo(true)
        setPosts(getMockPosts())
        setLoading(false)
        return
      }

      const supabase = createClient()
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (e) {
      console.error(e)
      setPosts(getMockPosts())
      setIsDemo(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleOpenCreate = () => {
    setEditingPost(null)
    setTitulo('')
    setSlug('')
    setContenido('')
    setMetaTitle('')
    setMetaDescription('')
    setKeywordPrincipal('')
    setSchemaJson('{}')
    setPublicada(false)
    setFormOpen(true)
  }

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post)
    setTitulo(post.titulo)
    setSlug(post.slug)
    setContenido(post.contenido)
    setMetaTitle(post.meta_title)
    setMetaDescription(post.meta_description)
    setKeywordPrincipal(post.keyword_principal)
    setPublicada(post.publicada)

    try {
      setSchemaJson(typeof post.schema_json === 'string' ? post.schema_json : JSON.stringify(post.schema_json, null, 2))
    } catch {
      setSchemaJson('{}')
    }

    setFormOpen(true)
  }

  // Handle title change and auto slug / seo metadata
  const handleTitleChange = (val: string) => {
    setTitulo(val)
    if (!editingPost) {
      const autoSlug = val
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
      
      setSlug(autoSlug)
      setKeywordPrincipal(val.split(' ')[0].toLowerCase())
      setMetaTitle(`${val} | Blog VENTADEPALTAS.CL`)
      setMetaDescription(`${val}. Aprende en nuestro blog especializado sobre el mercado mayorista de palta Hass en Chile.`)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulo || !slug) return

    let parsedSchema = {}
    try {
      parsedSchema = JSON.parse(schemaJson)
    } catch {
      alert('Schema JSON contiene un formato inválido.')
      return
    }

    const payload = {
      titulo,
      slug,
      contenido,
      meta_title: metaTitle,
      meta_description: metaDescription,
      keyword_principal: keywordPrincipal,
      schema_json: parsedSchema,
      publicada,
      updated_at: new Date().toISOString()
    }

    if (isDemo) {
      if (editingPost) {
        setPosts(posts.map((p) => (p.id === editingPost.id ? { ...p, ...payload } : p)))
      } else {
        const newPost: BlogPost = {
          id: Math.random().toString(),
          ...payload,
          created_at: new Date().toISOString()
        } as any
        setPosts([newPost, ...posts])
      }
      setFormOpen(false)
      return
    }

    try {
      const supabase = createClient()
      if (editingPost) {
        const { error } = await supabase
          .from('posts')
          .update(payload)
          .eq('id', editingPost.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('posts')
          .insert([{ ...payload, created_at: new Date().toISOString() }])

        if (error) throw error
      }

      fetchPosts()
      setFormOpen(false)
    } catch (err: any) {
      alert(`Error al guardar post: ${err.message}`)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Seguro que deseas eliminar este artículo de blog?')) return

    if (isDemo) {
      setPosts(posts.filter((p) => p.id !== id))
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.from('posts').delete().eq('id', id)
      if (error) throw error
      fetchPosts()
    } catch (err: any) {
      alert(`Error al eliminar artículo: ${err.message}`)
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white font-display">Artículos de Blog</h1>
          <p className="text-xs text-zinc-500 mt-1">Crea y edita notas de blog corporativo para posicionamiento SEO orgánico.</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" /> Crear Nuevo Artículo
        </button>
      </div>

      {/* Grid List View */}
      {!formOpen ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider">
                  <th className="px-6 py-3">Artículo / Fecha</th>
                  <th className="px-6 py-3">Ruta (Slug)</th>
                  <th className="px-6 py-3">Keyword</th>
                  <th className="px-6 py-3">Publicado</th>
                  <th className="px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-350">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-zinc-900 dark:text-white">{post.titulo}</div>
                      <div className="text-[10px] text-zinc-450 mt-1">
                        Publicado: {new Date(post.created_at).toLocaleDateString('es-CL')}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      /blog/{post.slug}
                    </td>
                    <td className="px-6 py-4">{post.keyword_principal}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        post.publicada 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300' 
                          : 'bg-zinc-150 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-450'
                      }`}>
                        {post.publicada ? 'Público' : 'Borrador'}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-950"
                        title="Ver artículo"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(post)}
                        className="cursor-pointer p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-855 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-950"
                        title="Editar"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="cursor-pointer p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-850 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-600"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-450 font-medium">
                      No hay artículos creados todavía.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Create / Edit form */
        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 p-6 shadow-sm space-y-6">
          
          <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-850 pb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              {editingPost ? 'Editar Artículo' : 'Crear Nuevo Artículo'}
            </h3>
            <button 
              type="button"
              onClick={() => setFormOpen(false)}
              className="cursor-pointer text-xs font-semibold text-zinc-500 hover:text-zinc-900"
            >
              Cancelar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Título del Artículo *
                </label>
                <input
                  type="text"
                  required
                  value={titulo}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Ej. Beneficios de la palta Hass..."
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl py-2 px-3 text-zinc-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Ruta URL (Slug) *
                </label>
                <div className="flex items-center bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl overflow-hidden px-3">
                  <span className="text-xs text-zinc-450 font-mono">/blog/</span>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    placeholder="beneficios-de-la-palta-hass"
                    className="w-full bg-transparent border-0 py-2 px-1 text-zinc-900 dark:text-white text-xs font-mono focus:ring-0 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Palabra Clave (Keyword Principal) *
                </label>
                <input
                  type="text"
                  required
                  value={keywordPrincipal}
                  onChange={(e) => setKeywordPrincipal(e.target.value)}
                  placeholder="Ej. palta hass"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl py-2 px-3 text-zinc-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-350 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={publicada}
                    onChange={(e) => setPublicada(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-zinc-300 rounded"
                  />
                  <span>Publicar artículo inmediatamente en el blog</span>
                </label>
              </div>
            </div>

            <div className="space-y-4 bg-zinc-50 dark:bg-zinc-950/40 p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-850/50">
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block border-b border-zinc-150 pb-1.5">Meta Tags de SEO del Blog</span>
              
              <div>
                <label className="block text-[9px] font-bold text-zinc-500 uppercase mb-1">
                  Meta Title del Artículo *
                </label>
                <input
                  type="text"
                  required
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Escribe el título SEO..."
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl py-2 px-3 text-zinc-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-zinc-500 uppercase mb-1">
                  Meta Description del Artículo *
                </label>
                <textarea
                  required
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Resumen corto para resultados de Google..."
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl py-2 px-3 text-zinc-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                />
              </div>
            </div>

          </div>

          <div>
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
              Contenido del Artículo (HTML/Text) *
            </label>
            <textarea
              required
              rows={12}
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              placeholder="<h2>Subtítulo de la sección</h2><p>Escribe el desarrollo completo del artículo de blog...</p>"
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl py-3 px-3.5 text-zinc-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="space-y-2 border-t border-zinc-150 dark:border-zinc-850 pt-6">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              JSON-LD Custom Schema (BlogPosting Schema)
            </label>
            <textarea
              rows={3}
              value={schemaJson}
              onChange={(e) => setSchemaJson(e.target.value)}
              placeholder="{}"
              className="w-full bg-zinc-50 dark:bg-zinc-955 border border-zinc-300 dark:border-zinc-800 rounded-xl py-3 px-3.5 text-zinc-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-zinc-150 dark:border-zinc-850 pt-4">
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="cursor-pointer border border-zinc-200 dark:border-zinc-850 text-zinc-700 dark:text-zinc-300 px-4 py-2 rounded-xl text-xs font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs"
            >
              Guardar Artículo
            </button>
          </div>

        </form>
      )}

    </div>
  )
}

function getMockPosts() {
  return [
    {
      id: 'mock-1',
      titulo: 'Cómo conservar la Palta Hass en Restaurantes para evitar mermas',
      slug: 'como-conservar-palta-hass-restaurantes',
      meta_title: 'Cómo conservar la Palta Hass en Restaurantes | Evita Mermas',
      meta_description: 'Consejos profesionales para prolongar la vida útil de tus paltas en cocinas comerciales. Aprende trucos térmicos y de almacenamiento.',
      keyword_principal: 'conservar palta',
      contenido: '<h2>Consejos de Conservación</h2><p>Texto completo...</p>',
      schema_json: '{}',
      publicada: true,
      created_at: new Date('2026-05-15T12:00:00Z').toISOString()
    },
    {
      id: 'mock-2',
      titulo: 'Guía Completa de Calibres de Palta: ¿Cuál es el mejor para tu negocio?',
      slug: 'guia-calibres-de-palta-hass',
      meta_title: 'Guía Completa de Calibres de Palta Hass | VENTADEPALTAS.CL',
      meta_description: 'Diferencias entre calibres Super Extra, Extra, Primera y Segunda. Conoce cuál rinde más en sangucherías, sushis y casinos institucionales.',
      keyword_principal: 'calibres de palta',
      contenido: '<h2>Explicación de calibres</h2><p>Texto completo...</p>',
      schema_json: '{}',
      publicada: true,
      created_at: new Date('2026-05-10T12:00:00Z').toISOString()
    }
  ]
}
