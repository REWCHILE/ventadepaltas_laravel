'use client'

import React, { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { updateLeadStatus, addLeadNote, getLeadNotesAndHistory } from '@/app/actions/leads'
import { Search, SlidersHorizontal, Download, Eye, X, MessageSquare, Clipboard, Loader2, ArrowUpDown, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react'

export default function LeadsCRM() {
  const [leads, setLeads] = useState<any[]>([])
  const [filteredLeads, setFilteredLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isDemo, setIsDemo] = useState(false)

  // System Status
  const [dbStatus, setDbStatus] = useState<'connected' | 'demo'>('connected')
  const [emailStatus, setEmailStatus] = useState<'active' | 'demo'>('active')

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  // Details Modal
  const [selectedLead, setSelectedLead] = useState<any | null>(null)
  const [notes, setNotes] = useState<any[]>([])
  const [history, setHistory] = useState<any[]>([])
  const [loadingLogs, setLoadingLogs] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [addingNote, setAddingNote] = useState(false)

  const fetchLeads = async () => {
    setLoading(true)
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

      if (!resendKey || resendKey.includes('placeholder')) {
        setEmailStatus('demo')
      } else {
        setEmailStatus('active')
      }

      const supabase = createClient()
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setLeads(data || [])
    } catch (e) {
      console.error(e)
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

  // Apply filters and search
  useEffect(() => {
    let result = [...leads]

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase()
      result = result.filter(
        (l) =>
          l.nombre.toLowerCase().includes(query) ||
          l.empresa.toLowerCase().includes(query) ||
          l.email.toLowerCase().includes(query) ||
          l.comuna.toLowerCase().includes(query)
      )
    }

    if (statusFilter) {
      result = result.filter((l) => l.estado === statusFilter)
    }

    if (typeFilter) {
      result = result.filter((l) => l.tipo_cliente === typeFilter)
    }

    setFilteredLeads(result)
  }, [leads, searchTerm, statusFilter, typeFilter])

  // Fetch Notes & History for Selected Lead
  const handleOpenLead = async (lead: any) => {
    setSelectedLead(lead)
    setNewNote('')
    setNotes([])
    setHistory([])
    
    if (isDemo) {
      setNotes([
        { id: 'n-demo-1', nota: 'Llamada comercial realizada. Cliente solicita cotización formal.', created_at: new Date().toISOString() }
      ])
      setHistory([
        { id: 'h-demo-1', estado_anterior: 'Nuevo', estado_nuevo: 'Contactado', descripcion: 'Estado cambiado de "Nuevo" a "Contactado"', created_at: new Date().toISOString() }
      ])
      return
    }

    setLoadingLogs(true)
    const res = await getLeadNotesAndHistory(lead.id)
    if (res.success) {
      setNotes(res.notes || [])
      setHistory(res.history || [])
    }
    setLoadingLogs(false)
  }

  // Update Lead Status Handler
  const handleStatusChange = async (newStatus: string) => {
    if (!selectedLead) return
    setUpdatingStatus(true)

    const res = await updateLeadStatus(selectedLead.id, selectedLead.estado, newStatus)
    if (res.success) {
      const updated = { ...selectedLead, estado: newStatus }
      setSelectedLead(updated)
      setLeads(leads.map(l => l.id === selectedLead.id ? updated : l))

      if (!isDemo) {
        const logs = await getLeadNotesAndHistory(selectedLead.id)
        if (logs.success) {
          setNotes(logs.notes || [])
          setHistory(logs.history || [])
        }
      } else {
        setHistory([
          { 
            id: Math.random().toString(), 
            estado_anterior: selectedLead.estado, 
            estado_nuevo: newStatus, 
            descripcion: `Estado cambiado de "${selectedLead.estado}" a "${newStatus}"`, 
            created_at: new Date().toISOString() 
          },
          ...history
        ])
      }
    } else {
      alert(res.error || 'No se pudo actualizar el estado.')
    }
    setUpdatingStatus(false)
  }

  // Add Internal Note Handler
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedLead || !newNote.trim()) return
    setAddingNote(true)

    const res = await addLeadNote(selectedLead.id, newNote)
    if (res.success) {
      setNewNote('')
      if (isDemo) {
        setNotes([res.note, ...notes])
      } else {
        const logs = await getLeadNotesAndHistory(selectedLead.id)
        if (logs.success) {
          setNotes(logs.notes || [])
        }
      }
    } else {
      alert(res.error || 'No se pudo guardar la nota.')
    }
    setAddingNote(false)
  }

  const exportToCSV = () => {
    if (filteredLeads.length === 0) return

    const headers = ['Fecha', 'Nombre', 'Empresa', 'Email', 'Telefono', 'Comuna', 'Region', 'Cantidad (kg)', 'Tipo Cliente', 'Estado', 'Pagina Origen', 'UTM Source', 'UTM Medium', 'UTM Campaign']
    const csvContent = [
      headers.join(','),
      ...filteredLeads.map((l) =>
        [
          new Date(l.created_at).toLocaleDateString('es-CL'),
          `"${l.nombre.replace(/"/g, '""')}"`,
          `"${l.empresa.replace(/"/g, '""')}"`,
          l.email,
          l.telefono,
          `"${l.comuna.replace(/"/g, '""')}"`,
          l.region,
          l.cantidad_estimada_kg,
          l.tipo_cliente,
          l.estado,
          l.pagina_origen,
          l.utm_source || '',
          l.utm_medium || '',
          l.utm_campaign || ''
        ].join(',')
      )
    ].join('\n')

    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `leads_ventadepaltas_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const clientTypes: Record<string, string> = {
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

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white font-display">Formulario Web</h1>
          <p className="text-xs text-zinc-500 mt-1">CRM de leads y solicitudes de cotizaciones recibidas.</p>
        </div>
        
        <button
          onClick={exportToCSV}
          disabled={filteredLeads.length === 0}
          className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-xs font-bold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <Download className="w-4 h-4" /> Exportar CSV
        </button>
      </div>

      {/* Form System Status Widget (Small row) */}
      <div className="bg-white dark:bg-zinc-900 p-3.5 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <span className="text-xs font-bold text-zinc-900 dark:text-white font-sans">Sistema de Ingesta Online</span>
        </div>
        <div className="flex gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <span>Base Datos:</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${dbStatus === 'connected' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20' : 'bg-amber-50 text-amber-700'}`}>
              {dbStatus === 'connected' ? 'Producción' : 'Simulado'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-500">
            <span>Servicio Email:</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${emailStatus === 'active' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20' : 'bg-amber-50 text-amber-700'}`}>
              {emailStatus === 'active' ? 'Activo' : 'Simulado'}
            </span>
          </div>
        </div>
      </div>

      {/* Filter / Search Console */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-xs flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, empresa, email, comuna..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl py-2 pl-9 pr-4 text-zinc-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
          />
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 md:w-40 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl py-2 px-3 text-zinc-700 dark:text-zinc-350 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none cursor-pointer"
          >
            <option value="">Todos los Estados</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Contactado">Contactado</option>
            <option value="Cotización enviada">Cotización enviada</option>
            <option value="Negociación">Negociación</option>
            <option value="Cliente">Cliente</option>
            <option value="Perdido">Perdido</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="flex-1 md:w-40 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl py-2 px-3 text-zinc-700 dark:text-zinc-350 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none cursor-pointer"
          >
            <option value="">Todos los Sectores</option>
            {Object.entries(clientTypes).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider">
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3">Contacto / Empresa (Origen)</th>
                <th className="px-6 py-3">Ubicación</th>
                <th className="px-6 py-3 text-right">Volumen</th>
                <th className="px-6 py-3">Sector</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-zinc-900 dark:text-white">{lead.nombre}</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">{lead.empresa}</div>
                    {/* Visual Badge for origin page as requested by user */}
                    <span className="inline-block bg-zinc-100 dark:bg-zinc-800 text-[9px] font-mono font-semibold text-zinc-500 mt-1 px-1.5 py-0.5 rounded border border-zinc-200/20">
                      {lead.pagina_origen}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>{lead.comuna}</div>
                    <div className="text-[10px] text-zinc-400 mt-0.5">{lead.region}</div>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-emerald-600 dark:text-emerald-400">
                    {lead.cantidad_estimada_kg} kg/mes
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-zinc-100 dark:bg-zinc-850 px-2 py-0.5 rounded text-[10px] font-medium">
                      {clientTypes[lead.tipo_cliente] || lead.tipo_cliente}
                    </span>
                  </td>
                  <td className="px-6 py-4">
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
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleOpenLead(lead)}
                      className="cursor-pointer p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-350"
                      title="Ver Detalles"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-zinc-450 font-medium">
                    No se encontraron registros de leads correspondientes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Side Panel Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-zinc-950/45 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xl bg-white dark:bg-zinc-900 h-full flex flex-col shadow-2xl border-l border-zinc-250 dark:border-zinc-800 overflow-hidden">
            <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 shrink-0">
              <div>
                <h3 className="font-extrabold text-sm text-zinc-900 dark:text-white font-display">Detalle del Lead</h3>
                <span className="text-[10px] text-zinc-400 block -mt-0.5">ID: {selectedLead.id.slice(0,8)}...</span>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="cursor-pointer p-1 rounded-lg border border-zinc-200 dark:border-zinc-855 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 font-sans">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 space-y-3">
                <div className="grid grid-cols-2 gap-y-2.5 text-xs">
                  <div>
                    <span className="block text-[9px] text-zinc-400 uppercase font-semibold">Nombre</span>
                    <strong className="text-zinc-900 dark:text-white">{selectedLead.nombre}</strong>
                  </div>
                  <div>
                    <span className="block text-[9px] text-zinc-400 uppercase font-semibold">Empresa</span>
                    <strong className="text-zinc-900 dark:text-white">{selectedLead.empresa}</strong>
                  </div>
                  <div>
                    <span className="block text-[9px] text-zinc-400 uppercase font-semibold">Correo</span>
                    <a href={`mailto:${selectedLead.email}`} className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold">{selectedLead.email}</a>
                  </div>
                  <div>
                    <span className="block text-[9px] text-zinc-400 uppercase font-semibold">Teléfono</span>
                    <a href={`tel:${selectedLead.telefono}`} className="text-zinc-800 dark:text-zinc-300 font-semibold">{selectedLead.telefono}</a>
                  </div>
                  <div>
                    <span className="block text-[9px] text-zinc-400 uppercase font-semibold">Despacho</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-300">{selectedLead.comuna}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-zinc-400 uppercase font-semibold">Demanda Mensual</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{selectedLead.cantidad_estimada_kg} kg</span>
                  </div>
                </div>
                
                {selectedLead.mensaje && (
                  <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3">
                    <span className="block text-[9px] text-zinc-400 uppercase font-semibold mb-1">Mensaje del cliente</span>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed italic bg-white dark:bg-zinc-900 p-2.5 rounded-lg border border-zinc-150">
                      "{selectedLead.mensaje}"
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Actualizar Estado Comercial</span>
                <div className="flex gap-3 items-center">
                  <select
                    value={selectedLead.estado}
                    disabled={updatingStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl py-2 px-3 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none cursor-pointer"
                  >
                    <option value="Nuevo">Nuevo</option>
                    <option value="Contactado">Contactado</option>
                    <option value="Cotización enviada">Cotización enviada</option>
                    <option value="Negociación">Negociación</option>
                    <option value="Cliente">Cliente</option>
                    <option value="Perdido">Perdido</option>
                  </select>
                  {updatingStatus && <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />}
                </div>
              </div>

              <div className="space-y-2 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                <span className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Notas Internas de Seguimiento</span>
                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Agregar comentario de seguimiento..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl py-2 px-3.5 text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    disabled={addingNote || !newNote.trim()}
                    className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all disabled:opacity-50"
                  >
                    {addingNote ? 'Guardando...' : 'Agregar'}
                  </button>
                </form>
              </div>

              <div className="space-y-4">
                {loadingLogs ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                  </div>
                ) : (
                  <>
                    <div className="space-y-2.5">
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5" /> Historial de Comentarios
                      </span>
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                        {notes.map((note) => (
                          <div key={note.id} className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200/40 dark:border-zinc-850/40 text-xs">
                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{note.nota}</p>
                            <span className="block text-[9px] text-zinc-400 mt-1.5 font-medium">
                              {new Date(note.created_at).toLocaleString('es-CL', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        ))}
                        {notes.length === 0 && (
                          <div className="text-center py-4 text-zinc-450 text-xs italic">Sin comentarios de seguimiento.</div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Clipboard className="w-3.5 h-3.5" /> Bitácora de Cambios de Estado
                      </span>
                      <div className="space-y-2 max-h-36 overflow-y-auto text-[11px] pr-1">
                        {history.map((hist) => (
                          <div key={hist.id} className="flex justify-between items-start border-l-2 border-emerald-500 pl-3 py-1">
                            <div>
                              <strong className="text-zinc-900 dark:text-white block">{hist.descripcion}</strong>
                              <span className="text-[9px] text-zinc-400 mt-0.5 block">
                                {new Date(hist.created_at).toLocaleString('es-CL')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 space-y-2">
                <span className="block text-[9px] text-zinc-400 uppercase font-semibold">Trazabilidad de Campaña Marketing</span>
                <div className="grid grid-cols-3 gap-2 text-[10px] text-zinc-500 font-mono">
                  <div>
                    <strong>Origen:</strong> <span className="text-zinc-750 dark:text-zinc-300 block mt-0.5 truncate">{selectedLead.utm_source || 'direct'}</span>
                  </div>
                  <div>
                    <strong>Medio:</strong> <span className="text-zinc-750 dark:text-zinc-300 block mt-0.5 truncate">{selectedLead.utm_medium || 'none'}</span>
                  </div>
                  <div>
                    <strong>Campaña:</strong> <span className="text-zinc-750 dark:text-zinc-300 block mt-0.5 truncate">{selectedLead.utm_campaign || 'none'}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-zinc-150 dark:border-zinc-800 flex justify-between text-[10px] text-zinc-400">
                  <span>Página Origen Formulario:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-450">{selectedLead.pagina_origen}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
