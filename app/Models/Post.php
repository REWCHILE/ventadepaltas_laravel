<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'slug',
        'contenido',
        'meta_title',
        'meta_description',
        'keyword_principal',
        'schema_json',
        'publicada',
    ];

    protected $casts = [
        'schema_json' => 'array',
        'publicada' => 'boolean',
    ];

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('publicada', true);
    }
}
