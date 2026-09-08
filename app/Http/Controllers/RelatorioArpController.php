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
                'metodologia',
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
 
        // ── Textos livres (campos HTML do cadastro) → parágrafos limpos ───────
        // Resolve o "&nbsp;" literal e as frases coladas ("trabalho.A Ergonomia")
        // que apareciam quando o campo passava por strip_tags direto no blade.
        $textos = [
            'introducao'  => $this->htmlParaParagrafos($empresa->introducao?->introducao),
            'metodologia' => $this->htmlParaParagrafos($empresa->metodologia?->metodologia),
            'disposicao'  => $this->htmlParaParagrafos($empresa->disposicao?->disposicao),
        ];
 
        // Responsável legal pela empresa: usa responsavel_legal se a coluna existir,
        // senão cai no campo responsavel já existente.
        $responsavelLegal = $empresa->responsavel_legal ?? $empresa->responsavel;
 
        return view('arp.relatorio', compact(
            'empresa', 'identidade', 'dados', 'respondentes',
            'setores', 'setorAtual', 'dadosPorSetor', 'textos', 'responsavelLegal'
        ));
    }
 
    /**
     * Converte um campo HTML (editor rico) em uma lista de parágrafos de texto puro.
     * - decodifica entidades (&nbsp; etc.)
     * - transforma </p>, <br>, <li>, <div>, <h*> em quebras de linha
     * - remove as demais tags e espaços duplicados
     */
    private function htmlParaParagrafos(?string $html): array
    {
        if ($html === null || trim($html) === '') {
            return [];
        }
 
        $txt = html_entity_decode($html, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $txt = str_replace(["\u{00A0}", "\r"], [' ', ''], $txt);
 
        // Blocos → quebra de linha
        $txt = preg_replace('#<br\s*/?>#i', "\n", $txt);
        $txt = preg_replace('#</(p|div|li|h[1-6]|tr|blockquote)>#i', "\n", $txt);
        $txt = preg_replace('#<(p|div|li|h[1-6]|tr|blockquote)[^>]*>#i', '', $txt);
 
        $txt = strip_tags($txt);
 
        $paragrafos = [];
        foreach (preg_split("/\n+/", $txt) as $p) {
            $p = trim(preg_replace('/[ \t]+/', ' ', $p));
            if ($p !== '') {
                // Garante espaço após ponto final quando vier colado ("fim.Início")
                $p = preg_replace('/([a-záéíóúâêôãõç])\.([A-ZÁÉÍÓÚÂÊÔÃÕÇ])/u', '$1. $2', $p);
                $paragrafos[] = $p;
            }
        }
 
        return $paragrafos;
    }
}
