<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Relatório ARP — {{ $empresa->nome }}</title>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<style>
/* ═══════════════════════════════════════════════════════════
   RELATÓRIO ARP — ergo.gov
   Compatível com impressão e @media print
   ═══════════════════════════════════════════════════════════ */
:root {
  --verde:    #0F3D2A;
  --verde2:   #1F6B43;
  --verde3:   #2D8659;
  --verde4:   #5FB894;
  --verde5:   #DCEFE2;
  --ink:      #111827;
  --ink2:     #374151;
  --ink3:     #6B7280;
  --linha:    #E5E7EB;
  --branco:   #FFFFFF;
  --fundo:    #F9FAFB;
  --risk-ex:  #B91C1C;  --risk-ex-bg: #FEF2F2;
  --risk-el:  #C2410C;  --risk-el-bg: #FFF7ED;
  --risk-mo:  #B45309;  --risk-mo-bg: #FFFBEB;
  --risk-bx:  #15803D;  --risk-bx-bg: #F0FDF4;
  --risk-in:  #4B5563;  --risk-in-bg: #F9FAFB;
  --font:     'Outfit', Arial, sans-serif;
  --cor-principal: {{ $identidade->cor_principal ?? '#0F3D2A' }};
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body  { font-family: var(--font); color: var(--ink); background: var(--branco); font-size: 11pt; line-height: 1.6; }

/* ── Print btn (hidden on print) ── */
.print-bar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 999;
  background: var(--verde); color: #fff; padding: 10px 24px;
  display: flex; align-items: center; justify-content: space-between;
  font-size: 13px; font-weight: 500;
}
.print-bar button {
  background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3);
  color: #fff; padding: 6px 18px; border-radius: 6px; cursor: pointer;
  font-family: var(--font); font-size: 13px; font-weight: 600;
  transition: background 0.15s;
}
.print-bar button:hover { background: rgba(255,255,255,0.3); }

/* ── Page wrapper ── */
.relatorio { max-width: 800px; margin: 70px auto 48px; padding: 0 24px; }

/* ══════════════════════ CAPA ══════════════════════ */
.capa {
  min-height: 100vh;
  display: flex; flex-direction: column;
  justify-content: space-between;
  page-break-after: always;
  padding: 0;
  position: relative;
}
.capa-topo {
  background: var(--cor-principal);
  padding: 40px 48px 32px;
  color: #fff;
  display: flex; align-items: center; justify-content: space-between;
}
.capa-logo-empresa {
  max-height: 56px; max-width: 180px; object-fit: contain;
}
.capa-wordmark {
  font-size: 18px; font-weight: 800; letter-spacing: -0.02em; color: #fff;
}
.capa-wordmark span { color: var(--verde4); }
.capa-corpo {
  flex: 1;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 48px;
  text-align: center;
}
.capa-tag {
  display: inline-block;
  background: var(--verde5); color: var(--verde);
  font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  padding: 5px 16px; border-radius: 20px; margin-bottom: 24px;
}
.capa-titulo {
  font-size: 32px; font-weight: 800; letter-spacing: -0.02em;
  color: var(--ink); margin-bottom: 8px; line-height: 1.15;
}
.capa-subtitulo {
  font-size: 18px; font-weight: 500; color: var(--ink3); margin-bottom: 32px;
}
.capa-empresa-box {
  border: 2px solid var(--cor-principal);
  border-radius: 14px; padding: 20px 36px;
  margin-bottom: 28px; display: inline-block;
}
.capa-empresa-nome {
  font-size: 22px; font-weight: 700; color: var(--cor-principal);
}
.capa-empresa-cnpj {
  font-size: 12px; color: var(--ink3); margin-top: 2px;
}
.capa-meta {
  display: flex; gap: 24px; justify-content: center; flex-wrap: wrap;
  font-size: 12px; color: var(--ink3);
}
.capa-meta-item strong { color: var(--ink); display: block; font-size: 13px; }
.capa-rodape {
  background: var(--fundo); border-top: 2px solid var(--linha);
  padding: 16px 48px;
  display: flex; align-items: center; justify-content: space-between;
  font-size: 11px; color: var(--ink3);
}
.capa-norma {
  background: var(--verde5); border-radius: 8px;
  padding: 12px 24px; text-align: center; margin: 0 48px;
  font-size: 11px; color: var(--verde); line-height: 1.5;
}

/* ══════════════════════ SUMÁRIO ══════════════════════ */
.sumario {
  page-break-after: always;
  padding: 48px 0;
}
.sumario h2 {
  font-size: 22px; font-weight: 700; color: var(--cor-principal);
  border-bottom: 3px solid var(--cor-principal);
  padding-bottom: 10px; margin-bottom: 24px;
}
.sumario-item {
  display: flex; align-items: baseline;
  justify-content: space-between;
  padding: 7px 0; border-bottom: 1px dashed var(--linha);
  font-size: 12pt;
}
.sumario-item .num { font-weight: 700; color: var(--cor-principal); margin-right: 10px; flex-shrink: 0; }
.sumario-item .titulo { flex: 1; }
.sumario-item .dots { flex: 1; border-bottom: 1px dotted #ccc; margin: 0 8px; min-width: 40px; }
.sumario-sub { padding-left: 28px; font-size: 11pt; color: var(--ink2); }

/* ══════════════════════ SEÇÕES ══════════════════════ */
.secao { page-break-inside: avoid; margin-bottom: 36px; }
.secao-titulo {
  font-size: 16pt; font-weight: 700; color: var(--branco);
  background: var(--cor-principal);
  padding: 10px 18px; border-radius: 8px 8px 0 0;
  margin-bottom: 0; display: flex; align-items: center; gap: 10px;
}
.secao-titulo .num {
  background: rgba(255,255,255,0.2);
  width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; flex-shrink: 0;
}
.secao-corpo {
  border: 1px solid var(--linha); border-top: none;
  padding: 20px 22px; border-radius: 0 0 8px 8px;
  background: var(--branco);
}
.secao-corpo p { margin-bottom: 10px; text-align: justify; font-size: 11pt; }
.secao-corpo p:last-child { margin-bottom: 0; }
.subsecao-titulo {
  font-size: 12pt; font-weight: 700; color: var(--cor-principal);
  margin: 18px 0 8px; border-left: 4px solid var(--verde4); padding-left: 10px;
}

/* ══════════════════════ TABELAS ══════════════════════ */
.tabela-wrap { overflow-x: auto; margin: 12px 0; }
table.rel { width: 100%; border-collapse: collapse; font-size: 10pt; }
table.rel th {
  background: var(--cor-principal); color: #fff;
  padding: 9px 12px; font-weight: 600; text-align: left;
  font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em;
}
table.rel td {
  padding: 8px 12px; border-bottom: 1px solid var(--linha);
  vertical-align: middle;
}
table.rel tr:nth-child(even) td { background: var(--fundo); }
table.rel tr:hover td { background: var(--verde5); }

/* ══════════════════════ RISK BADGES ══════════════════════ */
.rbadge {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 10px; border-radius: 20px;
  font-size: 10px; font-weight: 700; white-space: nowrap;
}
.rbadge.extremo    { background: var(--risk-ex-bg); color: var(--risk-ex); }
.rbadge.elevado    { background: var(--risk-el-bg); color: var(--risk-el); }
.rbadge.moderado   { background: var(--risk-mo-bg); color: var(--risk-mo); }
.rbadge.baixo      { background: var(--risk-bx-bg); color: var(--risk-bx); }
.rbadge.insignificante { background: var(--risk-in-bg); color: var(--risk-in); }

/* ══════════════════════ BARRA DE PROGRESSO ══════════════════════ */
.barra-wrap { display: flex; align-items: center; gap: 8px; }
.barra-track { flex: 1; height: 6px; background: var(--linha); border-radius: 3px; overflow: hidden; }
.barra-fill  { height: 100%; border-radius: 3px; }
.barra-val   { font-size: 10px; color: var(--ink3); min-width: 36px; text-align: right; font-weight: 600; }

/* ══════════════════════ KPI CARDS ══════════════════════ */
.kpi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin: 16px 0; }
.kpi-card {
  border: 1px solid var(--linha); border-radius: 10px;
  padding: 16px 18px; background: var(--branco);
  border-top: 4px solid var(--cor-principal);
}
.kpi-card.danger { border-top-color: var(--risk-ex); }
.kpi-card.warning{ border-top-color: #F59E0B; }
.kpi-card.success{ border-top-color: var(--verde3); }
.kpi-label { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--ink3); margin-bottom: 6px; }
.kpi-value { font-size: 26px; font-weight: 800; color: var(--ink); letter-spacing: -0.02em; line-height: 1; }
.kpi-sub   { font-size: 10px; color: var(--ink3); margin-top: 4px; }

/* ══════════════════════ CHART CONTAINER ══════════════════════ */
.chart-box {
  border: 1px solid var(--linha); border-radius: 10px;
  padding: 20px; margin: 16px 0; background: var(--branco);
  page-break-inside: avoid;
}
.chart-box h4 {
  font-size: 11pt; font-weight: 600; color: var(--ink);
  margin-bottom: 4px;
}
.chart-box .chart-sub { font-size: 10px; color: var(--ink3); margin-bottom: 16px; }

/* ══════════════════════ RECOMENDAÇÃO ══════════════════════ */
.reco-box {
  background: var(--verde5); border-left: 4px solid var(--verde2);
  border-radius: 0 8px 8px 0; padding: 12px 16px;
  margin-top: 8px; font-size: 10pt; color: var(--verde);
}
.reco-box strong { display: block; margin-bottom: 4px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--verde2); }

/* ══════════════════════ RODAPÉ DE PÁGINA ══════════════════════ */
.page-footer {
  text-align: center; padding: 24px 0 0;
  font-size: 9pt; color: var(--ink3);
  border-top: 1px solid var(--linha); margin-top: 32px;
}

/* ══════════════════════ @MEDIA PRINT ══════════════════════ */
@media print {
  .print-bar { display: none !important; }
  .relatorio { margin: 0; padding: 0; max-width: none; }
  body { background: white; }
  .capa { min-height: 0; }
  .chart-box, .secao { page-break-inside: avoid; }
  .capa, .sumario { page-break-after: always; }
  @page { margin: 15mm 18mm 15mm 18mm; size: A4; }
}
</style>
</head>
<body>

{{-- ── Print bar ── --}}
<div class="print-bar">
  <span>
    <strong>ergo.gov</strong> · Relatório ARP — {{ $empresa->nome }}
  </span>
  <div style="display:flex;gap:8px;">
    <button onclick="window.print()">⬇ Imprimir / Salvar PDF</button>
    <button onclick="window.history.back()" style="background:transparent;border-color:rgba(255,255,255,0.2);">← Voltar</button>
  </div>
</div>

<div class="relatorio">

{{-- ════════════════════════════════════════
     CAPA
════════════════════════════════════════ --}}
<div class="capa">

  <div class="capa-topo">
    @if($identidade->foto_empresa)
      <img src="{{ url('fotos-identidade/'.$identidade->foto_empresa) }}" alt="Logo" class="capa-logo-empresa">
    @endif
    <div class="capa-wordmark">ergo<span>.</span>gov</div>
  </div>

  <div class="capa-corpo">
    <span class="capa-tag">Análise de Riscos Psicossociais do Trabalho</span>
    <h1 class="capa-titulo">Relatório Técnico ARP</h1>
    <p class="capa-subtitulo">Avaliação Psicossocial Ergonômica — ISO 45003</p>

    <div class="capa-empresa-box">
      <div class="capa-empresa-nome">{{ $empresa->nome }}</div>
      @if($empresa->cnpj)
      <div class="capa-empresa-cnpj">CNPJ: {{ $empresa->cnpj }}</div>
      @endif
    </div>

    <div class="capa-meta">
      <div class="capa-meta-item">
        <strong>{{ $dados['participantes'] }}</strong>
        Respondentes
      </div>
      <div class="capa-meta-item">
        <strong>{{ count($dados['categorias']) }}</strong>
        Categorias avaliadas
      </div>
      <div class="capa-meta-item">
        <strong>{{ now()->format('m/Y') }}</strong>
        Data de geração
      </div>
      @if($empresa->cidade)
      <div class="capa-meta-item">
        <strong>{{ $empresa->cidade }}{{ $empresa->estado ? '/'.$empresa->estado : '' }}</strong>
        Localidade
      </div>
      @endif
    </div>
  </div>

  <div class="capa-norma">
    Documento elaborado conforme <strong>ISO 45003:2021</strong> · <strong>NR-17 (Portaria MTP 423/2021)</strong> ·
    Matriz de Risco baseada em <strong>Mulhausen &amp; Damiano (1998)</strong> / <strong>BS 8800 (BSI, 1996)</strong>
  </div>

  <div class="capa-rodape">
    <span>ergo.gov — Sistema de Gestão Ergonômica</span>
    <span>Gerado em {{ now()->format('d/m/Y \à\s H:i') }}</span>
    @if($empresa->responsavel)
    <span>Responsável: {{ $empresa->responsavel }}</span>
    @endif
  </div>
</div>

{{-- ════════════════════════════════════════
     SUMÁRIO
════════════════════════════════════════ --}}
<div class="sumario">
  <h2>Sumário</h2>

  @foreach([
    ['1', 'Introdução'],
    ['2', 'Aspectos Legais e Normativos'],
    ['3', 'Objetivos'],
    ['4', 'Metodologia'],
    ['5', 'Caracterização da Empresa'],
    ['6', 'Resultados Gerais — Indicadores KPI'],
    ['7', 'Polígono de Risco Psicossocial'],
    ['8', 'Análise por Categoria'],
    ['9', 'Análise por Setor'],
    ['10', 'Cronograma de Ações e Plano de Controle'],
    ['11', 'Considerações Finais'],
    ['12', 'Responsáveis Técnicos'],
  ] as $item)
  <div class="sumario-item">
    <span class="num">{{ $item[0] }}.</span>
    <span class="titulo">{{ $item[1] }}</span>
    <span class="dots"></span>
  </div>
  @endforeach

  <div style="margin-top:24px;padding:14px 18px;background:var(--verde5);border-radius:10px;font-size:10pt;color:var(--verde);line-height:1.6;">
    <strong style="display:block;margin-bottom:6px;">Tabela de Classificação de Risco</strong>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      @foreach([
        ['Extremo (PR1)','17–20','#B91C1C','#FEF2F2'],
        ['Elevado (PR2)','13–16','#C2410C','#FFF7ED'],
        ['Moderado (PR3)','9–12','#B45309','#FFFBEB'],
        ['Baixo (PR4)','5–8','#15803D','#F0FDF4'],
        ['Insignificante','0–4','#4B5563','#F9FAFB'],
      ] as $n)
      <span style="display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:20px;background:{{ $n[3] }};color:{{ $n[2] }};font-size:10px;font-weight:700;">
        ● {{ $n[0] }} ({{ $n[1] }})
      </span>
      @endforeach
    </div>
  </div>
</div>

{{-- ════════════════════════════════════════
     1. INTRODUÇÃO
════════════════════════════════════════ --}}
<div class="secao">
  <div class="secao-titulo"><span class="num">1</span> Introdução</div>
  <div class="secao-corpo">
    <p>Os riscos psicossociais, cada vez mais reconhecidos como desafios para a saúde e segurança no trabalho, envolvem fatores como organização do trabalho, relações sociais, ambiente e tarefas. Esses riscos podem afetar a saúde mental e física dos trabalhadores e impactar a performance organizacional, gerando custos econômicos.</p>
    <p>A gestão eficaz desses riscos, alinhada aos demais riscos de SSO, pode levar a melhorias no bem-estar, satisfação e produtividade no trabalho, sendo responsabilidade tanto da organização quanto dos trabalhadores.</p>
    <p>Este documento foi elaborado com base nas orientações sobre a gestão de riscos psicossociais e a promoção do bem-estar no trabalho constantes na <strong>ISO 45003:2021</strong>, aplicando questionário estruturado com escala Likert (1–5) e Matriz de Risco combinada.</p>
    @if($empresa->introducao?->introducao)
    <p>{{ strip_tags($empresa->introducao->introducao) }}</p>
    @endif
  </div>
</div>

{{-- ════════════════════════════════════════
     2. ASPECTOS LEGAIS
════════════════════════════════════════ --}}
<div class="secao">
  <div class="secao-titulo"><span class="num">2</span> Aspectos Legais e Normativos</div>
  <div class="secao-corpo">
    <p>A avaliação de riscos psicossociais está normatizada em:</p>
    <ul style="margin:10px 0 10px 20px;font-size:11pt;">
      <li style="margin-bottom:6px;"><strong>NR-17 (Portaria MTP nº 423/2021)</strong> — Item 17.3.5: Devem integrar o inventário de riscos do PGR. Item 17.3.6: Devem ser previstos planos de ação nos termos do PGR. Item 17.4.1: Organização do trabalho deve levar em consideração os aspectos cognitivos que possam comprometer a segurança e a saúde do trabalhador.</li>
      <li style="margin-bottom:6px;"><strong>NR-1 (Portaria MTE)</strong> — Item 1.5.3.2.1: A organização deve considerar as condições de trabalho, nos termos da NR-17, incluindo os fatores de risco psicossociais relacionados ao trabalho.</li>
      <li><strong>ISO 45003:2021</strong> — Diretrizes para gestão de riscos psicossociais e promoção do bem-estar no trabalho.</li>
    </ul>
  </div>
</div>

{{-- ════════════════════════════════════════
     3. OBJETIVOS
════════════════════════════════════════ --}}
<div class="secao">
  <div class="secao-titulo"><span class="num">3</span> Objetivos</div>
  <div class="secao-corpo">
    <p>Este relatório tem como objetivos:</p>
    <ul style="margin:10px 0 10px 20px;font-size:11pt;">
      <li style="margin-bottom:5px;">Identificar e classificar os riscos psicossociais presentes no ambiente de trabalho da empresa <strong>{{ $empresa->nome }}</strong>;</li>
      <li style="margin-bottom:5px;">Mensurar a frequência e severidade dos fatores de risco por categoria e setor;</li>
      <li style="margin-bottom:5px;">Subsidiar ações de promoção da saúde ocupacional e melhoria do desempenho;</li>
      <li style="margin-bottom:5px;">Cumprir os requisitos legais da NR-17 e ISO 45003:2021;</li>
      <li>Fornecer um plano de ação com prioridades de intervenção.</li>
    </ul>
    {{-- @if($empresa->objetivos?->objetivo)
    <p>{{ strip_tags($empresa->objetivos->objetivo) }}</p>
    @endif --}}
  </div>
</div>

{{-- ════════════════════════════════════════
     4. METODOLOGIA
════════════════════════════════════════ --}}
<div class="secao">
  <div class="secao-titulo"><span class="num">4</span> Metodologia</div>
  <div class="secao-corpo">
    <p>A análise foi realizada por meio de questionário estruturado com <strong>{{ count($dados['categorias']) > 0 ? '70' : '70' }} perguntas</strong> distribuídas em <strong>17 categorias psicossociais</strong>, respondido por <strong>{{ $dados['participantes'] }} colaboradores</strong>. A escala de respostas é do tipo Likert (1 a 5):</p>

    <div class="tabela-wrap" style="margin:14px 0;">
      <table class="rel">
        <tr>
          <th>Valor</th><th>Frequência</th><th>Peso aplicado</th>
        </tr>
        @foreach([
          [1,'Nunca ou quase nunca','0,0'],
          [2,'Raramente','0,5'],
          [3,'Às vezes','1,5'],
          [4,'Frequente','2,5'],
          [5,'Muito frequente','4,0'],
        ] as $r)
        <tr>
          <td style="text-align:center;font-weight:700;">{{ $r[0] }}</td>
          <td>{{ $r[1] }}</td>
          <td style="text-align:center;font-family:monospace;">{{ $r[2] }}</td>
        </tr>
        @endforeach
      </table>
    </div>

    <p>O <strong>Sistema de Pesos Não-Lineares</strong> aplica ponderação progressiva, onde respostas frequentes distorcem o resultado de forma proporcional à gravidade do risco. A pontuação final de cada categoria é normalizada em uma escala de <strong>0 a 20</strong>, classificada conforme a Matriz de Risco (Mulhausen &amp; Damiano, 1998 / BS 8800, BSI 1996).</p>

    @if($empresa->metodologia?->metodologia)
    <p>{{ strip_tags($empresa->metodologia->metodologia) }}</p>
    @endif
  </div>
</div>

{{-- ════════════════════════════════════════
     5. CARACTERIZAÇÃO DA EMPRESA
════════════════════════════════════════ --}}
<div class="secao">
  <div class="secao-titulo"><span class="num">5</span> Caracterização da Empresa</div>
  <div class="secao-corpo">
    <div class="tabela-wrap">
      <table class="rel">
        <tr><th colspan="2">Dados da Empresa</th></tr>
        <tr><td style="width:200px;font-weight:600;">Razão Social</td><td>{{ $empresa->nome }}</td></tr>
        @if($empresa->cnpj)
        <tr><td style="font-weight:600;">CNPJ</td><td>{{ $empresa->cnpj }}</td></tr>
        @endif
        @if($empresa->setor)
        <tr><td style="font-weight:600;">Setor / CNAE</td><td>{{ $empresa->setor }}</td></tr>
        @endif
        @if($empresa->grau_de_risco)
        <tr><td style="font-weight:600;">Grau de Risco</td><td>{{ $empresa->grau_de_risco }}</td></tr>
        @endif
        @if($empresa->num_funcionarios)
        <tr><td style="font-weight:600;">Nº de Funcionários</td><td>{{ $empresa->num_funcionarios }}</td></tr>
        @endif
        @if($empresa->rua)
        <tr><td style="font-weight:600;">Endereço</td><td>{{ $empresa->rua }}, {{ $empresa->numero }} — {{ $empresa->bairro ?? '' }}, {{ $empresa->cidade }}/{{ $empresa->estado }} — CEP {{ $empresa->cep }}</td></tr>
        @endif
        @if($empresa->responsavel)
        <tr><td style="font-weight:600;">Responsável</td><td>{{ $empresa->responsavel }}</td></tr>
        @endif
        @if($empresa->periodo_inspecao)
        <tr><td style="font-weight:600;">Período da Inspeção</td><td>{{ $empresa->periodo_inspecao }}</td></tr>
        @endif
        <tr><td style="font-weight:600;">Total de Respondentes ARP</td><td>{{ $dados['participantes'] }}</td></tr>
      </table>
    </div>

    {{-- Respondentes por setor --}}
    @if($respondentes->count() > 0)
    <div class="subsecao-titulo">Distribuição de respondentes por setor</div>
    <div class="tabela-wrap">
      <table class="rel">
        <tr><th>Setor</th><th style="width:140px;text-align:center;">Respondentes</th></tr>
        @foreach($respondentes as $setor => $qtd)
        <tr>
          <td>{{ $setor }}</td>
          <td style="text-align:center;font-weight:700;">{{ $qtd }}</td>
        </tr>
        @endforeach
      </table>
    </div>
    @endif
  </div>
</div>

{{-- ════════════════════════════════════════
     6. RESULTADOS GERAIS — KPIs
════════════════════════════════════════ --}}
<div class="secao">
  <div class="secao-titulo"><span class="num">6</span> Resultados Gerais — Indicadores</div>
  <div class="secao-corpo">
    @php
      $nv = $dados['nivel_geral'];
      $nvClass = strtolower($nv['label']);
      $maior = $dados['maior_risco'];
    @endphp

    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-label">Total de Respondentes</div>
        <div class="kpi-value">{{ $dados['participantes'] }}</div>
        <div class="kpi-sub">Colaboradores participantes</div>
      </div>
      <div class="kpi-card {{ $nvClass === 'extremo' || $nvClass === 'elevado' ? 'danger' : ($nvClass === 'moderado' ? 'warning' : 'success') }}">
        <div class="kpi-label">Score Geral</div>
        <div class="kpi-value">{{ number_format($dados['score_geral'],1) }}<span style="font-size:14px;color:var(--ink3);font-weight:400;">/20</span></div>
        <div class="kpi-sub">
          <span class="rbadge {{ $nvClass }}">● {{ $nv['label'] }} ({{ $nv['codigo'] }})</span>
        </div>
      </div>
      <div class="kpi-card danger">
        <div class="kpi-label">Categoria Crítica</div>
        <div class="kpi-value" style="font-size:14px;line-height:1.3;margin-bottom:6px;">{{ $maior['nome'] ?? '—' }}</div>
        @if($maior)
        <div class="kpi-sub">
          <span class="rbadge {{ strtolower($maior['nivel']) }}">● Score {{ $maior['score'] }}</span>
        </div>
        @endif
      </div>
    </div>

    {{-- Distribuição por faixa --}}
    <div class="subsecao-titulo">Distribuição das categorias por faixa de risco</div>
    <div class="tabela-wrap">
      <table class="rel">
        <tr>
          <th>Faixa de Risco</th><th>Score</th>
          <th style="width:200px;">Nº de Categorias</th>
          <th>Percentual</th>
        </tr>
        @php
          $totalCats = count($dados['categorias']);
          $faixas = [
            ['Extremo (PR1)','17–20','extremo'],
            ['Elevado (PR2)','13–16','elevado'],
            ['Moderado (PR3)','9–12','moderado'],
            ['Baixo (PR4)','5–8','baixo'],
            ['Insignificante (NA)','0–4','insignificante'],
          ];
        @endphp
        @foreach($faixas as $f)
        @php
          $count = $dados['distribuicao'][$f[0] === 'Extremo (PR1)' ? 'Extremo' : ($f[0] === 'Elevado (PR2)' ? 'Elevado' : ($f[0] === 'Moderado (PR3)' ? 'Moderado' : ($f[0] === 'Baixo (PR4)' ? 'Baixo' : 'Insignificante')))] ?? 0;
          $pct = $totalCats > 0 ? round(($count / $totalCats) * 100) : 0;
        @endphp
        <tr>
          <td><span class="rbadge {{ $f[2] }}">● {{ $f[0] }}</span></td>
          <td style="font-family:monospace;font-size:10px;">{{ $f[1] }}</td>
          <td>
            <div class="barra-wrap">
              <div class="barra-track">
                <div class="barra-fill" style="width:{{ $pct }}%;background:{{ $dados['nivel_geral']['cor'] }};"></div>
              </div>
              <span class="barra-val">{{ $count }}</span>
            </div>
          </td>
          <td style="text-align:center;font-weight:600;">{{ $pct }}%</td>
        </tr>
        @endforeach
      </table>
    </div>
  </div>
</div>

{{-- ════════════════════════════════════════
     7. GRÁFICO RADAR
════════════════════════════════════════ --}}
<div class="secao">
  <div class="secao-titulo"><span class="num">7</span> Polígono de Risco Psicossocial</div>
  <div class="secao-corpo">
    <p>O gráfico abaixo representa o perfil de risco psicossocial da empresa, evidenciando as categorias com maior e menor índice de exposição.</p>
    <div class="chart-box">
      <h4>Radar de Risco — Distribuição por Categoria</h4>
      <p class="chart-sub">Escala 0–100% · Baseado na média ponderada dos respondentes</p>
      <div style="max-width:500px;margin:0 auto;">
        <canvas id="radarChart" height="400"></canvas>
      </div>
    </div>
    <div class="chart-box">
      <h4>Scores por Categoria (0–20)</h4>
      <p class="chart-sub">Classificação conforme Matriz de Risco</p>
      <canvas id="barChart" height="220"></canvas>
    </div>
  </div>
</div>

{{-- ════════════════════════════════════════
     8. ANÁLISE POR CATEGORIA
════════════════════════════════════════ --}}
<div class="secao">
  <div class="secao-titulo"><span class="num">8</span> Análise por Categoria</div>
  <div class="secao-corpo">
    <p>A tabela a seguir apresenta o diagnóstico detalhado de cada categoria psicossocial avaliada, com score, nível de risco e recomendação técnica.</p>

    @foreach($dados['categorias'] as $i => $cat)
    @php $catClass = strtolower(str_replace([' ','/'],'-',$cat['nivel'])); @endphp
    <div style="margin-bottom:18px;border:1px solid var(--linha);border-radius:10px;overflow:hidden;">
      {{-- Header da categoria --}}
      <div style="display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--fundo);border-bottom:1px solid var(--linha);">
        <span style="width:26px;height:26px;border-radius:50%;background:var(--cor-principal);color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">{{ $i+1 }}</span>
        <strong style="flex:1;font-size:11.5pt;">{{ $cat['nome'] }}</strong>
        <span class="rbadge {{ $catClass }}">● {{ $cat['nivel'] }} ({{ $cat['codigo'] }})</span>
        <span style="font-family:monospace;font-size:12px;font-weight:700;color:var(--ink);">{{ $cat['score'] }}/20</span>
      </div>
      {{-- Barra --}}
      <div style="padding:12px 16px;background:var(--branco);">
        <div class="barra-wrap" style="margin-bottom:10px;">
          <div class="barra-track" style="height:8px;">
            <div class="barra-fill" style="width:{{ $cat['score_pct'] }}%;background:{{ $cat['cor'] }};"></div>
          </div>
          <span class="barra-val">{{ $cat['score_pct'] }}%</span>
        </div>
        {{-- Recomendação --}}
        <div class="reco-box">
          <strong>↗ Recomendação técnica</strong>
          {{ $cat['recomendacao'] }}
        </div>
      </div>
    </div>
    @endforeach

    @if(empty($dados['categorias']))
    <p style="color:var(--ink3);text-align:center;padding:24px;">Nenhum dado disponível. Aguardando respondentes.</p>
    @endif
  </div>
</div>

{{-- ════════════════════════════════════════
     9. ANÁLISE POR SETOR
════════════════════════════════════════ --}}
<div class="secao">
  <div class="secao-titulo"><span class="num">9</span> Análise por Setor</div>
  <div class="secao-corpo">
    @if($respondentes->count() > 0)
    <p>Distribuição dos respondentes e participação por setor organizacional:</p>
    <div class="tabela-wrap">
      <table class="rel">
        <tr>
          <th>Setor</th>
          <th style="text-align:center;">Respondentes</th>
          <th style="text-align:center;">% Participação</th>
        </tr>
        @php $totalResp = $respondentes->sum(); @endphp
        @foreach($respondentes as $setor => $qtd)
        @php $pct = $totalResp > 0 ? round(($qtd/$totalResp)*100) : 0; @endphp
        <tr>
          <td>{{ $setor }}</td>
          <td style="text-align:center;font-weight:700;">{{ $qtd }}</td>
          <td>
            <div class="barra-wrap">
              <div class="barra-track">
                <div class="barra-fill" style="width:{{ $pct }}%;background:var(--verde3);"></div>
              </div>
              <span class="barra-val">{{ $pct }}%</span>
            </div>
          </td>
        </tr>
        @endforeach
      </table>
    </div>
    @else
    <p style="color:var(--ink3);">Dados de setor não disponíveis para os respondentes.</p>
    @endif
  </div>
</div>

{{-- ════════════════════════════════════════
     10. PLANO DE AÇÃO
════════════════════════════════════════ --}}
<div class="secao">
  <div class="secao-titulo"><span class="num">10</span> Cronograma de Ações e Plano de Controle</div>
  <div class="secao-corpo">
    <p>Com base nos resultados, recomenda-se a implementação das ações abaixo, priorizadas pelo nível de risco:</p>
    <div class="tabela-wrap">
      <table class="rel">
        <tr>
          <th>Prioridade</th>
          <th>Categoria</th>
          <th>Ação Recomendada</th>
          <th style="width:100px;text-align:center;">Score</th>
          <th style="width:100px;text-align:center;">Nível</th>
        </tr>
        @php
          $prioridades = [
            'Extremo'        => ['cor' => '#B91C1C', 'bg' => '#FEF2F2', 'prazo' => '30 dias'],
            'Elevado'        => ['cor' => '#C2410C', 'bg' => '#FFF7ED', 'prazo' => '60 dias'],
            'Moderado'       => ['cor' => '#B45309', 'bg' => '#FFFBEB', 'prazo' => '90 dias'],
            'Baixo'          => ['cor' => '#15803D', 'bg' => '#F0FDF4', 'prazo' => '180 dias'],
            'Insignificante' => ['cor' => '#4B5563', 'bg' => '#F9FAFB', 'prazo' => 'Monitorar'],
          ];
          $piorOrdem = collect($dados['categorias'])->sortByDesc('score');
        @endphp
        @foreach($piorOrdem->take(10) as $cat)
        @php
          $pr = $prioridades[$cat['nivel']] ?? $prioridades['Insignificante'];
          $catClass = strtolower(str_replace([' ','/'],'-',$cat['nivel']));
        @endphp
        <tr>
          <td style="text-align:center;font-size:10px;font-weight:700;color:{{ $pr['cor'] }};">{{ $pr['prazo'] }}</td>
          <td style="font-size:10pt;">{{ $cat['nome'] }}</td>
          <td style="font-size:9.5pt;color:var(--ink2);">{{ Str::limit($cat['recomendacao'], 120) }}</td>
          <td style="text-align:center;font-family:monospace;font-weight:700;">{{ $cat['score'] }}</td>
          <td style="text-align:center;"><span class="rbadge {{ $catClass }}">{{ $cat['nivel'] }}</span></td>
        </tr>
        @endforeach
      </table>
    </div>
  </div>
</div>

{{-- ════════════════════════════════════════
     11. CONSIDERAÇÕES FINAIS
════════════════════════════════════════ --}}
<div class="secao">
  <div class="secao-titulo"><span class="num">11</span> Considerações Finais</div>
  <div class="secao-corpo">
    <p>O teor desta Análise Psicossocial do Trabalho não esgota o tema, especialmente porque, dentro da estrutura de qualquer organização, os fatos são dinâmicos e mutáveis, o que justifica que a atividade da Ergonomia deve ser integrada como um "processo dentro da empresa", com início e continuidade de ações permanentes, acompanhando todas as transformações, introdução de novas tecnologias e mudanças gerais que ocorrem.</p>
    <p>Sendo assim, este trabalho representa um ponto de partida para esse processo, que deve ser iniciado com as diretrizes determinadas conforme as situações encontradas. Para isso, recomenda-se a criação de <strong>Comitês Ergonômicos Internos</strong>, nos quais é essencial o suporte e a participação ativa tanto das diretorias, gerências e supervisores quanto, principalmente, dos funcionários envolvidos em cada contexto, consolidando uma "ergonomia participativa".</p>
    <p>A experiência técnica do gestor ou supervisor, aliada ao conhecimento tácito do trabalhador que opera diariamente no ambiente, pode fornecer contribuições valiosas para corrigir situações específicas no ambiente de trabalho, muitas vezes sem custos elevados.</p>
    <p>É comprovado que este é o caminho mais fecundo para obter resultados esmagadores e sustentáveis de melhorias nas condições de trabalho, qualidade de vida, redução de acidentes, diminuição do absenteísmo e consequente ganho de produtividade.</p>
    @if($empresa->disposicao?->disposicao)
    <p>{{ strip_tags($empresa->disposicao->disposicao) }}</p>
    @endif
  </div>
</div>

{{-- ════════════════════════════════════════
     12. RESPONSÁVEIS
════════════════════════════════════════ --}}
<div class="secao">
  <div class="secao-titulo"><span class="num">12</span> Responsáveis Técnicos</div>
  <div class="secao-corpo">
    @if($empresa->equipe?->equipe)
    <div style="margin-bottom:16px;">{!! $empresa->equipe->equipe !!}</div>
    @endif

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:24px;">
      <div style="text-align:center;padding:20px;">
        <div style="border-top:2px solid var(--ink);padding-top:10px;margin-top:40px;">
          <div style="font-size:11pt;font-weight:600;">{{ $empresa->responsavel ?? '___________________________' }}</div>
          <div style="font-size:10px;color:var(--ink3);">Responsável pela empresa</div>
        </div>
      </div>
      <div style="text-align:center;padding:20px;">
        @if($empresa->responsaveis && $empresa->responsaveis->isNotEmpty())
        @php $resp = $empresa->responsaveis->first(); @endphp
        <div style="border-top:2px solid var(--ink);padding-top:10px;margin-top:40px;">
          <div style="font-size:11pt;font-weight:600;">{{ $resp->nome ?? '___________________________' }}</div>
          <div style="font-size:10px;color:var(--ink3);">{{ $resp->cargo ?? 'Ergonomista Responsável' }}</div>
        </div>
        @else
        <div style="border-top:2px solid var(--ink);padding-top:10px;margin-top:40px;">
          <div style="font-size:11pt;font-weight:600;">___________________________</div>
          <div style="font-size:10px;color:var(--ink3);">Ergonomista Responsável</div>
        </div>
        @endif
      </div>
    </div>

    <div style="margin-top:24px;padding:14px 18px;background:var(--fundo);border:1px solid var(--linha);border-radius:8px;font-size:9.5pt;color:var(--ink3);text-align:justify;line-height:1.5;">
      <strong style="color:var(--ink);">É de responsabilidade da empresa</strong> assegurar que este documento seja devidamente empregado. A conformidade com esta análise não confere imunidade com relação às obrigações legais. Essa análise serve como ponto de partida para o desenvolvimento de um programa de controle e gestão de riscos psicossociais no ambiente de trabalho.
    </div>
  </div>
</div>

<div class="page-footer">
  ergo.gov — Sistema de Gestão Ergonômica &nbsp;|&nbsp;
  Relatório ARP — {{ $empresa->nome }} &nbsp;|&nbsp;
  Gerado em {{ now()->format('d/m/Y \à\s H:i') }}
</div>

</div>{{-- .relatorio --}}

{{-- ════════════ CHARTS JS ════════════ --}}
<script>
const labels  = @json($dados['radar_labels']);
const scores  = @json($dados['radar_scores']);
const scoresBrutos = @json(array_column($dados['categorias'], 'score'));
const cores   = @json($dados['radar_cores']);

// ── Radar ──────────────────────────────────────────────────────────────────
if (labels.length > 0) {
  const ctxR = document.getElementById('radarChart').getContext('2d');
  new Chart(ctxR, {
    type: 'radar',
    data: {
      labels,
      datasets: [{
        label: 'Risco (%)',
        data: scores,
        fill: true,
        backgroundColor: 'rgba(31,107,67,0.10)',
        borderColor: '{{ $identidade->cor_principal ?? "#0F3D2A" }}',
        borderWidth: 2,
        pointBackgroundColor: cores,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` ${ctx.raw.toFixed(1)}%` } }
      },
      scales: {
        r: {
          min: 0, max: 100,
          ticks: { stepSize: 25, backdropColor: 'transparent', color: '#6B7280', font: { size: 9 } },
          pointLabels: { color: '#374151', font: { size: 9.5 } },
          grid: { color: 'rgba(0,0,0,0.07)' },
          angleLines: { color: 'rgba(0,0,0,0.06)' }
        }
      }
    }
  });
}

// ── Bar ────────────────────────────────────────────────────────────────────
if (labels.length > 0) {
  const ctxB = document.getElementById('barChart').getContext('2d');
  new Chart(ctxB, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Score',
        data: scoresBrutos,
        backgroundColor: cores.map(c => c + '33'),
        borderColor: cores,
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` Score: ${ctx.raw.toFixed(1)}/20` } }
      },
      scales: {
        x: { min: 0, max: 20,
          grid: { color: 'rgba(0,0,0,0.05)' },
          ticks: { color: '#6B7280', font: { size: 9 } },
          border: { display: false }
        },
        y: {
          ticks: { color: '#374151', font: { size: 9.5 } },
          grid: { display: false },
          border: { display: false }
        }
      }
    }
  });
}
</script>
</body>
</html>
