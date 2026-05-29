<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Questionário ARP — {{ $empresa->nome }}</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
            --g-900: #0F3D2A; --g-700: #1F6B43; --g-600: #2D8659;
            --g-400: #5FB894; --g-100: #DCEFE2; --g-50: #E7F4EC;
            --ink-900: #0F1A14; --ink-700: #2A3D33; --ink-500: #6B7B72;
            --ink-300: #BFC9C2; --ink-100: #ECF0EE;
            --canvas: #F5F8F6; --white: #FFFFFF;
            --font: 'Outfit', sans-serif;
        }

        body {
            font-family: var(--font);
            background: var(--canvas);
            color: var(--ink-900);
            min-height: 100vh;
        }

        /* ── Top bar ── */
        .arp-topbar {
            background: var(--g-900);
            padding: 0 24px;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: sticky;
            top: 0;
            z-index: 10;
        }
        .arp-wordmark {
            font-size: 20px;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: #fff;
            text-decoration: none;
        }
        .arp-wordmark .dot { color: #5FB894; }
        .arp-wordmark .gov { color: #8FCDB1; }
        .arp-badge {
            font-size: 11px;
            font-weight: 600;
            color: rgba(220,239,226,0.6);
            letter-spacing: 0.04em;
        }

        /* ── Progress bar ── */
        .arp-progress-wrap {
            background: rgba(255,255,255,0.08);
            height: 3px;
        }
        .arp-progress-bar {
            height: 3px;
            background: var(--g-400);
            transition: width 0.4s ease;
        }

        /* ── Layout ── */
        .arp-shell {
            max-width: 720px;
            margin: 0 auto;
            padding: 36px 24px 60px;
        }

        /* ── Header card ── */
        .arp-header {
            background: var(--white);
            border-radius: 16px;
            border: 1px solid var(--ink-100);
            padding: 32px;
            margin-bottom: 24px;
            box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }
        .arp-header .company-tag {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: var(--g-50);
            border: 1px solid var(--g-100);
            border-radius: 20px;
            padding: 4px 12px;
            font-size: 12px;
            font-weight: 600;
            color: var(--g-700);
            margin-bottom: 14px;
        }
        .arp-header h1 {
            font-size: 22px;
            font-weight: 700;
            letter-spacing: -0.02em;
            color: var(--ink-900);
            margin-bottom: 12px;
        }
        .arp-header p {
            font-size: 13.5px;
            line-height: 1.7;
            color: var(--ink-500);
        }
        .arp-privacy {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            margin-top: 16px;
            padding: 12px 14px;
            background: var(--g-50);
            border-radius: 8px;
            border: 1px solid var(--g-100);
        }
        .arp-privacy .icon {
            width: 18px;
            height: 18px;
            flex-shrink: 0;
            color: var(--g-600);
            margin-top: 1px;
        }
        .arp-privacy p {
            font-size: 12.5px;
            color: var(--g-700);
            margin: 0;
        }

        /* ── Identification card ── */
        .arp-card {
            background: var(--white);
            border-radius: 14px;
            border: 1px solid var(--ink-100);
            padding: 28px;
            margin-bottom: 16px;
            box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .arp-card-title {
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: var(--ink-500);
            margin-bottom: 18px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .arp-card-title::after {
            content: '';
            flex: 1;
            height: 1px;
            background: var(--ink-100);
        }

        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
        }
        .form-grid .full { grid-column: 1 / -1; }

        .form-group label {
            display: block;
            font-size: 12.5px;
            font-weight: 600;
            color: var(--ink-700);
            margin-bottom: 5px;
        }
        .form-group input {
            width: 100%;
            padding: 9px 12px;
            border: 1px solid var(--ink-300);
            border-radius: 8px;
            font-family: var(--font);
            font-size: 14px;
            color: var(--ink-900);
            background: var(--white);
            transition: border-color 0.15s, box-shadow 0.15s;
            outline: none;
        }
        .form-group input:focus {
            border-color: var(--g-600);
            box-shadow: 0 0 0 3px rgba(45,134,89,0.10);
        }
        .form-group input::placeholder { color: var(--ink-300); }

        /* ── Question cards ── */
        .question-card {
            background: var(--white);
            border-radius: 14px;
            border: 1px solid var(--ink-100);
            padding: 22px 24px;
            margin-bottom: 12px;
            box-shadow: 0 1px 4px rgba(0,0,0,0.04);
            transition: border-color 0.2s;
        }
        .question-card:has(input:checked) {
            border-color: var(--g-400);
            background: #FAFCFB;
        }
        .question-num {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: var(--g-50);
            border: 1px solid var(--g-100);
            font-size: 11px;
            font-weight: 700;
            color: var(--g-700);
            flex-shrink: 0;
        }
        .question-text {
            font-size: 14px;
            font-weight: 500;
            color: var(--ink-900);
            line-height: 1.5;
            flex: 1;
        }
        .question-header {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 16px;
        }
        .options-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .option-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 9px 12px;
            border: 1px solid var(--ink-100);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.15s;
        }
        .option-item:hover {
            background: var(--g-50);
            border-color: var(--g-200, #C2E2D1);
        }
        .option-item input[type="radio"] {
            width: 16px;
            height: 16px;
            flex-shrink: 0;
            accent-color: var(--g-600);
            cursor: pointer;
        }
        .option-item label {
            font-size: 13.5px;
            color: var(--ink-700);
            cursor: pointer;
            flex: 1;
            margin: 0;
        }
        .option-item:has(input:checked) {
            background: var(--g-50);
            border-color: var(--g-400);
        }
        .option-item:has(input:checked) label {
            color: var(--g-700);
            font-weight: 500;
        }

        /* ── Submit ── */
        .arp-submit-area {
            padding-top: 8px;
        }
        .btn-submit {
            width: 100%;
            padding: 14px;
            background: var(--g-700);
            color: var(--white);
            border: none;
            border-radius: 10px;
            font-family: var(--font);
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.15s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        .btn-submit:hover { background: var(--g-600); }
        .btn-submit svg { width: 18px; height: 18px; }

        .arp-footer {
            text-align: center;
            margin-top: 28px;
            font-size: 12px;
            color: var(--ink-300);
        }

        @media (max-width: 540px) {
            .form-grid { grid-template-columns: 1fr; }
            .arp-shell { padding: 20px 16px 40px; }
            .arp-header { padding: 22px; }
            .arp-card { padding: 20px; }
        }
    </style>
</head>
<body>

    {{-- Top bar --}}
    <header class="arp-topbar">
        <a href="#" class="arp-wordmark">Avalia<span class="dot">.</span><span class="gov">One</span></a>
        <span class="arp-badge">Avaliação de Riscos Psicossociais</span>
    </header>

    {{-- Progress bar (JavaScript updates width) --}}
    <div class="arp-progress-wrap">
        <div class="arp-progress-bar" id="progressBar" style="width: 0%"></div>
    </div>

    <div class="arp-shell">

        {{-- Header --}}
        <div class="arp-header">
            <div class="company-tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7h.01M9 11h.01M9 15h.01"/></svg>
                {{ $empresa->nome }}
            </div>
            <h1>Questionário Ergonômico</h1>
            <p>
                Neste questionário você encontrará questões referentes às situações relacionadas ao trabalho.
                Para responder, selecione a opção que melhor representa sua opinião.
                O objetivo é identificar e avaliar os riscos psicossociais relacionados ao ambiente de trabalho,
                com foco em ações de promoção da saúde ocupacional.
            </p>
            <div class="arp-privacy">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <p><strong>Sigilo garantido.</strong> A empresa receberá apenas um relatório consolidado, sem identificação individual dos participantes.</p>
            </div>
        </div>

        <form method="POST" action="{{ route('cad-form-arp') }}" id="arpForm">
            @csrf
            <input type="hidden" name="empresa" value="{{ $empresa->id }}">

            {{-- Identification --}}
            <div class="arp-card">
                <div class="arp-card-title">Identificação</div>
                <div class="form-grid">
                    <div class="form-group full">
                        <label for="nome">Nome completo</label>
                        <input type="text" id="nome" name="nome" placeholder="Seu nome completo" required>
                    </div>
                    <div class="form-group full">
                        <label for="email">E-mail</label>
                        <input type="text" id="email" name="email" placeholder="seu@email.com" required>
                    </div>
                    <div class="form-group">
                        <label for="departamento">Setor / Departamento</label>
                        <input type="text" id="departamento" name="departamento" placeholder="Seu departamento" required>
                    </div>
                    <div class="form-group">
                        <label for="funcao">Função</label>
                        <input type="text" id="funcao" name="funcao" placeholder="Sua função" required>
                    </div>
                </div>
            </div>

            {{-- Questions --}}
            <div class="arp-card-title" style="margin: 24px 0 14px; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; color: var(--ink-500); display:flex; align-items:center; gap:8px;">
                Perguntas
                <span style="flex:1;height:1px;background:var(--ink-100);"></span>
                <span style="font-size:12px; color:var(--ink-300); font-weight:400; text-transform:none; letter-spacing:0;" id="answeredCount">0 / {{ count($perguntas) }}</span>
            </div>

            @foreach ($perguntas as $pergunta)
            <div class="question-card" data-question="{{ $pergunta->id }}">
                <div class="question-header">
                    <span class="question-num">{{ $loop->iteration }}</span>
                    <p class="question-text">{{ $pergunta->pergunta }}</p>
                </div>
                <div class="options-list">
                    @foreach ($pergunta->respostas as $resposta)
                    <div class="option-item">
                        <input
                            type="radio"
                            name="respostas[{{ $pergunta->id }}]"
                            id="r_{{ $pergunta->id }}_{{ $resposta->id }}"
                            value="{{ $resposta->id }}"
                            onchange="updateProgress()">
                        <label for="r_{{ $pergunta->id }}_{{ $resposta->id }}">{{ $resposta->resposta }}</label>
                    </div>
                    @endforeach
                </div>
            </div>
            @endforeach

            {{-- Submit --}}
            <div class="arp-submit-area">
                <button type="submit" class="btn-submit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7z"/>
                    </svg>
                    Enviar Respostas
                </button>
            </div>
        </form>

        <p class="arp-footer">ergo.gov © {{ date('Y') }} · Sistema de Gestão Ergonômica</p>
    </div>

    <script>
        const total = {{ count($perguntas) }};

        function updateProgress() {
            const answered = document.querySelectorAll('input[type="radio"]:checked').length;
            const pct = total > 0 ? Math.round((answered / total) * 100) : 0;
            document.getElementById('progressBar').style.width = pct + '%';
            document.getElementById('answeredCount').textContent = answered + ' / ' + total;
        }

        // Label click selects radio
        document.querySelectorAll('.option-item').forEach(function(item) {
            item.addEventListener('click', function(e) {
                if (e.target.tagName !== 'INPUT') {
                    const radio = item.querySelector('input[type="radio"]');
                    if (radio) { radio.checked = true; updateProgress(); }
                }
            });
        });
    </script>
</body>
</html>