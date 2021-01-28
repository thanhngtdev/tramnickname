<?php

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::group(['namespace' => 'Admin',],function(){
    Route::get('admin-login',['as' => 'admin.login', 'uses' => 'UserController@getLogin']);

    Route::post('admin-login',['as' => 'admin.login', 'uses' => 'UserController@postLogin']);

    Route::get('admin-logout',['as' => 'admin.logout', 'uses' => 'UserController@getLogout']);

    Route::post('product/uploader-order', 'OrderController@uploadImageOrder');

    Route::get('product/delete-image-order/{id}','OrderController@getDeleteImageOrder');

    Route::get('get-city/{id?}',[
        'as' => 'admin.getCity',
        'uses' => 'AdminController@getListCity'
    ]);

    Route::get('get-district/{id?}',[
        'as' => 'admin.getDistrict',
        'uses' => 'AdminController@getListDistrict'
    ]);

    Route::post('product/uploader', 'ProductController@uploadImageProduct');

    Route::get('product/delete-image/{id}','ProductController@deleteImageProduct');
});

Route::group(['prefix' => '','namespace' => 'Admin',
    'middleware' => ['user']],function(){
    Route::get('/',[
        'as' => 'admin.dashboard',
        'uses' => 'AdminController@dashboard'
    ]);

    Route::post('/uploader', 'ArticleController@postUpload');

    /*
     * ---------------------------------------------------------------------------------------
     * *** Route for admin article controller ***
     * ---------------------------------------------------------------------------------------
     */
    #region admin article controller
    Route::group(['prefix' => 'article'], function(){
        #region Article
        Route::post('/uploader', 'ArticleController@postUpload');

        Route::get('list-article/{id?}',[
            'as' => 'admin.article.getList',
            'uses' => 'ArticleController@getListArticle'
        ]);

        Route::get('list-article-data',[
            'as' => 'admin.article.getListData',
            'uses' => 'ArticleController@getListArticleData'
        ]);

        Route::get('add-article/{id?}', [
            'as' => 'admin.article.getAdd',
            'uses' => 'ArticleController@getAddArticle'
        ]);

        Route::post('add-article/{id?}', [
            'as' => 'admin.article.getAdd',
            'uses' => 'ArticleController@postAddArticle'
        ]);

        Route::get('edit-article/{id?}', [
            'as' => 'admin.article.getEdit',
            'uses' => 'ArticleController@getEditArticle'
        ]);

        Route::post('edit-article/{id?}', [
            'as' => 'admin.article.postEdit',
            'uses' => 'ArticleController@postEditArticle'
        ]);

        Route::get('delete-article/{id?}', [
            'as' => 'admin.article.getDelete',
            'uses' => 'ArticleController@getDeleteArticle'
        ]);

        Route::get('list-qna/{id?}',[
            'as' => 'admin.qna.getList',
            'uses' => 'ArticleController@getListQNA'
        ]);

        Route::get('list-qna-data',[
            'as' => 'admin.qna.getListData',
            'uses' => 'ArticleController@getListQNAData'
        ]);

        Route::get('delete-qna/{id}',[
            'as' => 'admin.qna.getDelete',
            'uses' => 'ArticleController@getDeleteQNA'
        ]);

        Route::get('add-qna/{id?}',[
            'as' => 'admin.qna.getAdd',
            'uses' => 'ArticleController@getAddQNA'
        ]);

        Route::post('add-qna/{id?}',[
            'as' => 'admin.qna.postAdd',
            'uses' => 'ArticleController@postAddQNA'
        ]);

        Route::get('edit-qna/{id}',[
            'as' => 'admin.qna.getEdit',
            'uses' => 'ArticleController@getEditQNA'
        ]);

        Route::post('edit-qna/{id}',[
            'as' => 'admin.qna.postEdit',
            'uses' => 'ArticleController@postEditQNA'
        ]);
        #endregion

        #region Cate Article
        Route::get('list-cate',[
            'as' => 'admin.article.cate.getList',
            'uses' => 'ArticleController@getListCate'
        ]);

        Route::get('list-cate-data',[
            'as' => 'admin.article.cate.getListData',
            'uses' => 'ArticleController@getListCateData'
        ]);


        Route::get('add-cate/{id}',[
            'as' => 'admin.article.cate.getAdd',
            'uses' => 'ArticleController@getAddCate'
        ]);

        Route::post('add-cate/{id}',[
            'as' => 'admin.article.cate.postAdd',
            'uses' => 'ArticleController@postAddCate'
        ]);

        Route::get('edit-cate/{id?}',[
            'as' => 'admin.article.cate.getEdit',
            'uses' => 'ArticleController@getEditCate'
        ]);

        Route::post('edit-cate/{id?}',[
            'as' => 'admin.article.cate.postEdit',
            'uses' => 'ArticleController@postEditCate'
        ]);
        #endregion
    });
    #endregion

    #region admin micro site controller
    Route::group(['prefix' => 'site'],function() {
        Route::get('list-site', [
            'as' => 'admin.site.getList',
            'uses' => 'SiteController@getListMicro'
        ]);

        Route::get('list-site-fr', [
            'as' => 'admin.site.getListFr',
            'uses' => 'SiteController@getListMicroFr'
        ]);

        Route::get('list-site-data', [
            'as' => 'admin.site.getListData',
            'uses' => 'SiteController@getListMicroData'
        ]);

        Route::get('add-site',[
            'as' => 'admin.site.getAdd',
            'uses' => 'SiteController@getAddSite'
        ]);

        Route::post('add-site',[
            'as' => 'admin.site.getAdd',
            'uses' => 'SiteController@postAddSite'
        ]);

        Route::get('delete-site/{id}',[
            'as' => 'admin.site.getDelete',
            'uses' => 'SiteController@getDeleteSite'
        ]);


        Route::group(['prefix' => 'edit-site'],function (){
            Route::post('update-address/{id}',[
                'as' => 'admin.site.updateAddress',
                'uses' => 'SiteController@postUpdateAddress'
            ]);

            Route::get('list-testi/{id}',[
                'as' => 'admin.site.getListTesti',
                'uses' => 'SiteController@getListTesti'
            ]);

            Route::post('edit-testi/{id}/{testiId}',[
                'as' => 'admin.site.postEditTesti',
                'uses' => 'SiteController@postEditTesti'
            ]);

            Route::get('edit-testi/{id}/{testiId}',[
                'as' => 'admin.site.getEditTesti',
                'uses' => 'SiteController@getEditTesti'
            ]);

            Route::get('add-testi/{id}',[
                'as' => 'admin.site.getAddTesti',
                'uses' => 'SiteController@getAddTesti'
            ]);

            Route::post('add-testi/{id}',[
                'as' => 'admin.site.postAddTesti',
                'uses' => 'SiteController@postAddTesti'
            ]);

            Route::get('delete-testi/{id}/{testiId}',[
                'as' => 'admin.site.getDeleteTesti',
                'uses' => 'SiteController@getDeleteTesti'
            ]);

            Route::post('add-staff',[
                'as' => 'admin.site.postAddStaff',
                'uses' => 'SiteController@postAddStaff'
            ]);

            Route::post('edit-staff',[
                'as' => 'admin.site.postEditStaff',
                'uses' => 'SiteController@postEditStaff'
            ]);

            Route::get('list-news/{id}',[
                'as' => 'admin.site.getListNews',
                'uses' => 'SiteController@getListNews'
            ]);

            Route::get('list-faq/{id}',[
                'as' => 'admin.site.getListFaq',
                'uses' => 'SiteController@getListFaq'
            ]);

            Route::get('coach-info/{id}',[
                'as' => 'admin.site.getCoachInfo',
                'uses' => 'SiteController@getCoachInfo'
            ]);
            Route::post('coach-info/{id}',[
                'as' => 'admin.site.postCoachInfo',
                'uses' => 'SiteController@postCoachInfo'
            ]);

            Route::get('weekly-training/{id}',[
                'as' => 'admin.site.getWeeklyTraining',
                'uses' => 'SiteController@getWeeklyTraining'
            ]);

            Route::post('weekly-training/update-price',[
                'as' => 'admin.weekly.updatePrice',
                'uses' => 'SiteController@updatePriceWeekly'
            ]);
            Route::post('weekly-training/update-address',[
                'as' => 'admin.weekly.updateAddress',
                'uses' => 'SiteController@updateAddressWeekly'
            ]);

            Route::post('weekly-training/update-class',[
                'as' => 'admin.weekly.updateClass',
                'uses' => 'SiteController@updateClassWeekly'
            ]);

            Route::post('weekly-training/create-class',[
                'as' => 'admin.weekly.createClass',
                'uses' => 'SiteController@createClassWeekly'
            ]);

            Route::get('holiday-camp/{id}',[
                'as' => 'admin.site.getHolidayCamp',
                'uses' => 'SiteController@getHolidayCamp'
            ]);

            Route::post('holiday-camp/create-camp',[
                'as' => 'admin.site.postCreateCamp',
                'uses' => 'SiteController@postCreateCamp'
            ]);

            Route::post('holiday-camp/update-camp',[
                'as' => 'admin.site.postUpdateCamp',
                'uses' => 'SiteController@postUpdateCamp'
            ]);

            Route::post('holiday-camp/create-cal',[
                'as' => 'admin.site.postCreateCalendar',
                'uses' => 'SiteController@postCreateCalendar'
            ]);

            Route::post('holiday-camp/update-cal',[
                'as' => 'admin.site.postUpdateCalendar',
                'uses' => 'SiteController@postUpdateCalendar'
            ]);

            Route::post('add-sub-page',[
                'as' => 'admin.site.addSubPage',
                'uses' => 'SiteController@postAddSubPage'
            ]);
            Route::post('edit-sub-page',[
                'as' => 'admin.site.editSubPage',
                'uses' => 'SiteController@postEditSubPage'
            ]);
            Route::post('delete-sub-page',[
                'as' => 'admin.site.deleteSubPage',
                'uses' => 'SiteController@postDeleteSubPage'
            ]);

            Route::get('{id}', [
                'as' => 'admin.site.getEdit',
                'uses' => 'SiteController@getEditSiteInfo'
            ]);
            Route::post('{id}', [
                'as' => 'admin.site.postEdit',
                'uses' => 'SiteController@postEditSiteInfo'
            ]);
        });

    });
    #endregion

    #region admin user controller
    Route::group(['prefix' => 'user'],function() {
        Route::group([],function (){
            Route::group([], function(){
                Route::get('list-user', [
                    'as' => 'admin.user.getList',
                    'uses' => 'UserController@getListUser'
                ]);
                Route::get('list-sub-admin', [
                    'as' => 'admin.user.getListSub',
                    'uses' => 'UserController@getListSubAdmin'
                ]);
                Route::get('list-franchise-admin', [
                    'as' => 'admin.user.getListFr',
                    'uses' => 'UserController@getListFrAdmin'
                ]);

                Route::get('list-user-data', [
                    'as' => 'admin.user.getListData',
                    'uses' => 'UserController@getListUserData'
                ]);

                Route::get('delete-user/{id?}', [
                    'as' => 'admin.user.getDelete',
                    'uses' => 'UserController@getDeleteUser'
                ]);

                Route::get('add-sub-admin', [
                    'as' => 'admin.user.getAddSub',
                    'uses' => 'UserController@getAddSubAdmin'
                ]);

                Route::post('add-sub-admin', [
                    'as' => 'admin.user.postAddSub',
                    'uses' => 'UserController@postAddSubAdmin'
                ]);

                Route::get('add-fr-admin', [
                    'as' => 'admin.user.getAddFr',
                    'uses' => 'UserController@getAddFrAdmin'
                ]);

                Route::post('add-fr-admin', [
                    'as' => 'admin.user.postAddFr',
                    'uses' => 'UserController@postAddFrAdmin'
                ]);
                Route::get('search-user', [
                    'as' => 'admin.user.searchUser',
                    'uses' => 'UserController@getSearchUser'
                ]);

                Route::get('edit-user/{id?}', [
                    'as' => 'admin.user.getEdit',
                    'uses' => 'UserController@getEditUser'
                ]);

                Route::post('edit-user/{id?}', [
                    'as' => 'admin.user.postEdit',
                    'uses' => 'UserController@postEditUser'
                ]);
            });

        });

        Route::group([],function (){

            Route::get('change-password',[
                'as' => 'admin.user.changePassword',
                'uses' => 'UserController@getChangePass'
            ]);

            Route::post('change-password',[
                'as' => 'admin.user.changePassword',
                'uses' => 'UserController@postChangePass'
            ]);
        });
    });
    #endregion

    Route::group(['prefix' => 'tag'],function(){

        Route::get('get-all-tag',[
            'as' => 'admin.tag.getAll',
            'uses' => 'AdminController@getAllTag'
        ]);

        Route::get('get-list',[
            'as' => 'admin.tag.getList',
            'uses' => 'AdminController@getListTag'
        ]);

        Route::get('get-list-data',[
            'as' => 'admin.tag.getListData',
            'uses' => 'AdminController@getListTagData'
        ]);

        Route::get('add-tag',[
            'as' => 'admin.tag.getAdd',
            'uses' => 'AdminController@getAddTag'
        ]);

        Route::post('add-tag',[
            'as' => 'admin.tag.postAdd',
            'uses' => 'AdminController@postAddTag'
        ]);


    });

    #region *** Config ***
    Route::group(['prefix' => 'config','middleware' => ['role:Super Admin|Master Admin']],function (){
        Route::get('edit-config/{id}',[
            'as' => 'admin.config.getEdit',
            'uses' => 'AdminController@getEditConfig'
        ]);

        Route::post('edit-config/{id}',[
            'as' => 'admin.config.postEdit',
            'uses' => 'AdminController@postEditConfig'
        ]);

        Route::post('update-image-gallery',[
            'as' => 'admin.config.updateGallery',
            'uses' => 'AdminController@postUpdateImageGallery'
        ]);


        Route::post('delete-config-item',[
            'as' => 'admin.config.postDeleteItem',
            'uses' => 'AdminController@postDeleteConfigItem'
        ]);


        Route::post('add-config-item',[
            'as' => 'admin.config.postAddItem',
            'uses' => 'AdminController@postAddConfigItem'
        ]);

        Route::get('edit-page/{id}',[
            'as' => 'admin.config.getEditPage',
            'uses' => 'AdminController@getEditStaticPage'
        ]);

        Route::post('edit-page/{id}',[
            'as' => 'admin.config.postEditPage',
            'uses' => 'AdminController@postEditStaticPage'
        ]);
    });
    #endregion

});
