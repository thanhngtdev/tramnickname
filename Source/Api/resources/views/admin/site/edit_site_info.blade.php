@extends('admin.layout_master')

@section('main-header')
    <h1 class="page-header">Site Info
        <small>Edit</small>
    </h1>
@endsection

@section('main-content')
    <?php $site = $data['site']; ?>
    <form action="" id="editUserRegister" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <input type="hidden" name="lbId" id="lbId" value="{!! $site->ms_id !!}">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="txtShowName">Name (<span class="text-danger">*</span>)</label>
                    <input class="form-control" name="txtName" placeholder="Name"
                           value="{!! $site->ms_name !!}"/>
                </div>
                <div class="form-group">
                    <label for="txtShowName">Alias</label>
                    <input class="form-control" name="txtAlias" placeholder="alias"
                           value="{!! $site->ms_alias !!}" />
                </div>
                <div class="form-group">
                    <label for="txtLocationId">Location ID (<span class="text-danger">*</span>)</label>
                    <input class="form-control" name="txtLocationId" placeholder="Company ID"
                           value="{!! $site->pa_locationId !!}"/>
                </div>
                <div class="form-group">
                    <label for="txtPostal">Postal code</label>
                    <input class="form-control" name="txtPostal" placeholder="Postal code"
                           value="{!! $site->ms_postal !!}"/>
                </div>
                <div class="form-group">
                    <label for="txtCompanyId">Company ID (<span class="text-danger">*</span>)</label>
                    <input class="form-control" name="txtCompanyId" placeholder="Company ID"
                           value="{!! $site->pa_companyId !!}"/>
                </div>
                <div class="form-group">
                    <label for="txtAssociatedId">Associated IDs</label>
                    <input class="form-control" name="txtAssociatedId" placeholder="Associated IDs"
                           value="{!! $site->ms_associated !!}"/>
                </div>
                <div class="form-group">
                    <label for="txtEmail">Email (<span class="text-danger">*</span>)</label>
                    <input class="form-control" name="txtEmail" value="{!! $site->ms_email !!}" required/>
                </div>
                <div class="form-group">
                    <label for="txtPhone">Phone (<span class="text-danger">*</span>)</label>
                    <input class="form-control" name="txtPhone" value="{!! $site->ms_phone !!}"
                           required minlength="9"/>
                </div>
                <div class="form-group">
                    <label>Region</label>
                    <select class="form-control select2" name="sltRegion">
                        <option value="London"
                                @if($site->ms_region == 'London') selected @endif>London
                        </option>
                        <option value="North West England"
                                @if($site->ms_region == 'North West England') selected @endif
                        >North West England
                        </option>
                        <option value="South England"
                                @if($site->ms_region == 'South England') selected @endif
                        >South England
                        </option>

                    </select>
                </div>
                <div class="form-group">
                    <label>Free/Paid trial</label>
                    <select class="form-control select2" name="sltTrial">
                        <option value="0" @if($site->ms_trial == 0) selected @endif>Free</option>
                        <option value="1" @if($site->ms_trial == 1) selected @endif>Paid</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="imgFeature">Feature Image</label>
                    <br>
                    @if($site->ms_avatar)
                        <img class="" alt="" src="{!! \App\Helper\Common::GetThumb($site->ms_avatar) !!}"
                             id="_imgFeature" width="320">
                    @else
                        <img class="" alt="" src="{!! asset('img/no-image.jpg') !!}" id="_imgFeature" width="320">
                    @endif
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
                           value="{!! $site->ms_address !!}">
                    <input type="hidden" name="address_latitude" id="address-latitude" value="0"/>
                    <input type="hidden" name="address_longitude" id="address-longitude" value="0"/>
                </div>
                <div id="address-map-container" style="width:100%;height:400px; display: none">
                    <div style="width: 100%; height: 100%" id="address-map"></div>
                </div>
                <br/>
                <div class="box box-danger">
                    <?php $social = $data['Social link']; ?>
                    <div class="box-header">
                        <h3 class="box-title"><strong>Social links</strong></h3>
                    </div>
                    <div class="box-body">
                        @foreach($social as $socialItem)
                            <div class="form-group">
                                <label>{!! $socialItem['name'] !!}</label>
                                <input class="form-control" type="text" name="txt{!! $socialItem['name'] !!}"
                                       placeholder="https://..." value="{!! $socialItem['link'] !!}"/>
                            </div>
                        @endforeach
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
                            >{!! $data['About us']['text'] !!}</textarea>
                        </div>
                    </div>
                    <!-- /.box-body -->
                </div>
                <div class="box box-danger">
                    <div class="box-header">
                        <h3 class="box-title"><strong>Sub page</strong></h3>
                    </div>
                    <div class="box-body">
                        @foreach($site->sub_page as $page)
                            <div class="sub_page">
                                <input type="hidden" class="sub_id" value="{!! $page->sub_id !!}">
                                <div class="form-group">
                                    <div class="input-group">
                                        <span class="input-group-addon">Name</span>
                                        <input type="text" class="form-control sub_name" placeholder="Name"
                                               value="{!! $page->sub_name !!}">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group">
                                        <span class="input-group-addon">URL</span>
                                        <input type="text" class="form-control sub_url" placeholder="URL"
                                               value="{!! $page->sub_alias !!}">
                                    </div>
                                </div>
                                <button type="button" class="edit-sub-page btn btn-warning">Update</button>
                                <button type="button" class="delete-sub-page btn btn-danger">Delete</button>
                            </div>
                            <hr/>
                        @endforeach
                        <div class="form-inline">
                            <div class="form-group">
                                <div class="input-group">
                                    <span class="input-group-addon" id="basic-addon1">Name</span>
                                    <input type="text" class="form-control" id="subPageName" placeholder="Name"
                                           aria-describedby="basic-addon1">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <span class="input-group-addon" id="basic-addon1">URL</span>
                                    <input type="text" class="form-control" id="subPageUrl" placeholder="URL"
                                           aria-describedby="basic-addon1">
                                </div>
                            </div>
                            <button type="button" class="new-sub-page btn btn-primary">Create New</button>
                        </div>
                    </div>
                    <!-- /.box-body -->
                </div>
            </div>
        </div>
        <div class="form-group hidden">
            <?php $sessionCost = $data['Session cost'];?>
            <label for="">Session cost</label>
            <div class="input-group">
                <div class="input-group-addon">One off</div>
                <input type="number" class="form-control" placeholder="" name="txtOneOff"
                       value="{!! $sessionCost['one'] !!}">
                <div class="input-group-addon">£</div>
            </div>
            <br>
            <div class="input-group">
                <div class="input-group-addon">Block Of 4</div>
                <input type="number" class="form-control" placeholder="" name="txtBlockOf4"
                       value="{!! $sessionCost['block'] !!}">
                <div class="input-group-addon">£</div>
            </div>
        </div>

        <div class="form-group">
            <a class="btn btn-app" href="{!! route('admin.site.getListTesti',$site->ms_id) !!}">
                <i class="fa fa-edit"></i> Testimonials
            </a>
            <a class="btn btn-app hidden" href="{!! route('admin.site.getWeeklyTraining',$site->ms_id) !!}">
                <i class="fa fa-edit"></i> Weekly training
            </a>
            <a class="btn btn-app hidden" href="{!! route('admin.site.getHolidayCamp',$site->ms_id) !!}">
                <i class="fa fa-edit"></i> Holiday camp
            </a>
            <a class=" hidden btn btn-app" href="{!! route('admin.site.getListFaq',$site->ms_id) !!}">
                <i class="fa fa-edit"></i> FAQ’s
            </a>
            <a class="btn btn-app" href="{!! route('admin.site.getCoachInfo',$site->ms_id) !!}">
                <i class="fa fa-edit"></i> 1on1 coaching
            </a>
            <a class="btn btn-app" href="{!! route('admin.site.getListNews',$site->ms_id) !!}">
                <i class="fa fa-edit"></i> News
            </a>
            <a class="btn btn-app" href="{!! route('admin.site.getListFaq',$site->ms_id) !!}">
                <i class="fa fa-edit"></i> FAQ
            </a>

        </div>

        <button type="submit" class="btn btn-warning">Update</button>
    </form>
@endsection

@section('main-script')
    <script>
        $(document).ready(function () {
            $("button.new-sub-page").click(function (evt) {
                $.ajax({
                    url: "/site/edit-site/add-sub-page",
                    method: 'post',
                    data: {
                        _token: $("input[name='_token']").val(),
                        siteId: $("input[name='lbId']").val(),
                        name: $("#subPageName").val(),
                        url: $("#subPageUrl").val()
                    },
                }).done(function (data) {
                    location.reload();
                });
            });
            $("button.edit-sub-page").click(function (evt) {
                let subPage = $(evt.target).parent("div.sub_page");
                $.ajax({
                    url: "/site/edit-site/edit-sub-page",
                    method: 'post',
                    data: {
                        _token: $("input[name='_token']").val(),
                        page: subPage.find("input.sub_id").val(),
                        name: subPage.find("input.sub_name").val(),
                        url: subPage.find("input.sub_url").val()
                    },
                }).done(function (data) {
                    location.reload();
                });
            });
            $("button.delete-sub-page").click(function (evt) {
                let subPage = $(evt.target).parent("div.sub_page");
                $.ajax({
                    url: "/site/edit-site/delete-sub-page",
                    method: 'post',
                    data: {
                        _token: $("input[name='_token']").val(),
                        page: subPage.find("input.sub_id").val(),
                    },
                }).done(function (data) {
                    location.reload();
                });
            });
        })
    </script>
@endsection
