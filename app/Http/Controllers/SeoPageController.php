<?php

namespace App\Http\Controllers;

use App\Models\SeoPage;
use Illuminate\Http\Request;
use Illuminate\View\View;

class SeoPageController extends Controller
{
    private array $slugImages = [
        'palta-edranol-por-mayor' => '/images/palta_edranol.png',
        'palta-fuerte-por-mayor' => '/images/palta_fuerte.png',
        'palta-chilena-premium' => '/images/palta_chilena.png',
        'palta-hass-peruana' => '/images/palta_peruana.png',
        'venta-de-paltas-en-las-condes' => '/images/premium_hass_avocados.png',
        'venta-de-paltas-en-vitacura' => '/images/premium_hass_avocados.png',
        'venta-de-paltas-en-providencia' => '/images/premium_hass_avocados.png',
        'compra-de-paltas-al-por-mayor' => '/images/premium_hass_avocados.png',
        'proveedor-de-frutas-para-empresas' => '/images/premium_hass_avocados.png',
        'frutas-y-verduras-para-casinos' => '/images/premium_hass_avocados.png',
    ];

    public function show(string $slug): View
    {
        $page = SeoPage::where('slug', $slug)
            ->where('publicada', true)
            ->firstOrFail();

        $heroImage = $this->slugImages[$slug] ?? '/images/premium_hass_avocados.png';

        return view('pages.seo-dynamic', compact('page', 'heroImage'));
    }
}
