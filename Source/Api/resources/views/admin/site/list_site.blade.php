@extends('admin.layout_master')

@section('main-header')
    <h1 class="page-header">Micro site <small>list</small></h1>
@endsection

@section('main-content')
<div class="col-md-12">
    <table id="tblMain" class="table table-bordered table-striped">
        <thead>
        <tr>
            <th>#</th>
            <th>Site Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
        </tr>
        </thead>
        <tfoot>
        <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
        </tr>
        </tfoot>
    </table>
</div>
@endsection
@section('main-script')
<script>
    $(document).ready(function() {
        $('#tblMain').DataTable( {
            paging: true,
            processing: true,
            serverSide: true,
            searching: true,
            ordering:  false,
            lengthChange: false,
            pageLength: 12,
            ajax: {
                url: "{!! route('admin.site.getListData') !!}",
                dataFilter: function(data){
                    var json = jQuery.parseJSON( data );
                    json.recordsTotal = json.total;
                    json.recordsFiltered = json.total;
                    return JSON.stringify( json ); // return JSON string
                }
            },
            columns: [
                { data: "ms_id" },
                { data: "ms_name" },
                { data: "ms_email" },
                { data: "ms_phone"},
                {
                    data: "ms_id",
                    orderable:false,
                    render: function(data, type, full, meta ){
                        let str = '';
                        str += '<i class="fa fa-pencil fa-fw"></i>';
                        str += '<a href="{!! route('admin.site.getEdit',':id') !!}">Edit</a>';
                        str = str.replace(':id', data);
                        str += '<span> | </span>';
                        str += '<i class="fa fa-trash-o fa-fw"></i>';
                        str += '<a href="{!! route('admin.site.getDelete',':id') !!}">Delete</a>';
                        str = str.replace(':id', data);

                        return str;
                    }
                }
            ],
        } );
    });

</script>
@endsection
