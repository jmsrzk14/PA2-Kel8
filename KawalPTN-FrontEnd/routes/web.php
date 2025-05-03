<?php

use Illuminate\Support\Facades\Route;
use PhpParser\Node\Name;
use App\Controllers\Home;

Route::get('/', 'App\Http\Controllers\Home@index');

