<td style="padding:36px 36px 28px;">

  @if($isReenvio)
  <div style="background:#FFF7ED;border-left:4px solid #F59E0B;border-radius:0 8px 8px 0;padding:10px 14px;margin-bottom:20px;font-size:13px;color:#B45309;">
      🔔 Lembrete — sua participação ainda não foi registrada.
  </div>
  @endif

  <h2 style="font-size:20px;font-weight:700;color:#0F1A14;margin:0 0 12px;">
      Prezado(a) colaborador(a),
  </h2>

  <p style="font-size:14px;color:#4A5D53;line-height:1.8;margin:0 0 18px;">
      Com o objetivo de promover a saúde ocupacional e a melhoria contínua do ambiente de trabalho,
      convidamos você a participar da nossa <strong>Avaliação de Fatores Psicossociais baseada na NR-01</strong>
      @if($nomeEmpresa)
      realizada pela <strong>{{ $nomeEmpresa }}</strong>.
      @else
      .
      @endif
  </p>

  <p style="font-size:14px;color:#4A5D53;line-height:1.8;margin:0 0 18px;">
      No questionário, você encontrará uma série de questões relacionadas à sua rotina de trabalho.
      Basta selecionar a alternativa que melhor representa sua percepção sobre cada situação apresentada.
  </p>

  <div style="background:#F6FAF8;border:1px solid #DDEAE3;border-radius:10px;padding:18px;margin:0 0 24px;">
      <p style="margin:0 0 12px;font-size:14px;color:#2F4F3E;">
          <strong>Objetivo:</strong> Identificar e avaliar fatores psicossociais para subsidiar ações de bem-estar,
          qualidade de vida e melhoria contínua do ambiente organizacional.
      </p>

      <p style="margin:0 0 12px;font-size:14px;color:#2F4F3E;">
          <strong>Sigilo Absoluto:</strong> Todas as respostas são tratadas de forma confidencial.
          Nenhuma informação individual será compartilhada com a empresa.
          Os resultados serão apresentados apenas de forma consolidada e estatística.
      </p>

      <p style="margin:0;font-size:14px;color:#2F4F3E;">
          <strong>Tempo estimado:</strong> Menos de 10 minutos.
      </p>
  </div>

  <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
          <td align="center" style="padding:8px 0 28px;">
              <a href="{{ $linkPesquisa }}"
                 style="display:inline-block;background:#1F6B43;color:#ffffff;text-decoration:none;
                        padding:14px 36px;border-radius:10px;font-size:15px;font-weight:700;
                        letter-spacing:-0.01em;">
                  Responder Avaliação
              </a>
          </td>
      </tr>
  </table>

  <p style="font-size:14px;color:#4A5D53;line-height:1.8;margin:0 0 24px;">
      Sua participação é fundamental para contribuir com a construção de um ambiente de trabalho cada vez mais saudável, seguro e produtivo.
  </p>

  <p style="font-size:12px;color:#94A199;text-align:center;margin:0 0 8px;">
      Caso o botão acima não funcione, copie e cole o link abaixo em seu navegador:
  </p>

  <p style="font-size:11px;color:#94A199;text-align:center;word-break:break-all;margin:0;">
      <a href="{{ $linkPesquisa }}" style="color:#2D8659;">{{ $linkPesquisa }}</a>
  </p>
  <p style="font-size:12px;color:#BFC9C2;margin:0 0 4px;">
    Atenciosamente,
</p>

<p style="font-size:12px;color:#6B7B72;margin:0 0 4px;font-weight:600;">
    Equipe Avalia.One
</p>

<p style="font-size:11px;color:#DBE2DD;margin:0;">
    Plataforma de Avaliação de Fatores Psicossociais e Gestão Ergonômica
</p>
</td>