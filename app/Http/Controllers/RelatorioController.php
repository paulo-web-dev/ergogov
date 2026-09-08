<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empresas; 
use App\Models\Setores;
use App\Models\SubSetores;
use App\Models\Cargos;
use App\Models\DadosOrganizacionais;
use App\Models\Caracteristicas;
use App\Models\PreDiagnostico;
use App\Models\IdentidadeVisual;
use Auth;

class RelatorioController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
 
    public function gerarRelatorio($id)
    {
        $identidade = IdentidadeVisual::where('id_user', $id)->first();
 
        $alert = 0;
        if (!isset($identidade)) {
            $identidade = new IdentidadeVisual();
            $identidade->cor_principal = '#027dc3';
            $identidade->foto_empresa  = 'logo_plataforma_um%20(1).jpeg';
            $identidade->tipo          = 1;
            $alert = 1;
        }      
 
        // Eager load completo (inclui a árvore área → setor → posto) para não
        // disparar N+1 e para o blade poder decidir quebras de página com tudo em mãos.
        $empresa = Empresas::where('id', $id)
            ->with([
                'setores', 'introducao', 'equipe', 'objetivos', 'disposicao',
                'mapeamento', 'planodeacao', 'responsaveis', 'metodologia',
                'demanda', 'analise', 'rodape', 'cabecalho',
                'area.setores.subsetores.funcao',
                'area.setores.subsetores.tarefa',
                'area.setores.subsetores.analiseAtividade',
                'area.setores.subsetores.fotosatividade',
                'area.setores.subsetores.descricaoFotos',
                'area.setores.subsetores.dadosOrganizacionais',
                'area.setores.subsetores.populacaosubsetor',
                'area.setores.subsetores.dadossaude.segmentos',
                'area.setores.subsetores.caracteristicas',
                'area.setores.subsetores.preDiagnostico',
                'area.setores.subsetores.conclusoes',
                'area.setores.subsetores.conclusao',
                'area.setores.subsetores.recomendacao',
                'area.setores.subsetores.moore',
                'area.setores.subsetores.rula',
                'area.setores.subsetores.owas',
                'area.setores.subsetores.suerodgers',
                'area.setores.subsetores.ChecklistCadeira',
            ])
            ->firstOrFail();
 
        $meses = [
            1 => 'janeiro', 2 => 'fevereiro', 3 => 'março', 4 => 'abril',
            5 => 'maio', 6 => 'junho', 7 => 'julho', 8 => 'agosto',
            9 => 'setembro', 10 => 'outubro', 11 => 'novembro', 12 => 'dezembro',
        ];
 
        return view('relatorio', [
            'empresa'    => $empresa,
            'identidade' => $identidade,
            'alert'      => $alert,
            'dataExtenso' => sprintf('%s, %02d de %s de %d',
                $empresa->cidade ?: 'Jundiaí', (int) date('d'), $meses[(int) date('m')], (int) date('Y')),
        ]);
    }
 

    public function gerarRelatorioarp($id){

      
        $arp = ResultadoRespostaArp::where('id_empresa', $id)
        ->with('pergunta.categoria.categoria', 'resposta', 'funcionario')
        ->get();

    if ($arp->isNotEmpty()) {
        $categoriasGerais = [];
        $dadosPorSetor = [];
        $participantesGerais = [];

        foreach ($arp as $item) {
            // Pula o item se não houver funcionário ou resposta associada, para evitar erros.
            if (!$item->funcionario || !$item->resposta) {
                continue;
            }

            $categoria = $item->pergunta->categoria->categoria->nome ?? 'Sem categoria';
            $setor = $item->funcionario->setor ?? 'Sem setor definido';
            $idFuncionario = $item->funcionario->id;

            preg_match('/^\d+/', $item->resposta->resposta ?? '', $matches);
            $valor = isset($matches[0]) ? (int) $matches[0] : null;

            if ($valor !== null) {
                // 1. Agrupa os valores para o cálculo GERAL
                $categoriasGerais[$categoria][] = $valor;
                // Adiciona o ID do funcionário para contagem geral de participantes únicos
                $participantesGerais[$idFuncionario] = true;

                // 2. Agrupa os valores POR SETOR
                $dadosPorSetor[$setor]['valores'][$categoria][] = $valor;
                // Adiciona o ID do funcionário para contagem de participantes únicos POR SETOR
                $dadosPorSetor[$setor]['participantes'][$idFuncionario] = true;
            }
        }

        // Função auxiliar para calcular médias (evita repetição de código)
        $calcularMedias = function ($categorias) {
            $medias = [];
            foreach ($categorias as $categoria => $valores) {
                $media = count($valores) > 0 ? array_sum($valores) / count($valores) : 0;

                if ($media <= 1) {
                    $nivel = 'Leve';
                } elseif ($media <= 2) {
                    $nivel = 'Moderado';
                } elseif ($media <= 3) {
                    $nivel = 'Sério';
                } else {
                    $nivel = 'Severo';
                }

                $medias[] = [
                    'categoria' => $categoria,
                    'media' => $media,
                    'nivel' => $nivel,
                ];
            }
            return $medias;
        };

        // 3. Calcula as médias GERAIS
        $mediasGerais = $calcularMedias($categoriasGerais);
        $totalParticipantesGeral = count($participantesGerais);

        // 4. Calcula as médias para CADA SETOR
        $mediasPorSetor = [];
        foreach ($dadosPorSetor as $setor => $dados) {
            $mediasPorSetor[$setor] = [
                'medias' => $calcularMedias($dados['valores']),
                'totalParticipantes' => count($dados['participantes']),
            ];
        }

    }else{
        $mediasGerais = [];
        $mediasPorSetor = [];
        $totalParticipantesGeral = 0;
    }

        function porcentagem($numero, $key){
            $porcentagem = ($numero/$key) * 100;

            return round($porcentagem);
        }
        $empresa = Empresas::where('id', $id)
        ->with('setores')
        ->with('populacao')
        ->with('introducao')
        ->with('equipe')
        ->with('objetivos')
        ->with('disposicao')
        ->with('mapeamento')
        ->with('planodeacao')
        ->with('responsaveis')
        ->with('area')
        ->with('rodape')
        ->with('cabecalho')
        ->first();

        return view('relatorioarp',[
          
            'empresa' => $empresa, 
            'mediasGerais' => $mediasGerais,
            'totalParticipantesGeral' => $totalParticipantesGeral,
            'mediasPorSetor' => $mediasPorSetor,
        ]);

    }
}
