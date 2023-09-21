<?php

namespace App\Controller;

use App\Entity\Patient;
use App\Service\AppointmentService;
use App\Service\DoctorService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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

    #[Route('/api/appointments', name: 'app.appts.new', methods: ['POST'])]
	public function newAppt(Request $request, #[CurrentUser] ?Patient $patient, AppointmentService $appointmentService, DoctorService $doctorService): JsonResponse
	{
        $content = json_decode($request->getContent(), true);

		$doctorId = $content['doctorId'];
        $date = $content['date'];

        if (!isset($doctorId) || !isset($date)) {
            return $this->json('Missing required fields', Response::HTTP_BAD_REQUEST);
        }

        $doctor = $doctorService->findOneById($doctorId);

        $newAppt = $appointmentService->create($patient, $doctor, $date);

        if (is_string($newAppt)) {
            return $this->json($newAppt, Response::HTTP_BAD_REQUEST);
        }

		return $this->json($newAppt, Response::HTTP_OK, [], ['groups' => 'appt:read']);
	}
}