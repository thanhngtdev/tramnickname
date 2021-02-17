<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['namespace' => 'Api'], function() {
    Route::get('home', 'ApiController@getHome');
    Route::get('about-us','ApiController@getAboutUs');
    Route::get('policy','ApiController@getPolicy');

    Route::group(['prefix' => 'site'],function(){
        Route::get('list-site','SiteController@getListSite');
        Route::get('detail-site','SiteController@getDetailSite');
        Route::post('book-training', 'SiteController@bookTraining');
        Route::post('search-nearby','SiteController@postSearchNearby');
        Route::post('near-academy', 'SiteController@findNearAcademy');
        Route::post('find-nearby', 'SiteController@findNearByAcademy');
        Route::post('send-email','SiteController@sendEmail');
        Route::get('list-site-has-camp', 'SiteController@getListSiteHasCamp');
    });

    Route::group(['prefix' => 'article'], function(){
        Route::get('list-article','ArticleController@getListArticle');
        Route::get('list-qna','ArticleController@getListQNA');
        Route::get('detail-article','ArticleController@getDetailArticle');
    });

    Route::group(['prefix' => 'static'], function(){
        Route::get('footer', 'ApiController@getFooter');
    });
});
