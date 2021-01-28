@extends('admin.layout_master')

@section('main-header')<h1 class="page-header">Người dùng<small>đổi mật khẩu</small></h1>
@endsection
@section('main-content')
    <form role="form" action="" method="POST" >
        <input type="hidden" name="_token" value="{{ csrf_token() }}">

        <!-- text input -->
        <div class="form-group">
            <label>Mật khẩu mới (<span class="text-danger">*</span>) </label>
            <input class="form-control" type="password" name="txtPassword" placeholder="Mật khẩu mới" value=""/>
            
        </div>
        <div class="form-group">
            <label>Xác nhận mật khẩu (<span class="text-danger">*</span>) </label>
            <input class="form-control" type="password" name="txtPassword_confirmation" 
                placeholder="Mật khẩu mới" value=""/>
        </div>
        <button type="submit" class="btn btn-default">Cập nhật</button>
    </form>
@endsection