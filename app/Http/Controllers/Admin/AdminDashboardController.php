<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\SeoPage;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\View\View;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    public function index(): View
    {
        $today = Carbon::today();
        $startOfWeek = Carbon::now()->startOfWeek();
        $startOfMonth = Carbon::now()->startOfMonth();

        $leads = Lead::latest()->get();

        $kpis = [
            'today' => $leads->where('created_at', '>=', $today)->count(),
            'week' => $leads->where('created_at', '>=', $startOfWeek)->count(),
            'month' => $leads->where('created_at', '>=', $startOfMonth)->count(),
            'total' => $leads->count(),
            'totalKg' => $leads->sum('cantidad_estimada_kg'),
        ];

        // Distribution by Comuna (top 6)
        $comunaStats = Lead::select('comuna', DB::raw('count(*) as count'))
            ->groupBy('comuna')
            ->orderByDesc('count')
            ->take(6)
            ->get();

        // Distribution by Client Type
        $clientTypeStats = Lead::select('tipo_cliente', DB::raw('count(*) as count'))
            ->groupBy('tipo_cliente')
            ->orderByDesc('count')
            ->get();

        // Distribution by Origin Page
        $pageStats = Lead::select('pagina_origen', DB::raw('count(*) as count'))
            ->groupBy('pagina_origen')
            ->orderByDesc('count')
            ->take(6)
            ->get();

        // Distribution by Status
        $statusStats = Lead::select('estado', DB::raw('count(*) as count'))
            ->groupBy('estado')
            ->get()
            ->pluck('count', 'estado')
            ->toArray();

        $recentLeads = Lead::latest()->take(8)->get();
        $seoPagesCount = SeoPage::count();
        $postsCount = Post::count();

        return view('admin.dashboard', compact(
            'kpis',
            'comunaStats',
            'clientTypeStats',
            'pageStats',
            'statusStats',
            'recentLeads',
            'seoPagesCount',
            'postsCount'
        ));
    }
}
