<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Illuminate\View\View;

class AdminBlogController extends Controller
{
    public function index(): View
    {
        $posts = Post::latest()->get();
        return view('admin.blog.index', compact('posts'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:posts,slug',
            'keyword_principal' => 'required|string|max:255',
            'meta_title' => 'required|string|max:255',
            'meta_description' => 'required|string',
            'contenido' => 'required|string',
            'schema_json' => 'nullable|string',
            'publicada' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['slug']);
        $validated['publicada'] = $request->boolean('publicada');

        if (!empty($validated['schema_json'])) {
            $validated['schema_json'] = json_decode($validated['schema_json'], true) ?? [];
        } else {
            $validated['schema_json'] = [];
        }

        Post::create($validated);

        return redirect()->route('admin.blog.index')->with('success', 'Artículo de blog publicado exitosamente.');
    }

    public function update(Request $request, Post $post): RedirectResponse
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:posts,slug,' . $post->id,
            'keyword_principal' => 'required|string|max:255',
            'meta_title' => 'required|string|max:255',
            'meta_description' => 'required|string',
            'contenido' => 'required|string',
            'schema_json' => 'nullable|string',
            'publicada' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['slug']);
        $validated['publicada'] = $request->boolean('publicada');

        if (!empty($validated['schema_json'])) {
            $validated['schema_json'] = json_decode($validated['schema_json'], true) ?? [];
        } else {
            $validated['schema_json'] = [];
        }

        $post->update($validated);

        return redirect()->route('admin.blog.index')->with('success', 'Artículo actualizado exitosamente.');
    }

    public function togglePublish(Post $post): JsonResponse
    {
        $post->update(['publicada' => !$post->publicada]);

        return response()->json([
            'success' => true,
            'publicada' => $post->publicada,
            'message' => $post->publicada ? 'Artículo publicado en el blog.' : 'Artículo pasado a borrador.',
        ]);
    }

    public function destroy(Post $post): RedirectResponse
    {
        $post->delete();
        return redirect()->route('admin.blog.index')->with('success', 'Artículo eliminado correctamente.');
    }
}
