<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSiteDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //data type
        Schema::create('site_data', function (Blueprint $table) {
            $table->bigIncrements('dt_id');
            $table->bigInteger('dt_site')->default(0);
            $table->integer('dt_order')->default(0);
            $table->string('dt_name')->nullable();
            $table->integer('dt_type')->default(0);
            $table->longText('dt_value')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('site_data');
    }
}
