@extends('layouts.header')

@section('content')

<div style="max-width:600px;">

  <div style="margin-bottom:20px;">
    <a href="{{ route('arp.colaboradores.index', $empresa->id) }}"
       style="font-size:13px;color:#2D8659;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
      ← Voltar para colaboradores
    </a>
  </div>

  <h1 style="font-size:22px;font-weight:700;color:#0F1A14;margin-bottom:4px;">Editar Colaborador</h1>
  <p style="font-size:13px;color:#6B7B72;margin-bottom:20px;">{{ $colaborador->email }}</p>

  <div style="background:#fff;border:1px solid #ECF0EE;border-radius:12px;padding:28px;">
    <form method="POST" action="{{ route('arp.colaboradores.update', $colaborador->id) }}">
      @csrf
      @method('PUT')
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">

        <div style="grid-column:1/-1;">
          <label style="font-size:12.5px;font-weight:600;color:#4A5D53;display:block;margin-bottom:5px;">Nome completo *</label>
          <input type="text" name="nome" required value="{{ old('nome', $colaborador->nome) }}"
            style="width:100%;padding:9px 12px;border:1px solid #DBE2DD;border-radius:8px;font-size:14px;outline:none;">
        </div>

        <div style="grid-column:1/-1;">
          <label style="font-size:12.5px;font-weight:600;color:#4A5D53;display:block;margin-bottom:5px;">E-mail *</label>
          <input type="email" name="email" required value="{{ old('email', $colaborador->email) }}"
            style="width:100%;padding:9px 12px;border:1px solid #DBE2DD;border-radius:8px;font-size:14px;outline:none;">
        </div>

        <div>
          <label style="font-size:12.5px;font-weight:600;color:#4A5D53;display:block;margin-bottom:5px;">Cargo</label>
          <input type="text" name="cargo" value="{{ old('cargo', $colaborador->cargo) }}"
            style="width:100%;padding:9px 12px;border:1px solid #DBE2DD;border-radius:8px;font-size:14px;outline:none;"
            placeholder="Analista de RH">
        </div>

        <div>
          <label style="font-size:12.5px;font-weight:600;color:#4A5D53;display:block;margin-bottom:5px;">Setor / Departamento</label>
          <input type="text" name="setor" value="{{ old('setor', $colaborador->setor) }}"
            style="width:100%;padding:9px 12px;border:1px solid #DBE2DD;border-radius:8px;font-size:14px;outline:none;"
            placeholder="Recursos Humanos">
        </div>

        <div style="grid-column:1/-1;">
          <label style="font-size:12.5px;font-weight:600;color:#4A5D53;display:block;margin-bottom:5px;">Descrição do cargo</label>
          <textarea name="descricao_cargo" rows="4"
            style="width:100%;padding:9px 12px;border:1px solid #DBE2DD;border-radius:8px;font-size:14px;outline:none;resize:vertical;font-family:inherit;"
            placeholder="Descreva as principais atribuições e responsabilidades do cargo...">{{ old('descricao_cargo', $colaborador->descricao_cargo) }}</textarea>
          <div style="font-size:11.5px;color:#94A199;margin-top:4px;">Opcional — usado para detalhar as funções exercidas pelo colaborador.</div>
        </div>

        <div style="grid-column:1/-1;">
          <label style="font-size:12.5px;font-weight:600;color:#4A5D53;display:block;margin-bottom:5px;">Status</label>
          <select name="status"
            style="width:100%;padding:9px 12px;border:1px solid #DBE2DD;border-radius:8px;font-size:14px;outline:none;background:#fff;">
            <option value="ativo"   {{ $colaborador->status === 'ativo'   ? 'selected' : '' }}>Ativo</option>
            <option value="inativo" {{ $colaborador->status === 'inativo' ? 'selected' : '' }}>Inativo</option>
          </select>
        </div>

      </div>
      <div style="margin-top:20px;display:flex;gap:10px;">
        <button type="submit"
          style="padding:10px 24px;background:#1F6B43;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;">
          Salvar alterações
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
