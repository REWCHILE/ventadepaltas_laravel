<?php

namespace App\Services;

use App\Models\Lead;
use App\Mail\NewLeadNotificationMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class LeadNotificationService
{
    /**
     * Dispatch all notifications for a newly created Lead.
     */
    public static function notifyAll(Lead $lead): void
    {
        // 1. Send Email Notification
        self::sendEmailNotification($lead);

        // 2. Send Webhook Notification (Slack / Discord / Custom Webhook)
        self::sendWebhookNotification($lead);

        // 3. Send Telegram Notification
        self::sendTelegramNotification($lead);
    }

    /**
     * Send Email to administrator.
     */
    public static function sendEmailNotification(Lead $lead): void
    {
        $adminEmail = env('ADMIN_NOTIFICATION_EMAIL', 'admin@ventadepaltas.cl');

        try {
            Mail::to($adminEmail)->send(new NewLeadNotificationMail($lead));
        } catch (\Throwable $e) {
            Log::error('Error sending Lead email notification: ' . $e->getMessage());
        }
    }

    /**
     * Send Webhook notification (Discord / Slack / Generic JSON).
     */
    public static function sendWebhookNotification(Lead $lead): void
    {
        $webhookUrl = env('WEBHOOK_URL');

        if (empty($webhookUrl)) {
            return;
        }

        try {
            $isDiscord = str_contains($webhookUrl, 'discord.com');
            $isSlack = str_contains($webhookUrl, 'slack.com');

            $payload = [
                'event' => 'new_lead',
                'id' => $lead->id,
                'nombre' => $lead->nombre,
                'empresa' => $lead->empresa,
                'email' => $lead->email,
                'telefono' => $lead->telefono,
                'comuna' => $lead->comuna,
                'cantidad_estimada_kg' => $lead->cantidad_estimada_kg,
                'tipo_cliente' => $lead->tipo_cliente,
                'mensaje' => $lead->mensaje,
                'pagina_origen' => $lead->pagina_origen,
                'created_at' => $lead->created_at?->toIso8601String() ?? now()->toIso8601String(),
            ];

            if ($isDiscord) {
                $body = [
                    'content' => "🥑 **¡Nueva Cotización B2B en VENTADEPALTAS.CL!**",
                    'embeds' => [
                        [
                            'title' => "Lead #{$lead->id} - {$lead->empresa}",
                            'color' => 1090333, // Emerald green
                            'fields' => [
                                ['name' => '👤 Contacto', 'value' => "{$lead->nombre} ({$lead->email})", 'inline' => true],
                                ['name' => '📱 Teléfono', 'value' => (string) $lead->telefono, 'inline' => true],
                                ['name' => '📍 Comuna RM', 'value' => (string) $lead->comuna, 'inline' => true],
                                ['name' => '⚖️ Kilos Requeridos', 'value' => number_format((float) $lead->cantidad_estimada_kg, 0, ',', '.') . ' kg', 'inline' => true],
                                ['name' => '🏢 Tipo Negocio', 'value' => ucfirst((string) $lead->tipo_cliente), 'inline' => true],
                                ['name' => '🌐 Página Origen', 'value' => (string) $lead->pagina_origen, 'inline' => true],
                                ['name' => '💬 Mensaje', 'value' => $lead->mensaje ?: 'Sin mensaje adicional', 'inline' => false],
                            ],
                            'footer' => ['text' => 'VENTADEPALTAS.CL • Sistema CRM B2B'],
                            'timestamp' => now()->toIso8601String(),
                        ]
                    ]
                ];
            } elseif ($isSlack) {
                $body = [
                    'text' => "🥑 *¡Nueva Cotización B2B!* {$lead->empresa} ({$lead->nombre}) solicita {$lead->cantidad_estimada_kg} kg en {$lead->comuna}. Tel: {$lead->telefono}",
                ];
            } else {
                $body = $payload;
            }

            Http::timeout(5)->post($webhookUrl, $body);
        } catch (\Throwable $e) {
            Log::error('Error sending Webhook notification: ' . $e->getMessage());
        }
    }

    /**
     * Send Telegram notification via Bot API.
     */
    public static function sendTelegramNotification(Lead $lead): void
    {
        $botToken = env('TELEGRAM_BOT_TOKEN');
        $chatId = env('TELEGRAM_CHAT_ID');

        if (empty($botToken) || empty($chatId)) {
            return;
        }

        try {
            $msg = "🥑 *¡NUEVA COTIZACIÓN B2B RECIBIDA!*\n\n"
                 . "🏢 *Empresa:* " . self::escapeTelegram($lead->empresa) . "\n"
                 . "👤 *Contacto:* " . self::escapeTelegram($lead->nombre) . "\n"
                 . "📱 *Teléfono:* [" . self::escapeTelegram($lead->telefono) . "](https://wa.me/" . preg_replace('/[^0-9]/', '', $lead->telefono) . ")\n"
                 . "📧 *Email:* " . self::escapeTelegram($lead->email) . "\n"
                 . "📍 *Comuna:* " . self::escapeTelegram($lead->comuna) . "\n"
                 . "⚖️ *Volumen:* " . number_format((float) $lead->cantidad_estimada_kg, 0, ',', '.') . " kg / mes\n"
                 . "🏬 *Segmento:* " . ucfirst((string) $lead->tipo_cliente) . "\n"
                 . "🌐 *Origen:* " . self::escapeTelegram($lead->pagina_origen) . "\n";

            if (!empty($lead->mensaje)) {
                $msg .= "💬 *Mensaje:* " . self::escapeTelegram($lead->mensaje) . "\n";
            }

            $url = "https://api.telegram.org/bot{$botToken}/sendMessage";

            Http::timeout(5)->post($url, [
                'chat_id' => $chatId,
                'text' => $msg,
                'parse_mode' => 'Markdown',
                'disable_web_page_preview' => true,
            ]);
        } catch (\Throwable $e) {
            Log::error('Error sending Telegram notification: ' . $e->getMessage());
        }
    }

    /**
     * Helper to escape Markdown for Telegram.
     */
    private static function escapeTelegram(?string $text): string
    {
        if (!$text) return '';
        return str_replace(['_', '*', '[', ']', '`'], ['\_', '\*', '\[', '\]', '\`'], $text);
    }
}
