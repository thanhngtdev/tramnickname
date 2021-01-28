@extends('admin.layout_master')

@section('main-header')
    <h1 class="page-header">Từ khóa <small>danh sách</small></h1>
    <a href="{!! route('admin.tag.getAdd') !!}" class="btn btn-warning pull-right">
        <i class="fa fa-plus"></i> Thêm mới</a>
    <div style="height: 10px;" class="clearfix"></div>
@endsection

@section('main-content')
    <table id="tblMain" class="table table-bordered table-striped">
        <thead>
        <tr>
            <th>#</th>
            <th>Từ khóa</th>
            <th>Số bài viết</th>
            <th>Thao tác</th>
        </tr>
        </thead>
        <tfoot>
        <tr>
            <th>#</th>
            <th>Từ khóa</th>
            <th>Số bài viết</th>
            <th>Thao tác</th>
        </tr>
        </tfoot>
    </table>
@endsection

@section('main-script')
    <script>
        $(document).ready(function() {
            $('#tblMain').DataTable( {
                paging: true,
                processing: true,
                serverSide: true,
                searching: true,
                lengthChange: false,
                ordering:  false,
                ajax: {
                    url: "{!! route('admin.tag.getListData') !!}",
                    dataFilter: function(data){
                        var json = jQuery.parseJSON( data );
                        json.recordsTotal = json.total;
                        json.recordsFiltered = json.total;
                        return JSON.stringify( json ); // return JSON string
                    }
                },
                columns: [
                    { data: "tag_id" },
                    { data: "tag_name" },
                    { data: "articles", render: function (data) {
                            return data.length;
                        } },
                    {
                        data: "tag_id",
                        orderable:false,
                        render: function(data, type, full, meta ){
                            var str = '<i class="fa fa-pencil fa-fw"></i>';
                            str += '<a href="{!! route('admin.article.cate.getEdit',':id') !!}">Chỉnh sửa</a>';
                            str = str.replace(':id', data);
                            return str;
                        }
                    }
                ],
            } );
        } );
    </script>
@endsection