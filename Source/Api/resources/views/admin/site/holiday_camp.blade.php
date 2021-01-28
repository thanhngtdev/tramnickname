@extends('admin.layout_master')

@section('main-header')
    <h1 class="page-header">Holiday camp <small>Edit</small></h1>
@endsection

@section('main-content')
    <?php $site = $data['site']; ?>

    <div class="box box-danger">
        <div class="box-header">
            <h3 class="box-title"><strong>Camp Date</strong></h3>
        </div>
        <div class="box-body">
            <?php $holidayCamp = $data['Holiday camp'];?>
            @foreach($holidayCamp['date'] as $camp)
                <form action="{!! route('admin.site.postUpdateCamp') !!}" method="POST">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type="hidden" name="lbId" value="{!! $site->ms_id !!}">
                    <input type="hidden" name="campId" value="{!! $camp['id'] !!}">
                    <div class="form-group form-inline">
                        <div class="form-group">
                            <label for="">From</label>
                            <div class="input-group">
                                <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </div>
                                <input type="text" class="form-control datepicker" name="txtDateStart"
                                       value="{!! $camp['dateStart'] !!}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="">To</label>
                            <div class="input-group">
                                <div class="input-group-addon">
                                    <i class="fa fa-calendar"></i>
                                </div>
                                <input type="text" class="form-control datepicker" name="txtDateEnd"
                                       value="{!! $camp['dateEnd'] !!}">
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-warning">Update Camp</button>
                </form>
                <hr>
            @endforeach
        </div>
        <!-- /.box-body -->
    </div>
    <div class="box box-primary">
        <div class="box-header">
            <h3 class="box-title"><strong>Create Camp Date</strong></h3>
        </div>
        <div class="box-body">
            <form action="{!! route('admin.site.postCreateCamp') !!}" method="POST">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" name="lbId" value="{!! $site->ms_id !!}">
                <div class="form-group form-inline">
                    <div class="form-group">
                        <label for="">From</label>
                        <div class="input-group">
                            <div class="input-group-addon">
                                <i class="fa fa-calendar"></i>
                            </div>
                            <input type="text" class="form-control datepicker" name="txtDateStart">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="">To</label>
                        <div class="input-group">
                            <div class="input-group-addon">
                                <i class="fa fa-calendar"></i>
                            </div>
                            <input type="text" class="form-control datepicker" name="txtDateEnd">
                        </div>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary">Create new Camp</button>
            </form>
        </div>
        <!-- /.box-body -->
    </div>

    <div class="box box-danger">
        <div class="box-header">
            <h3 class="box-title"><strong>Camp Calendar</strong></h3>
        </div>
        <div class="box-body">

            @foreach($holidayCamp['calendar'] as $calendar)
                <form action="{!! route('admin.site.postUpdateCalendar') !!}" method="POST">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type="hidden" name="lbId" value="{!! $site->ms_id !!}">
                    <input type="hidden" name="calId" value="{!! $calendar['id'] !!}">

                    <div class="form-group form-inline">
                        <label>Time: </label>
                        <div class="form-group">
                            <label for="">From</label>
                            <div class="input-group">
                                <input type="text" class="form-control timepicker" name="txtTimeStart"
                                       value="{!! $calendar['timeStart'] !!}">
                                <div class="input-group-addon">
                                    <i class="fa fa-clock-o"></i>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="">To</label>
                            <div class="input-group">
                                <input type="text" class="form-control timepicker" name="txtTimeEnd"
                                       value="{!! $calendar['timeEnd'] !!}">
                                <div class="input-group-addon">
                                    <i class="fa fa-clock-o"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="">Title</label>
                        <input type="text" class="form-control" name="txtTitle" value="{!! $calendar['title'] !!}">
                    </div>
                    <div class="form-group">
                        <label for="">Explain</label>
                        <textarea class="form-control" name="txtExplain" id="" rows="5"
                            >{!! $calendar['explain'] !!}</textarea>
                    </div>

                    <button type="submit" class="btn btn-warning">Update Calendar</button>
                </form>
                <hr>
            @endforeach
        </div>
        <!-- /.box-body -->
    </div>

    <div class="box box-primary">
        <div class="box-header">
            <h3 class="box-title"><strong>Add calendar</strong></h3>
        </div>
        <div class="box-body">
            <form action="{!! route('admin.site.postCreateCalendar') !!}" method="POST">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <input type="hidden" name="lbId" value="{!! $site->ms_id !!}">
                <div class="form-group form-inline">
                    <label>Time: </label>
                    <div class="form-group">
                        <label for="">From</label>
                        <div class="input-group">
                            <input type="text" class="form-control timepicker" name="txtTimeStart"
                                   value="">
                            <div class="input-group-addon">
                                <i class="fa fa-clock-o"></i>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="">To</label>
                        <div class="input-group">
                            <input type="text" class="form-control timepicker" name="txtTimeEnd"
                                   value="">
                            <div class="input-group-addon">
                                <i class="fa fa-clock-o"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="">Title</label>
                    <input type="text" class="form-control" name="txtTitle" value="">
                </div>
                <div class="form-group">
                    <label for="">Explain</label>
                    <textarea class="form-control" name="txtExplain" id="" rows="5"></textarea>
                </div>

                <button type="submit" class="btn btn-primary">Add new</button>
            </form>
        </div>
        <!-- /.box-body -->
    </div>
@endsection

@section('main-script')
    <script type="text/javascript">
        $(document).ready(function () {
            $(document).ready(function () {
                $('.timepicker').timepicker({
                    showInputs: false
                })
            });
            //Date picker
            $('.datepicker').datepicker({
                autoclose: true,
                maxViewMode:'year',
                startView:'months'
            });
        });
    </script>
@endsection