--
-- VENTADEPALTAS.CL - Database Schema Setup
-- Run this in your Supabase SQL Editor.
--

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Drop existing resources if any (for clean install)
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop function if exists public.is_admin(uuid);
drop function if exists public.is_super_admin(uuid);

drop table if exists public.lead_notes cascade;
drop table if exists public.lead_history cascade;
drop table if exists public.leads cascade;
drop table if exists public.seo_pages cascade;
drop table if exists public.posts cascade;
drop table if exists public.profiles cascade;

-- --------------------------------------------------
-- 1. PROFILES TABLE (User roles linked to auth.users)
-- --------------------------------------------------
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  role text not null check (role in ('super_admin', 'admin_comercial')) default 'admin_comercial',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Helper functions for RLS
create or replace function public.is_admin(user_id uuid)
returns boolean as $$
declare
  user_role text;
begin
  select role into user_role from public.profiles where id = user_id;
  return user_role in ('super_admin', 'admin_comercial');
end;
$$ language plpgsql security definer;

create or replace function public.is_super_admin(user_id uuid)
returns boolean as $$
declare
  user_role text;
begin
  select role into user_role from public.profiles where id = user_id;
  return user_role = 'super_admin';
end;
$$ language plpgsql security definer;

-- Profiles Policies
create policy "Allow admins to view all profiles"
  on public.profiles for select
  using (auth.uid() is not null and public.is_admin(auth.uid()));

create policy "Allow users to view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Allow super admin to manage profiles"
  on public.profiles for all
  using (auth.uid() is not null and public.is_super_admin(auth.uid()))
  with check (auth.uid() is not null and public.is_super_admin(auth.uid()));

-- Automatically sync profiles on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (
    new.id,
    new.email,
    -- Seed admin@ventadepaltas.cl as super_admin, others as admin_comercial by default
    case
      when new.email = 'admin@ventadepaltas.cl' then 'super_admin'
      else 'admin_comercial'
    end
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- --------------------------------------------------
-- 2. LEADS TABLE (CRM Leads)
-- --------------------------------------------------
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  nombre text not null,
  empresa text not null,
  email text not null,
  telefono text not null,
  comuna text not null,
  region text not null,
  cantidad_estimada_kg numeric not null default 0,
  tipo_cliente text not null, -- 'restaurante', 'casino', 'hotel', 'catering', 'distribuidor', 'minimarket', 'supermercado', 'empresa', 'otro'
  mensaje text,
  pagina_origen text not null, -- Path where form was submitted (e.g. '/venta-de-paltas-por-mayor')
  utm_source text,
  utm_medium text,
  utm_campaign text,
  estado text not null check (estado in ('Nuevo', 'Contactado', 'Cotización enviada', 'Negociación', 'Cliente', 'Perdido')) default 'Nuevo',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS
alter table public.leads enable row level security;

-- Leads Policies
create policy "Allow anyone to submit leads"
  on public.leads for insert
  with check (true);

create policy "Allow admin and commercial roles to read/write leads"
  on public.leads for all
  using (auth.uid() is not null and public.is_admin(auth.uid()))
  with check (auth.uid() is not null and public.is_admin(auth.uid()));


-- --------------------------------------------------
-- 3. LEAD NOTES TABLE (Internal notes for leads)
-- --------------------------------------------------
create table public.lead_notes (
  id uuid default gen_random_uuid() primary key,
  lead_id uuid references public.leads(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete set null,
  nota text not null,
  created_at timestamptz default now() not null
);

-- Enable RLS
alter table public.lead_notes enable row level security;

-- Lead Notes Policies
create policy "Allow admins to access lead notes"
  on public.lead_notes for all
  using (auth.uid() is not null and public.is_admin(auth.uid()))
  with check (auth.uid() is not null and public.is_admin(auth.uid()));


-- --------------------------------------------------
-- 4. LEAD HISTORY TABLE (Status history log)
-- --------------------------------------------------
create table public.lead_history (
  id uuid default gen_random_uuid() primary key,
  lead_id uuid references public.leads(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete set null,
  estado_anterior text,
  estado_nuevo text not null,
  descripcion text not null,
  created_at timestamptz default now() not null
);

-- Enable RLS
alter table public.lead_history enable row level security;

-- Lead History Policies
create policy "Allow admins to access lead history"
  on public.lead_history for all
  using (auth.uid() is not null and public.is_admin(auth.uid()))
  with check (auth.uid() is not null and public.is_admin(auth.uid()));


-- --------------------------------------------------
-- 5. SEO PAGES TABLE (Dynamic Pages)
-- --------------------------------------------------
create table public.seo_pages (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  slug text not null unique,
  keyword_principal text not null,
  meta_title text not null,
  meta_description text not null,
  contenido text not null, -- Markdown/HTML content
  faq_json jsonb default '[]'::jsonb, -- Array of FAQ schema objects
  schema_json jsonb default '{}'::jsonb, -- Custom JSON-LD schema
  publicada boolean default false not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS
alter table public.seo_pages enable row level security;

-- SEO Pages Policies
create policy "Allow public to view published SEO pages"
  on public.seo_pages for select
  using (publicada = true);

create policy "Allow admins to manage SEO pages"
  on public.seo_pages for all
  using (auth.uid() is not null and public.is_admin(auth.uid()))
  with check (auth.uid() is not null and public.is_admin(auth.uid()));


-- --------------------------------------------------
-- 6. POSTS TABLE (Blog posts)
-- --------------------------------------------------
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  slug text not null unique,
  contenido text not null, -- Markdown/HTML content
  meta_title text not null,
  meta_description text not null,
  keyword_principal text not null,
  schema_json jsonb default '{}'::jsonb, -- BlogPosting JSON-LD schema
  publicada boolean default false not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS
alter table public.posts enable row level security;

-- Posts Policies
create policy "Allow public to view published blog posts"
  on public.posts for select
  using (publicada = true);

create policy "Allow admins to manage blog posts"
  on public.posts for all
  using (auth.uid() is not null and public.is_admin(auth.uid()))
  with check (auth.uid() is not null and public.is_admin(auth.uid()));


-- --------------------------------------------------
-- 7. INITIAL DUMMY / SEED DATA FOR ADMIN PROFILE
-- --------------------------------------------------
-- Notes: To test the admin dashboard, create an auth user via Supabase Dashboard / API with email: admin@ventadepaltas.cl
-- The trigger `on_auth_user_created` will automatically create the profile as `super_admin`.

-- --------------------------------------------------
-- 8. INITIAL SEED DATA FOR DYNAMIC SEO PAGES
-- --------------------------------------------------
insert into public.seo_pages (titulo, slug, keyword_principal, meta_title, meta_description, contenido, faq_json, schema_json, publicada)
values
  (
    'Palta Edranol por Mayor', 
    'palta-edranol-por-mayor', 
    'palta edranol', 
    'Palta Edranol por Mayor | Distribución Directa Chile', 
    'Proveedor mayorista de Palta Edranol en Chile. Fruto de piel verde y lisa con excelente calibre, ideal como polinizador y de gran sabor.', 
    '<h2>Características de la Palta Edranol</h2><p>La palta Edranol es una de las variedades de piel verde más cultivadas en Chile, utilizada comúnmente como polinizadora en huertos de palta Hass. Destaca por su forma de pera alargada, piel lisa y un sabor suave con notas a frutos secos.</p><h2>¿Por qué comprar palta Edranol al por mayor?</h2><p>Al ser cosechada a principios de la temporada, la Edranol representa una alternativa económica y de excelente calidad cuando la palta Hass nacional está en sus etapas iniciales. Su rendimiento por kilo es excelente, lo que la hace muy cotizada por casinos de alimentos y procesadores industriales de pulpa.</p>', 
    '[{"question": "¿Cuál es la temporada de la palta Edranol?", "answer": "Se cosecha principalmente a fines del otoño y durante el invierno en Chile (Mayo a Agosto)."}, {"question": "¿Sirve para moler en sangucherías?", "answer": "Sí, tiene una textura muy cremosa y un excelente color verde brillante que resiste muy bien la oxidación al vacío."}]', 
    '{}', 
    true
  ),
  (
    'Palta Fuerte por Mayor', 
    'palta-fuerte-por-mayor', 
    'palta fuerte', 
    'Palta Fuerte por Mayor | Distribución Directa Chile', 
    'Proveedor mayorista de Palta Fuerte. Fruto de piel verde y cremocidad única. Ideal para casinos, restaurantes y reventa.', 
    '<h2>¿Qué es la variedad de Palta Fuerte?</h2><p>La variedad Fuerte es una palta híbrida de origen mexicano-guatemalteco. Destaca por su piel verde opaca, lisa y delgada. Es conocida comercialmente como una de las paltas con mayor concentración de grasas saludables, otorgándole una textura extremadamente mantecosa.</p><h2>Ideal para la Cocina Profesional</h2><p>Su pulpa no tiene hebras y su semilla se separa con suma facilidad, agilizando el tiempo de preparación en cocinas de alto volumen como casinos corporativos y restaurantes tradicionales.</p>', 
    '[{"question": "¿Cómo identificar una palta Fuerte madura?", "answer": "A diferencia de la Hass, la Fuerte no cambia de color al madurar; se mantiene verde. Para saber si está lista, debe ceder a una suave presión con la palma de la mano."}]', 
    '{}', 
    true
  ),
  (
    'Palta Chilena Premium por Mayor', 
    'palta-chilena-premium', 
    'palta chilena', 
    'Palta Chilena Premium al por Mayor | Abastecimiento B2B', 
    'Distribución de palta chilena seleccionada de los valles de Quillota, Cabildo y Cruz. Máxima cremosidad y calibre para restaurantes.', 
    '<h2>El Estándar de la Palta Chilena</h2><p>La palta chilena (cosechada en los valles de Quillota, Petorca, Cabildo y la RM) es reconocida a nivel mundial por sus condiciones ideales de cultivo. La oscilación térmica de los valles chilenos permite una acumulación lenta y óptima de materia seca, dando origen a una palta más sabrosa, cremosa y aceitosa que la de otros orígenes.</p><h2>Abastecimiento Directo de Packing</h2><p>Trabajamos de forma directa con agricultores locales, garantizando un proceso de cosecha óptimo, cadena de frío y transporte rápido hasta Santiago para asegurar la frescura de los frutos.</p>', 
    '[{"question": "¿Por qué la palta chilena es más cremosa?", "answer": "Debido al clima de los valles centrales de Chile, el fruto permanece más tiempo en el árbol acumulando aceites esenciales antes de su recolección."}]', 
    '{}', 
    true
  ),
  (
    'Palta Hass Peruana por Mayor', 
    'palta-hass-peruana', 
    'palta hass peruana', 
    'Palta Hass Peruana al por Mayor | Importación Directa', 
    'Importadores directos de palta Hass peruana. Abastecimiento garantizado durante la temporada de otoño-invierno con calibres uniformes.', 
    '<h2>Abastecimiento de Palta Hass Peruana</h2><p>Durante los meses de otoño e invierno en Chile (Abril a Julio), la producción nacional entra en receso. Para mantener el abastecimiento constante de tu restaurante o casino, importamos palta Hass de Perú de zonas agrícolas certificadas.</p><h2>Beneficios de la Palta Importada</h2><p>Esta variedad destaca por calibres muy homogéneos y pieles limpias, lo que reduce las pérdidas por descarte en reventas de minimarket o preparación de platos masivos.</p>', 
    '[{"question": "¿Cuál es la diferencia de sabor con la chilena?", "answer": "La palta peruana posee un porcentaje ligeramente menor de aceite debido al clima tropical de origen, haciéndola un poco más fresca e ideal para ensaladas y guacamole."}]', 
    '{}', 
    true
  ),
  (
    'Compra de Paltas al por Mayor', 
    'compra-de-paltas-al-por-mayor', 
    'compra de paltas al por mayor', 
    'Compra de Paltas al por Mayor | Proveedor Directo Chile', 
    '¿Buscas comprar paltas al por mayor? Abastecemos a minimarkets, distribuidores y centrales de compra con las mejores tarifas de packing.', 
    '<h2>Optimiza tu Compra Mayorista de Paltas</h2><p>Comprar paltas por volumen requiere de un proveedor confiable que garantice peso neto, calibres correctos y continuidad de despacho. En VENTADEPALTAS.CL simplificamos tu canal de compras hortofrutícolas B2B.</p>', 
    '[]', 
    '{}', 
    true
  ),
  (
    'Proveedor de Frutas y Verduras para Empresas', 
    'proveedor-de-frutas-para-empresas', 
    'proveedor de frutas para empresas', 
    'Proveedor de Frutas para Empresas | Servicios de Oficina', 
    'Abastecimiento de frutas saludables para oficinas y comedores corporativos en Santiago. Cajas listas de palta Hass y frutas de estación.', 
    '<h2>Fruta Saludable en tu Espacio de Trabajo</h2><p>Fomentar la alimentación saludable en la oficina mejora el clima laboral y el bienestar de tus colaboradores. Entregamos cajas surtidas de fruta fresca y cajas exclusivas de palta Hass seleccionada listas para el consumo del personal.</p>', 
    '[]', 
    '{}', 
    true
  ),
  (
    'Frutas y Verduras para Casinos y Concesiones', 
    'frutas-y-verduras-para-casinos', 
    'frutas y verduras para casinos', 
    'Frutas y Verduras para Casinos | Distribuidor Mayorista', 
    'Distribuidor mayorista de frutas y verduras para casinos institucionales y colegios. Trazabilidad, certificaciones sanitarias y volumen continuo.', 
    '<h2>Abastecimiento Mayorista para Alimentación Colectiva</h2><p>Entregamos suministros a gran escala para empresas concesionarias de casinos. Cumplimos con estándares de inocuidad alimentaria, embalajes adecuados y despacho puntual.</p>', 
    '[]', 
    '{}', 
    true
  ),
  (
    'Venta de Paltas en Las Condes', 
    'venta-de-paltas-en-las-condes', 
    'venta de paltas en las condes', 
    'Venta de Paltas en Las Condes por Mayor | Proveedor Directo', 
    'Comprar paltas por mayor en Las Condes. Distribución de palta Hass premium para restaurantes, cafeterías y sushi de Las Condes. Despacho rápido.', 
    '<h2>Proveedor de Palta Hass en Las Condes</h2><p>Contáctanos para despacho rápido...</p>', 
    '[]', 
    '{}', 
    true
  ),
  (
    'Venta de Paltas en Vitacura', 
    'venta-de-paltas-en-vitacura', 
    'venta de paltas en vitacura', 
    'Venta de Paltas en Vitacura por Mayor | Proveedor Hass', 
    'Abastecimiento de palta Hass seleccionada en Vitacura. Despacho express para restaurantes, locales y banqueterías de Vitacura.', 
    '<h2>Proveedor en Vitacura</h2><p>Calidad de exportación...</p>', 
    '[]', 
    '{}', 
    true
  ),
  (
    'Venta de Paltas en Providencia', 
    'venta-de-providencia', 
    'venta de paltas en providencia', 
    'Venta de Paltas en Providencia por Mayor | Proveedor Premium', 
    'Distribución de palta Hass para restaurantes y cafeterías de Providencia. Despacho diario temprano por la mañana. Calibres seleccionados.', 
    '<h2>Proveedor en Providencia</h2><p>Paltas listas para moler y servir en Providencia...</p>', 
    '[]', 
    '{}', 
    true
  )
on conflict (slug) do update 
set 
  titulo = excluded.titulo,
  keyword_principal = excluded.keyword_principal,
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description,
  contenido = excluded.contenido,
  faq_json = excluded.faq_json,
  schema_json = excluded.schema_json,
  publicada = excluded.publicada;

