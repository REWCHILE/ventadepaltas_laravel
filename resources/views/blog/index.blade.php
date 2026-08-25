@extends('layouts.public')

@section('title', 'Blog de la Palta Hass | Artículos y Consejos Mayoristas')
@section('meta_description', 'Aprende sobre calibres de palta Hass, técnicas de maduración, conservación, recetas mayoristas y el mercado de frutas B2B en Chile.')

@section('content')
<div class="bg-zinc-50 dark:bg-zinc-950 py-16 flex-grow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span class="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Blog B2B & Gastronomía
            </span>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-zinc-900 dark:text-white">
                Consejos y Novedades de la Palta Hass
            </h1>
            <p class="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                Artículos especializados en conservación térmica, maduración, optimización de costos y tendencias hortofrutícolas para empresas en Chile.
            </p>
        </div>

        <!-- Posts Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @forelse($posts as $post)
            <article class="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group">
                <div class="p-6 space-y-4">
                    <div class="flex items-center gap-2 text-xs text-zinc-400">
                        <i data-lucide="calendar" class="w-3.5 h-3.5 text-emerald-500"></i>
                        <span>{{ $post->created_at->translatedFormat('d F, Y') }}</span>
                    </div>

                    <h3 class="text-lg font-bold font-display text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                        <a href="{{ route('blog.show', $post->slug) }}">
                            {{ $post->titulo }}
                        </a>
                    </h3>

                    <p class="text-xs text-zinc-550 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                        {{ $post->meta_description }}
                    </p>
                </div>

                <div class="px-6 py-4 bg-zinc-50 dark:bg-zinc-850/60 border-t border-zinc-150 dark:border-zinc-800/60 flex items-center justify-between">
                    <span class="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                        {{ $post->keyword_principal ?: 'Palta Hass' }}
                    </span>
                    <a href="{{ route('blog.show', $post->slug) }}" class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                        <span>Leer Artículo</span>
                        <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                    </a>
                </div>
            </article>
            @empty
            <div class="col-span-3 text-center py-16 text-zinc-400">
                No hay artículos publicados actualmente.
            </div>
            @endforelse
        </div>

        <!-- Pagination -->
        <div class="mt-12 flex justify-center">
            {{ $posts->links() }}
        </div>

    </div>
</div>
@endsection
