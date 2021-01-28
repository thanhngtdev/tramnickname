@extends('admin.layout_master')

@section('main-header')
    <h1 class="page-header">Academy <small>list</small></h1>
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
        <tbody>
        @foreach($lstSite as $academy)
            <tr>
                <td>{!! $academy->ms_id !!}</td>
                <td>{!! $academy->ms_name !!}</td>
                <td>{!! $academy->ms_email !!}</td>
                <td>{!! $academy->ms_phone !!}</td>
                <td>
                    <i class="fa fa-pencil fa-fw"></i>
                    <a href="{!! route('admin.site.getEdit',$academy->ms_id) !!}">Edit</a>
                </td>
            </tr>
        @endforeach
        </tbody>
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
@endsection
