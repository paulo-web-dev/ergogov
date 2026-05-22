<?php

namespace App\Http\Controllers;

use App\Models\Empresas;
use App\Models\IdentidadeVisual;
use App\Models\ResultadoRespostaArp;
use App\Services\ArpCalculationService;
use Auth;

class RelatorioArpController extends Controller
{
    public function __construct(private ArpCalculationService $arpService)
    {
        $this->middleware('auth');
    }

    public function gerar(int $id)
    {
        $empresa = Empresas::where('id', $id)
            ->with([
                'introducao', 'equipe', 'objetivos', 'disposicao',
                'responsaveis', 'cabecalho', 'rodape', 'populacao',
            ])
            ->firstOrFail();

        abort_unless($empresa->id_user == Auth::user()->id_instituicao, 403);

        // Identidade visual
        $identidade = IdentidadeVisual::where('id_user', $empresa->id)->first();
        if (!$identidade) {
            $identidade = new IdentidadeVisual();
            $identidade->cor_principal  = '#0F3D2A';
            $identidade->foto_empresa   = null;
        }

        // Dados ARP com pesos não-lineares
        $dados = $this->arpService->processar($id);

        // Respondentes por setor (para tabela detalhada)
        $respondentes = ResultadoRespostaArp::where('id_empresa', $id)
            ->with('funcionario')
            ->get()
            ->groupBy(fn($r) => $r->funcionario->setor ?? 'Não informado')
            ->map(fn($g) => $g->pluck('id_func')->unique()->count());

        return view('arp.relatorio', compact(
            'empresa', 'identidade', 'dados', 'respondentes'
        ));
    }
}
