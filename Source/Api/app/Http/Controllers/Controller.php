<?php

namespace App\Http\Controllers;

use App\Helper\Curl;
use App\Models\MicroSite;
use App\Models\SiteData;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Sunra\PhpSimple\HtmlDomParser;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
    }

    public function test()
    {
    }

}
