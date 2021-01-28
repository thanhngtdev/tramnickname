<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBookingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('booking', function (Blueprint $table) {
            $table->bigIncrements('bk_id');
            $table->bigInteger('bk_site')->default(0);
            $table->string('bk_siteName')->nullable();
            $table->string('bk_name',255)->nullable();
            $table->string('bk_email',255)->nullable();
            $table->date('bk_date')->nullable();
            $table->integer('bk_status')->default(1);
            $table->text('bk_note')->nullable();
            $table->string('bk_location',255)->nullable();
            $table->string('bk_lat',255)->nullable();
            $table->string('bk_long',255)->nullable();
            $table->string('bk_locationId',255)->nullable();
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
        Schema::dropIfExists('booking');
    }
}
