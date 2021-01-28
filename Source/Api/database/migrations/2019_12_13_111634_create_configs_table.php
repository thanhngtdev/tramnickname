<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConfigsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('config', function (Blueprint $table) {
            $table->increments('cfg_id');
            $table->string('cfg_name',255)->nullable();
            $table->string('cfg_title',255)->nullable();
            $table->string('cfg_des',1023)->nullable();
            $table->longText('cfg_content')->nullable();
            $table->text('cfg_image')->nullable();
            $table->longText('cfg_value')->nullable();
            $table->integer('cfg_order')->nullable();
            $table->string('cfg_alias',255)->nullable();
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
        Schema::dropIfExists('config');
    }
}
