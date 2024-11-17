<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HorarioController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/timeline', function () {
    return view('timeline');
});



Route::get('/api/horarios', [HorarioController::class, 'index']);

