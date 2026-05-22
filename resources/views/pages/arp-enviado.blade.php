@php $page_script = 'arp-questionario'; @endphp
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Respostas enviadas — ergo.gov</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css'])
</head>
<body style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:var(--canvas,#f4f6f4);font-family:Outfit,sans-serif;">
    <div style="text-align:center;padding:48px;background:#fff;border-radius:16px;box-shadow:0 2px 16px rgba(0,0,0,0.07);max-width:480px;">
        <div style="font-size:64px;margin-bottom:24px;">✅</div>
        <h1 style="font-size:24px;font-weight:700;color:#1a3a2a;margin-bottom:12px;">Respostas enviadas com sucesso!</h1>
        <p style="color:#555;line-height:1.6;">Obrigado pela sua participação. Suas respostas são anônimas e serão utilizadas para melhorar as condições de trabalho.</p>
        <p style="margin-top:24px;font-size:13px;color:#888;">Você já pode fechar esta página.</p>
    </div>
</body>
</html>
