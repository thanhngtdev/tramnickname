@extends('admin.layout_master')

@section('main-header')
    <h1 class="page-header">User
        <small>Edit</small>
    </h1>
@endsection

@section('main-content')
    <form action="" id="editUserRegister" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <input type="hidden" name="lbId" value="{!! $user->user_id !!}">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="txtEmail">Email (<span class="text-danger">*</span>) </label>
                    <input class="form-control" name="txtEmail" value="{!! $user->user_email !!}" required/>
                </div>
                <div class="form-group">
                    <label for="txtPhone">Phone (<span class="text-danger">*</span>) </label>
                    <input class="form-control" name="txtPhone" value="{!! $user->user_phone !!}"
                           required minlength="9"/>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="txtShowName">Show Name</label>
                    <input class="form-control" name="txtShowName" placeholder="show name"
                           value="{!! $user->user_showName !!}"/>
                </div>
                <div class="form-group">
                    <label for="txtAddress">Address</label>
                    <input class="form-control" name="txtAddress" placeholder="Address ..."
                           value="{!! $user->user_address !!}"/>
                </div>
            </div>
        </div>
        @hasanyrole('Super Admin|Master Admin')
        <div class="row">
            <?php $dal_site = new \App\Http\DAL\DAL_Site(); ?>
            <?php $lstAcademy = $dal_site->getListSitePublic(); ?>
            <div class="col-md-6">
                <div class="form-group">
                    <label>Academy</label>
                    <select class="select2 form-control" name="sltAcademy[]" style="width: 100%;" multiple="multiple">
                        @foreach($lstAcademy as $academy)
                            <option value="{!! $academy->ms_id !!}"
                                    @foreach($user->academy as $_academy)
                                    @if($_academy->dt_value == $academy->ms_id) selected @endif
                                @endforeach>{!! $academy->ms_name !!}</option>
                        @endforeach
                    </select>
                </div>
            </div>
        </div>
        @endhasanyrole

        <button type="submit" class="btn btn-warning">Update</button>
    </form>
@endsection

@section('main-script')
    <script>
        $(document).ready(function () {
            $("#editUserRegister").validate({
                rules: {
                    txtEmail: {
                        required: true,
                        email: true
                    },
                    txtPhone: {
                        required: true,
                        digits: true
                    }
                }
            });
        });
    </script>
@endsection
