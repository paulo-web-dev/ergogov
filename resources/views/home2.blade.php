@extends('layouts.header')

@section('content')

<div style="max-width:900px;">

    {{-- Greeting --}}
    <div style="padding: 8px 0 28px;">
        <p style="font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#2D8659;margin-bottom:10px;">
            ● Painel principal
        </p>
        <h1 style="font-size:28px;font-weight:700;letter-spacing:-0.02em;color:#0F1A14;margin-bottom:8px;">
            Olá, <span style="color:#1F6B43;">{{ explode(' ', $user->name)[0] ?? 'Usuário' }}.</span>
        </h1>
        <p style="font-size:14px;color:#6B7B72;">
            Gerencie empresas, aplique análises ergonômicas e gere relatórios técnicos.
        </p>
    </div>

    {{-- Stats --}}
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:32px;">
        <div class="box" style="padding:20px;">
            <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#6B7B72;margin-bottom:8px;">Empresas</div>
            <div style="font-size:28px;font-weight:700;color:#0F1A14;letter-spacing:-0.02em;">{{ $empresas->count() }}</div>
        </div>
        <div class="box" style="padding:20px;">
            <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#6B7B72;margin-bottom:8px;">Em andamento</div>
            <div style="font-size:28px;font-weight:700;color:#B45309;letter-spacing:-0.02em;">
                {{ $empresas->filter(fn($e) => $e->mapeamento->count() > 0)->count() }}
            </div>
        </div>
        <div class="box" style="padding:20px;">
            <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#6B7B72;margin-bottom:8px;">Postos mapeados</div>
            <div style="font-size:28px;font-weight:700;color:#0F1A14;letter-spacing:-0.02em;">
                {{ $empresas->sum(fn($e) => $e->mapeamento->count()) }}
            </div>
        </div>
    </div>

    {{-- Module cards --}}
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:32px;">
        <a href="{{ route('show-empresas') }}" style="text-decoration:none;">
            <div class="box" style="padding:24px;transition:all 0.15s;" onmouseover="this.style.borderColor='#5FB894'" onmouseout="this.style.borderColor='#ECF0EE'">
                <div style="width:40px;height:40px;background:linear-gradient(135deg,#1F6B43,#2D8659);border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7h.01M9 11h.01M9 15h.01M15 7h.01M15 11h.01M15 15h.01"/></svg>
                </div>
                <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#2D8659;margin-bottom:6px;">AET</div>
                <div style="font-size:15px;font-weight:600;color:#0F1A14;margin-bottom:6px;">Análise Ergonômica do Trabalho</div>
                <div style="font-size:12.5px;color:#6B7B72;">Mapeie áreas, setores e postos. Aplique RULA, OWAS, NIOSH, KIM e gere laudos.</div>
            </div>
        </a>
        <a href="{{ route('show-empresas-arp') }}" style="text-decoration:none;">
            <div class="box" style="padding:24px;transition:all 0.15s;" onmouseover="this.style.borderColor='#5FB894'" onmouseout="this.style.borderColor='#ECF0EE'">
                <div style="width:40px;height:40px;background:linear-gradient(135deg,#1F6B70,#4FB5A6);border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M12 6c-4 0-7 3-7 6 0 2.5 1.2 4.5 3 5.5v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3c1.8-1 3-3 3-5.5 0-3-3-6-7-6Z"/></svg>
                </div>
                <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#1F6B70;margin-bottom:6px;">ARP</div>
                <div style="font-size:15px;font-weight:600;color:#0F1A14;margin-bottom:6px;">Avaliação de Riscos Psicossociais</div>
                <div style="font-size:12.5px;color:#6B7B72;">Questionários anônimos e dashboards de resultado por categoria.</div>
            </div>
        </a>
        <a href="{{ route('show-identidade') }}" style="text-decoration:none;">
            <div class="box" style="padding:24px;transition:all 0.15s;" onmouseover="this.style.borderColor='#5FB894'" onmouseout="this.style.borderColor='#ECF0EE'">
                <div style="width:40px;height:40px;background:linear-gradient(135deg,#3D5A4A,#6B8B7A);border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h4"/></svg>
                </div>
                <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#3D5A4A;margin-bottom:6px;">Identidade</div>
                <div style="font-size:15px;font-weight:600;color:#0F1A14;margin-bottom:6px;">Documentos & Identidade Visual</div>
                <div style="font-size:12.5px;color:#6B7B72;">Configure logotipos, cores e cabeçalhos para os relatórios PDF.</div>
            </div>
        </a>
    </div>

    {{-- Recent companies --}}
    @if($empresas->count() > 0)
    <div class="box" style="padding:0;overflow:hidden;">
        <div style="padding:16px 20px;border-bottom:1px solid #ECF0EE;display:flex;align-items:center;justify-content:space-between;">
            <h3 style="margin:0;font-size:15px;font-weight:600;color:#0F1A14;">Empresas recentes</h3>
            <a href="{{ route('show-empresas') }}" style="font-size:13px;color:#2D8659;text-decoration:none;font-weight:500;">Ver todas →</a>
        </div>
        @foreach($empresas->take(5) as $empresa)
        <a href="{{ route('infoempresa', ['id' => $empresa->id]) }}"
           style="display:flex;align-items:center;gap:14px;padding:14px 20px;border-bottom:1px solid #ECF0EE;text-decoration:none;transition:background 0.15s;"
           onmouseover="this.style.background='#F2F9F4'" onmouseout="this.style.background='transparent'">
            <div style="width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,#1F6B43,#2D8659);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff;flex-shrink:0;">
                {{ strtoupper(substr($empresa->nome, 0, 1)) }}
            </div>
            <div style="flex:1;min-width:0;">
                <div style="font-size:14px;font-weight:600;color:#0F1A14;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ $empresa->nome }}</div>
                <div style="font-size:12px;color:#6B7B72;">{{ $empresa->cnpj ?? '—' }}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BFC9C2" stroke-width="2"><path d="m9 6 6 6-6 6"/></svg>
        </a>
        @endforeach
    </div>
    @endif

</div>

@endsection
