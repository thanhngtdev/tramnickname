@extends('admin.layout_master')

@section('main-header')
    <h1>Categories
        <small>Edit</small>
    </h1>
@endsection

@section('main-content')
    <?php $cate = $data['cate']; ?>
    <form action="" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <input type="hidden" name="lbId" value="{!! $cate->cate_id !!}">
        <div class="form-group">
            <label>Category name (<span class="text-danger">*</span>)</label>
            <input class="form-control" type="text" name="txtName" placeholder="Cate name"
                   value="{!! $cate->cate_name !!}"/>
        </div>
        <div class="form-group">
            <label>Parent cate</label>
            <select class="form-control" name="sltCate">
                <?php $dal_article = new \App\Http\DAL\DAL_Article(); ?>
                <?php $lstCate = $dal_article->getListCateArticle([$cate->cate_status]); ?>
                <option value="0">-- Parent cate --</option>
                @foreach($lstCate as $cateItem) {
                @if($cateItem->cate_id == $cate->cate_parent)
                    <option value="{!! $cateItem->cate_id !!}" selected>{!! $cateItem->cate_value !!}</option>
                @else
                    @if($cateItem->cate_id == $cate->cate_id)
                            <option value="{!! $cateItem->cate_id  !!}" disabled>{!! $cateItem->cate_value  !!}</option>
                    @else
                        <option value="{!! $cateItem->cate_id  !!}">{!! $cateItem->cate_value  !!}</option>
                    @endif
                @endif
                @endforeach
            </select>
        </div>

        <button type="submit" class="btn btn-default">Update</button>
        <button type="reset" class="btn btn-default" onclick="goBack()">Cancel</button>
    </form>
@endsection