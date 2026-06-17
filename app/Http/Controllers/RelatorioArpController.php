<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empresas;
use App\Models\IdentidadeVisual;
use App\Models\ResultadoRespostaArp;
use App\Services\ArpCalculationService;
use App\Models\ColaboradorArp;
use Auth;

class RelatorioArpController extends Controller
{
    public function __construct(private ArpCalculationService $arpService)
    {
        $this->middleware('auth');
    }

    public function gerar(Request $request, int $id)
    {
        $empresa = Empresas::where('id', $id)
            ->with([
                'introducao', 'equipe', 'objetivos', 'disposicao',
                'responsaveis', 'cabecalho', 'rodape', 'populacao',
            ])
            ->firstOrFail();
    
        abort_unless($empresa->id_user == Auth::user()->id_instituicao, 403);
    
        $identidade = IdentidadeVisual::where('id_user', $empresa->id)->first();
        if (!$identidade) {
            $identidade = new IdentidadeVisual();
            $identidade->cor_principal = '#0F3D2A';
            $identidade->foto_empresa  = null;
        }
    
        // Setor selecionado (null = relatório global)
        $setorAtual = $request->query('setor');
        $setores    = $this->arpService->setoresDisponiveis($id);
    
        // Dados filtrados por setor (ou globais)
        $dados = $this->arpService->processar($id, $setorAtual);
    
        // Respondentes por setor — filtra se um setor estiver selecionado
        $resultados = ResultadoRespostaArp::where('id_empresa', $id)
            ->with('funcionario')
            ->get();
    
        if ($setorAtual) {
            $resultados = $resultados->filter(
                fn($r) => ($r->funcionario->setor ?? 'Não informado') === $setorAtual
            );
        }
    
        // Colaboradores cadastrados desta empresa, indexados por e-mail.
        // cargo/descricao_cargo vivem em colaboradores_arp, não em
        // funcionario_questionario_arp — por isso o cruzamento por e-mail.
        $colaboradoresPorEmail = ColaboradorArp::where('id_empresa', $id)
            ->get()
            ->keyBy(fn($c) => strtolower(trim($c->email)));
    
        $respondentes = $resultados
            ->groupBy(fn($r) => $r->funcionario->setor ?? 'Não informado')
            ->map(function ($g) use ($colaboradoresPorEmail) {
                $primeiroFuncionario = $g->first()->funcionario;
                $emailNormalizado    = strtolower(trim($primeiroFuncionario->email ?? ''));
                $colaborador         = $colaboradoresPorEmail->get($emailNormalizado);
    
                return [
                    'qtd'             => $g->pluck('id_func')->unique()->count(),
                    'cargo'           => $colaborador->cargo ?? null,
                    'descricao_cargo' => $colaborador->descricao_cargo ?? null,
                ];
            });
    
        // ── Dados individuais por setor (apenas no relatório global) ──────────
        $dadosPorSetor = [];
        if (!$setorAtual && !empty($setores)) {
            foreach ($setores as $s) {
                $dadosPorSetor[$s] = $this->arpService->processar($id, $s);
            }
        }
    
        return view('arp.relatorio', compact(
            'empresa', 'identidade', 'dados', 'respondentes',
            'setores', 'setorAtual', 'dadosPorSetor'
        ));
    }
}
