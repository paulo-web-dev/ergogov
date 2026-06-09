<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColaboradorArp extends Model
{
    use HasFactory;

    protected $table = 'colaboradores_arp';

    protected $fillable = [
        'id_empresa', 'nome', 'email', 'cargo', 'setor', 'status',
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresas::class, 'id_empresa', 'id');
    }

    public function convites()
    {
        return $this->hasMany(ConviteArp::class, 'id_colaborador', 'id');
    }

    /** Convite mais recente para esta empresa */
    public function conviteAtivo()
    {
        return $this->hasOne(ConviteArp::class, 'id_colaborador', 'id')
            ->orderByDesc('created_at');
    }

    /** Verifica se já respondeu a pesquisa */
    public function jaRespondeu(): bool
    {
        return $this->convites()
            ->where('status', 'respondido')
            ->exists();
    }
}
