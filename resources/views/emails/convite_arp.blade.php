<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pesquisa de Avaliação Comportamental</title>
</head>
<body style="margin:0;padding:0;background:#f5f8f6;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f8f6;padding:40px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

      {{-- Header --}}
      <tr>
        <td style="background:#0F3D2A;padding:28px 36px;text-align:center;">
          <div style="font-size:24px;font-weight:800;letter-spacing:-0.03em;color:#ffffff;">
            Avalia<span style="color:#5FB894;">.</span><span style="color:#8FCDB1;">One</span>
          </div>
          @if($nomeEmpresa)
          <div style="font-size:13px;color:rgba(220,239,226,0.7);margin-top:4px;">{{ $nomeEmpresa }}</div>
          @endif
        </td>
      </tr>

      {{-- Body --}}
      <tr>
        <td style="padding:36px 36px 28px;">
          @if($isReenvio)
          <div style="background:#FFF7ED;border-left:4px solid #F59E0B;border-radius:0 8px 8px 0;padding:10px 14px;margin-bottom:20px;font-size:13px;color:#B45309;">
            🔔 Lembrete — você ainda não respondeu esta pesquisa.
          </div>
          @endif

          <h2 style="font-size:20px;font-weight:700;color:#0F1A14;margin:0 0 8px;">
            Olá, {{ $nomeColaborador }}! 👋
          </h2>
          <p style="font-size:14px;color:#4A5D53;line-height:1.7;margin:0 0 24px;">
            Você foi convidado(a) a responder uma <strong>pesquisa de avaliação comportamental</strong>
            @if($nomeEmpresa) da <strong>{{ $nomeEmpresa }}</strong>@endif.
            Suas respostas são anônimas e levam cerca de <strong>5 minutos</strong>.
          </p>

          {{-- CTA --}}
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center" style="padding:8px 0 28px;">
              <a href="{{ $linkPesquisa }}"
                 style="display:inline-block;background:#1F6B43;color:#ffffff;text-decoration:none;
                        padding:14px 36px;border-radius:10px;font-size:15px;font-weight:700;
                        letter-spacing:-0.01em;">
                Responder Pesquisa →
              </a>
            </td></tr>
          </table>

          <p style="font-size:12px;color:#94A199;text-align:center;margin:0 0 8px;">
            Ou copie e cole este link no seu navegador:
          </p>
          <p style="font-size:11px;color:#94A199;text-align:center;word-break:break-all;margin:0;">
            <a href="{{ $linkPesquisa }}" style="color:#2D8659;">{{ $linkPesquisa }}</a>
          </p>
        </td>
      </tr>

      {{-- Divider --}}
      <tr><td style="padding:0 36px;"><hr style="border:none;border-top:1px solid #ECF0EE;"></td></tr>

      {{-- Footer --}}
      <tr>
        <td style="padding:20px 36px;text-align:center;">
          <p style="font-size:12px;color:#BFC9C2;margin:0 0 4px;">
            Atenciosamente, <strong style="color:#6B7B72;">Equipe de Desenvolvimento Humano</strong>
          </p>
          <p style="font-size:11px;color:#DBE2DD;margin:0;">
            Avalia.One — Sistema de Gestão Ergonômica
          </p>
          @if($convite->expira_em)
          <p style="font-size:11px;color:#BFC9C2;margin:8px 0 0;">
            ⏳ Este link expira em {{ $convite->expira_em->format('d/m/Y') }}.
          </p>
          @endif
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>
