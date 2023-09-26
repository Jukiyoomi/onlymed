<?php

namespace App\Service;

use App\Entity\Doctor;
use App\Repository\DoctorRepository;

class DoctorService
{
	private DoctorRepository $doctorRepository;

	public function __construct(DoctorRepository $doctorRepository)
	{
		$this->doctorRepository = $doctorRepository;
	}

	public function findAllByTerm(string $term, ?string $zone, int $offset): array
	{
		$numItemsPerPage = 10;
		return $this->doctorRepository->findAllByTerm($term, $zone, $numItemsPerPage, $offset);
	}

    public function findOneById(int $id): ?Doctor
    {
        return $this->doctorRepository->findOneBy(['id' => $id]);
    }

}