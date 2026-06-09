<?php
// Adicione esta linha ao seu routes/web.php (dentro do grupo auth):

Route::post('/arp/colaboradores/{id}/enviar',
    [ColaboradorArpController::class, 'enviarIndividual'])->name('arp.colaboradores.enviar');
