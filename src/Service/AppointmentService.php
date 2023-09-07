<?php

namespace App\Service;

use App\Repository\AppointmentRepository;

class AppointmentService
{
	private AppointmentRepository $appointmentRepository;

	public function __construct(AppointmentRepository $appointmentRepository)
	{
		$this->appointmentRepository = $appointmentRepository;
	}

	public function findAllByUser(int $userId): array
	{
		return $this->appointmentRepository->findBy([
			'patient' => $userId
		]);
	}
}