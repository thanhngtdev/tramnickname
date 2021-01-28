/**
 * Created by QuanVH on 18/05/2019.
 */
function goBack() {
    window.history.back();
}

function ConfirmDelete(event) {
    event.preventDefault();
    if ( confirm("Bạn có chắc chắn muốn xóa?") )
        window.location = event.target.href;
}

$(document).ready(function(){
    $("#imgFeature").change(function(){
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#_imgFeature").attr("src", e.target.result).css("display","block");
        }
        reader.readAsDataURL(file);
    });

    $(".select2").select2({
        minimumResultsForSearch: -1
    });

    $(".tag-select").select2({
        tags: "true",
        ajax: {
            url: "/tag/get-all-tag",
            processResults: function (data) {
                return {
                    results: data
                };
            },
            cache: true,
        },
        minimumInputLength: 2,
    });

    $('.price').inputmask({
        alias: 'numeric',
        groupSeparator: '.',
        autoGroup: true,
        digits: 0,
        digitsOptional: false,
        placeholder: '0',
        rightAlign:false,
        autoUnmask: true,
        removeMaskOnSubmit:true
    }).attr('maxlength', 17);

    $("a.confirm_delete").click(function (evt) {
        evt.preventDefault();
        if ( confirm("Bạn có chắc chắn muốn xóa?") )
            window.location = evt.target.href;
    });
});

function initFilePreview() {
    function imagesPreview(input, placeToInsertImagePreview) {
        if (input.files) {
            var filesAmount = input.files.length;
            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                var preview = placeToInsertImagePreview;
                $(preview).empty();
                reader.onload = function(event) {
                    $($.parseHTML('<img>')).attr('src', event.target.result)
                      .attr('style','padding: 10px; float: left; width: 25%')
                      .attr('class','img img-responsive')
                      .appendTo(preview);
                };
                reader.readAsDataURL(input.files[i]);
            }
        }
    }

    //listen image preview
    $('.file').on('change', function(evt) {
        if ($(evt.target).attr('data-target')) {
            imagesPreview(this, $(evt.target).attr('data-target'));
        }else {
            imagesPreview(this, 'div.gallery');
        }
    });
}
