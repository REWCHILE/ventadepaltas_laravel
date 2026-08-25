@props([
    'paginaOrigen' => request()->getPathInfo(),
    'title' => 'Cotizador B2B Inteligente',
    'subtitle' => 'Cotiza tu abastecimiento al por mayor. Flota exclusiva para la Región Metropolitana.'
])

<div x-data="leadFormComponent('{{ $paginaOrigen }}')" class="relative bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 p-6 sm:p-8 shadow-xl shadow-zinc-950/5">
    
    <!-- Header -->
    <div class="mb-6">
        <div class="flex items-center gap-2 mb-2">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                <i data-lucide="calculator" class="w-3 h-3"></i> Cotización Directa
            </span>
        </div>
        <h3 class="text-xl sm:text-2xl font-extrabold font-display text-zinc-900 dark:text-white">
            {{ $title }}
        </h3>
        <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
            {{ $subtitle }}
        </p>
    </div>

    <!-- Feedback Alerts -->
    <div x-show="error" x-cloak class="mb-5 p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-2xl flex items-start gap-3 text-rose-800 dark:text-rose-300 text-xs">
        <i data-lucide="alert-circle" class="w-4 h-4 mt-0.5 shrink-0 text-rose-600 dark:text-rose-400"></i>
        <span x-text="error"></span>
    </div>

    <div x-show="success" x-cloak class="p-8 text-center space-y-4">
        <div class="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/30 animate-bounce">
            <i data-lucide="check-circle" class="w-8 h-8"></i>
        </div>
        <h4 class="text-xl font-bold font-display text-zinc-900 dark:text-white">¡Cotización Enviada con Éxito!</h4>
        <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed" x-text="successMessage"></p>
        <div class="pt-4">
            <button @click="resetForm()" class="px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold hover:bg-zinc-200 transition-colors">
                Realizar otra cotización
            </button>
        </div>
    </div>

    <!-- Form -->
    <form x-show="!success" @submit.prevent="submitForm()" class="space-y-4">
        @csrf

        <!-- Row 1: Nombre & Empresa -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                    Tu Nombre y Apellido *
                </label>
                <input type="text" x-model="form.nombre" required placeholder="Ej: Juan Pérez"
                       class="w-full bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all">
            </div>
            <div>
                <label class="block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                    Nombre de tu Empresa / Negocio *
                </label>
                <input type="text" x-model="form.empresa" required placeholder="Ej: Restaurant El Valle"
                       class="w-full bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all">
            </div>
        </div>

        <!-- Row 2: Correo & Teléfono -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label class="block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                    Correo Electrónico *
                </label>
                <input type="email" x-model="form.email" required placeholder="contacto@tuempresa.cl"
                       class="w-full bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all">
            </div>
            <div>
                <label class="block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                    Teléfono / WhatsApp *
                </label>
                <input type="tel" x-model="form.telefono" required placeholder="+56 9 8765 4321"
                       class="w-full bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all">
            </div>
        </div>

        <!-- Row 3: Comuna Santiago (Searchable dropdown) -->
        <div class="relative" @click.away="comunaDropdownOpen = false">
            <label class="block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                Comuna de Entrega (Región Metropolitana) *
            </label>
            <div class="relative">
                <input type="text" x-model="comunaSearch" @focus="comunaDropdownOpen = true" @input="comunaDropdownOpen = true"
                       placeholder="Escribe o selecciona tu comuna..."
                       class="w-full bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all pr-10">
                <button type="button" @click="comunaDropdownOpen = !comunaDropdownOpen" class="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600">
                    <i data-lucide="chevron-down" class="w-4 h-4"></i>
                </button>
            </div>

            <!-- Dropdown List -->
            <div x-show="comunaDropdownOpen" x-cloak class="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-1 shadow-xl z-30 space-y-0.5">
                <template x-for="c in filteredComunas" :key="c">
                    <button type="button" @click="selectComuna(c)"
                            class="w-full text-left px-3 py-1.5 rounded-lg text-xs hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center justify-between"
                            :class="form.comuna === c ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 font-bold' : 'text-zinc-700 dark:text-zinc-200'">
                        <span x-text="c"></span>
                        <i data-lucide="check" class="w-3 h-3 text-emerald-500" x-show="form.comuna === c"></i>
                    </button>
                </template>
                <div x-show="filteredComunas.length === 0" class="p-3 text-center text-xs text-zinc-400">
                    No se encontró la comuna
                </div>
            </div>
        </div>

        <!-- Row 4: Cantidad Estimada Mensual (Presets) -->
        <div>
            <div class="flex items-center justify-between mb-1.5">
                <label class="block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Cantidad Estimada Mensual (Kilogramos) *
                </label>
                <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold" x-show="form.cantidad_estimada_kg > 0" x-text="form.cantidad_estimada_kg + ' kg / mes'"></span>
            </div>

            <!-- Presets buttons -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                <button type="button" @click="setPreset('100')"
                        class="px-3 py-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer"
                        :class="form.cantidad_estimada_kg == '100' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 shadow-xs' : 'border-zinc-200 dark:border-zinc-750 bg-zinc-50 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400'">
                    100 kg <span class="block text-[10px] font-normal text-zinc-500">Pyme / Sushi</span>
                </button>
                <button type="button" @click="setPreset('500')"
                        class="px-3 py-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer"
                        :class="form.cantidad_estimada_kg == '500' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 shadow-xs' : 'border-zinc-200 dark:border-zinc-750 bg-zinc-50 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400'">
                    500 kg <span class="block text-[10px] font-normal text-zinc-500">Restaurante</span>
                </button>
                <button type="button" @click="setPreset('1000')"
                        class="px-3 py-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer"
                        :class="form.cantidad_estimada_kg == '1000' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 shadow-xs' : 'border-zinc-200 dark:border-zinc-750 bg-zinc-50 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400'">
                    1.000 kg+ <span class="block text-[10px] font-normal text-zinc-500">Casino / Hotel</span>
                </button>
                <button type="button" @click="isCustomQty = true"
                        class="px-3 py-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer"
                        :class="isCustomQty ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' : 'border-zinc-200 dark:border-zinc-750 bg-zinc-50 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400'">
                    Personalizado <span class="block text-[10px] font-normal text-zinc-500">Otro volumen</span>
                </button>
            </div>

            <!-- Custom Input -->
            <div x-show="isCustomQty" x-cloak class="mt-2">
                <input type="number" min="1" step="10" x-model="form.cantidad_estimada_kg" placeholder="Ingresa los kilos mensuales que requieres..."
                       class="w-full bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all">
            </div>
        </div>

        <!-- Row 5: Tipo de Cliente -->
        <div>
            <label class="block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                Tipo de Negocio o Actividad *
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <template x-for="t in clientTypes" :key="t.id">
                    <button type="button" @click="form.tipo_cliente = t.id"
                            class="p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer"
                            :class="form.tipo_cliente === t.id ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold' : 'border-zinc-200 dark:border-zinc-750 bg-zinc-50 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400'">
                        <span x-text="t.icon"></span>
                        <span x-text="t.name"></span>
                    </button>
                </template>
            </div>
        </div>

        <!-- Row 6: Mensaje Opcional -->
        <div>
            <label class="block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1.5">
                Requerimientos Especiales (Opcional)
            </label>
            <textarea x-model="form.mensaje" rows="2" placeholder="Ej: Calibre preferido (Extra o Primera), frecuencia de despacho requerida..."
                      class="w-full bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700/80 rounded-xl px-3.5 py-2 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"></textarea>
        </div>

        <!-- Submit Button -->
        <button type="submit" :disabled="loading"
                class="w-full cursor-pointer bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-600/20 hover:shadow-xl flex items-center justify-center gap-2 transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed">
            <template x-if="loading">
                <span class="flex items-center gap-2">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando cotización...
                </span>
            </template>
            <template x-if="!loading">
                <span class="flex items-center gap-2">
                    <span>Solicitar Cotización Mayorista</span>
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </span>
            </template>
        </button>

        <p class="text-[10px] text-center text-zinc-400 dark:text-zinc-500">
            🔒 Tus datos se encuentran seguros. Despacho y facturación 100% formal para empresas en Santiago.
        </p>
    </form>
</div>

<script>
function leadFormComponent(paginaOrigen) {
    return {
        paginaOrigen: paginaOrigen,
        loading: false,
        error: null,
        success: false,
        successMessage: '',
        isCustomQty: false,
        comunaDropdownOpen: false,
        comunaSearch: '',
        
        comunasSantiago: [
            'Cerrillos', 'Cerro Navia', 'Conchalí', 'El Bosque', 'Estación Central',
            'Huechuraba', 'Independencia', 'La Cisterna', 'La Florida', 'La Granja', 'La Pintana',
            'La Reina', 'Las Condes', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú',
            'Ñuñoa', 'Pedro Aguirre Cerda', 'Peñalolén', 'Providencia', 'Pudahuel', 'Quilicura',
            'Quinta Normal', 'Recoleta', 'Renca', 'San Joaquín', 'San Miguel', 'San Ramón',
            'Vitacura', 'Puente Alto', 'Pirque', 'San José de Maipo', 'San Bernardo', 'Calera de Tango',
            'Buin', 'Paine', 'Melipilla', 'Alhué', 'Curacaví', 'María Pinto', 'San Pedro',
            'Talagante', 'El Monte', 'Isla de Maipo', 'Padre Hurtado', 'Peñaflor', 'Colina',
            'Lampa', 'Tiltil'
        ].sort(),

        clientTypes: [
            { id: 'restaurante', name: 'Restaurante / Sushi', icon: '🍣' },
            { id: 'casino', name: 'Casino / Catering', icon: '🏢' },
            { id: 'hotel', name: 'Hotel / Eventos', icon: '🏨' },
            { id: 'minimarket', name: 'Minimarket / Frutería', icon: '🏪' },
            { id: 'empresa', name: 'Empresa / Oficina', icon: '💼' },
            { id: 'distribuidor', name: 'Distribuidor / Otro', icon: '📦' },
        ],

        form: {
            nombre: '',
            empresa: '',
            email: '',
            telefono: '',
            comuna: '',
            region: 'Metropolitana',
            cantidad_estimada_kg: '100',
            tipo_cliente: 'restaurante',
            mensaje: '',
            pagina_origen: paginaOrigen,
            utm_source: '',
            utm_medium: '',
            utm_campaign: '',
        },

        init() {
            // Capture UTM parameters from URL
            const urlParams = new URLSearchParams(window.location.search);
            this.form.utm_source = urlParams.get('utm_source') || '';
            this.form.utm_medium = urlParams.get('utm_medium') || '';
            this.form.utm_campaign = urlParams.get('utm_campaign') || '';
            
            this.$nextTick(() => {
                lucide.createIcons();
            });
        },

        get filteredComunas() {
            if (!this.comunaSearch.trim()) return this.comunasSantiago;
            return this.comunasSantiago.filter(c => c.toLowerCase().includes(this.comunaSearch.toLowerCase()));
        },

        selectComuna(c) {
            this.form.comuna = c;
            this.comunaSearch = c;
            this.comunaDropdownOpen = false;
        },

        setPreset(qty) {
            this.isCustomQty = false;
            this.form.cantidad_estimada_kg = qty;
        },

        async submitForm() {
            this.loading = true;
            this.error = null;

            if (!this.form.comuna) {
                this.error = 'Por favor selecciona la comuna de entrega en Santiago.';
                this.loading = false;
                return;
            }

            try {
                const response = await fetch('{{ route('leads.submit') }}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    body: JSON.stringify(this.form)
                });

                const data = await response.json();

                if (!response.ok) {
                    if (data.errors) {
                        const firstError = Object.values(data.errors)[0][0];
                        throw new Error(firstError);
                    }
                    throw new Error(data.message || 'Error al procesar la cotización.');
                }

                this.success = true;
                this.successMessage = data.message || '¡Tu solicitud ha sido recibida con éxito!';
            } catch (err) {
                this.error = err.message || 'Ocurrió un error inesperado al enviar la solicitud.';
            } finally {
                this.loading = false;
                this.$nextTick(() => {
                    lucide.createIcons();
                });
            }
        },

        resetForm() {
            this.success = false;
            this.form.nombre = '';
            this.form.empresa = '';
            this.form.email = '';
            this.form.telefono = '';
            this.form.comuna = '';
            this.comunaSearch = '';
            this.form.mensaje = '';
        }
    }
}
</script>
