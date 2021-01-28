@extends('admin.layout_master')

@section('main-header')
    <h1 class="page-header">Categories
        <small>list</small>
    </h1>
    <a href="{!! route('admin.article.cate.getAdd',1) !!}"
       class="btn btn-primary pull-right">Add</a>
@endsection

@section('main-content')
    <div class="col-md-12">
        <table id="tblMain" class="table table-bordered table-striped">
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Alias</th>
                <th>Type</th>
                <th>Action</th>
            </tr>
            </thead>
            <tfoot>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Alias</th>
                <th>Type</th>
                <th>Action</th>
            </tr>
            </tfoot>
        </table>
    </div>
@endsection

@section('main-script')
    <script>
        $(document).ready(function () {
            $('#tblMain').DataTable({
                paging: true,
                processing: true,
                serverSide: true,
                searching: false,
                ordering: true,
                order: [0, "asc"],
                lengthChange: false,
                ajax: {
                    url: "{!! route('admin.article.cate.getListData') !!}",
                    dataFilter: function (data) {
                        var json = jQuery.parseJSON(data);
                        json.recordsTotal = json.total;
                        json.recordsFiltered = json.total;
                        return JSON.stringify(json); // return JSON string
                    }
                },
                columns: [
                    {data: "cate_id"},
                    {data: "cate_name"},
                    {data: "cate_alias"},
                    {
                        data: "cate_status",
                        orderable: false,
                        render: function (data) {
                            return data === 1 ? 'News' : 'FAQ';
                        }
                    },
                    {
                        data: "cate_id",
                        orderable: false,
                        render: function (data, type, full, meta) {
                            var str = '<i class="fa fa-pencil fa-fw"></i>';
                            str += '<a href="{!! route('admin.article.cate.getEdit',':id') !!}"> Edit</a>';
                            str = str.replace(':id', data);
                            return str;
                        }
                    }
                ],
                lengthMenu: [[25, 50, 100], [25, 50, 100]]
            });
        });
    </script>
@endsection