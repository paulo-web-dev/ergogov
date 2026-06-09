<?php
namespace App\Jobs;

use App\Mail\ConviteArpMail;
use App\Models\ConviteArp;
use App\Models\LogEnvioArp;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Throwable;

class EnviarConviteArpJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries   = 3;
    public int $timeout = 60;

    public function __construct(
        public ConviteArp $convite,
        public bool $isReenvio = false
    ) {}

    public function handle(): void
    {
        $email = $this->convite->colaborador?->email;

        if (!$email) return;

        Mail::to($email)->send(new ConviteArpMail($this->convite, $this->isReenvio));

        $this->convite->update([
            'status'           => 'enviado',
            'enviado_em'       => now(),
            'tentativas_envio' => $this->convite->tentativas_envio + 1,
        ]);

        LogEnvioArp::create([
            'id_convite' => $this->convite->id,
            'tipo'       => $this->isReenvio ? 'reenvio' : 'envio',
            'mensagem'   => "Enviado para $email em " . now()->format('d/m/Y H:i'),
        ]);
    }

    public function failed(Throwable $e): void
    {
        LogEnvioArp::create([
            'id_convite' => $this->convite->id,
            'tipo'       => 'erro',
            'mensagem'   => $e->getMessage(),
        ]);
    }
}
