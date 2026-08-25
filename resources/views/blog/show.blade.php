@extends('layouts.public')

@section('title', $post->meta_title ?: "{$post->titulo} | Blog VENTADEPALTAS.CL")
@section('meta_description', $post->meta_description)
@section('canonical', route('blog.show', $post->slug))

@section('schemas')
<script type="application/ld+json">
{!! json_encode([
    '@context' => 'https://schema.org',
    '@type' => 'BlogPosting',
    'headline' => $post->titulo,
    'description' => $post->meta_description,
    'datePublished' => $post->created_at->toAtomString(),
    'dateModified' => $post->updated_at->toAtomString(),
    'mainEntityOfPage' => [
        '@type' => 'WebPage',
        '@id' => route('blog.show', $post->slug)
    ]
], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) !!}
</script>
@endsection

@section('content')
<div class="bg-zinc-50 dark:bg-zinc-950 py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
        
        <!-- Breadcrumbs -->
        <nav class="mb-6 flex items-center gap-2 text-xs text-zinc-400">
            <a href="{{ route('home') }}" class="hover:text-emerald-500">Inicio</a>
            <span>/</span>
            <a href="{{ route('blog.index') }}" class="hover:text-emerald-500">Blog</a>
            <span>/</span>
            <span class="text-zinc-600 dark:text-zinc-300 truncate max-w-xs">{{ $post->titulo }}</span>
        </nav>

        <!-- Article Header -->
        <header class="mb-10 space-y-4">
            <div class="flex items-center gap-3 text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                <span>{{ $post->keyword_principal ?: 'Guía B2B' }}</span>
                <span>•</span>
                <span class="text-zinc-400 font-normal">{{ $post->created_at->translatedFormat('d F, Y') }}</span>
            </div>

            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-zinc-900 dark:text-white leading-[1.15]">
                {{ $post->titulo }}
            </h1>

            <p class="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans">
                {{ $post->meta_description }}
            </p>
        </header>

        <!-- Article Body -->
        <div class="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 p-6 sm:p-10 shadow-xs">
            <article class="prose prose-zinc dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed space-y-5">
                {!! $post->contenido !!}
            </article>

            <!-- Share & CTA Banner -->
            <div class="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="text-xs text-zinc-500">
                    ¿Te pareció útil este artículo? Compártelo con tu equipo gastronómico.
                </div>
                <a href="#cotizar" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md">
                    Cotizar Palta Hass
                </a>
            </div>
        </div>

        <!-- Related Posts -->
        @if(isset($relatedPosts) && $relatedPosts->count() > 0)
        <div class="mt-16 space-y-6">
            <h3 class="text-xl font-bold font-display text-zinc-900 dark:text-white">
                Artículos Relacionados
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                @foreach($relatedPosts as $rel)
                <div class="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                    <span class="text-[10px] text-zinc-400 block">{{ $rel->created_at->format('d/m/Y') }}</span>
                    <h4 class="text-sm font-bold text-zinc-900 dark:text-white font-display line-clamp-2 hover:text-emerald-600">
                        <a href="{{ route('blog.show', $rel->slug) }}">{{ $rel->titulo }}</a>
                    </h4>
                </div>
                @endforeach
            </div>
        </div>
        @endif

        <!-- In-page Lead Form -->
        <div id="cotizar" class="mt-16">
            @include('components.lead-form', [
                'paginaOrigen' => "/blog/{$post->slug}",
                'title' => 'Cotizar Palta Hass para tu Negocio',
                'subtitle' => 'Pide tu presupuesto personalizado con entrega express en Santiago.'
            ])
        </div>

    </div>
</div>
@endsection
