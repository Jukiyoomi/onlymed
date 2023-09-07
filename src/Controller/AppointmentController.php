<?php

namespace App\Controller;

use App\Entity\Patient;
use App\Service\AppointmentService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class AppointmentController extends AbstractController
{
	#[Route('/api/appointments', name: 'app.appts.read', methods: ['GET'])]
	public function search(#[CurrentUser] ?Patient $patient, AppointmentService $service): JsonResponse
	{
		$appts = $service->findAllByUser($patient->getId());

		return $this->json([
			'appointments' => $appts,
			'error' => null
		], Response::HTTP_OK, [], ['groups' => 'appt:read']);
	}
}