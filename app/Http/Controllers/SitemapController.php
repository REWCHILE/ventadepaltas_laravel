<?php

namespace App\Http\Controllers;

use App\Models\SeoPage;
use App\Models\Post;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $baseUrl = config('app.url', 'https://ventadepaltas.cl');

        $staticPages = [
            '',
            'venta-de-paltas-por-mayor',
            'proveedor-de-paltas-santiago',
            'palta-hass-por-mayor',
            'paltas-para-restaurantes',
            'paltas-para-casinos',
            'paltas-para-empresas',
            'contacto',
            'blog',
        ];

        $seoPages = SeoPage::published()->get(['slug', 'updated_at']);
        $posts = Post::published()->get(['slug', 'updated_at']);

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        foreach ($staticPages as $path) {
            $url = $path ? "{$baseUrl}/{$path}" : $baseUrl;
            $priority = $path === '' ? '1.0' : '0.9';
            $xml .= "<url><loc>{$url}</loc><changefreq>weekly</changefreq><priority>{$priority}</priority></url>";
        }

        foreach ($seoPages as $page) {
            $url = "{$baseUrl}/{$page->slug}";
            $lastmod = $page->updated_at->toAtomString();
            $xml .= "<url><loc>{$url}</loc><lastmod>{$lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>";
        }

        foreach ($posts as $post) {
            $url = "{$baseUrl}/blog/{$post->slug}";
            $lastmod = $post->updated_at->toAtomString();
            $xml .= "<url><loc>{$url}</loc><lastmod>{$lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>";
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }
}
