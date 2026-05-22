@extends('layouts.header')

@section('content')

<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
    <div>
        <h1 style="margin:0 0 4px;">Empresas cadastradas</h1>
        <p style="font-size:13px;color:#6B7B72;margin:0;">{{ count($empresas) }} empresa(s) encontrada(s)</p>
    </div>
    <a href="{{ route('formempresa') }}" class="btn btn-primary">
        <i data-feather="plus" style="width:15px;height:15px;"></i>
        Nova Empresa
    </a>
</div>

@if(session('success'))
<div class="alert alert-success" style="margin-bottom:16px;">{{ session('success') }}</div>
@endif

<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;">
    @forelse($empresas as $empresa)
    <div class="box" style="padding:0;overflow:hidden;display:flex;flex-direction:column;">
        <div style="padding:20px;flex:1;">
            <div style="display:flex;align-items:flex-start;gap:14px;margin-bottom:14px;">
                <div style="width:44px;height:44px;border-radius:10px;background:linear-gradient(135deg,#1F6B43,#0F3D2A);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#fff;flex-shrink:0;">
                    {{ strtoupper(substr($empresa->nome, 0, 1)) }}
                </div>
                <div style="flex:1;min-width:0;">
                    <a href="{{ route('infoempresa', ['id' => $empresa->id]) }}"
                       style="font-size:15px;font-weight:600;color:#0F1A14;text-decoration:none;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"
                       onmouseover="this.style.color='#2D8659'" onmouseout="this.style.color='#0F1A14'">
                        {{ $empresa->nome }}
                    </a>
                    <div style="font-size:12px;color:#6B7B72;margin-top:2px;">{{ $empresa->cnpj ?? '—' }}</div>
                </div>
                <div style="position:relative;">
                    <button onclick="toggleMenu('menu-{{ $empresa->id }}')"
                            style="background:none;border:none;cursor:pointer;padding:4px;color:#94A199;border-radius:4px;">
                        <i data-feather="more-horizontal" style="width:16px;height:16px;"></i>
                    </button>
                    <div id="menu-{{ $empresa->id }}" style="display:none;position:absolute;right:0;top:28px;background:#fff;border:1px solid #DBE2DD;border-radius:10px;box-shadow:0 4px 16px rgba(0,0,0,0.10);padding:4px;z-index:50;min-width:160px;">
                        <a href="{{ route('infoempresa', ['id' => $empresa->id]) }}"
                           style="display:flex;align-items:center;gap:8px;padding:7px 12px;border-radius:6px;font-size:13px;color:#2A3D33;text-decoration:none;"
                           onmouseover="this.style.background='#F2F9F4'" onmouseout="this.style.background='transparent'">
                            <i data-feather="edit-2" style="width:13px;height:13px;"></i> Editar / Ver
                        </a>
                        <a href="{{ route('gera-relatorio', ['id' => $empresa->id]) }}"
                           style="display:flex;align-items:center;gap:8px;padding:7px 12px;border-radius:6px;font-size:13px;color:#2A3D33;text-decoration:none;"
                           onmouseover="this.style.background='#F2F9F4'" onmouseout="this.style.background='transparent'">
                            <i data-feather="file-text" style="width:13px;height:13px;"></i> Gerar Relatório
                        </a>
                        <a href="{{ route('form-arp', ['id' => $empresa->id]) }}"
                           style="display:flex;align-items:center;gap:8px;padding:7px 12px;border-radius:6px;font-size:13px;color:#2A3D33;text-decoration:none;"
                           onmouseover="this.style.background='#F2F9F4'" onmouseout="this.style.background='transparent'">
                            <i data-feather="link" style="width:13px;height:13px;"></i> Link ARP
                        </a>
                        <hr style="margin:4px 0;border:none;border-top:1px solid #ECF0EE;">
                        <a href="{{ route('infodashboard', ['id' => $empresa->id]) }}"
                           style="display:flex;align-items:center;gap:8px;padding:7px 12px;border-radius:6px;font-size:13px;color:#2A3D33;text-decoration:none;"
                           onmouseover="this.style.background='#F2F9F4'" onmouseout="this.style.background='transparent'">
                            <i data-feather="bar-chart-2" style="width:13px;height:13px;"></i> Dashboard
                        </a>
                    </div>
                </div>
            </div>

            @if($empresa->setor)
            <div style="font-size:12px;color:#6B7B72;margin-bottom:10px;">
                <i data-feather="tag" style="width:11px;height:11px;display:inline;vertical-align:middle;"></i>
                {{ $empresa->setor }}
            </div>
            @endif

            @php $postos = $empresa->mapeamento->count(); @endphp
            @if($postos > 0)
            <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#6B7B72;margin-bottom:8px;">
                <span>{{ $postos }} posto(s) mapeado(s)</span>
            </div>
            @endif
        </div>

        <div style="padding:12px 20px;border-top:1px solid #ECF0EE;display:flex;gap:8px;">
            <a href="{{ route('infoempresa', ['id' => $empresa->id]) }}" class="btn btn-primary" style="flex:1;justify-content:center;font-size:12px;">
                Ver detalhes
            </a>
        </div>
    </div>

    {{-- Modal exclusão --}}
    <div id="excluirProfessor{{ $empresa->id }}" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:1000;align-items:center;justify-content:center;">
        <div style="background:#fff;border-radius:14px;padding:28px;max-width:400px;width:90%;">
            <h3 style="margin:0 0 10px;">Confirmar exclusão</h3>
            <p style="font-size:14px;color:#6B7B72;margin-bottom:20px;">
                Tem certeza que deseja excluir <strong>{{ $empresa->nome }}</strong>? Esta ação não pode ser desfeita.
            </p>
            <div style="display:flex;gap:10px;justify-content:flex-end;">
                <button onclick="document.getElementById('excluirProfessor{{ $empresa->id }}').style.display='none'"
                        class="btn btn-secondary">Cancelar</button>
                <a href="#" class="btn btn-danger">Excluir</a>
            </div>
        </div>
    </div>
    @empty
    <div style="grid-column:1/-1;" class="box" style="padding:48px;text-align:center;">
        <div style="font-size:40px;margin-bottom:16px;">🏢</div>
        <h3 style="margin:0 0 8px;color:#0F1A14;">Nenhuma empresa cadastrada</h3>
        <p style="font-size:14px;color:#6B7B72;margin-bottom:20px;">Comece cadastrando a primeira empresa para realizar análises ergonômicas.</p>
        <a href="{{ route('formempresa') }}" class="btn btn-primary">Cadastrar empresa</a>
    </div>
    @endforelse
</div>

@push('custom-scripts')
<script>
function toggleMenu(id) {
    document.querySelectorAll('[id^="menu-"]').forEach(function(m) {
        if (m.id !== id) m.style.display = 'none';
    });
    var el = document.getElementById(id);
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
}
document.addEventListener('click', function(e) {
    if (!e.target.closest('[id^="menu-"]') && !e.target.closest('button[onclick]')) {
        document.querySelectorAll('[id^="menu-"]').forEach(function(m) { m.style.display = 'none'; });
    }
});
// Modal toggle
document.querySelectorAll('[data-target]').forEach(function(el) {
    el.addEventListener('click', function(e) {
        e.preventDefault();
        var target = this.getAttribute('data-target');
        var modal = document.querySelector(target);
        if (modal) modal.style.display = 'flex';
    });
});
</script>
@endpush

@endsection
