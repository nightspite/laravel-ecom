<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    // Views 
    public function index() {
      $cart = Cart::where('user_id', auth()->id())
        ->where('status', 'pending')
        ->with('cartProduct.product')
        ->first();

      return Inertia::render('Cart/Index', [
        'cart' => $cart,
      ]);
    }

    // Actions
    public function add(Product $product) {
        // find cart in the db
        $cart = Cart::where('user_id', auth()->id())->where('status', 'pending')->first();
        // if cart doesn't exist, create it
        if (!$cart) {
            $cart = new Cart();
            $cart->user_id = auth()->id();
            $cart->save();
        }

        $cartProduct = $cart->cartProduct()->where('product_id', $product->id)->first();

        if ($cartProduct) {
            $cartProduct->increment('quantity');
            return redirect('/cart');
        }

        $cart->cartProduct()->create([
            'product_id' => $product->id,
            'quantity' => 1,
        ]);
        
        return redirect('/cart');
    }

    public function addQuantity(Product $product) {
      $cart = Cart::where('user_id', auth()->id())->where('status', 'pending')->first();

      $cart->cartProduct()->where('product_id', $product->id)->increment('quantity');

      return redirect('/cart');
    }

    public function removeQuantity(Product $product) {
      $cart = Cart::where('user_id', auth()->id())->where('status', 'pending')->first();

      $cartProduct = $cart->cartProduct()->where('product_id', $product->id)->first();

      if ($cartProduct->quantity === 1) {
        $cartProduct->delete();
        return redirect('/cart');
      }

      $cart->cartProduct()->where('product_id', $product->id)->decrement('quantity');

      return redirect('/cart');
    }

    public function remove(Product $product) {
      $cart = Cart::where('user_id', auth()->id())->where('status', 'pending')->first();

      $cart->cartProduct()->where('product_id', $product->id)->delete();

      return redirect('/cart');
    }

    public function clear() {
      $cart = Cart::where('user_id', auth()->id())->where('status', 'pending')->first();

      $cart->cartProduct()->delete();

      return redirect('/cart');
    }
}
