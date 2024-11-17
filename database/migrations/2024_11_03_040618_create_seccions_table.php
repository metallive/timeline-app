<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('seccions', function (Blueprint $table) {
        $table->id('id_seccion');
        $table->string('nombre_seccion');
        $table->unsignedBigInteger('id_empleado');
        $table->foreign('id_empleado')->references('id_empleado')->on('empleados')->onDelete('cascade');
        $table->timestamps();
    });
}

public function down()
{
    Schema::dropIfExists('seccions');
}

};
