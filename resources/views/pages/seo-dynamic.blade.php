@extends('layouts.public')

@section('title', $page->meta_title ?: "{$page->titulo} | VENTADEPALTAS.CL")
@section('meta_description', $page->meta_description)
@section('canonical', url("/{$page->slug}"))
@section('og_image', asset($heroImage))

@section('schemas')
@if(!empty($page->faq_json) && is_array($page->faq_json) && count($page->faq_json) > 0)
@php
    $faqSchema = [
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        'mainEntity' => array_map(function($faq) {
            return [
                '@type' => 'Question',
                'name' => $faq['question'] ?? $faq['pregunta'] ?? '',
                'acceptedAnswer' => [
                    '@type' => 'Answer',
                    'text' => $faq['answer'] ?? $faq['respuesta'] ?? '',
                ]
            ];
        }, $page->faq_json)
    ];
@endphp
<script type="application/ld+json">
{!! json_encode($faqSchema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) !!}
</script>
@endif

@if(!empty($page->schema_json) && is_array($page->schema_json) && count($page->schema_json) > 0)
<script type="application/ld+json">
{!! json_encode($page->schema_json, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) !!}
</script>
@endif
@endsection

@section('content')
<!-- Dynamic Hero Banner -->
<section class="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-zinc-950 text-white py-20 border-b border-zinc-800">
    @include('components.avocado-particles')
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Variedad / Servicio Especializado
            </span>

            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                {{ $page->titulo }}
            </h1>

            <p class="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-xl">
                {{ $page->meta_description }}
            </p>

            <div class="pt-2">
                <a href="#cotizar" class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white text-emerald-950 font-bold text-xs shadow-md hover:bg-zinc-100 active:scale-95 transition-all">
                    <span>Solicitar Cotización Directa</span>
                    <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </a>
            </div>
        </div>

        <!-- Right: Image -->
        <div class="lg:col-span-5 flex justify-center">
            <div class="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl bg-zinc-900">
                <img src="{{ asset($heroImage) }}" alt="{{ $page->titulo }}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700">
            </div>
        </div>

    </div>
</section>

<!-- Dynamic Article Content -->
<section class="py-16 max-w-4xl mx-auto px-4 sm:px-6">
    <article class="prose prose-zinc dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed font-sans space-y-4">
        {!! $page->contenido !!}
    </article>
</section>

<!-- Dynamic FAQ Accordion -->
@if(!empty($page->faq_json) && is_array($page->faq_json) && count($page->faq_json) > 0)
<section class="py-16 bg-zinc-100 dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800">
    <div class="max-w-3xl mx-auto px-4 sm:px-6">
        <h3 class="text-xl font-bold font-display text-zinc-900 dark:text-white mb-8 text-center">
            Preguntas Frecuentes Relacionadas
        </h3>
        <div class="space-y-3" x-data="{ openFaq: 0 }">
            @foreach($page->faq_json as $idx => $faq)
            <div class="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
                <button @click="openFaq = openFaq === {{ $idx }} ? null : {{ $idx }}" class="w-full text-left font-bold text-zinc-900 dark:text-white text-sm flex items-start justify-between gap-3 cursor-pointer">
                    <span class="flex items-center gap-2">
                        <i data-lucide="help-circle" class="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"></i>
                        <span>{{ $faq['question'] ?? $faq['pregunta'] ?? '' }}</span>
                    </span>
                    <i data-lucide="chevron-down" class="w-4 h-4 text-zinc-400 transition-transform" :class="openFaq === {{ $idx }} ? 'rotate-180' : ''"></i>
                </button>
                <div x-show="openFaq === {{ $idx }}" x-cloak class="mt-3 pl-6 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-2.5">
                    {{ $faq['answer'] ?? $faq['respuesta'] ?? '' }}
                </div>
            </div>
            @endforeach
        </div>
    </div>
</section>
@endif

<!-- Quote Form -->
<section id="cotizar" class="py-16 bg-zinc-50 dark:bg-zinc-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-5 space-y-4">
            <h2 class="text-2xl sm:text-3xl font-extrabold font-display text-zinc-900 dark:text-white">
                Cotiza en Segundos
            </h2>
            <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Ingresa los datos de tu negocio y volumen de compra. Tu cotización se vinculará directamente a la procedencia <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">/{{ $page->slug }}</span> para asignarte un especialista en este tipo de producto.
            </p>
        </div>
        <div class="lg:col-span-7">
            @include('components.lead-form', [
                'paginaOrigen' => '/' . $page->slug,
                'title' => "Cotizar: {$page->titulo}",
                'subtitle' => 'Calcula tu tarifa B2B para esta variedad o comuna.'
            ])
        </div>
    </div>
</section>
@endsection
