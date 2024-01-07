<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\ProductCreateRequest;
use App\Http\Requests\ProductUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    // ADMIN
    // Views
    public function index()
    {
        return Inertia::render('Admin/Products/Index', [
            'products' => Product::all(),
        ]);
    }

    public function create(Request $request)
    {
      return Inertia::render('Admin/Products/Create');
    }

    public function edit(Product $product)
    {
      return Inertia::render('Admin/Products/Edit', [
        'product'=> $product,
        ]);
    }

    // Actions
    public function store(ProductCreateRequest $request)
    {
        $product = new Product($request->validated());
        // $product->user_id = Auth::id();
        $product->save();

        return Redirect::route('admin_products.index');
    }

    public function update(ProductUpdateRequest $request, Product $product)
    {
        $product->fill($request->validated());
        $product->save();

        return Redirect::route('admin_products.index');
    }

    public function destroy(Product $product)
    {
      $product->delete();
      return Redirect::route('admin_products.index');
    }

    // USER
    // Views
    public function public_show(Product $product)
    {
        return Inertia::render('Products/Show', [
            'product' => $product,
        ]);
    }

    public function public_index()
    {
        return Inertia::render('Products/Index', [
            'products' => Product::all(),
        ]);
    }
}
