@extends('admin.layout_master')

@section('main-header')
    <h1>Categories
        <small>Add</small>
    </h1>
@endsection

@section('main-content')
    <script>
        function selectType(evt){
            let newUrl = "{!! route('admin.article.cate.getAdd',':id') !!}";
            newUrl = newUrl.replace(':id', $(evt).val());
            window.location = newUrl;
        }
    </script>
    <form action="" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <div class="form-group">
            <label>Type (<span class="text-danger">*</span>)</label>
            <select class="form-control" name="sltType" onchange="selectType(this)">
                <option value="1" @if($type == 1) selected @endif>News</option>
                <option value="2" @if($type == 2) selected @endif>FAQs</option>
            </select>
        </div>
        <div class="form-group">
            <label>Cate name (<span class="text-danger">*</span>)</label>
            <input class="form-control" type="text" name="txtName" placeholder="Cate name"
                   value="{!! old('txtName') !!}"/>
        </div>
        <div class="form-group">
            <label>Parent cate</label>
            <select class="form-control" name="sltCate">
                <option value="0">-- Parent cate --</option>

                <?php $dal_article = new \App\Http\DAL\DAL_Article(); ?>
                <?php $lstCate = $dal_article->getListCateArticle([$type]); ?>
                @foreach($lstCate as $cate) {
                <option value="{!! $cate->cate_id  !!}">{!! $cate->cate_name  !!}</option>
                @endforeach
            </select>
        </div>
        <button type="submit" class="btn btn-default">Create</button>
        <button type="reset" class="btn btn-default">Cancel</button>
    </form>
@endsection
@section('main-script')

@endsection