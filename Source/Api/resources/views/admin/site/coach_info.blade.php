@extends('admin.layout_master')

@section('main-header')
    <h1 class="page-header">1on1 Coaching
        <small>Edit</small>
    </h1>
@endsection

@section('main-content')
    <?php $site = $data['site']; ?>
    <?php $coachInfo = $data['Coach info']; ?>
    <form action="" id="editUserRegister" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <input type="hidden" name="lbId" value="{!! $site->ms_id !!}">

        <div class="box box-danger">
            <div class="box-header">
                <h3 class="box-title"><strong>Coach info</strong></h3>
            </div>
            <div class="box-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="txtShowName">Coach Name (<span class="text-danger">*</span>)</label>
                            <input class="form-control" name="txtName" placeholder="Name"
                                   value="{!! $coachInfo['name'] !!}"/>
                        </div>
                        <div class="form-group">
                            <label for="txtDetail">Coach Detail</label>
                            <input class="form-control" name="txtDetail" placeholder="Name"
                                   value="{!! $coachInfo['detail'] ?? '' !!}"/>
                        </div>
                        <div class="form-group">
                            <label for="txtShowName">Couch Description</label>
                            <textarea class="form-control" name="txtDes" rows="5"
                            >{!! $coachInfo['description'] !!}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="imgFeature">Avatar Image</label>
                            <br>
                            @if($coachInfo['avatar'])
                                <img class="" alt="" src="{!! \App\Helper\Common::GetThumb($coachInfo['avatar']) !!}"
                                     id="_imgFeature" width="320">
                            @else
                                <img class="" alt="" src="{!! asset('img/no-image.jpg') !!}" id="_imgFeature"
                                     width="320">
                            @endif
                            <br>
                            <label class="btn btn-default" style="margin-top: 10px;">
                                Browse
                                <input type="file" class="hidden" id="imgFeature" name="imgFeature">
                            </label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h3>Couch Skill</h3>
                        @foreach($coachInfo['skill'] as $key=>$value)
                            <div class="form-group">
                                <label for="txtShowName">{!! $key !!}</label>
                                <input class="form-control" name="txt{!! $key !!}" placeholder="100"
                                       value="{!! $value !!}"/>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
            <!-- /.box-body -->
        </div>
        <div class="box box-danger">
            <div class="box-header">
                <h3 class="box-title"><strong>Coaching Address</strong></h3>
            </div>
            <div class="box-body">
                <?php $coaching = $data['1on1 Coaching']; ?>
                <div class="form-group">
                    <label class="" for="">Address</label>
                    <input type="text" class="form-control" name="txtAddress"
                           value="{!! $coaching['address']['text'] !!}" placeholder="Address">
                </div>

            </div>
            <!-- /.box-body -->
        </div>
        <div class="box box-danger">
            <div class="box-header">
                <h3 class="box-title"><strong>Staff</strong></h3>
            </div>
            <div class="box-body">
                @if(array_key_exists("staff",$coachInfo))
                    @foreach($coachInfo['staff'] as $page)
                        <div class="sub_page">
                            <input type="hidden" class="sub_id" value="{!! $page['id'] !!}">
                            <div class="form-group">
                                <div class="input-group">
                                    <span class="input-group-addon" id="basic-addon1">Name</span>
                                    <input type="text" class="form-control sub_name" placeholder="Name"
                                           aria-describedby="basic-addon1" value="{!! $page['name'] !!}">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <span class="input-group-addon" id="basic-addon1">position</span>
                                    <input type="text" class="form-control sub_pos" placeholder="Position"
                                           aria-describedby="basic-addon1" value="{!! $page['position'] !!}">
                                </div>
                            </div>
                            <img class="" alt="" src="{!! \App\Helper\Common::GetThumb($page['image']) !!}" class="sub_image" width="320">
                            <input type="file" style="display: inline;" class="sub_file">
                            <button type="button" class="edit-sub-page btn btn-warning">Update</button>
                        </div>
                        <hr/>
                    @endforeach @endif
                <div class="form-inline">
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon" id="basic-addon1">Name</span>
                            <input type="text" class="form-control" id="staffName" placeholder="Name"
                                   aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon" id="basic-addon1">position</span>
                            <input type="text" class="form-control" id="staffPosition" placeholder="Position"
                                   aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <input type="file" style="display: inline;" id="staffImage" name="">
                    <button type="button" class="new-sub-page btn btn-primary">Create New</button>
                </div>

            </div>
            <!-- /.box-body -->
        </div>

        <button type="submit" class="btn btn-warning">Update</button>
    </form>
@endsection

@section('main-script')
    <script>
        $(document).ready(function () {
            $("button.new-sub-page").click(function (evt) {
                let files = $('#staffImage')[0].files;
                let formData = new FormData();
                formData.append("file", files[0]);
                formData.append("_token", $("input[name='_token']").val());
                formData.append("siteId", $("input[name='lbId']").val());
                formData.append("name", $("#staffName").val());
                formData.append("position", $("#staffPosition").val());
                $.ajax({
                    url: "/site/edit-site/add-staff",
                    method: 'post',
                    data: formData,
                    processData: false,
                    contentType: false,
                }).done(function (data) {
                    location.reload();
                });
            });
            $("button.edit-sub-page").click(function (evt) {
                let subPage = $(evt.target).parent("div.sub_page");

                let files = subPage.find('input.sub_file')[0].files;
                let formData = new FormData();
                formData.append("file", files[0]);
                formData.append("_token", $("input[name='_token']").val());
                formData.append("siteId", $("input[name='lbId']").val());
                formData.append("name", subPage.find("input.sub_name").val());
                formData.append("position", subPage.find("input.sub_pos").val());
                formData.append("id", subPage.find("input.sub_id").val());
                $.ajax({
                    url: "/site/edit-site/edit-staff",
                    method: 'post',
                    data: formData,
                    processData: false,
                    contentType: false,
                }).done(function (data) {
                    location.reload();
                });
            });
        })
    </script>
@endsection
