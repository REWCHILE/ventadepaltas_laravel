<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Lead;
use App\Models\LeadNote;
use App\Models\LeadHistory;
use App\Models\SeoPage;
use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Default Administrators
        $superAdmin = User::firstOrCreate(
            ['email' => 'admin@ventadepaltas.cl'],
            [
                'name' => 'Super Administrador',
                'password' => Hash::make('admin123'),
                'role' => 'super_admin',
            ]
        );

        $adminComercial = User::firstOrCreate(
            ['email' => 'comercial@ventadepaltas.cl'],
            [
                'name' => 'Ejecutivo Comercial',
                'password' => Hash::make('admin123'),
                'role' => 'admin_comercial',
            ]
        );

        // 2. Seed SEO Dynamic Pages
        $seoPages = [
            [
                'titulo' => 'Palta Edranol por Mayor',
                'slug' => 'palta-edranol-por-mayor',
                'keyword_principal' => 'palta edranol',
                'meta_title' => 'Palta Edranol por Mayor | Distribución Directa Chile',
                'meta_description' => 'Proveedor mayorista de Palta Edranol en Chile. Fruto de piel verde y lisa con excelente calibre, ideal como polinizador y de gran sabor.',
                'contenido' => '<h2>Características de la Palta Edranol</h2><p>La palta Edranol es una de las variedades de piel verde más cultivadas en Chile, utilizada comúnmente como polinizadora en huertos de palta Hass. Destaca por su forma de pera alargada, piel lisa y un sabor suave con notas a frutos secos.</p><h2>¿Por qué comprar palta Edranol al por mayor?</h2><p>Al ser cosechada a principios de la temporada, la Edranol representa una alternativa económica y de excelente calidad cuando la palta Hass nacional está en sus etapas iniciales. Su rendimiento por kilo es excelente, lo que la hace muy cotizada por casinos de alimentos y procesadores industriales de pulpa.</p>',
                'faq_json' => [
                    ['question' => '¿Cuál es la temporada de la palta Edranol?', 'answer' => 'Se cosecha principalmente a fines del otoño y durante el invierno en Chile (Mayo a Agosto).'],
                    ['question' => '¿Sirve para moler en sangucherías?', 'answer' => 'Sí, tiene una textura muy cremosa y un excelente color verde brillante que resiste muy bien la oxidación al vacío.']
                ],
                'schema_json' => [],
                'publicada' => true,
            ],
            [
                'titulo' => 'Palta Fuerte por Mayor',
                'slug' => 'palta-fuerte-por-mayor',
                'keyword_principal' => 'palta fuerte',
                'meta_title' => 'Palta Fuerte por Mayor | Distribución Directa Chile',
                'meta_description' => 'Proveedor mayorista de Palta Fuerte. Fruto de piel verde y cremosidad única. Ideal para casinos, restaurantes y reventa.',
                'contenido' => '<h2>¿Qué es la variedad de Palta Fuerte?</h2><p>La variedad Fuerte es una palta híbrida de origen mexicano-guatemalteco. Destaca por su piel verde opaca, lisa y delgada. Es conocida comercialmente como una de las paltas con mayor concentración de grasas saludables, otorgándole una textura extremadamente mantecosa.</p><h2>Ideal para la Cocina Profesional</h2><p>Su pulpa no tiene hebras y su semilla se separa con suma facilidad, agilizando el tiempo de preparación en cocinas de alto volumen como casinos corporativos y restaurantes tradicionales.</p>',
                'faq_json' => [
                    ['question' => '¿Cómo identificar una palta Fuerte madura?', 'answer' => 'A diferencia de la Hass, la Fuerte no cambia de color al madurar; se mantiene verde. Para saber si está lista, debe ceder a una suave presión con la palma de la mano.']
                ],
                'schema_json' => [],
                'publicada' => true,
            ],
            [
                'titulo' => 'Palta Chilena Premium por Mayor',
                'slug' => 'palta-chilena-premium',
                'keyword_principal' => 'palta chilena',
                'meta_title' => 'Palta Chilena Premium al por Mayor | Abastecimiento B2B',
                'meta_description' => 'Distribución de palta chilena seleccionada de los valles de Quillota, Cabildo y Cruz. Máxima cremosidad y calibre para restaurantes.',
                'contenido' => '<h2>El Estándar de la Palta Chilena</h2><p>La palta chilena (cosechada en los valles de Quillota, Petorca, Cabildo y la RM) es reconocida a nivel mundial por sus condiciones ideales de cultivo. La oscilación térmica de los valles chilenos permite una acumulación lenta y óptima de materia seca, dando origen a una palta más sabrosa, cremosa y aceitosa que la de otros orígenes.</p><h2>Abastecimiento Directo de Packing</h2><p>Trabajamos de forma directa con agricultores locales, garantizando un proceso de cosecha óptimo, cadena de frío y transporte rápido hasta Santiago para asegurar la frescura de los frutos.</p>',
                'faq_json' => [
                    ['question' => '¿Por qué la palta chilena es más cremosa?', 'answer' => 'Debido al clima de los valles centrales de Chile, el fruto permanece más tiempo en el árbol acumulando aceites esenciales antes de su recolección.']
                ],
                'schema_json' => [],
                'publicada' => true,
            ],
            [
                'titulo' => 'Palta Hass Peruana por Mayor',
                'slug' => 'palta-hass-peruana',
                'keyword_principal' => 'palta hass peruana',
                'meta_title' => 'Palta Hass Peruana al por Mayor | Importación Directa',
                'meta_description' => 'Importadores directos de palta Hass peruana. Abastecimiento garantizado durante la temporada de otoño-invierno con calibres uniformes.',
                'contenido' => '<h2>Abastecimiento de Palta Hass Peruana</h2><p>Durante los meses de otoño e invierno en Chile (Abril a Julio), la producción nacional entra en receso. Para mantener el abastecimiento constante de tu restaurante o casino, importamos palta Hass de Perú de zonas agrícolas certificadas.</p><h2>Beneficios de la Palta Importada</h2><p>Esta variedad destaca por calibres muy homogéneos y pieles limpias, lo que reduce las pérdidas por descarte en reventas de minimarket o preparación de platos masivos.</p>',
                'faq_json' => [
                    ['question' => '¿Cuál es la diferencia de sabor con la chilena?', 'answer' => 'La palta peruana posee un porcentaje ligeramente menor de aceite debido al clima tropical de origen, haciéndola un poco más fresca e ideal para ensaladas y guacamole.']
                ],
                'schema_json' => [],
                'publicada' => true,
            ],
            [
                'titulo' => 'Compra de Paltas al por Mayor',
                'slug' => 'compra-de-paltas-al-por-mayor',
                'keyword_principal' => 'compra de paltas al por mayor',
                'meta_title' => 'Compra de Paltas al por Mayor | Proveedor Directo Chile',
                'meta_description' => '¿Buscas comprar paltas al por mayor? Abastecemos a minimarkets, distribuidores y centrales de compra con las mejores tarifas de packing.',
                'contenido' => '<h2>Optimiza tu Compra Mayorista de Paltas</h2><p>Comprar paltas por volumen requiere de un proveedor confiable que garantice peso neto, calibres correctos y continuidad de despacho. En VENTADEPALTAS.CL simplificamos tu canal de compras hortofrutícolas B2B con logística especializada en Santiago.</p>',
                'faq_json' => [],
                'schema_json' => [],
                'publicada' => true,
            ],
            [
                'titulo' => 'Proveedor de Frutas y Verduras para Empresas',
                'slug' => 'proveedor-de-frutas-para-empresas',
                'keyword_principal' => 'proveedor de frutas para empresas',
                'meta_title' => 'Proveedor de Frutas para Empresas | Servicios de Oficina',
                'meta_description' => 'Abastecimiento de frutas saludables para oficinas y comedores corporativos en Santiago. Cajas listas de palta Hass y frutas de estación.',
                'contenido' => '<h2>Fruta Saludable en tu Espacio de Trabajo</h2><p>Fomentar la alimentación saludable en la oficina mejora el clima laboral y el bienestar de tus colaboradores. Entregamos cajas surtidas de fruta fresca y cajas exclusivas de palta Hass seleccionada listas para el consumo del personal.</p>',
                'faq_json' => [],
                'schema_json' => [],
                'publicada' => true,
            ],
            [
                'titulo' => 'Frutas y Verduras para Casinos y Concesiones',
                'slug' => 'frutas-y-verduras-para-casinos',
                'keyword_principal' => 'frutas y verduras para casinos',
                'meta_title' => 'Frutas y Verduras para Casinos | Distribuidor Mayorista',
                'meta_description' => 'Distribuidor mayorista de frutas y verduras para casinos institucionales y colegios. Trazabilidad, certificaciones sanitarias y volumen continuo.',
                'contenido' => '<h2>Abastecimiento Mayorista para Alimentación Colectiva</h2><p>Entregamos suministros a gran escala para empresas concesionarias de casinos. Cumplimos con estándares de inocuidad alimentaria, embalajes adecuados y despacho puntual.</p>',
                'faq_json' => [],
                'schema_json' => [],
                'publicada' => true,
            ],
            [
                'titulo' => 'Venta de Paltas en Las Condes',
                'slug' => 'venta-de-paltas-en-las-condes',
                'keyword_principal' => 'venta de paltas en las condes',
                'meta_title' => 'Venta de Paltas en Las Condes por Mayor | Proveedor Directo',
                'meta_description' => 'Comprar paltas por mayor en Las Condes. Distribución de palta Hass premium para restaurantes, cafeterías y sushi de Las Condes. Despacho rápido.',
                'contenido' => '<h2>Proveedor de Palta Hass en Las Condes</h2><p>Despacho express para locales gastronómicos, hoteles y cafeterías en el sector oriente de Santiago. Calibres homogéneos y maduración controlada.</p>',
                'faq_json' => [],
                'schema_json' => [],
                'publicada' => true,
            ],
            [
                'titulo' => 'Venta de Paltas en Vitacura',
                'slug' => 'venta-de-paltas-en-vitacura',
                'keyword_principal' => 'venta de paltas en vitacura',
                'meta_title' => 'Venta de Paltas en Vitacura por Mayor | Proveedor Hass',
                'meta_description' => 'Abastecimiento de palta Hass seleccionada en Vitacura. Despacho express para restaurantes, locales y banqueterías de Vitacura.',
                'contenido' => '<h2>Proveedor en Vitacura</h2><p>Calidad de exportación directamente en tu cocina en Vitacura. Cero merma y textura mantecosa constante.</p>',
                'faq_json' => [],
                'schema_json' => [],
                'publicada' => true,
            ],
            [
                'titulo' => 'Venta de Paltas en Providencia',
                'slug' => 'venta-de-providencia',
                'keyword_principal' => 'venta de paltas en providencia',
                'meta_title' => 'Venta de Paltas en Providencia por Mayor | Proveedor Premium',
                'meta_description' => 'Distribución de palta Hass para restaurantes y cafeterías de Providencia. Despacho diario temprano por la mañana. Calibres seleccionados.',
                'contenido' => '<h2>Proveedor en Providencia</h2><p>Paltas listas para moler y servir en Providencia. Entregas tempranas antes de las 11:00 AM para sincronizar con tu turno de cocina.</p>',
                'faq_json' => [],
                'schema_json' => [],
                'publicada' => true,
            ]
        ];

        foreach ($seoPages as $pageData) {
            SeoPage::updateOrCreate(['slug' => $pageData['slug']], $pageData);
        }

        // 3. Seed Blog Posts
        $posts = [
            [
                'titulo' => 'Cómo conservar la Palta Hass en Restaurantes para evitar mermas',
                'slug' => 'como-conservar-palta-hass-restaurantes',
                'meta_title' => 'Cómo conservar la Palta Hass en Restaurantes | VENTADEPALTAS.CL',
                'meta_description' => 'Consejos profesionales para prolongar la vida útil de tus paltas en cocinas comerciales. Aprende trucos térmicos y de almacenamiento.',
                'keyword_principal' => 'conservar palta',
                'contenido' => '<h2>La importancia del control térmico en cocina</h2><p>La palta Hass es una fruta climatérica extremadamente sensible a la temperatura. Mantener los frutos entre 4°C y 6°C una vez alcanzado el punto óptimo de consumo permite extender su vida útil hasta por 7 días sin pérdida de color ni generación de hebras negras.</p><h2>Técnicas de sellado al vacío</h2><p>Para pulpa molida en sangucherías de alto flujo, la extracción total de oxígeno mediante envasado al vacío o el uso de una fina película de aceite vegetal sobre la superficie evita la oxidación enzimática por polifenol oxidasa.</p>',
                'schema_json' => [],
                'publicada' => true,
            ],
            [
                'titulo' => 'Guía Completa de Calibres de Palta: ¿Cuál es el mejor para tu negocio?',
                'slug' => 'guia-calibres-de-palta-hass',
                'meta_title' => 'Guía Completa de Calibres de Palta Hass | VENTADEPALTAS.CL',
                'meta_description' => 'Diferencias entre calibres Super Extra, Extra, Primera y Segunda. Conoce cuál rinde más en sangucherías, sushis y casinos institucionales.',
                'keyword_principal' => 'calibres de palta',
                'contenido' => '<h2>Entendiendo la clasificación de calibres</h2><p>El calibre no determina la calidad del fruto, sino su peso unitario. Conocer la diferencia entre Calibre Súper Extra (260g-300g), Extra (220g-250g), Primera (180g-210g) y Segunda (140g-170g) te permite optimizar el costo de tus recetas y la velocidad de pelado en cocina.</p>',
                'schema_json' => [],
                'publicada' => true,
            ],
            [
                'titulo' => 'El origen de la Palta Hass en Chile: Temporadas y abastecimiento anual',
                'slug' => 'origen-temporada-palta-hass-chile',
                'meta_title' => 'Origen y Temporadas de la Palta Hass en Chile | VENTADEPALTAS.CL',
                'meta_description' => '¿Por qué comemos palta de Perú o México en invierno? Conoce el ciclo anual del aguacate y cómo asegurar stock permanente.',
                'keyword_principal' => 'temporada de palta',
                'contenido' => '<h2>Ciclo anual del aguacate en el hemisferio sur</h2><p>La temporada de palta chilena se concentra entre los meses de Agosto y Marzo. Durante el otoño e invierno, la importación controlada desde valles certificados de Perú permite mantener la cadena de suministro continuo sin interrupciones operativas.</p>',
                'schema_json' => [],
                'publicada' => true,
            ],
        ];

        foreach ($posts as $postData) {
            Post::updateOrCreate(['slug' => $postData['slug']], $postData);
        }
    }
}
