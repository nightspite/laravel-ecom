<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    // ADMIN
    // Views
    public function index()
    {
        return Inertia::render('Admin/Orders/Index', [
            'orders' => Order::with('orderProduct.product')
              ->with('user')
              ->get(),
        ]);
    }
    public function show(Order $order)
    {
        return Inertia::render('Admin/Orders/Show', [
            'order' => $order->with('orderProduct.product')->with('user')->first(),
        ]);
    }

    // USER
    // Views
    public function user_index()
    {
        return Inertia::render('Orders/Index', [
            'orders' => Order::where('user_id', auth()->id())
              ->with('orderProduct.product')
              ->with('user')
              ->get(),
        ]);
    }

    public function user_show(Order $order)
    {
      $user = auth()->user();
      if ($order->user_id !== $user->id) {
        return redirect('/unauthorized');
      }

      return Inertia::render('Orders/Show', [
          'order' => $order->with('orderProduct.product')->with('user')->first(),
      ]);
    }

    // Actions
    public function store()
    {
        $cart = Cart::where('user_id', auth()->id())->with('cartProduct.product')->first();
        $user = auth()->user();
        if ($cart->user_id !== $user->id) {
          return redirect('/unauthorized');
        }

        $cartProducts = $cart->cartProduct;

        $order = Order::create([
          'user_id' => $user->id,
        ]);
        $order->orderProduct()->createMany($cartProducts->toArray());
        $cart->cartProduct()->delete();

        return redirect('/orders/' . $order->id);
    }

    public function pay(Order $order)
    {
      $user = auth()->user();
      if ($order->user_id !== $user->id) {
        return redirect('/unauthorized');
      }

      $order->update([
        'completed_at' => now(),
      ]);

      return redirect('/orders/' . $order->id);
    }

}
