@extends('layouts.public')

@section('title', 'Contacto Comercial B2B | VENTADEPALTAS.CL')
@section('meta_description', 'Contáctanos para compras de paltas por mayor. Oficina de ventas, despacho express a restaurantes y casinos en Santiago de Chile.')

@section('content')
<div class="bg-zinc-50 dark:bg-zinc-950 py-16 flex-grow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span class="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Atención a Clientes
            </span>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-zinc-900 dark:text-white">
                Contacto Comercial B2B
            </h1>
            <p class="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                ¿Tienes consultas o necesitas una cotización express? Escríbenos o comunícate directamente con nuestra central de ventas.
            </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            <!-- Left: Contact Cards -->
            <div class="lg:col-span-4 space-y-5">
                
                <div class="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex items-start gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                        <i data-lucide="phone" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-zinc-900 dark:text-white text-sm font-display">WhatsApp Ventas</h4>
                        <p class="text-xs text-zinc-500 mt-0.5">Lunes a Sábado: 06:00 - 18:00</p>
                        <a href="https://wa.me/56957803219" target="_blank" class="block text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1 hover:underline">
                            +56 9 5780 3219
                        </a>
                    </div>
                </div>

                <div class="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex items-start gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                        <i data-lucide="mail" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-zinc-900 dark:text-white text-sm font-display">Correo Electrónico</h4>
                        <p class="text-xs text-zinc-500 mt-0.5">Licitaciones & Facturación</p>
                        <a href="mailto:contacto@ventadepaltas.cl" class="block text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1 hover:underline">
                            contacto@ventadepaltas.cl
                        </a>
                    </div>
                </div>

                <div class="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex items-start gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                        <i data-lucide="map-pin" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-zinc-900 dark:text-white text-sm font-display">Centro de Distribución</h4>
                        <p class="text-xs text-zinc-500 mt-0.5">Packing & Retiros</p>
                        <span class="block text-xs text-zinc-700 dark:text-zinc-300 mt-1">
                            Mercado Mayorista Lo Valledor, Santiago, Chile.
                        </span>
                    </div>
                </div>

            </div>

            <!-- Right: Lead Form -->
            <div class="lg:col-span-8" id="cotizar">
                @include('components.lead-form', [
                    'paginaOrigen' => '/contacto',
                    'title' => 'Enviar Mensaje Comercial',
                    'subtitle' => 'Ingresa tus requerimientos y te responderemos a la brevedad.'
                ])
            </div>

        </div>

    </div>
</div>
@endsection
