@extends('admin.layout_master')

@section('main-header')
    <h1 class="page-header">Site
        <small>Add</small>
    </h1>
@endsection

@section('main-content')
    <form action="" id="editUserRegister" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="txtShowName">Name (<span class="text-danger">*</span>)</label>
                    <input class="form-control" name="txtName" placeholder="Name"
                           value="" required/>
                </div>
                <div class="form-group">
                    <label for="txtShowName">Alias</label>
                    <input class="form-control" name="txtAlias" placeholder="alias"
                           value="" />
                </div>
                <div class="form-group">
                    <label for="txtLocationId">Location ID (<span class="text-danger">*</span>)</label>
                    <input class="form-control" name="txtLocationId" placeholder="Location ID"
                           value="" required/>
                </div>
                <div class="form-group">
                    <label for="txtPostal">Postal code</label>
                    <input class="form-control" name="txtPostal" placeholder="Postal code"
                           value=""/>
                </div>
                <div class="form-group">
                    <label for="txtCompanyId">Company ID (<span class="text-danger">*</span>)</label>
                    <input class="form-control" name="txtCompanyId" placeholder="Company ID"
                           value="" required/>
                </div>
                <div class="form-group">
                    <label for="txtAssociatedId">Associated IDs</label>
                    <input class="form-control" name="txtAssociatedId" placeholder="Associated IDs"
                           value=""/>
                </div>
                <div class="form-group">
                    <label for="txtEmail">Email (<span class="text-danger">*</span>)</label>
                    <input class="form-control" name="txtEmail" value="" required/>
                </div>
                <div class="form-group">
                    <label for="txtPhone">Phone (<span class="text-danger">*</span>)</label>
                    <input class="form-control" name="txtPhone" value=""
                           required minlength="9"/>
                </div>
                <div class="form-group">
                    <label>Region</label>
                    <select class="form-control select2" name="sltRegion">
                        <option value="London">London</option>
                        <option value="North West England">North West England</option>
                        <option value="South England">South England</option>

                    </select>
                </div>
                <div class="form-group">
                    <label>Free/Paid trial</label>
                    <select class="form-control select2" name="sltTrial">
                        <option value="0">Free</option>
                        <option value="1">Paid</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="imgFeature">Feature Image</label>
                    <br>
                    <img class="" alt="" src="{!! asset('img/no-image.jpg') !!}" id="_imgFeature" width="320">
                    <br>
                    <label class="btn btn-default" style="margin-top: 10px;">
                        Browse
                        <input type="file" class="hidden" id="imgFeature" name="imgFeature">
                    </label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="address_address">Address</label>
                    <input type="text" id="address-input" name="address_address" class="form-control map-input"
                           value="">
                    <input type="hidden" name="address_latitude" id="address-latitude" value="0"/>
                    <input type="hidden" name="address_longitude" id="address-longitude" value="0"/>

                    <input type="hidden" name="txtAddress" id="txtAddress" value=""/>
                    <input type="hidden" name="txtLat" id="txtLat" value=""/>
                    <input type="hidden" name="txtLng" id="txtLng" value=""/>
                    <input type="hidden" name="txtPlaceId" id="txtPlaceId" value=""/>
                    <input type="hidden" name="txtPostal" id="txtPostal" value=""/>
                </div>
                <div id="address-map-container" style="width:100%;height:400px; display: none">
                    <div style="width: 100%; height: 100%" id="address-map"></div>
                </div>
                <br/>
                <div class="box box-danger">
                    <div class="box-header">
                        <h3 class="box-title"><strong>Social links</strong></h3>
                    </div>
                    <div class="box-body">
                        <div class="form-group">
                            <label>Facebook</label>
                            <input class="form-control" type="text" name="txtFacebook" placeholder="https://..." value="">
                        </div>
                        <div class="form-group">
                            <label>Instagram</label>
                            <input class="form-control" type="text" name="txtInstagram" placeholder="https://..." value="">
                        </div>
                        <div class="form-group">
                            <label>Twitter</label>
                            <input class="form-control" type="text" name="txtTwitter" placeholder="https://..." value="">
                        </div>
                        <div class="form-group">
                            <label>Linkin</label>
                            <input class="form-control" type="text" name="txtLinkin" placeholder="https://..." value="">
                        </div>
                    </div>
                    <!-- /.box-body -->
                </div>
                <div class="box box-danger">
                    <div class="box-header">
                        <h3 class="box-title"><strong>About us</strong></h3>
                    </div>
                    <div class="box-body">
                        <div class="form-group">
                            <textarea rows="5" class="form-control order-note" name="txtAbout"
                            ></textarea>
                        </div>
                    </div>
                    <!-- /.box-body -->
                </div>
            </div>
        </div>

        <button type="submit" class="btn btn-warning">Create</button>
    </form>
@endsection

@section('main-script')
@endsection
