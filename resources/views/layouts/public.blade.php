<!DOCTYPE html>
<html lang="es" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>@yield('title', 'Venta de Paltas Hass al por Mayor | Proveedor Premium Chile')</title>
    <meta name="description" content="@yield('meta_description', 'Distribuidor y proveedor premium de Palta Hass para restaurantes, casinos, hoteles y minimarkets en Santiago. Calibres seleccionados y despacho directo.')">
    <link rel="canonical" href="@yield('canonical', url()->current())">

    <!-- Open Graph / Social Meta -->
    <meta property="og:title" content="@yield('og_title', 'Venta de Paltas Hass al por Mayor | Proveedor Premium Chile')">
    <meta property="og:description" content="@yield('og_description', 'Distribuidor mayorista de Palta Hass en Santiago. Despacho garantizado con cadena de frío y merma cero.')">
    <meta property="og:image" content="@yield('og_image', asset('images/premium_hass_avocados.png'))">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:type" content="website">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="{{ asset('images/avocado_mascot.png') }}">

    <!-- Google Fonts: Outfit & Plus Jakarta Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Tailwind CSS CDN + Plugins -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                        display: ['"Outfit"', 'sans-serif'],
                    },
                    colors: {
                        emerald: {
                            50: '#ecfdf5',
                            100: '#d1fae5',
                            200: '#a7f3d0',
                            300: '#6ee7b7',
                            400: '#34d399',
                            450: '#10b981',
                            500: '#10b981',
                            600: '#059669',
                            700: '#047857',
                            800: '#065f46',
                            900: '#064e3b',
                            950: '#022c22',
                        }
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
        
        .glass-header {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        }
        .dark .glass-header {
            background: rgba(9, 9, 11, 0.85);
        }

        .avocado-glow {
            box-shadow: 0 0 50px -10px rgba(16, 185, 129, 0.25);
        }

        @keyframes pulse-subtle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.85; transform: scale(1.03); }
        }
        .animate-pulse-subtle {
            animation: pulse-subtle 3s ease-in-out infinite;
        }
    </style>

    @yield('schemas')
</head>
<body class="bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-white" x-data="{ mobileMenu: false, sectorsOpen: false }">

    <!-- Top Scroll Progress Bar -->
    <div id="scroll-progress" class="fixed top-0 left-0 h-1 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-600 z-50 transition-all duration-150" style="width: 0%;"></div>

    <!-- Header Navigation -->
    <header class="sticky top-0 z-40 w-full border-b border-zinc-200/50 dark:border-zinc-800/50 glass-header transition-all">
        <div class="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <!-- Logo -->
            <a href="{{ route('home') }}" class="flex items-center gap-2.5 group">
                <div class="relative h-10 w-10 overflow-hidden rounded-full border border-emerald-500/60 bg-white shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
                    <img src="{{ asset('images/avocado_mascot.png') }}" alt="Paltín" class="w-8 h-8 object-contain">
                </div>
                <div>
                    <span class="text-lg font-extrabold tracking-tight text-zinc-900 dark:text-white font-display uppercase leading-none">
                        VentaDe<span class="text-emerald-600 dark:text-emerald-400">Paltas</span>
                    </span>
                    <span class="block text-[9px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase font-sans">
                        Mayorista B2B Chile
                    </span>
                </div>
            </a>

            <!-- Desktop Nav Links -->
            <nav class="hidden md:flex items-center gap-7 text-sm font-medium">
                <a href="{{ route('home') }}" class="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 {{ request()->routeIs('home') ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-zinc-600 dark:text-zinc-300' }}">
                    Inicio
                </a>
                <a href="{{ route('pages.venta-mayor') }}" class="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 {{ request()->routeIs('pages.venta-mayor') ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-zinc-600 dark:text-zinc-300' }}">
                    Paltas al por Mayor
                </a>
                <a href="{{ route('pages.proveedor-santiago') }}" class="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 {{ request()->routeIs('pages.proveedor-santiago') ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-zinc-600 dark:text-zinc-300' }}">
                    Proveedor Santiago
                </a>
                <a href="{{ route('pages.hass-por-mayor') }}" class="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 {{ request()->routeIs('pages.hass-por-mayor') ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-zinc-600 dark:text-zinc-300' }}">
                    Palta Hass
                </a>

                <!-- Sectores Dropdown -->
                <div class="relative" @click.away="sectorsOpen = false">
                    <button @click="sectorsOpen = !sectorsOpen" class="flex items-center gap-1 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 text-zinc-600 dark:text-zinc-300">
                        <span>Sectores</span>
                        <i data-lucide="chevron-down" class="w-4 h-4 transition-transform" :class="sectorsOpen ? 'rotate-180' : ''"></i>
                    </button>
                    
                    <div x-show="sectorsOpen" x-cloak 
                         x-transition:enter="transition ease-out duration-150"
                         x-transition:enter-start="opacity-0 scale-95"
                         x-transition:enter-end="opacity-100 scale-100"
                         x-transition:leave="transition ease-in duration-100"
                         x-transition:leave-start="opacity-100 scale-100"
                         x-transition:leave-end="opacity-0 scale-95"
                         class="absolute right-0 mt-2 w-56 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 shadow-xl z-50">
                        <a href="{{ route('pages.restaurantes') }}" class="block rounded-xl px-4 py-2.5 text-xs font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                            🍴 Restaurantes y Sushis
                        </a>
                        <a href="{{ route('pages.casinos') }}" class="block rounded-xl px-4 py-2.5 text-xs font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                            🏢 Casinos de Alimentación
                        </a>
                        <a href="{{ route('pages.empresas') }}" class="block rounded-xl px-4 py-2.5 text-xs font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                            🍏 Empresas y Catering
                        </a>
                    </div>
                </div>

                <a href="{{ route('blog.index') }}" class="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 {{ request()->routeIs('blog.*') ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-zinc-600 dark:text-zinc-300' }}">
                    Blog
                </a>
                <a href="{{ route('contacto') }}" class="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 {{ request()->routeIs('contacto') ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-zinc-600 dark:text-zinc-300' }}">
                    Contacto
                </a>
            </nav>

            <!-- Actions -->
            <div class="hidden md:flex items-center gap-3">
                <a href="https://wa.me/56957803219" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-xs font-bold transition-all">
                    <i data-lucide="phone" class="w-3.5 h-3.5 text-emerald-500"></i>
                    <span>+56 9 5780 3219</span>
                </a>
                <a href="#cotizar" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all">
                    <span>Cotizar B2B</span>
                    <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </a>
            </div>

            <!-- Mobile Hamburger Button -->
            <div class="flex items-center md:hidden">
                <button @click="mobileMenu = !mobileMenu" class="p-2 rounded-xl text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" aria-label="Abrir menú">
                    <i data-lucide="menu" class="w-6 h-6" x-show="!mobileMenu"></i>
                    <i data-lucide="x" class="w-6 h-6" x-show="mobileMenu" x-cloak></i>
                </button>
            </div>
        </div>

        <!-- Mobile Menu Drawer -->
        <div x-show="mobileMenu" x-cloak class="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-3">
            <a href="{{ route('home') }}" class="block px-3 py-2 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800">Inicio</a>
            <a href="{{ route('pages.venta-mayor') }}" class="block px-3 py-2 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800">Paltas al por Mayor</a>
            <a href="{{ route('pages.proveedor-santiago') }}" class="block px-3 py-2 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800">Proveedor Santiago</a>
            <a href="{{ route('pages.hass-por-mayor') }}" class="block px-3 py-2 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800">Palta Hass</a>
            
            <div class="pl-3 border-l-2 border-emerald-500 space-y-1">
                <span class="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Sectores Especializados</span>
                <a href="{{ route('pages.restaurantes') }}" class="block py-1 text-xs text-zinc-600 dark:text-zinc-300">Restaurantes & Sushis</a>
                <a href="{{ route('pages.casinos') }}" class="block py-1 text-xs text-zinc-600 dark:text-zinc-300">Casinos & Catering</a>
                <a href="{{ route('pages.empresas') }}" class="block py-1 text-xs text-zinc-600 dark:text-zinc-300">Empresas & Oficinas</a>
            </div>

            <a href="{{ route('blog.index') }}" class="block px-3 py-2 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800">Blog Informativo</a>
            <a href="{{ route('contacto') }}" class="block px-3 py-2 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800">Contacto</a>

            <div class="pt-2 space-y-2">
                <a href="https://wa.me/56957803219" target="_blank" class="w-full text-center flex items-center justify-center gap-2 py-2.5 rounded-xl border border-emerald-500/40 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                    <i data-lucide="phone" class="w-4 h-4"></i>
                    <span>WhatsApp / Ventas: +56 9 5780 3219</span>
                </a>
                <a href="#cotizar" @click="mobileMenu = false" class="w-full text-center block py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md">
                    Cotizar Mayorista Directo
                </a>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
        @yield('content')
    </main>

    <!-- Footer -->
    <footer class="bg-zinc-900 text-zinc-400 border-t border-zinc-800 font-sans text-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                <!-- Col 1: Brand -->
                <div class="lg:col-span-2 space-y-4">
                    <div class="flex items-center gap-2.5">
                        <img src="{{ asset('images/avocado_mascot.png') }}" alt="Paltín" class="w-9 h-9 object-contain">
                        <div>
                            <span class="text-base font-extrabold text-white uppercase tracking-tight font-display">
                                VentaDe<span class="text-emerald-400">Paltas</span>.CL
                            </span>
                            <span class="block text-[9px] text-zinc-500 uppercase tracking-widest font-bold">
                                Distribuidor B2B Exclusivo RM
                            </span>
                        </div>
                    </div>
                    <p class="text-zinc-400 leading-relaxed max-w-sm">
                        Líderes en abastecimiento de Palta Hass seleccionada para restaurantes, cadenas de sushi, casinos institucionales y minimarkets en toda la Región Metropolitana.
                    </p>
                    <div class="pt-2 flex items-center gap-3 text-zinc-300">
                        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 text-[11px] font-semibold border border-zinc-700/60 text-emerald-400">
                            <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Facturación Directa & BPM
                        </span>
                        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 text-[11px] font-semibold border border-zinc-700/60 text-emerald-400">
                            <i data-lucide="truck" class="w-3.5 h-3.5"></i> Flota Refrigerada
                        </span>
                    </div>
                </div>

                <!-- Col 2: Soluciones -->
                <div class="space-y-3">
                    <h4 class="text-sm font-bold text-white font-display uppercase tracking-wider">Sectores B2B</h4>
                    <ul class="space-y-2">
                        <li><a href="{{ route('pages.restaurantes') }}" class="hover:text-emerald-400 transition-colors">Paltas para Restaurantes</a></li>
                        <li><a href="{{ route('pages.casinos') }}" class="hover:text-emerald-400 transition-colors">Paltas para Casinos</a></li>
                        <li><a href="{{ route('pages.empresas') }}" class="hover:text-emerald-400 transition-colors">Paltas para Empresas</a></li>
                        <li><a href="{{ route('pages.venta-mayor') }}" class="hover:text-emerald-400 transition-colors">Venta al por Mayor</a></li>
                        <li><a href="{{ route('pages.proveedor-santiago') }}" class="hover:text-emerald-400 transition-colors">Proveedor Santiago</a></li>
                    </ul>
                </div>

                <!-- Col 3: Variedades & SEO -->
                <div class="space-y-3">
                    <h4 class="text-sm font-bold text-white font-display uppercase tracking-wider">Variedades & Comunas</h4>
                    <ul class="space-y-2">
                        <li><a href="{{ url('/palta-chilena-premium') }}" class="hover:text-emerald-400 transition-colors">Palta Chilena Premium</a></li>
                        <li><a href="{{ url('/palta-hass-peruana') }}" class="hover:text-emerald-400 transition-colors">Palta Hass Peruana</a></li>
                        <li><a href="{{ url('/palta-edranol-por-mayor') }}" class="hover:text-emerald-400 transition-colors">Palta Edranol</a></li>
                        <li><a href="{{ url('/palta-fuerte-por-mayor') }}" class="hover:text-emerald-400 transition-colors">Palta Fuerte</a></li>
                        <li><a href="{{ url('/venta-de-paltas-en-las-condes') }}" class="hover:text-emerald-400 transition-colors">Despacho en Las Condes</a></li>
                        <li><a href="{{ url('/venta-de-paltas-en-vitacura') }}" class="hover:text-emerald-400 transition-colors">Despacho en Vitacura</a></li>
                        <li><a href="{{ url('/venta-de-providencia') }}" class="hover:text-emerald-400 transition-colors">Despacho en Providencia</a></li>
                    </ul>
                </div>

                <!-- Col 4: Contacto -->
                <div class="space-y-3">
                    <h4 class="text-sm font-bold text-white font-display uppercase tracking-wider">Mesa de Ayuda B2B</h4>
                    <ul class="space-y-2.5">
                        <li class="flex items-center gap-2">
                            <i data-lucide="phone" class="w-4 h-4 text-emerald-400 shrink-0"></i>
                            <a href="tel:+56957803219" class="hover:text-white font-semibold">+56 9 5780 3219</a>
                        </li>
                        <li class="flex items-center gap-2">
                            <i data-lucide="mail" class="w-4 h-4 text-emerald-400 shrink-0"></i>
                            <a href="mailto:contacto@ventadepaltas.cl" class="hover:text-white">contacto@ventadepaltas.cl</a>
                        </li>
                        <li class="flex items-start gap-2">
                            <i data-lucide="map-pin" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5"></i>
                            <span>Mercado Lo Valledor, Santiago, Chile</span>
                        </li>
                        <li class="pt-2">
                            <a href="{{ route('login') }}" class="text-[11px] text-zinc-500 hover:text-emerald-400 flex items-center gap-1">
                                <i data-lucide="lock" class="w-3 h-3"></i> Acceso Panel Interno
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Bottom bar -->
            <div class="mt-12 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
                <p>© {{ date('Y') }} VENTADEPALTAS.CL. Todos los derechos reservados. Distribución Mayorista B2B.</p>
                <div class="flex items-center gap-4">
                    <a href="{{ route('sitemap') }}" class="hover:text-zinc-300">Sitemap XML</a>
                    <span>•</span>
                    <a href="{{ route('contacto') }}" class="hover:text-zinc-300">Atención a Clientes</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- WhatsApp Floating Action Button -->
    @include('components.whatsapp-button')

    <!-- Mascot Widget ("Paltín") -->
    @include('components.mascot-widget')

    <script>
        // Initialize Lucide icons
        lucide.createIcons();

        // Scroll progress indicator
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            const bar = document.getElementById('scroll-progress');
            if (bar) bar.style.width = scrolled + '%';
        });
    </script>
</body>
</html>
