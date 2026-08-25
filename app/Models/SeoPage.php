<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class SeoPage extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'slug',
        'keyword_principal',
        'meta_title',
        'meta_description',
        'contenido',
        'faq_json',
        'schema_json',
        'publicada',
    ];

    protected $casts = [
        'faq_json' => 'array',
        'schema_json' => 'array',
        'publicada' => 'boolean',
    ];

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('publicada', true);
    }
}
