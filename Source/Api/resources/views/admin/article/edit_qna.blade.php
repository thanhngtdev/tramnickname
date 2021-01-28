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
    <h1>Câu hỏi <small>thêm mới</small></h1>
@endsection

@section('main-content')
    <div class="box box-warning">
        <!-- /.box-header -->
        <div class="box-body">
            <form role="form" method="post" enctype="multipart/form-data">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" name="lbId" value="{!! $article->atc_id !!}">
                <div class="form-group">
                    <?php $dal_article = new \App\Http\DAL\DAL_Article(); ?>
                    <?php $lstCate = $dal_article->getListCateArticle([2]); ?>
                    <label>Category</label>
                    <select class="form-control" name="sltCate">
                        @foreach($lstCate as $cate)
                            <option value="{!! $cate->cate_id !!}"
                                @if($cate->cate_id == $article->atc_cate) selected @endif>{!! $cate->cate_value !!}</option>
                            @foreach($cate->sub_cate as $sub_cate)
                                <option value="{!! $sub_cate->cate_id !!}"
                                        @if($sub_cate->cate_id == $article->atc_cate) selected @endif>
                                    --- {!! $sub_cate->cate_value !!}</option>
                            @endforeach
                        @endforeach
                    </select>
                </div>
                <div class="form-group">
                    <label>Câu hỏi</label>
                    <textarea name="txtSapo" placeholder="Content of question..."
                              rows="3" class="form-control">{!! $article->atc_sapo !!}</textarea>
                </div>
                <div class="form-group">
                    <label for="txtContent">Câu trả lời</label>
                    <textarea id="txtContent" name="txtContent" rows="10" cols="8">{!! $article->atc_content !!}</textarea>
                    <script type="text/javascript">ckeditor('txtContent',1)</script>
                </div>
                <div class="form-group hidden">
                    <label for="sltTag">Từ khóa</label>
                    <select class="tag-select form-control" name="sltTag[]" style="width: 100%;" multiple="multiple">
                    </select>
                </div>
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
@endsection