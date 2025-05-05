<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FrontEndController;
use App\Http\Controllers\PaketController;
use Illuminate\Support\Facades\Route;

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

Route::get('/', [FrontEndController::class, 'home']);
Route::get('/order', [FrontEndController::class, 'order']);

Route::post('/orderPaket', [PaketController::class, 'orderPaket'])->name('checkout');

Route::get('/homeAdmin', [FrontEndController::class, 'homeAdmin'])->name('homeAdmin');

Route::get('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'register'])->name('register');
Route::post('/register', [AuthController::class, 'register']);