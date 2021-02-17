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
    <h1>News <small>Edit</small></h1>
@endsection

@section('main-content')
    <?php $article = $data ?>
    <div class="box box-warning">
        <div class="box-body">
            <form role="form" method="post" enctype="multipart/form-data">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" name="lbId" value="{!! $article->atc_id !!}">
                @role('Super Admin|Master Admin|Sub Admin')
                <div class="form-group">
                    <?php $dal_article = new \App\Http\DAL\DAL_Article(); ?>
                    <?php $lstCate = $dal_article->getListCateArticle([1]); ?>
                    <label>Category</label>
                    <select class="form-control" name="sltCate">
                        @foreach($lstCate as $cate)
                            @if($cate->cate_id == $article->atc_cate)
                                <option value="{!! $cate->cate_id !!}" selected>{!! $cate->cate_value !!}</option>
                            @else
                                <option value="{!! $cate->cate_id !!}">{!! $cate->cate_value !!}</option>
                            @endif
                        @endforeach
                    </select>
                </div>
                @endrole
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control input-lg"
                           name="txtTitle" placeholder="Enter title for article..."
                           value="{!! $article->atc_title !!}">
                </div>
                <div class="form-group hidden">
                    <label>Alias</label>
                    <input type="text" class="form-control input-lg"
                           name="txtAlias" placeholder="Enter alias for article (do-muc-may-in-canon) ..."
                           value="{!! $article->atc_alias !!}">
                </div>
                <div class="form-group">
                    <label>Sapo</label>
                    <textarea name="txtSapo" placeholder="Enter sapo for article..."
                              rows="3" class="form-control">{!! $article->atc_sapo !!}</textarea>
                </div>

                <div class="form-group">
                    <label for="txtContent">Content</label>
                    <textarea id="txtContent" name="txtContent" rows="10" cols="80">
                        {!! $article->atc_content !!}
                    </textarea>
                    <script type="text/javascript">ckeditor('txtContent')</script>
                </div>
                <div class="form-group">
                    <label for="imgFeature">Feature Image</label>
                    <br>
                    @if($article->atc_featureImg)
                        <img class="" alt="" src="{!! \App\Helper\Common::GetThumb($article->atc_featureImg,'c2') !!}"
                             id="_imgFeature" width="320">
                    @else
                        <img class="" alt="" src="{!! asset('img/no-image-640x360.jpg') !!}" id="_imgFeature" width="320">
                    @endif
                    <br>
                    <label class="btn btn-default" style="margin-top: 10px;">
                        Browse
                        <input type="file" class="hidden" id="imgFeature" name="imgFeature">
                    </label>

                </div>

                <div class="form-group">
                    <label for="sltTag">Tag</label>
                    <select class="tag-select form-control" id="sltTag" name="sltTag[]" style="width: 100%;" multiple="multiple">
                        @foreach($article->tags as $tag)
                            <option value="{!! $tag->tag_name !!}" selected="selected">{!! $tag->tag_name !!}</option>
                        @endforeach
                    </select>
                </div>
                @role('Super Admin|Master Admin|Sub Admin')
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>
                                <input type="checkbox" class="minimal"
                                    @if($article->atc_status==1) checked @endif
                                    id="chbPublic" name="chbPublic">
                                Set public
                            </label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>
                                <input type="checkbox" class="minimal" id="chbFeature" name="chbFeature"
                                       @if($article->atc_promote==1) checked @endif>
                                Set Feature article
                            </label>
                        </div>
                    </div>
                </div>
                @endrole

                <div class="row">
                    <div class="col-md-6">
                        <button class="btn btn-block btn-primary" type="submit">Update</button>
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-block btn-primary" type="button" onclick="goBack()">Cancel</button>
                    </div>
                </div>

            </form>
        </div>
        <!-- /.box-body -->
    </div>
@endsection

@section('main-script')
    <script>
        $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass: 'iradio_minimal-blue'
        });
    </script>
@endsection
