<?php

namespace App\Services;

use App\Models\ResultadoRespostaArp;
use App\Models\QuestionarioPerguntaArp;
use Illuminate\Support\Collection;

class ArpCalculationService
{
    /**
     * Pesos não-lineares por resposta Likert (1 a 5).
     * Respostas frequentes pesam muito mais para distorcer o radar
     * na direção do risco real.
     *
     * 1 = Nunca/quase nunca → 0.0  (sem contribuição)
     * 2 = Raramente         → 0.5
     * 3 = Às vezes          → 1.5
     * 4 = Frequente         → 2.5
     * 5 = Muito frequente   → 4.0
     */
    private const PESOS = [
        1 => 0.0,
        2 => 0.5,
        3 => 1.5,
        4 => 2.5,
        5 => 4.0,
    ];

    /**
     * Classificação de risco baseada na planilha original (MATRIZ):
     * Extremo:       17–20
     * Elevado:       13–16
     * Moderado:       9–12
     * Baixo:          5–8
     * Insignificante: 0–4
     *
     * Aqui normalizamos para escala 0–20 por categoria
     * (max_peso=4.0 × num_perguntas, reescalado para 20).
     */
    private const NIVEIS = [
        ['min' => 17, 'max' => 20, 'label' => 'Extremo',        'codigo' => 'PR1', 'cor' => '#FF2D55'],
        ['min' => 13, 'max' => 16, 'label' => 'Elevado',        'codigo' => 'PR2', 'cor' => '#FF6B00'],
        ['min' =>  9, 'max' => 12, 'label' => 'Moderado',       'codigo' => 'PR3', 'cor' => '#FFD60A'],
        ['min' =>  5, 'max' =>  8, 'label' => 'Baixo',          'codigo' => 'PR4', 'cor' => '#30D158'],
        ['min' =>  0, 'max' =>  4, 'label' => 'Insignificante', 'codigo' => 'NA',  'cor' => '#636366'],
    ];

    /**
     * Recomendações por categoria (extraídas da planilha MATRIZ).
     */
    private const RECOMENDACOES = [
        'Funções e expectativas'                        => 'Definir funções de trabalho, relações de supervisão e requisitos de desempenho para minimizar confusões e equívocos. Facilitar o desenvolvimento de competências e atribuir tarefas a trabalhadores com conhecimentos e aptidões adequados.',
        'Controle de trabalho ou autonomia'             => 'Aumentar o controle dos trabalhadores sobre como atuam, introduzindo trabalho flexível, compartilhamento de trabalho e mais consulta sobre práticas de trabalho.',
        'Demandas de trabalho'                          => 'Priorizar tarefas e permitir prazos flexíveis. Proporcionar maior acesso ao apoio social e limitar o trabalho remoto ou isolado quando apropriado.',
        'Gestão de mudança organizacional'              => 'Consultar os trabalhadores e seus representantes sobre mudanças no local de trabalho e como estas podem afetá-los. Fornecer supervisão eficaz e orientação durante transições.',
        'Trabalho e ritmo de trabalho'                  => 'Fornecer suporte prático durante picos de carga (trabalhadores adicionais). Permitir pausas e restringir contato relacionado ao trabalho nos períodos de folga.',
        'Horários de trabalho e cronograma'             => 'Priorizar tarefas e permitir prazos flexíveis. Reduzir exigências de horas extras imprevistas e comunicar mudanças com antecedência.',
        'Segurança sobre desemprego e trabalhos precários' => 'Desenvolver políticas claras de cargos, salários e benefícios. Garantir conformidade com as leis trabalhistas.',
        'Ambiente de trabalho, equipamentos e tarefas perigosas' => 'Adequar espaço, iluminação, temperatura e equipamentos. Exigir uso de EPIs e realizar manutenção preventiva regularmente.',
        'Relações interpessoais'                        => 'Promover práticas de trabalho em equipe e relações hierárquicas saudáveis. Criar canais formais de comunicação e mediação de conflitos.',
        'Liderança'                                     => 'Fornecer informações e treinamentos para líderes sobre condutas e práticas adequadas. Estabelecer canais para reclamações e sugestões.',
        'Cultura organizacional'                        => 'Desenvolver políticas que descrevam expectativas de comportamento e como condutas inaceitáveis serão gerenciadas. Integrar programas de saúde e segurança.',
        'Reconhecimento e recompensa'                   => 'Implementar programas formais de reconhecimento. Garantir feedback construtivo e regular sobre o desempenho dos colaboradores.',
        'Apoio e suporte'                               => 'Garantir acesso ágil a serviços de suporte (TI, manutenção). Promover treinamentos e disponibilizar informações necessárias ao desempenho.',
        'Supervisão / Gerência'                         => 'Promover feedback construtivo e avaliações periódicas. Assegurar transparência e justiça nas decisões gerenciais.',
        'Civilidade e respeito'                         => 'Fomentar cultura de respeito mútuo. Estabelecer política de tolerância zero a comportamentos desrespeitosos.',
        'Equilíbrio Trabalho / Vida'                    => 'Implementar políticas de desconexão digital. Monitorar carga de trabalho para evitar interferência na vida pessoal e no descanso.',
        'Violência no trabalho / Assédio'               => 'Implementar política de tolerância zero a qualquer forma de assédio e violência. Criar canal de denúncias sigiloso e realizar treinamentos de prevenção.',
    ];

    /**
     * Ponto de entrada principal: processa todos os resultados de uma empresa.
     */
    public function processar(int $idEmpresa): array
    {
        $resultados = ResultadoRespostaArp::where('id_empresa', $idEmpresa)
            ->with(['pergunta.categoria.categoria', 'resposta', 'funcionario'])
            ->get();

        if ($resultados->isEmpty()) {
            return $this->emptyResult();
        }

        // Agrupa por respondente para calcular participantes únicos
        $participantes = $resultados->pluck('id_func')->unique()->count();

        // Agrupa por categoria
        $porCategoria = [];
        foreach ($resultados as $r) {
            if (!$r->resposta) continue;

            $categoria  = $r->pergunta->categoria->categoria->nome
                       ?? $r->pergunta->categoria->nome
                       ?? 'Sem categoria';

            // Extrai valor numérico da resposta (1–5)
            preg_match('/^\d+/', $r->resposta->resposta ?? '', $m);
            $valor = isset($m[0]) ? (int)$m[0] : null;

            if ($valor === null || $valor < 1 || $valor > 5) continue;

            $porCategoria[$categoria][] = $valor;
        }

        // Calcula score por categoria
        $categorias = [];
        foreach ($porCategoria as $nome => $valores) {
            $score     = $this->calcularScore($valores);
            $nivel     = $this->classificar($score);
            $categorias[] = [
                'nome'          => $nome,
                'score'         => round($score, 2),
                'score_pct'     => round(($score / 20) * 100, 1),
                'nivel'         => $nivel['label'],
                'codigo'        => $nivel['codigo'],
                'cor'           => $nivel['cor'],
                'respondentes'  => count($valores),
                'recomendacao'  => self::RECOMENDACOES[$nome] ?? 'Monitorar e revisar periodicamente.',
            ];
        }

        // Ordena por score desc
        usort($categorias, fn($a, $b) => $b['score'] <=> $a['score']);

        $maiorRisco    = $categorias[0] ?? null;
        $scoreGeral    = count($categorias) > 0
            ? round(array_sum(array_column($categorias, 'score')) / count($categorias), 2)
            : 0;
        $nivelGeral    = $this->classificar($scoreGeral);

        // Distribuição por faixa de risco (contagem de categorias)
        $distribuicao = ['Extremo' => 0, 'Elevado' => 0, 'Moderado' => 0, 'Baixo' => 0, 'Insignificante' => 0];
        foreach ($categorias as $c) {
            $distribuicao[$c['nivel']] = ($distribuicao[$c['nivel']] ?? 0) + 1;
        }

        return [
            'categorias'    => $categorias,
            'participantes' => $participantes,
            'maior_risco'   => $maiorRisco,
            'score_geral'   => $scoreGeral,
            'nivel_geral'   => $nivelGeral,
            'distribuicao'  => $distribuicao,
            'radar_labels'  => array_column($categorias, 'nome'),
            'radar_scores'  => array_column($categorias, 'score_pct'),
            'radar_cores'   => array_column($categorias, 'cor'),
        ];
    }

    /**
     * Calcula score ponderado de uma lista de respostas Likert.
     * Resultado normalizado para escala 0–20.
     */
    private function calcularScore(array $valores): float
    {
        if (empty($valores)) return 0;

        $soma = 0;
        foreach ($valores as $v) {
            $soma += self::PESOS[$v] ?? 0;
        }

        // Média ponderada
        $media = $soma / count($valores);

        // Normaliza para 0–20 (peso máximo = 4.0 → score 20)
        return ($media / 4.0) * 20;
    }

    /**
     * Classifica score numérico (0–20) em nível de risco.
     */
    public function classificar(float $score): array
    {
        foreach (self::NIVEIS as $nivel) {
            if ($score >= $nivel['min'] && $score <= $nivel['max']) {
                return $nivel;
            }
        }
        return self::NIVEIS[4]; // Insignificante como fallback
    }

    private function emptyResult(): array
    {
        return [
            'categorias'    => [],
            'participantes' => 0,
            'maior_risco'   => null,
            'score_geral'   => 0,
            'nivel_geral'   => self::NIVEIS[4],
            'distribuicao'  => ['Extremo' => 0, 'Elevado' => 0, 'Moderado' => 0, 'Baixo' => 0, 'Insignificante' => 0],
            'radar_labels'  => [],
            'radar_scores'  => [],
            'radar_cores'   => [],
        ];
    }
}
