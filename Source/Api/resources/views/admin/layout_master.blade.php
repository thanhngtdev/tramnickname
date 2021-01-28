<?php
/**
 * Created by PhpStorm.
 * User: QuanVH
 * Date: 08/12/2016
 * Time: 11:16 SA
 */
?>
    <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Admin</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.6 -->
    <link rel="stylesheet" href="/plugin/bootstrap/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="/plugin/font-awesome/css/font-awesome.min.css">
    <!-- bootstrap datatable -->
    <link rel="stylesheet" href="/plugin/datatables/dataTables.bootstrap.css">
    <!-- bootstrap datepicker -->
    <link rel="stylesheet" href="/plugin/datepicker/datepicker3.css">
    <link rel="stylesheet" href="/plugin/daterangepicker/daterangepicker.css">
    <link rel="stylesheet" href="/plugin/timepicker/bootstrap-timepicker.min.css">

    <link rel="stylesheet" href="/plugin/select2/select2.min.css">
    <link rel="stylesheet" href="/plugin/bootstrap-toggle/css/bootstrap-toggle.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="/plugin/_adminLTE/css/AdminLTE.min.css">

    <link rel="stylesheet" href="/plugin/dropzone/basic.css">
    <link rel="stylesheet" href="/plugin/dropzone/dropzone.css">
    <link rel="stylesheet" href="/plugin/iCheck/all.css">
    <link rel="stylesheet" href="/css/admin/admin.css">
    <link rel="stylesheet" href="/plugin/_adminLTE/css/skins/_all-skins.min.css">

    <!-- AdminLTE Skins. Choose a skin from the css/skins
         folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="{!! asset('plugin/_adminLTE/css/skins/_all-skins.min.css') !!}">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script src="{{ asset('plugin/ckeditor/ckeditor.js') }}"></script>
    {{--<script src="{{ asset('plugin/ckfinder/ckfinder.js') }}"></script>--}}

    <script>
        var baseURL = "{!! url('/') !!}";
    </script>
    <script src="{{ asset('plugin/func_ckfinder.js') }}"></script>
</head>
<body class="hold-transition skin-blue-light sidebar-mini">
<div class="wrapper">
    <style>
        .checked {
            color: orange;
        }
    </style>
@include('admin.include.header')

@include('admin.include.main_sidebar')

<!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">

        @if (count($errors) > 0)
            <div class="box-body">
                <div class="box box-danger box-solid">
                    <div class="box-header with-border">
                        <h3 class="box-title">Error</h3>

                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="remove">
                                <i class="fa fa-times"></i>
                            </button>
                        </div>
                        <!-- /.box-tools -->
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                    <!-- /.box-body -->
                </div>
            </div>
        @endif

    <!-- Flash message -->
        @if( \Illuminate\Support\Facades\Session::has('success_message'))
            <div class="box-body">
                <div class="box box-success box-solid">
                    <div class="box-header with-border">
                        <h3 class="box-title">Success</h3>

                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="remove">
                                <i class="fa fa-times"></i></button>
                        </div>
                        <!-- /.box-tools -->
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">
                        {{ \Illuminate\Support\Facades\Session::get('success_message') }}
                    </div>
                    <!-- /.box-body -->
                </div>
            </div>
        @endif

        @if( \Illuminate\Support\Facades\Session::has('error_message'))
            <div class="box-body">
                <div class="box box-danger box-solid">
                    <div class="box-header with-border">
                        <h3 class="box-title">Error</h3>

                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="remove">
                                <i class="fa fa-times"></i></button>
                        </div>
                        <!-- /.box-tools -->
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body">
                        {{ \Illuminate\Support\Facades\Session::get('error_message') }}
                    </div>
                    <!-- /.box-body -->
                </div>
            </div>
        @endif
        {{--<!-- end flash message -->--}}

        <section class="content-header clearfix">
            @yield('main-header')
        </section>

        <!-- Main content -->
        <section class="content">
            @yield('main-content')
        </section>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    @include('admin.include.footer')

</div>
<!-- ./wrapper -->

<!-- jQuery 2.2.3 -->
<script src="/plugin/jQuery/jquery-2.2.3.min.js" type="text/javascript"></script>
<!-- jQuery UI 1.11.4 -->
<script src="/plugin/jQueryUI/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
    $.widget.bridge('uibutton', $.ui.button);
</script>
<!-- Bootstrap 3.3.6 -->
<script src="/plugin/bootstrap/js/bootstrap.min.js"></script>
<!-- DataTables -->
<script src="/plugin/datatables/jquery.dataTables.min.js"></script>
<script src="/plugin/datatables/dataTables.bootstrap.min.js"></script>
<!-- bootstrap datepicker -->
<script src="/plugin/datepicker/bootstrap-datepicker.js"></script>
<script src="/plugin/timepicker/bootstrap-timepicker.min.js"></script>

<script src="/plugin/daterangepicker/moment.min.js"></script>
<script src="/plugin/daterangepicker/daterangepicker.js"></script>
<script src="/plugin/validate/jquery.validate.js"></script>
<script src="/plugin/select2/select2.full.min.js"></script>
<script src="/plugin/input-mask/jquery.inputmask.bundle.js"></script>
<script src="/plugin/bootstrap-toggle/js/bootstrap-toggle.min.js"></script>
<script src="/plugin/dropzone/dropzone.js"></script>
<script src="/plugin/iCheck/icheck.min.js"></script>

<!-- AdminLTE App -->
<script src="/plugin/_adminLTE/js/app.min.js?v=1"></script>
<script src="/plugin/_adminLTE/js/demo.js?v=1"></script>

<!-- Main admin js -->
<script src="{!! asset('js/admin/admin.js?v=0.2') !!}"></script>
<script type="text/javascript">
    $(document).ready(function () {
        var url = window.location;
        $('.sidebar-menu a').filter(function () {
            return this.href == url;
        }).parent().addClass('active').parent().parent().addClass('active');
    });
</script>
<script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyClAeE9K0S0LZQ3DiTg0-j_w8HvVuMYgoc&libraries=places&callback=initialize"
    async defer></script>
<script>
    function initialize() {

        $('form').on('keyup keypress', function (e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
                e.preventDefault();
                return false;
            }
        });
        const locationInputs = document.getElementsByClassName("map-input");

        const autocompletes = [];
        const geocoder = new google.maps.Geocoder;
        for (let i = 0; i < locationInputs.length; i++) {

            const input = locationInputs[i];
            const fieldKey = input.id.replace("-input", "");
            const isEdit = document.getElementById(fieldKey + "-latitude").value != '' && document.getElementById(fieldKey + "-longitude").value != '';

            const latitude = parseFloat(document.getElementById(fieldKey + "-latitude").value) || -33.8688;
            const longitude = parseFloat(document.getElementById(fieldKey + "-longitude").value) || 151.2195;

            const map = new google.maps.Map(document.getElementById(fieldKey + '-map'), {
                center: {lat: latitude, lng: longitude},
                zoom: 13
            });
            const marker = new google.maps.Marker({
                map: map,
                position: {lat: latitude, lng: longitude},
            });

            marker.setVisible(isEdit);

            const autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.key = fieldKey;
            autocompletes.push({input: input, map: map, marker: marker, autocomplete: autocomplete});
        }

        for (let i = 0; i < autocompletes.length; i++) {
            const input = autocompletes[i].input;
            const autocomplete = autocompletes[i].autocomplete;
            const map = autocompletes[i].map;
            const marker = autocompletes[i].marker;

            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                marker.setVisible(false);
                const place = autocomplete.getPlace();

                geocoder.geocode({'placeId': place.place_id}, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        setAddress(results[0], place.name);
                    }
                });

                if (!place.geometry) {
                    window.alert("No details available for input: '" + place.name + "'");
                    input.value = "";
                    return;
                }

                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);

            });
        }
    }

    function setAddress(place, placeName) {
        // console.log(placeName);
        const address = placeName + ', ' + place.formatted_address;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const place_id = place.place_id;
        let postalCode = '';
        // console.log(place.address_components);
        place.address_components.forEach(item => {
            if (item.types.includes('postal_code')) {
                postalCode = item.long_name;
            }
        });
        const siteId = $("input[name='lbId']").val();
        if (siteId && siteId != 'undefined') {
            $.ajax({
                url: "/site/edit-site/update-address/" + siteId,
                method: 'post',
                data: {
                    _token: $("input[name='_token']").val(),
                    siteId: siteId,
                    address, lat, lng, postalCode, place_id
                },
                success: function (data) {
                    // console.log((data));
                    if (data.status === 200) {
                        alert('cập nhật địa chỉ thành công')
                    }
                }
            });
        }
        else{
            $("#txtAddress").val(address);
            $("#txtLat").val(lat);
            $("#txtLng").val(lng);
            $("#txtPlaceId").val(place_id);
            $("#txtPostal").val(postalCode);
        }
    }

</script>


@yield('main-script')

</body>
</html>

