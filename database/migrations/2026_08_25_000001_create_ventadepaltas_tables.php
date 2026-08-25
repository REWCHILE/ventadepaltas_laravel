<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Leads Table (CRM Leads)
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('empresa');
            $table->string('email');
            $table->string('telefono');
            $table->string('comuna');
            $table->string('region')->default('Metropolitana');
            $table->decimal('cantidad_estimada_kg', 10, 2)->default(0);
            $table->string('tipo_cliente'); // 'restaurante', 'casino', 'hotel', 'catering', 'distribuidor', 'minimarket', 'supermercado', 'empresa', 'otro'
            $table->text('mensaje')->nullable();
            $table->string('pagina_origen'); // E.g. '/venta-de-paltas-por-mayor'
            $table->string('utm_source')->nullable();
            $table->string('utm_medium')->nullable();
            $table->string('utm_campaign')->nullable();
            $table->enum('estado', [
                'Nuevo', 
                'Contactado', 
                'Cotización enviada', 
                'Negociación', 
                'Cliente', 
                'Perdido'
            ])->default('Nuevo');
            $table->timestamps();
        });

        // 2. Lead Notes Table
        Schema::create('lead_notes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lead_id')->constrained('leads')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('nota');
            $table->timestamps();
        });

        // 3. Lead History / Status Audit Table
        Schema::create('lead_history', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lead_id')->constrained('leads')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('estado_anterior')->nullable();
            $table->string('estado_nuevo');
            $table->text('descripcion');
            $table->timestamps();
        });

        // 4. SEO Dynamic Pages Table
        Schema::create('seo_pages', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('slug')->unique();
            $table->string('keyword_principal');
            $table->string('meta_title');
            $table->text('meta_description');
            $table->longText('contenido');
            $table->json('faq_json')->nullable();
            $table->json('schema_json')->nullable();
            $table->boolean('publicada')->default(false);
            $table->timestamps();
        });

        // 5. Blog Posts Table
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('slug')->unique();
            $table->longText('contenido');
            $table->string('meta_title');
            $table->text('meta_description');
            $table->string('keyword_principal');
            $table->json('schema_json')->nullable();
            $table->boolean('publicada')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
        Schema::dropIfExists('seo_pages');
        Schema::dropIfExists('lead_history');
        Schema::dropIfExists('lead_notes');
        Schema::dropIfExists('leads');
    }
};
