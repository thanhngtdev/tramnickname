@extends('admin.layout_master')

@section('main-header')
    <h1 class="page-header">Weekly training <small>Edit</small></h1>
@endsection

@section('main-content')
    <?php $site = $data['site']; ?>
    <?php $weeklyTraining = $data['Weekly training']; ?>

        <div class="box box-danger">
            <div class="box-header">
                <h3 class="box-title"><strong>Price</strong></h3>
            </div>
            <div class="box-body" id="customer-info">
                <form action="{!! route('admin.weekly.updatePrice') !!}" method="POST">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type="hidden" name="lbId" value="{!! $site->ms_id !!}">

                    <div class="form-group">
                        <label class="" for="">Amount</label>
                        <div class="input-group">
                            <div class="input-group-addon">£</div>
                            <input type="number" class="form-control" name="txtPrice"
                                   value="{!! $weeklyTraining['price']['price'] !!}" placeholder="Amount">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="" for="">Time</label>
                        <div class="input-group">
                            <input type="number" class="form-control" name="txtAmount"
                                   value="{!! $weeklyTraining['price']['amount'] !!}" placeholder="Amount">
                            <div class="input-group-addon">weeks</div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-warning">Update Price</button>
                </form>
            </div>
            <!-- /.box-body -->
        </div>
        <div class="box box-danger">
            <div class="box-header">
                <h3 class="box-title"><strong>Address</strong></h3>
            </div>
            <div class="box-body" id="customer-info">
                <form action="{!! route('admin.weekly.updateAddress') !!}" method="POST">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type="hidden" name="lbId" value="{!! $site->ms_id !!}">

                    <div class="form-group">
                        <label class="" for="">Address</label>
                        <input type="text" class="form-control" name="txtAddress"
                               value="{!! $weeklyTraining['address']['text'] !!}" placeholder="Address">
                    </div>
                    <button type="submit" class="btn btn-warning">Update Address</button>
                </form>
            </div>
            <!-- /.box-body -->
        </div>
        <div class="box box-danger">
            <div class="box-header">
                <h3 class="box-title"><strong>Class time</strong></h3>
            </div>
            <div class="box-body" id="customer-info">
                @foreach($weeklyTraining['class'] as $class)
                <form action="{!! route('admin.weekly.updateClass') !!}" method="POST">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type="hidden" name="lbId" value="{!! $site->ms_id !!}">
                    <input type="hidden" name="classId" value="{!! $class['id'] !!}">

                    <div class="form-group">
                        <label>Date</label>
                        <select class="form-control select2" name="sltDate">
                            <option value="Monday" @if($class['date'] == 'Monday') selected @endif
                                >Monday</option>
                            <option value="Tuesday" @if($class['date'] == 'Tuesday') selected @endif
                                >Tuesday</option>
                            <option value="Wednesday" @if($class['date'] == 'Wednesday') selected @endif
                                >Wednesday</option>
                            <option value="Thursday" @if($class['date'] == 'Thursday') selected @endif
                                >Thursday</option>
                            <option value="Friday" @if($class['date'] == 'Friday') selected @endif
                                >Friday</option>
                            <option value="Saturday" @if($class['date'] == 'Saturday') selected @endif
                                >Saturday</option>
                            <option value="Sunday" @if($class['date'] == 'Sunday') selected @endif
                                >Sunday</option>
                        </select>
                    </div>
                    <div class="form-group form-inline">
                        <label>Time: </label>
                        <div class="form-group">
                            <label for="">From</label>
                            <div class="input-group">
                                <input type="text" class="form-control timepicker" name="txtTimeStart"
                                value="{!! $class['timeStart'] !!}">
                                <div class="input-group-addon">
                                    <i class="fa fa-clock-o"></i>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="">To</label>
                            <div class="input-group">
                                <input type="text" class="form-control timepicker" name="txtTimeEnd"
                                       value="{!! $class['timeEnd'] !!}">
                                <div class="input-group-addon">
                                    <i class="fa fa-clock-o"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group form-inline">
                        <label>Age: </label>
                        <div class="form-group">
                            <label for="">From</label>
                            <input type="number" class="form-control" name="txtAgeStart"
                                   value="{!! $class['ageStart'] !!}">

                        </div>
                        <div class="form-group">
                            <label for="">To</label>
                            <div class="input-group">
                                <input type="number" class="form-control" name="txtAgeEnd"
                                       value="{!! $class['ageEnd'] !!}">
                                <div class="input-group-addon">years old</div>
                            </div>
                        </div>

                    </div>
                    <button type="submit" class="btn btn-warning">Update Class</button>
                </form>
                    <hr>
                @endforeach
                <!-- /.box-body -->
            </div>
        </div>
        <div class="box box-primary">
            <div class="box-header">
                <h3 class="box-title"><strong>New class time</strong></h3>
            </div>
            <div class="box-body" id="customer-info">
                <form action="{!! route('admin.weekly.createClass') !!}" method="POST">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type="hidden" name="lbId" value="{!! $site->ms_id !!}">

                    <div class="form-group">
                        <label>Date</label>
                        <select class="form-control select2" name="sltDate">
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                        </select>
                    </div>
                    <div class="form-group form-inline">
                        <label>Time: </label>
                        <div class="form-group">
                            <label for="">From</label>
                            <div class="input-group">
                                <input type="text" class="form-control timepicker" name="txtTimeStart">
                                <div class="input-group-addon">
                                    <i class="fa fa-clock-o"></i>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="">To</label>
                            <div class="input-group">
                                <input type="text" class="form-control timepicker" name="txtTimeEnd">
                                <div class="input-group-addon">
                                    <i class="fa fa-clock-o"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group form-inline">
                        <label>Age: </label>
                        <div class="form-group">
                            <label for="">From</label>
                            <input type="number" class="form-control" name="txtAgeStart">

                        </div>
                        <div class="form-group">
                            <label for="">To</label>
                            <div class="input-group">
                                <input type="number" class="form-control" name="txtAgeEnd">
                                <div class="input-group-addon">years old</div>
                            </div>
                        </div>

                    </div>
                    <button type="submit" class="btn btn-warning">Create new Class</button>
                </form>
                <!-- /.box-body -->
            </div>
        </div>
@endsection

@section('main-script')
    <script type="text/javascript">
        $(document).ready(function () {
            $('.timepicker').timepicker({
                showInputs: false
            })
        });
    </script>
@endsection