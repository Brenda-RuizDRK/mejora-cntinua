<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ReporteProcesoExtrude;
use App\Models\ReporteProcesoExtrudeAccion;
use App\Models\EtiquetaProduccion;
use App\Exports\ReporteProcesoExtrudeAccionesExport;
use Maatwebsite\Excel\Facades\Excel;

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
        $acciones = ReporteProcesoExtrudeAccion::with([
            // Incluye el reporte con los campos necesarios
            'reporteProcesoExtrude:id,orden,lote,maquina,producto_etiqueta_id,status',
            // Y dentro de él, incluye la cadena etiquetaProduccion → producto2
            'reporteProcesoExtrude.etiquetaProduccion.producto2:id,nombre,clave'
        ])
            ->orderBy('id', 'asc')
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
                'status',
                'comentario'
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
                // 🔹 Filtra acciones con status 'Activo' o 'Paro'
                $query->whereIn('status', ['Activo', 'Paro'])
                      ->latest('id');
            }
        ])
        ->where('maquina', 'EXT54-II')
        ->where('status', 'Activo')
        ->get()
        // 🔹 Solo incluimos reportes que tengan al menos una acción válida
        ->filter(fn($reporte) => $reporte->acciones->isNotEmpty())
        ->map(function ($reporte) {
            $accionActiva = $reporte->acciones->first();
            return [
                'id' => $reporte->id,
                'nombre' => $reporte->etiquetaProduccion->producto2->nombre ?? 'Sin nombre',
                'clave' => $reporte->etiquetaProduccion->producto2->clave ?? 'Sin clave',
                'formula' => $accionActiva->no_formula ?? 'Sin fórmula',
                'accion' => $accionActiva->accion ?? 'Sin acción',
                'fecha' => $reporte->fecha,
            ];
        })
        ->values(); // 🔹 Limpia los índices del array

        return response()->json($reportes);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ], 500);
    }
}


public function finalizarProceso($id)
{
    try {
        $reporte = ReporteProcesoExtrude::findOrFail($id);
        $reporte->update(['status' => 'Desactivado']);

        return response()->json([
            'success' => true,
            'message' => 'El proceso ha sido finalizado correctamente.',
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ], 500);
    }
}

public function exportAcciones()
{
    return Excel::download(new ReporteProcesoExtrudeAccionesExport, 'reporte_proceso_extrude_acciones.xlsx');
}


public function ultimaAccion($reporteId)
{
    try {
        $accion = \App\Models\ReporteProcesoExtrudeAccion::with('reporteProcesoExtrude')
            ->where('reporte_proceso_id', $reporteId)
            ->orderBy('id', 'desc')
            ->first();

        return response()->json(['accion' => $accion]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

public function accionPasada($reporteId)
{
    try {
        $acciones = \App\Models\ReporteProcesoExtrudeAccion::with('reporteProcesoExtrude')
            ->where('reporte_proceso_id', $reporteId)
            ->orderBy('id', 'desc')
            ->take(2)
            ->get();

        $accionPasada = $acciones->count() > 1 ? $acciones[1] : null;

        return response()->json([
            'success' => true,
            'accion_pasada' => $accionPasada,
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ], 500);
    }
}

// ✏️ Editar una acción existente
public function updateAccion(Request $request, $id)
{
    try {
        $accion = ReporteProcesoExtrudeAccion::findOrFail($id);

        $accion->update([
            'fecha_inicio' => $request->input('fecha_inicio', $accion->fecha_inicio),
            'hora_inicio' => $request->input('hora_inicio', $accion->hora_inicio),
            'fecha_final' => $request->input('fecha_final', $accion->fecha_final),
            'hora_final' => $request->input('hora_final', $accion->hora_final),
            'accion' => $request->input('accion', $accion->accion),
            'paro' => $request->input('paro', $accion->paro),
            'no_formula' => $request->input('no_formula', $accion->no_formula),
            'kilos' => $request->input('kilos', $accion->kilos),
            'comentario' => $request->input('comentario', $accion->comentario),
            'operador' => $request->input('operador', $accion->operador),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Acción actualizada correctamente.',
            'accion' => $accion,
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ], 500);
    }
}

// 🗑️ Eliminar una acción
public function eliminarAccion($id)
{
    try {
        $accion = ReporteProcesoExtrudeAccion::findOrFail($id);
        $accion->delete();

        return response()->json([
            'success' => true,
            'message' => 'Acción eliminada correctamente.',
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage(),
        ], 500);
    }
}

public function accionesUltimas3h($reporteId)
{
    try {
        $ahora = now()->setTimezone('America/Mexico_City');
        $hace3h = $ahora->copy()->subHours(3);

        $acciones = \App\Models\ReporteProcesoExtrudeAccion::where('reporte_proceso_id', $reporteId)
            ->where(function ($q) use ($hace3h, $ahora) {
                $q->whereBetween('created_at', [$hace3h, $ahora])
                  ->orWhereBetween('updated_at', [$hace3h, $ahora]);
            })
            ->orderBy('fecha_inicio', 'asc')
            ->orderBy('hora_inicio', 'asc')
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


}