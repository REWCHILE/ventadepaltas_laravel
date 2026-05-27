import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-zinc-900 text-zinc-400 border-t border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Info & Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-9 w-9 overflow-hidden rounded-full border border-emerald-500 bg-white shadow-sm flex items-center justify-center">
                <Image
                  src="/images/avocado_mascot.png"
                  alt="Paltín - Mascota Oficial"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <span className="text-base font-extrabold text-white tracking-tight font-sans uppercase">
                VENTADEPALTAS<span className="text-emerald-400">.CL</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-zinc-400">
              Proveedor líder de Palta Hass premium para restaurantes, casinos, hoteles y distribuidores en la Región Metropolitana y todo Chile. Calidad garantizada durante todo el año.
            </p>
            <div className="text-xs font-semibold text-zinc-500">
              Despachos rápidos | Calibres seleccionados
            </div>
          </div>

          {/* Column 2: Clusters Principales */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Nuestros Servicios
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/venta-de-paltas-por-mayor" className="hover:text-emerald-400 transition-colors">
                  Venta de Paltas por Mayor
                </Link>
              </li>
              <li>
                <Link href="/proveedor-de-paltas-santiago" className="hover:text-emerald-400 transition-colors">
                  Proveedor de Paltas Santiago
                </Link>
              </li>
              <li>
                <Link href="/palta-hass-por-mayor" className="hover:text-emerald-400 transition-colors">
                  Palta Hass por Mayor
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Sectores B2B */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Sectores Clientes
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/paltas-para-restaurantes" className="hover:text-emerald-400 transition-colors">
                  Paltas para Restaurantes
                </Link>
              </li>
              <li>
                <Link href="/paltas-para-casinos" className="hover:text-emerald-400 transition-colors">
                  Paltas para Casinos
                </Link>
              </li>
              <li>
                <Link href="/paltas-para-empresas" className="hover:text-emerald-400 transition-colors">
                  Paltas para Empresas
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contacto */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Contacto Mayorista
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <strong>Fono/WhatsApp:</strong>{' '}
                <a href="tel:+56912345678" className="hover:text-emerald-400 transition-colors">
                  +56 9 1234 5678
                </a>
              </li>
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:contacto@ventadepaltas.cl" className="hover:text-emerald-400 transition-colors">
                  contacto@ventadepaltas.cl
                </a>
              </li>
              <li>
                <strong>Despacho:</strong> Santiago, Región Metropolitana, Chile.
              </li>
              <li className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 rounded bg-zinc-800 px-2 py-1 text-[10px] font-semibold text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
                >
                  Acceso Administración
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
          <p>© {currentYear} VENTADEPALTAS.CL. Todos los derechos reservados. Diseñado para optimización SEO B2B en Chile.</p>
          <p className="flex items-center gap-1 shrink-0">
            Diseño y Desarrollo por{' '}
            <a 
              href="https://www.rew.cl" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold text-zinc-400 hover:text-white transition-colors"
            >
              REW.CL
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
