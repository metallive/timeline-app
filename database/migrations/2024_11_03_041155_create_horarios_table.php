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
    Schema::create('horarios', function (Blueprint $table) {
        $table->id('id_horarios');
        $table->time('entrada_1')->nullable(false);
        $table->time('salida_1')->nullable(false);
        $table->time('entrada_2')->nullable();
        $table->time('salida_2')->nullable();
        $table->string('dia');
        $table->unsignedBigInteger('id_seccion');
        $table->foreign('id_seccion')->references('id_seccion')->on('seccions')->onDelete('cascade');
        $table->timestamps();
    });
}

public function down()
{
    Schema::dropIfExists('horarios');
}


};
