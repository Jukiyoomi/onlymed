<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\DoctorService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class DoctorController extends AbstractController
{

	#[Route('/api/search', name: 'app.search', methods: ['GET'])]
	public function search(#[CurrentUser] ?User $user, Request $request, DoctorService $doctorService): JsonResponse
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
}
