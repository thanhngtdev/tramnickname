<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cate_article', function (Blueprint $table) {
            $table->increments('cate_id');
            $table->string('cate_name',255)->nullable();
            $table->string('cate_value',255)->nullable();
            $table->string('cate_imgFeature',255)->nullable();
            $table->integer('cate_parent')->default(0);
            $table->string('cate_alias',255)->nullable();
            $table->string('cate_tag',255)->nullable();
            $table->tinyInteger('cate_order')->default(0);
            $table->tinyInteger('cate_status')->default(1);
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
        Schema::dropIfExists('cate_article');
    }
}
