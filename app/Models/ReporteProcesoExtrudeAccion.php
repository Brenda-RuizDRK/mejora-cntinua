<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ReporteProcesoExtrude;


class ReporteProcesoExtrudeAccion extends Model
{
    protected $fillable = [
        'reporte_proceso_id',
        'fecha_hora_inicio',
        'fecha_hora_final',
        'accion',
        'paro',
        'no_formula',
        'kilos',
        'comentario',
    ];
    // Relación con el modelo ReporteProcesoExtrude
    public function reporteProcesoExtrude()
    {
        return $this->belongsTo(ReporteProcesoExtrude::class, 'reporte_proceso_id');
    }   

}
