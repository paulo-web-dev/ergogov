<?php
// Adicione ao seu routes/web.php (dentro do grupo auth):
use App\Http\Controllers\RelatorioArpController;

Route::get('/empresa/{id}/relatorio/arp', [RelatorioArpController::class, 'gerar'])
    ->name('relatorio.arp');
