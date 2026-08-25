@extends('layouts.admin')

@section('title', 'CRM de Leads & Prospectos')

@section('content')
<div x-data="crmLeadsComponent()" class="space-y-6">
    
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
                CRM de Leads B2B
            </h1>
            <p class="text-xs sm:text-sm text-zinc-400 mt-1">
                Seguimiento comercial, auditoría de estados y bitácora de notas de cotizaciones.
            </p>
        </div>

        <div class="flex items-center gap-3">
            <a href="{{ route('admin.leads.export') }}" class="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-200 hover:text-white text-xs font-bold border border-zinc-700 flex items-center gap-2 transition-all">
                <i data-lucide="download" class="w-4 h-4 text-emerald-400"></i>
                <span>Exportar CSV / Excel</span>
            </a>
        </div>
    </div>

    <!-- Status Filter Pills -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        <a href="{{ route('admin.leads.index') }}"
           class="px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-colors {{ !request('estado') ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white' }}">
            Todos ({{ $stats['total'] }})
        </a>
        <a href="{{ route('admin.leads.index', ['estado' => 'Nuevo']) }}"
           class="px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-colors {{ request('estado') === 'Nuevo' ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white' }}">
            Nuevos ({{ $stats['nuevos'] }})
        </a>
        <a href="{{ route('admin.leads.index', ['estado' => 'Contactado']) }}"
           class="px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-colors {{ request('estado') === 'Contactado' ? 'bg-blue-500 text-white' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white' }}">
            Contactados ({{ $stats['contactados'] }})
        </a>
        <a href="{{ route('admin.leads.index', ['estado' => 'Cotización enviada']) }}"
           class="px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-colors {{ request('estado') === 'Cotización enviada' ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white' }}">
            Cotizados ({{ $stats['cotizados'] }})
        </a>
        <a href="{{ route('admin.leads.index', ['estado' => 'Negociación']) }}"
           class="px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-colors {{ request('estado') === 'Negociación' ? 'bg-purple-500 text-white' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white' }}">
            Negociación ({{ $stats['negociacion'] }})
        </a>
        <a href="{{ route('admin.leads.index', ['estado' => 'Cliente']) }}"
           class="px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-colors {{ request('estado') === 'Cliente' ? 'bg-teal-500 text-white' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white' }}">
            Clientes ({{ $stats['clientes'] }})
        </a>
        <a href="{{ route('admin.leads.index', ['estado' => 'Perdido']) }}"
           class="px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-colors {{ request('estado') === 'Perdido' ? 'bg-rose-500 text-white' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white' }}">
            Perdidos ({{ $stats['perdidos'] }})
        </a>
    </div>

    <!-- Search & Type Filter Bar -->
    <div class="p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
        <form action="{{ route('admin.leads.index') }}" method="GET" class="grid grid-cols-1 sm:grid-cols-12 gap-3">
            @if(request('estado'))
                <input type="hidden" name="estado" value="{{ request('estado') }}">
            @endif

            <div class="sm:col-span-8 relative">
                <input type="text" name="search" value="{{ request('search') }}" placeholder="Buscar por empresa, contacto, email, teléfono o comuna..."
                       class="w-full bg-zinc-850 border border-zinc-750 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-500 outline-none">
            </div>

            <div class="sm:col-span-3">
                <select name="tipo_cliente" class="w-full bg-zinc-850 border border-zinc-750 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:ring-2 focus:ring-emerald-500 outline-none">
                    <option value="">Todos los Segmentos</option>
                    <option value="restaurante" {{ request('tipo_cliente') == 'restaurante' ? 'selected' : '' }}>Restaurantes / Sushis</option>
                    <option value="casino" {{ request('tipo_cliente') == 'casino' ? 'selected' : '' }}>Casinos / Catering</option>
                    <option value="hotel" {{ request('tipo_cliente') == 'hotel' ? 'selected' : '' }}>Hoteles / Eventos</option>
                    <option value="minimarket" {{ request('tipo_cliente') == 'minimarket' ? 'selected' : '' }}>Minimarkets</option>
                    <option value="empresa" {{ request('tipo_cliente') == 'empresa' ? 'selected' : '' }}>Empresas / Oficinas</option>
                    <option value="distribuidor" {{ request('tipo_cliente') == 'distribuidor' ? 'selected' : '' }}>Distribuidores / Otro</option>
                </select>
            </div>

            <div class="sm:col-span-1">
                <button type="submit" class="w-full h-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center">
                    <i data-lucide="search" class="w-4 h-4"></i>
                </button>
            </div>
        </form>
    </div>

    <!-- Leads Table -->
    <div class="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead class="bg-zinc-850/80 border-b border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                        <th class="p-4">Fecha</th>
                        <th class="p-4">Empresa</th>
                        <th class="p-4">Contacto & Teléfono</th>
                        <th class="p-4">Comuna</th>
                        <th class="p-4">Volumen</th>
                        <th class="p-4">Segmento</th>
                        <th class="p-4">Estado</th>
                        <th class="p-4 text-right">Detalles</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-zinc-800/60">
                    @forelse($leads as $lead)
                    <tr class="hover:bg-zinc-850/50 transition-colors">
                        <td class="p-4 text-zinc-400 font-mono text-[11px]">{{ $lead->created_at->format('d/m/y H:i') }}</td>
                        <td class="p-4 font-bold text-white">{{ $lead->empresa }}</td>
                        <td class="p-4 text-zinc-300">
                            <div class="font-semibold">{{ $lead->nombre }}</div>
                            <a href="tel:{{ $lead->telefono }}" class="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 mt-0.5">
                                <i data-lucide="phone" class="w-3 h-3"></i> {{ $lead->telefono }}
                            </a>
                        </td>
                        <td class="p-4 text-zinc-300">{{ $lead->comuna }}</td>
                        <td class="p-4 font-extrabold text-emerald-400 text-sm">
                            {{ number_format($lead->cantidad_estimada_kg, 0, ',', '.') }} kg
                        </td>
                        <td class="p-4 capitalize text-zinc-300">
                            <span class="px-2 py-0.5 bg-zinc-800 rounded-md text-[10px] font-semibold text-zinc-400">{{ $lead->tipo_cliente }}</span>
                        </td>
                        <td class="p-4">
                            @php
                                $statusColors = [
                                    'Nuevo' => 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
                                    'Contactado' => 'bg-blue-500/20 text-blue-400 border-blue-500/30',
                                    'Cotización enviada' => 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                                    'Negociación' => 'bg-purple-500/20 text-purple-400 border-purple-500/30',
                                    'Cliente' => 'bg-teal-500/20 text-teal-400 border-teal-500/30',
                                    'Perdido' => 'bg-rose-500/20 text-rose-400 border-rose-500/30',
                                ];
                            @endphp
                            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold border {{ $statusColors[$lead->estado] ?? 'bg-zinc-800 text-zinc-400' }}">
                                {{ $lead->estado }}
                            </span>
                        </td>
                        <td class="p-4 text-right">
                            <button @click="openLeadModal({{ $lead->id }})" class="px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-200 hover:text-white hover:bg-emerald-600 transition-all font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer">
                                <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                                <span>Ver</span>
                            </button>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="8" class="p-12 text-center text-zinc-500">
                            No se encontraron leads con los filtros seleccionados.
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <div class="p-4 border-t border-zinc-800 flex justify-center">
            {{ $leads->links() }}
        </div>
    </div>

    <!-- Lead Detail Modal / Drawer -->
    <div x-show="modalOpen" x-cloak 
         class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/80 backdrop-blur-md overflow-y-auto"
         x-transition:enter="transition ease-out duration-200"
         x-transition:enter-start="opacity-0"
         x-transition:enter-end="opacity-100"
         x-transition:leave="transition ease-in duration-150"
         x-transition:leave-start="opacity-100"
         x-transition:leave-end="opacity-0">
        
        <div @click.away="modalOpen = false"
             class="relative w-full max-w-3xl bg-zinc-900 rounded-3xl border border-zinc-800 p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            
            <!-- Close Button -->
            <button @click="modalOpen = false" class="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white bg-zinc-800 transition-colors">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>

            <!-- Loading Spinner -->
            <div x-show="loadingLead" class="py-20 text-center space-y-3">
                <div class="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full mx-auto"></div>
                <p class="text-xs text-zinc-400">Cargando información del lead...</p>
            </div>

            <!-- Lead Content -->
            <div x-show="!loadingLead && selectedLead" class="space-y-6">
                
                <!-- Header -->
                <div class="flex items-start justify-between pr-10 border-b border-zinc-800 pb-4">
                    <div>
                        <div class="flex items-center gap-2">
                            <h3 class="text-xl font-extrabold font-display text-white" x-text="selectedLead?.empresa"></h3>
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 capitalize" x-text="selectedLead?.tipo_cliente"></span>
                        </div>
                        <p class="text-xs text-zinc-400 mt-1" x-text="'Contacto: ' + selectedLead?.nombre + ' • Ingresado el ' + formatDate(selectedLead?.created_at)"></p>
                    </div>
                </div>

                <!-- Info Grid -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-zinc-850/60 p-4 rounded-2xl border border-zinc-800">
                    <div>
                        <span class="text-zinc-500 block text-[10px] uppercase font-bold">Teléfono / WhatsApp</span>
                        <a :href="'tel:' + selectedLead?.telefono" class="font-bold text-emerald-400 hover:underline" x-text="selectedLead?.telefono"></a>
                    </div>
                    <div>
                        <span class="text-zinc-500 block text-[10px] uppercase font-bold">Correo</span>
                        <a :href="'mailto:' + selectedLead?.email" class="font-bold text-zinc-200 hover:underline truncate block" x-text="selectedLead?.email"></a>
                    </div>
                    <div>
                        <span class="text-zinc-500 block text-[10px] uppercase font-bold">Comuna & Región</span>
                        <span class="font-bold text-white" x-text="selectedLead?.comuna + ' (' + selectedLead?.region + ')'"></span>
                    </div>
                    <div>
                        <span class="text-zinc-500 block text-[10px] uppercase font-bold">Volumen Estimado</span>
                        <span class="font-extrabold text-emerald-400 text-sm" x-text="selectedLead?.cantidad_estimada_kg + ' kg / mes'"></span>
                    </div>
                </div>

                <!-- Mensaje & Origen -->
                <div class="space-y-2 text-xs">
                    <div class="p-3.5 bg-zinc-850 rounded-xl border border-zinc-800">
                        <strong class="block text-zinc-400 text-[10px] uppercase mb-1">Requerimientos o Mensaje del Cliente:</strong>
                        <p class="text-zinc-200" x-text="selectedLead?.mensaje || 'Sin requerimientos adicionales indicados'"></p>
                    </div>
                    
                    <div class="flex items-center justify-between text-[11px] text-zinc-500 px-2">
                        <span>Página Origen: <strong class="text-zinc-300 font-mono" x-text="selectedLead?.pagina_origen"></strong></span>
                        <span x-show="selectedLead?.utm_source" x-text="'Campaña: ' + selectedLead?.utm_source + ' / ' + (selectedLead?.utm_campaign || 'N/A')"></span>
                    </div>
                </div>

                <!-- Status Update Section -->
                <div class="p-4 rounded-2xl bg-zinc-850 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h4 class="font-bold text-white text-xs">Estado Comercial del Lead</h4>
                        <p class="text-[11px] text-zinc-400">Actualiza el estado para registrarlo en la auditoría de seguimiento.</p>
                    </div>
                    <div class="flex items-center gap-2 w-full sm:w-auto">
                        <select x-model="newStatus" class="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:ring-2 focus:ring-emerald-500 outline-none">
                            <option value="Nuevo">Nuevo</option>
                            <option value="Contactado">Contactado</option>
                            <option value="Cotización enviada">Cotización enviada</option>
                            <option value="Negociación">Negociación</option>
                            <option value="Cliente">Cliente</option>
                            <option value="Perdido">Perdido</option>
                        </select>
                        <button @click="updateStatus()" :disabled="updatingStatus"
                                class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all disabled:opacity-50">
                            <span x-text="updatingStatus ? 'Guardando...' : 'Cambiar'"></span>
                        </button>
                    </div>
                </div>

                <!-- Notes and History Tabs -->
                <div class="space-y-4">
                    <!-- Note Creator -->
                    <div class="space-y-2">
                        <label class="block text-xs font-bold text-white uppercase tracking-wider">
                            Bitácora de Notas Internas
                        </label>
                        <div class="flex gap-2">
                            <input type="text" x-model="newNoteText" placeholder="Escribe una nota interna sobre esta negociación..."
                                   class="w-full bg-zinc-850 border border-zinc-750 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-500 outline-none">
                            <button @click="addNote()" :disabled="addingNote || !newNoteText.trim()"
                                    class="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-emerald-600 text-white font-bold text-xs transition-all disabled:opacity-50 shrink-0">
                                <span x-text="addingNote ? 'Agregando...' : 'Agregar Nota'"></span>
                            </button>
                        </div>
                    </div>

                    <!-- Notes List -->
                    <div class="space-y-2 max-h-40 overflow-y-auto">
                        <template x-for="note in (selectedLead?.notes || [])" :key="note.id">
                            <div class="p-3 bg-zinc-850 rounded-xl border border-zinc-800/80 text-xs space-y-1">
                                <div class="flex items-center justify-between text-[10px] text-zinc-400">
                                    <span class="font-bold text-emerald-400" x-text="note.user?.name || 'Administrador'"></span>
                                    <span x-text="formatDate(note.created_at)"></span>
                                </div>
                                <p class="text-zinc-200" x-text="note.nota"></p>
                            </div>
                        </template>
                        <div x-show="!selectedLead?.notes || selectedLead?.notes.length === 0" class="text-center py-3 text-xs text-zinc-500">
                            No hay notas registradas para este lead.
                        </div>
                    </div>

                    <!-- History Audit Log -->
                    <div class="pt-3 border-t border-zinc-800 space-y-2">
                        <h5 class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Historial de Auditoría de Estados</h5>
                        <div class="space-y-1.5 max-h-32 overflow-y-auto">
                            <template x-for="h in (selectedLead?.history || [])" :key="h.id">
                                <div class="flex items-center justify-between text-[11px] py-1 border-b border-zinc-800/40 text-zinc-400">
                                    <span x-text="h.descripcion"></span>
                                    <span class="font-mono text-[10px]" x-text="formatDate(h.created_at)"></span>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</div>

<script>
function crmLeadsComponent() {
    return {
        modalOpen: false,
        loadingLead: false,
        selectedLead: null,
        newStatus: '',
        newNoteText: '',
        updatingStatus: false,
        addingNote: false,

        async openLeadModal(leadId) {
            this.modalOpen = true;
            this.loadingLead = true;
            this.selectedLead = null;

            try {
                const res = await fetch(`/admin/leads/${leadId}`);
                const data = await res.json();
                if (data.success) {
                    this.selectedLead = data.lead;
                    this.newStatus = data.lead.estado;
                }
            } catch (err) {
                console.error(err);
            } finally {
                this.loadingLead = false;
                this.$nextTick(() => {
                    lucide.createIcons();
                });
            }
        },

        async updateStatus() {
            if (!this.selectedLead) return;
            this.updatingStatus = true;

            try {
                const res = await fetch(`/admin/leads/${this.selectedLead.id}/status`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    body: JSON.stringify({ estado: this.newStatus })
                });

                const data = await res.json();
                if (data.success) {
                    this.selectedLead = data.lead;
                    // Reload window to sync main list
                    window.location.reload();
                }
            } catch (err) {
                console.error(err);
            } finally {
                this.updatingStatus = false;
            }
        },

        async addNote() {
            if (!this.selectedLead || !this.newNoteText.trim()) return;
            this.addingNote = true;

            try {
                const res = await fetch(`/admin/leads/${this.selectedLead.id}/notes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    body: JSON.stringify({ nota: this.newNoteText })
                });

                const data = await res.json();
                if (data.success) {
                    if (!this.selectedLead.notes) this.selectedLead.notes = [];
                    this.selectedLead.notes.unshift(data.note);
                    this.newNoteText = '';
                }
            } catch (err) {
                console.error(err);
            } finally {
                this.addingNote = false;
            }
        },

        formatDate(dateStr) {
            if (!dateStr) return '';
            const d = new Date(dateStr);
            return d.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        }
    }
}
</script>
@endsection
