<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

try {
    \Illuminate\Support\Facades\Mail::raw('Teste ergo.gov', function($m) {
        $m->to('pauloorfanelli@gmail.com')->subject('Teste SMTP');
    });
    echo "SUCESSO! E-mail enviado.\n";
} catch (\Exception $e) {
    echo "ERRO: " . $e->getMessage() . "\n";
}