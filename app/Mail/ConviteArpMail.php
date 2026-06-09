<?php
namespace App\Mail;

use App\Models\ConviteArp;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ConviteArpMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $linkPesquisa;
    public string $nomeColaborador;
    public string $nomeEmpresa;

    public function __construct(public ConviteArp $convite, public bool $isReenvio = false)
    {
        $this->nomeColaborador = $convite->colaborador->nome ?? 'Colaborador';
        $this->nomeEmpresa     = $convite->empresa->nome ?? '';
        $this->linkPesquisa    = $convite->urlFormulario();
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Pesquisa de Avaliação Comportamental' . ($this->isReenvio ? ' — Lembrete' : ''),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.convite_arp',
        );
    }
}
