<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'empresa',
        'email',
        'telefono',
        'comuna',
        'region',
        'cantidad_estimada_kg',
        'tipo_cliente',
        'mensaje',
        'pagina_origen',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'estado',
    ];

    protected $casts = [
        'cantidad_estimada_kg' => 'float',
    ];

    public function notes(): HasMany
    {
        return $this->hasMany(LeadNote::class)->latest();
    }

    public function history(): HasMany
    {
        return $this->hasMany(LeadHistory::class)->latest();
    }
}
