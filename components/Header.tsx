'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Paltas al por Mayor', href: '/venta-de-paltas-por-mayor' },
    { name: 'Proveedor Santiago', href: '/proveedor-de-paltas-santiago' },
    { name: 'Palta Hass', href: '/palta-hass-por-mayor' },
  ]

  const sectors = [
    { name: 'Restaurantes', href: '/paltas-para-restaurantes' },
    { name: 'Casinos de Alimentos', href: '/paltas-para-casinos' },
    { name: 'Empresas y Catering', href: '/paltas-para-empresas' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/40 bg-white/80 dark:border-zinc-800/40 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-auto px-3 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-all">
            <span className="text-sm font-extrabold font-sans tracking-tight">Paltin</span>
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-zinc-900 dark:text-white font-sans uppercase">
              VentaDe<span className="text-emerald-500">Paltas</span>
            </span>
            <span className="block text-[9px] font-bold text-zinc-500 tracking-wider uppercase -mt-1 font-sans">
              Mayorista B2B Chile
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
                isActive(link.href)
                  ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                  : 'text-zinc-600 dark:text-zinc-300'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Sectores Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
              className="flex items-center gap-1 text-sm font-medium text-zinc-600 hover:text-emerald-600 dark:text-zinc-300 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Sectores
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div
                onMouseLeave={() => setDropdownOpen(false)}
                className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
              >
                {sectors.map((sec) => (
                  <Link
                    key={sec.href}
                    href={sec.href}
                    className={`block rounded-lg px-4 py-2.5 text-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${
                      isActive(sec.href)
                        ? 'text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50/30'
                        : 'text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {sec.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/blog"
            className={`text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              isActive('/blog')
                ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                : 'text-zinc-600 dark:text-zinc-300'
            }`}
          >
            Blog
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contacto"
            className="cursor-pointer inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-600/10 hover:bg-emerald-700 hover:shadow-emerald-600/20 active:scale-95 transition-all"
          >
            Cotizar Ahora
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900 md:hidden cursor-pointer"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-b border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-base font-medium px-2 py-1.5 rounded-lg ${
                  isActive(link.href)
                    ? 'text-emerald-600 bg-emerald-50/30 dark:bg-emerald-950/20 font-semibold'
                    : 'text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Sectors for Mobile */}
            <div className="border-t border-zinc-100 dark:border-zinc-800 pt-2 mt-1">
              <span className="block text-xs font-bold text-zinc-400 uppercase tracking-wider px-2 mb-1.5">
                Sectores B2B
              </span>
              {sectors.map((sec) => (
                <Link
                  key={sec.href}
                  href={sec.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block text-base font-medium px-2 py-1.5 rounded-lg ${
                    isActive(sec.href)
                      ? 'text-emerald-600 bg-emerald-50/30 dark:bg-emerald-950/20 font-semibold'
                      : 'text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  {sec.name}
                </Link>
              ))}
            </div>

            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className={`text-base font-medium border-t border-zinc-100 dark:border-zinc-800 pt-2 px-2 py-1.5 rounded-lg ${
                isActive('/blog')
                  ? 'text-emerald-600 bg-emerald-50/30 dark:bg-emerald-950/20 font-semibold'
                  : 'text-zinc-700 dark:text-zinc-300'
              }`}
            >
              Blog
            </Link>

            <Link
              href="/contacto"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 py-2.5 text-base font-semibold text-white shadow-md hover:bg-emerald-700 active:scale-98 transition-all"
            >
              Cotizar Ahora
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
