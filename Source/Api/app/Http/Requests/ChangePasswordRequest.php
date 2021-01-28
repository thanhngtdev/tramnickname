<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChangePasswordRequest extends FormRequest
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
            'txtPassword' => 'required|confirmed|min:6',
            'txtPassword_confirmation' => 'required|min:6',
        ];
    }

    public function messages()
    {
        return [
            'txtPassword.required' => 'Nhập mật khẩu',
            'txtPassword.min' => 'Mật khẩu tối thiểu 6 kí tự',
            'txtPassword.confirmed' => 'Xác nhận mật khẩu không khớp',
            'txtPassword_confirmation.required' => 'Nhập lại mật khẩu',
            'txtPassword_confirmation.min' => 'Mật khẩu tối thiểu 6 kí tự',
        ];
    }
}
