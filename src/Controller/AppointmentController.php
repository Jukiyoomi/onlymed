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

		return $this->json($appts, Response::HTTP_OK, [], ['groups' => 'appt:read']);
	}

    #[Route('/api/appointments', name: 'app.appts.new', methods: ['POST'])]
	public function newAppt(Request $request, #[CurrentUser] ?Patient $patient, AppointmentService $appointmentService, DoctorService $doctorService): JsonResponse
	{
        $content = json_decode($request->getContent(), true);

		$doctorId = $content['doctorId'];
        $date = $content['date'];
        $timestamp = $content['timestamp'];

        if (!isset($doctorId) || !isset($date) || !isset($timestamp)) {
            return $this->json('Missing required fields', Response::HTTP_BAD_REQUEST);
        }

		if ($timestamp < time()) {
			return $this->json('Cannot schedule an appointment in the past', Response::HTTP_BAD_REQUEST);
		}

        $doctor = $doctorService->findOneById($doctorId);

        $newAppt = $appointmentService->create($patient, $doctor, $date, $timestamp);

        if (is_string($newAppt)) {
            return $this->json($newAppt, Response::HTTP_BAD_REQUEST);
        }

		return $this->json($newAppt, Response::HTTP_OK, [], ['groups' => 'appt:read']);
	}

	#[Route('/api/appointments/{id}', name: 'app.appts.timestamps', methods: ['GET'])]
	public function getApptTimestamps(AppointmentService $appointmentService, int $id): JsonResponse
	{
		$timestamps = $appointmentService->findApptTimestampsByDoctor($id);

		return $this->json($timestamps, Response::HTTP_OK, [], ['groups' => 'appt:read']);
	}
}