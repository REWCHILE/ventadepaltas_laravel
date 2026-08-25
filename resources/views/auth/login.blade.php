<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ingreso al Sistema | VENTADEPALTAS.CL</title>
    <link rel="icon" type="image/png" href="{{ asset('images/avocado_mascot.png') }}">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                        display: ['"Outfit"', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-zinc-950 text-zinc-100 min-h-screen flex items-center justify-center p-4 font-sans selection:bg-emerald-500 selection:text-white">

    <div class="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl shadow-emerald-950/20 space-y-6">
        
        <!-- Header -->
        <div class="text-center space-y-3">
            <a href="{{ route('home') }}" class="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-500 bg-white shadow-xl shadow-emerald-500/15 overflow-hidden hover:scale-105 transition-transform">
                <img src="{{ asset('images/avocado_mascot.png') }}" alt="Paltín" class="w-12 h-12 object-contain">
            </a>
            
            <div>
                <h1 class="text-xl font-extrabold text-white font-display uppercase tracking-tight">
                    Panel de Control B2B
                </h1>
                <p class="text-xs text-zinc-400 mt-0.5">
                    Acceso para Super Admin y Admin Comercial
                </p>
            </div>
        </div>

        @if(isset($errors) && $errors->any())
        <div class="p-3.5 bg-rose-950/40 border border-rose-800/60 rounded-2xl flex items-start gap-2.5 text-rose-300 text-xs leading-relaxed">
            <i data-lucide="alert-circle" class="w-4 h-4 mt-0.5 shrink-0 text-rose-400"></i>
            <div>
                @foreach($errors->all() as $err)
                    <p>{{ $err }}</p>
                @endforeach
            </div>
        </div>
        @endif

        <form action="{{ url('/login') }}" method="POST" class="space-y-4">
            @csrf

            <div>
                <label class="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Correo Electrónico
                </label>
                <div class="relative">
                    <input type="email" name="email" value="{{ old('email', 'admin@ventadepaltas.cl') }}" required
                           class="w-full bg-zinc-850 border border-zinc-700/80 rounded-xl py-2.5 px-3.5 text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-zinc-500">
                </div>
            </div>

            <div>
                <label class="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Contraseña
                </label>
                <div class="relative">
                    <input type="password" name="password" value="admin123" required
                           class="w-full bg-zinc-850 border border-zinc-700/80 rounded-xl py-2.5 px-3.5 text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder-zinc-500">
                </div>
            </div>

            <div class="flex items-center justify-between text-xs text-zinc-400">
                <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="remember" class="rounded bg-zinc-800 border-zinc-700 text-emerald-600 focus:ring-emerald-500">
                    <span>Recordar sesión</span>
                </label>
            </div>

            <button type="submit"
                    class="w-full cursor-pointer bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-xl flex items-center justify-center gap-2 transition-all text-sm">
                <i data-lucide="key-round" class="w-4 h-4"></i>
                <span>Ingresar al Sistema</span>
            </button>
        </form>

        <div class="text-center pt-2 border-t border-zinc-800">
            <a href="{{ route('home') }}" class="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                ← Volver a la página principal
            </a>
        </div>
    </div>

    <script>
        lucide.createIcons();
    </script>
</body>
</html>
