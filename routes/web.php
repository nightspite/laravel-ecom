<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CartController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect("/","/products");

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/unauthorized', function () {
    return Inertia::render('Unauthorized');
})->name('unauthorized');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('admin')->prefix('admin')->name('admin_')->group(function () {
      Route::controller(ProductController::class)->prefix('/products')->name('products.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::get('/edit/{product}', 'edit')->name('edit');

        Route::post('/store', 'store')->name('store');
        Route::patch('/update/{product}', 'update')->name('update');
        Route::delete('/destroy/{product}', 'destroy')->name('destroy');
      });

      Route::controller(OrderController::class)->prefix('/orders')->name('orders.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/{order}', 'show')->name('show');
      });
    });


    Route::controller(CartController::class)->prefix('/cart')->name('cart.')->group(function () {
      Route::get('/', 'index')->name('index');

      Route::post('/add/{product}', 'add')->name('add');
      Route::delete('/remove/{product}', 'remove')->name('remove');
      Route::delete('/clear', 'clear')->name('clear');
      Route::post('/add-quantity/{product}', 'addQuantity')->name('addQuantity');
      Route::post('/remove-quantity/{product}', 'removeQuantity')->name('removeQuantity');
    });

    Route::controller(OrderController::class)->prefix('/orders')->name('orders.')->group(function () {
      Route::get('/', 'user_index')->name('index');
      Route::get('/{order}', 'user_show')->name('show');

      Route::post('/store', 'store')->name('store');
      Route::post('/pay/{order}', 'pay')->name('pay');
    });
});

Route::controller(ProductController::class)->prefix('/products')->name('products.')->group(function () {
  Route::get('/', 'public_index')->name('index');
  Route::get('/{product}', 'public_show')->name('show');
});

require __DIR__.'/auth.php';
