<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard ARP — {{ $empresa->nome }}</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts@3.44.0/dist/apexcharts.min.js"></script>

    <style>
        :root {
            --bg:       #0A0E1A;
            --bg-2:     #0F1422;
            --bg-3:     #151B2E;
            --bg-card:  #111827;
            --border:   rgba(255,255,255,0.07);
            --border-2: rgba(255,255,255,0.12);
            --cyan:     #00D4FF;
            --cyan-dim: rgba(0,212,255,0.15);
            --cyan-glow:rgba(0,212,255,0.35);
            --blue:     #3B82F6;
            --purple:   #8B5CF6;
            --text-1:   #F1F5F9;
            --text-2:   #94A3B8;
            --text-3:   #64748B;
            --risk-ex:  #FF2D55;
            --risk-el:  #FF6B00;
            --risk-mo:  #FFD60A;
            --risk-bx:  #30D158;
            --risk-in:  #636366;
            --font:     'Outfit', sans-serif;
            --mono:     'JetBrains Mono', monospace;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; background: var(--bg); color: var(--text-1); font-family: var(--font); }

        /* ── Layout ── */
        .shell { display: flex; flex-direction: column; min-height: 100vh; }

        .topbar {
            height: 56px;
            background: var(--bg-2);
            border-bottom: 1px solid var(--border);
            display: flex;
            align-items: center;
            padding: 0 28px;
            gap: 20px;
            position: sticky;
            top: 0;
            z-index: 10;
        }
        .topbar-back {
            display: flex;
            align-items: center;
            gap: 6px;
            color: var(--text-2);
            text-decoration: none;
            font-size: 13px;
            font-weight: 500;
            transition: color 0.15s;
        }
        .topbar-back:hover { color: var(--cyan); }
        .topbar-title {
            font-size: 15px;
            font-weight: 700;
            color: var(--text-1);
            letter-spacing: -0.01em;
        }
        .topbar-tag {
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--cyan);
            background: var(--cyan-dim);
            border: 1px solid var(--cyan-glow);
            border-radius: 20px;
            padding: 3px 10px;
        }
        .topbar-right { margin-left: auto; display: flex; align-items: center; gap: 10px; }
        .topbar-company {
            font-size: 13px;
            color: var(--text-2);
        }
        .topbar-company strong { color: var(--text-1); }

        .page { flex: 1; padding: 28px 32px; max-width: 1400px; margin: 0 auto; width: 100%; }

        /* ── Section label ── */
        .section-label {
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: var(--text-3);
            margin-bottom: 14px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .section-label::after {
            content: '';
            flex: 1;
            height: 1px;
            background: var(--border);
        }

        /* ── KPI Cards ── */
        .kpi-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
            margin-bottom: 28px;
        }
        .kpi-card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 22px 24px;
            position: relative;
            overflow: hidden;
            transition: border-color 0.2s;
        }
        .kpi-card:hover { border-color: var(--border-2); }
        .kpi-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 2px;
            background: var(--accent, var(--cyan));
        }
        .kpi-label {
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--text-3);
            margin-bottom: 10px;
        }
        .kpi-value {
            font-size: 36px;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: var(--text-1);
            line-height: 1;
            margin-bottom: 6px;
            font-family: var(--mono);
        }
        .kpi-sub {
            font-size: 12.5px;
            color: var(--text-2);
        }
        .kpi-badge {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
            margin-top: 6px;
        }

        /* ── Charts row ── */
        .charts-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
            margin-bottom: 28px;
        }
        .chart-card {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 14px;
            padding: 24px;
        }
        .chart-card-title {
            font-size: 13px;
            font-weight: 600;
            color: var(--text-1);
            margin-bottom: 4px;
        }
        .chart-card-sub {
            font-size: 12px;
            color: var(--text-3);
            margin-bottom: 20px;
        }
        .chart-wrap {
            position: relative;
        }

        /* ── Risk badge ── */
        .risk-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 5px 14px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.03em;
        }
        .risk-badge.extremo    { background: rgba(255,45,85,0.15);   color: #FF2D55; border: 1px solid rgba(255,45,85,0.3); }
        .risk-badge.elevado    { background: rgba(255,107,0,0.15);   color: #FF6B00; border: 1px solid rgba(255,107,0,0.3); }
        .risk-badge.moderado   { background: rgba(255,214,10,0.15);  color: #FFD60A; border: 1px solid rgba(255,214,10,0.3); }
        .risk-badge.baixo      { background: rgba(48,209,88,0.15);   color: #30D158; border: 1px solid rgba(48,209,88,0.3); }
        .risk-badge.insignificante { background: rgba(99,99,102,0.2); color: #9CA3AF; border: 1px solid rgba(99,99,102,0.3); }

        /* ── Category table ── */
        .cat-table {
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 14px;
            overflow: hidden;
            margin-bottom: 28px;
        }
        .cat-table-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 18px 24px;
            border-bottom: 1px solid var(--border);
        }
        .cat-table-title {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-1);
        }
        .cat-row {
            display: grid;
            grid-template-columns: 1fr 120px 140px 100px;
            align-items: center;
            padding: 14px 24px;
            border-bottom: 1px solid var(--border);
            gap: 16px;
            transition: background 0.15s;
        }
        .cat-row:last-child { border-bottom: none; }
        .cat-row:hover { background: rgba(255,255,255,0.03); }
        .cat-row-header {
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--text-3);
        }
        .cat-nome {
            font-size: 13.5px;
            font-weight: 500;
            color: var(--text-1);
        }
        .cat-score-bar {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .cat-score-track {
            height: 4px;
            background: var(--border);
            border-radius: 2px;
            overflow: hidden;
        }
        .cat-score-fill {
            height: 100%;
            border-radius: 2px;
            transition: width 0.8s ease;
        }
        .cat-score-val {
            font-size: 11px;
            color: var(--text-3);
            font-family: var(--mono);
        }
        .cat-recomendacao {
            font-size: 12px;
            color: var(--text-3);
            line-height: 1.4;
            margin-top: 4px;
            display: none;
            padding: 10px 0;
        }
        .cat-row-expandable { flex-direction: column; align-items: flex-start; cursor: pointer; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
            .kpi-row { grid-template-columns: 1fr 1fr; }
            .charts-row { grid-template-columns: 1fr; }
            .cat-row { grid-template-columns: 1fr 100px 80px; }
        }
        @media (max-width: 600px) {
            .page { padding: 16px; }
            .kpi-row { grid-template-columns: 1fr; }
            .cat-row { grid-template-columns: 1fr 80px; }
        }
    </style>
</head>
<body>
<div class="shell">

    {{-- Topbar --}}
    <header class="topbar">
        <a href="{{ url()->previous() }}" class="topbar-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
            Voltar
        </a>
        <div style="width:1px;height:20px;background:var(--border);"></div>
        <span class="topbar-title">Dashboard ARP</span>
        <span class="topbar-tag">Análise de Riscos Psicossociais</span>
        <div class="topbar-right">
            <span class="topbar-company"><strong>{{ $empresa->nome }}</strong></span>
        </div>
    </header>

    <div class="page">

        {{-- KPIs --}}
        <div class="section-label">Indicadores gerais</div>

        @php
            $nivelGeral = $dados['nivel_geral'];
            $nivelClass = strtolower(str_replace(' ', '-', $nivelGeral['label']));
            $maiorRisco = $dados['maior_risco'];
        @endphp

        <div class="kpi-row">

            {{-- Participantes --}}
            <div class="kpi-card" style="--accent: #00D4FF;">
                <div class="kpi-label">Respondentes</div>
                <div class="kpi-value">{{ $dados['participantes'] }}</div>
                <div class="kpi-sub">funcionários participaram da pesquisa</div>
            </div>

            {{-- Risco geral --}}
            <div class="kpi-card" style="--accent: {{ $nivelGeral['cor'] }};">
                <div class="kpi-label">Risco Geral</div>
                <div class="kpi-value" style="color: {{ $nivelGeral['cor'] }};">
                    {{ number_format($dados['score_geral'], 1) }}
                    <span style="font-size:16px;color:var(--text-3);font-family:var(--font);">/20</span>
                </div>
                <span class="risk-badge {{ $nivelClass }}">
                    <span style="width:6px;height:6px;border-radius:50%;background:currentColor;display:inline-block;"></span>
                    {{ $nivelGeral['label'] }} ({{ $nivelGeral['codigo'] }})
                </span>
            </div>

            {{-- Maior risco --}}
            @if($maiorRisco)
            @php $mrClass = strtolower(str_replace(' ', '-', $maiorRisco['nivel'])); @endphp
            <div class="kpi-card" style="--accent: {{ $maiorRisco['cor'] }};">
                <div class="kpi-label">Categoria Crítica</div>
                <div class="kpi-value" style="font-size:18px;color:{{ $maiorRisco['cor'] }};line-height:1.3;margin-bottom:10px;">
                    {{ $maiorRisco['nome'] }}
                </div>
                <span class="risk-badge {{ $mrClass }}">
                    <span style="width:6px;height:6px;border-radius:50%;background:currentColor;display:inline-block;"></span>
                    Score {{ $maiorRisco['score'] }} · {{ $maiorRisco['nivel'] }}
                </span>
            </div>
            @else
            <div class="kpi-card" style="--accent: #636366;">
                <div class="kpi-label">Categoria Crítica</div>
                <div class="kpi-value" style="font-size:20px;color:var(--text-3);">Sem dados</div>
                <div class="kpi-sub">Nenhum respondente ainda</div>
            </div>
            @endif
        </div>

        {{-- Charts --}}
        <div class="section-label">Visualizações</div>
        <div class="charts-row">

            {{-- Radar --}}
            <div class="chart-card">
                <div class="chart-card-title">Polígono de Risco</div>
                <div class="chart-card-sub">Distribuição por categoria psicossocial</div>
                <div class="chart-wrap" style="height:340px;">
                    <canvas id="radarChart"></canvas>
                </div>
            </div>

            {{-- Barras --}}
            <div class="chart-card">
                <div class="chart-card-title">Distribuição por Faixa de Risco</div>
                <div class="chart-card-sub">Número de categorias em cada nível</div>
                <div class="chart-wrap" style="height:340px;">
                    <canvas id="barChart"></canvas>
                </div>
            </div>

        </div>

        {{-- Category table --}}
        <div class="section-label">Detalhamento por categoria</div>
        <div class="cat-table">
            <div class="cat-table-header">
                <span class="cat-table-title">
                    {{ count($dados['categorias']) }} categorias avaliadas
                </span>
                <span style="font-size:12px;color:var(--text-3);">Clique em uma linha para ver a recomendação</span>
            </div>

            <div class="cat-row cat-row-header">
                <span>Categoria</span>
                <span>Score (0–20)</span>
                <span>Nível</span>
                <span>Respondentes</span>
            </div>

            @foreach($dados['categorias'] as $cat)
            @php $catClass = strtolower(str_replace([' ', '/'], ['-', ''], $cat['nivel'])); @endphp
            <div class="cat-row" onclick="toggleReco(this)" style="cursor:pointer;flex-direction:column;align-items:stretch;">
                <div style="display:grid;grid-template-columns:1fr 120px 140px 100px;align-items:center;gap:16px;width:100%;">
                    <span class="cat-nome">{{ $cat['nome'] }}</span>
                    <div class="cat-score-bar">
                        <div class="cat-score-track">
                            <div class="cat-score-fill" style="width:{{ $cat['score_pct'] }}%;background:{{ $cat['cor'] }};"></div>
                        </div>
                        <span class="cat-score-val">{{ $cat['score'] }} / 20</span>
                    </div>
                    <span class="risk-badge {{ $catClass }}">
                        <span style="width:5px;height:5px;border-radius:50%;background:currentColor;display:inline-block;"></span>
                        {{ $cat['nivel'] }}
                    </span>
                    <span style="font-size:13px;color:var(--text-2);font-family:var(--mono);">{{ $cat['respondentes'] }}</span>
                </div>
                <div class="cat-recomendacao">
                    <div style="display:flex;gap:10px;margin-top:8px;padding:12px 14px;background:rgba(255,255,255,0.03);border-radius:8px;border:1px solid var(--border);">
                        <svg style="flex-shrink:0;margin-top:2px;color:var(--cyan);" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                        <p style="font-size:12.5px;color:var(--text-2);line-height:1.6;margin:0;">{{ $cat['recomendacao'] }}</p>
                    </div>
                </div>
            </div>
            @endforeach
        </div>

        {{-- Empty state --}}
        @if(empty($dados['categorias']))
        <div style="text-align:center;padding:60px 24px;background:var(--bg-card);border:1px solid var(--border);border-radius:14px;">
            <div style="font-size:48px;margin-bottom:16px;">📊</div>
            <h3 style="font-size:18px;font-weight:600;color:var(--text-1);margin-bottom:8px;">Sem dados para exibir</h3>
            <p style="font-size:14px;color:var(--text-3);">Nenhum respondente ainda preencheu o questionário ARP desta empresa.</p>
        </div>
        @endif

        <p style="text-align:center;font-size:12px;color:var(--text-3);padding:24px 0;">
            ergo.gov — Dashboard ARP · Gerado em {{ now()->format('d/m/Y H:i') }}
        </p>

    </div>
</div>

<script>
// ── Dados do PHP → JS ──────────────────────────────────────────────────────────
const radarLabels = @json($dados['radar_labels']);
const radarScores = @json($dados['radar_scores']);
const distribuicao = @json($dados['distribuicao']);

// ── Radar Chart ────────────────────────────────────────────────────────────────
if (radarLabels.length > 0) {
    const ctxR = document.getElementById('radarChart').getContext('2d');
    new Chart(ctxR, {
        type: 'radar',
        data: {
            labels: radarLabels,
            datasets: [{
                label: 'Risco (%)',
                data: radarScores,
                fill: true,
                backgroundColor: 'rgba(0,212,255,0.08)',
                borderColor: '#00D4FF',
                borderWidth: 2,
                pointBackgroundColor: '#00D4FF',
                pointBorderColor: '#0A0E1A',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 1200, easing: 'easeOutQuart' },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#0F1422',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    titleColor: '#F1F5F9',
                    bodyColor: '#94A3B8',
                    callbacks: {
                        label: ctx => ` Risco: ${ctx.raw.toFixed(1)}%`
                    }
                }
            },
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 25,
                        color: '#64748B',
                        backdropColor: 'transparent',
                        font: { size: 9, family: 'JetBrains Mono' }
                    },
                    pointLabels: {
                        color: '#94A3B8',
                        font: { size: 10, family: 'Outfit' }
                    },
                    grid: { color: 'rgba(255,255,255,0.06)' },
                    angleLines: { color: 'rgba(255,255,255,0.05)' }
                }
            }
        }
    });
}

// ── Bar Chart ─────────────────────────────────────────────────────────────────
const ctxB = document.getElementById('barChart').getContext('2d');
const barLabels = Object.keys(distribuicao);
const barValues = Object.values(distribuicao);
const barColors = ['#FF2D55', '#FF6B00', '#FFD60A', '#30D158', '#636366'];

new Chart(ctxB, {
    type: 'bar',
    data: {
        labels: barLabels,
        datasets: [{
            label: 'Categorias',
            data: barValues,
            backgroundColor: barColors.map(c => c + '33'),
            borderColor: barColors,
            borderWidth: 2,
            borderRadius: 6,
            borderSkipped: false,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1000, easing: 'easeOutQuart' },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#0F1422',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                titleColor: '#F1F5F9',
                bodyColor: '#94A3B8',
                callbacks: {
                    label: ctx => ` ${ctx.raw} categoria(s)`
                }
            }
        },
        scales: {
            x: {
                ticks: { color: '#94A3B8', font: { size: 11, family: 'Outfit' } },
                grid: { display: false },
                border: { display: false }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    color: '#64748B',
                    font: { size: 10, family: 'JetBrains Mono' }
                },
                grid: { color: 'rgba(255,255,255,0.05)' },
                border: { display: false }
            }
        }
    }
});

// ── Toggle recomendação ────────────────────────────────────────────────────────
function toggleReco(row) {
    const reco = row.querySelector('.cat-recomendacao');
    if (!reco) return;
    const isOpen = reco.style.display === 'block';
    document.querySelectorAll('.cat-recomendacao').forEach(r => r.style.display = 'none');
    if (!isOpen) reco.style.display = 'block';
}
</script>
</body>
</html>
