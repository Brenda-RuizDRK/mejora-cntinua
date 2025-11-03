<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ReporteProcesoExtrude;
use App\Models\ReporteProcesoExtrudeAccion;
use App\Models\EtiquetaProduccion;

class ReporteProcesoExtrusionController extends Controller
{
     public function productos()
{
    try {
        $productos = EtiquetaProduccion::with('producto2:id,nombre,clave')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'nombre' => $item->producto2?->nombre,
                    'clave' => $item->producto2?->clave,
                ];
            })
            ->filter(fn($p) => $p['nombre'] !== null)
            ->values();

        return response()->json($productos);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ], 500);
    }
}

public function store(Request $request)
{
    $request->validate([
        'producto_etiqueta_id' => 'required|exists:etiqueta_produccions,id',
        'lote' => 'required|string',
        'orden' => 'required|string',
        'maquina' => 'required|string',
        'fecha' => 'required|string',
        'hora' => 'required|string',
        'formulas_totales' => 'nullable|string',
        'kg_formula' => 'nullable|numeric',
        'nombre_operador' => 'nullable|string',
        'nom_supervisor' => 'nullable|string',
    ]);

    $registro = ReporteProcesoExtrude::create($request->all());

    // 🔹 Devolvemos el ID del registro creado
    return response()->json([
        'success' => true,
        'id' => $registro->id,
    ]);
}

public function acciones($id)
{
    $reporte = ReporteProcesoExtrude::with('etiquetaProduccion.producto2')->findOrFail($id);

    return inertia('Extrusion/54_2/ProcesoExtr54_2', [
        'reporte' => [
            'id' => $reporte->id,
            'orden' => $reporte->orden,
            'lote' => $reporte->lote,
            'maquina' => $reporte->maquina,
            'fecha' => $reporte->fecha,
            'hora' => $reporte->hora,
            'producto_nombre' => $reporte->etiquetaProduccion->producto2->nombre ?? 'Sin nombre',
            'producto_clave' => $reporte->etiquetaProduccion->producto2->clave ?? 'Sin clave',
        ],
    ]);
}


public function storeAccion(Request $request)
{
    $request->validate([
        'reporte_proceso_id' => 'required|exists:reporte_proceso_extrudes,id',
        'fecha_hora_inicio' => 'required|date',
        'fecha_hora_final' => 'nullable|date',
        'accion' => 'required|string',
        'paro' => 'nullable|string',
        'no_formula' => 'nullable|string',
        'kilos' => 'nullable|numeric',
        'comentario' => 'nullable|string',
        'operador' => 'nullable|string',
    ]);

    $accion = ReporteProcesoExtrudeAccion::create($request->all());

    return response()->json([
        'success' => true,
        'message' => 'Acción registrada correctamente.',
        'accion' => $accion
    ]);
}


public function cerrarAccion(Request $request, $id)
{
    try {
        $accion = ReporteProcesoExtrudeAccion::findOrFail($id);

        $accion->update([
            'fecha_hora_final' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Acción finalizada correctamente.',
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ], 500);
    }
}

public function obtenerAcciones($reporteId)
{
    try {
        $acciones = ReporteProcesoExtrudeAccion::where('reporte_proceso_id', $reporteId)
            ->orderBy('fecha_hora_inicio', 'asc')
            ->get([
                'id',
                'accion',
                'fecha_hora_inicio',
                'fecha_hora_final',
                'operador',
                'paro',
                'no_formula'
            ]);

        return response()->json([
            'success' => true,
            'acciones' => $acciones
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 500);
    }
}

}
