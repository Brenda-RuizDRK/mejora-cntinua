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
        Schema::create('reporte_proceso_extrude_accions', function (Blueprint $table) {
            $table->id();
             $table->foreignId('reporte_proceso_id')->nullable()->constrained('reporte_proceso_extrudes')->nullOnDelete();
            $table->string('fecha_inicio', 100)->nullable();
            $table->string('hora_inicio', 100)->nullable();
            $table->string('fecha_final', 100)->nullable();
            $table->string('hora_final', 100)->nullable();
            $table->string('accion', 100)->nullable();    
            $table->string('paro', 100)->nullable();
            $table->string('no_formula', 100)->nullable();
            $table->string('kilos', 100)->nullable();
            $table->string('comentario')->nullable();
            $table->string('operador', 100)->nullable();
         
             $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reporte_proceso_extrude_accions');
    }
};
