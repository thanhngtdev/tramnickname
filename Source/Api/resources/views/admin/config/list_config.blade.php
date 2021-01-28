<?php
/**
 * Created by PhpStorm.
 * User: QuanVH
 * Date: 01/11/2016
 * Time: 23:07 CH
 */
        ?>
@extends('admin.layout_master')

@section('main-header')
    <h1>Cấu hình <small>danh sách</small></h1>
@endsection


@section('main-content')
    <?php $lstConfig = \App\Models\Config::all(); ?>
    <div class="box">
        <div class="box-body">
            <table id="tblMain" class="table table-bordered table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Tên</th>
                    <th>Alias</th>
                    <th>Thao tác</th>
                </tr>
                </thead>
                <tbody>
                @foreach($lstConfig as $config)
                    <tr>
                        <td>{!! $config->cfg_id !!}</td>
                        <td>{!! $config->cfg_name !!}</td>
                        <td>{!! $config->cfg_alias !!}</td>
                        <td>
                            <i class="fa fa-pencil fa-fw"></i>
                            <a href="{!! route('admin.config.getEdit',$config->cfg_id) !!}">Sửa</a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
                <tfoot>
                <tr>
                    <th>#</th>
                    <th>Tên</th>
                    <th>Alias</th>
                    <th>Thao tác</th>
                </tr>
                </tfoot>
            </table>
        </div>
        <!-- /.box-body -->
    </div>
    <!-- /.box -->
@endsection

@section('main-script')
    <script>
        $(function () {
            $('#tblMain').DataTable({});
        });
    </script>
@endsection