@extends('admin.layout_master')

@section('main-header')
    <h1 class="page-header">Quản trị viên <small>Thêm mới</small></h1>
@endsection

@section('main-content')
    <form action="" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label>Tên đăng nhập (<span class="text-danger">*</span>) </label>
                    <input class="form-control" name="txtName" placeholder="Tên đăng nhập" value="{!! old('txtName') !!}"/>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label>SDT (<span class="text-danger">*</span>) </label>
                    <input class="form-control" name="txtPhone" value="{!! old('txtPhone') !!}" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label>Mật khẩu (<span class="text-danger">*</span>) </label>
                    <input class="form-control" type="password" name="txtPassword" value="" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label>Nhập lại mật khẩu (<span class="text-danger">*</span>) </label>
                    <input class="form-control" type="password" name="txtPassword_confirmation" value="" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label>Tên hiển thị</label>
                    <input class="form-control" name="txtShowName" placeholder="Tên hiển thị" value="{!! old('txtShowName') !!}"/>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label>Địa chỉ</label>
                    <input class="form-control" name="txtAddress1" value="{!! old('txtAddress1') !!}" />
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label>Phân quyền</label>
                    <select class="form-control" name="sltRole">
                        <option value="2">Quản lý</option>
                        <option value="3">Nhân viên</option>
                    </select>
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn-default">Thêm mới</button>
    </form>
@endsection