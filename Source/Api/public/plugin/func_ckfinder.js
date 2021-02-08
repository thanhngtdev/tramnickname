function ckeditor (name,toolbar) {
    toolbar = (typeof toolbar !== 'undefined') ?  toolbar : 0;
    var editor;
    switch (toolbar){
        case 1:
            editor = CKEDITOR.replace(name ,{
                language:'en',
                height : 400,
                toolbar:[
                    ['Maximize','Preview','Find'],
                    ['Font','FontSize','Bold','Italic','Underline','Strike','RemoveFormat'],
                    ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
                    ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
                    ['Link','Unlink','Anchor'],
                    ['Table','Smiley','PageBreak'],
                    ['TextColor','BGColor'],
                    ['Format']
                ],
            });
            break;
        case 2:
            editor = CKEDITOR.replace(name ,{
                uiColor : '#9AB8F3',
                language:'en',
                height : 300,
                filebrowserImageBrowseUrl : baseURL+'/plugin/ckfinder/ckfinder.html?Type=Images',
                filebrowserFlashBrowseUrl : baseURL+'/plugin/ckfinder/ckfinder.html?Type=Flash',
                filebrowserImageUploadUrl : baseURL+'/plugin/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images',
                filebrowserFlashUploadUrl : baseURL+'/plugin/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash',
                toolbar:[
                    ['Maximize','Preview'],
                    ['Bold','Italic','Underline','Strike'],
                    ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
                    ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
                    ['Link','Unlink'],
                    ['Table','Smiley','PageBreak'],
                    ['TextColor','BGColor'],
                ]
            });
            break;
        default:
            editor = CKEDITOR.replace(name ,{
                language:'en',
                height : 300,
                toolbar:[
                    ['Maximize','Preview','Find'],
                    ['Styles','Font','FontSize','Bold','Italic','Underline','Strike','RemoveFormat'],
                    ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
                    ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
                    ['Link','Unlink','Anchor'],
                    ['Image','Table','Smiley','PageBreak'],
                    ['TextColor','BGColor'],
                    ['Format']
                ],
                extraPlugins: 'uploadimage',
                uploadUrl: '/uploader'
            });
            break;
    }

}
