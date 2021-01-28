@extends('admin.layout_master')

@section('main-header')
    <h1 class="page-header">Micro site FAQ <small>list</small></h1>
    <a href="{!! route('admin.qna.getAdd',$data['site']->ms_id) !!}"
       target="_blank" class="btn btn-warning">Add new</a>
@endsection

@section('main-content')
    <table id="tblMain" class="table table-bordered table-striped">
        <thead>
        <tr>
            <th>#</th>
            <th>Question</th>
            <th>Created date</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        @foreach($data['lstFaq'] as $article)
            <tr>
                <td>{!! $article->atc_id !!}</td>
                <td>{!! $article->atc_sapo !!}</td>
                <td>{!! date('d/m/Y',strtotime($article->atc_publicDate)) !!}</td>
                <td>
                    <i class="fa fa-pencil fa-fw"></i>
                    <a href="{!! route('admin.qna.getEdit',$article->atc_id) !!}" target="_blank">Edit</a>
                    <span> | </span>
                    <i class="fa fa-trash fa-fw"></i>
                    <a href="{!! route('admin.article.getDelete',$article->atc_id) !!}">Delete</a>
                </td>
            </tr>
        @endforeach
        </tbody>

        <tfoot>
        <tr>
            <th>#</th>
            <th>Question</th>
            <th>Created date</th>
            <th>Action</th>
        </tr>
        </tfoot>
    </table>
    @if(method_exists($data['lstFaq'], 'links')) {!! $data['lstFaq']->links() !!} @endif
@endsection
@section('main-script')
@endsection