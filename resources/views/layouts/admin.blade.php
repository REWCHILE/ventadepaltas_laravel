<!DOCTYPE html>
<html lang="es" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Panel de Control') | VENTADEPALTAS.CL</title>
    <link rel="icon" type="image/png" href="{{ asset('images/avocado_mascot.png') }}">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Tailwind CSS CDN -->
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

    <!-- Alpine.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"></script>

    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <style>
        [x-cloak] { display: none !important; }
    </style>
</head>
<body class="bg-zinc-950 text-zinc-100 min-h-screen flex antialiased font-sans selection:bg-emerald-500 selection:text-white" x-data="{ sidebarOpen: false }">

    <!-- Sidebar for Desktop & Mobile -->
    <aside :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
           class="fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out">
        
        <div class="space-y-6">
            <!-- Brand -->
            <div class="flex items-center justify-between">
                <a href="{{ route('admin.dashboard') }}" class="flex items-center gap-2.5 group">
                    <div class="h-10 w-10 rounded-full border border-emerald-500 bg-white flex items-center justify-center shadow-md">
                        <img src="{{ asset('images/avocado_mascot.png') }}" alt="Paltín" class="w-7 h-7 object-contain">
                    </div>
                    <div>
                        <span class="text-base font-extrabold text-white font-display uppercase tracking-tight">
                            Admin<span class="text-emerald-400">Paltas</span>
                        </span>
                        <span class="block text-[9px] text-zinc-500 uppercase tracking-widest font-bold">
                            CRM & CMS B2B
                        </span>
                    </div>
                </a>

                <button @click="sidebarOpen = false" class="lg:hidden text-zinc-400 hover:text-white">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>

            <!-- Navigation Links -->
            <nav class="space-y-1 text-xs font-semibold">
                <a href="{{ route('admin.dashboard') }}"
                   class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors {{ request()->routeIs('admin.dashboard') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white' }}">
                    <i data-lucide="layout-dashboard" class="w-4 h-4 text-emerald-500"></i>
                    <span>Dashboard & KPIs</span>
                </a>

                <a href="{{ route('admin.leads.index') }}"
                   class="flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors {{ request()->routeIs('admin.leads.*') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white' }}">
                    <div class="flex items-center gap-3">
                        <i data-lucide="users" class="w-4 h-4 text-emerald-500"></i>
                        <span>CRM de Leads</span>
                    </div>
                    @php $newCount = \App\Models\Lead::where('estado', 'Nuevo')->count(); @endphp
                    @if($newCount > 0)
                        <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500 text-zinc-950 font-sans">
                            {{ $newCount }}
                        </span>
                    @endif
                </a>

                <a href="{{ route('admin.seo-pages.index') }}"
                   class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors {{ request()->routeIs('admin.seo-pages.*') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white' }}">
                    <i data-lucide="sparkles" class="w-4 h-4 text-emerald-500"></i>
                    <span>Páginas SEO Dinámicas</span>
                </a>

                <a href="{{ route('admin.blog.index') }}"
                   class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors {{ request()->routeIs('admin.blog.*') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white' }}">
                    <i data-lucide="file-text" class="w-4 h-4 text-emerald-500"></i>
                    <span>Blog de Artículos</span>
                </a>

                <a href="{{ route('admin.settings.smtp') }}"
                   class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors {{ request()->routeIs('admin.settings.*') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white' }}">
                    <i data-lucide="settings" class="w-4 h-4 text-emerald-500"></i>
                    <span>SMTP & Alertas</span>
                </a>
            </nav>
        </div>

        <!-- User profile & Logout -->
        <div class="pt-4 border-t border-zinc-800 space-y-3">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    {{ strtoupper(substr(Auth::user()->name ?? 'A', 0, 2)) }}
                </div>
                <div class="overflow-hidden">
                    <span class="block text-xs font-bold text-white truncate">{{ Auth::user()->name ?? 'Administrador' }}</span>
                    <span class="block text-[10px] text-zinc-500 truncate uppercase">{{ Auth::user()->role ?? 'Admin' }}</span>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-2 text-xs">
                <a href="{{ route('home') }}" target="_blank" class="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-750 flex items-center justify-center gap-1.5 transition-colors">
                    <i data-lucide="external-link" class="w-3.5 h-3.5 text-emerald-400"></i>
                    <span>Ver Sitio</span>
                </a>

                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="w-full p-2 rounded-lg bg-zinc-800 text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
                        <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
                        <span>Salir</span>
                    </button>
                </form>
            </div>
        </div>

    </aside>

    <!-- Main Content Area -->
    <div class="lg:pl-64 flex flex-col flex-1 min-w-0">
        
        <!-- Top bar (Mobile toggle) -->
        <header class="lg:hidden sticky top-0 z-40 h-16 bg-zinc-900 border-b border-zinc-800 px-4 flex items-center justify-between">
            <button @click="sidebarOpen = true" class="p-2 text-zinc-400 hover:text-white">
                <i data-lucide="menu" class="w-6 h-6"></i>
            </button>
            <span class="text-sm font-bold text-white font-display uppercase">Panel de Control</span>
            <div class="w-6"></div>
        </header>

        <main class="p-4 sm:p-6 lg:p-8 flex-1">
            @if(session('success'))
            <div class="mb-6 p-4 bg-emerald-950/50 border border-emerald-800 rounded-2xl flex items-center gap-3 text-emerald-300 text-xs">
                <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 shrink-0"></i>
                <span>{{ session('success') }}</span>
            </div>
            @endif

            @if(isset($errors) && $errors->any())
            <div class="mb-6 p-4 bg-rose-950/50 border border-rose-800 rounded-2xl flex items-center gap-3 text-rose-300 text-xs">
                <i data-lucide="alert-circle" class="w-4 h-4 text-rose-400 shrink-0"></i>
                <div>
                    @foreach($errors->all() as $err)
                        <p>{{ $err }}</p>
                    @endforeach
                </div>
            </div>
            @endif

            @yield('content')
        </main>
    </div>

    <script>
        lucide.createIcons();
    </script>
</body>
</html>
