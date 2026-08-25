<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SeoPage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Illuminate\View\View;

class AdminSeoPageController extends Controller
{
    public function index(): View
    {
        $pages = SeoPage::latest()->get();
        return view('admin.seo-pages.index', compact('pages'));
    }

    public function store(Request $request): RedirectResponse|JsonResponse
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:seo_pages,slug',
            'keyword_principal' => 'required|string|max:255',
            'meta_title' => 'required|string|max:255',
            'meta_description' => 'required|string',
            'contenido' => 'required|string',
            'faq_json' => 'nullable|string',
            'schema_json' => 'nullable|string',
            'publicada' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['slug']);
        $validated['publicada'] = $request->boolean('publicada');

        // Parse FAQs JSON
        if (!empty($validated['faq_json'])) {
            $validated['faq_json'] = json_decode($validated['faq_json'], true) ?? [];
        } else {
            $validated['faq_json'] = [];
        }

        // Parse Schema JSON
        if (!empty($validated['schema_json'])) {
            $validated['schema_json'] = json_decode($validated['schema_json'], true) ?? [];
        } else {
            $validated['schema_json'] = [];
        }

        SeoPage::create($validated);

        return redirect()->route('admin.seo-pages.index')->with('success', 'Página SEO creada exitosamente.');
    }

    public function update(Request $request, SeoPage $seoPage): RedirectResponse|JsonResponse
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:seo_pages,slug,' . $seoPage->id,
            'keyword_principal' => 'required|string|max:255',
            'meta_title' => 'required|string|max:255',
            'meta_description' => 'required|string',
            'contenido' => 'required|string',
            'faq_json' => 'nullable|string',
            'schema_json' => 'nullable|string',
            'publicada' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['slug']);
        $validated['publicada'] = $request->boolean('publicada');

        if (!empty($validated['faq_json'])) {
            $validated['faq_json'] = json_decode($validated['faq_json'], true) ?? [];
        } else {
            $validated['faq_json'] = [];
        }

        if (!empty($validated['schema_json'])) {
            $validated['schema_json'] = json_decode($validated['schema_json'], true) ?? [];
        } else {
            $validated['schema_json'] = [];
        }

        $seoPage->update($validated);

        return redirect()->route('admin.seo-pages.index')->with('success', 'Página SEO actualizada exitosamente.');
    }

    public function togglePublish(SeoPage $seoPage): JsonResponse
    {
        $seoPage->update(['publicada' => !$seoPage->publicada]);

        return response()->json([
            'success' => true,
            'publicada' => $seoPage->publicada,
            'message' => $seoPage->publicada ? 'Página publicada en la web.' : 'Página pasada a borrador.',
        ]);
    }

    public function destroy(SeoPage $seoPage): RedirectResponse
    {
        $seoPage->delete();
        return redirect()->route('admin.seo-pages.index')->with('success', 'Página SEO eliminada correctamente.');
    }
}
