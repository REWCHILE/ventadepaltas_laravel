<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\EnvEditorService;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Artisan;
use Illuminate\View\View;

class AdminSettingsController extends Controller
{
    /**
     * Show SMTP and Notification settings page.
     */
    public function smtp(): View
    {
        $settings = [
            'mail_mailer' => EnvEditorService::get('MAIL_MAILER', config('mail.default', 'log')),
            'mail_host' => EnvEditorService::get('MAIL_HOST', config('mail.mailers.smtp.host', '127.0.0.1')),
            'mail_port' => EnvEditorService::get('MAIL_PORT', (string) config('mail.mailers.smtp.port', '2525')),
            'mail_username' => EnvEditorService::get('MAIL_USERNAME', config('mail.mailers.smtp.username', '')),
            'mail_password' => EnvEditorService::get('MAIL_PASSWORD', config('mail.mailers.smtp.password', '')),
            'mail_encryption' => EnvEditorService::get('MAIL_ENCRYPTION', 'tls'),
            'mail_from_address' => EnvEditorService::get('MAIL_FROM_ADDRESS', config('mail.from.address', 'leads@ventadepaltas.cl')),
            'mail_from_name' => EnvEditorService::get('MAIL_FROM_NAME', config('mail.from.name', 'VENTADEPALTAS.CL')),
            'admin_notification_email' => EnvEditorService::get('ADMIN_NOTIFICATION_EMAIL', 'admin@ventadepaltas.cl'),
            
            // Webhooks & Telegram
            'webhook_url' => EnvEditorService::get('WEBHOOK_URL', ''),
            'telegram_bot_token' => EnvEditorService::get('TELEGRAM_BOT_TOKEN', ''),
            'telegram_chat_id' => EnvEditorService::get('TELEGRAM_CHAT_ID', ''),
        ];

        return view('admin.settings.smtp', compact('settings'));
    }

    /**
     * Update SMTP and Notification settings in .env dynamically.
     */
    public function updateSmtp(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'mail_mailer' => 'required|string|in:smtp,log,sendmail',
            'mail_host' => 'nullable|string|max:255',
            'mail_port' => 'nullable|numeric',
            'mail_username' => 'nullable|string|max:255',
            'mail_password' => 'nullable|string|max:255',
            'mail_encryption' => 'nullable|string|in:tls,ssl,null',
            'mail_from_address' => 'required|email|max:255',
            'mail_from_name' => 'required|string|max:255',
            'admin_notification_email' => 'required|email|max:255',
            
            // Webhooks & Telegram
            'webhook_url' => 'nullable|url|max:500',
            'telegram_bot_token' => 'nullable|string|max:255',
            'telegram_chat_id' => 'nullable|string|max:255',
        ]);

        $envData = [
            'MAIL_MAILER' => $validated['mail_mailer'],
            'MAIL_HOST' => $validated['mail_host'] ?? '127.0.0.1',
            'MAIL_PORT' => $validated['mail_port'] ?? '2525',
            'MAIL_USERNAME' => $validated['mail_username'] ?? '',
            'MAIL_PASSWORD' => $validated['mail_password'] ?? '',
            'MAIL_ENCRYPTION' => $validated['mail_encryption'] === 'null' ? null : $validated['mail_encryption'],
            'MAIL_FROM_ADDRESS' => $validated['mail_from_address'],
            'MAIL_FROM_NAME' => $validated['mail_from_name'],
            'ADMIN_NOTIFICATION_EMAIL' => $validated['admin_notification_email'],
            
            'WEBHOOK_URL' => $validated['webhook_url'] ?? '',
            'TELEGRAM_BOT_TOKEN' => $validated['telegram_bot_token'] ?? '',
            'TELEGRAM_CHAT_ID' => $validated['telegram_chat_id'] ?? '',
        ];

        EnvEditorService::update($envData);

        // Clear config cache so runtime picks up immediately
        try {
            Artisan::call('config:clear');
        } catch (\Throwable $e) {
            // Ignore if artisan cache clear fails
        }

        return redirect()->route('admin.settings.smtp')->with('success', '¡Configuración SMTP y canales de notificación actualizados correctamente en el archivo .env!');
    }

    /**
     * Send a test email to verify credentials.
     */
    public function testEmail(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'test_email' => 'required|email',
        ]);

        $recipient = $validated['test_email'];

        try {
            Mail::raw("🥑 Este es un correo de prueba enviado desde el Panel de Administración de VENTADEPALTAS.CL.\n\nSi estás leyendo esto, tu configuración SMTP en el servidor funciona al 100% y recibirás todas las cotizaciones de clientes en tiempo real.\n\nFecha y hora: " . now()->format('d/m/Y H:i:s'), function ($message) use ($recipient) {
                $message->to($recipient)
                        ->subject('✅ Verificación SMTP Exitosa - VENTADEPALTAS.CL');
            });

            return response()->json([
                'success' => true,
                'message' => "¡Correo de prueba enviado con éxito a {$recipient}! Revisa tu bandeja de entrada o spam.",
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al enviar correo: ' . $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Test Webhook or Telegram connection.
     */
    public function testWebhook(Request $request): JsonResponse
    {
        $type = $request->input('type', 'webhook');

        try {
            if ($type === 'telegram') {
                $botToken = $request->input('telegram_bot_token') ?: env('TELEGRAM_BOT_TOKEN');
                $chatId = $request->input('telegram_chat_id') ?: env('TELEGRAM_CHAT_ID');

                if (empty($botToken) || empty($chatId)) {
                    return response()->json(['success' => false, 'message' => 'Debes ingresar el Bot Token y Chat ID de Telegram.'], 422);
                }

                $res = Http::timeout(5)->post("https://api.telegram.org/bot{$botToken}/sendMessage", [
                    'chat_id' => $chatId,
                    'text' => "🥑 *VENTADEPALTAS.CL*\n\n✅ ¡Prueba de conexión con Telegram exitosa! Las nuevas cotizaciones llegarán a este chat en tiempo real.",
                    'parse_mode' => 'Markdown',
                ]);

                if ($res->successful()) {
                    return response()->json(['success' => true, 'message' => '¡Mensaje de prueba enviado exitosamente a Telegram!']);
                } else {
                    return response()->json(['success' => false, 'message' => 'Telegram devolvió error: ' . $res->body()], 422);
                }
            } else {
                $url = $request->input('webhook_url') ?: env('WEBHOOK_URL');
                if (empty($url)) {
                    return response()->json(['success' => false, 'message' => 'Debes ingresar una URL de Webhook válida.'], 422);
                }

                $isDiscord = str_contains($url, 'discord.com');
                $isSlack = str_contains($url, 'slack.com');

                if ($isDiscord) {
                    $payload = ['content' => "🥑 **VENTADEPALTAS.CL**: ✅ ¡Prueba de Webhook de Discord exitosa!"];
                } elseif ($isSlack) {
                    $payload = ['text' => "🥑 *VENTADEPALTAS.CL*: ✅ ¡Prueba de Webhook de Slack exitosa!"];
                } else {
                    $payload = ['event' => 'test', 'message' => 'Prueba de Webhook de VENTADEPALTAS.CL', 'timestamp' => now()->toIso8601String()];
                }

                $res = Http::timeout(5)->post($url, $payload);
                if ($res->successful()) {
                    return response()->json(['success' => true, 'message' => '¡Webhook probado con éxito! Respuesta HTTP 200 OK.']);
                } else {
                    return response()->json(['success' => false, 'message' => 'El Webhook devolvió código HTTP ' . $res->status()], 422);
                }
            }
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => 'Error: ' . $e->getMessage()], 422);
        }
    }
}
