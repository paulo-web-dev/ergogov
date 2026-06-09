<?php
use App\Http\Controllers\ColaboradorArpController;
use App\Http\Controllers\ArpConviteController;
use Illuminate\Support\Facades\Route;

// ── Formulário público via token (sem auth) ──────────────────────────────────
Route::get('/pesquisa/arp/{token}',         [ArpConviteController::class, 'formToken'])->name('form-arp-token');
Route::post('/pesquisa/arp/responder',      [ArpConviteController::class, 'cadFormToken'])->name('cad-form-arp-token');

// ── Rotas autenticadas — Gestão de colaboradores ─────────────────────────────
Route::middleware('auth')->group(function () {

    // Dashboard de colaboradores da empresa
    Route::get('/empresa/{id}/arp/colaboradores',
        [ColaboradorArpController::class, 'index'])->name('arp.colaboradores.index');

    // Cadastro individual
    Route::get('/empresa/{id}/arp/colaboradores/novo',
        [ColaboradorArpController::class, 'create'])->name('arp.colaboradores.create');
    Route::post('/empresa/{id}/arp/colaboradores',
        [ColaboradorArpController::class, 'store'])->name('arp.colaboradores.store');

    // Importação em lote
    Route::post('/empresa/{id}/arp/colaboradores/importar',
        [ColaboradorArpController::class, 'importarLote'])->name('arp.colaboradores.importar');

    // Ações em colaborador individual
    Route::patch('/arp/colaboradores/{id}/status',
        [ColaboradorArpController::class, 'toggleStatus'])->name('arp.colaboradores.status');
    Route::delete('/arp/colaboradores/{id}',
        [ColaboradorArpController::class, 'destroy'])->name('arp.colaboradores.destroy');

    // Link individual de convite
    Route::get('/arp/colaboradores/{id}/link',
        [ColaboradorArpController::class, 'linkConvite'])->name('arp.colaboradores.link');

    // Ações em massa
    Route::post('/empresa/{id}/arp/convites/criar',
        [ColaboradorArpController::class, 'criarConvites'])->name('arp.convites.criar');
    Route::post('/empresa/{id}/arp/convites/disparar',
        [ColaboradorArpController::class, 'dispararEmails'])->name('arp.convites.disparar');
    Route::post('/empresa/{id}/arp/convites/reenviar',
        [ColaboradorArpController::class, 'reenviarPendentes'])->name('arp.convites.reenviar');
});
