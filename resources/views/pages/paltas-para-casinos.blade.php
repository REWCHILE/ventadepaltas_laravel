@extends('layouts.public')

@section('title', 'Paltas para Casinos de Alimentación y Catering | Gran Volumen')
@section('meta_description', 'Proveedor de palta Hass al por mayor para casinos institucionales, de empresas, clínicas y colegios. Cumplimiento de estándares BPM y gran volumen.')

@section('content')
<!-- Hero Banner -->
<section class="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-zinc-950 text-white py-20 border-b border-zinc-800">
    @include('components.avocado-particles')
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-4">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
            🏢 Alimentación Colectiva & Casinos
        </span>
        <h1 class="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
            Paltas para Casinos y Catering
        </h1>
        <p class="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Suministro de alto volumen para concesionarias de alimentos. Cumplimiento de BPM, trazabilidad fitosanitaria y logística certificada.
        </p>
    </div>
</section>

<!-- Content -->
<section class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div class="lg:col-span-6 space-y-6 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            <h2 class="text-2xl font-bold font-display text-zinc-900 dark:text-white">
                Trazabilidad e Inocuidad para Alimentación Masiva
            </h2>
            <p>
                Las concesionarias de casinos en industrias, clínicas y faenas requieren proveedores homologados que cumplan rigurosas normas de inocuidad. Entregamos guías electrónicas, facturación ordenada y trazabilidad completa de lotes para auditorías HACCP.
            </p>

            <div class="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
                <h3 class="font-bold text-zinc-900 dark:text-white text-sm">Especificaciones para Grandes Volúmenes</h3>
                <div class="space-y-2 text-xs">
                    <div class="p-3 bg-zinc-50 dark:bg-zinc-850 rounded-xl">
                        <strong class="block text-zinc-900 dark:text-white mb-0.5">Pedidos desde 500 kg semanales</strong>
                        Tarifas corporativas estables, contratos anuales y prioridad de ruta en camiones con sensor térmico.
                    </div>
                    <div class="p-3 bg-zinc-50 dark:bg-zinc-850 rounded-xl">
                        <strong class="block text-zinc-900 dark:text-white mb-0.5">Embalaje Industrial en Bins</strong>
                        Opción de despacho en bins plásticos de gran capacidad para agilizar la descarga en plantas de producción masiva.
                    </div>
                </div>
            </div>
        </div>

        <div class="lg:col-span-6" id="cotizar">
            @include('components.lead-form', [
                'paginaOrigen' => '/paltas-para-casinos',
                'title' => 'Cotizar Suministro para Casino',
                'subtitle' => 'Envíanos tus bases o requerimientos de volumen mensual.'
            ])
        </div>

    </div>
</section>
@endsection
