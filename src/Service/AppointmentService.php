<?php

namespace App\Service;

use App\Entity\Appointment;
use App\Entity\Doctor;
use App\Entity\Patient;
use App\Repository\AppointmentRepository;
use DateTimeImmutable;
use Exception;

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

    public function create(Patient $patient, Doctor $doctor, string $date): string|Appointment
    {
        $newAppt = new Appointment();

        $newAppt->setPatient($patient);
        $newAppt->setDoctor($doctor);

        try {
            $newAppt->setPlannedAt(new DateTimeImmutable($date));
            $this->appointmentRepository->save($newAppt, true);
        } catch (Exception $e) {
            return $e->getMessage();
        }

        return $newAppt;
    }
}