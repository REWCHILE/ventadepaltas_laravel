@extends('layouts.public')

@section('title', 'Venta de Paltas por Mayor | Proveedor Directo en Chile')
@section('meta_description', 'Comprar paltas por mayor con el mejor precio de packing y distribución en Santiago. Calidad Hass garantizada y despacho refrigerado.')

@section('content')
<!-- Hero Banner -->
<section class="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-zinc-950 text-white py-20 border-b border-zinc-800">
    @include('components.avocado-particles')
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-4">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Canal Mayorista B2B
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
            Venta de Paltas por Mayor en Santiago
        </h1>
        <p class="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Abastecemos a distribuidores, almacenes, minimarkets y cadenas gastronómicas con precios directos de origen y entrega puntual con cadena de frío.
        </p>
    </div>
</section>

<!-- Content Grid -->
<section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div class="lg:col-span-6 space-y-6 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            <h2 class="text-2xl font-bold font-display text-zinc-900 dark:text-white">
                Distribución Mayorista con Trazabilidad y Rendimiento
            </h2>
            <p>
                Comprar paltas por mayor exige un socio comercial que asegure estabilidad en peso, uniformidad de calibres y continuidad en las entregas. En <strong>VENTADEPALTAS.CL</strong> contamos con logística optimizada para la Región Metropolitana.
            </p>

            <div class="space-y-3 pt-2">
                <div class="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 flex items-start gap-3">
                    <div class="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 shrink-0">
                        <i data-lucide="scale" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-zinc-900 dark:text-white text-xs">Cajas de 10kg y 18kg</h4>
                        <p class="text-xs text-zinc-500 mt-0.5">Embalaje reforzado con ventilación para evitar magulladuras durante el transporte.</p>
                    </div>
                </div>

                <div class="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 flex items-start gap-3">
                    <div class="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 shrink-0">
                        <i data-lucide="check-circle" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-zinc-900 dark:text-white text-xs">Garantía de Reposición</h4>
                        <p class="text-xs text-zinc-500 mt-0.5">Si un fruto no cumple el estándar comercial pactado, lo reponemos de inmediato en el siguiente despacho.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Form -->
        <div class="lg:col-span-6" id="cotizar">
            @include('components.lead-form', [
                'paginaOrigen' => '/venta-de-paltas-por-mayor',
                'title' => 'Cotizar Palta por Mayor',
                'subtitle' => 'Precios especiales por volumen continuo a partir de 100 kg.'
            ])
        </div>

    </div>
</section>
@endsection
