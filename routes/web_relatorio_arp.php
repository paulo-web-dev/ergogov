<?php
// Sua rota relatorio.arp continua a mesma — só confirme que está assim
// (o controller agora recebe Request automaticamente):

use App\Http\Controllers\RelatorioArpController;

Route::get('/empresa/{id}/relatorio/arp', [RelatorioArpController::class, 'gerar'])
    ->name('relatorio.arp');
