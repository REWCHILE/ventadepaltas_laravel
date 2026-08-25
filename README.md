# VENTADEPALTAS.CL - Plataforma B2B Mayorista en Laravel

Plataforma integral para comercialización y distribución mayorista de Palta Hass en la Región Metropolitana de Santiago, Chile. Desarrollada en **Laravel 12 / PHP 8.3 + MySQL**.

---

## 🥑 Características Principales

### 1. Portal Público B2B & Motor de Alta Conversión
- **Cotizador B2B Inteligente**: Selector dinámico de comunas de la RM, presets de volumen (Pyme 100kg, Cadena 500kg, Gran Volumen 1.000kg), captura automática de parámetros UTM y procesamiento asíncrono con notificaciones por correo.
- **Catálogo Interactivo de Calibres (CalibreDeck)**: Fichas técnicas completas con porcentaje de materia seca, tasa de oxidación y rendimientos culinarios para Calibre Súper Extra (SE), Extra (EX), Primera (1A) y Segunda (2A).
- **Asistente Virtual & Mascota Oficial ("Paltín")**: Widget flotante interactivo con globo de diálogo, fondo de partículas de aguacates animadas y disparador de cotización rápida.
- **Landings SEO de Nicho**: Páginas optimizadas para restaurantes, casinos de alimentación institucional, empresas/oficinas, venta por mayor y proveedor Santiago.
- **Páginas SEO Programáticas Dinámicas**: Generación de páginas por variedad y comuna (`/palta-edranol-por-mayor`, `/palta-fuerte-por-mayor`, `/palta-chilena-premium`, `/palta-hass-peruana`, `/venta-de-paltas-en-las-condes`, etc.) con inyección automática de Schema.org JSON-LD (Organization, LocalBusiness, FAQPage).
- **Blog Gastronómico B2B**: Artículos y guías de conservación térmica y maduración.
- **Sitemap XML Dinámico**: Disponible en `/sitemap.xml`.

### 2. Panel de Administración & CRM B2B (`/admin`)
- **Autenticación con Roles**: Super Administrador y Administrador Comercial.
- **Dashboard & KPIs en Vivo**: Métricas de leads hoy, semana, mes, total histórico, kilos solicitados y gráficos de distribución por comuna, segmento y página SEO de procedencia.
- **CRM de Leads**: Búsqueda en tiempo real, filtros por estado (`Nuevo`, `Contactado`, `Cotización enviada`, `Negociación`, `Cliente`, `Perdido`), modal de detalle, cambio de estado con auditoría automática, bitácora de notas internas y exportación a CSV/Excel.
- **Gestor de Páginas SEO**: CRUD completo con constructor visual dinámico de preguntas frecuentes (FAQ Schema) y toggle de publicación.
- **Gestor de Artículos de Blog**: CRUD completo de posts con optimización para Google.

---

## 🚀 Requisitos e Instalación Local

- PHP >= 8.2 (Recomendado PHP 8.3 en Laragon)
- MySQL >= 8.0
- Composer >= 2.0

### Pasos de Instalación:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/REWCHILE/ventadepaltas_laravel.git
   cd ventadepaltas_laravel
   ```

2. **Instalar dependencias**:
   ```bash
   composer install
   ```

3. **Configurar el entorno**:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Crear base de datos y migrar con datos semilla**:
   ```bash
   php artisan migrate:fresh --seed
   ```

5. **Iniciar el servidor local**:
   ```bash
   php artisan serve
   ```
   O acceder directamente mediante Laragon en `http://ventadepaltas.test` o `http://localhost:8000`.

---

## 🔐 Credenciales de Acceso al Panel de Control

- **URL de Ingreso**: `http://localhost:8000/login`
- **Super Administrador**:
  - Email: `admin@ventadepaltas.cl`
  - Contraseña: `admin123`
- **Ejecutivo Comercial**:
  - Email: `comercial@ventadepaltas.cl`
  - Contraseña: `admin123`
