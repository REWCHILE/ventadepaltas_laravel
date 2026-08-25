@extends('layouts.admin')

@section('title', 'Dashboard & Métricas B2B')

@section('content')
<div class="space-y-8">
    
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
            <h1 class="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
                Dashboard Comercial & Métricas
            </h1>
            <p class="text-xs sm:text-sm text-zinc-400 mt-1">
                Monitoreo en tiempo real del flujo de cotizaciones mayoristas en la Región Metropolitana.
            </p>
        </div>

        <div class="flex items-center gap-3">
            <a href="{{ route('admin.leads.index') }}" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-md flex items-center gap-2 transition-all">
                <i data-lucide="users" class="w-3.5 h-3.5"></i>
                <span>Ver Todos los Leads</span>
            </a>
        </div>
    </div>

    <!-- System Health Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <i data-lucide="database" class="w-5 h-5"></i>
                </div>
                <div>
                    <h4 class="text-xs font-bold text-white">Base de Datos MySQL</h4>
                    <p class="text-[11px] text-zinc-400">ventadepaltas_db • Operativa</p>
                </div>
            </div>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Conectado
            </span>
        </div>

        <div class="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <i data-lucide="mail" class="w-5 h-5"></i>
                </div>
                <div>
                    <h4 class="text-xs font-bold text-white">Servicio de Correo</h4>
                    <p class="text-[11px] text-zinc-400">Notificaciones automáticas de cotización</p>
                </div>
            </div>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Activo
            </span>
        </div>
    </div>

    <!-- KPI Metric Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div class="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
            <span class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Leads Hoy</span>
            <div class="flex items-baseline justify-between">
                <span class="text-3xl font-extrabold font-display text-white">{{ $kpis['today'] }}</span>
                <span class="text-xs text-emerald-400 font-bold">24 hrs</span>
            </div>
        </div>

        <div class="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
            <span class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Esta Semana</span>
            <div class="flex items-baseline justify-between">
                <span class="text-3xl font-extrabold font-display text-white">{{ $kpis['week'] }}</span>
                <span class="text-xs text-zinc-400">Semana</span>
            </div>
        </div>

        <div class="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
            <span class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Este Mes</span>
            <div class="flex items-baseline justify-between">
                <span class="text-3xl font-extrabold font-display text-white">{{ $kpis['month'] }}</span>
                <span class="text-xs text-zinc-400">Mes</span>
            </div>
        </div>

        <div class="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
            <span class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Total Prospectos</span>
            <div class="flex items-baseline justify-between">
                <span class="text-3xl font-extrabold font-display text-white">{{ $kpis['total'] }}</span>
                <span class="text-xs text-emerald-400 font-bold">Histórico</span>
            </div>
        </div>

        <div class="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 col-span-2 lg:col-span-1">
            <span class="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Kilos Totales</span>
            <div class="flex items-baseline justify-between">
                <span class="text-2xl sm:text-3xl font-extrabold font-display text-emerald-400">
                    {{ number_format($kpis['totalKg'], 0, ',', '.') }}
                </span>
                <span class="text-xs text-zinc-400">kg / mes</span>
            </div>
        </div>

    </div>

    <!-- Distribution Grids -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Comunas Top -->
        <div class="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
            <h3 class="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
                <i data-lucide="map-pin" class="w-4 h-4 text-emerald-500"></i>
                <span>Top Comunas en Santiago</span>
            </h3>
            <div class="space-y-3">
                @forelse($comunaStats as $c)
                <div>
                    <div class="flex justify-between text-xs mb-1">
                        <span class="font-medium text-zinc-300">{{ $c->comuna }}</span>
                        <span class="font-bold text-emerald-400">{{ $c->count }} cotiz.</span>
                    </div>
                    <div class="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div class="bg-emerald-500 h-full rounded-full" style="width: {{ min(100, ($c->count / max(1, $kpis['total'])) * 100) }}%"></div>
                    </div>
                </div>
                @empty
                <p class="text-xs text-zinc-500 text-center py-4">Sin datos registrados</p>
                @endforelse
            </div>
        </div>

        <!-- Tipo de Cliente -->
        <div class="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
            <h3 class="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
                <i data-lucide="pie-chart" class="w-4 h-4 text-emerald-500"></i>
                <span>Distribución por Segmento</span>
            </h3>
            <div class="space-y-2.5 text-xs">
                @forelse($clientTypeStats as $t)
                <div class="p-2.5 rounded-xl bg-zinc-850 border border-zinc-800 flex items-center justify-between">
                    <span class="font-semibold text-zinc-300 capitalize">{{ $t->tipo_cliente }}</span>
                    <span class="font-extrabold text-white px-2 py-0.5 rounded-md bg-zinc-800">{{ $t->count }}</span>
                </div>
                @empty
                <p class="text-xs text-zinc-500 text-center py-4">Sin datos registrados</p>
                @endforelse
            </div>
        </div>

        <!-- Origen SEO Landing -->
        <div class="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
            <h3 class="text-sm font-bold text-white font-display uppercase tracking-wider flex items-center gap-2">
                <i data-lucide="globe" class="w-4 h-4 text-emerald-500"></i>
                <span>Páginas de Origen con Conversión</span>
            </h3>
            <div class="space-y-2.5 text-xs">
                @forelse($pageStats as $p)
                <div class="p-2.5 rounded-xl bg-zinc-850 border border-zinc-800 flex items-center justify-between">
                    <span class="font-mono text-zinc-400 truncate max-w-[170px]">{{ $p->pagina_origen }}</span>
                    <span class="font-extrabold text-emerald-400">{{ $p->count }} leads</span>
                </div>
                @empty
                <p class="text-xs text-zinc-500 text-center py-4">Sin datos registrados</p>
                @endforelse
            </div>
        </div>

    </div>

    <!-- Recent Leads Stream -->
    <div class="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
        <div class="flex items-center justify-between">
            <h3 class="text-base font-bold text-white font-display">
                Últimas Solicitudes Ingresadas
            </h3>
            <a href="{{ route('admin.leads.index') }}" class="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                <span>Gestionar en CRM</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </a>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
                <thead>
                    <tr class="border-b border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                        <th class="pb-3">Fecha</th>
                        <th class="pb-3">Empresa</th>
                        <th class="pb-3">Contacto</th>
                        <th class="pb-3">Comuna</th>
                        <th class="pb-3">Volumen</th>
                        <th class="pb-3">Estado</th>
                        <th class="pb-3 text-right">Acción</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-zinc-800/60">
                    @forelse($recentLeads as $lead)
                    <tr class="hover:bg-zinc-850/50 transition-colors">
                        <td class="py-3.5 text-zinc-400 font-mono text-[11px]">{{ $lead->created_at->format('d/m H:i') }}</td>
                        <td class="py-3.5 font-bold text-white">{{ $lead->empresa }}</td>
                        <td class="py-3.5 text-zinc-300">
                            <div>{{ $lead->nombre }}</div>
                            <div class="text-[11px] text-zinc-500">{{ $lead->telefono }}</div>
                        </td>
                        <td class="py-3.5 text-zinc-300">{{ $lead->comuna }}</td>
                        <td class="py-3.5 font-extrabold text-emerald-400">{{ number_format($lead->cantidad_estimada_kg, 0, ',', '.') }} kg</td>
                        <td class="py-3.5">
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
                        <td class="py-3.5 text-right">
                            <a href="{{ route('admin.leads.index') }}" class="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors inline-block">
                                <i data-lucide="eye" class="w-4 h-4"></i>
                            </a>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="7" class="py-8 text-center text-zinc-500">No hay prospectos ingresados</td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

</div>
@endsection
