'use client'

import React, { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Edit3, Trash2, CheckCircle2, AlertTriangle, Eye, Loader2, Sparkles } from 'lucide-react'

interface SeoPage {
  id: string
  titulo: string
  slug: string
  keyword_principal: string
  meta_title: string
  meta_description: string
  contenido: string
  faq_json: any
  schema_json: any
  publicada: boolean
  created_at: string
}

export default function SeoPagesCrud() {
  const [pages, setPages] = useState<SeoPage[]>([])
  const [loading, setLoading] = useState(true)
  const [isDemo, setIsDemo] = useState(false)

  // Form State
  const [formOpen, setFormOpen] = useState(false)
  const [editingPage, setEditingPage] = useState<SeoPage | null>(null)
  
  const [titulo, setTitulo] = useState('')
  const [slug, setSlug] = useState('')
  const [keywordPrincipal, setKeywordPrincipal] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [contenido, setContenido] = useState('')
  const [publicada, setPublicada] = useState(false)
  const [schemaJson, setSchemaJson] = useState('{}')

  // FAQ entries state
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([])

  const fetchPages = async () => {
    setLoading(true)
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
        setIsDemo(true)
        setPages(getMockPages())
        setLoading(false)
        return
      }

      const supabase = createClient()
      const { data, error } = await supabase
        .from('seo_pages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPages(data || [])
    } catch (e) {
      console.error(e)
      setPages(getMockPages())
      setIsDemo(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPages()
  }, [])

  const handleOpenCreate = () => {
    setEditingPage(null)
    setTitulo('')
    setSlug('')
    setKeywordPrincipal('')
    setMetaTitle('')
    setMetaDescription('')
    setContenido('')
    setPublicada(false)
    setSchemaJson('{}')
    setFaqs([])
    setFormOpen(true)
  }

  const handleOpenEdit = (page: SeoPage) => {
    setEditingPage(page)
    setTitulo(page.titulo)
    setSlug(page.slug)
    setKeywordPrincipal(page.keyword_principal)
    setMetaTitle(page.meta_title)
    setMetaDescription(page.meta_description)
    setContenido(page.contenido)
    setPublicada(page.publicada)
    
    // Parse JSON safely
    try {
      setSchemaJson(typeof page.schema_json === 'string' ? page.schema_json : JSON.stringify(page.schema_json, null, 2))
    } catch {
      setSchemaJson('{}')
    }

    try {
      const parsedFaqs = typeof page.faq_json === 'string' ? JSON.parse(page.faq_json) : page.faq_json
      setFaqs(Array.isArray(parsedFaqs) ? parsedFaqs : [])
    } catch {
      setFaqs([])
    }

    setFormOpen(true)
  }

  // Auto-generate slug and meta tags based on title
  const handleTitleChange = (val: string) => {
    setTitulo(val)
    if (!editingPage) {
      const autoSlug = val
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove accents
        .replace(/[^a-z0-9 -]/g, '') // remove special chars
        .replace(/\s+/g, '-') // collapse whitespace
        .replace(/-+/g, '-') // collapse dashes
      
      setSlug(autoSlug)
      setKeywordPrincipal(val.toLowerCase())
      setMetaTitle(`${val} | Venta de Paltas por Mayor Chile`)
      setMetaDescription(`Proveedor y distribuidor de palta Hass al por mayor en ${val}. Calibres seleccionados y despacho rápido. ¡Cotiza online!`)
    }
  }

  // FAQ item helpers
  const handleAddFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }])
  }

  const handleRemoveFaq = (idx: number) => {
    setFaqs(faqs.filter((_, i) => i !== idx))
  }

  const handleFaqChange = (idx: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faqs]
    updated[idx][field] = value
    setFaqs(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!titulo || !slug) return

    // Parse schema JSON
    let parsedSchema = {}
    try {
      parsedSchema = JSON.parse(schemaJson)
    } catch {
      alert('El campo Schema JSON-LD contiene un JSON inválido. Corrige antes de guardar.')
      return
    }

    const payload = {
      titulo,
      slug,
      keyword_principal: keywordPrincipal,
      meta_title: metaTitle,
      meta_description: metaDescription,
      contenido,
      faq_json: faqs,
      schema_json: parsedSchema,
      publicada,
      updated_at: new Date().toISOString()
    }

    if (isDemo) {
      if (editingPage) {
        setPages(pages.map((p) => (p.id === editingPage.id ? { ...p, ...payload } : p)))
      } else {
        const newPage: SeoPage = {
          id: Math.random().toString(),
          ...payload,
          created_at: new Date().toISOString()
        } as any
        setPages([newPage, ...pages])
      }
      setFormOpen(false)
      return
    }

    try {
      const supabase = createClient()
      if (editingPage) {
        const { error } = await supabase
          .from('seo_pages')
          .update(payload)
          .eq('id', editingPage.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('seo_pages')
          .insert([{ ...payload, created_at: new Date().toISOString() }])

        if (error) throw error
      }

      fetchPages()
      setFormOpen(false)
    } catch (err: any) {
      alert(`Error al guardar: ${err.message}`)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta página SEO? Esto puede afectar el indexamiento orgánico.')) return

    if (isDemo) {
      setPages(pages.filter((p) => p.id !== id))
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.from('seo_pages').delete().eq('id', id)
      if (error) throw error
      fetchPages()
    } catch (err: any) {
      alert(`Error al eliminar: ${err.message}`)
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white font-display">Páginas SEO</h1>
          <p className="text-xs text-zinc-500 mt-1">Crea y administra páginas de aterrizaje dinámicas optimizadas para Google.</p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" /> Crear Nueva Página
        </button>
      </div>

      {/* Pages List View */}
      {!formOpen ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider">
                  <th className="px-6 py-3">Página / Título</th>
                  <th className="px-6 py-3">Slug (Ruta)</th>
                  <th className="px-6 py-3">Keyword Foco</th>
                  <th className="px-6 py-3">Publicada</th>
                  <th className="px-6 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-350">
                {pages.map((page) => (
                  <tr key={page.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-zinc-900 dark:text-white">{page.titulo}</div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">{page.meta_title}</div>
                    </td>
                    <td className="px-6 py-4 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      /{page.slug}
                    </td>
                    <td className="px-6 py-4">{page.keyword_principal}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        page.publicada 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300' 
                          : 'bg-zinc-150 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-450'
                      }`}>
                        {page.publicada ? 'Pública' : 'Borrador'}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <a
                        href={`/${page.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900"
                        title="Ver en vivo"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(page)}
                        className="cursor-pointer p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-950"
                        title="Editar"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(page.id)}
                        className="cursor-pointer p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-850 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-600"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {pages.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-450 font-medium">
                      No hay páginas SEO creadas todavía.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Create / Edit Form View */
        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 p-6 shadow-sm space-y-6">
          
          <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-850 pb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              {editingPage ? 'Editar Página SEO' : 'Crear Nueva Página SEO'}
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
            
            {/* Left Col: Basics */}
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Título Comercial de la Página *
                </label>
                <input
                  type="text"
                  required
                  value={titulo}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Ej. Venta de Paltas en Las Condes"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl py-2 px-3 text-zinc-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Slug (Ruta URL) *
                </label>
                <div className="flex items-center bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl overflow-hidden px-3">
                  <span className="text-xs text-zinc-400 font-mono">/</span>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                    placeholder="venta-de-paltas-en-las-condes"
                    className="w-full bg-transparent border-0 py-2 px-1 text-zinc-900 dark:text-white text-xs font-mono focus:ring-0 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                  Keyword Foco Principal *
                </label>
                <input
                  type="text"
                  required
                  value={keywordPrincipal}
                  onChange={(e) => setKeywordPrincipal(e.target.value)}
                  placeholder="Ej. venta de paltas en las condes"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl py-2 px-3 text-zinc-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={publicada}
                    onChange={(e) => setPublicada(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-zinc-300 rounded"
                  />
                  <span>Publicar esta página inmediatamente</span>
                </label>
              </div>
            </div>

            {/* Right Col: Meta tags */}
            <div className="space-y-4 bg-zinc-50 dark:bg-zinc-950/40 p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-850/50">
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block border-b border-zinc-150 pb-1.5">Meta Tags de Posicionamiento (SEO)</span>
              
              <div>
                <label className="block text-[9px] font-bold text-zinc-500 uppercase mb-1">
                  Meta Title *
                </label>
                <input
                  type="text"
                  required
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Venta de Paltas en Las Condes por Mayor | Proveedor Directo"
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl py-2 px-3 text-zinc-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-zinc-500 uppercase mb-1">
                  Meta Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Escribe la meta description corta para los resultados de Google..."
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl py-2 px-3 text-zinc-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                />
              </div>
            </div>

          </div>

          {/* Large Body Content */}
          <div>
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
              Contenido de la Página (HTML/Text) *
            </label>
            <textarea
              required
              rows={8}
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              placeholder="<h2>Escribe el título principal</h2><p>Escribe el contenido de texto que leerán los usuarios y Google...</p>"
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl py-3 px-3.5 text-zinc-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          {/* FAQs Manager */}
          <div className="space-y-4 border-t border-zinc-150 dark:border-zinc-850 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Preguntas Frecuentes FAQ Schema (Rich Snippets)
              </span>
              <button
                type="button"
                onClick={handleAddFaq}
                className="cursor-pointer inline-flex items-center text-xs font-semibold text-emerald-600 hover:text-emerald-700"
              >
                + Agregar Pregunta
              </button>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="flex gap-4 items-start p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200/50">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      placeholder="Pregunta frecuente..."
                      value={faq.question}
                      onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg py-1.5 px-3 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Respuesta..."
                      value={faq.answer}
                      onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg py-1.5 px-3 text-xs"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFaq(idx)}
                    className="cursor-pointer p-1.5 bg-rose-50 text-rose-600 rounded-lg border border-rose-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {faqs.length === 0 && (
                <div className="text-center py-4 border border-dashed border-zinc-250 dark:border-zinc-800 rounded-xl text-xs text-zinc-450 italic">
                  No hay preguntas agregadas. Agrega algunas para activar el FAQ Rich Snippet en Google.
                </div>
              )}
            </div>
          </div>

          {/* Schema JSON-LD */}
          <div className="space-y-2 border-t border-zinc-150 dark:border-zinc-850 pt-6">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              JSON-LD Personalizado Adicional (Opcional)
            </label>
            <textarea
              rows={4}
              value={schemaJson}
              onChange={(e) => setSchemaJson(e.target.value)}
              placeholder="{}"
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl py-3 px-3.5 text-zinc-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <span className="text-[10px] text-zinc-450 block">Debe ser un objeto JSON válido.</span>
          </div>

          {/* Submit Actions */}
          <div className="flex justify-end gap-3 border-t border-zinc-150 dark:border-zinc-850 pt-4">
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="cursor-pointer border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold px-4 py-2 rounded-xl text-xs"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs"
            >
              Guardar Página SEO
            </button>
          </div>

        </form>
      )}

    </div>
  )
}

function getMockPages() {
  const baseDate = new Date()
  return [
    {
      id: 'p-1',
      titulo: 'Palta Edranol por Mayor',
      slug: 'palta-edranol-por-mayor',
      keyword_principal: 'palta edranol',
      meta_title: 'Palta Edranol por Mayor | Distribución Directa Chile',
      meta_description: 'Proveedor mayorista de Palta Edranol en Chile. Fruto de piel verde y lisa con excelente calibre, ideal como polinizador y de gran sabor.',
      contenido: '<h2>Características de la Palta Edranol</h2><p>La palta Edranol es una de las variedades de piel verde más cultivadas en Chile...</p>',
      faq_json: '[]',
      schema_json: '{}',
      publicada: true,
      created_at: new Date(baseDate.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'p-2',
      titulo: 'Palta Fuerte por Mayor',
      slug: 'palta-fuerte-por-mayor',
      keyword_principal: 'palta fuerte',
      meta_title: 'Palta Fuerte por Mayor | Distribución Directa Chile',
      meta_description: 'Proveedor mayorista de Palta Fuerte. Fruto de piel verde y cremocidad única. Ideal para casinos, restaurantes y reventa.',
      contenido: '<h2>¿Qué es la variedad de Palta Fuerte?</h2><p>La variedad Fuerte es una palta híbrida de origen mexicano-guatemalteco...</p>',
      faq_json: '[]',
      schema_json: '{}',
      publicada: true,
      created_at: new Date(baseDate.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'p-3',
      titulo: 'Palta Chilena Premium por Mayor',
      slug: 'palta-chilena-premium',
      keyword_principal: 'palta chilena',
      meta_title: 'Palta Chilena Premium al por Mayor | Abastecimiento B2B',
      meta_description: 'Distribución de palta chilena seleccionada de los valles de Quillota, Cabildo y Cruz. Máxima cremosidad y calibre para restaurantes.',
      contenido: '<h2>El Estándar de la Palta Chilena</h2><p>La palta chilena es reconocida a nivel mundial...</p>',
      faq_json: '[]',
      schema_json: '{}',
      publicada: true,
      created_at: new Date(baseDate.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'p-4',
      titulo: 'Palta Hass Peruana por Mayor',
      slug: 'palta-hass-peruana',
      keyword_principal: 'palta hass peruana',
      meta_title: 'Palta Hass Peruana al por Mayor | Importación Directa',
      meta_description: 'Importadores directos de palta Hass peruana. Abastecimiento garantizado durante la temporada de otoño-invierno con calibres uniformes.',
      contenido: '<h2>Abastecimiento de Palta Hass Peruana</h2><p>Durante los meses de otoño e invierno en Chile...</p>',
      faq_json: '[]',
      schema_json: '{}',
      publicada: true,
      created_at: new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'p-5',
      titulo: 'Compra de Paltas al por Mayor',
      slug: 'compra-de-paltas-al-por-mayor',
      keyword_principal: 'compra de paltas al por mayor',
      meta_title: 'Compra de Paltas al por Mayor | Proveedor Directo Chile',
      meta_description: '¿Buscas comprar paltas al por mayor? Abastecemos a minimarkets, distribuidores y centrales de compra con las mejores tarifas de packing.',
      contenido: '<h2>Optimiza tu Compra Mayorista de Paltas</h2><p>Comprar paltas por volumen requiere de un proveedor confiable...</p>',
      faq_json: '[]',
      schema_json: '{}',
      publicada: true,
      created_at: new Date(baseDate.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'p-6',
      titulo: 'Proveedor de Frutas y Verduras para Empresas',
      slug: 'proveedor-de-frutas-para-empresas',
      keyword_principal: 'proveedor de frutas para empresas',
      meta_title: 'Proveedor de Frutas para Empresas | Servicios de Oficina',
      meta_description: 'Abastecimiento de frutas saludables para oficinas y comedores corporativos en Santiago. Cajas listas de palta Hass y frutas de estación.',
      contenido: '<h2>Fruta Saludable en tu Espacio de Trabajo</h2><p>Fomentar la alimentación saludable en la oficina...</p>',
      faq_json: '[]',
      schema_json: '{}',
      publicada: true,
      created_at: new Date(baseDate.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'p-7',
      titulo: 'Frutas y Verduras para Casinos y Concesiones',
      slug: 'frutas-y-verduras-para-casinos',
      keyword_principal: 'frutas y verduras para casinos',
      meta_title: 'Frutas y Verduras para Casinos | Distribuidor Mayorista',
      meta_description: 'Distribuidor mayorista de frutas y verduras para casinos institucionales y colegios. Trazabilidad, certificaciones sanitarias y volumen continuo.',
      contenido: '<h2>Abastecimiento Mayorista para Alimentación Colectiva</h2><p>Entregamos suministros a gran escala para casinos...</p>',
      faq_json: '[]',
      schema_json: '{}',
      publicada: true,
      created_at: new Date(baseDate.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'p-8',
      titulo: 'Venta de Paltas en Las Condes',
      slug: 'venta-de-paltas-en-las-condes',
      keyword_principal: 'venta de paltas en las condes',
      meta_title: 'Venta de Paltas en Las Condes por Mayor | Proveedor Directo',
      meta_description: 'Comprar paltas por mayor en Las Condes. Distribución de palta Hass premium para restaurantes, cafeterías y sushi de Las Condes. Despacho rápido.',
      contenido: '<h2>Proveedor de Palta Hass en Las Condes</h2><p>Contáctanos para despacho rápido...</p>',
      faq_json: '[]',
      schema_json: '{}',
      publicada: true,
      created_at: new Date(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'p-9',
      titulo: 'Venta de Paltas en Vitacura',
      slug: 'venta-de-paltas-en-vitacura',
      keyword_principal: 'venta de paltas en vitacura',
      meta_title: 'Venta de Paltas en Vitacura por Mayor | Proveedor Hass',
      meta_description: 'Abastecimiento de palta Hass seleccionada en Vitacura. Despacho express para restaurantes, locales y banqueterías de Vitacura.',
      contenido: '<h2>Proveedor en Vitacura</h2><p>Calidad de exportación...</p>',
      faq_json: '[]',
      schema_json: '{}',
      publicada: true,
      created_at: new Date(baseDate.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'p-10',
      titulo: 'Venta de Paltas en Providencia',
      slug: 'venta-de-providencia',
      keyword_principal: 'venta de paltas en providencia',
      meta_title: 'Venta de Paltas en Providencia por Mayor | Proveedor Premium',
      meta_description: 'Distribución de palta Hass para restaurantes y cafeterías de Providencia. Despacho diario temprano por la mañana. Calibres seleccionados.',
      contenido: '<h2>Proveedor en Providencia</h2><p>Paltas listas para moler y servir en Providencia...</p>',
      faq_json: '[]',
      schema_json: '{}',
      publicada: true,
      created_at: new Date(baseDate.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]
}
