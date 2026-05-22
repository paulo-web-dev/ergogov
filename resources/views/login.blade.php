<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>ergo.gov — Login</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Outfit', sans-serif; min-height: 100vh; display: flex; }

        .login-left {
            width: 45%;
            background: linear-gradient(160deg, #0F3D2A 0%, #0A2A1C 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 48px;
            position: relative;
            overflow: hidden;
        }
        .login-left::before {
            content: '';
            position: absolute;
            width: 400px; height: 400px;
            background: radial-gradient(circle, rgba(95,184,148,0.12) 0%, transparent 70%);
            top: -100px; right: -100px;
        }
        .login-left::after {
            content: '';
            position: absolute;
            width: 300px; height: 300px;
            background: radial-gradient(circle, rgba(95,184,148,0.08) 0%, transparent 70%);
            bottom: -80px; left: -80px;
        }
        .login-wordmark {
            font-size: 42px;
            font-weight: 800;
            letter-spacing: -0.04em;
            color: #fff;
            margin-bottom: 16px;
            position: relative;
            z-index: 1;
        }
        .login-wordmark .dot { color: #5FB894; }
        .login-wordmark .gov { color: #8FCDB1; }
        .login-tagline {
            font-size: 15px;
            color: rgba(220,239,226,0.65);
            text-align: center;
            max-width: 300px;
            line-height: 1.6;
            position: relative;
            z-index: 1;
        }
        .login-badge {
            margin-top: 32px;
            background: rgba(95,184,148,0.15);
            border: 1px solid rgba(95,184,148,0.3);
            border-radius: 20px;
            padding: 6px 16px;
            font-size: 12px;
            color: #8FCDB1;
            position: relative;
            z-index: 1;
        }

        .login-right {
            flex: 1;
            background: #F5F8F6;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 48px;
        }
        .login-card {
            background: #fff;
            border-radius: 16px;
            border: 1px solid #ECF0EE;
            box-shadow: 0 4px 24px rgba(0,0,0,0.06);
            padding: 40px;
            width: 100%;
            max-width: 400px;
        }
        .login-card h1 {
            font-size: 22px;
            font-weight: 700;
            color: #0F1A14;
            margin-bottom: 6px;
        }
        .login-card .subtitle {
            font-size: 14px;
            color: #6B7B72;
            margin-bottom: 28px;
        }
        .form-group { margin-bottom: 18px; }
        .form-group label {
            display: block;
            font-size: 13px;
            font-weight: 500;
            color: #4A5D53;
            margin-bottom: 6px;
        }
        .form-group input {
            width: 100%;
            padding: 10px 14px;
            border: 1px solid #DBE2DD;
            border-radius: 8px;
            font-family: 'Outfit', sans-serif;
            font-size: 14px;
            color: #1A2620;
            background: #fff;
            transition: border-color 0.15s;
            outline: none;
        }
        .form-group input:focus {
            border-color: #2D8659;
            box-shadow: 0 0 0 3px rgba(45,134,89,0.10);
        }
        .btn-login {
            width: 100%;
            padding: 11px;
            background: #1F6B43;
            color: #fff;
            border: none;
            border-radius: 8px;
            font-family: 'Outfit', sans-serif;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.15s;
            margin-top: 8px;
        }
        .btn-login:hover { background: #2D8659; }
        .error-msg {
            background: #FEF1F1;
            color: #B91C1C;
            border: 1px solid #FCA5A5;
            border-radius: 8px;
            padding: 10px 14px;
            font-size: 13px;
            margin-bottom: 16px;
        }
        .login-footer {
            text-align: center;
            margin-top: 24px;
            font-size: 12px;
            color: #94A199;
        }
        @media (max-width: 768px) {
            .login-left { display: none; }
            .login-right { padding: 24px; }
        }
    </style>
</head>
<body>

<div class="login-left">
    <div class="login-wordmark">ergo<span class="dot">.</span><span class="gov">gov</span></div>
    <p class="login-tagline">Análise Ergonômica do Trabalho — simplificada e digital</p>
    <span class="login-badge">✦ Conforme NR-17 · Portaria MTE 423/2021</span>
</div>

<div class="login-right">
    <div class="login-card">
        <h1>Bem-vindo de volta</h1>
        <p class="subtitle">Acesse sua conta para continuar</p>

        @if($errors->any())
        <div class="error-msg">
            @foreach($errors->all() as $error)
                {{ $error }}<br>
            @endforeach
        </div>
        @endif

        <form method="POST" action="{{ route('login') }}">
            @csrf
            <div class="form-group">
                <label for="email">E-mail</label>
                <input type="email" id="email" name="email" value="{{ old('email') }}"
                       placeholder="seu@email.com" required autofocus>
            </div>
            <div class="form-group">
                <label for="password">Senha</label>
                <input type="password" id="password" name="password"
                       placeholder="••••••••" required>
            </div>
            <button type="submit" class="btn-login">Entrar</button>
        </form>

        <p class="login-footer">ergo.gov © {{ date('Y') }} · Sistema de Gestão Ergonômica</p>
    </div>
</div>

</body>
</html>
