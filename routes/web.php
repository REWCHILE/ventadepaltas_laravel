<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\StaticPagesController;
use App\Http\Controllers\SeoPageController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\LeadSubmissionController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminLeadController;
use App\Http\Controllers\Admin\AdminSeoPageController;
use App\Http\Controllers\Admin\AdminBlogController;
use App\Http\Controllers\Admin\AdminSettingsController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

// High-Priority Niche SEO Static Pages
Route::get('/venta-de-paltas-por-mayor', [StaticPagesController::class, 'ventaMayor'])->name('pages.venta-mayor');
Route::get('/proveedor-de-paltas-santiago', [StaticPagesController::class, 'proveedorSantiago'])->name('pages.proveedor-santiago');
Route::get('/palta-hass-por-mayor', [StaticPagesController::class, 'hassPorMayor'])->name('pages.hass-por-mayor');
Route::get('/paltas-para-restaurantes', [StaticPagesController::class, 'paraRestaurantes'])->name('pages.restaurantes');
Route::get('/paltas-para-casinos', [StaticPagesController::class, 'paraCasinos'])->name('pages.casinos');
Route::get('/paltas-para-empresas', [StaticPagesController::class, 'paraEmpresas'])->name('pages.empresas');

Route::get('/contacto', [StaticPagesController::class, 'contacto'])->name('contacto');

// Blog Routes
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

// Lead Submission Quote Form (AJAX & Standard)
Route::post('/cotizar', [LeadSubmissionController::class, 'store'])->name('leads.submit');

// XML Sitemap for Google Search Console
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

/*
|--------------------------------------------------------------------------
| Admin Portal & Backoffice Routes (Auth Protected)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');

    // Leads CRM
    Route::get('/leads', [AdminLeadController::class, 'index'])->name('leads.index');
    Route::get('/leads/export', [AdminLeadController::class, 'exportCsv'])->name('leads.export');
    Route::get('/leads/{lead}', [AdminLeadController::class, 'show'])->name('leads.show');
    Route::get('/leads/{lead}/pdf', [AdminLeadController::class, 'pdfQuote'])->name('leads.pdf');
    Route::patch('/leads/{lead}/status', [AdminLeadController::class, 'updateStatus'])->name('leads.status');
    Route::post('/leads/{lead}/notes', [AdminLeadController::class, 'addNote'])->name('leads.notes');

    // Dynamic SEO Pages Management
    Route::get('/seo-pages', [AdminSeoPageController::class, 'index'])->name('seo-pages.index');
    Route::post('/seo-pages', [AdminSeoPageController::class, 'store'])->name('seo-pages.store');
    Route::put('/seo-pages/{seoPage}', [AdminSeoPageController::class, 'update'])->name('seo-pages.update');
    Route::patch('/seo-pages/{seoPage}/toggle', [AdminSeoPageController::class, 'togglePublish'])->name('seo-pages.toggle');
    Route::delete('/seo-pages/{seoPage}', [AdminSeoPageController::class, 'destroy'])->name('seo-pages.destroy');

    // Blog Articles Management
    Route::get('/blog', [AdminBlogController::class, 'index'])->name('blog.index');
    Route::post('/blog', [AdminBlogController::class, 'store'])->name('blog.store');
    Route::put('/blog/{post}', [AdminBlogController::class, 'update'])->name('blog.update');
    Route::patch('/blog/{post}/toggle', [AdminBlogController::class, 'togglePublish'])->name('blog.toggle');
    Route::delete('/blog/{post}', [AdminBlogController::class, 'destroy'])->name('blog.destroy');

    // SMTP & Notification Settings
    Route::get('/settings/smtp', [AdminSettingsController::class, 'smtp'])->name('settings.smtp');
    Route::post('/settings/smtp', [AdminSettingsController::class, 'updateSmtp'])->name('settings.smtp.update');
    Route::post('/settings/smtp/test-email', [AdminSettingsController::class, 'testEmail'])->name('settings.smtp.test-email');
    Route::post('/settings/smtp/test-webhook', [AdminSettingsController::class, 'testWebhook'])->name('settings.smtp.test-webhook');
});

/*
|--------------------------------------------------------------------------
| Dynamic Programmatic SEO Catch-All Route
|--------------------------------------------------------------------------
*/

Route::get('/{slug}', [SeoPageController::class, 'show'])->name('seo.dynamic');
