<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ConviteArp extends Model
{
    use HasFactory;

    protected $table = 'convites_arp';

    protected $fillable = [
        'id_empresa', 'id_colaborador', 'token',
        'status', 'enviado_em', 'respondido_em',
        'expira_em', 'tentativas_envio',
    ];

    protected $casts = [
        'enviado_em'    => 'datetime',
        'respondido_em' => 'datetime',
        'expira_em'     => 'datetime',
    ];

    public function colaborador()
    {
        return $this->belongsTo(ColaboradorArp::class, 'id_colaborador', 'id');
    }

    public function empresa()
    {
        return $this->belongsTo(Empresas::class, 'id_empresa', 'id');
    }

    public function logs()
    {
        return $this->hasMany(LogEnvioArp::class, 'id_convite', 'id');
    }

    /** Gera token único seguro */
    public static function gerarToken(): string
    {
        return hash('sha256', Str::random(40) . microtime());
    }

    /** URL pública do formulário com token */
    public function urlFormulario(): string
    {
        return route('form-arp-token', ['token' => $this->token]);
    }

    public function estaExpirado(): bool
    {
        return $this->expira_em && $this->expira_em->isPast();
    }

    public function pendente(): bool
    {
        return in_array($this->status, ['pendente', 'enviado']);
    }
}
