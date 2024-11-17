<?php
namespace App\Http\Controllers;

use App\Models\Horarios;
use Illuminate\Http\Request;

class HorarioController extends Controller
{
    public function index()
    {
        $events = Horarios::with('seccion.empleado')
            ->get()
            ->map(function($horario) {
                return [
                    'time' => $horario->entrada_1,
                    'description' => 'Entrada empleado',
                    'extraInfo' => [
                        'Employee: ' . $horario->seccion->empleado->nombre_empleado,
                        'Department: ' . $horario->seccion->nombre_seccion
                    ]
                ];
            });

        return response()->json($events);
    }
}

