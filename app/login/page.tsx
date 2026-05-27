'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { AlertCircle, Loader2, KeyRound } from 'lucide-react'
import Link from 'next/link'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if middleware redirected with an error query
  useEffect(() => {
    const err = searchParams.get('error')
    if (err === 'unauthorized') {
      setError('No tienes permisos de administrador para ingresar a esta ruta.')
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!email || !password) {
      setError('Por favor ingresa tu correo y contraseña.')
      setLoading(false)
      return
    }

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      // Safeguard: mock credentials if Supabase is unconfigured
      if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
        console.log('Supabase not configured. Mocking admin login for local testing.')
        if (email === 'admin@ventadepaltas.cl' && password === 'admin123') {
          // Store fake cookie to simulate auth or redirect
          document.cookie = 'sb-access-token=mocked-token; path=/;'
          router.push('/admin')
        } else {
          setError('Credenciales inválidas en modo simulación (Prueba con admin@ventadepaltas.cl / admin123)')
        }
        setLoading(false)
        return
      }

      const supabase = createClient()
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message === 'Invalid login credentials' ? 'Credenciales de acceso inválidas.' : authError.message)
        setLoading(false)
        return
      }

      // Check if profile exists and has role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user?.id)
        .single()

      if (profileError || !profile || (profile.role !== 'super_admin' && profile.role !== 'admin_comercial')) {
        setError('Acceso denegado. Este usuario no cuenta con roles de administración.')
        await supabase.auth.signOut()
        setLoading(false)
        return
      }

      // Successful login
      router.push('/admin')
      router.refresh()
    } catch (err: any) {
      console.error('Error during login:', err)
      setError('Ocurrió un error inesperado al iniciar sesión.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-xl space-y-6">
        
        {/* Header / Logo */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex h-12 w-auto px-3.5 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 mb-2">
            <span className="text-base font-extrabold font-sans tracking-tight">Paltin</span>
          </Link>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white font-display uppercase tracking-tight">
            Panel de Control
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Ingreso para Super Admin y Admin Comercial
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-500/30 rounded-xl flex items-start gap-2.5 text-rose-800 dark:text-rose-300 text-xs leading-relaxed">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-rose-600 dark:text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ventadepaltas.cl"
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl py-2 px-3 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl py-2 px-3 text-zinc-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed text-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Validando credenciales...
              </>
            ) : (
              <>
                <KeyRound className="w-4 h-4" />
                Ingresar al Sistema
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <Link href="/" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-350">
            ← Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-500 font-semibold">
          Cargando acceso...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
