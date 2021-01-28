<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserResetPassRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required',
            'code' => 'required',
            'password' => 'required|confirmed|min:6'
        ];
    }

    public function messages()
    {
        return [
            'email.required' => 'Địa chỉ email không được để trống',
            'code.required' => 'Mã xác nhận không được để trống',
            'password.required' => 'Mật khẩu không được để trống',
            'password.min' => 'Mật khẩu tối thiểu 6 kí tự',
            'password.confirmed' => 'Xác nhận mật khẩu không khớp',
            'password_confirmation.required' => 'Nhập lại mật khẩu',
            'password_confirmation.min' => 'Mật khẩu tối thiểu 6 kí tự',
        ];
    }
}
