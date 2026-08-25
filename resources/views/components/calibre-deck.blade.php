<div x-data="calibreDeckComponent()" class="space-y-4">
    <!-- List of Calibre Cards -->
    <div class="grid grid-cols-1 gap-3.5">
        <template x-for="(cal, index) in calibres" :key="index">
            <div @click="openModal(cal)"
                 class="group relative bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 hover:border-emerald-500/60 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 flex items-center justify-between cursor-pointer focus:outline-none">
                
                <div class="flex items-center gap-4">
                    <!-- Calibre Badge -->
                    <div class="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/50 flex flex-col items-center justify-center font-display font-extrabold text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform shadow-xs">
                        <span class="text-sm leading-none" x-text="cal.short"></span>
                        <span class="text-[8px] uppercase tracking-tighter opacity-75 font-sans mt-0.5">Calibre</span>
                    </div>

                    <div>
                        <div class="flex items-center gap-2">
                            <h4 class="text-sm sm:text-base font-bold text-zinc-900 dark:text-white font-display group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" x-text="cal.name"></h4>
                            <span class="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400" x-text="cal.weight"></span>
                        </div>
                        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span x-text="cal.use"></span>
                        </p>
                    </div>
                </div>

                <!-- Right Action -->
                <div class="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                    <span class="hidden sm:inline">Ver ficha</span>
                    <i data-lucide="chevron-right" class="w-4 h-4"></i>
                </div>
            </div>
        </template>
    </div>

    <!-- Calibre Detail Modal -->
    <div x-show="modalOpen" x-cloak 
         class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/80 backdrop-blur-md overflow-y-auto"
         x-transition:enter="transition ease-out duration-200"
         x-transition:enter-start="opacity-0"
         x-transition:enter-end="opacity-100"
         x-transition:leave="transition ease-in duration-150"
         x-transition:leave-start="opacity-100"
         x-transition:leave-end="opacity-0">
        
        <div @click.away="modalOpen = false"
             class="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            
            <!-- Close button -->
            <button @click="modalOpen = false" class="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 transition-colors">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>

            <!-- Modal Header -->
            <div class="flex items-start gap-4 pr-10">
                <div class="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/60 flex flex-col items-center justify-center font-display font-extrabold text-emerald-700 dark:text-emerald-400 shrink-0">
                    <span class="text-base" x-text="selectedCalibre?.short"></span>
                    <span class="text-[9px] uppercase tracking-wider font-sans">Palta Hass</span>
                </div>
                <div>
                    <h3 class="text-xl sm:text-2xl font-extrabold font-display text-zinc-900 dark:text-white" x-text="selectedCalibre?.name"></h3>
                    <p class="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5" x-text="'Rango: ' + selectedCalibre?.weight + ' • ' + selectedCalibre?.sizeApprox"></p>
                </div>
            </div>

            <!-- Image & Why Name -->
            <div class="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-zinc-50 dark:bg-zinc-850/60 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div class="sm:col-span-4 flex justify-center">
                    <img :src="selectedCalibre?.image" :alt="selectedCalibre?.name" class="w-36 h-36 object-contain rounded-xl drop-shadow-md">
                </div>
                <div class="sm:col-span-8 space-y-2 text-xs">
                    <h4 class="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">¿Por qué se llama así?</h4>
                    <p class="text-zinc-600 dark:text-zinc-300 leading-relaxed" x-text="selectedCalibre?.whyName"></p>
                    <div class="pt-1">
                        <span class="inline-block bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold px-2.5 py-1 rounded-lg text-[11px]" x-text="'Uso Típico: ' + selectedCalibre?.use"></span>
                    </div>
                </div>
            </div>

            <!-- Technical specs grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/50 dark:border-zinc-750/50 space-y-1.5">
                    <div class="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white">
                        <i data-lucide="sparkles" class="w-4 h-4 text-emerald-500"></i>
                        <span>Materia Seca & Aceite</span>
                    </div>
                    <p class="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed" x-text="selectedCalibre?.dryMatter"></p>
                </div>

                <div class="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/50 dark:border-zinc-750/50 space-y-1.5">
                    <div class="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-white">
                        <i data-lucide="shield-check" class="w-4 h-4 text-emerald-500"></i>
                        <span>Resistencia a la Oxidación</span>
                    </div>
                    <p class="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed" x-text="selectedCalibre?.oxidation"></p>
                </div>
            </div>

            <!-- Highlights -->
            <div class="space-y-2">
                <h4 class="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Beneficios para tu Cocina</h4>
                <ul class="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                    <template x-for="(h, i) in (selectedCalibre?.highlights || [])" :key="i">
                        <li class="flex items-center gap-2">
                            <i data-lucide="check-circle" class="w-4 h-4 text-emerald-500 shrink-0"></i>
                            <span x-text="h"></span>
                        </li>
                    </template>
                </ul>
            </div>

            <!-- Action -->
            <div class="pt-2 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800">
                <button @click="modalOpen = false" class="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-white">
                    Cerrar ficha
                </button>
                <a href="#cotizar" @click="modalOpen = false" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-2">
                    <span>Cotizar este Calibre</span>
                    <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </a>
            </div>
        </div>
    </div>
</div>

<script>
function calibreDeckComponent() {
    return {
        modalOpen: false,
        selectedCalibre: null,

        calibres: [
            {
                name: 'Calibre Súper Extra',
                short: 'SE',
                weight: '260g - 300g por fruto',
                use: 'Hotelería y Eventos Gourmet',
                image: '{{ asset('images/calibre_se.png') }}',
                sizeApprox: '10.5 cm - 12.0 cm de largo',
                whyName: 'Se le denomina "Súper Extra" debido a que supera el estándar comercial de exportación, siendo la categoría de frutos más grandes y vistosos cosechados en el huerto.',
                dryMatter: '24% - 26% (Máxima concentración de aceites naturales)',
                oxidation: 'Baja velocidad de oxidación. Su gran volumen y densidad de pulpa reducen la relación superficie/contacto con el aire, logrando mayor estabilidad post-corte.',
                highlights: [
                    'Presentación visual imponente para buffet y platos gourmet.',
                    'Excelente rendimiento de pulpa limpia por unidad.',
                    'Textura ultra-cremosa ideal para láminas continuas.'
                ]
            },
            {
                name: 'Calibre Extra',
                short: 'EX',
                weight: '220g - 250g por fruto',
                use: 'Restaurantes y Sándwich Premium',
                image: '{{ asset('images/calibre_ex.png') }}',
                sizeApprox: '9.0 cm - 10.5 cm de largo',
                whyName: 'Es el calibre premium estándar internacional. Se le llama "Extra" por ser la clasificación seleccionada con la proporción perfecta entre semilla pequeña y abundante pulpa.',
                dryMatter: '23% - 24% (Excelente cremosidad y untuosidad)',
                oxidation: 'Resistencia media-alta. Mantiene su tono verde brillante por más tiempo gracias a su balance óptimo de acidez y aceites oleicos.',
                highlights: [
                    'Proporción ideal pulpa/cuesco para maximizar el uso.',
                    'Estándar preferido por chefs para cortes en cubos y abanicos.',
                    'Fácil manipulación y pelado uniforme.'
                ]
            },
            {
                name: 'Calibre Primera',
                short: '1A',
                weight: '180g - 210g por fruto',
                use: 'Casinos y Sushi bars',
                image: '{{ asset('images/calibre_1a.png') }}',
                sizeApprox: '8.0 cm - 9.0 cm de largo',
                whyName: 'Clasificado como "Primera" por ser el calibre líder y de mayor consumo masivo en el canal B2B, ofreciendo el balance comercial más eficiente entre costo y rendimiento.',
                dryMatter: '22% - 23% (Gran equilibrio de sabor y humedad)',
                oxidation: 'Oxidación estándar. Se recomienda procesar en frío o aplicar unas gotas de limón si la palta molida va a permanecer expuesta más de 3-4 horas.',
                highlights: [
                    'Excelente relación costo-beneficio para alta producción diaria.',
                    'Tamaño perfecto para rolls de sushi y porciones individuales.',
                    'Maduración homogénea en cámara controlada.'
                ]
            },
            {
                name: 'Calibre Segunda',
                short: '2A',
                weight: '140g - 170g por fruto',
                use: 'Minimarkets y Procesados',
                image: '{{ asset('images/calibre_2a.png') }}',
                sizeApprox: '6.8 cm - 8.0 cm de largo',
                whyName: 'Se le llama "Segunda" debido a su clasificación por calibre físico menor. No afecta su sabor ni calidad nutricional, pero su empaque y precio son más económicos.',
                dryMatter: '21% - 22% (Ligera y de maduración rápida)',
                oxidation: 'Velocidad de oxidación media. Por su tamaño menor, al molerse se aconseja mantener sellado al vacío o consumir rápidamente en el día.',
                highlights: [
                    'El precio más competitivo por kilogramo del catálogo.',
                    'Ideal para preparar aderezos, salsas y guacamole diario.',
                    'Muy rápida maduración para rotación inmediata de stock.'
                ]
            }
        ],

        openModal(cal) {
            this.selectedCalibre = cal;
            this.modalOpen = true;
            this.$nextTick(() => {
                lucide.createIcons();
            });
        }
    }
}
</script>
