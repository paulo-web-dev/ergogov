<?php

// ── Cole estas rotas no seu routes/web.php (dentro do grupo auth) ─────────────

use App\Http\Controllers\ArpDashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/empresa/{id}/arp/dashboard',  [ArpDashboardController::class, 'dashboard'])->name('arp.dashboard');
    Route::get('/empresa/{id}/arp/dados-json', [ArpDashboardController::class, 'dadosJson'])->name('arp.dados-json');
});
