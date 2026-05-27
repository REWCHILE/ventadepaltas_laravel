'use client'

import React, { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { FileText, Users, ShoppingBag, Calendar, CheckCircle2, ChevronRight, RefreshCw, BarChart2, CheckCircle, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDemo, setIsDemo] = useState(false)

  // Form System Status
  const [dbStatus, setDbStatus] = useState<'connected' | 'demo' | 'error'>('connected')
  const [emailStatus, setEmailStatus] = useState<'active' | 'demo'>('active')

  const fetchLeads = async () => {
    setLoading(true)
    setError(null)
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      const resendKey = process.env.RESEND_API_KEY

      // Determine Supabase connection status
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
        setIsDemo(true)
        setDbStatus('demo')
        setEmailStatus('demo')
        setLeads(getMockLeads())
        setLoading(false)
        return
      }

      setDbStatus('connected')

      // Determine email status
      if (!resendKey || resendKey.includes('placeholder')) {
        setEmailStatus('demo')
      } else {
        setEmailStatus('active')
      }

      const supabase = createClient()
      const { data, error: dbError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (dbError) {
        throw new Error(dbError.message)
      }

      setLeads(data || [])
    } catch (err: any) {
      console.error('Error fetching dashboard leads:', err)
      setError('No se pudo establecer conexión con Supabase. Cargando modo simulación.')
      setDbStatus('demo')
      setEmailStatus('demo')
      setLeads(getMockLeads())
      setIsDemo(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  // KPI Calculations
  const getKpis = () => {
    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
    
    // Start of this week (Monday)
    const currentDay = now.getDay()
    const distanceToMonday = currentDay === 0 ? 6 : currentDay - 1
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - distanceToMonday).getTime()
    
    // Start of this month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime()

    let todayCount = 0
    let weekCount = 0
    let monthCount = 0
    let totalKg = 0

    leads.forEach((lead) => {
      const leadTime = new Date(lead.created_at).getTime()
      if (leadTime >= startOfToday) todayCount++
      if (leadTime >= startOfWeek) weekCount++
      if (leadTime >= startOfMonth) monthCount++
      totalKg += Number(lead.cantidad_estimada_kg || 0)
    })

    return {
      today: todayCount,
      week: weekCount,
      month: monthCount,
      total: leads.length,
      totalKg
    }
  }

  const kpis = getKpis()

  // Chart data calculations
  const getComunaStats = () => {
    const comunaCounts: Record<string, number> = {}
    leads.forEach((lead) => {
      const comuna = lead.comuna ? lead.comuna.split('/')[0].trim() : 'Desconocida'
      comunaCounts[comuna] = (comunaCounts[comuna] || 0) + 1
    })

    return Object.entries(comunaCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5) // top 5
  }

  const getClientTypeStats = () => {
    const typeCounts: Record<string, number> = {}
    leads.forEach((lead) => {
      const type = lead.tipo_cliente || 'otro'
      typeCounts[type] = (typeCounts[type] || 0) + 1
    })

    const typeLabels: Record<string, string> = {
      restaurante: 'Restaurante',
      casino: 'Casino',
      hotel: 'Hotel',
      catering: 'Catering',
      distribuidor: 'Distribuidor',
      minimarket: 'Minimarket',
      supermercado: 'Supermercado',
      empresa: 'Empresa',
      otro: 'Otro'
    }

    return Object.entries(typeCounts).map(([type, value]) => ({
      name: typeLabels[type] || type,
      value
    }))
  }

  const getPageStats = () => {
    const pageCounts: Record<string, number> = {}
    leads.forEach((lead) => {
      const page = lead.pagina_origen || '/'
      pageCounts[page] = (pageCounts[page] || 0) + 1
    })
    return Object.entries(pageCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  }

  const topComunas = getComunaStats()
  const clientTypes = getClientTypeStats()
  const pageOrigins = getPageStats()
  const latestLeads = leads.slice(0, 5)

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center flex-col gap-3">
        <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
        <span className="text-sm font-semibold text-zinc-500 font-sans">Cargando estadísticas del dashboard...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white font-display">Resumen Comercial</h1>
          <p className="text-xs text-zinc-500 mt-1">
            Estadísticas y estado de captación de leads en tiempo real.
          </p>
        </div>
        <button
          onClick={fetchLeads}
          className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-850 active:scale-95 transition-all shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Actualizar Datos
        </button>
      </div>

      {/* Connection & Ingest Status Widget */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-xs">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-3">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Estado de Canales de Ingesta</span>
          <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-450 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            Recepción Activa
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Supabase connection status */}
          <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/60 p-3 rounded-xl border border-zinc-200/40 dark:border-zinc-850/40">
            <div className="space-y-0.5">
              <span className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider">Base de Datos (Supabase)</span>
              <span className="text-xs font-bold text-zinc-900 dark:text-white">
                {dbStatus === 'connected' ? 'Conectado a Producción' : 'Simulación Activa'}
              </span>
            </div>
            {dbStatus === 'connected' ? (
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            )}
          </div>

          {/* Email configuration status */}
          <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/60 p-3 rounded-xl border border-zinc-200/40 dark:border-zinc-850/40">
            <div className="space-y-0.5">
              <span className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider">Notificaciones Email (Resend)</span>
              <span className="text-xs font-bold text-zinc-900 dark:text-white">
                {emailStatus === 'active' ? 'Servicio Activo' : 'Simulación Local'}
              </span>
            </div>
            {emailStatus === 'active' ? (
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            )}
          </div>

          {/* Forms status */}
          <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/60 p-3 rounded-xl border border-zinc-200/40 dark:border-zinc-850/40">
            <div className="space-y-0.5">
              <span className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider">Capturador de Formularios</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-450">Ingesta en Línea (OK)</span>
            </div>
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-zinc-900 dark:text-white font-display">{kpis.today}</div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider mt-0.5">Leads Hoy</div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-zinc-900 dark:text-white font-display">{kpis.week}</div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider mt-0.5">Esta Semana</div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-zinc-900 dark:text-white font-display">{kpis.month}</div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider mt-0.5">Este Mes</div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-black text-zinc-900 dark:text-white font-display">{kpis.total}</div>
            <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider mt-0.5">Total Histórico</div>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-xs lg:col-span-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-6 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-emerald-500" />
            Principales Comunas de Demanda
          </h3>
          <div className="space-y-4">
            {topComunas.map((comuna, idx) => {
              const maxVal = topComunas[0]?.value || 1
              const percentage = (comuna.value / maxVal) * 100
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-zinc-700 dark:text-zinc-300">{comuna.name}</span>
                    <span className="text-zinc-900 dark:text-white">{comuna.value} {comuna.value === 1 ? 'lead' : 'leads'}</span>
                  </div>
                  <div className="h-2.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-500" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
            {topComunas.length === 0 && (
              <div className="text-center py-6 text-zinc-400 text-xs italic">No hay suficientes datos.</div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-6">
            Segmentos de Clientes
          </h3>
          <div className="space-y-3">
            {clientTypes.map((type, idx) => {
              const total = kpis.total || 1
              const percentage = Math.round((type.value / total) * 100)
              return (
                <div key={idx} className="flex items-center justify-between text-xs border-b border-zinc-50 dark:border-zinc-850 pb-2.5 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{type.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-500">{type.value} cotiz.</span>
                    <span className="font-bold text-zinc-900 dark:text-white w-8 text-right">{percentage}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Pages and Latest Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-xs lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Últimas Solicitudes Recibidas (Marcador Origen Formulario)
            </h3>
            <Link 
              href="/admin/leads" 
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 hover:underline flex items-center"
            >
              Ver todos <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {latestLeads.map((lead) => (
              <div key={lead.id} className="py-3 flex items-center justify-between text-xs first:pt-0 last:pb-0">
                <div className="min-w-0 pr-4 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-900 dark:text-white truncate">{lead.nombre}</span>
                    <span className="text-zinc-400">•</span>
                    <span className="text-zinc-500 truncate">{lead.empresa}</span>
                  </div>
                  <div className="text-zinc-500 flex flex-wrap items-center gap-x-2 gap-y-1 truncate">
                    <span>{lead.comuna}</span>
                    <span className="text-zinc-350">•</span>
                    <span className="font-semibold text-emerald-650 dark:text-emerald-450">{lead.cantidad_estimada_kg} kg/mes</span>
                    <span className="text-zinc-350">•</span>
                    {/* Origin page tag requested by the user */}
                    <span className="bg-zinc-100 dark:bg-zinc-850 px-2 py-0.5 rounded text-[9px] font-mono text-zinc-600 dark:text-zinc-400 font-semibold border border-zinc-200/30">
                      Origen: {lead.pagina_origen}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    lead.estado === 'Nuevo' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300' :
                    lead.estado === 'Contactado' ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300' :
                    lead.estado === 'Cotización enviada' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300' :
                    lead.estado === 'Negociación' ? 'bg-orange-100 text-orange-800 dark:bg-orange-950/40 dark:text-orange-300' :
                    lead.estado === 'Cliente' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300' :
                    'bg-zinc-150 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-350'
                  }`}>
                    {lead.estado}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    {new Date(lead.created_at).toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-xs lg:col-span-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">
            Conversión por Página
          </h3>
          <div className="space-y-3 max-h-[220px] overflow-y-auto">
            {pageOrigins.map((page, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs">
                <span className="text-zinc-650 dark:text-zinc-400 font-mono truncate max-w-[180px]" title={page.name}>
                  {page.name}
                </span>
                <span className="font-bold text-zinc-900 dark:text-white px-2 py-0.5 bg-zinc-50 dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-750 rounded-lg">
                  {page.value} {page.value === 1 ? 'lead' : 'leads'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

function getMockLeads() {
  const baseDate = new Date()
  return [
    {
      id: 'l-1',
      nombre: 'Sofía Larraín',
      empresa: 'Restaurante Cabildo',
      email: 's.larrain@cabildogroup.cl',
      telefono: '+56987654321',
      comuna: 'Vitacura',
      region: 'Metropolitana',
      cantidad_estimada_kg: 250,
      tipo_cliente: 'restaurante',
      mensaje: 'Requerimos despacho los lunes y jueves de palta calibre Extra en cajas de 10kg.',
      pagina_origen: '/paltas-para-restaurantes',
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'santiago-restaurantes',
      estado: 'Nuevo',
      created_at: new Date(baseDate.getTime() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'l-2',
      nombre: 'Carlos Galdames',
      empresa: 'Casinos Aliserv',
      email: 'carlos.galdames@aliserv.cl',
      telefono: '+56944332211',
      comuna: 'Santiago Centro',
      region: 'Metropolitana',
      cantidad_estimada_kg: 1200,
      tipo_cliente: 'casino',
      mensaje: 'Cotización para casino institucional. Despacho semanal en bins de plástico.',
      pagina_origen: '/frutas-y-verduras-para-casinos',
      utm_source: 'newsletter',
      utm_medium: 'email',
      utm_campaign: 'mayo-abastecimiento',
      estado: 'Contactado',
      created_at: new Date(baseDate.getTime() - 20 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'l-3',
      nombre: 'Marcela Pinochet',
      empresa: 'Sushi Hanzo',
      email: 'contacto@sushihanzo.cl',
      telefono: '+56955667788',
      comuna: 'Providencia',
      region: 'Metropolitana',
      cantidad_estimada_kg: 180,
      tipo_cliente: 'restaurante',
      mensaje: 'Necesitamos palta Hass madurez de mesa de calibre Primera. Consumo constante.',
      pagina_origen: '/venta-de-paltas-en-providencia',
      utm_source: 'google',
      utm_medium: 'organic',
      utm_campaign: 'seo-local',
      estado: 'Cotización enviada',
      created_at: new Date(baseDate.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'l-4',
      nombre: 'Ricardo Rojas',
      empresa: 'Verdulería Don Ricardo',
      email: 'ricardo.rojas@gmail.com',
      telefono: '+56999887766',
      comuna: 'Maipú',
      region: 'Metropolitana',
      cantidad_estimada_kg: 500,
      tipo_cliente: 'distribuidor',
      mensaje: 'Hola, me gustaría saber precios por pallet para reventa en minimarket.',
      pagina_origen: '/venta-de-paltas-por-mayor',
      utm_source: 'facebook',
      utm_medium: 'ads',
      utm_campaign: 'wholesale-promo',
      estado: 'Negociación',
      created_at: new Date(baseDate.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'l-5',
      nombre: 'Patricia Vergara',
      empresa: 'Hotel Plaza San Francisco',
      email: 'pvergara@plazasf.cl',
      telefono: '+56911223344',
      comuna: 'Santiago Centro',
      region: 'Metropolitana',
      cantidad_estimada_kg: 350,
      tipo_cliente: 'hotel',
      mensaje: 'Consumo mensual aproximado para restaurante y desayunos de hotel.',
      pagina_origen: '/proveedor-de-paltas-santiago',
      utm_source: 'direct',
      utm_medium: 'none',
      utm_campaign: 'none',
      estado: 'Cliente',
      created_at: new Date(baseDate.getTime() - 14 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'l-6',
      nombre: 'Andrés Bello',
      empresa: 'Minimarket Mercadito',
      email: 'andres@mercadito.cl',
      telefono: '+56999882233',
      comuna: 'Las Condes',
      region: 'Metropolitana',
      cantidad_estimada_kg: 150,
      tipo_cliente: 'minimarket',
      mensaje: 'Cotización de paltas.',
      pagina_origen: '/palta-edranol-por-mayor',
      utm_source: 'google',
      utm_medium: 'organic',
      utm_campaign: 'seo-local',
      estado: 'Perdido',
      created_at: new Date(baseDate.getTime() - 25 * 24 * 60 * 65 * 1000).toISOString()
    }
  ]
}
