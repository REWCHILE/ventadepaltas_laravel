<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\View\View;

class HomeController extends Controller
{
    public function index(): View
    {
        $recentPosts = Post::published()->latest()->take(3)->get();
        return view('home', compact('recentPosts'));
    }
}
