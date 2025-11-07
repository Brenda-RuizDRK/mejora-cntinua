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

    // 🔹 Se agrega el campo status por defecto en "Activo"
    $registro = ReporteProcesoExtrude::create([
        ...$request->all(),
        'status' => 'Activo',
    ]);

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

    // 🟢 Guardar una nueva acción
  public function storeAccion(Request $request)
{
    $request->validate([
        'reporte_proceso_id' => 'required|exists:reporte_proceso_extrudes,id',
        'fecha_inicio' => 'required|string',
        'hora_inicio' => 'required|string',
        'fecha_final' => 'nullable|string',
        'hora_final' => 'nullable|string',
        'accion' => 'required|string',
        'paro' => 'nullable|string',
        'no_formula' => 'nullable|string',
        'kilos' => 'nullable|numeric',
        'comentario' => 'nullable|string',
        'operador' => 'nullable|string',
    ]);

    $accion = ReporteProcesoExtrudeAccion::create([
        'reporte_proceso_id' => $request->reporte_proceso_id,
        'fecha_inicio' => $request->fecha_inicio,
        'hora_inicio' => $request->hora_inicio,
        'fecha_final' => $request->fecha_final,
        'hora_final' => $request->hora_final,
        'accion' => $request->accion,
        'paro' => $request->paro,
        'no_formula' => $request->no_formula,
        'kilos' => $request->kilos,
        'comentario' => $request->comentario,
        'operador' => $request->operador,
        'status' => 'Activo', // ✅ Nuevo campo
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Acción registrada correctamente.',
        'accion' => $accion,
    ]);
}


    // 🟠 Cerrar acción (guardar fecha_final y hora_final)
public function cerrarAccion(Request $request, $id)
{
    try {
        $accion = ReporteProcesoExtrudeAccion::findOrFail($id);

        $ahora = now()->setTimezone('America/Mexico_City');

        $accion->update([
            'fecha_final' => $ahora->format('d/m/Y'),
            'hora_final' => $ahora->format('H:i:s'),
            'status' => 'Desactivado', // 🔴 Se marca como finalizada
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


    // 🟣 Obtener acciones de un reporte
    public function obtenerAcciones($reporteId)
    {
        try {
            $acciones = ReporteProcesoExtrudeAccion::where('reporte_proceso_id', $reporteId)
                ->orderBy('id', 'asc')
                ->get([
                    'id',
                    'accion',
                    'fecha_inicio',
                    'hora_inicio',
                    'fecha_final',
                    'hora_final',
                    'operador',
                    'paro',
                    'no_formula',
                ]);

            return response()->json([
                'success' => true,
                'acciones' => $acciones,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

public function indexAcciones()
{
    try {
        $acciones = ReporteProcesoExtrudeAccion::with('reporteProcesoExtrude:id,orden,lote,maquina')
            ->orderBy('id', 'desc')
            ->get([
                'id',
                'reporte_proceso_id',
                'accion',
                'fecha_inicio',
                'hora_inicio',
                'fecha_final',
                'hora_final',
                'operador',
                'paro',
                'no_formula',
            ]);

        return inertia('Extrusion/Historial/Reguistro', [
            'acciones' => $acciones,
        ]);
    } catch (\Exception $e) {
        return back()->withErrors(['error' => $e->getMessage()]);
    }
}

public function productosEXT54()
{
    try {
        $reportes = ReporteProcesoExtrude::with([
            'etiquetaProduccion.producto2:id,nombre,clave',
            'acciones' => function ($query) {
                $query->latest('id')->limit(1); // solo la última acción
            }
        ])
            ->where('maquina', 'EXT54')
            ->get()
            ->map(function ($reporte) {
                $ultimaAccion = $reporte->acciones->first();
                return [
                    'id' => $reporte->id,
                    'nombre' => $reporte->etiquetaProduccion->producto2->nombre ?? 'Sin nombre',
                    'clave' => $reporte->etiquetaProduccion->producto2->clave ?? 'Sin clave',
                    'formula' => $ultimaAccion->no_formula ?? 'Sin fórmula',
                    'fecha' => $reporte->fecha,
                ];
            });

        return response()->json($reportes);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ], 500);
    }
}




}