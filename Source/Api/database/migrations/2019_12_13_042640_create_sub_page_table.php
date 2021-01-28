<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubPageTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sub_page', function (Blueprint $table) {
            $table->bigIncrements('sub_id');
            $table->bigInteger('sub_site')->unsigned();
            $table->string('sub_name',255)->nullable();
            $table->string('sub_alias',255)->nullable();
            $table->integer('sub_status')->default(1);
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
        Schema::dropIfExists('sub_page');
    }
}
