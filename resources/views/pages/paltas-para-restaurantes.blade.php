@extends('layouts.public')

@section('title', 'Paltas para Restaurantes y Cadenas de Sushi | Merma Cero')
@section('meta_description', 'Proveedor de palta Hass para sangucherías, cadenas de sushi y restaurantes en Santiago. Maduración óptima y cortes perfectos.')

@section('content')
<!-- Hero Banner -->
<section class="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-zinc-950 text-white py-20 border-b border-zinc-800">
    @include('components.avocado-particles')
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-4">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
            🍴 Canal Gastronómico & Sushi
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
            Paltas para Restaurantes y Sushi
        </h1>
        <p class="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Consistencia perfecta para cortes en láminas, abanicos y molido rápido en sangucherías. Cero hebras negras y máxima rentabilidad por kilo.
        </p>
    </div>
</section>

<!-- Content -->
<section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div class="lg:col-span-6 space-y-6 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            <h2 class="text-2xl font-bold font-display text-zinc-900 dark:text-white">
                Rendimiento de Pulpa para Cocinas Profesionales
            </h2>
            <p>
                Los locales de sushi y sangucherías tradicionales no pueden permitirse frutos con cuescos gigantes o pulpas aguadas. Seleccionamos calibres Extra y Primera con cuesco pequeño y pulpa firme que no se desarma al cortar.
            </p>

            <div class="space-y-3 pt-2">
                <div class="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 flex items-start gap-3">
                    <div class="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 shrink-0">
                        <i data-lucide="check-circle" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-zinc-900 dark:text-white text-xs">Maduración al Punto</h4>
                        <p class="text-xs text-zinc-500 mt-0.5">Te despachamos paltas listas para servicio hoy y frutos con 2 a 3 días de maduración para sincronizar con tu turno semanal.</p>
                    </div>
                </div>

                <div class="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 flex items-start gap-3">
                    <div class="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 shrink-0">
                        <i data-lucide="clock" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-zinc-900 dark:text-white text-xs">Entregas de Emergencia</h4>
                        <p class="text-xs text-zinc-500 mt-0.5">¿Se agotó el stock el fin de semana? Coordinamos reposiciones prioritarias para locales con cuenta activa.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="lg:col-span-6" id="cotizar">
            @include('components.lead-form', [
                'paginaOrigen' => '/paltas-para-restaurantes',
                'title' => 'Cotizar para tu Restaurante',
                'subtitle' => 'Envíanos tus datos para coordinar prueba de calidad y lista de precios.'
            ])
        </div>

    </div>
</section>
@endsection
