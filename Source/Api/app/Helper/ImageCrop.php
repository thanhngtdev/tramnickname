<?php

namespace App\Helper;


use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ImageCrop
{

    protected $cropUserSize = array(
        "c1" => array(
            145, 145
        ),
        "c2" => array(400, 600),
    );

    protected $cropSiteSize = array(
        "c1" => array(
            360, 360
        ),
    );

    protected $cropArticleSize = array(
        // list article thumb
        "c1" => array(
            1440, 500
        ),
        "c2" => array(
            430, 270
        ),
    );
    protected $cropConfigSize = array(
        // list config thumb
        "c1" => array(
            685, 525
        ),
        "c2" => array(
            230, 168
        ),
        "c3" => array(
            180, 140
        ),
        "c4" => array(
            350, 350
        ),
    );
    protected $cropIconConfigSize = array(
        // list config thumb
        "c1" => array(
            145, 145
        ),
    );
    protected $cropGallerySize = array(
        // list config thumb
        "c1" => array(
            255, 540
        ),
        "c2" => array(
            255, 255
        ),
        "c3" => array(
            540, 540
        ),
    );


    public function RemoveThumb($path)
    {
        if (Storage::exists($path)) {
            $imagesInfo = pathinfo($path);
            $directories = Storage::directories($imagesInfo['dirname']);
            foreach ($directories as $dir) {
                $arr = explode('/', $dir);
                $dirName = $arr[count($arr) - 1];
                if (Storage::exists($dir . '/' . $imagesInfo['basename']) && substr($dirName, 0, 1) === "c")
                    Storage::delete($dir . '/' . $imagesInfo['basename']);
            }
            Storage::delete($path);
        }
    }

    public function MakeThumb($path, $w, $h, $dir)
    {
        $imagesInfo = pathinfo($path);
        $image = Image::make(Storage::path($path));
        $height = $image->height();
        $width = $image->width();
        if (!Storage::exists($imagesInfo['dirname'] . '/' . $dir))
            Storage::makeDirectory($imagesInfo['dirname'] . '/' . $dir);
        if ($height < $h || $width < $w) {
            $img = $image->crop($w, $h);
        } else {
            $img = $image->fit($w, $h);
        }
        $strName = Storage::path($imagesInfo['dirname'] . '/' . $dir . '/' . $imagesInfo['basename']);
        $img->save($strName);
    }

    public function MakeSiteThumb($FilePath)
    {
        if (Storage::exists($FilePath)) {
            ini_set("memory_limit", "1000M");
            set_time_limit(1000);

            foreach ($this->cropSiteSize as $key => $value) {
                $this->MakeThumb($FilePath, $value[0], $value[1], $key);
            }
        }
    }

    public function MakeConfigThumb($FilePath)
    {
        if (Storage::exists($FilePath)) {
            ini_set("memory_limit", "1000M");
            set_time_limit(1000);

            foreach ($this->cropConfigSize as $key => $value) {
                $this->MakeThumb($FilePath, $value[0], $value[1], $key);
            }
        }
    }

    public function MakeIconConfigThumb($FilePath)
    {
        if (Storage::exists($FilePath)) {
            ini_set("memory_limit", "1000M");
            set_time_limit(1000);

            foreach ($this->cropIconConfigSize as $key => $value) {
                $this->MakeThumb($FilePath, $value[0], $value[1], $key);
            }
        }
    }

    public function MakeGalleryThumb($FilePath)
    {
        if (Storage::exists($FilePath)) {
            ini_set("memory_limit", "1000M");
            set_time_limit(1000);

            foreach ($this->cropGallerySize as $key => $value) {
                $this->MakeThumb($FilePath, $value[0], $value[1], $key);
            }
        }
    }

    public function MakeArticleThumb($FilePath)
    {
        if (Storage::exists($FilePath)) {
            ini_set("memory_limit", "1000M");
            set_time_limit(1000);

            foreach ($this->cropArticleSize as $key => $value) {
                $this->MakeThumb($FilePath, $value[0], $value[1], $key);
            }
        }
    }

    public function MakeUserThumb($FilePath)
    {
        if (Storage::exists($FilePath)) {
            ini_set("memory_limit", "1000M");
            set_time_limit(1000);

            foreach ($this->cropUserSize as $key => $value) {
                $this->MakeThumb($FilePath, $value[0], $value[1], $key);
            }
        }
    }

}

