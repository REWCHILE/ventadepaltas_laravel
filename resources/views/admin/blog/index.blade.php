@extends('layouts.admin')

@section('title', 'Gestor de Blog & Artículos')

@section('content')
<div x-data="blogManagerComponent()" class="space-y-6">
    
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
                Gestión de Artículos del Blog
            </h1>
            <p class="text-xs sm:text-sm text-zinc-400 mt-1">
                Publicación de guías técnicas, consejos gastronómicos y artículos B2B para posicionamiento orgánico.
            </p>
        </div>

        <button @click="openCreateModal()" class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all cursor-pointer">
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Nuevo Artículo</span>
        </button>
    </div>

    <!-- Blog Table -->
    <div class="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead class="bg-zinc-850/80 border-b border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                        <th class="p-4">Título</th>
                        <th class="p-4">Slug / URL</th>
                        <th class="p-4">Keyword</th>
                        <th class="p-4">Fecha</th>
                        <th class="p-4">Estado</th>
                        <th class="p-4 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-zinc-800/60">
                    @forelse($posts as $post)
                    <tr class="hover:bg-zinc-850/50 transition-colors">
                        <td class="p-4 font-bold text-white max-w-xs truncate">{{ $post->titulo }}</td>
                        <td class="p-4 font-mono text-emerald-400">
                            <a href="{{ route('blog.show', $post->slug) }}" target="_blank" class="hover:underline flex items-center gap-1">
                                <span>/blog/{{ $post->slug }}</span>
                                <i data-lucide="external-link" class="w-3 h-3"></i>
                            </a>
                        </td>
                        <td class="p-4 text-zinc-300">{{ $post->keyword_principal }}</td>
                        <td class="p-4 text-zinc-400 font-mono text-[11px]">{{ $post->created_at->format('d/m/Y') }}</td>
                        <td class="p-4">
                            <button @click="togglePublish({{ $post->id }})"
                                    class="px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer"
                                    :class="{{ $post->publicada ? 'true' : 'false' }} ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-zinc-800 text-zinc-400 border-zinc-700'">
                                {{ $post->publicada ? 'Publicado' : 'Borrador' }}
                            </button>
                        </td>
                        <td class="p-4 text-right space-x-1">
                            <button @click="openEditModal({{ json_encode($post) }})" class="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-emerald-600 transition-colors inline-block cursor-pointer">
                                <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                            </button>

                            <form action="{{ route('admin.blog.destroy', $post->id) }}" method="POST" class="inline-block" onsubmit="return confirm('¿Eliminar definitivamente este artículo?')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="p-1.5 rounded-lg bg-zinc-800 text-rose-400 hover:text-rose-200 hover:bg-rose-900 transition-colors cursor-pointer">
                                    <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                                </button>
                            </form>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="6" class="p-12 text-center text-zinc-500">
                            No hay artículos creados. Haz clic en "Nuevo Artículo".
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <!-- Create / Edit Modal -->
    <div x-show="modalOpen" x-cloak 
         class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/80 backdrop-blur-md overflow-y-auto"
         x-transition:enter="transition ease-out duration-200"
         x-transition:enter-start="opacity-0"
         x-transition:enter-end="opacity-100"
         x-transition:leave="transition ease-in duration-150"
         x-transition:leave-start="opacity-100"
         x-transition:leave-end="opacity-0">
        
        <div @click.away="modalOpen = false"
             class="relative w-full max-w-4xl bg-zinc-900 rounded-3xl border border-zinc-800 p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            
            <button @click="modalOpen = false" class="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-800 transition-colors">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>

            <h3 class="text-xl font-extrabold font-display text-white" x-text="isEditing ? 'Editar Artículo de Blog' : 'Crear Nuevo Artículo'"></h3>

            <form :action="isEditing ? `/admin/blog/${form.id}` : '{{ route('admin.blog.store') }}'" method="POST" class="space-y-4">
                @csrf
                <template x-if="isEditing">
                    <input type="hidden" name="_method" value="PUT">
                </template>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Título del Artículo *</label>
                        <input type="text" name="titulo" x-model="form.titulo" required
                               class="w-full bg-zinc-850 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Slug URL *</label>
                        <input type="text" name="slug" x-model="form.slug" required placeholder="ej: como-conservar-palta-hass"
                               class="w-full bg-zinc-850 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-emerald-400 font-mono focus:ring-2 focus:ring-emerald-500 outline-none">
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Keyword Principal *</label>
                        <input type="text" name="keyword_principal" x-model="form.keyword_principal" required
                               class="w-full bg-zinc-850 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Meta Title (Google) *</label>
                        <input type="text" name="meta_title" x-model="form.meta_title" required
                               class="w-full bg-zinc-850 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                    </div>
                </div>

                <div>
                    <label class="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Meta Description *</label>
                    <textarea name="meta_description" x-model="form.meta_description" rows="2" required
                              class="w-full bg-zinc-850 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500 outline-none"></textarea>
                </div>

                <div>
                    <label class="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Contenido del Artículo (HTML / Párrafos) *</label>
                    <textarea name="contenido" x-model="form.contenido" rows="8" required
                              class="w-full bg-zinc-850 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:ring-2 focus:ring-emerald-500 outline-none"></textarea>
                </div>

                <div class="flex items-center justify-between pt-3 border-t border-zinc-800">
                    <label class="flex items-center gap-2 text-xs font-bold text-zinc-300 cursor-pointer">
                        <input type="checkbox" name="publicada" value="1" x-model="form.publicada" class="rounded bg-zinc-800 border-zinc-700 text-emerald-600 focus:ring-emerald-500">
                        <span>Publicar inmediatamente en el blog</span>
                    </label>

                    <button type="submit" class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md">
                        <span x-text="isEditing ? 'Guardar Cambios' : 'Publicar Artículo'"></span>
                    </button>
                </div>
            </form>
        </div>
    </div>

</div>

<script>
function blogManagerComponent() {
    return {
        modalOpen: false,
        isEditing: false,
        form: {
            id: null,
            titulo: '',
            slug: '',
            keyword_principal: '',
            meta_title: '',
            meta_description: '',
            contenido: '',
            publicada: true
        },

        openCreateModal() {
            this.isEditing = false;
            this.form = {
                id: null,
                titulo: '',
                slug: '',
                keyword_principal: '',
                meta_title: '',
                meta_description: '',
                contenido: '',
                publicada: true
            };
            this.modalOpen = true;
            this.$nextTick(() => { lucide.createIcons(); });
        },

        openEditModal(post) {
            this.isEditing = true;
            this.form = {
                id: post.id,
                titulo: post.titulo,
                slug: post.slug,
                keyword_principal: post.keyword_principal,
                meta_title: post.meta_title,
                meta_description: post.meta_description,
                contenido: post.contenido,
                publicada: Boolean(post.publicada)
            };
            this.modalOpen = true;
            this.$nextTick(() => { lucide.createIcons(); });
        },

        async togglePublish(postId) {
            try {
                const res = await fetch(`/admin/blog/${postId}/toggle`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    }
                });
                const data = await res.json();
                if (data.success) {
                    window.location.reload();
                }
            } catch (err) {
                console.error(err);
            }
        }
    }
}
</script>
@endsection
