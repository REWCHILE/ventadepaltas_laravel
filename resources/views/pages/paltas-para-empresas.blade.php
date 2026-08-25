@extends('layouts.public')

@section('title', 'Paltas y Frutas para Empresas y Oficinas | Bienestar B2B')
@section('meta_description', 'Abastecimiento de fruta fresca y cajas de palta Hass seleccionada para comedores de empresas y oficinas en Santiago. Facturación mensual.')

@section('content')
<!-- Hero Banner -->
<section class="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-zinc-950 text-white py-20 border-b border-zinc-800">
    @include('components.avocado-particles')
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-4">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
            🍏 Bienestar Corporativo & Oficinas
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
            Paltas y Frutas para Empresas
        </h1>
        <p class="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Fomenta hábitos saludables en tu equipo con cajas semanales de palta Hass y fruta de estación seleccionada directamente en tu oficina.
        </p>
    </div>
</section>

<!-- Content -->
<section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div class="lg:col-span-6 space-y-6 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            <h2 class="text-2xl font-bold font-display text-zinc-900 dark:text-white">
                Nutrición y Comodidad en el Espacio de Trabajo
            </h2>
            <p>
                Entregamos cajas listas para consumo del personal en oficinas, coworks y plantas corporativas. Facturación electrónica mensual consolidada para facilitar la gestión del área de Personas o Compras.
            </p>

            <div class="space-y-3 pt-2">
                <div class="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 flex items-start gap-3">
                    <div class="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 shrink-0">
                        <i data-lucide="calendar" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-zinc-900 dark:text-white text-xs">Despachos Periódicos</h4>
                        <p class="text-xs text-zinc-500 mt-0.5">Programamos entregas los lunes y miércoles temprano para que el comedor esté siempre abastecido.</p>
                    </div>
                </div>

                <div class="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 flex items-start gap-3">
                    <div class="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 shrink-0">
                        <i data-lucide="file-text" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-zinc-900 dark:text-white text-xs">Facturación Electrónica B2B</h4>
                        <p class="text-xs text-zinc-500 mt-0.5">Emisión con orden de compra y crédito comercial según las políticas de tu empresa.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="lg:col-span-6" id="cotizar">
            @include('components.lead-form', [
                'paginaOrigen' => '/paltas-para-empresas',
                'title' => 'Cotizar Fruta para Empresas',
                'subtitle' => 'Planes semanales para oficinas desde 20 colaboradores.'
            ])
        </div>

    </div>
</section>
@endsection
