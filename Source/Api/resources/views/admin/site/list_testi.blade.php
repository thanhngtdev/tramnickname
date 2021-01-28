@extends('admin.layout_master')

@section('main-header')
    <?php $site = $data['site']; ?>
    <h1 class="page-header">Testimonials <small>List</small></h1>
    <a href="{!! route('admin.site.getAddTesti',$site->ms_id) !!}"
       target="_blank" class="btn btn-warning">Add new</a>
@endsection

@section('main-content')
        <div class="box box-danger">
            <div class="box-body">
                @foreach($data['lstTesti'] as $feedback)
                    <div class="post clearfix">
                        <div class="pull-right">
                            <a href="{!! route('admin.site.getEditTesti',[$site->ms_id,$feedback->fb_id]) !!}"
                               target="_blank" class="text-red">
                                <i class="fa fa-edit"></i> Edit</a>
                            <br>
                            <a href="{!! route('admin.site.getDeleteTesti',[$site->ms_id,$feedback->fb_id]) !!}"
                                class="text-red">
                                <i class="fa fa-close"></i> Delete</a>
                        </div>

                        <div class="user-block">
                            <img class="img-circle img-bordered-sm"
                                 src="{!! \App\Helper\Common::GetThumb($feedback->fb_image) !!}"
                                 style="width: 180px; height: 180px;" alt="User Image">
                            <span class="username">
                                <a href="#">{!! $feedback->fb_name !!}</a>
                            </span>

                            <span class="description">{!! $feedback->fb_role !!}</span>
                            <span class="description">{!! date('h:m, d/m/Y',strtotime($feedback->created_at)) !!}</span>
                        </div>

                        <!-- /.user-block -->
                        <p>{!! $feedback->fb_content !!}</p>
                    </div>
                @endforeach
            </div>
            <!-- /.box-body -->
        </div>
@endsection

@section('main-script')
    @endsection