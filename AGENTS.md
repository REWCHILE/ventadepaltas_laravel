# VENTADEPALTAS.CL - Laravel Rules & Architecture Guidelines

This is a **Laravel 12 / 13 (PHP 8.3+)** web application with **Blade, Tailwind CSS, Alpine.js, Lucide Icons, and MySQL**.

## Guidelines:
1. **PHP/Laravel**: Follow standard Laravel conventions (Eloquent models, Controllers, Blade views, Form Requests, Seeders).
2. **Design & Views**: Use Blade components in `resources/views/components/` and layouts in `resources/views/layouts/`.
3. **Database**: Manage schema strictly via Laravel migrations in `database/migrations/`.
4. **CRM & SEO Engine**: All dynamic programmatic SEO pages are managed in the `seo_pages` table and served via `SeoPageController`.
