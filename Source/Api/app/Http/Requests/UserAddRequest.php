<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserAddRequest extends FormRequest
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
            'txtName' => 'required|unique:user,user_name',
            'txtPhone' => 'required',
            'txtPassword' => 'required|confirmed|min:6'
        ];
    }

    public function messages()
    {
        return [
            'txtName.unique' => 'Username existed',
            'txtName.required' => 'Username not empty',
            'txtPhone.required' => 'Phone not empty',
            'txtPassword.required' => 'Password not empty',
            'txtPassword.min' => 'Password at least 6 characters',
            'txtPassword.confirmed' => 'Confirm password not valid',
            'txtPassword_confirmation.required' => 'Confirm password not empty',
            'txtPassword_confirmation.min' => 'Password at least 6 characters',
        ];
    }
}
