<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Producto2;

class EtiquetaProduccion extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'clave',
        'kilos',
        'fecha_entrega',
        'fecha_llegada',
        'polvos',
        'estado',
        'extrusor',
        'posicion_ext',
        'usuario_extrucion',
        'edicion_extrucion',
        'incremento',
        'visto_bno',
        'premuestra',
        'urgencias',
        'comentarios',
        'producto_id',
        'producto_extruido',
        'kilos_extruidos',
        'kilos_restante',
        'fecha_real_ext',
        'hora_real_ext',
        'usuario_ext',
        'tpd_ext',
        'hora_tpd_ext',
        'molino_maq',
        'posicion_mol',
        'fecha_real_mol',
        'hora_real_mol',
        'eti_ag_mol',
        'producto_molido',
        'kilos_restante_mol',
        'usuario_molinos',
        'edicion_molinos',
        'kilos_molidos',
        'usuario_mol_edicion',
        'tipo_molino',
    ];
    

    // Relación con el modelo Producto
    public function producto2()
    {
        return $this->belongsTo(Producto2::class, 'producto_id');
    }
}
/* hol */