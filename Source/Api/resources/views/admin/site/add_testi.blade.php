@extends('admin.layout_master')

@section('main-header')
    <h1 class="page-header">Testimonials <small>Add</small></h1>
@endsection

@section('main-content')
    <form action="" id="" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <input type="hidden" name="lbId" value="{!! $siteId !!}">
        <div class="row">
            <div class="col-md-3">
                <div class="form-group">
                    <label for="imgFeature">Image Feature</label>
                    <br>
                    <img class="" alt="" src="{!! asset('img/no-image.jpg') !!}" id="_imgFeature" width="160">
                    <br>
                    <label class="btn btn-default" style="margin-top: 10px;">
                        Browse
                        <input type="file" class="hidden" id="imgFeature" name="imgFeature">
                    </label>
                </div>
            </div>
            <div class="col-md-9">
                <div class="form-group">
                    <label for="">Name</label>
                    <input class="form-control" name="txtName" placeholder="Name"
                           value=""/>
                </div>
                <div class="form-group">
                    <label for="">Role</label>
                    <input class="form-control" name="txtRole" placeholder="Role"
                           value=""/>
                </div>
                <div class="form-group">
                    <label for="">Content</label>
                    <textarea name="txtContent" id="" cols="30" rows="5" class="form-control"
                              placeholder="Content..."></textarea>
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn-warning">Create</button>
    </form>
@endsection

@section('main-script')
    @endsection