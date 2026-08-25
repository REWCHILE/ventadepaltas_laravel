@extends('layouts.public')

@section('title', 'Palta Hass por Mayor | Variedad Líder en Chile')
@section('meta_description', 'Comprar Palta Hass por mayor. La variedad con mayor concentración de aceite y pulpa cremosa. Abastecimiento de packing nacional e importación.')

@section('content')
<!-- Hero Banner -->
<section class="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-zinc-950 text-white py-20 border-b border-zinc-800">
    @include('components.avocado-particles')
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-4">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
            <i data-lucide="award" class="w-3.5 h-3.5"></i> Variedad Premium
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
            Palta Hass por Mayor
        </h1>
        <p class="text-emerald-100 text-sm sm:text-base leading-relaxed">
            La reina del mercado gastronómico. Piel rugosa, cambio de color al madurar y textura untuosa con más del 23% de materia seca.
        </p>
    </div>
</section>

<!-- Content -->
<section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div class="lg:col-span-6 space-y-6 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            <h2 class="text-2xl font-bold font-display text-zinc-900 dark:text-white">
                Por Qué la Palta Hass es la Preferida por los Chefs
            </h2>
            <p>
                A diferencia de las variedades de piel verde, la palta Hass presenta una maduración homogénea y una piel gruesa que protege la pulpa de golpes mecánicos durante el empaque y traslado.
            </p>

            <div class="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
                <h3 class="font-bold text-zinc-900 dark:text-white text-sm">Disponibilidad en 4 Calibres Comerciales</h3>
                <p class="text-xs text-zinc-500">Contamos con stock permanente en:</p>
                <div class="grid grid-cols-2 gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    <div class="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40">🥑 Súper Extra (260g-300g)</div>
                    <div class="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40">🥑 Extra (220g-250g)</div>
                    <div class="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40">🥑 Primera (180g-210g)</div>
                    <div class="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40">🥑 Segunda (140g-170g)</div>
                </div>
            </div>
        </div>

        <div class="lg:col-span-6" id="cotizar">
            @include('components.lead-form', [
                'paginaOrigen' => '/palta-hass-por-mayor',
                'title' => 'Cotizar Palta Hass Mayorista',
                'subtitle' => 'Indica tus requerimientos para enviarte tarifa con descuento por escala.'
            ])
        </div>

    </div>
</section>
@endsection
