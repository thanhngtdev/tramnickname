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
    <h1>Config
        <small class="text-danger">{!! $config->cfg_name !!}</small>
    </h1>
@endsection

@section('main-content')
    <form role="form" method="post" enctype="multipart/form-data">
        <input type="hidden" name="_token" id="_token" value="{{ csrf_token() }}">
        <input type="hidden" name="lbId" id="lbId" value="{!! $config->cfg_id !!}">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="">Title</label>
                    <input type="text" name="txtTitle" class="form-control" placeholder="..."
                           value="{!! $config->cfg_title !!}">
                </div>
                <div class="form-group">
                    <label for="">Description</label>
                    <textarea name="txtDes" class="form-control"
                    >{!! $config->cfg_des !!}</textarea>
                </div>
                <div class="form-group">
                    <label for="">Content</label>
                    <textarea name="txtContent" class="form-control"
                    >{!! $config->cfg_content !!}</textarea>
                    <script type="text/javascript">ckeditor('txtContent')</script>
                </div>
            </div>
            @if($config->cfg_value)
                <div class="col-md-6">
                    @foreach($config->cfg_value as $key=>$cfgItem)
                        <div class="box box-warning">
                            <div class="box-header">
                                <h3 class="box-title text-danger">Item {!! $key+1 !!}</h3>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body">
                                <div class="form-group">
                                    <label for="">Title</label>
                                    <input type="text" name="txtTitle{!! $key !!}" class="form-control"
                                           placeholder="..."
                                           value="{!! $cfgItem['title'] !!}">
                                </div>
                                <div class="form-group">
                                    <label for="">Description</label>
                                    <textarea name="txtDes{!! $key !!}" class="form-control"
                                    >{!! $cfgItem['des'] !!}</textarea>
                                </div>
                                <div class="form-group">
                                    <label for="">Content</label>
                                    <textarea name="txtContent{!! $key !!}" class="form-control"
                                    >{!! $cfgItem['content'] !!}</textarea>
                                    <script type="text/javascript">ckeditor('txtContent{!! $key !!}')</script>
                                </div>
                                <div class="form-group">
                                    <label for="">Icon</label>
                                    @if($cfgItem['icon'])
                                        <img class="image-source" alt=""
                                             src="{!! \App\Helper\Common::GetThumb($cfgItem['icon']) !!}"
                                             width="80">
                                    @else
                                        <img class="image-source" alt="" src="{!! asset('img/no-image.jpg') !!}"
                                             width="80">
                                    @endif
                                    <label class="btn btn-default" style="margin-top: 10px;">
                                        Browse
                                        <input type="file" class="image-file hidden" id="imgFeature"
                                               name="icon{!! $key !!}">
                                    </label>
                                </div>
                                <div class="form-group">
                                    <label for="">Image</label>
                                    @if($cfgItem['image'])
                                        <img class="image-source" alt=""
                                             src="{!! \App\Helper\Common::GetThumb($cfgItem['image']) !!}"
                                             width="320">
                                    @else
                                        <img class="image-source" alt="" src="{!! asset('img/no-image.jpg') !!}"
                                             width="320">
                                    @endif
                                    <label class="btn btn-default" style="margin-top: 10px;">
                                        Browse
                                        <input type="file" class="image-file hidden" id="imgFeature"
                                               name="image{!! $key !!}">
                                    </label>
                                </div>
                            </div>
                            <!-- /.box-body -->
                        </div>
                    @endforeach
                </div>
            @endif
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
@endsection

@section('main-script')
    <script>
        $(document).ready(function () {
            $(".image-file").change(function (evt) {
                var file = this.files[0];
                var reader = new FileReader();
                let imageSource = $(evt.target).parent().parent().children("img.image-source");
                reader.onload = function (e) {
                    // $("#_imgFeature").attr("src", e.target.result).css("display","block");
                    imageSource.attr("src", e.target.result);
                }
                reader.readAsDataURL(file);
            });

        })
    </script>
@endsection