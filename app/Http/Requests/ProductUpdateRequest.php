<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            // 'image'=> ['image','mimes:jpeg,png,jpg,gif,svg','max:2048'],
            // 'image' => ['file', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'image' => ['nullable', 'string']
        ];
    }
}
