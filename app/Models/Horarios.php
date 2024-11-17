<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Horarios extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_horarios';

    protected $fillable = [
        'entrada_1',
        'salida_1',
        'entrada_2',
        'salida_2',
        'dia',
        'id_seccion',
    ];

    public function seccion()
    {
        return $this->belongsTo(Seccion::class, 'id_seccion', 'id_seccion');
    }
}


