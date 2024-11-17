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
    Schema::create('empleados', function (Blueprint $table) {
        $table->id('id_empleado');
        $table->string('nombre_empleado');
        $table->timestamps();
    });
}

public function down()
{
    Schema::dropIfExists('empleados');
}

};
