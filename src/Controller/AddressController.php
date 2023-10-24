<?php

namespace App\Controller;

use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class AddressController extends AbstractController
{
    private const BASE_URL = "https://api.woosmap.com";

    #[Route('/api/doctor/autocomplete', name: 'app.doctors.autocomplete', methods: ['GET', 'PUT'])]
    public function getAddresses(Request $request, LoggerInterface $logger, HttpClientInterface $client): JsonResponse
    {
        $search = $request->query->get('address');

        $args = [
            'language' => 'fr',
            'input' => $search,
            'private_key' => $this->getParameter('woosmap_key'),
        ];
        $url = self::BASE_URL . "/address/autocomplete/json?" . http_build_query($args);
        $logger->info("URL : " . $url);

        $response = $client->request('GET', $url);

        $data = $response->toArray();

        $logger->info("Statut : " . $data['status']);

        if ($data['status'] !== 'OK') {
            return $this->json([
                "error" => "Un problème est survenu lors de la recherche de l'adresse. Veuillez réessayer plus tard si le problème persiste.",
                "path" => "address"
            ], Response::HTTP_BAD_REQUEST);
        }

        $predictions = [];

        foreach ($response->toArray()['predictions'] as $prediction) {
            $predictions[] = [
                'description' => $prediction['description'],
                'public_id' => $prediction['public_id'],
            ];
        }

        $logger->info("Predictions : " . json_encode($predictions));

        return $this->json($predictions, Response::HTTP_OK);
    }
}