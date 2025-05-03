<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use App\Models\Kategori;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class Home extends Controller
{
    public function index(){
        return view ('admin.dashboard');
    }
}