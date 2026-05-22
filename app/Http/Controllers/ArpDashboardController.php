<?php

namespace App\Http\Controllers;

use App\Models\Empresas;
use App\Services\ArpCalculationService;
use Illuminate\Http\Request;
use Auth;

class ArpDashboardController extends Controller
{
    public function __construct(private ArpCalculationService $arpService)
    {
        $this->middleware('auth');
    }

    /**
     * Dashboard principal ARP de uma empresa.
     */
    public function dashboard(int $idEmpresa)
    {
        $empresa = Empresas::findOrFail($idEmpresa);

        // Garante que a empresa pertence ao usuário logado
        abort_unless(
            $empresa->id_user == Auth::user()->id_instituicao,
            403,
            'Acesso não autorizado.'
        );

        $dados = $this->arpService->processar($idEmpresa);

        return view('arp.dashboard', compact('empresa', 'dados'));
    }

    /**
     * Retorna dados do dashboard em JSON para atualização via AJAX.
     */
    public function dadosJson(int $idEmpresa)
    {
        $empresa = Empresas::findOrFail($idEmpresa);
        abort_unless($empresa->id_user == Auth::user()->id_instituicao, 403);

        $dados = $this->arpService->processar($idEmpresa);

        return response()->json([
            'empresa'       => ['id' => $empresa->id, 'nome' => $empresa->nome],
            'participantes' => $dados['participantes'],
            'score_geral'   => $dados['score_geral'],
            'nivel_geral'   => $dados['nivel_geral'],
            'maior_risco'   => $dados['maior_risco'],
            'categorias'    => $dados['categorias'],
            'distribuicao'  => $dados['distribuicao'],
            'radar'         => [
                'labels' => $dados['radar_labels'],
                'scores' => $dados['radar_scores'],
                'cores'  => $dados['radar_cores'],
            ],
        ]);
    }
}
