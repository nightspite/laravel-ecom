<?php

namespace App\Http\Controllers;

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
            'orders' => Order::all(),
        ]);
    }

    // USER
    // Views
    public function public_show(Order $order)
    {
        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
    }

    public function public_index()
    {
        return Inertia::render('Orders/Index', [
            'orders' => Order::all(),
        ]);
    }
}
