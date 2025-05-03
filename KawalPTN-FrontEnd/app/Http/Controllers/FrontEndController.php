<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FrontEndController extends Controller
{
    public function home()
    {
        return view('student.home');
    }

    public function order()
    {
        return view('student.orderPaket');
    }

    public function homeAdmin()
    {
        return view('admin.dashboard');
    }
}
