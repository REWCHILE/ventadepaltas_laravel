'use client'

import React, { useState, useEffect, useRef } from 'react'
import { submitLead } from '@/app/actions/leads'
import { CheckCircle2, AlertCircle, Loader2, Utensils, Users, Hotel, Store, Briefcase, MapPin, Scale, ChevronDown, Check } from 'lucide-react'

interface LeadFormProps {
  paginaOrigen: string
  title?: string
  subtitle?: string
}

const comunasSantiago = [
  'Cerrillos', 'Cerro Navia', 'Conchalí', 'El Bosque', 'Estación Central',
  'Huechuraba', 'Independencia', 'La Cisterna', 'La Florida', 'La Granja', 'La Pintana',
  'La Reina', 'Las Condes', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú',
  'Ñuñoa', 'Pedro Aguirre Cerda', 'Peñalolén', 'Providencia', 'Pudahuel', 'Quilicura',
  'Quinta Normal', 'Recoleta', 'Renca', 'San Joaquín', 'San Miguel', 'San Ramón',
  'Vitacura', 'Puente Alto', 'Pirque', 'San José de Maipo', 'San Bernardo', 'Calera de Tango',
  'Buin', 'Paine', 'Melipilla', 'Alhué', 'Curacaví', 'María Pinto', 'San Pedro',
  'Talagante', 'El Monte', 'Isla de Maipo', 'Padre Hurtado', 'Peñaflor', 'Colina',
  'Lampa', 'Tiltil'
].sort();

export default function LeadForm({ 
  paginaOrigen, 
  title = 'Cotizador B2B Inteligente',
  subtitle = 'Cotiza tu abastecimiento al por mayor. Flota exclusiva para la Región Metropolitana.'
}: LeadFormProps) {
  // Fields state
  const [nombre, setNombre] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  
  // Comuna search state
  const [comuna, setComuna] = useState('')
  const [comunaSearch, setComunaSearch] = useState('')
  const [isComunaDropdownOpen, setIsComunaDropdownOpen] = useState(false)
  
  // Fixed region for RM exclusivity
  const region = 'Metropolitana'
  
  // Quantity states
  const [cantidad, setCantidad] = useState('')
  const [volumePreset, setVolumePreset] = useState<'pyme' | 'cadena' | 'gran_volumen' | 'personalizado' | null>(null)
  
  // Client type states
  const [tipoCliente, setTipoCliente] = useState('')
  const [mensaje, setMensaje] = useState('')

  // UTM tracking state
  const [utmSource, setUtmSource] = useState<string | null>(null)
  const [utmMedium, setUtmMedium] = useState<string | null>(null)
  const [utmCampaign, setUtmCampaign] = useState<string | null>(null)

  // Status states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  const comunaRef = useRef<HTMLDivElement>(null)

  // Filter comunas based on search
  const filteredComunas = comunaSearch.trim() === ''
    ? comunasSantiago
    : comunasSantiago.filter(c => c.toLowerCase().includes(comunaSearch.toLowerCase()))

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setUtmSource(params.get('utm_source'))
      setUtmMedium(params.get('utm_medium'))
      setUtmCampaign(params.get('utm_campaign'))
    }
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (comunaRef.current && !comunaRef.current.contains(event.target as Node)) {
        setIsComunaDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectPreset = (preset: 'pyme' | 'cadena' | 'gran_volumen', qty: string) => {
    setVolumePreset(preset)
    setCantidad(qty)
  }

  const handleCustomQtyChange = (val: string) => {
    setVolumePreset('personalizado')
    setCantidad(val)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    // Basic validation
    if (!nombre || !empresa || !email || !telefono || !comuna || !cantidad || !tipoCliente) {
      setError('Por favor completa todos los campos requeridos del formulario.')
      setLoading(false)
      return
    }

    const payload = {
      nombre,
      empresa,
      email,
      telefono,
      comuna,
      region,
      cantidad_estimada_kg: Number(cantidad),
      tipo_cliente: tipoCliente,
      mensaje,
      pagina_origen: paginaOrigen,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign
    }

    const result = await submitLead(payload)

    if (result.success) {
      setSuccess(result.message || '¡Tu solicitud fue enviada con éxito!')
      // Clear form
      setNombre('')
      setEmpresa('')
      setEmail('')
      setTelefono('')
      setComuna('')
      setComunaSearch('')
      setCantidad('')
      setVolumePreset(null)
      setTipoCliente('')
      setMensaje('')
    } else {
      setError(result.error || 'Ocurrió un error al enviar tu solicitud. Inténtalo de nuevo.')
    }
    setLoading(false)
  }

  const clientTypes = [
    { id: 'restaurante', label: 'Restaurante', icon: <Utensils className="w-4 h-4" /> },
    { id: 'casino', label: 'Casino / Catering', icon: <Users className="w-4 h-4" /> },
    { id: 'hotel', label: 'Hotel', icon: <Hotel className="w-4 h-4" /> },
    { id: 'minimarket', label: 'Minimarket / Super', icon: <Store className="w-4 h-4" /> },
    { id: 'distribuidor', label: 'Distribución / Otro', icon: <Briefcase className="w-4 h-4" /> }
  ]

  return (
    <div className="w-full text-left">
      <div className="mb-6 text-center sm:text-left">
        <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-zinc-400 mt-2 font-sans">
          {subtitle}
        </p>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-start gap-3.5 text-emerald-300 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-emerald-400" />
          <div>
            <h4 className="font-bold text-sm">¡Solicitud Procesada!</h4>
            <p className="text-xs mt-1 leading-relaxed text-zinc-300">{success}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-rose-950/40 border border-rose-500/30 rounded-2xl flex items-start gap-3.5 text-rose-300 animate-fadeIn">
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0 text-rose-400" />
          <div>
            <h4 className="font-bold text-sm">No se pudo procesar</h4>
            <p className="text-xs mt-1 leading-relaxed text-zinc-300">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Paso 1: Tipo de Cliente */}
        <div>
          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2.5">
            1. Tipo de Negocio / Rubro *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {clientTypes.map((t) => {
              const isSelected = tipoCliente === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTipoCliente(t.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-600/10 scale-[1.02]'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                >
                  <span className={`mb-1 transition-transform duration-300 ${isSelected ? 'scale-110' : ''}`}>
                    {t.icon}
                  </span>
                  <span className="text-[9px] font-bold tracking-tight">{t.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Paso 2: Volumen Requerido */}
        <div>
          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2.5">
            2. Consumo Mensual Estimado (kg) *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* Presets */}
            <button
              type="button"
              onClick={() => handleSelectPreset('pyme', '200')}
              className={`text-left p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                volumePreset === 'pyme'
                  ? 'bg-emerald-950/30 border-emerald-500/70 text-emerald-300 shadow-md'
                  : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 text-zinc-400'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">100 - 300 kg</span>
                {volumePreset === 'pyme' && <Check className="w-3 h-3 text-emerald-400" />}
              </div>
              <p className="text-[9px] text-zinc-500 mt-1 font-semibold leading-relaxed">
                Ideado para restaurantes locales y sushi bars. Despacho semanal directo.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleSelectPreset('cadena', '600')}
              className={`text-left p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                volumePreset === 'cadena'
                  ? 'bg-emerald-950/30 border-emerald-500/70 text-emerald-300 shadow-md'
                  : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 text-zinc-400'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">300 - 1000 kg</span>
                {volumePreset === 'cadena' && <Check className="w-3 h-3 text-emerald-400" />}
              </div>
              <p className="text-[9px] text-zinc-500 mt-1 font-semibold leading-relaxed">
                Para cadenas gastronómicas y casinos medianos. Despacho programado.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleSelectPreset('gran_volumen', '1500')}
              className={`text-left p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                volumePreset === 'gran_volumen'
                  ? 'bg-emerald-950/30 border-emerald-500/70 text-emerald-300 shadow-md'
                  : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 text-zinc-400'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">+1000 kg</span>
                {volumePreset === 'gran_volumen' && <Check className="w-3 h-3 text-emerald-400" />}
              </div>
              <p className="text-[9px] text-zinc-500 mt-1 font-semibold leading-relaxed">
                Grandes distribuidores y casinos corporativos. Contrato anual de precio cerrado.
              </p>
            </button>
          </div>

          <div className="mt-2.5 flex items-center gap-2.5 bg-zinc-900/30 p-2.5 rounded-xl border border-zinc-800/60">
            <span className="text-xs text-zinc-400 shrink-0">¿Volumen exacto (kg)?</span>
            <div className="relative w-full flex items-center">
              <input
                type="number"
                required
                min="1"
                placeholder="Ej. 450"
                value={cantidad}
                onChange={(e) => handleCustomQtyChange(e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-800 text-white text-xs font-semibold rounded-lg py-1.5 px-3 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all pr-8"
              />
              <span className="absolute right-3 text-[9px] text-zinc-500 font-bold">KG/MES</span>
            </div>
          </div>
        </div>

        {/* Paso 3: Ubicación (RM Only dropdown) */}
        <div ref={comunaRef} className="relative">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              3. Comuna de Despacho *
            </label>
            <span className="text-[9px] uppercase font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <MapPin className="w-3 h-3" /> RM Exclusiva
            </span>
          </div>

          <div
            onClick={() => setIsComunaDropdownOpen(!isComunaDropdownOpen)}
            className="w-full bg-zinc-900/60 border border-zinc-800 text-white rounded-xl py-2.5 px-3.5 text-xs flex justify-between items-center cursor-pointer hover:border-zinc-700 transition-colors"
          >
            <span className={comuna ? "text-white font-semibold" : "text-zinc-500"}>
              {comuna || "Selecciona Comuna de Santiago..."}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
          </div>

          {isComunaDropdownOpen && (
            <div className="absolute z-20 w-full mt-1.5 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden animate-fadeIn">
              <div className="p-2 border-b border-zinc-800 bg-zinc-950/40">
                <input
                  type="text"
                  placeholder="Buscar comuna..."
                  value={comunaSearch}
                  onChange={(e) => setComunaSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()} // Prevent closing on input click
                  className="w-full bg-zinc-900 border border-zinc-800 text-white text-xs rounded-lg py-1.5 px-2.5 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
              <div className="max-h-40 overflow-y-auto divide-y divide-zinc-800/40 text-xs">
                {filteredComunas.length > 0 ? (
                  filteredComunas.map((c) => (
                    <div
                      key={c}
                      onClick={() => {
                        setComuna(c)
                        setComunaSearch('')
                        setIsComunaDropdownOpen(false)
                      }}
                      className="py-2 px-3.5 hover:bg-emerald-600 hover:text-white text-zinc-300 font-semibold cursor-pointer transition-colors flex justify-between items-center"
                    >
                      <span>{c}</span>
                      {comuna === c && <Check className="w-3 h-3 text-emerald-400" />}
                    </div>
                  ))
                ) : (
                  <div className="py-2 px-3 text-zinc-500 text-center">No se encontraron comunas en la RM</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Paso 4: Datos de Contacto */}
        <div>
          <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2.5">
            4. Datos del Contacto Comercial *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre completo..."
                className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-xl py-2.5 px-3.5 text-white placeholder-zinc-500 text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>

            <div>
              <input
                type="text"
                required
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder="Nombre de la empresa..."
                className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-xl py-2.5 px-3.5 text-white placeholder-zinc-500 text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>

            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo corporativo..."
                className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-xl py-2.5 px-3.5 text-white placeholder-zinc-500 text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>

            <div>
              <input
                type="tel"
                required
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Teléfono (ej: +56 9 ...)"
                className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-xl py-2.5 px-3.5 text-white placeholder-zinc-500 text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Mensaje opcional */}
        <div>
          <textarea
            rows={2}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="¿Algún requerimiento especial de calibre o madurez? (Opcional)"
            className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-xl py-2.5 px-3.5 text-white placeholder-zinc-500 text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed text-xs uppercase tracking-wider"
        >
          {loading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
              Procesando cotización...
            </>
          ) : (
            'Obtener Propuesta Comercial'
          )}
        </button>
      </form>
    </div>
  )
}
