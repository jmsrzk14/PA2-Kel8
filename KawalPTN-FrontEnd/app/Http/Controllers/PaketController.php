<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PaketController extends Controller
{
    public function orderPaket(Request $request)
    {
        $orderId = uniqid();
        $amount = $request->input('amount');

        $response = Http::post('http://localhost:5000/api/checkout', [
            'order_id' => $orderId,
            'amount' => $amount
        ]);

        if ($response->successful()) {
            return response()->json(['token' => $response['token']]);
        } else {
            return response()->json(['message' => 'Gagal membuat transaksi'], 500);
        }
    }
}
