@extends('admin.layout_master')

@section('main-header')
    <h1 class="page-header">User <small>list</small></h1>
@endsection

@section('main-content')
<div class="col-md-12">
    <table id="tblMain" class="table table-bordered table-striped">
        <thead>
        <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
        </tr>
        </thead>
        <tfoot>
        <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Full Name</th>
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
            pageLength: 30,
            ajax: {
                url: "{!! route('admin.user.getListData') !!}",
                dataFilter: function(data){
                    var json = jQuery.parseJSON( data );
                    json.recordsTotal = json.total;
                    json.recordsFiltered = json.total;
                    return JSON.stringify( json ); // return JSON string
                }
            },
            columns: [
                { data: "user_id" },
                { data: "user_name" },
                { data: "user_showName" },
                { data: "user_email" },
                { data: "user_phone"},
                {
                    data: "user_id",
                    orderable:false,
                    render: function(data, type, full, meta ){
                        let str = '';
                        str += '<i class="fa fa-pencil fa-fw"></i>';
                        str += '<a href="{!! route('admin.user.getEdit',':id') !!}">Edit</a>';
                        str = str.replace(':id', data);
                        str += '<span> | </span>';
                        str += '<i class="fa fa-trash-o fa-fw"></i>';
                        str += '<a href="{!! route('admin.user.getDelete',':id') !!}">Delete</a>';
                        str = str.replace(':id', data);

                        return str;
                    }
                }
            ],
        } );
    });

</script>
@endsection