<?php
namespace App\Http\Controllers;

use App\Models\ColaboradorArp;
use App\Models\ConviteArp;
use App\Models\Empresas;
use App\Models\FuncionarioQuestionarioArp;
use App\Services\ConviteArpService;
use App\Jobs\EnviarConviteArpJob;
use Illuminate\Http\Request;
use Auth;

class ColaboradorArpController extends Controller
{
    public function __construct(private ConviteArpService $service)
    {
        $this->middleware('auth');
    }

    public function index(int $idEmpresa)
    {
        $empresa = Empresas::findOrFail($idEmpresa);
        abort_unless($empresa->id_user == Auth::user()->id_instituicao, 403);
    
        // ── Base ÚNICA: KPIs e tabela saem daqui, então os números sempre fecham ──
        $todos = ColaboradorArp::where('id_empresa', $idEmpresa)
            ->with('conviteAtivo')
            ->orderBy('nome')
            ->get();
    
        // Status normalizado (derivado das datas, não do campo status do convite,
        // que pode estar desatualizado quando a resposta chega pelo link público).
        $todos->each(fn ($c) => $c->status_convite = $this->statusConvite($c));
    
        // KPIs contam apenas ATIVOS (é o que o card promete: "cadastrados e ativos")
        $ativos = $todos->where('status', 'ativo');
    
        $total       = $ativos->count();
        $respondidos = $ativos->where('status_convite', 'respondido')->count();
        $enviados    = $ativos->whereIn('status_convite', ['enviado', 'respondido', 'expirado'])->count();
        $semResposta = max($enviados - $respondidos, 0);   // recebeu E não respondeu
        $naoEnviados = max($total - $enviados, 0);         // nunca recebeu
    
        $kpis = [
            'colaboradores' => $total,
            'cadastrados'   => $todos->count(),   // inclui inativos (tabela mostra todos)
            'inativos'      => $todos->count() - $total,
            'enviados'      => $enviados,         // inclui os que já responderam
            'respondidos'   => $respondidos,
            'sem_resposta'  => $semResposta,
            'nao_enviados'  => $naoEnviados,
            'convidados'    => $total,
            'taxa'          => $total > 0 ? (int) round($respondidos / $total * 100) : 0,
            'taxa_enviados' => $enviados > 0 ? (int) round($respondidos / $enviados * 100) : 0,
        ];
    
        // ── Paginação sobre a mesma coleção ──────────────────────────────────────
        $perPage = 50;
        $page    = LengthAwarePaginator::resolveCurrentPage();
    
        $colaboradores = new LengthAwarePaginator(
            $todos->forPage($page, $perPage)->values(),
            $todos->count(),
            $perPage,
            $page,
            ['path' => request()->url(), 'query' => request()->query()]
        );
    
        // ── Setor/função vindos do "DOC de ARP" ──────────────────────────────────
        // O setor real é o que a pessoa preencheu no formulário e foi gravado em
        // funcionario_questionario_arp. Cruzamos por e-mail (mesma lógica do
        // relatório). orderBy('id') faz prevalecer a última resposta do mesmo e-mail.
        $docPorEmail = FuncionarioQuestionarioArp::where('id_empresa', $idEmpresa)
            ->orderBy('id')
            ->get(['email', 'setor', 'funcao'])
            ->keyBy(fn ($f) => mb_strtolower(trim((string) $f->email)));
    
        foreach ($colaboradores as $c) {
            $doc = $docPorEmail->get(mb_strtolower(trim((string) $c->email)));
    
            $c->setor_doc  = filled($doc?->setor)  ? $doc->setor  : ($c->setor ?: null);
            $c->funcao_doc = filled($doc?->funcao) ? $doc->funcao : ($c->cargo ?: null);
        }
    
        return view('arp.colaboradores.index', compact('empresa', 'kpis', 'colaboradores'));
    }
    
    /**
     * Status real do convite, derivado das datas (fonte da verdade).
     * respondido > enviado > expirado > pendente > sem_convite
     */
    private function statusConvite($c): string
    {
        $convite = $c->conviteAtivo;
    
        if (!$convite) {
            return 'sem_convite';
        }
        if (filled($convite->respondido_em)) {
            return 'respondido';
        }
        if (filled($convite->enviado_em)) {
            return ($convite->status === 'expirado') ? 'expirado' : 'enviado';
        }
    
        return 'pendente';
    }

    public function create(int $idEmpresa)
    {
        $empresa = Empresas::findOrFail($idEmpresa);
        abort_unless($empresa->id_user == Auth::user()->id_instituicao, 403);
        return view('arp.colaboradores.create', compact('empresa'));
    }

    public function store(Request $request, int $idEmpresa)
    {
        $empresa = Empresas::findOrFail($idEmpresa);
        abort_unless($empresa->id_user == Auth::user()->id_instituicao, 403);

        $request->validate([
            'nome'            => 'required|string|max:255',
            'email'           => 'required|email|max:255',
            'cargo'           => 'nullable|string|max:255',
            'descricao_cargo' => 'nullable|string',
            'setor'           => 'nullable|string|max:255',
        ]);

        ColaboradorArp::firstOrCreate(
            ['id_empresa' => $idEmpresa, 'email' => strtolower($request->email)],
            [
                'nome'            => $request->nome,
                'cargo'           => $request->cargo,
                'descricao_cargo' => $request->descricao_cargo,
                'setor'           => $request->setor,
                'status'          => 'ativo',
            ]
        );

        return redirect()->route('arp.colaboradores.index', $idEmpresa)
            ->with('success', 'Colaborador cadastrado com sucesso!');
    }

    /** ── NOVO: Formulário de edição ── */
    public function edit(int $id)
    {
        $colaborador = ColaboradorArp::with('empresa')->findOrFail($id);
        abort_unless($colaborador->empresa->id_user == Auth::user()->id_instituicao, 403);

        $empresa = $colaborador->empresa;

        return view('arp.colaboradores.edit', compact('colaborador', 'empresa'));
    }

    /** ── NOVO: Salvar edição ── */
    public function update(Request $request, int $id)
    {
        $colaborador = ColaboradorArp::with('empresa')->findOrFail($id);
        abort_unless($colaborador->empresa->id_user == Auth::user()->id_instituicao, 403);

        $request->validate([
            'nome'            => 'required|string|max:255',
            'email'           => 'required|email|max:255',
            'cargo'           => 'nullable|string|max:255',
            'descricao_cargo' => 'nullable|string',
            'setor'           => 'nullable|string|max:255',
            'status'          => 'nullable|in:ativo,inativo',
        ]);

        $colaborador->update([
            'nome'            => $request->nome,
            'email'           => strtolower($request->email),
            'cargo'           => $request->cargo,
            'descricao_cargo' => $request->descricao_cargo,
            'setor'           => $request->setor,
            'status'          => $request->status ?? $colaborador->status,
        ]);

        return redirect()->route('arp.colaboradores.index', $colaborador->id_empresa)
            ->with('success', 'Colaborador atualizado com sucesso!');
    }

    public function importarLote(Request $request, int $idEmpresa)
    {
        $empresa = Empresas::findOrFail($idEmpresa);
        abort_unless($empresa->id_user == Auth::user()->id_instituicao, 403);

        $request->validate(['lista' => 'required|string|min:5']);

        $resultado = $this->service->importarEmLote($idEmpresa, $request->lista);

        $msg = "✓ {$resultado['criados']} colaborador(es) importado(s).";
        if (!empty($resultado['erros'])) {
            $msg .= ' Erros: ' . implode(' | ', $resultado['erros']);
        }

        return redirect()->route('arp.colaboradores.index', $idEmpresa)->with('success', $msg);
    }

    public function toggleStatus(int $id)
    {
        $c = ColaboradorArp::findOrFail($id);
        abort_unless($c->empresa->id_user == Auth::user()->id_instituicao, 403);
        $c->update(['status' => $c->status === 'ativo' ? 'inativo' : 'ativo']);
        return back()->with('success', 'Status atualizado.');
    }

    public function destroy(int $id)
    {
        $c = ColaboradorArp::findOrFail($id);
        abort_unless($c->empresa->id_user == Auth::user()->id_instituicao, 403);
        $c->delete();
        return back()->with('success', 'Colaborador removido.');
    }

    public function criarConvites(Request $request, int $idEmpresa)
    {
        $empresa = Empresas::findOrFail($idEmpresa);
        abort_unless($empresa->id_user == Auth::user()->id_instituicao, 403);
        $criados = $this->service->criarConvites($idEmpresa);
        return back()->with('success', "$criados convite(s) criado(s).");
    }

    public function dispararEmails(int $idEmpresa)
    {
        $empresa = Empresas::findOrFail($idEmpresa);
        abort_unless($empresa->id_user == Auth::user()->id_instituicao, 403);
        $this->service->criarConvites($idEmpresa);
        $disparados = $this->service->dispararEnvioMassa($idEmpresa);
        return back()->with('success', "✉ $disparados e-mail(s) adicionado(s) à fila de envio.");
    }

    public function reenviarPendentes(int $idEmpresa)
    {
        $empresa = Empresas::findOrFail($idEmpresa);
        abort_unless($empresa->id_user == Auth::user()->id_instituicao, 403);
        $reenviados = $this->service->reenviarPendentes($idEmpresa);
        return back()->with('success', "↺ $reenviados lembrete(s) enviado(s).");
    }

    public function enviarIndividual(int $idColaborador)
    {
        $c = ColaboradorArp::with('empresa')->findOrFail($idColaborador);
        abort_unless($c->empresa->id_user == Auth::user()->id_instituicao, 403);

        $convite = ConviteArp::where('id_colaborador', $c->id)
            ->whereIn('status', ['pendente', 'enviado'])
            ->first();

        if (!$convite) {
            $convite = ConviteArp::create([
                'id_empresa'     => $c->id_empresa,
                'id_colaborador' => $c->id,
                'token'          => ConviteArp::gerarToken(),
                'status'         => 'pendente',
                'expira_em'      => now()->addDays(30),
            ]);
        }

        EnviarConviteArpJob::dispatch($convite);

        return back()->with('success', "✉ E-mail enviado para {$c->nome}.");
    }

    public function linkConvite(int $idColaborador)
    {
        $c = ColaboradorArp::with('conviteAtivo')->findOrFail($idColaborador);
        abort_unless($c->empresa->id_user == Auth::user()->id_instituicao, 403);

        $convite = $c->conviteAtivo ?? ConviteArp::create([
            'id_empresa'     => $c->id_empresa,
            'id_colaborador' => $c->id,
            'token'          => ConviteArp::gerarToken(),
            'status'         => 'pendente',
            'expira_em'      => now()->addDays(30),
        ]);

        return response()->json(['url' => $convite->urlFormulario()]);
    }
}
