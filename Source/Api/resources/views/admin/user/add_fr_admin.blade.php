@extends('admin.layout_master')

@section('main-header')
    <h1 class="page-header">Franchise Admin <small>Add</small></h1>
@endsection

@section('main-content')
    <form action="" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label>Username (<span class="text-danger">*</span>) </label>
                    <input class="form-control" name="txtName" placeholder="user name"
                           required value="{!! old('txtName') !!}"/>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="txtEmail">Email (<span class="text-danger">*</span>) </label>
                    <input class="form-control" name="txtEmail" value="" required/>
                </div>
                <div class="form-group">
                    <label>Phone (<span class="text-danger">*</span>) </label>
                    <input class="form-control" name="txtPhone" required value="{!! old('txtPhone') !!}" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label>Password (<span class="text-danger">*</span>) </label>
                    <input class="form-control" type="password" name="txtPassword" required value="" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label>Confirm Password (<span class="text-danger">*</span>) </label>
                    <input class="form-control" type="password" name="txtPassword_confirmation"
                           required value="" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label>Show name</label>
                    <input class="form-control" name="txtShowName" placeholder="show name"
                           value="{!! old('txtShowName') !!}"/>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label>Address</label>
                    <input class="form-control" name="txtAddress1" value="{!! old('txtAddress1') !!}" />
                </div>
            </div>
        </div>
        <div class="row">
            <?php $dal_site = new \App\Http\DAL\DAL_Site(); ?>
            <?php $lstAcademy = $dal_site->getListSitePublic(); ?>
            <div class="col-md-6">
                <div class="form-group">
                    <label>Academy</label>
                    <select class="select2 form-control" name="sltAcademy[]" style="width: 100%;" multiple="multiple">
                        @foreach($lstAcademy as $academy)
                            <option value="{!! $academy->ms_id !!}" >{!! $academy->ms_name !!}</option>
                        @endforeach
                    </select>
                </div>
            </div>
        </div>

        <button type="submit" class="btn btn-default">Create</button>
    </form>
@endsection
