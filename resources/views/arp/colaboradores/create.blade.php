@extends('layouts.header')

@section('content')

<div style="max-width:600px;">

  <div style="margin-bottom:20px;">
    <a href="{{ route('arp.colaboradores.index', $empresa->id) }}"
       style="font-size:13px;color:#2D8659;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
      ← Voltar para colaboradores
    </a>
  </div>

  <h1 style="font-size:22px;font-weight:700;color:#0F1A14;margin-bottom:20px;">Novo Colaborador</h1>

  <div style="background:#fff;border:1px solid #ECF0EE;border-radius:12px;padding:28px;">
    <form method="POST" action="{{ route('arp.colaboradores.store', $empresa->id) }}">
      @csrf
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">

        <div style="grid-column:1/-1;">
          <label style="font-size:12.5px;font-weight:600;color:#4A5D53;display:block;margin-bottom:5px;">Nome completo *</label>
          <input type="text" name="nome" required value="{{ old('nome') }}"
            style="width:100%;padding:9px 12px;border:1px solid #DBE2DD;border-radius:8px;font-size:14px;outline:none;"
            placeholder="João Silva">
        </div>

        <div style="grid-column:1/-1;">
          <label style="font-size:12.5px;font-weight:600;color:#4A5D53;display:block;margin-bottom:5px;">E-mail *</label>
          <input type="email" name="email" required value="{{ old('email') }}"
            style="width:100%;padding:9px 12px;border:1px solid #DBE2DD;border-radius:8px;font-size:14px;outline:none;"
            placeholder="joao@empresa.com">
        </div>

        <div>
          <label style="font-size:12.5px;font-weight:600;color:#4A5D53;display:block;margin-bottom:5px;">Cargo</label>
          <input type="text" name="cargo" value="{{ old('cargo') }}"
            style="width:100%;padding:9px 12px;border:1px solid #DBE2DD;border-radius:8px;font-size:14px;outline:none;"
            placeholder="Analista de RH">
        </div>

        <div>
          <label style="font-size:12.5px;font-weight:600;color:#4A5D53;display:block;margin-bottom:5px;">Setor / Departamento</label>
          <input type="text" name="setor" value="{{ old('setor') }}"
            style="width:100%;padding:9px 12px;border:1px solid #DBE2DD;border-radius:8px;font-size:14px;outline:none;"
            placeholder="Recursos Humanos">
        </div>

      </div>
      <div style="margin-top:20px;display:flex;gap:10px;">
        <button type="submit"
          style="padding:10px 24px;background:#1F6B43;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;">
          Cadastrar
        </button>
        <a href="{{ route('arp.colaboradores.index', $empresa->id) }}"
          style="padding:10px 20px;background:#fff;color:#4A5D53;border:1px solid #DBE2DD;border-radius:8px;font-size:14px;font-weight:500;text-decoration:none;">
          Cancelar
        </a>
      </div>
    </form>
  </div>
</div>

@endsection
