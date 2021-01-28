@extends('admin.layout_master')

@section('main-header')
    <h1>Từ khóa <small>thêm mới</small></h1>
@endsection


@section('main-content')
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <form action="" method="POST" enctype="multipart/form-data">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div class="form-group">
                        <label>Thêm tag (<span class="text-danger">ngăn cách bằng dấu ,</span>)</label>
                        <input class="form-control" type="text" name="txtTag" placeholder="tag1, tag2, ..."
                               value="{!! old('txtTag') !!}"/>
                    </div>
                    <div class="form-group">
                        <label>Tải file lên: </label>
                        <label for="tagfile" id="tagFileName" style="font-style: italic; font-weight: normal;"></label>
                        <br>
                        <label class="btn btn-default" style="margin-top: 10px;">
                            Browse
                            <input type="file" class="hidden" id="tagfile" name="tagfile" accept="text/plain">
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary">Thêm từ khóa</button>
                </form>
            </div>
            <!-- /.col -->
        </div>
    </section>
@endsection
@section('main-script')
    <script type="text/javascript">
        $(document).ready(function(){
            $('input[type="file"]').change(function(e){
                var fileName = e.target.files[0].name;
                $("#tagFileName").html(fileName);
            });
        });
    </script>
@endsection