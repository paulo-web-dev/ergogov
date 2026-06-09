<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LogEnvioArp extends Model
{
    public $timestamps = false;

    protected $table = 'logs_envio_arp';

    protected $fillable = ['id_convite', 'tipo', 'mensagem', 'criado_em'];

    protected $casts = ['criado_em' => 'datetime'];

    public function convite()
    {
        return $this->belongsTo(ConviteArp::class, 'id_convite', 'id');
    }
}
