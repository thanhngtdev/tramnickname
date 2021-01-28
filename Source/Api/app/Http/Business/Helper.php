<?php

namespace App\Http\Business;

use App\Helper\_ApiCode;
use App\Models\Device_token;
use LaravelFCM\Facades\FCM;
use LaravelFCM\Message\Exceptions\InvalidOptionsException;
use LaravelFCM\Message\OptionsBuilder;
use LaravelFCM\Message\PayloadDataBuilder;
use LaravelFCM\Message\PayloadNotificationBuilder;

class Helper {
    public static function sendFCMMessage($data){
        try {
            $optionBuilder = new OptionsBuilder();
            $optionBuilder->setTimeToLive(60 * 20);
            $notificationBuilder = new PayloadNotificationBuilder($data['title']);
            $notificationBuilder->setBody($data['message'])
                ->setSound('default');
            $dataBuilder = new PayloadDataBuilder();
            $dataBuilder->addData(['url' => $data['url'],'cate'=>$data['cate'],'code'=>$data['code']]);
            $option = $optionBuilder->build();
            $notification = $notificationBuilder->build();
            $data = $dataBuilder->build();
            $lstToken = Device_token::where('token_user', \Auth::user()->user_id)
                ->pluck('token_value')->toArray();
            if ($lstToken && count($lstToken) > 0) {
                $downstreamResponse = FCM::sendTo($lstToken, $option, $notification, $data);//delete token expire
                Device_token::whereIn('token_value', $downstreamResponse->tokensToDelete())->delete();
            }
        } catch (InvalidOptionsException $e) {
            //log exception
            activity()->withProperties(['action' => 'sendFCMMessage'])
                ->log("line ".$e->getLine()." file ".$e->getFile() ."\n".$e->getMessage());
            \Log::error($e->getMessage(),$e->getTrace());
            return _ApiCode::SUCCESS;
        }
    }
}