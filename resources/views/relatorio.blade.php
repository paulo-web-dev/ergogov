<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AET — {{ $empresa->nome }}</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script src="{{ url('/dist/js/calculo_ferramentas_relatorio.js') }}"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<style>
/* ═══════════════════════════════════════════════════════════
   AET — layout fluido.
   Mudanças desta versão:
   1) Mapeamento Ergonômico e Plano de Ação viram páginas em
      PAISAGEM, com larguras fixas por coluna e sem quebra de
      palavra no meio. Classificação normalizada em rótulo curto.
   2) Fim das páginas em branco: nenhum bloco força quebra se
      estiver vazio, anexos têm título+imagem colados e altura
      máxima, e um passe final remove páginas sem conteúdo.
   ═══════════════════════════════════════════════════════════ */
:root {
  --cor:   {{ $identidade->cor_principal }};
  --ink:   #111;
  --ink2:  #444;
  --linha: #cfcfcf;
  --fundo: #f3f4f6;
  --ok:    #1b7f3b;
  --baixo: #3f8f4f;
  --mod:   #b58100;
  --alto:  #c1571a;
  --crit:  #b3261e;
}
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: 'Poppins', Arial, sans-serif; color: var(--ink);
  font-size: 11.5pt; line-height: 1.55; text-align: justify; background: #e9e9e9;
}
.doc { max-width: 800px; margin: 24px auto; background: #fff; padding: 28px 32px; box-shadow: 0 2px 12px rgba(0,0,0,.08); }

p  { margin: 0 0 10px; orphans: 3; widows: 3; }
ul { margin: 6px 0 10px 22px; padding: 0; }
li { margin-bottom: 5px; orphans: 2; widows: 2; }
a  { color: inherit; text-decoration: none; }
a:hover { text-decoration: underline; }

/* ── Cabeçalho repetido (fixo em cada página na impressão) ── */
.doc-header { display: flex; align-items: center; gap: 12px; border: 1px solid var(--linha); border-radius: 8px; padding: 6px 12px; margin-bottom: 18px; background: #fff; }
.doc-header img { width: 90px; height: auto; max-height: 64px; object-fit: contain; }
.doc-header .meio { flex: 1; text-align: center; font-size: 10.5pt; font-weight: 600; line-height: 1.3; }
.doc-footer { display: none; }

/* ── Marca d'água ── */
.marca-dagua { display: none; }

/* ── Páginas / seções ── */
.page { break-before: page; page-break-before: always; }
.page.first { break-before: auto; page-break-before: auto; }
.bloco { break-inside: avoid; page-break-inside: avoid; }
/* nunca forçar página nova para um contêiner vazio */
.page:empty { display: none !important; break-before: auto; page-break-before: auto; }

.titulo-secao {
  background: var(--cor); color: #fff; border-radius: 8px; text-align: center;
  font-weight: 700; font-size: 16pt; padding: 8px 14px; margin: 0 0 14px;
  break-after: avoid; page-break-after: avoid;
}
.titulo-secao.sub { font-size: 13pt; padding: 6px 12px; margin-top: 18px; }
.legenda-grafico { font-weight: 700; font-size: 12pt; text-align: center; margin-bottom: 4px; }

/* ── Capa ── */
.capa { min-height: 90vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; border: 3px solid var(--cor); border-radius: 10px; padding: 40px 24px; }
.capa .logo { max-width: 260px; max-height: 180px; object-fit: contain; margin-bottom: 24px; }
.capa h1 { color: var(--cor); font-size: 34pt; margin: 0; }
.capa .sub { color: var(--cor); font-weight: 600; font-size: 14pt; }
.capa .titulo-doc { font-size: 22pt; font-weight: 700; margin-top: 28px; }
.capa .foto-empresa { max-width: 80%; max-height: 320px; object-fit: contain; margin-top: 24px; border-radius: 8px; }
.capa-svg { width: 100%; height: auto; display: block; }
.capa-imagem img { width: 100%; height: auto; display: block; border-radius: 10px; }

/* ── Sumário ── */
.sumario li { list-style: none; display: flex; align-items: baseline; padding: 6px 0; border-bottom: 1px dashed var(--linha); font-size: 11pt; }
.sumario li .t { font-weight: 600; }
.sumario li.sub { padding-left: 24px; font-weight: 400; }
.sumario li.sub .t { font-weight: 400; }
.sumario ul { margin-left: 0; }

/* ── Tabelas ── */
table.tab { width: 100%; border-collapse: collapse; font-size: 10pt; margin: 10px 0 16px; background: #fff; table-layout: fixed; }
table.tab thead { display: table-header-group; }
table.tab tr { break-inside: avoid; page-break-inside: avoid; }
table.tab th { background: var(--cor); color: #fff; padding: 7px 8px; text-align: center; font-weight: 600; font-size: 9.5pt; border: 1px solid var(--cor); vertical-align: middle; line-height: 1.2; }
/* quebra só entre palavras; hifeniza quando não couber — nunca corta no meio */
table.tab td {
  border: 1px solid var(--linha); padding: 6px 8px; vertical-align: top; text-align: left;
  overflow-wrap: break-word; word-break: normal; hyphens: auto; -webkit-hyphens: auto;
}
table.tab td.c { text-align: center; }
table.tab tr:nth-child(even) td { background: #fafafa; }
table.tab.auto { table-layout: auto; }
table.tab.compacta { font-size: 8.5pt; }
table.tab.compacta th, table.tab.compacta td { padding: 4px 5px; }

/* Tabela chave/valor (identificação do posto) */
table.kv td:first-child { width: 170px; font-weight: 600; background: var(--fundo); }

/* ── Tabelões em paisagem (Mapeamento / Plano de Ação) ── */
table.tab.larga { font-size: 8pt; line-height: 1.3; }
table.tab.larga th, table.tab.larga td { padding: 4px 6px; }
table.tab.larga td { text-align: left; }
table.tab.larga .nowrap { white-space: nowrap; }
.nivel { display: inline-block; padding: 2px 6px; border-radius: 4px; font-weight: 700; font-size: 7.5pt; line-height: 1.2; white-space: nowrap; color: #fff; }
.nivel.n-ok    { background: var(--ok); }
.nivel.n-baixo { background: var(--baixo); }
.nivel.n-mod   { background: var(--mod); }
.nivel.n-alto  { background: var(--alto); }
.nivel.n-crit  { background: var(--crit); }
.nivel.n-na    { background: #6b7280; }
.legenda-tab { font-size: 8pt; color: var(--ink2); margin-top: 6px; text-align: left; }
.legenda-tab b { color: var(--ink); }
.legenda-tab ul { margin: 4px 0 0 18px; }
.legenda-tab li { margin-bottom: 2px; }

/* ── Cards de conteúdo rico (campos HTML do cadastro) ── */
.rich p { margin: 0 0 10px; }
.rich ul, .rich ol { margin: 6px 0 10px 22px; }
.rich img { max-width: 100%; height: auto; }
.rich table { max-width: 100%; }

/* ── Fotos ── */
.fotos { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 10px 0; }
.fotos .foto { border: 1px solid var(--linha); border-radius: 8px; padding: 6px; background: #fff; text-align: center; break-inside: avoid; }
.fotos img { max-width: 100%; max-height: 260px; object-fit: contain; border-radius: 4px; }
.fotos-legenda { font-size: 10pt; color: var(--ink2); text-align: center; margin-top: 4px; }

/* ── Gráficos ── */
.graficos-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.grafico { border: 1px solid var(--linha); border-radius: 8px; padding: 8px; background: #fff; break-inside: avoid; }
.grafico .canvas { position: relative; width: 100%; height: 250px; }
.grafico .canvas canvas { width: 100% !important; height: 100% !important; }
.grafico.largo { grid-column: 1 / -1; }
.grafico.largo .canvas { height: 280px; }

/* ── Anexos ── */
#anexospage .bloco-anexo { break-inside: avoid; page-break-inside: avoid; text-align: center; margin-bottom: 14px; }
#anexospage img { max-width: 100%; max-height: 195mm; object-fit: contain; }
#anexospage h1, #anexospage h2, #anexospage h3, #anexospage h4, #anexospage .titulo-secao { break-after: avoid; page-break-after: avoid; }

/* ── Assinaturas ── */
.assinaturas { display: flex; flex-wrap: wrap; gap: 32px; justify-content: center; margin-top: 32px; }
.assinatura { text-align: center; width: 300px; break-inside: avoid; }
.assinatura img { width: 200px; height: 80px; object-fit: contain; }
.assinatura .linha { border-top: 2px solid #000; margin: 4px auto 6px; width: 280px; }
.assinatura p { margin: 0; line-height: 1.35; }

.ferramenta { font-size: 11.5pt; }
.aviso-vazio { color: #777; font-style: italic; }

/* ── Loader ── */
.loader-wrapper { position: fixed; inset: 0; background: rgba(255,255,255,.85); display: flex; align-items: center; justify-content: center; z-index: 9999; }
.loader { border: 8px solid #f3f3f3; border-top: 8px solid var(--cor); border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Barra de impressão ── */
.print-bar { position: sticky; top: 0; z-index: 50; background: var(--cor); color: #fff; padding: 8px 16px; display: flex; justify-content: space-between; align-items: center; gap: 12px; font-size: 13px; flex-wrap: wrap; }
.print-bar .acoes { display: flex; gap: 8px; }
.print-bar button { background: rgba(255,255,255,.2); border: 1px solid rgba(255,255,255,.4); color: #fff; padding: 6px 14px; border-radius: 6px; cursor: pointer; font-family: inherit; font-weight: 600; font-size: 12px; }
.print-bar button:hover { background: rgba(255,255,255,.32); }

/* aviso de orientação só na tela */
.aviso-paisagem { font-size: 9pt; color: var(--ink2); font-style: italic; margin: 0 0 8px; }

/* ═══════════════════════ IMPRESSÃO ═══════════════════════ */
@media print {
  /* páginas nomeadas: o corpo do laudo em retrato, os tabelões em paisagem.
     Margens iguais nas duas para o cabeçalho fixo continuar alinhado. */
  @page retrato  { size: A4 portrait;  margin: 30mm 14mm 20mm 14mm; }
  @page paisagem { size: A4 landscape; margin: 30mm 14mm 20mm 14mm; }
  .page            { page: retrato; }
  .page.paisagem   { page: paisagem; }

  body { background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .print-bar, .loader-wrapper, .aviso-paisagem { display: none !important; }
  .doc { max-width: none; margin: 0; padding: 0; box-shadow: none; }
  .capa { min-height: 0; }

  /* Cabeçalho e rodapé repetidos em todas as páginas (position:fixed é repetido pelo Chrome) */
  .doc-header { position: fixed; top: -24mm; left: 0; right: 0; margin: 0; height: 20mm; }
  .doc-footer { display: block; position: fixed; bottom: -14mm; left: 0; right: 0; height: 10mm; text-align: right; }
  .doc-footer img { height: 9mm; width: auto; }

  .marca-dagua { display: block; position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 55%; opacity: .12; z-index: -1; pointer-events: none; }
  .marca-dagua img { width: 100%; height: auto; }

  .grafico .canvas { height: 230px; }

  /* nada de página em branco por bloco vazio */
  .page:empty, .vazio { display: none !important; }
}
</style>
</head>
<body>

@if($alert != 0)
<script>alert("Você ainda não definiu sua identidade visual própria, faça isso no menu!");</script>
@endif

<div class="loader-wrapper" id="loader"><div class="loader"></div></div>

<div class="print-bar">
  <span><strong>AET</strong> — {{ $empresa->nome }}</span>
  <div class="acoes">
    <button onclick="exportarCSV('tabela-mapeamento','mapeamento_ergonomico')">⤓ Mapeamento (CSV)</button>
    <button onclick="exportarCSV('tabela-planoacao','plano_de_acao')">⤓ Plano de Ação (CSV)</button>
    <button onclick="window.print()">⬇ Imprimir / Salvar PDF</button>
  </div>
</div>

@php
  $temCabecalho = isset($empresa->cabecalho);
  $temRodape    = isset($empresa->rodape);
  $temMarca     = !empty($identidade->marca_dagua);
  $upper = fn($s) => mb_strtoupper($s ?? '', 'UTF-8');

  /* CNPJ formatado — o banco guarda só dígitos */
  $fmtCnpj = function ($v) {
      $d = preg_replace('/\D/', '', (string) $v);
      return strlen($d) === 14
        ? substr($d,0,2).'.'.substr($d,2,3).'.'.substr($d,5,3).'/'.substr($d,8,4).'-'.substr($d,12,2)
        : $v;
  };

  /* Normalização do texto cru das ferramentas em rótulo curto + cor.
     O texto original continua disponível no title da célula e na legenda. */
  $nivel = function ($txt) {
      $t = mb_strtolower(trim(strip_tags((string) $txt)), 'UTF-8');
      if ($t === '') return ['rotulo' => '—', 'classe' => 'n-na'];
      $tem = fn(...$p) => array_reduce($p, fn($c,$x) => $c || str_contains($t, $x), false);

      if ($tem('imediatamente', 'risco muito alto', 'muito alto', 'inaceitável')) return ['rotulo' => 'Muito alto', 'classe' => 'n-crit'];
      if ($tem('condição ergonômica ruim', 'condicao ergonomica ruim', 'inadequad'))            return ['rotulo' => 'Inadequado', 'classe' => 'n-crit'];
      if ($tem('futuro próximo', 'futuro proximo', 'risco alto', 'elevado', 'em breve'))        return ['rotulo' => 'Alto',       'classe' => 'n-alto'];
      if ($tem('moderad', 'mais estudos', 'investigar'))                                        return ['rotulo' => 'Moderado',   'classe' => 'n-mod'];
      if ($tem('risco baixo', 'baixo risco', 'baixo'))                                          return ['rotulo' => 'Baixo',      'classe' => 'n-baixo'];
      if ($tem('boa condição', 'boa condicao', 'aceitáv', 'aceitav', 'adequad', 'satisfatór'))  return ['rotulo' => 'Adequado',   'classe' => 'n-ok'];
      return ['rotulo' => mb_strimwidth(trim(strip_tags((string) $txt)), 0, 28, '…', 'UTF-8'), 'classe' => 'n-na'];
  };

  /* Legenda: texto completo de cada classificação que aparece na tabela */
  $legendaMapa = [];
  foreach (($empresa->mapeamento ?? []) as $m) {
      $bruto = trim(strip_tags((string) $m->classificacao));
      if ($bruto === '') continue;
      $n = $nivel($bruto);
      $legendaMapa[$n['rotulo']] ??= ['classe' => $n['classe'], 'textos' => []];
      if (!in_array($bruto, $legendaMapa[$n['rotulo']]['textos'], true)) {
          $legendaMapa[$n['rotulo']]['textos'][] = $bruto;
      }
  }
@endphp

{{-- Cabeçalho / rodapé / marca d'água — repetidos em cada página na impressão --}}
@if($temCabecalho)
<div class="doc-header">
  <img src="/fotos-empresa-cabecalho/{{ $empresa->cabecalho->foto_empresa }}" alt="">
  <div class="meio">
    Análise Ergonômica do Trabalho<br>
    {{ $empresa->nome }} — CNPJ: {{ $fmtCnpj($empresa->cnpj) }}<br>
    {{ $empresa->periodo_inspecao }}
  </div>
  <img src="/fotos-empresa-produtor/{{ $empresa->cabecalho->foto_produtor }}" alt="">
</div>
@endif
@if($temRodape)
<div class="doc-footer"><img src="/fotos-empresa-rodape/{{ $empresa->rodape->foto }}" alt=""></div>
@endif
@if($temMarca)
<div class="marca-dagua"><img src="{{ url('marcadagua/'.$identidade->marca_dagua) }}" alt=""></div>
@endif

<div class="doc" id="content">

{{-- ═══════════════════ CAPA ═══════════════════ --}}
@if($identidade->tipo == 2)
<div class="page first">
  <svg class="capa-svg" viewBox="0 0 500 320">
    <path d="M 0 80 C 150 240 300 0 500 128 L 500 0 L 0 0" fill="{{ $identidade->cor_3 }}"></path>
    <path d="M 0 80 C 150 240 330 -48 500 80 L 500 0 L 0 0" fill="{{ $identidade->cor_1 }}" opacity="0.8"></path>
    <path d="M 0 80 C 215 240 250 0 500 160 L 500 0 L 0 0" fill="{{ $identidade->cor_2 }}" opacity="0.5"></path>
  </svg>
  <p style="font-size:26pt;text-align:center;font-weight:700;margin:40px 0;">{{ $empresa->titulo }}</p>
  <svg class="capa-svg" viewBox="0 0 500 300">
    <path d="M 0 225 C 150 75 300 300 500 180 L 500 300 L 0 300" fill="{{ $identidade->cor_3 }}"></path>
    <path d="M 0 225 C 150 75 330 345 500 225 L 500 300 L 0 300" fill="{{ $identidade->cor_1 }}" opacity="0.8"></path>
    <path d="M 0 225 C 215 75 250 300 500 150 L 500 300 L 0 300" fill="{{ $identidade->cor_2 }}" opacity="0.5"></path>
  </svg>
</div>
@elseif($identidade->tipo == 3)
<div class="page first capa-imagem"><img src="/capa/{{ $identidade->foto_capa }}" alt="Capa"></div>
@else
<div class="page first capa">
  <img src="/fotos-identidade/{{ $identidade->foto_empresa }}" class="logo" alt="">
  <h1>AET</h1>
  <div class="sub">Análise Ergonômica do Trabalho</div>
  <div class="sub" style="font-weight:400;">{{ $empresa->periodo_inspecao }}</div>
  @if(isset($empresa->photo))
  <img src="/fotos-empresas/{{ $empresa->photo }}" class="foto-empresa" alt="">
  @endif
  <div class="titulo-doc">{{ $empresa->titulo }}</div>
</div>
@endif

{{-- ═══════════════════ SUMÁRIO ═══════════════════ --}}
<div class="page sumario">
  <div class="titulo-secao">SUMÁRIO</div>
  <ul>
    <a href="#identificacao"><li><span class="t">Identificação da Empresa</span></li></a>
    <a href="#introducao"><li><span class="t">Introdução</span></li></a>
    <a href="#analise"><li><span class="t">Análise Ergonômica do Trabalho</span></li></a>
    @if(count($empresa->objetivos) > 0)
    <a href="#objetivos"><li><span class="t">Objetivos da Análise Ergonômica do Trabalho</span></li></a>
    @endif
    <a href="#metodologia"><li><span class="t">Metodologia Empregada</span></li></a>
    <a href="#demanda"><li><span class="t">Demanda</span></li></a>
    @if(isset($empresa->analise))
    <a href="#analiseglobal"><li><span class="t">Análise Global da Empresa</span></li></a>
    @endif
    <a href="#posto"><li><span class="t">Análise dos Postos de Trabalho</span></li></a>
    @foreach($empresa->area as $area)
      @foreach($area->setores as $setor)
      <a href="#setor-{{ $setor->id }}"><li class="sub"><span class="t">{{ $area->nome }} — {{ $setor->nome }}</span></li></a>
      @endforeach
    @endforeach
    @if(count($empresa->mapeamento) > 0)
    <a href="#mapeamentoergo"><li><span class="t">Mapeamento Ergonômico</span></li></a>
    @endif
    @if(count($empresa->planodeacao) > 0)
    <a href="#planoacao"><li><span class="t">Plano de Ação</span></li></a>
    @endif
    <a href="#disposicoes2"><li><span class="t">Disposições Finais</span></li></a>
    <a href="#encerramento2"><li><span class="t">Encerramento</span></li></a>
    <a href="#anexospage"><li><span class="t">Anexos</span></li></a>
  </ul>
</div>

{{-- ═══════════════════ IDENTIFICAÇÃO ═══════════════════ --}}
<div class="page" id="identificacao">
  <div class="titulo-secao">IDENTIFICAÇÃO DA EMPRESA</div>
  <table class="tab kv">
    <tr><td>Razão Social</td><td>{{ $empresa->nome }}</td></tr>
    <tr><td>Endereço</td><td>{{ $empresa->rua }}, {{ $empresa->numero }}</td></tr>
    <tr><td>Cidade/Estado</td><td>{{ $empresa->cidade }} – {{ $empresa->estado }}</td></tr>
    <tr><td>CEP</td><td>{{ $empresa->cep }}</td></tr>
    <tr><td>Telefone</td><td>{{ $empresa->telefone }}</td></tr>
    <tr><td>CNPJ</td><td>{{ $fmtCnpj($empresa->cnpj) }}</td></tr>
    <tr><td>Inscrição Estadual</td><td>{{ $empresa->inscricao_estadual ?? $empresa->ie ?? '—' }}</td></tr>
    <tr><td>Grau de Risco</td><td>{{ filled($empresa->grau_de_risco) ? $empresa->grau_de_risco : '—' }}</td></tr>
    <tr><td>CNAE</td><td id="atividadecapa"><script>atividadecapa('{{ preg_replace('/\D/', '', (string) $empresa->cnpj) }}')</script></td></tr>
    <tr><td>Ramo de Atividade</td><td>{{ $empresa->setor }}</td></tr>
    <tr><td>Período de Inspeção</td><td>{{ $empresa->periodo_inspecao }}</td></tr>
  </table>
</div>

{{-- ═══════════════════ INTRODUÇÃO ═══════════════════ --}}
@if(filled($empresa->introducao->introducao ?? null))
<div class="page" id="introducao">
  <div class="titulo-secao">INTRODUÇÃO</div>
  <div class="rich">{!! $empresa->introducao->introducao !!}</div>
</div>
@endif

{{-- ═══════════════════ AET ═══════════════════ --}}
<div class="page" id="analise">
  <div class="titulo-secao">ANÁLISE ERGONÔMICA DO TRABALHO</div>
  <p>Método que envolve um conjunto de etapas e ações que mantêm uma coerência interna, principalmente quanto à possibilidade de se questionar os resultados obtidos durante a coleta de dados, validando-os ao longo do processo e aproximando-os mais da realidade pesquisada. Na AET as hipóteses são construídas, validadas e/ou refutadas ao longo do processo. Essa abordagem permite revelar a complexidade do trabalhar. Pressupõe a utilização de distintas técnicas, cuja importância para a análise depende da problemática e da configuração da demanda.</p>
  <p>Assim, uma ação ergonômica comporta as seguintes fases:</p>
  <ul>
    <li>Análise da demanda</li>
    <li>Coleta de informações sobre a empresa</li>
    <li>Levantamento das características da população</li>
    <li>Escolha das situações de análise</li>
    <li>Análise do processo técnico e da tarefa</li>
    <li>Observações globais e abertas da atividade</li>
    <li>Elaboração de um pré-diagnóstico</li>
    <li>Observações globais sistemáticas – análise dos dados</li>
    <li>Validação</li>
    <li>Diagnóstico</li>
    <li>Recomendações e transformação</li>
  </ul>
  <p>Cada uma das fases deve integrar as bases da abordagem ergonômica que pressupõe:</p>
  <ul>
    <li>Estudo centrado na atividade real de trabalho</li>
    <li>Globalidade da situação de trabalho</li>
    <li>Consideração da variabilidade, tanto decorrente da tecnologia e da produção quanto a dos trabalhadores</li>
  </ul>
</div>

{{-- ═══════════════════ OBJETIVOS ═══════════════════ --}}
@if(count($empresa->objetivos) > 0)
<div class="page" id="objetivos">
  <div class="titulo-secao">OBJETIVOS DA ANÁLISE ERGONÔMICA DO TRABALHO</div>
  <ul class="rich">
    @foreach($empresa->objetivos as $objetivo)
    {!! $objetivo->objetivo !!}
    @endforeach
  </ul>
</div>
@endif

{{-- ═══════════════════ METODOLOGIA ═══════════════════ --}}
<div class="page" id="metodologia">
  <div class="titulo-secao">METODOLOGIA EMPREGADA</div>
  @php
    $texto = $empresa->metodologia->metodologia ?? '';
    if (strpos($texto, 'A metodologia de trabalho baseia-se:') !== false) {
      $texto = str_replace('A metodologia de trabalho baseia-se:',
        "A metodologia de trabalho baseia-se: <div class='bloco' style='text-align:center;margin:10px 0;'><img src='https://unyflex.com.br/storage/banners/ergo.jpeg' alt='Metodologia' style='max-width:280px'></div>",
        $texto);
    }
    /* Se o texto do cadastro já traz esses dois tópicos, não repetir os parágrafos fixos abaixo */
    $semTexto   = mb_strtolower(strip_tags($texto), 'UTF-8');
    $jaTemRitmo = str_contains($semTexto, 'ritmo de trabalho');
    $jaTemCog   = str_contains($semTexto, 'exigências cognitivas') || str_contains($semTexto, 'exigencias cognitivas');
  @endphp
  <div class="rich">{!! $texto !!}</div>

  @unless($jaTemRitmo)
  <p class="ferramenta"><b>RITMO DE TRABALHO</b> – Existe uma distinção entre ritmo e cadência. A cadência tem um aspecto quantitativo, o ritmo qualitativo. A cadência refere-se à velocidade dos movimentos que se repetem em uma dada unidade de tempo; o ritmo é a maneira como as cadências são ajustadas ou arranjadas: pode ser livre (quando o indivíduo tem autonomia para determinar sua própria cadência) ou imposto (por uma máquina, pela esteira da linha de montagem e até por incentivos à produção) – Teiger, 1985. Na empresa encontramos: o trabalho livre.</p>
  @endunless
  @unless($jaTemCog)
  <p class="ferramenta"><b>EXIGÊNCIAS COGNITIVAS</b> – Detectamos que, quanto ao conhecimento e à percepção para a realização das atividades, a maioria dos colaboradores tinha um bom preparo para a efetivação do trabalho.</p>
  @endunless

  <div class="titulo-secao sub">OBSERVAÇÕES IN LOCO E FOTOS – FERRAMENTAS ERGONÔMICAS</div>
  <p>Inicialmente foram realizadas as observações referentes à ergonomia dos postos de trabalho (condições dos mobiliários, das ferramentas, dos equipamentos, das posturas de trabalho, da iluminação, do ruído).</p>
  <p>Utilizamos questionários para entrevista com funcionários para identificar os problemas no posto de trabalho, para posteriormente aplicar as ferramentas validadas pertinentes.</p>
  <p>Foram utilizadas as seguintes ferramentas ergonômicas:</p>
  <p id="metodologia_moor" class="ferramenta"></p>
  <p id="metodologia_rula" class="ferramenta"></p>
  <p id="metodologia_owas" class="ferramenta"></p>
  <p id="metodologia_sue" class="ferramenta"></p>
  <p id="metodologia_niosh" class="ferramenta"></p>
  <p id="metodologia_ocra" class="ferramenta"></p>
  <p id="metodologia_checklist" class="ferramenta"></p>
  <p id="metodologia_rosa" class="ferramenta"></p>
  <p id="metodologia_reba" class="ferramenta"></p>
  <p id="metodologia_hal" class="ferramenta"></p>
</div>

{{-- ═══════════════════ DEMANDA ═══════════════════ --}}
@if(filled($empresa->demanda->demanda ?? null))
<div class="page" id="demanda">
  <div class="titulo-secao">DEMANDA</div>
  <div class="rich">{!! $empresa->demanda->demanda !!}</div>
</div>
@endif

{{-- ═══════════════════ ANÁLISE GLOBAL ═══════════════════ --}}
@if(filled($empresa->analise->analise ?? null))
<div class="page" id="analiseglobal">
  <div class="titulo-secao">ANÁLISE GLOBAL DA EMPRESA</div>
  <div class="rich">{!! $empresa->analise->analise !!}</div>
</div>
@endif

{{-- ═══════════════════ POSTOS DE TRABALHO ═══════════════════ --}}
<div class="page" id="posto">
  <div class="titulo-secao">ANÁLISE DOS POSTOS DE TRABALHO</div>
  <p>O documento contempla o levantamento ergonômico {{ count($empresa->area) > 1 ? 'das seguintes áreas:' : 'da seguinte área:' }}</p>
  <ul>
    @foreach($empresa->area as $area)
    <li><b>{{ $area->nome }}</b>
      @if(count($area->setores))
      <ul>
        @foreach($area->setores as $setor)
        <li>{{ $setor->nome }}
          @if(count($setor->subsetores))
          <span style="color:var(--ink2);">— {{ $setor->subsetores->pluck('nome')->join(', ') }}</span>
          @endif
        </li>
        @endforeach
      </ul>
      @endif
    </li>
    @endforeach
  </ul>
</div>

@foreach($empresa->area as $area)
@foreach($area->setores as $setor)

<div class="page" id="setor-{{ $setor->id }}">
  <div class="titulo-secao">ÁREA: {{ $upper($area->nome) }} · SETOR: {{ $upper($setor->nome) }}</div>
  <p>No setor <b>{{ $setor->nome }}</b>, foi realizado o levantamento ergonômico das atividades nos seguintes postos de trabalho:</p>
  <ul>
    @foreach($setor->subsetores as $subsetor)
    <li>{{ $subsetor->nome }}</li>
    @endforeach
  </ul>
</div>

@foreach($setor->subsetores as $subsetor)

{{-- ── Identificação do posto + descrição da tarefa (texto completo, flui entre páginas) ── --}}
<div class="page">
  <div class="titulo-secao">ÁREA: {{ $upper($area->nome) }}</div>
  <table class="tab kv bloco">
    <tr><td>Setor</td><td>{{ $setor->nome }}</td></tr>
    <tr><td>Posto de Trabalho</td><td>{{ $subsetor->nome }}</td></tr>
    @if(isset($subsetor->funcao))
    <tr><td>Função</td><td>{{ $subsetor->funcao->funcao }}</td></tr>
    @endif
    @if(isset($subsetor->tarefa))
    <tr><td>Tarefa</td><td>{{ $subsetor->tarefa->tarefa }}</td></tr>
    @endif
  </table>

  <div class="titulo-secao sub">DESCRIÇÃO DA TAREFA</div>
  <div class="rich">{!! $subsetor->descricao !!}</div>

  @if(filled($subsetor->analiseAtividade->analise ?? null))
  <div class="titulo-secao sub">ANÁLISE DA ATIVIDADE</div>
  <div class="rich">{!! $subsetor->analiseAtividade->analise !!}</div>
  @endif
</div>

{{-- ── Fotos ── --}}
@if(count($subsetor->fotosatividade) >= 1)
<div class="page">
  <div class="titulo-secao">FOTOS</div>
  <div class="fotos">
    @foreach($subsetor->fotosatividade->take(4) as $foto)
    <div class="foto"><img src="/fotos-atividades/{{ $foto->photo }}" alt="Foto da atividade"></div>
    @endforeach
  </div>
  <p class="fotos-legenda">
    @if(isset($subsetor->descricaoFotos)) {{ $subsetor->descricaoFotos->descricao }}
    @else Fotos – Funcionário executando atividade: {{ $subsetor->nome }} @endif
  </p>

  @if(count($subsetor->dadosOrganizacionais) > 0)
  <div class="titulo-secao sub">CARACTERÍSTICAS DA ORGANIZAÇÃO DO TRABALHO</div>
  <ul>
    @foreach($subsetor->dadosOrganizacionais as $dados)
    @php $partes = explode(':', $dados->dado, 2); @endphp
    <li><b>{{ trim($partes[0]) }}:</b> {{ isset($partes[1]) ? trim($partes[1]) : '' }}</li>
    @endforeach
  </ul>
  @endif
</div>
@elseif(count($subsetor->dadosOrganizacionais) > 0)
<div class="page">
  <div class="titulo-secao">CARACTERÍSTICAS DA ORGANIZAÇÃO DO TRABALHO</div>
  <ul>
    @foreach($subsetor->dadosOrganizacionais as $dados)
    @php $partes = explode(':', $dados->dado, 2); @endphp
    <li><b>{{ trim($partes[0]) }}:</b> {{ isset($partes[1]) ? trim($partes[1]) : '' }}</li>
    @endforeach
  </ul>
</div>
@endif

{{-- ── População ── --}}
@if(count($subsetor->populacaosubsetor) >= 1)
<script>
  var graficos{{ $subsetor->id }} = calcularEstatisticas(@json($subsetor->populacaosubsetor), {{ $subsetor->id }});
</script>
<div class="page">
  <div class="titulo-secao">CARACTERÍSTICAS DA POPULAÇÃO</div>
  <div class="graficos-grid">
    <div class="grafico"><div class="legenda-grafico">Gênero</div><div class="canvas"><canvas id="genero{{ $subsetor->id }}"></canvas></div></div>
    <div class="grafico"><div class="legenda-grafico">Faixa Etária</div><div class="canvas"><canvas id="faixaetaria{{ $subsetor->id }}"></canvas></div></div>
    <div class="grafico"><div class="legenda-grafico">Tempo de Admissão</div><div class="canvas"><canvas id="tempoadmissao{{ $subsetor->id }}"></canvas></div></div>
    <div class="grafico"><div class="legenda-grafico">Escolaridade</div><div class="canvas"><canvas id="escolaridade{{ $subsetor->id }}"></canvas></div></div>
  </div>
  <script>
    filaGraficos.push(function () {
      var g = graficos{{ $subsetor->id }};
      barras('genero{{ $subsetor->id }}',        g.genero.labels,        g.genero.data);
      barras('faixaetaria{{ $subsetor->id }}',   g.faixaetaria.labels,   g.faixaetaria.data);
      barras('tempoadmissao{{ $subsetor->id }}', g.tempoadmissao.labels, g.tempoadmissao.data);
      barras('escolaridade{{ $subsetor->id }}',  g.escolaridade.labels,  g.escolaridade.data);
    });
  </script>
</div>
@endif

{{-- ── Dados de saúde ── --}}
@if(isset($subsetor->dadossaude))
@php
  $sim = (int) $subsetor->dadossaude->sim; $nao = (int) $subsetor->dadossaude->nao;
  $tot = max($sim + $nao, 1);
  $pSim = round($sim / $tot * 100); $pNao = round($nao / $tot * 100);
  $seg = $subsetor->dadossaude->segmentos ?? null;
  $segDados = [];
  if ($seg) {
    $mapa = ['Coluna Cervical'=>'coluna_cervical','Coluna Torácica'=>'coluna_toracica','Coluna Lombar'=>'coluna_lombar','Ombro'=>'ombro','Cotovelo'=>'cotovelo','Punho/Mão'=>'punho_mao','Quadril'=>'quadril','Joelho'=>'joelho','Pé/Tornozelo'=>'tornozelo'];
    $totSeg = 0; foreach ($mapa as $c) { $totSeg += (int)($seg->$c ?? 0); }
    if ($totSeg > 0) { foreach ($mapa as $l => $c) { $segDados[$l] = round((int)($seg->$c ?? 0) / $totSeg * 100); } }
  }
@endphp
<div class="page">
  <div class="titulo-secao">DADOS DE SAÚDE</div>
  <p>Por meio de uma entrevista individualizada (com participação de 100% dos trabalhadores do setor) foi aplicado um questionário com questões abertas com a finalidade de identificar os principais desconfortos referidos pelos trabalhadores e que podem influenciar o seu desempenho durante o processo de trabalho.</p>
  <div class="graficos-grid">
    <div class="grafico largo">
      <div class="legenda-grafico">{{ $subsetor->dadossaude->titulo }}</div>
      <div class="canvas"><canvas id="dadosaude{{ $subsetor->id }}"></canvas></div>
    </div>
    <div class="grafico largo">
      <div class="legenda-grafico" id="segmentocorporal{{ $subsetor->id }}">{{ count($segDados) ? 'Segmento Corporal' : 'Segmento Corporal — Não há queixas' }}</div>
      @if(count($segDados))<div class="canvas"><canvas id="segmento{{ $subsetor->id }}"></canvas></div>@endif
    </div>
  </div>
  <script>
    filaGraficos.push(function () {
      barras('dadosaude{{ $subsetor->id }}', ['Sim','Não'], [{{ $pSim }}, {{ $pNao }}]);
      @if(count($segDados))
      barras('segmento{{ $subsetor->id }}', @json(array_keys($segDados)), @json(array_values($segDados)), 8);
      @endif
    });
  </script>
</div>
@endif

{{-- ── Ambiente de trabalho + pré-diagnóstico ── --}}
@if(count($subsetor->caracteristicas) >= 1 || count($subsetor->preDiagnostico) > 0)
<div class="page">
  @if(count($subsetor->caracteristicas) >= 1)
  <div class="titulo-secao">CARACTERÍSTICAS DO AMBIENTE DE TRABALHO</div>
  @php
    $ordem = ['Postura de Trabalho:','Descrição do Posto de Trabalho:','Medidas da Bancada de Trabalho:','Altura:','Descrição dos Equipamentos/Ferramentas de Trabalho:','Descrição dos Equipamentos de Segurança:','Acessórios Ergonômicos:'];
    $norm = fn($t) => substr($t, -1) === ':' ? $t : $t.':';
    $ordenadas = collect($subsetor->caracteristicas)->sortBy(function ($c) use ($ordem, $norm) {
      $i = array_search($norm($c->titulo), $ordem); return $i === false ? 99 : $i;
    });
  @endphp
  <ul>
    @foreach($ordenadas as $c)
    <li><b>{{ $norm($c->titulo) }}</b> {{ strip_tags($c->descricao) }}</li>
    @endforeach
  </ul>
  @endif

  @if(count($subsetor->preDiagnostico) > 0)
  <div class="titulo-secao {{ count($subsetor->caracteristicas) ? 'sub' : '' }}">PRÉ-DIAGNÓSTICO</div>
  <ul>
    @foreach($subsetor->preDiagnostico as $d)
    <li><b>{{ substr($d->titulo, -1) === ':' ? $d->titulo : $d->titulo.':' }}</b> {{ $d->descricao }}</li>
    @endforeach
  </ul>
  @endif
</div>
@endif

{{-- ── Diagnóstico (ferramentas) ── --}}
@if(count($subsetor->conclusoes) > 0 || count($subsetor->moore) > 0 || count($subsetor->rula) > 0 || count($subsetor->owas) > 0 || count($subsetor->suerodgers) > 0 || isset($subsetor->ChecklistCadeira))
<div class="page">
  <div class="titulo-secao">DIAGNÓSTICO</div>
  <table class="tab">
    <thead><tr><th style="width:36%;">Ferramenta</th><th style="width:32%;">Resultado</th><th>Região Corpórea</th></tr></thead>
    <tbody>
      @foreach($subsetor->moore as $moore)
      <tr>
        <td><b>MOORE E GARG</b><br><span style="font-size:9pt;">(Análise de risco para punhos e mãos)</span><br>Atividade: {{ $moore->atividade }}.</td>
        <td id="conclusaomoore{{ $moore->id }}"></td>
        <td>Punhos, Mãos e Dedos</td>
      </tr>
      <script>mooregarg({{ $moore->fit }},{{ $moore->fde }},{{ $moore->ffe }},{{ $moore->fpmp }},{{ $moore->fri }},{{ $moore->fdt }},{{ $moore->id }});</script>
      @endforeach

      @foreach($subsetor->conclusoes as $conclusao)
      <tr>
        <td><b>{{ $conclusao->ferramenta }}</b><p id="textomemrbos{{ $conclusao->id }}" style="font-size:9pt;margin:2px 0;"></p>Atividade: {{ $conclusao->atividade }}.</td>
        <td id="conclusao{{ $conclusao->id }}">{{ $conclusao->conclusao }}</td>
        <td id="membros{{ $conclusao->id }}"></td>
      </tr>
      <script>conclusao('{{ addslashes($conclusao->conclusao) }}', '{{ addslashes($conclusao->ferramenta) }}', '{{ $conclusao->id }}', '{{ addslashes($conclusao->membro) }}');</script>
      @endforeach

      @foreach($subsetor->rula as $rula)
      <tr>
        <td><b>RULA</b><br><span style="font-size:9pt;">(Avaliação de fatores de risco para distúrbios músculo-esqueléticos dos membros superiores)</span><br>Atividade: {{ $rula->atividade }}.</td>
        <td id="conclusaorula{{ $loop->index }}"></td>
        <td>Pescoço, Ombros, Braços, Antebraços, Punhos, Mãos e Dedos</td>
      </tr>
      <script>rula({{ $rula->braco }},{{ $rula->braco_desvio }},{{ $rula->antebraco }},{{ $rula->antebraco_desvio }},{{ $rula->punho }},{{ $rula->punho_desvio }},{{ $rula->pescoco }},{{ $rula->pescoco_desvio }},{{ $rula->tronco }},{{ $rula->tronco_desvio }},{{ $rula->perna }},{{ $loop->index }});</script>
      @endforeach

      @foreach($subsetor->owas as $owas)
      <tr>
        <td><b>OWAS</b><br><span style="font-size:9pt;">(Detecção de posturas inadequadas)</span><br>Atividade: {{ $owas->atividade }}.</td>
        <td id="conclusaoowas{{ $loop->index }}"></td>
        <td>Dorso, Braços, Pernas e Carga</td>
      </tr>
      <script>owas({{ $owas->dorso }},{{ $owas->braco }},{{ $owas->pernas }},{{ $owas->carga }},{{ $loop->index }});</script>
      @endforeach

      @foreach($subsetor->suerodgers as $sue)
      <tr>
        <td><b>SUE RODGERS</b><br>Atividade: {{ $sue->atividade }}.</td>
        <td id="conclusaosue{{ $loop->index }}"></td>
        <td>Pescoço, Ombros, Tronco, Braços, Mãos e Pernas</td>
      </tr>
      <script>suerodgers(['Pescoço -{{ $sue->pescoco }}','Ombros -{{ $sue->ombro }}','Tronco -{{ $sue->tronco }}','Braco -{{ $sue->braco }}','Mãos -{{ $sue->mao_punho_dedo }}','Pernas -{{ $sue->perna_pe_dedo }}'], {{ $loop->index }});</script>
      @endforeach

      @if(isset($subsetor->ChecklistCadeira))
      <tr>
        <td><b>CHECKLIST DE ANÁLISE DAS CONDIÇÕES DO POSTO DE TRABALHO AO COMPUTADOR</b><br>Atividade: {{ $subsetor->ChecklistCadeira->atividade }}.</td>
        <td>{{ $subsetor->ChecklistCadeira->resultado }}</td>
        {{-- antes era o texto fixo "Boa Condição Ergonômica", que contradizia o resultado --}}
        <td>{{ $subsetor->ChecklistCadeira->membro ?? $subsetor->ChecklistCadeira->regiao ?? 'Pescoço, Ombros, Coluna, Punhos e Mãos' }}</td>
      </tr>
      @endif
    </tbody>
  </table>

  @if(filled($subsetor->conclusao->conclusao ?? null))
  <div class="titulo-secao sub">CONCLUSÃO</div>
  <div class="rich">{!! $subsetor->conclusao->conclusao !!}</div>
  @endif
</div>
@elseif(filled($subsetor->conclusao->conclusao ?? null))
<div class="page">
  <div class="titulo-secao">CONCLUSÃO</div>
  <div class="rich">{!! $subsetor->conclusao->conclusao !!}</div>
</div>
@endif

{{-- ── Recomendações ── --}}
@if(count($subsetor->recomendacao) >= 1)
<div class="page">
  <div class="titulo-secao">RECOMENDAÇÕES TÉCNICAS E SUGESTÕES DE ADEQUAÇÕES</div>
  <ul>
    @foreach($subsetor->recomendacao as $r)
    <li>{{ $r->recomendacao }}</li>
    @endforeach
  </ul>
</div>
@endif

@endforeach {{-- subsetores --}}
@endforeach {{-- setores --}}
@endforeach {{-- áreas --}}

{{-- ═══════════════════ MAPEAMENTO ERGONÔMICO (paisagem) ═══════════════════ --}}
@if(count($empresa->mapeamento) > 0)
<div class="page paisagem" id="mapeamentoergo">
  <div class="titulo-secao">MAPEAMENTO ERGONÔMICO</div>
  <p class="aviso-paisagem">Esta seção é impressa em orientação paisagem.</p>
  <table class="tab larga" id="tabela-mapeamento">
    <thead>
      <tr>
        <th style="width:8%;">Área</th>
        <th style="width:9%;">Setor</th>
        <th style="width:12%;">Posto de Trabalho</th>
        <th style="width:13%;">Função</th>
        <th style="width:17%;">Atividade</th>
        <th style="width:7%;">Postura</th>
        <th style="width:12%;">Exigência da Atividade</th>
        <th style="width:12%;">Sobrecarga</th>
        <th style="width:10%;">Classificação</th>
      </tr>
    </thead>
    <tbody>
      @foreach($empresa->mapeamento as $m)
      @php $n = $nivel($m->classificacao); @endphp
      <tr>
        <td>{{ $m->area }}</td>
        <td>{{ $m->setor }}</td>
        <td>{{ $m->posto_trabalho }}</td>
        <td>{{ $m->funcao }}</td>
        <td>{{ $m->atividade }}</td>
        <td>{{ $m->postura }}</td>
        <td>{{ $m->exigencia }}</td>
        <td>{{ $m->sobrecarga }}</td>
        <td class="c" data-csv="{{ trim(strip_tags((string) $m->classificacao)) }}" title="{{ trim(strip_tags((string) $m->classificacao)) }}">
          <span class="nivel {{ $n['classe'] }}">{{ $n['rotulo'] }}</span>
        </td>
      </tr>
      @endforeach
    </tbody>
  </table>

  @if(count($legendaMapa))
  <div class="legenda-tab bloco">
    <b>Legenda da coluna Classificação</b> — resultado integral emitido por cada ferramenta:
    <ul>
      @foreach($legendaMapa as $rotulo => $info)
      <li><span class="nivel {{ $info['classe'] }}">{{ $rotulo }}</span> — {{ implode(' / ', $info['textos']) }}</li>
      @endforeach
    </ul>
  </div>
  @endif
</div>
@endif

{{-- ═══════════════════ PLANO DE AÇÃO (paisagem) ═══════════════════ --}}
@if(count($empresa->planodeacao) > 0)
<div class="page paisagem" id="planoacao">
  <div class="titulo-secao">PLANO DE AÇÃO</div>
  <p class="aviso-paisagem">Esta seção é impressa em orientação paisagem.</p>
  <table class="tab larga" id="tabela-planoacao">
    <thead>
      <tr>
        <th style="width:8%;">Área</th>
        <th style="width:9%;">Setor</th>
        <th style="width:12%;">Posto de Trabalho</th>
        <th style="width:12%;">Função</th>
        <th style="width:12%;">Exigência da Atividade</th>
        <th style="width:29%;">Melhoria</th>
        <th style="width:9%;">Viabilidade</th>
        <th style="width:9%;">Prazo</th>
      </tr>
    </thead>
    <tbody>
      @foreach($empresa->planodeacao as $p)
      <tr>
        <td>{{ $p->area }}</td>
        <td>{{ $p->setor }}</td>
        <td>{{ $p->posto_trabalho }}</td>
        <td>{{ $p->funcao }}</td>
        <td>{{ $p->exigencia }}</td>
        <td>{{ $p->recomendacao }}</td>
        <td class="c">{{ filled($p->viabilidade) ? $p->viabilidade : '—' }}</td>
        <td class="c">{{ filled($p->prazo) ? $p->prazo : '—' }}</td>
      </tr>
      @endforeach
    </tbody>
  </table>
</div>
@endif

{{-- ═══════════════════ DISPOSIÇÕES FINAIS ═══════════════════ --}}
@if(filled($empresa->disposicao->disposicao ?? null))
<div class="page" id="disposicoes2">
  <div class="titulo-secao">DISPOSIÇÕES FINAIS</div>
  <div class="rich">{!! $empresa->disposicao->disposicao !!}</div>
</div>
@endif

{{-- ═══════════════════ ENCERRAMENTO ═══════════════════ --}}
<div class="page" id="encerramento2">
  <div class="titulo-secao">ENCERRAMENTO: {{ $empresa->nome }}</div>
  <p style="font-size:13pt;">Este documento é composto de <span id="paginas">—</span> páginas impressas somente no anverso, devidamente rubricadas.</p>
  <p style="font-size:13pt;">A reavaliação da ANÁLISE ERGONÔMICA DO TRABALHO deverá ser realizada assim que houver qualquer alteração dos postos de trabalho ou atividade.</p>
  <p style="font-size:13pt;">{{ $dataExtenso }}</p>

  <h3 style="text-align:center;margin-top:36px;">Responsabilidade pela elaboração</h3>
  <div class="assinaturas">
    @foreach($empresa->responsaveis as $responsavel)
    <div class="assinatura">
      @if(!empty($responsavel->foto))
      <img src="/fotos-assinaturas/{{ $responsavel->foto }}" alt="">
      @else
      <div style="height:80px;"></div>
      @endif
      <div class="linha"></div>
      <p><b>{{ $responsavel->nome }}</b></p>
      <p>{{ $responsavel->cargo }}</p>
      <p>{{ $responsavel->identidade_trabalho }}</p>
    </div>
    @endforeach
  </div>
</div>

{{-- ═══════════════════ ANEXOS (preenchido pelo JS ver_ferramentas) ═══════════════════ --}}
<div class="page" id="anexospage"></div>

</div>{{-- .doc --}}

<script>
/* ═══════════════ Gráficos (Chart.js) ═══════════════
   Substitui o AnyChart, que estampava "UNLICENSED / Trial Use Only"
   em cima de todos os gráficos do laudo. Mesma assinatura de antes:
   barras(idDoCanvas, labels, valores, tamanhoDaFonte). */
var filaGraficos = [];

function barras(canvasId, labels, values, fontSize) {
  var el = document.getElementById(canvasId);
  if (!el || !labels || !labels.length) return;

  var paleta = ['#FF5733','#FFC300','#3498DB','#32CD32','#FF9900','#66CCCC','#993366','#996633','#0099CC'];
  var fonte  = fontSize || 10;

  // plugin local: escreve o valor em cima de cada barra
  var rotulos = {
    id: 'rotulosNoTopo',
    afterDatasetsDraw: function (chart) {
      var ctx = chart.ctx;
      ctx.save();
      ctx.font = '600 ' + fonte + 'px Poppins, Arial, sans-serif';
      ctx.fillStyle = '#111';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      chart.getDatasetMeta(0).data.forEach(function (barra, i) {
        ctx.fillText(chart.data.datasets[0].data[i] + '%', barra.x, barra.y - 4);
      });
      ctx.restore();
    }
  };

  new Chart(el.getContext('2d'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: labels.map(function (_, i) { return paleta[i % paleta.length]; }),
        borderColor: 'rgba(0,0,0,.15)',
        borderWidth: 1,
        borderRadius: 3,
        maxBarThickness: 70
      }]
    },
    options: {
      animation: false,
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: 3,               // impressão nítida
      layout: { padding: { top: 18 } },
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: fonte, family: 'Poppins, Arial, sans-serif' }, autoSkip: false, maxRotation: 0, minRotation: 0 } },
        y: { min: 0, max: 100, ticks: { stepSize: 25, font: { size: fonte }, callback: function (v) { return v + '%'; } }, grid: { color: '#e5e7eb' } }
      }
    },
    plugins: [rotulos]
  });
}

/* ═══════════════ Anexos: título e imagem sempre juntos ═══════════════
   O ver_ferramentas injeta título + imagem soltos; quando a imagem não
   cabia embaixo do título, o Chrome quebrava a página e sobrava folha
   em branco. Aqui cada par vira um bloco indivisível. */
function normalizarAnexos() {
  var box = document.getElementById('anexospage');
  if (!box) return;

  box.querySelectorAll('img').forEach(function (img) {
    img.style.maxWidth  = '100%';
    img.style.maxHeight = '195mm';
    img.style.objectFit = 'contain';
  });

  var filhos = Array.prototype.slice.call(box.children);
  filhos.forEach(function (el) {
    if (el.classList && el.classList.contains('bloco-anexo')) return;
    var ehTitulo = /^H[1-6]$/.test(el.tagName) || (el.classList && el.classList.contains('titulo-secao'));
    if (!ehTitulo) return;

    var wrap = document.createElement('div');
    wrap.className = 'bloco-anexo';
    el.parentNode.insertBefore(wrap, el);
    wrap.appendChild(el);

    // agrega o que vier depois até o próximo título
    var prox = wrap.nextElementSibling;
    while (prox) {
      var proxEhTitulo = /^H[1-6]$/.test(prox.tagName) || (prox.classList && prox.classList.contains('titulo-secao'));
      if (proxEhTitulo) break;
      var seguinte = prox.nextElementSibling;
      wrap.appendChild(prox);
      prox = seguinte;
    }
  });
}

/* ═══════════════ Remove páginas sem conteúdo ═══════════════ */
function removerPaginasVazias() {
  document.querySelectorAll('.page').forEach(function (p) {
    var temTexto = p.textContent.replace(/\s+/g, '') !== '';
    var temMidia = p.querySelector('img, canvas, svg, table');
    if (!temTexto && !temMidia) p.remove();
  });
}

/* ═══════════════ Contagem de páginas (retrato + paisagem) ═══════════════ */
function estimarPaginas() {
  var utilRetrato  = 934;   // 247mm de área útil ≈ 934px
  var utilPaisagem = 570;   // A4 deitado com as mesmas margens
  var total = 0;
  document.querySelectorAll('.page').forEach(function (p) {
    var util = p.classList.contains('paisagem') ? utilPaisagem : utilRetrato;
    total += Math.max(1, Math.ceil(p.getBoundingClientRect().height / util));
  });
  return total;
}

/* ═══════════════ Exportar tabela para CSV (abre limpo no Excel) ═══════════════ */
function exportarCSV(tabelaId, nomeArquivo) {
  var tab = document.getElementById(tabelaId);
  if (!tab) { alert('Tabela não encontrada nesta página.'); return; }

  var linhas = [];
  tab.querySelectorAll('tr').forEach(function (tr) {
    var cels = [];
    tr.querySelectorAll('th, td').forEach(function (c) {
      var txt = c.getAttribute('data-csv') || c.textContent;
      txt = txt.replace(/\s+/g, ' ').trim().replace(/"/g, '""');
      cels.push('"' + txt + '"');
    });
    if (cels.length) linhas.push(cels.join(';'));
  });

  var blob = new Blob(['\ufeff' + linhas.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = nomeArquivo + '.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}

window.addEventListener('load', function () {
  // 1) desenha os gráficos
  filaGraficos.forEach(function (fn) { try { fn(); } catch (e) { console.error(e); } });

  // 2) espera o ver_ferramentas montar os anexos, depois arruma tudo
  setTimeout(function () {
    try { normalizarAnexos(); } catch (e) { console.error(e); }
    removerPaginasVazias();

    var total = estimarPaginas();
    var alvo = document.getElementById('paginas');
    if (alvo) alvo.textContent = total;

    document.getElementById('loader').style.display = 'none';
  }, 1400);

  // ver_ferramentas continua sendo chamado como antes
  if (typeof ver_ferramentas === 'function') {
    try { ver_ferramentas(estimarPaginas()); } catch (e) { console.error(e); }
    setTimeout(function () {
      try { normalizarAnexos(); } catch (e) {}
      removerPaginasVazias();
      var alvo = document.getElementById('paginas');
      if (alvo) alvo.textContent = estimarPaginas();
    }, 1800);
  }
});
</script>
</body>
</html>