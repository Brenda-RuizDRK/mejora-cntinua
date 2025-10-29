<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reporte_proceso_extrudes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('producto_etiqueta_id')->nullable()->constrained('etiqueta_produccions')->nullOnDelete();
            
            $table->string('lote', 100)->nullable();
            $table->string('orden', 100)->nullable();
            $table->string('maquina', 100)->nullable();
            $table->string('fecha', 100)->nullable();
            $table->string('hora', 100)->nullable();
            $table->string('formulas_totales', 100)->nullable();
            $table->string('kg_formula', 100)->nullable();
            $table->string('nombre_operador', 100)->nullable();
            $table->string('nom_supervisor', 100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reporte_proceso_extrudes');
    }
};
