<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\LeadHistory;
use App\Mail\NewLeadNotificationMail;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class LeadSubmissionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'empresa' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required|string|max:50',
            'comuna' => 'required|string|max:100',
            'region' => 'nullable|string|max:100',
            'cantidad_estimada_kg' => 'required|numeric|min:1',
            'tipo_cliente' => 'required|string|max:100',
            'mensaje' => 'nullable|string',
            'pagina_origen' => 'required|string|max:255',
            'utm_source' => 'nullable|string|max:100',
            'utm_medium' => 'nullable|string|max:100',
            'utm_campaign' => 'nullable|string|max:100',
        ], [
            'nombre.required' => 'Por favor ingresa tu nombre completo.',
            'empresa.required' => 'Por favor ingresa el nombre de tu empresa o negocio.',
            'email.required' => 'Por favor ingresa un correo electrónico válido.',
            'email.email' => 'El formato del correo electrónico es inválido.',
            'telefono.required' => 'Por favor ingresa un número de teléfono o WhatsApp de contacto.',
            'comuna.required' => 'Por favor selecciona la comuna de entrega en Santiago.',
            'cantidad_estimada_kg.required' => 'Por favor indica la cantidad estimada en kilos.',
            'tipo_cliente.required' => 'Por favor selecciona tu tipo de negocio.',
        ]);

        $validated['region'] = $validated['region'] ?? 'Metropolitana';
        $validated['estado'] = 'Nuevo';

        // 1. Create Lead in Database
        $lead = Lead::create($validated);

        // 2. Add Status History Audit
        LeadHistory::create([
            'lead_id' => $lead->id,
            'user_id' => null,
            'estado_anterior' => null,
            'estado_nuevo' => 'Nuevo',
            'descripcion' => "Cotización ingresada desde {$lead->pagina_origen}",
        ]);

        // 3. Dispatch Notifications (Email, Webhook, Telegram)
        \App\Services\LeadNotificationService::notifyAll($lead);

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json([
                'success' => true,
                'message' => '¡Tu solicitud de cotización ha sido recibida! Nos pondremos en contacto a la brevedad.',
                'lead_id' => $lead->id,
            ]);
        }

        return back()->with('success', '¡Tu solicitud de cotización ha sido recibida con éxito! Nos pondremos en contacto a la brevedad.');
    }
}
