<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Nueva Cotización de Paltas</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <div style="background: linear-gradient(135deg, #064e3b, #047857); padding: 24px 32px; color: #ffffff;">
            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 20px; display: inline-block;">
                Nuevo Prospecto B2B
            </span>
            <h2 style="margin: 12px 0 0 0; font-size: 20px; font-weight: 800;">
                Solicitud de Cotización Mayorista
            </h2>
            <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">
                Recibida desde la página: <strong>{{ $lead->pagina_origen }}</strong>
            </p>
        </div>

        <div style="padding: 24px 32px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b; width: 40%;"><strong>Nombre:</strong></td>
                    <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">{{ $lead->nombre }}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b;"><strong>Empresa:</strong></td>
                    <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">{{ $lead->empresa }}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b;"><strong>Correo:</strong></td>
                    <td style="padding: 10px 0; color: #059669; font-weight: 600;">
                        <a href="mailto:{{ $lead->email }}" style="color: #059669; text-decoration: none;">{{ $lead->email }}</a>
                    </td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b;"><strong>Teléfono:</strong></td>
                    <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">
                        <a href="tel:{{ $lead->telefono }}" style="color: #0f172a; text-decoration: none;">{{ $lead->telefono }}</a>
                    </td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b;"><strong>Comuna:</strong></td>
                    <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">{{ $lead->comuna }} ({{ $lead->region }})</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b;"><strong>Tipo de Cliente:</strong></td>
                    <td style="padding: 10px 0; color: #0f172a; text-transform: capitalize; font-weight: 600;">{{ $lead->tipo_cliente }}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b;"><strong>Cantidad Estimada:</strong></td>
                    <td style="padding: 10px 0; color: #064e3b; font-weight: 800; font-size: 16px;">{{ number_format($lead->cantidad_estimada_kg, 0, ',', '.') }} kg / mes</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b;"><strong>Mensaje:</strong></td>
                    <td style="padding: 10px 0; color: #334155;">{{ $lead->mensaje ?: 'Sin mensaje adicional' }}</td>
                </tr>
                @if($lead->utm_source || $lead->utm_medium || $lead->utm_campaign)
                <tr>
                    <td style="padding: 10px 0; color: #64748b;"><strong>Campaña / Origen:</strong></td>
                    <td style="padding: 10px 0; color: #64748b; font-size: 12px;">
                        Source: {{ $lead->utm_source ?: 'N/A' }} | Medium: {{ $lead->utm_medium ?: 'N/A' }} | Campaign: {{ $lead->utm_campaign ?: 'N/A' }}
                    </td>
                </tr>
                @endif
            </table>

            <div style="margin-top: 24px; text-align: center;">
                <a href="{{ url('/admin/leads') }}" style="display: inline-block; background: #059669; color: #ffffff; padding: 12px 24px; border-radius: 10px; font-weight: 700; text-decoration: none; font-size: 14px;">
                    Gestionar en el CRM →
                </a>
            </div>
        </div>

        <div style="background: #f8fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8;">
            VENTADEPALTAS.CL — Sistema de Gestión Mayorista B2B
        </div>
    </div>
</body>
</html>
