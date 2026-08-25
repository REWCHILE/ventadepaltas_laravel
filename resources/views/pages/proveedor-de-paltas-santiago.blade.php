@extends('layouts.public')

@section('title', 'Proveedor de Paltas en Santiago | Despacho Express B2B')
@section('meta_description', 'Distribución y despacho de palta Hass en todas las comunas de Santiago. Flota refrigerada propia, calidad garantizada y factura inmediata.')

@section('content')
<!-- Hero Banner -->
<section class="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-zinc-950 text-white py-20 border-b border-zinc-800">
    @include('components.avocado-particles')
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-4">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
            <i data-lucide="map-pin" class="w-3.5 h-3.5"></i> Cobertura 100% Región Metropolitana
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
            Proveedor de Paltas en Santiago
        </h1>
        <p class="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Puntualidad de entrega temprano por la mañana en tu cocina o local comercial. Despacho express en Providencia, Las Condes, Vitacura, Santiago Centro y toda la RM.
        </p>
    </div>
</section>

<!-- Content -->
<section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div class="lg:col-span-6 space-y-6 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            <h2 class="text-2xl font-bold font-display text-zinc-900 dark:text-white">
                Logística y Entregas Matutinas en Santiago
            </h2>
            <p>
                Sabemos que la producción gastronómica en Santiago no puede detenerse por atrasos en la fruta. Por ello, nuestras rutas de reparto inician a las 06:00 AM para que las paltas estén listas al comenzar el turno de cocina.
            </p>

            <div class="grid grid-cols-2 gap-3 text-xs pt-2">
                <div class="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80">
                    <strong class="block text-zinc-900 dark:text-white mb-1">Zona Oriente</strong>
                    Las Condes, Vitacura, Providencia, Lo Barnechea, La Reina, Ñuñoa.
                </div>
                <div class="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80">
                    <strong class="block text-zinc-900 dark:text-white mb-1">Santiago Centro & Poniente</strong>
                    Santiago Centro, Maipú, Pudahuel, Estación Central, Quinta Normal.
                </div>
                <div class="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80">
                    <strong class="block text-zinc-900 dark:text-white mb-1">Zona Norte</strong>
                    Huechuraba, Quilicura, Recoleta, Independencia, Conchalí, Colina.
                </div>
                <div class="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80">
                    <strong class="block text-zinc-900 dark:text-white mb-1">Zona Sur</strong>
                    San Miguel, La Florida, Puente Alto, San Bernardo, Macul, San Joaquín.
                </div>
            </div>
        </div>

        <div class="lg:col-span-6" id="cotizar">
            @include('components.lead-form', [
                'paginaOrigen' => '/proveedor-de-paltas-santiago',
                'title' => 'Cotizar Proveedor Santiago',
                'subtitle' => 'Selecciona tu comuna para coordinar ruta de despacho directo.'
            ])
        </div>

    </div>
</section>
@endsection
