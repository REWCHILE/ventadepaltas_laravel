'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { LayoutDashboard, FileSpreadsheet, FileText, Search, LogOut, ChevronRight, Menu, X, ArrowLeft, ShieldAlert } from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileSidebar, setMobileSidebar] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    async function loadUser() {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      // Safeguard: mock session if keys are placeholders
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
        setIsDemo(true)
        setUserEmail('admin@ventadepaltas.cl')
        setUserRole('super_admin')
        return
      }

      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      setUserEmail(user.email || 'usuario@empresa.cl')

      // Get profile role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile) {
        setUserRole(profile.role)
      } else {
        setUserRole('admin_comercial')
      }
    }

    loadUser()
  }, [router])

  const handleSignOut = async () => {
    if (isDemo) {
      // Clear fake token cookie
      document.cookie = 'sb-access-token=; Max-Age=0; path=/;'
      router.push('/login')
      return
    }

    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const navItems = [
    { name: 'Resumen', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Formulario Web', href: '/admin/leads', icon: <FileSpreadsheet className="w-4 h-4" />, badge: 'CRM' },
    { name: 'Páginas SEO', href: '/admin/seo-pages', icon: <Search className="w-4 h-4" />, roleRequired: 'super_admin' },
    { name: 'Artículos Blog', href: '/admin/blog', icon: <FileText className="w-4 h-4" />, roleRequired: 'super_admin' },
  ]

  const filteredNavItems = navItems.filter(item => {
    if (!item.roleRequired) return true
    if (item.roleRequired === 'super_admin' && userRole === 'super_admin') return true
    return false
  })

  const getRoleLabel = (role: string | null) => {
    if (role === 'super_admin') return 'Super Admin'
    if (role === 'admin_comercial') return 'Admin Comercial'
    return 'Cargando...'
  }

  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-zinc-950 font-sans">
      
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 shrink-0">
        {/* Title */}
        <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="h-8 w-auto px-2 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-extrabold text-xs tracking-tight">Paltin</div>
            <div>
              <span className="font-extrabold text-sm text-zinc-900 dark:text-white uppercase tracking-tight">AdminPanel</span>
              <span className="block text-[9px] text-zinc-500 uppercase tracking-widest -mt-1 font-bold">ventadepaltas.cl</span>
            </div>
          </Link>
        </div>

        {/* User Info Card */}
        <div className="p-4 mx-4 mt-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-150 dark:border-zinc-800">
          <div className="text-xs font-bold text-zinc-900 dark:text-white truncate">{userEmail}</div>
          <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{getRoleLabel(userRole)}</div>
        </div>

        {/* Nav list */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-450 font-semibold'
                    : 'text-zinc-650 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
          <Link 
            href="/"
            className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-850 hover:text-zinc-800 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Volver al sitio público
          </Link>
          
          <button
            onClick={handleSignOut}
            className="w-full cursor-pointer flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Mobile Header Banner */}
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 md:hidden shrink-0">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="h-8 w-auto px-2 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-extrabold text-xs tracking-tight">Paltin</div>
            <span className="font-extrabold text-sm text-zinc-900 dark:text-white uppercase">Admin</span>
          </Link>
          <button
            onClick={() => setMobileSidebar(!mobileSidebar)}
            className="p-1 rounded-lg border border-zinc-200 text-zinc-500 dark:border-zinc-800 cursor-pointer"
          >
            {mobileSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Sidebar overlay */}
        {mobileSidebar && (
          <div className="md:hidden fixed inset-0 z-40 bg-zinc-900/40 backdrop-blur-xs flex">
            <div className="w-64 bg-white dark:bg-zinc-900 h-full flex flex-col justify-between border-r border-zinc-200 dark:border-zinc-850 p-4">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-zinc-900 dark:text-white uppercase">Navegación</span>
                  <button onClick={() => setMobileSidebar(false)} className="cursor-pointer">
                    <X className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>
                
                <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-150">
                  <div className="text-xs font-bold text-zinc-900 truncate">{userEmail}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">{getRoleLabel(userRole)}</div>
                </div>

                <nav className="space-y-1">
                  {filteredNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileSidebar(false)}
                      className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${
                        pathname === item.href
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-450 font-semibold'
                          : 'text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="space-y-2 border-t border-zinc-100 dark:border-zinc-800 pt-4">
                <Link 
                  href="/"
                  className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-zinc-500"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Volver al sitio público
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-rose-600"
                >
                  <LogOut className="w-3.5 h-3.5" /> Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Demo safeguard banner */}
        {isDemo && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-2.5 flex items-center gap-2.5 text-amber-700 dark:text-amber-400 text-xs">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span><strong>Modo de Simulación Activo:</strong> Supabase no configurado. Las operaciones del panel se ejecutan de manera simulada localmente y se reinician al refrescar.</span>
          </div>
        )}

        {/* Main Area */}
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>

    </div>
  )
}
