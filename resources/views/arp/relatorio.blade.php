<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Relatório ARP{{ $setorAtual ? ' — '.$setorAtual : '' }} — {{ $empresa->nome }}</title>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<style>
/* ═══════════════════════════════════════════════════════════
   RELATÓRIO ARP — Avalia.One
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

/* ── Barra de impressão (não imprime) ── */
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
}
.print-bar button:hover { background: rgba(255,255,255,0.3); }

.relatorio { max-width: 800px; margin: 110px auto 48px; padding: 0 24px; }

/* ══════════════════════ CAPA ══════════════════════ */
.capa {
  min-height: 100vh;
  display: flex; flex-direction: column; justify-content: space-between;
  page-break-after: always; break-after: page;
}
.capa-topo {
  background: var(--cor-principal); padding: 40px 48px 32px; color: #fff;
  display: flex; align-items: center; justify-content: space-between;
}
.capa-logo-empresa { max-height: 56px; max-width: 180px; object-fit: contain; }
.capa-wordmark { font-size: 18px; font-weight: 800; letter-spacing: -0.02em; color: #fff; }
.capa-wordmark span { color: var(--verde4); }
.capa-corpo {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center; padding: 48px; text-align: center;
}
.capa-tag {
  display: inline-block; background: var(--verde5); color: var(--verde);
  font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  padding: 5px 16px; border-radius: 20px; margin-bottom: 24px;
}
.capa-titulo { font-size: 32px; font-weight: 800; letter-spacing: -0.02em; color: var(--ink); margin-bottom: 8px; line-height: 1.15; }
.capa-subtitulo { font-size: 18px; font-weight: 500; color: var(--ink3); margin-bottom: 32px; }
.capa-empresa-box { border: 2px solid var(--cor-principal); border-radius: 14px; padding: 20px 36px; margin-bottom: 28px; display: inline-block; }
.capa-empresa-nome { font-size: 22px; font-weight: 700; color: var(--cor-principal); }
.capa-empresa-cnpj { font-size: 12px; color: var(--ink3); margin-top: 2px; }
.capa-meta { display: flex; gap: 28px; justify-content: center; flex-wrap: wrap; font-size: 12px; color: var(--ink3); margin-top: 22px; }
.capa-meta-item strong { color: var(--ink); display: block; font-size: 13px; }
.capa-rodape {
  background: var(--fundo); border-top: 2px solid var(--linha); padding: 16px 48px;
  display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--ink3);
}
.capa-norma {
  background: var(--verde5); border-radius: 8px; padding: 12px 24px; text-align: center; margin: 0 48px 16px;
  font-size: 11px; color: var(--verde); line-height: 1.5;
}
.capa-setor-tag {
  display: inline-block; margin-top: 4px; background: var(--cor-principal); color: #fff;
  font-size: 13px; font-weight: 700; letter-spacing: 0.02em; padding: 8px 22px; border-radius: 24px;
}

/* ══════════════════════ SUMÁRIO ══════════════════════ */
.sumario { page-break-after: always; break-after: page; padding: 24px 0; }
.sumario h2 { font-size: 22px; font-weight: 700; color: var(--cor-principal); border-bottom: 3px solid var(--cor-principal); padding-bottom: 10px; margin-bottom: 24px; }
.sumario-item { display: flex; align-items: baseline; padding: 7px 0; border-bottom: 1px dashed var(--linha); font-size: 12pt; }
.sumario-item .num { font-weight: 700; color: var(--cor-principal); margin-right: 10px; flex-shrink: 0; }
.sumario-sub { padding-left: 28px; font-size: 11pt; color: var(--ink2); }

/* ══════════════════════ SEÇÕES ══════════════════════ */
.secao { margin-bottom: 30px; }
.secao-titulo {
  font-size: 16pt; font-weight: 700; color: var(--branco); background: var(--cor-principal);
  padding: 10px 18px; border-radius: 8px; display: flex; align-items: center; gap: 10px;
  margin-bottom: 14px; break-after: avoid; page-break-after: avoid;
}
.secao-titulo .num {
  background: rgba(255,255,255,0.2); width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0;
}
.secao-corpo { padding: 0 4px; }
.secao-corpo p { margin-bottom: 10px; text-align: justify; font-size: 11pt; }
.secao-corpo p:last-child { margin-bottom: 0; }
.secao-corpo ul { margin: 10px 0 10px 20px; font-size: 11pt; }
.secao-corpo li { margin-bottom: 6px; }
.subsecao-titulo {
  font-size: 12pt; font-weight: 700; color: var(--cor-principal);
  margin: 18px 0 8px; border-left: 4px solid var(--verde4); padding-left: 10px;
  break-after: avoid; page-break-after: avoid;
}

/* Seção inteira que deve começar em página nova */
.nova-pagina { page-break-before: always; break-before: page; }

/* ══════════════════════ BLOCO DE SETOR ══════════════════════ */
.setor-bloco { page-break-before: always; break-before: page; margin-bottom: 30px; }
.setor-bloco-header {
  display: flex; align-items: center; gap: 14px; background: var(--fundo);
  border: 2px solid var(--cor-principal); border-radius: 12px; padding: 16px 22px; margin-bottom: 16px;
  break-inside: avoid; page-break-inside: avoid;
}
.setor-bloco-icone {
  width: 42px; height: 42px; border-radius: 50%; background: var(--cor-principal); color: #fff;
  display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; flex-shrink: 0;
}
.setor-bloco-nome { font-size: 15pt; font-weight: 800; color: var(--cor-principal); line-height: 1.1; }
.setor-bloco-meta { font-size: 10.5px; color: var(--ink3); margin-top: 2px; }
.setor-bloco-kpis { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-bottom: 16px; break-inside: avoid; page-break-inside: avoid; }

/* ══════════════════════ TABELAS ══════════════════════ */
.tabela-wrap { margin: 12px 0; }
table.rel { width: 100%; border-collapse: collapse; font-size: 10pt; table-layout: fixed; }
table.rel thead { display: table-header-group; }
table.rel tr { break-inside: avoid; page-break-inside: avoid; }
table.rel th {
  background: var(--cor-principal); color: #fff; padding: 9px 12px; font-weight: 600; text-align: left;
  font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: middle;
}
table.rel td { padding: 8px 12px; border-bottom: 1px solid var(--linha); vertical-align: top; word-wrap: break-word; overflow-wrap: anywhere; }
table.rel td.c, table.rel th.c { text-align: center; }
table.rel td.b { font-weight: 700; }
table.rel td.mono { font-family: monospace; }
table.rel.auto { table-layout: auto; }

/* ══════════════════════ RISK BADGES ══════════════════════ */
.rbadge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 20px; font-size: 10px; font-weight: 700; white-space: nowrap; }
.rbadge.extremo        { background: var(--risk-ex-bg); color: var(--risk-ex); }
.rbadge.elevado        { background: var(--risk-el-bg); color: var(--risk-el); }
.rbadge.moderado       { background: var(--risk-mo-bg); color: var(--risk-mo); }
.rbadge.baixo          { background: var(--risk-bx-bg); color: var(--risk-bx); }
.rbadge.insignificante { background: var(--risk-in-bg); color: var(--risk-in); }

/* ══════════════════════ BARRA DE PROGRESSO ══════════════════════ */
.barra-wrap { display: flex; align-items: center; gap: 8px; }
.barra-track { flex: 1; height: 6px; background: var(--linha); border-radius: 3px; overflow: hidden; }
.barra-fill  { height: 100%; border-radius: 3px; }
.barra-val   { font-size: 10px; color: var(--ink3); min-width: 36px; text-align: right; font-weight: 600; }

/* ══════════════════════ KPI CARDS ══════════════════════ */
.kpi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin: 16px 0; break-inside: avoid; page-break-inside: avoid; }
.kpi-card { border: 1px solid var(--linha); border-radius: 10px; padding: 16px 18px; background: var(--branco); border-top: 4px solid var(--cor-principal); }
.kpi-card.danger { border-top-color: var(--risk-ex); }
.kpi-card.warning{ border-top-color: #F59E0B; }
.kpi-card.success{ border-top-color: var(--verde3); }
.kpi-label { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--ink3); margin-bottom: 6px; }
.kpi-value { font-size: 26px; font-weight: 800; color: var(--ink); letter-spacing: -0.02em; line-height: 1; }
.kpi-value.txt { font-size: 13px; line-height: 1.3; margin-bottom: 6px; word-spacing: normal; }
.kpi-sub   { font-size: 10px; color: var(--ink3); margin-top: 4px; }
.kpi-card.sm .kpi-value { font-size: 20px; }
.kpi-card.sm .kpi-value.txt { font-size: 12px; }

/* ══════════════════════ GRÁFICOS ══════════════════════ */
.chart-box {
  border: 1px solid var(--linha); border-radius: 10px; padding: 18px 20px; margin: 14px 0; background: var(--branco);
  break-inside: avoid; page-break-inside: avoid;
}
.chart-box h4 { font-size: 11pt; font-weight: 600; color: var(--ink); margin-bottom: 4px; }
.chart-box .chart-sub { font-size: 10px; color: var(--ink3); margin-bottom: 12px; }
.radar-wrap { position: relative; width: 100%; height: 520px; }
.bar-wrap   { position: relative; width: 100%; height: 440px; }

/* ══════════════════════ CARD DE CATEGORIA ══════════════════════ */
.cat-card { margin-bottom: 14px; border: 1px solid var(--linha); border-radius: 10px; overflow: hidden; break-inside: avoid; page-break-inside: avoid; }
.cat-head { display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: var(--fundo); border-bottom: 1px solid var(--linha); }
.cat-num {
  width: 24px; height: 24px; border-radius: 50%; background: var(--cor-principal); color: #fff;
  display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; flex-shrink: 0;
}
.cat-nome { flex: 1; font-size: 11pt; font-weight: 700; }
.cat-score { font-family: monospace; font-size: 12px; font-weight: 700; color: var(--ink); white-space: nowrap; }
.cat-body { padding: 10px 14px; background: var(--branco); }

.reco-box {
  background: var(--verde5); border-left: 4px solid var(--verde2); border-radius: 0 8px 8px 0;
  padding: 10px 14px; margin-top: 8px; font-size: 10pt; color: var(--verde);
}
.reco-box strong { display: block; margin-bottom: 4px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--verde2); }
.reco-box.fonte { background: #FFF7ED; border-left-color: #C2410C; color: #9A3412; }
.reco-box.fonte strong { color: #C2410C; }

/* ══════════════════════ ASSINATURAS ══════════════════════ */
.assinaturas { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px; break-inside: avoid; page-break-inside: avoid; }
.assinatura { text-align: center; padding: 20px; }
.assinatura-linha { border-top: 2px solid var(--ink); padding-top: 10px; margin-top: 40px; }
.assinatura-nome { font-size: 11pt; font-weight: 600; }
.assinatura-cargo { font-size: 10px; color: var(--ink3); }

.page-footer { text-align: center; padding: 24px 0 0; font-size: 9pt; color: var(--ink3); border-top: 1px solid var(--linha); margin-top: 32px; }

/* ══════════════════════ SELETOR DE SETOR (não imprime) ══════════════════════ */
.setor-selector {
  position: fixed; top: 41px; left: 0; right: 0; z-index: 998; background: #fff; border-bottom: 1px solid var(--linha);
  padding: 10px 24px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; box-shadow: 0 2px 6px rgba(0,0,0,0.04);
}
.setor-selector .setor-label { font-size: 12px; font-weight: 700; color: var(--ink3); text-transform: uppercase; letter-spacing: 0.06em; margin-right: 4px; }
.setor-btn { font-size: 12.5px; font-weight: 600; text-decoration: none; padding: 5px 14px; border-radius: 20px; border: 1px solid var(--linha); color: var(--ink2); background: #fff; }
.setor-btn:hover { border-color: var(--verde3); color: var(--verde2); }
.setor-btn.active { background: var(--cor-principal); border-color: var(--cor-principal); color: #fff; }

/* ══════════════════════ PRINT ══════════════════════ */
@media print {
  @page { size: A4; margin: 14mm 16mm; }
  .print-bar, .setor-selector { display: none !important; }
  body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .relatorio { margin: 0; padding: 0; max-width: none; }
  .capa { min-height: 0; }
  .capa-corpo { padding: 32px 24px; }
  .radar-wrap { height: 470px; }
  .bar-wrap   { height: 400px; }
  a { color: inherit; text-decoration: none; }
}
</style>
</head>
<body>

{{-- ── Barra de impressão ── --}}
<div class="print-bar">
  <span><strong>Avalia.One</strong> · Relatório ARP{{ $setorAtual ? ' — Setor '.$setorAtual : ' — Global' }} — {{ $empresa->nome }}</span>
  <div style="display:flex;gap:8px;">
    <button onclick="window.print()">⬇ Imprimir / Salvar PDF</button>
    <button onclick="window.history.back()" style="background:transparent;border-color:rgba(255,255,255,0.2);">← Voltar</button>
  </div>
</div>

{{-- ── Seletor de setor ── --}}
@if(!empty($setores))
<div class="setor-selector">
  <span class="setor-label">Relatório de:</span>
  <a href="{{ route('relatorio.arp', $empresa->id) }}" class="setor-btn {{ !$setorAtual ? 'active' : '' }}">Global (todos os setores)</a>
  @foreach($setores as $s)
  <a href="{{ route('relatorio.arp', ['id' => $empresa->id, 'setor' => $s]) }}" class="setor-btn {{ $setorAtual === $s ? 'active' : '' }}">{{ $s }}</a>
  @endforeach
</div>
@endif

@php
  $totalCategorias = count($dados['categorias']);
  $prioridades = [
    'Extremo'        => ['cor' => '#B91C1C', 'prazo' => '30 dias'],
    'Elevado'        => ['cor' => '#C2410C', 'prazo' => '60 dias'],
    'Moderado'       => ['cor' => '#B45309', 'prazo' => '90 dias'],
    'Baixo'          => ['cor' => '#15803D', 'prazo' => '180 dias'],
    'Insignificante' => ['cor' => '#4B5563', 'prazo' => 'Monitorar'],
  ];
  $nivelClass = fn($nivel) => strtolower(str_replace([' ','/'],'-',$nivel));
@endphp

<div class="relatorio">

{{-- ════════════════════════════ CAPA ════════════════════════════ --}}
<div class="capa">
  <div class="capa-topo">
    @if($identidade->foto_empresa)
      <img src="{{ url('fotos-identidade/'.$identidade->foto_empresa) }}" alt="Logo" class="capa-logo-empresa">
    @endif
    <div class="capa-wordmark">Avalia<span>.</span>One</div>
  </div>

  <div class="capa-corpo">
    <span class="capa-tag">Análise de Riscos Psicossociais do Trabalho</span>
    <h1 class="capa-titulo">Relatório Técnico ARP</h1>
    <p class="capa-subtitulo">Avaliação de Riscos Psicossociais — ISO 45003</p>

    <div class="capa-empresa-box">
      <div class="capa-empresa-nome">{{ $empresa->nome }}</div>
      @if($empresa->cnpj)<div class="capa-empresa-cnpj">CNPJ: {{ $empresa->cnpj }}</div>@endif
    </div>

    @if($setorAtual)
    <div class="capa-setor-tag">Relatório do setor: {{ $setorAtual }}</div>
    @else
    <div class="capa-setor-tag" style="background:var(--verde5);color:var(--verde);">
      Relatório Global — todos os setores
      @if(!empty($setores))
      <span style="font-size:10px;font-weight:400;opacity:0.8;display:block;margin-top:2px;">
        Inclui análise individual de {{ count($setores) }} setor{{ count($setores) > 1 ? 'es' : '' }}
      </span>
      @endif
    </div>
    @endif

    <div class="capa-meta">
      <div class="capa-meta-item"><strong>{{ $dados['participantes'] }}</strong>Respondentes</div>
      <div class="capa-meta-item"><strong>{{ $totalCategorias }}</strong>Categorias avaliadas</div>
      @if(!$setorAtual && !empty($setores))
      <div class="capa-meta-item"><strong>{{ count($setores) }}</strong>Setores analisados</div>
      @endif
      <div class="capa-meta-item"><strong>{{ now()->format('m/Y') }}</strong>Data de geração</div>
      @if($empresa->cidade)
      <div class="capa-meta-item"><strong>{{ $empresa->cidade }}{{ $empresa->estado ? '/'.$empresa->estado : '' }}</strong>Localidade</div>
      @endif
    </div>
  </div>

  <div>
    <div class="capa-norma">
      Documento elaborado conforme <strong>ISO 45003:2021</strong> · <strong>NR-17 (Portaria MTP 423/2021)</strong> ·
      Matriz de Risco baseada em <strong>Mulhausen &amp; Damiano (1998)</strong> / <strong>BS 8800 (BSI, 1996)</strong>
    </div>
    <div class="capa-rodape">
      <span>Avalia.One — Sistema de Gestão de Riscos Psicossociais</span>
      <span>Gerado em {{ now()->format('d/m/Y \à\s H:i') }}</span>
      @if($responsavelLegal)<span>Responsável legal: {{ $responsavelLegal }}</span>@endif
    </div>
  </div>
</div>

{{-- ════════════════════════════ SUMÁRIO ════════════════════════════ --}}
<div class="sumario">
  <h2>Sumário</h2>
  @php
    $itensSumario = [
      ['1','Introdução'], ['2','Aspectos Legais e Normativos'], ['3','Objetivos'], ['4','Metodologia'],
      ['5','Caracterização da Empresa'], ['6','Resultados Gerais — Indicadores'],
      ['7','Polígono de Risco Psicossocial'], ['8','Análise por Categoria'], ['9','Análise por Setor'],
    ];
    if (!$setorAtual && !empty($dadosPorSetor)) {
      $k = 1;
      foreach (array_keys($dadosPorSetor) as $s) { $itensSumario[] = ['9.'.$k++, 'Setor: '.$s]; }
    }
    $itensSumario[] = ['10','Cronograma de Ações e Plano de Controle'];
    $itensSumario[] = ['11','Considerações Finais'];
    $itensSumario[] = ['12','Responsáveis Técnicos'];
  @endphp
  @foreach($itensSumario as $item)
  <div class="sumario-item {{ str_contains($item[0], '.') ? 'sumario-sub' : '' }}">
    <span class="num">{{ $item[0] }}.</span>
    <span>{{ $item[1] }}</span>
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
      <span style="display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:20px;background:{{ $n[3] }};color:{{ $n[2] }};font-size:10px;font-weight:700;">● {{ $n[0] }} ({{ $n[1] }})</span>
      @endforeach
    </div>
  </div>
</div>

{{-- ════════════════════════════ 1. INTRODUÇÃO ════════════════════════════ --}}
<div class="secao">
  <div class="secao-titulo"><span class="num">1</span> Introdução</div>
  <div class="secao-corpo">
    <p>Os riscos psicossociais, cada vez mais reconhecidos como desafios para a saúde e segurança no trabalho, envolvem fatores como organização do trabalho, relações sociais, ambiente e tarefas. Esses riscos podem afetar a saúde mental e física dos trabalhadores e impactar a performance organizacional, gerando custos econômicos.</p>
    <p>A gestão eficaz desses riscos, alinhada aos demais riscos de SSO, pode levar a melhorias no bem-estar, satisfação e produtividade no trabalho, sendo responsabilidade tanto da organização quanto dos trabalhadores.</p>
    <p>Este documento foi elaborado com base nas orientações sobre a gestão de riscos psicossociais e a promoção do bem-estar no trabalho constantes na <strong>ISO 45003:2021</strong>, aplicando questionário estruturado com escala Likert (1–5) e Matriz de Risco combinada.</p>
    @foreach($textos['introducao'] as $p)
    <p>{{ $p }}</p>
    @endforeach
  </div>
</div>

{{-- ════════════════════════════ 2. ASPECTOS LEGAIS ════════════════════════════ --}}
<div class="secao">
  <div class="secao-titulo"><span class="num">2</span> Aspectos Legais e Normativos</div>
  <div class="secao-corpo">
    <p>A avaliação de riscos psicossociais está normatizada em:</p>
    <ul>
      <li><strong>NR-17 (Portaria MTP nº 423/2021)</strong> — Item 17.3.5: Devem integrar o inventário de riscos do PGR. Item 17.3.6: Devem ser previstos planos de ação nos termos do PGR. Item 17.4.1: Organização do trabalho deve levar em consideração os aspectos cognitivos que possam comprometer a segurança e a saúde do trabalhador.</li>
      <li><strong>NR-1 (Portaria MTE)</strong> — Item 1.5.3.2.1: A organização deve considerar as condições de trabalho, nos termos da NR-17, incluindo os fatores de risco psicossociais relacionados ao trabalho.</li>
      <li><strong>ISO 45003:2021</strong> — Diretrizes para gestão de riscos psicossociais e promoção do bem-estar no trabalho.</li>
    </ul>
  </div>
</div>

{{-- ════════════════════════════ 3. OBJETIVOS ════════════════════════════ --}}
<div class="secao">
  <div class="secao-titulo"><span class="num">3</span> Objetivos</div>
  <div class="secao-corpo">
    <p>Este relatório tem como objetivos:</p>
    <ul>
      <li>Identificar e classificar os riscos psicossociais presentes no ambiente de trabalho da empresa <strong>{{ $empresa->nome }}</strong>;</li>
      <li>Mensurar a frequência e severidade dos fatores de risco por categoria e setor;</li>
      <li>Subsidiar ações de promoção da saúde ocupacional e melhoria do desempenho;</li>
      <li>Cumprir os requisitos legais da NR-17 e ISO 45003:2021;</li>
      <li>Fornecer um plano de ação com prioridades de intervenção.</li>
    </ul>
  </div>
</div>

{{-- ════════════════════════════ 4. METODOLOGIA ════════════════════════════ --}}
<div class="secao">
  <div class="secao-titulo"><span class="num">4</span> Metodologia</div>
  <div class="secao-corpo">
    <p>A análise foi realizada por meio de questionário estruturado com <strong>70 perguntas</strong> distribuídas em <strong>{{ $totalCategorias }} categorias psicossociais</strong>, respondido por <strong>{{ $dados['participantes'] }} colaboradores</strong>. A escala de respostas é do tipo Likert (1 a 5):</p>

    <div class="tabela-wrap">
      <table class="rel">
        <thead><tr><th class="c" style="width:80px;">Valor</th><th>Frequência</th><th class="c" style="width:140px;">Peso aplicado</th></tr></thead>
        <tbody>
        @foreach([[1,'Nunca ou quase nunca','0,0'],[2,'Raramente','0,5'],[3,'Às vezes','1,5'],[4,'Frequente','2,5'],[5,'Muito frequente','4,0']] as $r)
        <tr><td class="c b">{{ $r[0] }}</td><td>{{ $r[1] }}</td><td class="c mono">{{ $r[2] }}</td></tr>
        @endforeach
        </tbody>
      </table>
    </div>

    <p>O <strong>Sistema de Pesos Não-Lineares</strong> aplica ponderação progressiva, onde respostas frequentes distorcem o resultado de forma proporcional à gravidade do risco. A pontuação final de cada categoria é normalizada em uma escala de <strong>0 a 20</strong>, classificada conforme a Matriz de Risco (Mulhausen &amp; Damiano, 1998 / BS 8800, BSI 1996).</p>

    @foreach($textos['metodologia'] as $p)
    <p>{{ $p }}</p>
    @endforeach
  </div>
</div>

{{-- ════════════════════════════ 5. CARACTERIZAÇÃO ════════════════════════════ --}}
<div class="secao">
  <div class="secao-titulo"><span class="num">5</span> Caracterização da Empresa</div>
  <div class="secao-corpo">
    <div class="tabela-wrap">
      <table class="rel">
        <thead><tr><th colspan="2">Dados da Empresa</th></tr></thead>
        <tbody>
        <tr><td class="b" style="width:200px;">Razão Social</td><td>{{ $empresa->nome }}</td></tr>
        @if($empresa->cnpj)<tr><td class="b">CNPJ</td><td>{{ $empresa->cnpj }}</td></tr>@endif
        @if($empresa->setor)<tr><td class="b">Setor / CNAE</td><td>{{ $empresa->setor }}</td></tr>@endif
        @if($empresa->grau_de_risco)<tr><td class="b">Grau de Risco</td><td>{{ $empresa->grau_de_risco }}</td></tr>@endif
        @if($empresa->num_funcionarios)<tr><td class="b">Nº de Funcionários</td><td>{{ $empresa->num_funcionarios }}</td></tr>@endif
        @if($empresa->rua)
        <tr><td class="b">Endereço</td><td>{{ $empresa->rua }}, {{ $empresa->numero }} — {{ $empresa->bairro ?? '' }}, {{ $empresa->cidade }}/{{ $empresa->estado }} — CEP {{ $empresa->cep }}</td></tr>
        @endif
        @if($responsavelLegal)<tr><td class="b">Responsável legal</td><td>{{ $responsavelLegal }}</td></tr>@endif
        @if($empresa->periodo_inspecao)<tr><td class="b">Período da Avaliação</td><td>{{ $empresa->periodo_inspecao }}</td></tr>@endif
        <tr><td class="b">Total de Respondentes ARP</td><td>{{ $dados['participantes'] }}</td></tr>
        </tbody>
      </table>
    </div>

    @if($respondentes->count() > 0)
    <div class="subsecao-titulo">Distribuição de respondentes por setor</div>
    <div class="tabela-wrap">
      <table class="rel">
        <thead><tr><th>Setor</th><th class="c" style="width:120px;">Respondentes</th><th>Cargo</th><th>Descrição do Cargo</th></tr></thead>
        <tbody>
        @foreach($respondentes as $setor => $info)
        <tr>
          <td>{{ $setor }}</td>
          <td class="c b">{{ $info['qtd'] }}</td>
          <td>{{ $info['cargo'] ?? 'Não informado' }}</td>
          <td>{{ $info['descricao_cargo'] ?? 'Não informado' }}</td>
        </tr>
        @endforeach
        </tbody>
      </table>
    </div>
    @endif
  </div>
</div>

{{-- ════════════════════════════ 6. RESULTADOS GERAIS ════════════════════════════ --}}
<div class="secao nova-pagina">
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
      <div class="kpi-card {{ in_array($nvClass,['extremo','elevado']) ? 'danger' : ($nvClass === 'moderado' ? 'warning' : 'success') }}">
        <div class="kpi-label">Score Geral</div>
        <div class="kpi-value">{{ number_format($dados['score_geral'],1) }}<span style="font-size:14px;color:var(--ink3);font-weight:400;">/20</span></div>
        <div class="kpi-sub"><span class="rbadge {{ $nvClass }}">● {{ $nv['label'] }} ({{ $nv['codigo'] }})</span></div>
      </div>
      <div class="kpi-card danger">
        <div class="kpi-label">Categoria Crítica</div>
        <div class="kpi-value txt">{{ $maior['nome'] ?? '—' }}</div>
        @if($maior)<div class="kpi-sub"><span class="rbadge {{ strtolower($maior['nivel']) }}">● Score {{ $maior['score'] }}</span></div>@endif
      </div>
    </div>

    <div class="subsecao-titulo">Distribuição das categorias por faixa de risco</div>
    <div class="tabela-wrap">
      <table class="rel">
        <thead><tr><th style="width:170px;">Faixa de Risco</th><th style="width:70px;">Score</th><th>Nº de Categorias</th><th class="c" style="width:100px;">Percentual</th></tr></thead>
        <tbody>
        @foreach([
          ['Extremo (PR1)','17–20','extremo','Extremo'],
          ['Elevado (PR2)','13–16','elevado','Elevado'],
          ['Moderado (PR3)','9–12','moderado','Moderado'],
          ['Baixo (PR4)','5–8','baixo','Baixo'],
          ['Insignificante (NA)','0–4','insignificante','Insignificante'],
        ] as $f)
        @php
          $count = $dados['distribuicao'][$f[3]] ?? 0;
          $pct = $totalCategorias > 0 ? round(($count / $totalCategorias) * 100) : 0;
        @endphp
        <tr>
          <td><span class="rbadge {{ $f[2] }}">● {{ $f[0] }}</span></td>
          <td class="mono" style="font-size:10px;">{{ $f[1] }}</td>
          <td>
            <div class="barra-wrap">
              <div class="barra-track"><div class="barra-fill" style="width:{{ $pct }}%;background:{{ $nv['cor'] }};"></div></div>
              <span class="barra-val">{{ $count }}</span>
            </div>
          </td>
          <td class="c b">{{ $pct }}%</td>
        </tr>
        @endforeach
        </tbody>
      </table>
    </div>
  </div>
</div>

{{-- ════════════════════════════ 7. POLÍGONO DE RISCO ════════════════════════════ --}}
<div class="secao nova-pagina">
  <div class="secao-titulo"><span class="num">7</span> Polígono de Risco Psicossocial</div>
  <div class="secao-corpo">
    <p>O gráfico abaixo representa o perfil de risco psicossocial {!! $setorAtual ? 'do setor <strong>'.e($setorAtual).'</strong>' : 'consolidado de toda a organização' !!}, evidenciando as categorias com maior e menor índice de exposição.
      @if(!$setorAtual && !empty($dadosPorSetor)) Os polígonos individuais de cada setor são apresentados na seção 9.@endif
    </p>
    <div class="chart-box">
      <h4>Radar de Risco — Distribuição por Categoria {{ $setorAtual ? '('.$setorAtual.')' : '(Global)' }}</h4>
      <p class="chart-sub">Escala 0–100% · Baseado na média ponderada dos respondentes</p>
      <div class="radar-wrap"><canvas id="radarChart"></canvas></div>
    </div>
    <div class="chart-box">
      <h4>Scores por Categoria (0–20) {{ $setorAtual ? '('.$setorAtual.')' : '(Global)' }}</h4>
      <p class="chart-sub">Classificação conforme Matriz de Risco</p>
      <div class="bar-wrap"><canvas id="barChart"></canvas></div>
    </div>
  </div>
</div>

{{-- ════════════════════════════ 8. ANÁLISE POR CATEGORIA ════════════════════════════ --}}
<div class="secao nova-pagina">
  <div class="secao-titulo"><span class="num">8</span> Análise por Categoria</div>
  <div class="secao-corpo">
    <p>Diagnóstico detalhado de cada categoria psicossocial {!! $setorAtual ? 'para o setor <strong>'.e($setorAtual).'</strong>' : 'de forma consolidada para toda a organização' !!}, com score, nível de risco e recomendação técnica.</p>

    @forelse($dados['categorias'] as $i => $cat)
    <div class="cat-card">
      <div class="cat-head">
        <span class="cat-num">{{ $i+1 }}</span>
        <span class="cat-nome">{{ $cat['nome'] }}</span>
        <span class="rbadge {{ $nivelClass($cat['nivel']) }}">● {{ $cat['nivel'] }} ({{ $cat['codigo'] }})</span>
        <span class="cat-score">{{ $cat['score'] }}/20</span>
      </div>
      <div class="cat-body">
        <div class="barra-wrap" style="margin-bottom:8px;">
          <div class="barra-track" style="height:8px;"><div class="barra-fill" style="width:{{ $cat['score_pct'] }}%;background:{{ $cat['cor'] }};"></div></div>
          <span class="barra-val">{{ $cat['score_pct'] }}%</span>
        </div>
        <div class="reco-box fonte"><strong>⚠ Fonte geradora</strong>{{ $cat['fonte_geradora'] ?? 'Não há evidência de risco de acordo com o perigo avaliado.' }}</div>
        <div class="reco-box"><strong>↗ Recomendação técnica</strong>{{ $cat['recomendacao'] }}</div>
      </div>
    </div>
    @empty
    <p style="color:var(--ink3);text-align:center;padding:24px;">Nenhum dado disponível. Aguardando respondentes.</p>
    @endforelse
  </div>
</div>

{{-- ════════════════════════════ 9. ANÁLISE POR SETOR ════════════════════════════ --}}
<div class="secao nova-pagina">
  <div class="secao-titulo"><span class="num">9</span> Análise por Setor</div>
  <div class="secao-corpo">
    @if($respondentes->count() > 0)
    <p>Distribuição dos respondentes e participação por setor organizacional:</p>
    <div class="tabela-wrap">
      <table class="rel">
        <thead><tr><th>Setor</th><th class="c" style="width:110px;">Respondentes</th><th style="width:150px;">% Participação</th><th>Cargo</th><th>Descrição do Cargo</th></tr></thead>
        <tbody>
        @php $totalResp = $respondentes->sum(fn($info) => $info['qtd']); @endphp
        @foreach($respondentes as $setor => $info)
        @php $pct = $totalResp > 0 ? round(($info['qtd']/$totalResp)*100) : 0; @endphp
        <tr>
          <td>{{ $setor }}</td>
          <td class="c b">{{ $info['qtd'] }}</td>
          <td>
            <div class="barra-wrap">
              <div class="barra-track"><div class="barra-fill" style="width:{{ $pct }}%;background:var(--verde3);"></div></div>
              <span class="barra-val">{{ $pct }}%</span>
            </div>
          </td>
          <td>{{ $info['cargo'] ?? 'Não informado' }}</td>
          <td>{{ $info['descricao_cargo'] ?? 'Não informado' }}</td>
        </tr>
        @endforeach
        </tbody>
      </table>
    </div>
    @if(!$setorAtual && !empty($dadosPorSetor))
    <p>A seguir, cada setor é apresentado individualmente com seus indicadores, polígono de risco, análise por categoria e plano de ação específico.</p>
    @endif
    @else
    <p style="color:var(--ink3);">Dados de setor não disponíveis para os respondentes.</p>
    @endif
  </div>
</div>

{{-- ── Blocos individuais por setor (apenas no relatório global) ── --}}
@if(!$setorAtual && !empty($dadosPorSetor))
@foreach($dadosPorSetor as $nomeSetor => $ds)
@php
  $dsNv      = $ds['nivel_geral'];
  $dsNvClass = strtolower($dsNv['label']);
  $dsMaior   = $ds['maior_risco'];
  $dsIdx     = $loop->iteration;
  $slug      = preg_replace('/[^a-z0-9]/i','_',$nomeSetor);
@endphp
<div class="setor-bloco">
  <div class="setor-bloco-header">
    <div class="setor-bloco-icone">9.{{ $dsIdx }}</div>
    <div>
      <div class="setor-bloco-nome">Setor: {{ $nomeSetor }}</div>
      <div class="setor-bloco-meta">{{ $ds['participantes'] }} respondente{{ $ds['participantes'] != 1 ? 's' : '' }} · {{ count($ds['categorias']) }} categorias avaliadas</div>
    </div>
    <div style="margin-left:auto;text-align:right;">
      <div style="font-size:10px;color:var(--ink3);margin-bottom:4px;">Score geral do setor</div>
      <div style="font-size:22px;font-weight:800;color:{{ $dsNv['cor'] }};">{{ number_format($ds['score_geral'],1) }}<span style="font-size:12px;font-weight:400;color:var(--ink3);">/20</span></div>
      <span class="rbadge {{ $dsNvClass }}">● {{ $dsNv['label'] }} ({{ $dsNv['codigo'] }})</span>
    </div>
  </div>

  <div class="setor-bloco-kpis">
    <div class="kpi-card sm">
      <div class="kpi-label">Respondentes</div>
      <div class="kpi-value">{{ $ds['participantes'] }}</div>
      <div class="kpi-sub">neste setor</div>
    </div>
    <div class="kpi-card sm {{ in_array($dsNvClass,['extremo','elevado']) ? 'danger' : ($dsNvClass === 'moderado' ? 'warning' : 'success') }}">
      <div class="kpi-label">Score Geral</div>
      <div class="kpi-value">{{ number_format($ds['score_geral'],1) }}<span style="font-size:12px;color:var(--ink3);font-weight:400;">/20</span></div>
      <div class="kpi-sub"><span class="rbadge {{ $dsNvClass }}">● {{ $dsNv['label'] }}</span></div>
    </div>
    <div class="kpi-card sm danger">
      <div class="kpi-label">Categoria Crítica</div>
      <div class="kpi-value txt">{{ $dsMaior['nome'] ?? '—' }}</div>
      @if($dsMaior)<div class="kpi-sub"><span class="rbadge {{ strtolower($dsMaior['nivel']) }}">● Score {{ $dsMaior['score'] }}</span></div>@endif
    </div>
  </div>

  <div class="chart-box">
    <h4>Radar de Risco — {{ $nomeSetor }}</h4>
    <p class="chart-sub">Escala 0–100% · Distribuição por categoria no setor</p>
    <div class="radar-wrap"><canvas id="radarSetor_{{ $slug }}"></canvas></div>
  </div>
  <div class="chart-box">
    <h4>Scores por Categoria — {{ $nomeSetor }} (0–20)</h4>
    <p class="chart-sub">Classificação conforme Matriz de Risco</p>
    <div class="bar-wrap"><canvas id="barSetor_{{ $slug }}"></canvas></div>
  </div>

  <div class="subsecao-titulo">Análise detalhada das categorias — {{ $nomeSetor }}</div>
  @foreach($ds['categorias'] as $ci => $cat)
  <div class="cat-card">
    <div class="cat-head">
      <span class="cat-num">{{ $ci+1 }}</span>
      <span class="cat-nome">{{ $cat['nome'] }}</span>
      <span class="rbadge {{ $nivelClass($cat['nivel']) }}">● {{ $cat['nivel'] }} ({{ $cat['codigo'] }})</span>
      <span class="cat-score">{{ $cat['score'] }}/20</span>
    </div>
    <div class="cat-body">
      <div class="barra-wrap" style="margin-bottom:8px;">
        <div class="barra-track" style="height:7px;"><div class="barra-fill" style="width:{{ $cat['score_pct'] }}%;background:{{ $cat['cor'] }};"></div></div>
        <span class="barra-val">{{ $cat['score_pct'] }}%</span>
      </div>
      <div class="reco-box fonte"><strong>⚠ Fonte geradora</strong>{{ $cat['fonte_geradora'] ?? 'Não há evidência de risco de acordo com o perigo avaliado.' }}</div>
      <div class="reco-box"><strong>↗ Recomendação técnica</strong>{{ $cat['recomendacao'] }}</div>
    </div>
  </div>
  @endforeach

  <div class="subsecao-titulo" style="page-break-before:always;break-before:page;">Plano de Ação — {{ $nomeSetor }}</div>
  <div class="tabela-wrap">
    <table class="rel">
      <thead><tr><th class="c" style="width:80px;">Prioridade</th><th style="width:150px;">Categoria</th><th>Ação Recomendada</th><th class="c" style="width:60px;">Score</th><th class="c" style="width:100px;">Nível</th></tr></thead>
      <tbody>
      @foreach(collect($ds['categorias'])->sortByDesc('score')->take(10) as $cat)
      @php $pr = $prioridades[$cat['nivel']] ?? $prioridades['Insignificante']; @endphp
      <tr>
        <td class="c" style="font-size:10px;font-weight:700;color:{{ $pr['cor'] }};">{{ $pr['prazo'] }}</td>
        <td style="font-size:10pt;">{{ $cat['nome'] }}</td>
        <td style="font-size:9.5pt;color:var(--ink2);">{{ $cat['recomendacao'] }}</td>
        <td class="c mono b">{{ $cat['score'] }}</td>
        <td class="c"><span class="rbadge {{ $nivelClass($cat['nivel']) }}">{{ $cat['nivel'] }}</span></td>
      </tr>
      @endforeach
      </tbody>
    </table>
  </div>
</div>
@endforeach
@endif

{{-- ════════════════════════════ 10. CRONOGRAMA GLOBAL ════════════════════════════ --}}
<div class="secao nova-pagina">
  <div class="secao-titulo"><span class="num">10</span> Cronograma de Ações e Plano de Controle</div>
  <div class="secao-corpo">
    <p>Com base nos resultados {!! $setorAtual ? 'do setor <strong>'.e($setorAtual).'</strong>' : 'consolidados de toda a organização' !!}, recomenda-se a implementação das ações abaixo, priorizadas pelo nível de risco:</p>
    <div class="tabela-wrap">
      <table class="rel">
        <thead><tr><th class="c" style="width:80px;">Prioridade</th><th style="width:150px;">Categoria</th><th>Ação Recomendada</th><th class="c" style="width:60px;">Score</th><th class="c" style="width:100px;">Nível</th></tr></thead>
        <tbody>
        @foreach(collect($dados['categorias'])->sortByDesc('score')->take(10) as $cat)
        @php $pr = $prioridades[$cat['nivel']] ?? $prioridades['Insignificante']; @endphp
        <tr>
          <td class="c" style="font-size:10px;font-weight:700;color:{{ $pr['cor'] }};">{{ $pr['prazo'] }}</td>
          <td style="font-size:10pt;">{{ $cat['nome'] }}</td>
          <td style="font-size:9.5pt;color:var(--ink2);">{{ $cat['recomendacao'] }}</td>
          <td class="c mono b">{{ $cat['score'] }}</td>
          <td class="c"><span class="rbadge {{ $nivelClass($cat['nivel']) }}">{{ $cat['nivel'] }}</span></td>
        </tr>
        @endforeach
        </tbody>
      </table>
    </div>
    <p style="font-size:10pt;color:var(--ink3);margin-top:6px;">Prazos de referência: Extremo — 30 dias · Elevado — 60 dias · Moderado — 90 dias · Baixo — 180 dias · Insignificante — monitoramento periódico.</p>
  </div>
</div>

{{-- ════════════════════════════ 11. CONSIDERAÇÕES FINAIS ════════════════════════════ --}}
<div class="secao nova-pagina">
  <div class="secao-titulo"><span class="num">11</span> Considerações Finais</div>
  <div class="secao-corpo">
    <p>O teor desta Análise de Riscos Psicossociais do Trabalho não esgota o tema. Dentro da estrutura de qualquer organização os fatos são dinâmicos e mutáveis, o que justifica que a gestão dos fatores psicossociais seja integrada como um processo contínuo dentro da empresa, com acompanhamento permanente das transformações organizacionais, das mudanças de liderança, de processos e de tecnologia que venham a ocorrer.</p>
    <p>Este trabalho representa, portanto, um ponto de partida. Recomenda-se que a organização constitua um <strong>grupo de trabalho ou comitê de saúde mental e riscos psicossociais</strong>, com participação ativa da direção, das gerências e supervisões e, principalmente, dos trabalhadores de cada setor avaliado, consolidando uma abordagem participativa na definição e no acompanhamento das ações de controle.</p>
    <p>A experiência dos gestores, aliada ao conhecimento tácito de quem vivencia diariamente a organização do trabalho, é fonte valiosa de soluções para os fatores identificados neste relatório, muitas vezes sem custos elevados — ajustes em comunicação, distribuição de demandas, feedback, reconhecimento e clareza de funções.</p>
    <p>A adoção consistente dessas medidas é o caminho mais efetivo para obter resultados sustentáveis na melhoria do clima organizacional, na promoção do bem-estar, na redução do absenteísmo e do adoecimento relacionado ao trabalho e no consequente ganho de engajamento e produtividade.</p>
    <p>As recomendações apresentadas seguem o princípio da priorização dos pontos críticos e devem ser avaliadas quanto à sua viabilidade pela organização, podendo ser adaptadas ou substituídas por medidas equivalentes. Os níveis de risco classificados como Insignificante devem ser mantidos sob monitoramento periódico, com nova aplicação do instrumento em intervalo compatível com a dinâmica da empresa.</p>
    @foreach($textos['disposicao'] as $p)
    <p>{{ $p }}</p>
    @endforeach
    <p><strong>Responsabilidades.</strong> De posse das informações deste relatório, a empresa <strong>{{ $empresa->nome }}</strong>, responsável pela implantação das melhorias, compromete-se a cumprir as ações estabelecidas de acordo com a identificação dos riscos psicossociais no ambiente de trabalho.</p>
  </div>
</div>

{{-- ════════════════════════════ 12. RESPONSÁVEIS ════════════════════════════ --}}
<div class="secao">
  <div class="secao-titulo"><span class="num">12</span> Responsáveis Técnicos</div>
  <div class="secao-corpo">
    @if($empresa->equipe?->equipe)
    <div style="margin-bottom:16px;">{!! $empresa->equipe->equipe !!}</div>
    @endif

    @php $resp = ($empresa->responsaveis && $empresa->responsaveis->isNotEmpty()) ? $empresa->responsaveis->first() : null; @endphp
    <div class="assinaturas">
      <div class="assinatura">
        <div class="assinatura-linha">
          <div class="assinatura-nome">{{ $responsavelLegal ?: '___________________________' }}</div>
          <div class="assinatura-cargo">Responsável legal pela empresa</div>
        </div>
      </div>
      <div class="assinatura">
        <div class="assinatura-linha">
          <div class="assinatura-nome">{{ $resp->nome ?? '___________________________' }}</div>
          <div class="assinatura-cargo">{{ $resp->cargo ?? 'Responsável Técnico' }}</div>
        </div>
      </div>
    </div>

    <div style="margin-top:24px;padding:14px 18px;background:var(--fundo);border:1px solid var(--linha);border-radius:8px;font-size:9.5pt;color:var(--ink3);text-align:justify;line-height:1.5;">
      <strong style="color:var(--ink);">É de responsabilidade da empresa</strong> assegurar que este documento seja devidamente empregado. A conformidade com esta análise não confere imunidade com relação às obrigações legais. Esta análise serve como ponto de partida para o desenvolvimento de um programa de controle e gestão de riscos psicossociais no ambiente de trabalho.
    </div>
  </div>
</div>

<div class="page-footer">
  Avalia.One — Sistema de Gestão de Riscos Psicossociais &nbsp;|&nbsp; Relatório ARP — {{ $empresa->nome }} &nbsp;|&nbsp; Gerado em {{ now()->format('d/m/Y \à\s H:i') }}
</div>

</div>{{-- .relatorio --}}

{{-- ════════════════════════════ CHARTS ════════════════════════════ --}}
<script>
const corPrincipal = '{{ $identidade->cor_principal ?? "#0F3D2A" }}';

// Quebra rótulos longos em várias linhas (Chart.js aceita array como label)
function quebrarLabel(txt, max) {
  max = max || 20;
  const linhas = []; let atual = '';
  txt.split(' ').forEach(w => {
    if (atual && (atual + ' ' + w).length > max) { linhas.push(atual); atual = w; }
    else atual = atual ? atual + ' ' + w : w;
  });
  if (atual) linhas.push(atual);
  return linhas;
}

function makeRadar(id, lbs, sc, cs) {
  const ctx = document.getElementById(id);
  if (!ctx || !lbs.length) return;
  new Chart(ctx.getContext('2d'), {
    type: 'radar',
    data: {
      labels: lbs.map(l => quebrarLabel(l, 18)),
      datasets: [{
        label: 'Risco (%)', data: sc, fill: true,
        backgroundColor: 'rgba(31,107,67,0.10)', borderColor: corPrincipal, borderWidth: 2,
        pointBackgroundColor: cs, pointBorderColor: '#fff', pointBorderWidth: 2, pointRadius: 4,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, animation: false,
      layout: { padding: 8 },
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ` ${c.raw.toFixed(1)}%` } } },
      scales: {
        r: {
          min: 0, max: 100,
          ticks: { stepSize: 25, backdropColor: 'transparent', color: '#6B7280', font: { size: 8 } },
          pointLabels: { color: '#374151', font: { size: 8.5, family: 'Outfit, Arial, sans-serif' }, padding: 6, centerPointLabels: false },
          grid: { color: 'rgba(0,0,0,0.07)' },
          angleLines: { color: 'rgba(0,0,0,0.06)' }
        }
      }
    }
  });
}

function makeBar(id, lbs, sc, cs) {
  const ctx = document.getElementById(id);
  if (!ctx || !lbs.length) return;
  new Chart(ctx.getContext('2d'), {
    type: 'bar',
    data: {
      labels: lbs.map(l => quebrarLabel(l, 34)),
      datasets: [{
        label: 'Score', data: sc,
        backgroundColor: cs.map(c => c + '33'), borderColor: cs, borderWidth: 2, borderRadius: 5, borderSkipped: false,
      }]
    },
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false, animation: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => ` Score: ${c.raw.toFixed(1)}/20` } } },
      scales: {
        x: { min: 0, max: 20, grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#6B7280', font: { size: 9 } }, border: { display: false } },
        y: { ticks: { color: '#374151', font: { size: 9, family: 'Outfit, Arial, sans-serif' }, autoSkip: false }, grid: { display: false }, border: { display: false } }
      }
    }
  });
}

// ── Global / setor único ──
makeRadar('radarChart', @json($dados['radar_labels']), @json($dados['radar_scores']), @json($dados['radar_cores']));
makeBar('barChart', @json($dados['radar_labels']), @json(array_column($dados['categorias'], 'score')), @json($dados['radar_cores']));

// ── Por setor (seção 9, apenas no global) ──
@if(!$setorAtual && !empty($dadosPorSetor))
@foreach($dadosPorSetor as $nomeSetor => $ds)
@php $slug = preg_replace('/[^a-z0-9]/i','_',$nomeSetor); @endphp
makeRadar('radarSetor_{{ $slug }}', @json($ds['radar_labels']), @json($ds['radar_scores']), @json($ds['radar_cores']));
makeBar('barSetor_{{ $slug }}', @json($ds['radar_labels']), @json(array_column($ds['categorias'], 'score')), @json($ds['radar_cores']));
@endforeach
@endif

// Redesenha antes de imprimir para o canvas casar com a largura do papel
window.addEventListener('beforeprint', () => { Object.values(Chart.instances).forEach(c => c.resize()); });
window.addEventListener('afterprint',  () => { Object.values(Chart.instances).forEach(c => c.resize()); });
</script>
</body>
</html>