<?php

namespace App\Services;

use App\Models\ResultadoRespostaArp;

class ArpService
{
    /**
     * Calcula médias gerais e por setor para uma empresa.
     * Extraído do EmpresaController original — centralizado para reutilização.
     */
    public function calcular(int $idEmpresa): array
    {
        $arp = ResultadoRespostaArp::where('id_empresa', $idEmpresa)
            ->with('pergunta.categoria.categoria', 'resposta', 'funcionario')
            ->get();

        if ($arp->isEmpty()) {
            return [
                'mediasGerais'           => [],
                'mediasPorSetor'         => [],
                'totalParticipantesGeral'=> 0,
            ];
        }

        $categoriasGerais    = [];
        $dadosPorSetor       = [];
        $participantesGerais = [];

        foreach ($arp as $item) {
            if (!$item->funcionario || !$item->resposta) continue;

            $categoria      = $item->pergunta->categoria->categoria->nome ?? 'Sem categoria';
            $setor          = $item->funcionario->setor ?? 'Sem setor definido';
            $idFuncionario  = $item->funcionario->id;

            preg_match('/^\d+/', $item->resposta->resposta ?? '', $matches);
            $valor = isset($matches[0]) ? (int)$matches[0] : null;

            if ($valor !== null) {
                $categoriasGerais[$categoria][]                              = $valor;
                $participantesGerais[$idFuncionario]                         = true;
                $dadosPorSetor[$setor]['valores'][$categoria][]              = $valor;
                $dadosPorSetor[$setor]['participantes'][$idFuncionario]       = true;
            }
        }

        $mediasGerais            = $this->calcularMedias($categoriasGerais);
        $totalParticipantesGeral = count($participantesGerais);

        $mediasPorSetor = [];
        foreach ($dadosPorSetor as $setor => $dados) {
            $mediasPorSetor[$setor] = [
                'medias'            => $this->calcularMedias($dados['valores']),
                'totalParticipantes'=> count($dados['participantes']),
            ];
        }

        return compact('mediasGerais', 'mediasPorSetor', 'totalParticipantesGeral');
    }

    private function calcularMedias(array $categorias): array
    {
        $medias = [];
        foreach ($categorias as $categoria => $valores) {
            $media = count($valores) > 0 ? array_sum($valores) / count($valores) : 0;
            $medias[] = [
                'categoria' => $categoria,
                'media'     => round($media, 2),
                'nivel'     => match(true) {
                    $media <= 1 => 'Leve',
                    $media <= 2 => 'Moderado',
                    $media <= 3 => 'Sério',
                    default     => 'Severo',
                },
            ];
        }
        return $medias;
    }
}
