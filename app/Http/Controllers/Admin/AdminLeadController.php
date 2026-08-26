<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\LeadNote;
use App\Models\LeadHistory;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AdminLeadController extends Controller
{
    public function index(Request $request): View
    {
        $query = Lead::with(['notes.user', 'history.user'])->latest();

        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('nombre', 'like', "%{$search}%")
                  ->orWhere('empresa', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('comuna', 'like', "%{$search}%")
                  ->orWhere('telefono', 'like', "%{$search}%");
            });
        }

        if ($request->filled('estado')) {
            $query->where('estado', $request->get('estado'));
        }

        if ($request->filled('tipo_cliente')) {
            $query->where('tipo_cliente', $request->get('tipo_cliente'));
        }

        $leads = $query->paginate(20)->withQueryString();

        $stats = [
            'total' => Lead::count(),
            'nuevos' => Lead::where('estado', 'Nuevo')->count(),
            'contactados' => Lead::where('estado', 'Contactado')->count(),
            'cotizados' => Lead::where('estado', 'Cotización enviada')->count(),
            'negociacion' => Lead::where('estado', 'Negociación')->count(),
            'clientes' => Lead::where('estado', 'Cliente')->count(),
            'perdidos' => Lead::where('estado', 'Perdido')->count(),
        ];

        return view('admin.leads.index', compact('leads', 'stats'));
    }

    public function show(Lead $lead): JsonResponse
    {
        $lead->load(['notes.user', 'history.user']);
        return response()->json([
            'success' => true,
            'lead' => $lead,
        ]);
    }

    public function pdfQuote(Lead $lead): View
    {
        return view('admin.leads.pdf-quote', compact('lead'));
    }

    public function updateStatus(Request $request, Lead $lead): JsonResponse
    {
        $validated = $request->validate([
            'estado' => 'required|in:Nuevo,Contactado,Cotización enviada,Negociación,Cliente,Perdido',
        ]);

        $oldStatus = $lead->estado;
        $newStatus = $validated['estado'];

        if ($oldStatus !== $newStatus) {
            $lead->update(['estado' => $newStatus]);

            LeadHistory::create([
                'lead_id' => $lead->id,
                'user_id' => Auth::id(),
                'estado_anterior' => $oldStatus,
                'estado_nuevo' => $newStatus,
                'descripcion' => "Estado actualizado de \"{$oldStatus}\" a \"{$newStatus}\" por " . Auth::user()->name,
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => "Estado actualizado a {$newStatus}.",
            'lead' => $lead->fresh(['notes.user', 'history.user']),
        ]);
    }

    public function addNote(Request $request, Lead $lead): JsonResponse
    {
        $validated = $request->validate([
            'nota' => 'required|string|min:2',
        ], [
            'nota.required' => 'El contenido de la nota no puede estar vacío.',
        ]);

        $note = LeadNote::create([
            'lead_id' => $lead->id,
            'user_id' => Auth::id(),
            'nota' => $validated['nota'],
        ]);

        $note->load('user');

        return response()->json([
            'success' => true,
            'message' => 'Nota agregada con éxito.',
            'note' => $note,
        ]);
    }

    public function exportCsv(): StreamedResponse
    {
        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="leads_ventadepaltas_' . date('Y-m-d_His') . '.csv"',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = function () {
            $file = fopen('php://output', 'w');
            // Add UTF-8 BOM for Excel compatibility
            fprintf($file, chr(0xEF).chr(0xBB).chr(0xBF));

            fputcsv($file, [
                'ID',
                'Fecha',
                'Nombre',
                'Empresa',
                'Email',
                'Teléfono',
                'Comuna',
                'Región',
                'Kilos Estimados',
                'Tipo Cliente',
                'Estado',
                'Página Origen',
                'UTM Source',
                'UTM Medium',
                'UTM Campaign',
                'Mensaje'
            ], ';');

            Lead::chunk(100, function ($leads) use ($file) {
                foreach ($leads as $lead) {
                    fputcsv($file, [
                        $lead->id,
                        $lead->created_at->format('d/m/Y H:i'),
                        $lead->nombre,
                        $lead->empresa,
                        $lead->email,
                        $lead->telefono,
                        $lead->comuna,
                        $lead->region,
                        $lead->cantidad_estimada_kg,
                        $lead->tipo_cliente,
                        $lead->estado,
                        $lead->pagina_origen,
                        $lead->utm_source ?? '',
                        $lead->utm_medium ?? '',
                        $lead->utm_campaign ?? '',
                        $lead->mensaje ?? '',
                    ], ';');
                }
            });

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
