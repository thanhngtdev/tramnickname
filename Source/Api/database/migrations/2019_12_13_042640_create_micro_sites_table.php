<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMicroSitesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('micro_site', function (Blueprint $table) {
            $table->bigIncrements('ms_id');
            $table->string('ms_name',255)->nullable();
            $table->string('ms_alias',255)->nullable();
            $table->string('ms_email',255)->nullable();
            $table->string('ms_phone',255)->nullable();
            $table->string('ms_avatar',255)->nullable();
            $table->string('ms_cover',255)->nullable();
            $table->string('ms_slogan',1023)->nullable();
            $table->string('ms_locationId',255)->nullable();
            $table->string('ms_postal',255)->nullable();
            $table->string('ms_longitude',255)->nullable();
            $table->string('ms_latitude',255)->nullable();
            $table->string('ms_address',511)->nullable();
            $table->string('ms_region',255)->nullable();
            $table->integer('ms_order')->default(0);
            $table->integer('ms_status')->default(1);
            $table->string('pa_company',255)->nullable();
            $table->string('pa_companyId',255)->nullable();
            $table->string('pa_location',255)->nullable();
            $table->string('pa_locationId',255)->nullable();
            $table->string('ms_associated',255)->nullable();
            $table->integer('ms_trial')->default(0)->nullable();
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
        Schema::dropIfExists('micro_site');
    }
}
