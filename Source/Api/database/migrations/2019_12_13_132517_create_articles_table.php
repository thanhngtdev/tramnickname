<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('article', function (Blueprint $table) {
            $table->bigIncrements('atc_id');
            $table->string('atc_title',255)->nullable();
            $table->string('atc_alias',255)->nullable();
            $table->string('atc_sapo',1023)->nullable();
            $table->longText('atc_content')->nullable();
            $table->integer('atc_cate')->unsigned()->default(1)->nullable();
            $table->foreign('atc_cate')->references('cate_id')->on('cate_article');
            $table->tinyInteger('atc_type')->default(1)->nullable();
            $table->bigInteger('atc_createdBy')->unsigned()->default(0)->nullable();
            $table->bigInteger('atc_updatedBy')->unsigned()->default(0)->nullable();
            $table->bigInteger('atc_approvedBy')->unsigned()->default(0)->nullable();
            $table->string('atc_featureImg',255)->nullable();
            $table->string('atc_tag',255)->nullable();
            $table->tinyInteger('atc_promote')->default(0)->nullable();
            $table->bigInteger('atc_view')->default(0)->nullable();
            $table->tinyInteger('atc_status')->default(1)->nullable();
            $table->string('atc_source',255)->nullable();
            $table->date('atc_publicDate')->nullable();
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
        Schema::dropIfExists('article');
    }
}
