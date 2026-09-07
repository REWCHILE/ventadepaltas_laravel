@extends('layouts.public')

@section('title', 'Venta de Paltas Hass al por Mayor | Proveedor Premium Chile')
@section('meta_description', 'Distribuidor y proveedor premium de Palta Hass para restaurantes, casinos, hoteles y minimarkets en Santiago. Calibres seleccionados, merma cero y despacho directo.')

@section('schemas')
@verbatim
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "VENTADEPALTAS.CL",
  "url": "https://ventadepaltas.cl",
  "logo": "https://ventadepaltas.cl/images/premium_hass_avocados.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+56957803219",
    "contactType": "sales",
    "areaServed": "CL",
    "availableLanguage": "Spanish"
  }
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "VENTADEPALTAS.CL - Venta de Paltas al por Mayor",
  "image": "https://ventadepaltas.cl/images/premium_hass_avocados.png",
  "telephone": "+56957803219",
  "email": "contacto@ventadepaltas.cl",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Santiago",
    "addressRegion": "Metropolitana",
    "addressCountry": "CL"
  },
  "priceRange": "$$",
  "areaServed": ["Santiago", "Región Metropolitana"]
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuál es el pedido mínimo para despachos mayoristas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nuestro pedido mínimo habitual para despacho gratuito en la Región Metropolitana es de 100 kg, ideal para restaurantes y casinos medianos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo aseguran la madurez adecuada de la palta Hass?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Clasificamos nuestras paltas por calibres y estados de maduración (verde, en transición o lista para consumo) según el requerimiento exacto de tu negocio."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué comunas de la Región Metropolitana cubren con su despacho?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cubrimos de forma exclusiva las 52 comunas de la Región Metropolitana con flota refrigerada propia. No realizamos despachos a otras regiones para garantizar cadena de frío y merma cero."
      }
    }
  ]
}
</script>
@endverbatim
@endsection

@section('content')

<!-- Hero Section -->
<section class="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-zinc-950 text-white py-20 lg:py-28 border-b border-zinc-850">
    <!-- Avocado Particles Canvas -->
    @include('components.avocado-particles')

    <!-- Radial Glow Background -->
    <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <!-- Left: High Conversion Copy -->
            <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
                
                <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold shadow-inner">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Abastecimiento Mayorista Directo RM</span>
                </div>

                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1]">
                    Palta Hass Premium <br class="hidden sm:inline">
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-200">
                        al por Mayor en Chile
                    </span>
                </h1>

                <p class="text-emerald-100/90 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed font-sans">
                    Proveedor directo de Palta Hass seleccionada para restaurantes, sushis, casinos institucionales y minimarkets. Despacho diario refrigerado, calibres homogéneos y garantía de merma cero.
                </p>

                <!-- CTAs -->
                <div class="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <a href="#cotizar" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 active:scale-95 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all">
                        <span>Cotizar Abastecimiento B2B</span>
                        <i data-lucide="arrow-right" class="w-4 h-4"></i>
                    </a>
                    <a href="https://wa.me/56957803219?text=Hola%20VENTADEPALTAS.CL,%20me%20gustar%C3%ADa%20cotizar%20Palta%20Hass%20al%20por%20mayor%20para%20mi%20negocio." target="_blank" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-emerald-500/30 text-white text-sm font-semibold transition-all">
                        <i data-lucide="message-circle" class="w-4 h-4 text-emerald-400"></i>
                        <span>WhatsApp: +56 9 5780 3219</span>
                    </a>
                </div>

                <!-- Stats Counters -->
                <div class="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-emerald-900/60 text-left">
                    <div class="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/30">
                        <span class="block text-2xl font-black font-display text-emerald-300">+50 Ton</span>
                        <span class="text-[11px] text-zinc-400">Despachadas al Mes</span>
                    </div>
                    <div class="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/30">
                        <span class="block text-2xl font-black font-display text-emerald-300">24 hrs</span>
                        <span class="text-[11px] text-zinc-400">Despacho en Santiago</span>
                    </div>
                    <div class="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/30">
                        <span class="block text-2xl font-black font-display text-emerald-300">100%</span>
                        <span class="text-[11px] text-zinc-400">Cadena de Frío</span>
                    </div>
                    <div class="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/30">
                        <span class="block text-2xl font-black font-display text-emerald-300">+120</span>
                        <span class="text-[11px] text-zinc-400">Clientes Corporativos</span>
                    </div>
                </div>
            </div>

            <!-- Right: Hero Visual Card -->
            <div class="lg:col-span-5 flex justify-center">
                <div class="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl shadow-emerald-900/50 bg-gradient-to-tr from-emerald-950 to-zinc-900 group">
                    <img src="{{ asset('images/premium_hass_avocados.png') }}" alt="Paltas Hass Seleccionadas" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                    
                    <!-- Floating Quality Badge -->
                    <div class="absolute bottom-4 left-4 right-4 bg-zinc-950/85 backdrop-blur-md p-3.5 rounded-2xl border border-zinc-800 text-xs flex items-center justify-between">
                        <div class="flex items-center gap-2.5">
                            <div class="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                                <i data-lucide="award" class="w-5 h-5"></i>
                            </div>
                            <div>
                                <span class="font-bold text-white block">Calidad Exportación</span>
                                <span class="text-[10px] text-zinc-400">Materia Seca >23% Garantizada</span>
                            </div>
                        </div>
                        <span class="text-[10px] font-extrabold px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg">
                            Hass Directa
                        </span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- Values Section -->
<section class="py-20 bg-zinc-50 dark:bg-zinc-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span class="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Por Qué Elegirnos
            </span>
            <h2 class="text-3xl sm:text-4xl font-extrabold font-display text-zinc-900 dark:text-white">
                El Estándar B2B en Distribución de Palta Hass
            </h2>
            <p class="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
                Optimizamos la cadena logística entre el huerto y la cocina de tu local para erradicar pérdidas por merma.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <!-- Value 1 -->
            <div class="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:border-emerald-500/50 hover:shadow-lg transition-all space-y-3">
                <div class="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <i data-lucide="award" class="w-6 h-6"></i>
                </div>
                <h3 class="text-base font-bold font-display text-zinc-900 dark:text-white">Calidad Seleccionada</h3>
                <span class="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                    Materia Seca >23%
                </span>
                <p class="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                    Clasificamos cada lote asegurando óptima concentración de aceites naturales. Sin sorpresas, frutos homogéneos y de máxima cremosidad.
                </p>
            </div>

            <!-- Value 2 -->
            <div class="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:border-emerald-500/50 hover:shadow-lg transition-all space-y-3">
                <div class="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <i data-lucide="truck" class="w-6 h-6"></i>
                </div>
                <h3 class="text-base font-bold font-display text-zinc-900 dark:text-white">Cadena de Frío 100%</h3>
                <span class="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                    Temp. 4°C a 8°C
                </span>
                <p class="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                    Monitoreo térmico digital desde packing hasta tu cocina. Evitamos la deshidratación y extendemos la vida útil post-corte.
                </p>
            </div>

            <!-- Value 3 -->
            <div class="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:border-emerald-500/50 hover:shadow-lg transition-all space-y-3">
                <div class="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <i data-lucide="shield-check" class="w-6 h-6"></i>
                </div>
                <h3 class="text-base font-bold font-display text-zinc-900 dark:text-white">Suministro Continuo</h3>
                <span class="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                    Disponibilidad 365 Días
                </span>
                <p class="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                    Alianzas directas con productores en Chile y zonas certificadas de importación en Perú para garantizar abastecimiento todo el año.
                </p>
            </div>

            <!-- Value 4 -->
            <div class="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:border-emerald-500/50 hover:shadow-lg transition-all space-y-3">
                <div class="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <i data-lucide="users" class="w-6 h-6"></i>
                </div>
                <h3 class="text-base font-bold font-display text-zinc-900 dark:text-white">Atención B2B Dedicada</h3>
                <span class="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                    Ejecutivo Asignado
                </span>
                <p class="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                    Gestión ágil con ejecutivos de cuentas dedicados, emisión inmediata de guías electrónicas y reposición prioritaria.
                </p>
            </div>

        </div>
    </div>
</section>

<!-- Calibres Interactive Section -->
<section id="calibres" class="py-20 bg-white dark:bg-zinc-900/60 border-y border-zinc-200/60 dark:border-zinc-800/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div class="lg:col-span-5 space-y-4">
                <span class="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    Catálogo de Calibres
                </span>
                <h2 class="text-3xl sm:text-4xl font-extrabold font-display text-zinc-900 dark:text-white">
                    Elige el Calibre Perfecto para tu Operación
                </h2>
                <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Cada preparación gastronómica requiere una relación peso/pulpa óptima. Haz clic en cualquiera de nuestros calibres para inspeccionar sus especificaciones técnicas de materia seca y rendimiento en cocina.
                </p>

                <div class="pt-4 p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 space-y-2">
                    <h4 class="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                        <i data-lucide="sparkles" class="w-4 h-4"></i> Asesoría Técnica Mayorista
                    </h4>
                    <p class="text-xs text-emerald-900 dark:text-emerald-200/80 leading-relaxed">
                        ¿No estás seguro de qué calibre reduce más tu costo por plato? Te asesoramos sin costo analizando el gramaje por porción de tu carta.
                    </p>
                </div>
            </div>

            <!-- Calibre Deck Component -->
            <div class="lg:col-span-7">
                @include('components.calibre-deck')
            </div>

        </div>

    </div>
</section>

<!-- Quote Calculator Section -->
<section id="cotizar" class="py-20 bg-zinc-50 dark:bg-zinc-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div class="lg:col-span-5 space-y-6">
                <div class="space-y-3">
                    <span class="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                        Paso Sencillo
                    </span>
                    <h2 class="text-3xl sm:text-4xl font-extrabold font-display text-zinc-900 dark:text-white">
                        Cotiza tu Suministro B2B en Menos de 1 Minuto
                    </h2>
                    <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Indícanos el volumen estimado y tu comuna en Santiago. Un ejecutivo comercial se pondrá en contacto contigo de forma inmediata con una propuesta tarifaria preferencial.
                    </p>
                </div>

                <div class="space-y-3 text-xs">
                    <div class="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-xs">
                        <i data-lucide="check-circle" class="w-5 h-5 text-emerald-500 shrink-0"></i>
                        <span class="text-zinc-700 dark:text-zinc-300">Despacho garantizado en las 52 comunas de la RM</span>
                    </div>
                    <div class="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-xs">
                        <i data-lucide="check-circle" class="w-5 h-5 text-emerald-500 shrink-0"></i>
                        <span class="text-zinc-700 dark:text-zinc-300">Factura electrónica inmediata y opción crédito 15/30 días</span>
                    </div>
                    <div class="flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-xs">
                        <i data-lucide="check-circle" class="w-5 h-5 text-emerald-500 shrink-0"></i>
                        <span class="text-zinc-700 dark:text-zinc-300">Paltas con trazabilidad fitosanitaria y análisis de merma</span>
                    </div>
                </div>
            </div>

            <!-- Lead Form -->
            <div class="lg:col-span-7">
                @include('components.lead-form', [
                    'paginaOrigen' => '/',
                    'title' => 'Cotizador B2B Inteligente',
                    'subtitle' => 'Calcula tu tarifa mayorista. Despacho directo con flota propia refrigerada.'
                ])
            </div>

        </div>

    </div>
</section>

<!-- FAQ Accordion Section -->
<section class="py-20 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div class="text-center mb-12 space-y-2">
            <span class="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Dudas Frecuentes
            </span>
            <h2 class="text-3xl font-extrabold font-display text-zinc-900 dark:text-white">
                Preguntas Frecuentes de Clientes B2B
            </h2>
        </div>

        <div class="space-y-4" x-data="{ openItem: 1 }">
            
            <div class="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-850/50">
                <button @click="openItem = openItem === 1 ? null : 1" class="w-full text-left p-5 flex items-center justify-between font-bold text-sm text-zinc-900 dark:text-white cursor-pointer">
                    <span>¿Cuál es el pedido mínimo para despachos mayoristas?</span>
                    <i data-lucide="chevron-down" class="w-4 h-4 transition-transform text-emerald-500" :class="openItem === 1 ? 'rotate-180' : ''"></i>
                </button>
                <div x-show="openItem === 1" x-cloak class="px-5 pb-5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200/50 dark:border-zinc-800/50 pt-3">
                    Nuestro pedido mínimo habitual para despacho gratuito en la Región Metropolitana es de 100 kg, ideal para restaurantes y casinos medianos. Para pedidos menores a 100 kg contamos con retiro directo en nuestra central en Lo Valledor.
                </div>
            </div>

            <div class="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-850/50">
                <button @click="openItem = openItem === 2 ? null : 2" class="w-full text-left p-5 flex items-center justify-between font-bold text-sm text-zinc-900 dark:text-white cursor-pointer">
                    <span>¿Cómo aseguran la madurez adecuada de la palta Hass?</span>
                    <i data-lucide="chevron-down" class="w-4 h-4 transition-transform text-emerald-500" :class="openItem === 2 ? 'rotate-180' : ''"></i>
                </button>
                <div x-show="openItem === 2" x-cloak class="px-5 pb-5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200/50 dark:border-zinc-800/50 pt-3">
                    Clasificamos nuestras paltas por calibres y estados de maduración (verde para stock de la semana, en transición o lista para consumo en el día) según la rotación de tu cocina.
                </div>
            </div>

            <div class="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-850/50">
                <button @click="openItem = openItem === 3 ? null : 3" class="w-full text-left p-5 flex items-center justify-between font-bold text-sm text-zinc-900 dark:text-white cursor-pointer">
                    <span>¿Qué comunas de la Región Metropolitana cubren con su despacho?</span>
                    <i data-lucide="chevron-down" class="w-4 h-4 transition-transform text-emerald-500" :class="openItem === 3 ? 'rotate-180' : ''"></i>
                </button>
                <div x-show="openItem === 3" x-cloak class="px-5 pb-5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200/50 dark:border-zinc-800/50 pt-3">
                    Cubrimos de forma exclusiva las 52 comunas de la Región Metropolitana con flota propia refrigerada. No realizamos despachos a otras regiones de Chile para garantizar el control estricto de la cadena de frío y merma cero.
                </div>
            </div>

        </div>

    </div>
</section>

@if(isset($recentPosts) && $recentPosts->count() > 0)
<!-- Blog Articles Preview -->
<section class="py-20 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
            <div>
                <span class="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    Artículos Especializados
                </span>
                <h2 class="text-2xl sm:text-3xl font-extrabold font-display text-zinc-900 dark:text-white">
                    Consejos y Guías para Profesionales Gastronómicos
                </h2>
            </div>
            <a href="{{ route('blog.index') }}" class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                <span>Ver todos los artículos</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @foreach($recentPosts as $post)
            <article class="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
                <div class="p-6 space-y-3">
                    <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                        <i data-lucide="calendar" class="w-3 h-3"></i>
                        {{ $post->created_at->translatedFormat('d M, Y') }}
                    </span>
                    <h3 class="text-base font-bold font-display text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        <a href="{{ route('blog.show', $post->slug) }}">
                            {{ $post->titulo }}
                        </a>
                    </h3>
                    <p class="text-xs text-zinc-550 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {{ $post->meta_description }}
                    </p>
                </div>
                <div class="px-6 py-3.5 bg-zinc-50 dark:bg-zinc-850 border-t border-zinc-150 dark:border-zinc-800/60 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <span>Leer guía</span>
                    <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"></i>
                </div>
            </article>
            @endforeach
        </div>

    </div>
</section>
@endif

@endsection
