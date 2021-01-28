<?php

namespace App\Http\Controllers\Api;

use App\Helper\Common;
use App\Http\Business\API\BzApi;
use App\Http\Controllers\Controller;
use Ramsey\Uuid\Uuid;


class ApiController extends Controller
{
    protected $_bzApi;
    public function __construct()
    {
        parent::__construct();
        $this->_bzApi = new BzApi();
    }

    public function getHome(){
        return response()->json(
            Common::buildApiResponse($this->_bzApi->getHome())
        );
    }

    public function getAboutUs(){
        return response()->json(
            Common::buildApiResponse($this->_bzApi->getAboutUs())
        );
    }

    public function getFooter(){
        return response()->json(
            Common::buildApiResponse($this->_bzApi->getFooter())
        );
    }
}
