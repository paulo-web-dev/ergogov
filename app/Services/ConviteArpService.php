<?php
namespace App\Services;

use App\Models\ColaboradorArp;
use App\Models\ConviteArp;
use App\Models\LogEnvioArp;
use App\Jobs\EnviarConviteArpJob;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ConviteArpService
{
    /**
     * Cria colaboradores em lote a partir de texto colado.
     * Aceita formatos:
     *   "Nome email@exemplo.com" (linha por linha)
     *   "email@exemplo.com" (só email)
     *   CSV: nome,email,cargo,setor
     */
    public function importarEmLote(int $idEmpresa, string $texto): array
    {
        $linhas  = preg_split('/\r?\n/', trim($texto));
        $criados = 0;
        $erros   = [];

        foreach ($linhas as $i => $linha) {
            $linha = trim($linha);
            if (empty($linha)) continue;

            // Tenta detectar CSV (tem vírgulas)
            if (str_contains($linha, ',')) {
                $partes = array_map('trim', explode(',', $linha));
                $nome   = $partes[0] ?? null;
                $email  = $partes[1] ?? null;
                $cargo  = $partes[2] ?? null;
                $setor  = $partes[3] ?? null;
            } else {
                // Separado por espaço: "João Silva joao@email.com"
                preg_match('/([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/', $linha, $m);
                if (empty($m[0])) { $erros[] = "Linha " . ($i+1) . ": e-mail não encontrado"; continue; }
                $email = $m[0];
                $nome  = trim(str_replace($email, '', $linha)) ?: null;
                $cargo = null;
                $setor = null;
            }

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $erros[] = "Linha " . ($i+1) . ": e-mail inválido ($email)";
                continue;
            }

            // Upsert — não duplica por e-mail na mesma empresa
            ColaboradorArp::firstOrCreate(
                ['id_empresa' => $idEmpresa, 'email' => strtolower($email)],
                ['nome' => $nome ?? $email, 'cargo' => $cargo, 'setor' => $setor, 'status' => 'ativo']
            );
            $criados++;
        }

        return ['criados' => $criados, 'erros' => $erros];
    }

    /**
     * Cria convites para colaboradores sem convite ativo.
     * Retorna número de convites criados.
     */
    public function criarConvites(int $idEmpresa, ?int $diasExpiracao = 30): int
    {
        $colaboradores = ColaboradorArp::where('id_empresa', $idEmpresa)
            ->where('status', 'ativo')
            ->whereDoesntHave('convites', fn($q) => $q->whereIn('status', ['enviado','pendente','respondido']))
            ->get();

        $criados = 0;
        foreach ($colaboradores as $c) {
            ConviteArp::create([
                'id_empresa'    => $idEmpresa,
                'id_colaborador'=> $c->id,
                'token'         => ConviteArp::gerarToken(),
                'status'        => 'pendente',
                'expira_em'     => $diasExpiracao ? now()->addDays($diasExpiracao) : null,
            ]);
            $criados++;
        }

        return $criados;
    }

    /**
     * Dispara envio em massa via fila.
     */
    public function dispararEnvioMassa(int $idEmpresa): int
    {
        $convites = ConviteArp::where('id_empresa', $idEmpresa)
            ->whereIn('status', ['pendente','enviado'])
            ->with('colaborador')
            ->get();

        $disparados = 0;
        foreach ($convites as $convite) {
            EnviarConviteArpJob::dispatch($convite);
            $disparados++;
        }

        return $disparados;
    }

    /**
     * Reenvio apenas para pendentes.
     */
    public function reenviarPendentes(int $idEmpresa): int
    {
        $pendentes = ConviteArp::where('id_empresa', $idEmpresa)
            ->where('status', '!=', 'respondido')
            ->where(fn($q) => $q->whereNull('expira_em')->orWhere('expira_em', '>', now()))
            ->with('colaborador')
            ->get();

        $reenviados = 0;
        foreach ($pendentes as $convite) {
            EnviarConviteArpJob::dispatch($convite, true);
            $reenviados++;
        }

        return $reenviados;
    }

    /**
     * Marca convite como respondido ao receber o formulário.
     */
    public function marcarRespondido(ConviteArp $convite): void
    {
        $convite->update([
            'status'        => 'respondido',
            'respondido_em' => now(),
        ]);
    }

    /**
     * KPIs do dashboard.
     */
    public function kpis(int $idEmpresa): array
    {
        $colaboradores = ColaboradorArp::where('id_empresa', $idEmpresa)->where('status', 'ativo')->count();
        $convidados    = ConviteArp::where('id_empresa', $idEmpresa)->count();
        $respondidos   = ConviteArp::where('id_empresa', $idEmpresa)->where('status', 'respondido')->count();
        $pendentes     = ConviteArp::where('id_empresa', $idEmpresa)->whereIn('status', ['pendente','enviado'])->count();
        $taxa          = $convidados > 0 ? round(($respondidos / $convidados) * 100) : 0;

        return compact('colaboradores', 'convidados', 'respondidos', 'pendentes', 'taxa');
    }
}
