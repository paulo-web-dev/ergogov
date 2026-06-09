<?php
namespace App\Http\Controllers;

use App\Models\ColaboradorArp;
use App\Models\ConviteArp;
use App\Models\Empresas;
use App\Services\ConviteArpService;
use Illuminate\Http\Request;
use Auth;

class ColaboradorArpController extends Controller
{
    public function __construct(private ConviteArpService $service)
    {
        $this->middleware('auth');
    }

    /** Dashboard de colaboradores e convites de uma empresa */
    public function index(int $idEmpresa)
    {
        $empresa = Empresas::findOrFail($idEmpresa);
        abort_unless($empresa->id_user == Auth::user()->id_instituicao, 403);

        $kpis = $this->service->kpis($idEmpresa);

        $colaboradores = ColaboradorArp::where('id_empresa', $idEmpresa)
            ->with(['conviteAtivo'])
            ->orderBy('nome')
            ->paginate(30);

        return view('arp.colaboradores.index', compact('empresa', 'kpis', 'colaboradores'));
    }

    /** Formulário de cadastro individual */
    public function create(int $idEmpresa)
    {
        $empresa = Empresas::findOrFail($idEmpresa);
        abort_unless($empresa->id_user == Auth::user()->id_instituicao, 403);
        return view('arp.colaboradores.create', compact('empresa'));
    }

    /** Salvar colaborador individual */
    public function store(Request $request, int $idEmpresa)
    {
        $empresa = Empresas::findOrFail($idEmpresa);
        abort_unless($empresa->id_user == Auth::user()->id_instituicao, 403);

        $request->validate([
            'nome'  => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'cargo' => 'nullable|string|max:255',
            'setor' => 'nullable|string|max:255',
        ]);

        ColaboradorArp::firstOrCreate(
            ['id_empresa' => $idEmpresa, 'email' => strtolower($request->email)],
            ['nome' => $request->nome, 'cargo' => $request->cargo, 'setor' => $request->setor, 'status' => 'ativo']
        );

        return redirect()->route('arp.colaboradores.index', $idEmpresa)
            ->with('success', 'Colaborador cadastrado com sucesso!');
    }

    /** Importação em lote (texto colado ou CSV) */
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

    /** Ativar/inativar colaborador */
    public function toggleStatus(int $id)
    {
        $c = ColaboradorArp::findOrFail($id);
        abort_unless($c->empresa->id_user == Auth::user()->id_instituicao, 403);

        $c->update(['status' => $c->status === 'ativo' ? 'inativo' : 'ativo']);

        return back()->with('success', 'Status atualizado.');
    }

    /** Excluir colaborador */
    public function destroy(int $id)
    {
        $c = ColaboradorArp::findOrFail($id);
        abort_unless($c->empresa->id_user == Auth::user()->id_instituicao, 403);
        $c->delete();
        return back()->with('success', 'Colaborador removido.');
    }

    /** Criar convites para todos ativos sem convite */
    public function criarConvites(Request $request, int $idEmpresa)
    {
        $empresa = Empresas::findOrFail($idEmpresa);
        abort_unless($empresa->id_user == Auth::user()->id_instituicao, 403);

        $criados = $this->service->criarConvites($idEmpresa);

        return back()->with('success', "$criados convite(s) criado(s).");
    }

    /** Disparar e-mails em massa */
    public function dispararEmails(int $idEmpresa)
    {
        $empresa = Empresas::findOrFail($idEmpresa);
        abort_unless($empresa->id_user == Auth::user()->id_instituicao, 403);

        // Cria convites que faltam antes de disparar
        $this->service->criarConvites($idEmpresa);
        $disparados = $this->service->dispararEnvioMassa($idEmpresa);

        return back()->with('success', "✉ $disparados e-mail(s) adicionado(s) à fila de envio.");
    }

    /** Reenviar apenas para pendentes */
    public function reenviarPendentes(int $idEmpresa)
    {
        $empresa = Empresas::findOrFail($idEmpresa);
        abort_unless($empresa->id_user == Auth::user()->id_instituicao, 403);

        $reenviados = $this->service->reenviarPendentes($idEmpresa);

        return back()->with('success', "↺ $reenviados lembrete(s) enviado(s) para pendentes.");
    }

    /** Copiar link individual */
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
