<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\EtiquetaProduccion;

class ReporteProcesoExtrude extends Model
{
    protected $fillable = [
        'producto_etiqueta_id',
        'lote',
        'orden',
        'maquina',
        'fecha',
        'hora',
        'formulas_totales',
        'kg_formula',
        'nombre_operador',
        'nom_supervisor',
           'status'
    ];

    // Relación con el modelo EtiquetaProduccion
    public function etiquetaProduccion()
    {
        return $this->belongsTo(EtiquetaProduccion::class, 'producto_etiqueta_id');
    }
}
