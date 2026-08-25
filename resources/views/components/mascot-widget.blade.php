<div x-data="mascotWidgetComponent()" class="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 font-sans">
    
    <!-- Speech Bubble Card -->
    <div x-show="isOpen" x-cloak
         x-transition:enter="transition ease-out duration-300 transform"
         x-transition:enter-start="opacity-0 translate-y-4 scale-95"
         x-transition:enter-end="opacity-100 translate-y-0 scale-100"
         x-transition:leave="transition ease-in duration-200 transform"
         x-transition:leave-start="opacity-100 translate-y-0 scale-100"
         x-transition:leave-end="opacity-0 translate-y-4 scale-95"
         class="absolute bottom-20 right-0 sm:bottom-0 sm:right-20 w-[290px] sm:w-[320px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-2xl z-50">
        
        <!-- Triangle indicator -->
        <div class="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-zinc-900 border-r border-b border-zinc-200 dark:border-zinc-800 rotate-45 sm:hidden"></div>
        <div class="absolute bottom-6 -right-2 w-4 h-4 bg-white dark:bg-zinc-900 border-t border-r border-zinc-200 dark:border-zinc-800 rotate-45 hidden sm:block"></div>

        <!-- Close button -->
        <button @click="closeBubble()" class="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition-colors" aria-label="Cerrar mensaje">
            <i data-lucide="x" class="w-4 h-4"></i>
        </button>

        <div class="relative z-10">
            <!-- Header -->
            <div class="flex items-center gap-2 mb-2">
                <span class="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200/50 dark:border-emerald-800/40">
                    <i data-lucide="sparkles" class="w-3 h-3"></i> Mascota Oficial
                </span>
                <span class="text-xs font-bold text-zinc-900 dark:text-white">Soy Paltín</span>
            </div>

            <!-- Content -->
            <h4 class="text-sm font-bold text-zinc-900 dark:text-white leading-snug">
                ¡Hola! ¿Buscando palta Hass premium para tu negocio?
            </h4>
            <p class="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                Te ayudo a cotizar al por mayor con despacho directo y exclusivo en la Región Metropolitana. ¡Merma cero garantizada!
            </p>

            <!-- Action -->
            <button @click="scrollToForm()"
                    class="mt-3.5 w-full cursor-pointer bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 active:scale-95 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all">
                <span>Cotizar Mayorista</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
        </div>
    </div>

    <!-- Mascot Circle Floating Badge -->
    <div class="flex items-center gap-2.5">
        <!-- Label on hover (Desktop) -->
        <div x-show="!isOpen" x-cloak class="hidden md:block bg-zinc-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg border border-zinc-800 pointer-events-none">
            ¿Cotizar Palta Hass?
        </div>

        <button @click="isOpen = !isOpen"
                class="group relative h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white dark:bg-zinc-900 border-2 border-emerald-500 shadow-xl shadow-emerald-500/20 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
                aria-label="Abrir asistente de cotización">
            
            <img src="{{ asset('images/avocado_mascot.png') }}" alt="Paltín" class="w-11 h-11 sm:w-12 sm:h-12 object-contain group-hover:rotate-6 transition-transform">
            
            <!-- Online status green ping -->
            <span class="absolute top-0 right-0 flex h-4 w-4">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white dark:border-zinc-900"></span>
            </span>
        </button>
    </div>
</div>

<script>
function mascotWidgetComponent() {
    return {
        isOpen: false,

        init() {
            const isClosed = sessionStorage.getItem('paltin-bubble-closed') === 'true';
            if (!isClosed) {
                setTimeout(() => {
                    this.isOpen = true;
                    this.$nextTick(() => {
                        lucide.createIcons();
                    });
                }, 3000);
            }
        },

        closeBubble() {
            this.isOpen = false;
            sessionStorage.setItem('paltin-bubble-closed', 'true');
        },

        scrollToForm() {
            this.isOpen = false;
            sessionStorage.setItem('paltin-bubble-closed', 'true');
            const el = document.getElementById('cotizar');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.location.href = '{{ route('contacto') }}';
            }
        }
    }
}
</script>
