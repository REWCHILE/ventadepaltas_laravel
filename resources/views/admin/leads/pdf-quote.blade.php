<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cotización #COT-{{ str_pad($lead->id, 5, '0', STR_PAD_LEFT) }} - {{ $lead->empresa }} | VENTADEPALTAS.CL</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>

    <style>
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background: #f4f4f5;
            color: #18181b;
        }
        .font-display {
            font-family: 'Outfit', sans-serif;
        }
        @media print {
            .no-print {
                display: none !important;
            }
            body {
                background: white !important;
                padding: 0 !important;
            }
            .page-container {
                box-shadow: none !important;
                border: none !important;
                margin: 0 !important;
                width: 100% !important;
                max-width: 100% !important;
                padding: 0 !important;
            }
        }
    </style>
</head>
<body class="p-4 sm:p-8 min-h-screen">

    <!-- Top Action Bar (hidden on print) -->
    <div class="no-print max-w-4xl mx-auto mb-6 flex items-center justify-between bg-white p-4 rounded-2xl border border-zinc-200 shadow-sm">
        <a href="{{ route('admin.leads.index') }}" class="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-zinc-900 transition-colors">
            ← Volver al CRM de Leads
        </a>
        <div class="flex items-center gap-3">
            <button onclick="window.print()" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                </svg>
                <span>Descargar / Imprimir Presupuesto PDF</span>
            </button>
        </div>
    </div>

    <!-- Printable Sheet Container (A4 Size equivalent) -->
    <div class="page-container max-w-4xl mx-auto bg-white rounded-3xl border border-zinc-200/80 p-8 sm:p-12 shadow-xl space-y-8">
        
        <!-- Header: Logo & Quote Info -->
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-zinc-200 pb-8">
            <div class="space-y-2">
                <div class="flex items-center gap-2.5">
                    <img src="{{ asset('images/avocado_mascot.png') }}" alt="VENTADEPALTAS.CL" class="w-10 h-10 object-contain">
                    <div>
                        <span class="text-xl font-extrabold font-display tracking-tight text-zinc-900 uppercase">
                            VENTADE<span class="text-emerald-600">PALTAS</span>.CL
                        </span>
                        <span class="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                            Distribuidor Mayorista B2B • Región Metropolitana
                        </span>
                    </div>
                </div>
                <div class="text-xs text-zinc-500 space-y-0.5 pt-2">
                    <p><strong>Razón Social:</strong> Comercializadora & Distribuidora Agrícola SpA</p>
                    <p><strong>RUT:</strong> 77.892.341-K</p>
                    <p><strong>Dirección:</strong> Central Mayorista Lo Valledor, Santiago, Chile</p>
                    <p><strong>Teléfono / WhatsApp:</strong> +56 9 5780 3219</p>
                    <p><strong>Email:</strong> contacto@ventadepaltas.cl</p>
                </div>
            </div>

            <div class="text-left sm:text-right space-y-1">
                <span class="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    PRESUPUESTO FORMAL B2B
                </span>
                <h1 class="text-2xl font-black font-display text-zinc-900">
                    COT-{{ str_pad($lead->id, 5, '0', STR_PAD_LEFT) }}
                </h1>
                <p class="text-xs text-zinc-500"><strong>Fecha Emisión:</strong> {{ date('d/m/Y') }}</p>
                <p class="text-xs text-zinc-500"><strong>Validez de Oferta:</strong> 7 días corridos</p>
                <p class="text-xs text-emerald-600 font-semibold"><strong>Atendido por:</strong> Central Comercial B2B</p>
            </div>
        </div>

        <!-- Client Information -->
        <div class="bg-zinc-50 rounded-2xl p-6 border border-zinc-200/60">
            <h3 class="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-3">Información del Cliente / Empresa</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                    <span class="block text-zinc-400 text-[10px] uppercase font-bold">Empresa</span>
                    <span class="font-bold text-zinc-900 text-sm">{{ $lead->empresa }}</span>
                </div>
                <div>
                    <span class="block text-zinc-400 text-[10px] uppercase font-bold">Contacto</span>
                    <span class="font-semibold text-zinc-800">{{ $lead->nombre }}</span>
                </div>
                <div>
                    <span class="block text-zinc-400 text-[10px] uppercase font-bold">Email / Teléfono</span>
                    <span class="text-zinc-800">{{ $lead->email }}</span>
                    <span class="block text-zinc-500">{{ $lead->telefono }}</span>
                </div>
                <div>
                    <span class="block text-zinc-400 text-[10px] uppercase font-bold">Comuna de Despacho</span>
                    <span class="font-bold text-emerald-700">{{ $lead->comuna }}, {{ $lead->region }}</span>
                </div>
            </div>
        </div>

        <!-- Product Breakdown Table -->
        @php
            $kg = (float) $lead->cantidad_estimada_kg;
            if ($kg <= 0) $kg = 100;

            // Tiered volume pricing estimation
            if ($kg >= 1000) {
                $precioUnitario = 2890; // Mayorista Gran Volumen
            } elseif ($kg >= 500) {
                $precioUnitario = 3150; // Restaurante / Casino
            } else {
                $precioUnitario = 3450; // Pyme / Sushi
            }

            $subtotalNeto = $kg * $precioUnitario;
            $iva = $subtotalNeto * 0.19;
            $totalBruto = $subtotalNeto + $iva;
        @endphp

        <div>
            <h3 class="text-xs font-bold uppercase tracking-wider text-zinc-900 mb-3 font-display">Detalle del Abastecimiento</h3>
            <div class="overflow-x-auto border border-zinc-200 rounded-2xl">
                <table class="w-full text-left text-xs">
                    <thead class="bg-zinc-100/80 text-zinc-600 font-bold border-b border-zinc-200">
                        <tr>
                            <th class="p-3.5">Descripción del Producto</th>
                            <th class="p-3.5 text-center">Calibre / Variedad</th>
                            <th class="p-3.5 text-center">Cantidad (Kg)</th>
                            <th class="p-3.5 text-right">Precio Unit. Neto</th>
                            <th class="p-3.5 text-right">Total Neto (CLP)</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-zinc-200">
                        <tr>
                            <td class="p-3.5">
                                <div class="font-bold text-zinc-900">Palta Hass Selección B2B Premium</div>
                                <div class="text-[11px] text-zinc-500">Materia seca > 23%, punto de maduración controlado, merma cero. Cajas plásticas ventiladas de 10 kg / 18 kg.</div>
                                @if($lead->mensaje)
                                <div class="mt-1 text-[10px] italic text-zinc-600 bg-zinc-50 p-1.5 rounded-lg border border-zinc-200/50">
                                    <strong>Nota del cliente:</strong> {{ $lead->mensaje }}
                                </div>
                                @endif
                            </td>
                            <td class="p-3.5 text-center">
                                <span class="px-2 py-0.5 rounded-md bg-zinc-100 font-bold text-zinc-800 text-[11px]">Extra / 1A</span>
                            </td>
                            <td class="p-3.5 text-center font-bold text-zinc-900 text-sm">
                                {{ number_format($kg, 0, ',', '.') }} kg
                            </td>
                            <td class="p-3.5 text-right font-semibold text-zinc-800">
                                ${{ number_format($precioUnitario, 0, ',', '.') }}
                            </td>
                            <td class="p-3.5 text-right font-bold text-zinc-900 text-sm">
                                ${{ number_format($subtotalNeto, 0, ',', '.') }}
                            </td>
                        </tr>
                        <tr>
                            <td class="p-3.5" colspan="2">
                                <div class="font-bold text-emerald-700">Despacho Logístico Refrigerado</div>
                                <div class="text-[10px] text-zinc-500">Flota con temperatura controlada directo en {{ $lead->comuna }}.</div>
                            </td>
                            <td class="p-3.5 text-center text-zinc-600">1 Viaje</td>
                            <td class="p-3.5 text-right text-emerald-600 font-bold">GRATIS</td>
                            <td class="p-3.5 text-right text-emerald-600 font-bold">$0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Totals & Payment Summary -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start pt-2">
            <!-- Commercial Terms -->
            <div class="bg-zinc-50 rounded-2xl p-5 border border-zinc-200/60 text-[11px] text-zinc-600 space-y-2">
                <h4 class="font-bold text-zinc-900 uppercase tracking-wider text-[10px]">Condiciones Comerciales & Entrega:</h4>
                <ul class="space-y-1 list-disc list-inside">
                    <li><strong>Tiempo de Despacho:</strong> 24 a 48 horas hábiles tras confirmación de orden.</li>
                    <li><strong>Cadena de Frío:</strong> Temperatura garantizada entre 6°C y 8°C.</li>
                    <li><strong>Garantía de Calidad:</strong> Cambio directo en caso de fruta no conforme.</li>
                    <li><strong>Documentación:</strong> Factura electrónica afecta (19% IVA) / Guía de despacho.</li>
                    <li><strong>Forma de Pago:</strong> Transferencia bancaria anticipada o línea de crédito previa evaluación comercial (30 días).</li>
                </ul>
            </div>

            <!-- Financial Totals -->
            <div class="bg-zinc-100/60 rounded-2xl p-5 border border-zinc-200 space-y-3">
                <div class="flex justify-between text-xs text-zinc-600">
                    <span>Subtotal Neto:</span>
                    <span class="font-semibold text-zinc-900">${{ number_format($subtotalNeto, 0, ',', '.') }}</span>
                </div>
                <div class="flex justify-between text-xs text-zinc-600">
                    <span>IVA (19%):</span>
                    <span class="font-semibold text-zinc-900">${{ number_format($iva, 0, ',', '.') }}</span>
                </div>
                <div class="border-t border-zinc-300 pt-3 flex justify-between items-center">
                    <span class="text-sm font-extrabold font-display text-zinc-900">Total a Pagar (CLP):</span>
                    <span class="text-xl font-black font-display text-emerald-600">${{ number_format($totalBruto, 0, ',', '.') }}</span>
                </div>
            </div>
        </div>

        <!-- Banking Information -->
        <div class="border-t border-zinc-200 pt-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-600">
                <div class="space-y-1">
                    <h5 class="font-bold text-zinc-900 uppercase text-[10px] tracking-wider">Datos para Transferencia Bancaria:</h5>
                    <p><strong>Banco:</strong> Banco de Chile / Banco Santander</p>
                    <p><strong>Tipo de Cuenta:</strong> Cuenta Corriente</p>
                    <p><strong>Titular:</strong> Comercializadora Agrícola SpA</p>
                    <p><strong>RUT:</strong> 77.892.341-K</p>
                    <p><strong>Email Comprobantes:</strong> facturacion@ventadepaltas.cl</p>
                </div>
                <div class="space-y-1 flex flex-col justify-end text-left sm:text-right">
                    <p class="text-[10px] text-zinc-400">Documento emitido electrónicamente por el sistema ERP/CRM de VENTADEPALTAS.CL</p>
                    <p class="text-[10px] font-bold text-emerald-600">¿Dudas con esta cotización? Llámanos al +56 9 5780 3219</p>
                </div>
            </div>
        </div>

    </div>

</body>
</html>
