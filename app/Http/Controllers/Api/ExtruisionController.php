<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ReporteProcesoExtrudeAccion;



class ExtruisionController extends Controller
{
       public function index()
    {
       
        return Inertia::render('Extrusion/Extrusores', [
           
        ]);
    }

     public function show($id)
    {
        // Puedes obtener datos del extrusor desde la BD si existen
        // $extrusor = Extrusor::findOrFail($id);

        // Por ahora lo mandamos simple
        return Inertia::render('Extrusion/ExtrusorView', [
            'extrusorId' => $id,
        ]);
    }

    public  function view54_2(){
        return Inertia::render('Extrusion/54_2/Ext54_2', [
           
        ]);
    }
public function accionesPorMaquinaEXT54()
{
    try {

        $accion = ReporteProcesoExtrudeAccion::whereHas('reporteProcesoExtrude', function ($q) {
                $q->where('maquina', 'EXT54-II');
        })
        ->with([
            'reporteProcesoExtrude' => function ($q) {
                $q->select('id','maquina','orden','lote','fecha','status','producto_etiqueta_id')
                  ->with(['producto:id,nombre']);
            }
        ])
        ->orderBy('id', 'desc')
        ->first([
            'id',
            'reporte_proceso_id',
            'accion',
            'fecha_inicio',
            'hora_inicio',
            'fecha_final',
            'hora_final',
            'no_formula',
            'paro',
            'operador',
            'status',
            'comentario'
        ]);

        return response()->json([
            'success' => true,
            'accion' => $accion,
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ], 500);
    }
}

public function vistaProceso($id)
{
    $accion = ReporteProcesoExtrudeAccion::where('reporte_proceso_id', $id)
        ->with([
            'reporteProcesoExtrude' => function ($q) {
                $q->with('producto:id,nombre');
            }
        ])
        ->orderBy('id', 'desc')
        ->first();

    return Inertia::render('Extrusion/ProcesoView', [
        'accion' => $accion
    ]);
}


    
}
