import React from 'react'
import PublicLayout from '@/components/PublicLayout'
import LeadForm from '@/components/LeadForm'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const metadata = {
  title: 'Contacto Mayorista | VENTADEPALTAS.CL',
  description: 'Contáctanos para compras de paltas por mayor. Oficina de ventas, despacho express a restaurantes y casinos en Santiago de Chile.',
}

export default function Contacto() {
  const pagePath = '/contacto'

  return (
    <PublicLayout>
      <div className="bg-zinc-50 dark:bg-zinc-950 py-12 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-display">
              Contacto Comercial B2B
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-3 text-sm sm:text-base">
              ¿Tienes dudas o necesitas una cotización express? Completa el formulario de contacto o utiliza nuestras vías de comunicación directa para hablar con un ejecutivo de ventas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Info Cards */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-sm font-display">WhatsApp Ventas</h4>
                  <p className="text-xs text-zinc-500 mt-1">Lunes a Sábado: 06:00 - 18:00</p>
                  <a href="tel:+56912345678" className="block text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1 hover:underline">
                    +56 9 1234 5678
                  </a>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-sm font-display">Correo Electrónico</h4>
                  <p className="text-xs text-zinc-500 mt-1">Consultas y Licitaciones B2B</p>
                  <a href="mailto:contacto@ventadepaltas.cl" className="block text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1 hover:underline">
                    contacto@ventadepaltas.cl
                  </a>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-sm font-display">Centro de Distribución</h4>
                  <p className="text-xs text-zinc-500 mt-1">Distribución y Despachos</p>
                  <span className="block text-xs text-zinc-700 dark:text-zinc-300 mt-1">
                    Mercado Mayorista Lo Valledor, Santiago, Chile.
                  </span>
                </div>
              </div>

            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              <LeadForm paginaOrigen={pagePath} title="Enviar Mensaje Comercial" subtitle="Ingresa tus datos y te responderemos a la brevedad." />
            </div>

          </div>

        </div>
      </div>
    </PublicLayout>
  )
}
