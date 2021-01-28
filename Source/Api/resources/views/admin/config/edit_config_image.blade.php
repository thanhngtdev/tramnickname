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
    <h1>Config <small class="text-danger">{!! $config->cfg_name !!}</small></h1>
@endsection

@section('main-content')
    <div class="box box-warning">
        <div class="box-header">
            <h3 class="box-title text-danger">{!! $config->cfg_name !!}</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
            <form role="form" method="post" enctype="multipart/form-data">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" name="lbId" value="{!! $config->cfg_id !!}">

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

                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="imgFeature">Gallery (drag & drop to sort):</label>
                            <br>
                            <div class="clearfix imageGallery">
                                @foreach($config->cfg_value as $image)
                                    <div class="img-container" id="{!! $image['image'] !!}">
                                        <img src="{!! \App\Helper\Common::GetThumb($image['image'],'c2') !!}" alt=""
                                             class="image img img-responsive">
                                        <div class="middle">
                                            <a class="btn text btn-delete"
                                               href="#" data-source="{!! $image['image'] !!}">
                                                <i class="fa fa-trash fa-3x"></i>
                                            </a>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
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

    <div class="box box-warning">
        <div class="box-header">
            <h3 class="box-title text-danger">Add Image</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
            <form role="form" method="post" action="{!! route('admin.config.postAddItem') !!}"
                  enctype="multipart/form-data">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" name="lbId" value="{!! $config->cfg_id !!}">

                <div class="form-group">
                    <label for="">Title</label>
                    <input type="text" name="txtTitle" class="form-control" placeholder="..."
                           value="">
                </div>
                <div class="form-group">
                    <label for="">Description</label>
                    <textarea name="txtDes" class="form-control"></textarea>
                </div>
                <div class="form-group">
                    <label for="imgFeature">Image</label>
                    <br>
                    <img class="img-responsive" alt="" src="" id="_imgFeature" style="display: none;" width="320">
                    <label class="btn btn-default" style="margin-top: 10px;">
                        Browse
                        <input type="file" class="hidden" id="imgFeature" name="imgFeature">
                    </label>
                </div>
                <div class="form-group">
                    <button class="btn btn-block btn-primary" type="submit">Add</button>
                </div>

            </form>
        </div>
        <!-- /.box-body -->
    </div>
@endsection

@section('main-script')
    <script>
        $(document).ready(function () {
            $(".imageGallery").sortable({
                stop: function (event, ui) {
                    var sortedIDs = $( ".imageGallery" ).sortable("toArray");
                    $.ajax({
                        url: "/config/update-image-gallery",
                        method: 'post',
                        data: {
                            _token: $("input[name='_token']").val(),
                            lbId: $("input[name='lbId']").val(),
                            lstImage: sortedIDs
                        }
                    }).done(function (data) {});
                }
            });
            $(".btn-delete").click(function (evt) {
                $.ajax({
                    url: "/config/delete-config-item",
                    method: 'post',
                    data: {
                        _token: $("input[name='_token']").val(),
                        lbId: $("input[name='lbId']").val(),
                        image: $(evt.target).parent().attr('data-source')
                    }
                }).done(function (data) {
                    location.reload();
                });
            });
            function imagesPreview(input, placeToInsertImagePreview) {
                if (input.files) {
                    var filesAmount = input.files.length;
                    for (i = 0; i < filesAmount; i++) {
                        var reader = new FileReader();
                        var preview = placeToInsertImagePreview;
                        $(preview).empty();
                        reader.onload = function(event) {
                            $($.parseHTML('<img>')).attr('src', event.target.result)
                                .attr('style','padding: 10px; float: left; width: 25%')
                                .attr('class','img img-responsive')
                                .appendTo(preview);
                        };
                        reader.readAsDataURL(input.files[i]);
                    }
                }
            }

            //listen image preview
            $('.file').on('change', function(evt) {
                if ($(evt.target).attr('data-target')) {
                    imagesPreview(this, $(evt.target).attr('data-target'));
                }else {
                    imagesPreview(this, 'div.gallery');
                }
            });
        });
    </script>
@endsection
