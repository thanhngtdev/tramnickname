<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFeedbackTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('feedback', function (Blueprint $table) {
            $table->bigIncrements('fb_id');
            $table->string('fb_code',255)->nullable();
            $table->string('fb_email',255)->nullable();
            $table->string('fb_phone',255)->nullable();
            $table->string('fb_name',255)->nullable();
            $table->string('fb_role',255)->nullable();
            $table->bigInteger('fb_site')->default(0)->nullable();
            $table->string('fb_cate',255)->nullable();
            $table->string('fb_image',255)->nullable();
            $table->longText('fb_content')->nullable();
            $table->integer('fb_status')->default(1)->nullable();
            $table->longText('fb_note')->nullable();
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
        Schema::dropIfExists('feedback');
    }
}
