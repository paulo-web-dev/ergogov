# ergo.gov — Guia de Instalação

## Pré-requisitos

| Ferramenta | Versão mínima |
|------------|---------------|
| PHP        | 8.1+          |
| Composer   | 2.x           |
| Node.js    | 18+           |
| npm        | 9+            |
| MySQL      | 8.0+ (ou MariaDB 10.6+) |

---

## Passo a Passo

### 1. Clonar / extrair o projeto

```bash
# Se recebeu um ZIP, extraia para a pasta desejada
unzip ergogov_novo.zip -d ergogov
cd ergogov
```

---

### 2. Instalar dependências PHP (Composer)

```bash
composer install
```

> **Nota:** Se receber erro de extensão PHP, instale as dependências do Laravel:
> ```bash
> sudo apt install php8.2-mbstring php8.2-xml php8.2-curl php8.2-zip php8.2-mysql
> ```

---

### 3. Instalar dependências JavaScript (npm)

```bash
npm install
```

Isso instala: **React 18**, **Vite 5**, **@vitejs/plugin-react**, **react-chartjs-2**, entre outros.

---

### 4. Configurar o ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Gere a chave da aplicação
php artisan key:generate
```

Abra o arquivo `.env` e configure:

```env
APP_NAME="ergo.gov"
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ergogov        # ← Crie este banco no MySQL
DB_USERNAME=root            # ← Seu usuário MySQL
DB_PASSWORD=                # ← Sua senha MySQL
```

---

### 5. Criar o banco de dados

No MySQL/MariaDB:

```sql
CREATE DATABASE ergogov CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

### 6. Executar as migrations

```bash
php artisan migrate
```

Opcional — popular com dados de exemplo:

```bash
php artisan db:seed
```

---

### 7. Criar o link de storage

```bash
php artisan storage:link
```

---

### 8. Compilar o frontend (Vite)

#### Para desenvolvimento (hot reload):

```bash
npm run dev
```

Isso inicia o servidor Vite em `http://localhost:5173` com **hot module replacement** — qualquer alteração nos arquivos `.jsx` é refletida instantaneamente no navegador.

#### Para produção:

```bash
npm run build
```

Gera os arquivos compilados em `public/build/`. Use este comando antes de fazer deploy.

---

### 9. Iniciar o servidor Laravel

Em outro terminal (paralelo ao `npm run dev`):

```bash
php artisan serve
```

Acesse: **http://localhost:8000**

---

## Rodando tudo junto (resumo)

Abra **2 terminais**:

**Terminal 1 — Backend:**
```bash
php artisan serve
```

**Terminal 2 — Frontend:**
```bash
npm run dev
```

Acesse `http://localhost:8000` no navegador.

---

## Estrutura do Projeto

```
ergogov/
├── app/
│   ├── Http/
│   │   └── Controllers/     ← Controladores (lógica de negócio)
│   └── Models/              ← Modelos Eloquent (banco de dados)
├── database/
│   └── migrations/          ← Estrutura do banco de dados
├── resources/
│   ├── css/
│   │   ├── app.css          ← CSS principal
│   │   └── tokens.css       ← Design tokens (cores, tipografia)
│   ├── js/
│   │   ├── components/
│   │   │   └── EgShell.jsx  ← Sidebar + Topbar compartilhados
│   │   └── pages/
│   │       ├── login.jsx
│   │       ├── home.jsx
│   │       ├── empresas.jsx
│   │       ├── hub-empresa.jsx
│   │       ├── posto-trabalho.jsx
│   │       ├── rula.jsx
│   │       ├── checklists.jsx
│   │       ├── arp-questionario.jsx
│   │       ├── dashboard.jsx
│   │       ├── usuarios.jsx
│   │       └── identidade-visual.jsx
│   └── views/
│       ├── layouts/
│       │   ├── app.blade.php    ← Layout autenticado (com sidebar)
│       │   └── public.blade.php ← Layout público (ARP, login)
│       └── pages/
│           └── *.blade.php      ← Uma view por página
├── routes/
│   └── web.php              ← Todas as rotas da aplicação
├── vite.config.js           ← Configuração do Vite
├── package.json
└── composer.json
```

---

## Como Funciona a Integração Laravel + React

1. O **Laravel** cuida das rotas, autenticação, banco de dados e regras de negócio.
2. Cada controlador busca os dados do banco e os passa como JSON para a view Blade via `$props`.
3. A view Blade renderiza um `<div id="react-root" data-props="...">`.
4. O **React** monta o componente de página nesse div, lendo os `data-props`.
5. O **Vite** compila e serve os arquivos `.jsx` com hot reload em desenvolvimento.

---

## Troubleshooting

### Erro: `Vite manifest not found`
Execute `npm run build` ou inicie `npm run dev` antes de abrir a aplicação.

### Erro: `Class not found` em algum controller
Execute:
```bash
composer dump-autoload
```

### Página em branco / erro de React
Abra o console do navegador (F12). Verifique se há erros de JavaScript. Certifique-se de que `npm run dev` está rodando.

### Erro de permissão no storage
```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

### Sessão expirando rapidamente
Verifique `SESSION_DRIVER=file` no `.env` e que o diretório `storage/framework/sessions` tem permissão de escrita.

---

## Deploy em Produção

```bash
# 1. Compilar assets
npm run build

# 2. Otimizar Laravel
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 3. Configurar .env para produção
APP_ENV=production
APP_DEBUG=false
```

---

*ergo.gov v1.0 — Sistema de Gestão Ergonômica do Trabalho*
