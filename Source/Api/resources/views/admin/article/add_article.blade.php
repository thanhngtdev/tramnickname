<?php
/**
 * Created by PhpStorm.
 * User: QuanVH
 * Date: 01/11/2016
 * Time: 23:07 CH
 */
?>
@extends('admin.layout_master')

@section('main-header')
    <h1>News <small>add</small></h1>
@endsection

@section('main-content')
    <div class="box box-warning">
        <!-- /.box-header -->
        <div class="box-body">
            <form role="form" method="post" enctype="multipart/form-data">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                @if($siteId)
                <input type="hidden" name="siteId" value="{!! $siteId !!}">
                @endif
                @role('Super Admin|Master Admin|Sub Admin')
                <div class="form-group">
                    <?php $dal_article = new \App\Http\DAL\DAL_Article(); ?>
                    <?php $lstCate = $dal_article->getListCateArticle([1]); ?>
                    <label>Category</label>
                    <select class="form-control" name="sltCate">
                        @foreach($lstCate as $cate)
                            <option value="{!! $cate->cate_id !!}">{!! $cate->cate_value !!}</option>
                        @endforeach
                    </select>
                </div>
                @endrole

                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control input-lg" required
                           name="txtTitle" placeholder="Enter title for article..."
                           value="">
                </div>
                <div class="form-group hidden">
                    <label>Alias</label>
                    <input type="text" class="form-control input-lg"
                           name="txtAlias" placeholder="Enter alias for article ..."
                           value="">
                </div>
                <div class="form-group">
                    <label>Sapo</label>
                    <textarea name="txtSapo" placeholder="Enter sapo for article..."
                              rows="3" class="form-control"></textarea>
                </div>
                <div class="form-group">
                    <label for="txtContent">Content</label>
                    <textarea id="txtContent" name="txtContent" rows="10" cols="80">
                    </textarea>
                    <script type="text/javascript">ckeditor('txtContent')</script>
                </div>

                <div class="form-group">
                    <label for="imgFeature">Feature Image</label>
                    <br>
                    <img class="img-responsive" alt="" src="" id="_imgFeature" style="display: none;" width="320">
                    <label class="btn btn-default" style="margin-top: 10px;">
                        Browse
                        <input type="file" class="hidden" id="imgFeature" name="imgFeature">
                    </label>
                </div>
                <div class="form-group">
                    <label for="sltTag">Tag</label>
                    <select class="tag-select form-control" name="sltTag[]" style="width: 100%;" multiple="multiple">
                    </select>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <button class="btn btn-block btn-primary" type="submit">Create</button>
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-block btn-primary" type="button" onclick="goBack()">Hủy</button>
                    </div>
                </div>

            </form>
        </div>
        <!-- /.box-body -->
    </div>
@endsection

@section('main-script')
@endsection
