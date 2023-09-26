<?php

namespace App\Controller;

use App\Service\DoctorService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DoctorController extends AbstractController
{

	#[Route('/api/search', name: 'app.search', methods: ['GET'])]
	public function search(Request $request, DoctorService $doctorService): JsonResponse
	{
		$offset = $request->query->get('offset');
		$zone = $request->query->get('zone') ?? null;
		$searchTerm = $request->query->get('term');

		$doctors = $doctorService->findAllByTerm($searchTerm, $zone, $offset);

		return $this->json([
			"count" => count($doctors),
			'doctors' => $doctors,
			'error' => null
		], Response::HTTP_OK, [], ['groups' => 'doctor:read']);
	}

    #[Route('/api/doctors/{id}', name: 'app.doctor.details', methods: ['GET'])]
	public function details(int $id, DoctorService $doctorService): JsonResponse
	{
		$foundDoctor = $doctorService->findOneById($id);

        if (!$foundDoctor) {
            return $this->json([
                'doctor' => null,
                'error' => 'Doctor not found'
            ], Response::HTTP_NOT_FOUND);
        }

		return $this->json([
			'doctor' => $foundDoctor,
		], Response::HTTP_OK, [], ['groups' => 'doctor:read']);
	}
}
