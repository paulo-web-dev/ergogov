<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>ergo.gov — Sistema de Gestão Ergonômica</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Icons & Libraries -->
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="https://unpkg.com/feather-icons"></script>
    <script src="https://code.iconify.design/2/2.1.2/iconify.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.14.0/Sortable.min.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://cdn.ckeditor.com/ckeditor5/40.0.0/classic/ckeditor.js"></script>
    <script src="{{ url('/dist/js/calculo_ferramentas.js') }}"></script>

    <!-- Original Rubick CSS (base components) -->
    <link rel="stylesheet" href="{{ url('dist/css/app.css') }}">

    <!-- ergo.gov Design Override (applied on top) -->
    <link rel="stylesheet" href="{{ url('dist/css/ergogov.css') }}">

    <style>
        /* Inline overrides that need highest specificity */
        body { padding: 0 !important; margin: 0 !important; }
        .egov-wrapper { display: flex; flex-direction: column; min-height: 100vh; }
        .egov-topbar {
            background: #0F3D2A;
            height: 56px;
            display: flex;
            align-items: center;
            padding: 0 24px;
            gap: 16px;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .egov-topbar-logo {
            font-family: 'Outfit', sans-serif;
            font-size: 20px;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: #fff;
            text-decoration: none;
        }
        .egov-topbar-logo .dot { color: #5FB894; }
        .egov-topbar-logo .gov { color: #8FCDB1; }
        .egov-topbar-right {
            margin-left: auto;
            display: flex;
            align-items: center;
            gap: 16px;
        }
        .egov-topbar-user {
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: 'Outfit', sans-serif;
            font-size: 13px;
            color: rgba(220,239,226,0.8);
        }
        .egov-avatar {
            width: 30px; height: 30px;
            border-radius: 50%;
            background: linear-gradient(135deg, #2D8659, #1F6B43);
            color: #fff;
            display: flex; align-items: center; justify-content: center;
            font-size: 12px; font-weight: 600;
        }
        .egov-body { display: flex; flex: 1; }
        .egov-sidebar {
            width: 220px;
            background: #0F3D2A;
            min-height: calc(100vh - 56px);
            position: sticky;
            top: 56px;
            height: calc(100vh - 56px);
            overflow-y: auto;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            border-right: 1px solid rgba(255,255,255,0.08);
        }
        .egov-sidebar-section {
            padding: 12px 16px 4px;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: rgba(220,239,226,0.4);
            margin-top: 8px;
        }
        .egov-sidebar nav { padding: 4px 8px; flex: 1; }
        .egov-nav-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 9px 12px;
            border-radius: 8px;
            margin-bottom: 2px;
            font-size: 13.5px;
            font-weight: 500;
            color: rgba(220,239,226,0.65);
            text-decoration: none;
            border-left: 3px solid transparent;
            transition: all 0.15s;
            font-family: 'Outfit', sans-serif;
        }
        .egov-nav-item:hover {
            background: rgba(255,255,255,0.07);
            color: #fff;
            text-decoration: none;
        }
        .egov-nav-item.active {
            background: rgba(255,255,255,0.12);
            color: #fff;
            font-weight: 600;
            border-left-color: #5FB894;
        }
        .egov-nav-item svg, .egov-nav-item i {
            width: 17px; height: 17px;
            flex-shrink: 0; opacity: 0.8;
        }
        .egov-nav-sub { margin-left: 8px; }
        .egov-nav-sub-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 12px 6px 28px;
            font-size: 12.5px;
            color: rgba(220,239,226,0.5);
            text-decoration: none;
            border-radius: 6px;
            transition: all 0.15s;
            font-family: 'Outfit', sans-serif;
        }
        .egov-nav-sub-item:hover { color: rgba(220,239,226,0.9); background: rgba(255,255,255,0.05); text-decoration: none; }
        .egov-sidebar-footer {
            padding: 12px 16px;
            border-top: 1px solid rgba(255,255,255,0.08);
            font-size: 11px;
            color: rgba(220,239,226,0.35);
            font-family: 'Outfit', sans-serif;
        }
        .egov-content {
            flex: 1;
            min-width: 0;
            padding: 28px 32px;
            background: #F5F8F6;
        }
        .egov-submenu { display: none; }
        .egov-submenu.open { display: block; }
        .egov-submenu-toggle { cursor: pointer; }
        .egov-submenu-toggle .chevron { transition: transform 0.2s; display: inline-block; margin-left: auto; }
        .egov-submenu-toggle.open .chevron { transform: rotate(180deg); }
    </style>
</head>

<body>
<div class="egov-wrapper">

    {{-- ── Top Bar ── --}}
    <header class="egov-topbar">
        <a href="{{ route('home') }}" class="egov-topbar-logo">
            ergo<span class="dot">.</span><span class="gov">gov</span>
        </a>
        <span style="color:rgba(255,255,255,0.3); font-size:13px; font-family:'Outfit',sans-serif;">
            Sistema de Gestão Ergonômica
        </span>
        <div class="egov-topbar-right">
            <div class="egov-topbar-user">
                <div class="egov-avatar">
                    {{ strtoupper(substr(Auth::user()->name ?? 'U', 0, 1)) }}
                </div>
                <span>{{ Auth::user()->name ?? '' }}</span>
            </div>
        </div>
    </header>

    <div class="egov-body">

        {{-- ── Sidebar ── --}}
        <aside class="egov-sidebar">
            <div class="egov-sidebar-section">Menu</div>
            <nav>

                {{-- Home --}}
                <a href="{{ route('home') }}" class="egov-nav-item {{ request()->routeIs('home') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/></svg>
                    Início
                </a>

                {{-- Empresas --}}
                <a href="{{ route('show-empresas') }}" class="egov-nav-item {{ request()->routeIs('show-empresas') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7h.01M9 11h.01M9 15h.01M15 7h.01M15 11h.01M15 15h.01"/><path d="M10 21v-4h4v4"/></svg>
                    Empresas
                </a>

                {{-- Opções contextuais: página de empresa --}}
                @if(Config::get('app.explode_path.2') == 'empresa')
                <div class="egov-nav-sub">
                    <button class="egov-nav-item egov-submenu-toggle" onclick="toggleSubmenu('empresa-sub', this)" style="width:100%; background:none; border:none; text-align:left;">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                        Seções desta empresa
                        <svg class="chevron" style="width:12px;height:12px;margin-left:auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div id="empresa-sub" class="egov-submenu">
                        @foreach([
                            ['#introducao','Introdução'],['#objetivos','Objetivos'],
                            ['#metodologia','Metodologia'],['#demanda','Demanda'],
                            ['#analise','Análise Global'],['#areas','Áreas'],
                            ['#setores','Setores'],['#equipe','Equipe Técnica'],
                            ['#disposicoes','Disposições Finais'],['#responsaveis','Responsáveis'],
                            ['#mapeamento','Mapeamento Ergonômico'],['#plano','Plano de Ação']
                        ] as $item)
                        <a href="{{ $item[0] }}" class="egov-nav-sub-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:10px;height:10px"><path d="m9 18 6-6-6-6"/></svg>
                            {{ $item[1] }}
                        </a>
                        @endforeach
                    </div>
                </div>
                @endif

                {{-- Opções contextuais: página de subsetor --}}
                @if(Config::get('app.explode_path.2') == 'subsetor')
                <div class="egov-nav-sub">
                    <button class="egov-nav-item egov-submenu-toggle" onclick="toggleSubmenu('subsetor-sub', this)" style="width:100%; background:none; border:none; text-align:left;">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                        Seções deste posto
                        <svg class="chevron" style="width:12px;height:12px;margin-left:auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div id="subsetor-sub" class="egov-submenu">
                        @foreach([
                            ['#função','Função'],['#tarefa','Tarefa'],
                            ['#analise-atividade','Análise de Atividade'],['#legenda-fotos','Descrição de Fotos'],
                            ['#caracteristicas','Características Org.'],['#caracteristicas-do-ambiente','Características Amb.'],
                            ['#saude','Dados de Saúde'],['#pre-diagnosticos','Pré Diagnósticos'],
                            ['#disposicoes','Disposições Finais'],['#moore','Ferramentas de Análise'],
                            ['#recomendacoes','Recomendações Técnicas']
                        ] as $item)
                        <a href="{{ $item[0] }}" class="egov-nav-sub-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:10px;height:10px"><path d="m9 18 6-6-6-6"/></svg>
                            {{ $item[1] }}
                        </a>
                        @endforeach
                    </div>
                </div>
                @endif

                {{-- Identidade Visual --}}
                <a href="{{ route('show-identidade') }}" class="egov-nav-item {{ request()->routeIs('show-identidade') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="1.5" fill="currentColor"/><circle cx="17.5" cy="10.5" r="1.5" fill="currentColor"/><circle cx="8.5" cy="7.5" r="1.5" fill="currentColor"/><circle cx="6.5" cy="12.5" r="1.5" fill="currentColor"/><path d="M12 22a9 9 0 1 1 0-18c4.97 0 9 3.58 9 8 0 2.21-1.79 4-4 4h-1.5a2 2 0 0 0-1 3.75A1.3 1.3 0 0 1 13.5 22Z"/></svg>
                    Identidade Visual
                </a>

                {{-- Textos Padrão --}}
                <a href="{{ route('show-textos') }}" class="egov-nav-item {{ request()->routeIs('show-textos') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h4"/></svg>
                    Textos Padrão
                </a>

                {{-- Listas --}}
                <a href="{{ route('show-lista-recomendacoes') }}" class="egov-nav-item {{ request()->routeIs('show-lista-recomendacoes') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                    Listas
                </a>

                @if(Auth::user()->power == 1)
                {{-- Usuários (admin only) --}}
                <a href="{{ route('show-usuario') }}" class="egov-nav-item {{ request()->routeIs('show-usuario') ? 'active' : '' }}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 19a4 4 0 0 0-8 0"/><circle cx="12" cy="10" r="4"/><path d="M22 19a4 4 0 0 0-3-3.87"/><path d="M2 19a4 4 0 0 1 3-3.87"/><circle cx="18" cy="8" r="2.5"/><circle cx="6" cy="8" r="2.5"/></svg>
                    Usuários
                </a>
                @endif

            </nav>

            <div style="padding: 8px;">
                <a href="/info/usuario/{{ Auth::user()->id }}" class="egov-nav-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-1a6 6 0 0 1 12 0v1"/></svg>
                    Meu Perfil
                </a>
                <a href="{{ route('logout') }}" class="egov-nav-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg>
                    Sair
                </a>
            </div>

            <div class="egov-sidebar-footer">ergo.gov v2.0</div>
        </aside>

        {{-- ── Main Content ── --}}
        <main class="egov-content">
            @if(session('success'))
            <div class="alert alert-success" style="margin-bottom:16px;">
                {{ session('success') }}
            </div>
            @endif
            @if(session('error'))
            <div class="alert alert-danger" style="margin-bottom:16px;">
                {{ session('error') }}
            </div>
            @endif
            @yield('content')
        </main>

    </div>{{-- egov-body --}}
</div>{{-- egov-wrapper --}}

<!-- JS Assets -->
<script src="https://code.iconify.design/iconify-icon/1.0.0-beta.3/iconify-icon.min.js"></script>
<script src="{{ url('dist/js/app.js') }}"></script>
@stack('custom-scripts')

<script>
// Feather icons
if (typeof feather !== 'undefined') feather.replace();

// Submenu toggle
function toggleSubmenu(id, btn) {
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.toggle('open');
    btn.classList.toggle('open');
}

// Sidebar submenus: auto-open active context
document.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname.split('/');
    if (path[2] === 'empresa') {
        var sub = document.getElementById('empresa-sub');
        if (sub) sub.classList.add('open');
    }
    if (path[2] === 'subsetor') {
        var sub = document.getElementById('subsetor-sub');
        if (sub) sub.classList.add('open');
    }
    if (typeof feather !== 'undefined') feather.replace();
});

// Form single submit protection
document.querySelectorAll('form[data-single]').forEach(function(form) {
    form.addEventListener('submit', function() {
        var btns = form.querySelectorAll('button[type=submit], input[type=submit]');
        btns.forEach(function(b) { b.disabled = true; b.textContent = 'Aguarde...'; });
    });
});
</script>

</body>
</html>
