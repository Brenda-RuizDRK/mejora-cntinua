<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\ExtruisionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Api\ReporteProcesoExtrusionController;



Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Rutas protegidas
Route::middleware('auth')->group(function () {
    Route::get('/usuarios', [UsuarioController::class, 'index'])->name('usuarios.index');
    Route::get('/extruion', [ExtruisionController::class, 'index'])->name('extrusion.index');
    Route::get('/extruion', [ExtruisionController::class, 'index'])->name('extrusion.index');
    Route::get('/extrusion/54_2', [ExtruisionController::class, 'view54_2'])->name('extrusion.view54_2');

    
    Route::get('/productos-etiqueta', [ReporteProcesoExtrusionController::class, 'productos']);
    Route::post('/reporte-proceso-extrude', [ReporteProcesoExtrusionController::class, 'store']);

 Route::get('/reporte-proceso-extrude/{id}/acciones', [ReporteProcesoExtrusionController::class, 'acciones'])
    ->name('reporte.extrude.acciones');


Route::post('/reporte-proceso-extrude/accion', [ReporteProcesoExtrusionController::class, 'storeAccion']);
Route::put('/reporte-proceso-extrude/accion/{id}/cerrar', [ReporteProcesoExtrusionController::class, 'cerrarAccion']);


});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware('auth')->name('dashboard');
