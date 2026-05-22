<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'ergo.gov')</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/pages/' . $page_script . '.jsx'])
</head>
<body>
    <div id="react-root" data-props="{{ json_encode($props ?? []) }}"></div>
</body>
</html>
