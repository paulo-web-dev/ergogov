<?php
namespace App\Http\Controllers;

use App\Models\ConviteArp;
use App\Models\ResultadoRespostaArp;
use App\Models\FuncionarioQuestionarioArp;
use App\Models\QuestionarioPerguntaArp;
use App\Services\ConviteArpService;
use Illuminate\Http\Request;

class ArpConviteController extends Controller
{
    public function __construct(private ConviteArpService $service) {}

    /**
     * Formulário ARP acessado via token único.
     * Substitui/complementa a rota /formulario/arp/{id}
     */
    public function formToken(string $token)
    {
        $convite = ConviteArp::where('token', $token)
            ->with(['colaborador', 'empresa'])
            ->firstOrFail();

        // Já respondeu?
        if ($convite->status === 'respondido') {
            return view('formarpenviado', ['jaRespondeu' => true]);
        }

        // Expirado?
        if ($convite->estaExpirado()) {
            return view('formarpenviado', ['expirado' => true]);
        }

        $empresa   = $convite->empresa;
        $perguntas = QuestionarioPerguntaArp::with('respostas')->get();

        return view('formularioarp', compact('empresa', 'perguntas', 'convite'));
    }

    /**
     * Salvar respostas vindas de um convite com token.
     */
    public function cadFormToken(Request $request)
    {
        $convite = ConviteArp::where('token', $request->token)
            ->with('colaborador')
            ->firstOrFail();

        if ($convite->status === 'respondido' || $convite->estaExpirado()) {
            return redirect()->route('form-arp-enviado');
        }

        // Usa nome/email do colaborador cadastrado
        $funcionario = new FuncionarioQuestionarioArp();
        $funcionario->nome      = $convite->colaborador->nome;
        $funcionario->email     = $convite->colaborador->email;
        $funcionario->setor     = $convite->colaborador->setor ?? $request->departamento;
        $funcionario->funcao    = $convite->colaborador->cargo ?? $request->funcao;
        $funcionario->id_empresa = $convite->id_empresa;
        $funcionario->save();

        foreach ($request->respostas as $idPergunta => $idResposta) {
            ResultadoRespostaArp::create([
                'id_pergunta' => $idPergunta,
                'id_resposta' => $idResposta,
                'id_func'     => $funcionario->id,
                'id_empresa'  => $convite->id_empresa,
            ]);
        }

        // Marca convite como respondido
        $this->service->marcarRespondido($convite);

        return redirect()->route('form-arp-enviado');
    }
}
