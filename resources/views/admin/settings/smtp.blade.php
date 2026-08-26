@extends('layouts.admin')

@section('title', 'Configuración SMTP & Notificaciones')

@section('content')
<div x-data="settingsManager()" class="space-y-8 max-w-5xl mx-auto">

    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Ajustes de Infraestructura
                </span>
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight mt-1">
                Configuración SMTP & Alertas
            </h1>
            <p class="text-xs sm:text-sm text-zinc-400 mt-1">
                Administra los servidores de correo y canales de notificación en tiempo real. Los cambios se guardan de forma segura en tu archivo <code class="text-emerald-400 font-mono text-xs">.env</code>.
            </p>
        </div>

        <div class="flex items-center gap-3">
            <button @click="showTestModal = true" type="button"
                    class="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm">
                <i data-lucide="send" class="w-4 h-4"></i>
                <span>Probar Envío de Correo</span>
            </button>
        </div>
    </div>

    <!-- Main Form -->
    <form action="{{ route('admin.settings.smtp.update') }}" method="POST" class="space-y-8">
        @csrf

        <!-- 1. Servidor de Correo (SMTP) -->
        <div class="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div class="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <i data-lucide="mail" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <h2 class="text-base font-bold text-white font-display">Servidor de Correo Saliente (SMTP)</h2>
                        <p class="text-xs text-zinc-400">Configura el proveedor encargado de enviar las confirmaciones y presupuestos.</p>
                    </div>
                </div>

                <!-- Provider Quick-Presets -->
                <div class="hidden md:flex items-center gap-2 text-xs">
                    <span class="text-zinc-500 text-[11px] font-bold uppercase">Presets:</span>
                    <button type="button" @click="applyPreset('gmail')" class="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-750 text-[11px] font-semibold border border-zinc-700">Gmail</button>
                    <button type="button" @click="applyPreset('brevo')" class="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-750 text-[11px] font-semibold border border-zinc-700">Brevo</button>
                    <button type="button" @click="applyPreset('resend')" class="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-750 text-[11px] font-semibold border border-zinc-700">Resend</button>
                    <button type="button" @click="applyPreset('mailgun')" class="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-750 text-[11px] font-semibold border border-zinc-700">Mailgun</button>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                
                <!-- Driver -->
                <div>
                    <label class="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                        Driver de Correo (MAIL_MAILER) *
                    </label>
                    <select name="mail_mailer" x-model="form.mail_mailer" required
                            class="w-full bg-zinc-800/90 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                        <option value="smtp">SMTP (Producción / Recomendado)</option>
                        <option value="log">Log (Solo registro local en laravel.log)</option>
                        <option value="sendmail">Sendmail (Servidor Linux)</option>
                    </select>
                </div>

                <!-- Host -->
                <div>
                    <label class="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                        Servidor Host (MAIL_HOST)
                    </label>
                    <input type="text" name="mail_host" x-model="form.mail_host" placeholder="smtp.resend.com / smtp.gmail.com"
                           class="w-full bg-zinc-800/90 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                </div>

                <!-- Port -->
                <div>
                    <label class="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                        Puerto (MAIL_PORT)
                    </label>
                    <input type="number" name="mail_port" x-model="form.mail_port" placeholder="587 o 465"
                           class="w-full bg-zinc-800/90 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                </div>

                <!-- Username -->
                <div>
                    <label class="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                        Usuario / API Key (MAIL_USERNAME)
                    </label>
                    <input type="text" name="mail_username" x-model="form.mail_username" placeholder="resend / tu-usuario@dominio.com"
                           class="w-full bg-zinc-800/90 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                </div>

                <!-- Password -->
                <div>
                    <label class="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                        Contraseña / Token Secreto (MAIL_PASSWORD)
                    </label>
                    <div class="relative">
                        <input :type="showPassword ? 'text' : 'password'" name="mail_password" x-model="form.mail_password" placeholder="••••••••••••••••"
                               class="w-full bg-zinc-800/90 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none pr-10">
                        <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-200">
                            <i :data-lucide="showPassword ? 'eye-off' : 'eye'" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>

                <!-- Encryption -->
                <div>
                    <label class="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                        Encriptación (MAIL_ENCRYPTION)
                    </label>
                    <select name="mail_encryption" x-model="form.mail_encryption"
                            class="w-full bg-zinc-800/90 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                        <option value="tls">TLS (Recomendado - Puerto 587)</option>
                        <option value="ssl">SSL (Puerto 465)</option>
                        <option value="null">Ninguna (Sin encriptación)</option>
                    </select>
                </div>

            </div>

            <!-- Remitente & Notificación -->
            <div class="pt-4 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-5">
                
                <div>
                    <label class="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                        Correo Remitente (FROM) *
                    </label>
                    <input type="email" name="mail_from_address" x-model="form.mail_from_address" required placeholder="leads@ventadepaltas.cl"
                           class="w-full bg-zinc-800/90 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                </div>

                <div>
                    <label class="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                        Nombre Remitente *
                    </label>
                    <input type="text" name="mail_from_name" x-model="form.mail_from_name" required placeholder="VENTADEPALTAS.CL"
                           class="w-full bg-zinc-800/90 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                </div>

                <div>
                    <label class="block text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <i data-lucide="bell" class="w-3.5 h-3.5"></i>
                        Correo Receptor de Alertas *
                    </label>
                    <input type="email" name="admin_notification_email" x-model="form.admin_notification_email" required placeholder="ventas@ventadepaltas.cl"
                           class="w-full bg-zinc-800/90 border border-emerald-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                    <span class="block text-[10px] text-zinc-500 mt-1">Aquí llegarán las notificaciones de nuevos leads.</span>
                </div>

            </div>
        </div>

        <!-- 2. Canales Instantáneos (Telegram & Webhook Discord/Slack) -->
        <div class="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div class="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                        <i data-lucide="zap" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <h2 class="text-base font-bold text-white font-display">Alertas Instantáneas (Telegram & Webhook)</h2>
                        <p class="text-xs text-zinc-400">Recibe una alerta inmediata en tu celular cada vez que un cliente cotice.</p>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <!-- Telegram Bot -->
                <div class="bg-zinc-950/60 p-5 rounded-2xl border border-zinc-800/80 space-y-4">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-sky-400 flex items-center gap-2">
                            <i data-lucide="message-circle" class="w-4 h-4"></i> Bot de Telegram
                        </span>
                        <button type="button" @click="testTelegram()" :disabled="testingTelegram"
                                class="px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 text-[11px] font-bold border border-sky-500/20 transition-all flex items-center gap-1.5 cursor-pointer">
                            <i data-lucide="send" class="w-3 h-3"></i>
                            <span x-text="testingTelegram ? 'Probando...' : 'Probar'"></span>
                        </button>
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                            Telegram Bot Token (TELEGRAM_BOT_TOKEN)
                        </label>
                        <input type="text" name="telegram_bot_token" x-model="form.telegram_bot_token" placeholder="Ej: 7123456789:AAH..."
                               class="w-full bg-zinc-800/90 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:ring-2 focus:ring-sky-500 outline-none">
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                            Telegram Chat ID (TELEGRAM_CHAT_ID)
                        </label>
                        <input type="text" name="telegram_chat_id" x-model="form.telegram_chat_id" placeholder="Ej: -100123456789 o tu ID de usuario"
                               class="w-full bg-zinc-800/90 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:ring-2 focus:ring-sky-500 outline-none">
                    </div>
                </div>

                <!-- Discord / Slack Webhook -->
                <div class="bg-zinc-950/60 p-5 rounded-2xl border border-zinc-800/80 space-y-4">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-indigo-400 flex items-center gap-2">
                            <i data-lucide="webhook" class="w-4 h-4"></i> Webhook (Discord / Slack / Make)
                        </span>
                        <button type="button" @click="testWebhook()" :disabled="testingWebhook"
                                class="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 text-[11px] font-bold border border-indigo-500/20 transition-all flex items-center gap-1.5 cursor-pointer">
                            <i data-lucide="send" class="w-3 h-3"></i>
                            <span x-text="testingWebhook ? 'Probando...' : 'Probar'"></span>
                        </button>
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                            URL de Webhook (WEBHOOK_URL)
                        </label>
                        <input type="url" name="webhook_url" x-model="form.webhook_url" placeholder="https://discord.com/api/webhooks/... o https://hooks.slack.com/..."
                               class="w-full bg-zinc-800/90 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:ring-2 focus:ring-indigo-500 outline-none">
                        <span class="block text-[10px] text-zinc-500 mt-1">Compatible automáticamente con canales de Discord, Slack y Zapier.</span>
                    </div>
                </div>

            </div>
        </div>

        <!-- Submit Button -->
        <div class="flex items-center justify-end gap-4">
            <button type="submit"
                    class="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 active:scale-95 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all cursor-pointer">
                <i data-lucide="save" class="w-4 h-4"></i>
                <span>Guardar Cambios en .env</span>
            </button>
        </div>
    </form>

    <!-- Modal: Test Email -->
    <div x-show="showTestModal" x-cloak class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
        <div @click.away="showTestModal = false" class="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                    <div class="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <i data-lucide="send" class="w-5 h-5"></i>
                    </div>
                    <h3 class="font-bold text-white text-base font-display">Probar Envío de Correo</h3>
                </div>
                <button @click="showTestModal = false" class="text-zinc-400 hover:text-white">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>

            <p class="text-xs text-zinc-400 leading-relaxed">
                Ingresa una dirección de correo para enviar un mensaje de prueba utilizando la configuración activa del servidor.
            </p>

            <div x-show="testAlert.message" class="p-3.5 rounded-xl text-xs border"
                 :class="testAlert.type === 'success' ? 'bg-emerald-950/50 border-emerald-800 text-emerald-300' : 'bg-rose-950/50 border-rose-800 text-rose-300'">
                <span x-text="testAlert.message"></span>
            </div>

            <div>
                <label class="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                    Correo Destinatario de Prueba
                </label>
                <input type="email" x-model="testEmailAddress" placeholder="tu-correo@gmail.com"
                       class="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:ring-2 focus:ring-emerald-500 outline-none">
            </div>

            <div class="flex items-center justify-end gap-3 pt-2">
                <button type="button" @click="showTestModal = false" class="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-750 text-zinc-300 text-xs font-bold transition-colors">
                    Cerrar
                </button>
                <button type="button" @click="sendTestEmail()" :disabled="sendingTestEmail"
                        class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50">
                    <i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin" x-show="sendingTestEmail"></i>
                    <span x-text="sendingTestEmail ? 'Enviando...' : 'Enviar Prueba'"></span>
                </button>
            </div>

        </div>
    </div>

</div>

<script>
function settingsManager() {
    return {
        showPassword: false,
        showTestModal: false,
        testEmailAddress: '{{ $settings['admin_notification_email'] }}',
        sendingTestEmail: false,
        testingTelegram: false,
        testingWebhook: false,
        testAlert: { type: '', message: '' },

        form: {
            mail_mailer: '{{ $settings['mail_mailer'] }}',
            mail_host: '{{ $settings['mail_host'] }}',
            mail_port: '{{ $settings['mail_port'] }}',
            mail_username: '{{ $settings['mail_username'] }}',
            mail_password: '{{ $settings['mail_password'] }}',
            mail_encryption: '{{ $settings['mail_encryption'] }}',
            mail_from_address: '{{ $settings['mail_from_address'] }}',
            mail_from_name: '{{ $settings['mail_from_name'] }}',
            admin_notification_email: '{{ $settings['admin_notification_email'] }}',
            webhook_url: '{{ $settings['webhook_url'] }}',
            telegram_bot_token: '{{ $settings['telegram_bot_token'] }}',
            telegram_chat_id: '{{ $settings['telegram_chat_id'] }}',
        },

        applyPreset(provider) {
            if (provider === 'gmail') {
                this.form.mail_mailer = 'smtp';
                this.form.mail_host = 'smtp.gmail.com';
                this.form.mail_port = '587';
                this.form.mail_encryption = 'tls';
            } else if (provider === 'brevo') {
                this.form.mail_mailer = 'smtp';
                this.form.mail_host = 'smtp-relay.brevo.com';
                this.form.mail_port = '587';
                this.form.mail_encryption = 'tls';
            } else if (provider === 'resend') {
                this.form.mail_mailer = 'smtp';
                this.form.mail_host = 'smtp.resend.com';
                this.form.mail_port = '587';
                this.form.mail_username = 'resend';
                this.form.mail_encryption = 'tls';
            } else if (provider === 'mailgun') {
                this.form.mail_mailer = 'smtp';
                this.form.mail_host = 'smtp.mailgun.org';
                this.form.mail_port = '587';
                this.form.mail_encryption = 'tls';
            }
        },

        async sendTestEmail() {
            if (!this.testEmailAddress) {
                this.testAlert = { type: 'error', message: 'Por favor ingresa un correo destinatario.' };
                return;
            }

            this.sendingTestEmail = true;
            this.testAlert = { type: '', message: '' };

            try {
                const response = await fetch('{{ route('admin.settings.smtp.test-email') }}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    body: JSON.stringify({ test_email: this.testEmailAddress })
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Error al enviar el correo.');

                this.testAlert = { type: 'success', message: data.message };
            } catch (err) {
                this.testAlert = { type: 'error', message: err.message };
            } finally {
                this.sendingTestEmail = false;
                this.$nextTick(() => lucide.createIcons());
            }
        },

        async testTelegram() {
            this.testingTelegram = true;
            try {
                const response = await fetch('{{ route('admin.settings.smtp.test-webhook') }}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    body: JSON.stringify({
                        type: 'telegram',
                        telegram_bot_token: this.form.telegram_bot_token,
                        telegram_chat_id: this.form.telegram_chat_id
                    })
                });

                const data = await response.json();
                alert(data.message);
            } catch (err) {
                alert('Error al probar Telegram: ' + err.message);
            } finally {
                this.testingTelegram = false;
            }
        },

        async testWebhook() {
            this.testingWebhook = true;
            try {
                const response = await fetch('{{ route('admin.settings.smtp.test-webhook') }}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    body: JSON.stringify({
                        type: 'webhook',
                        webhook_url: this.form.webhook_url
                    })
                });

                const data = await response.json();
                alert(data.message);
            } catch (err) {
                alert('Error al probar Webhook: ' + err.message);
            } finally {
                this.testingWebhook = false;
            }
        }
    }
}
</script>
@endsection
