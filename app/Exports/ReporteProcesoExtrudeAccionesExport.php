<?php

namespace App\Exports;

use App\Models\ReporteProcesoExtrudeAccion;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ReporteProcesoExtrudeAccionesExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return ReporteProcesoExtrudeAccion::with([
            'reporteProcesoExtrude:id,orden,lote,maquina,producto_etiqueta_id,status',

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
                'status'
        ]);
    }

    public function headings(): array
    {
        return [
            'ID',
            'Orden',
            'Lote',
            'Máquina',
            'Clave Producto',
            'Nombre Producto',
            'Acción',
            'Operador',
            'Paro',
            'No. Fórmula',
            'Fecha Inicio',
            'Hora Inicio',
            'Fecha Final',
            'Hora Final',
            'Estatus',
        ];
    }

    public function map($accion): array
    {
        $reporte = $accion->reporteProcesoExtrude;
        $producto = $reporte?->etiquetaProduccion?->producto2;

        return [
            $accion->id,
            $reporte->orden ?? '',
            $reporte->lote ?? '',
            $reporte->maquina ?? '',
            $producto->clave ?? '',
            $producto->nombre ?? '',
            $accion->accion ?? '',
            $accion->operador ?? '',
            $accion->paro ?? '',
            $accion->no_formula ?? '',
            $accion->fecha_inicio ?? '',
            $accion->hora_inicio ?? '',
            $accion->fecha_final ?? '',
            $accion->hora_final ?? '',
            $accion->status ?? '',
        ];
    }
}
