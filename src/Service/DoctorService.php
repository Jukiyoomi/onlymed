<?php

namespace App\Service;

use App\Entity\Doctor;
use App\Repository\DoctorRepository;

class DoctorService
{
	private DoctorRepository $doctorRepository;
    public const NUM_ITEMS = 10;

	public function __construct(DoctorRepository $doctorRepository)
	{
		$this->doctorRepository = $doctorRepository;
	}

	public function findAllByTerm(string $term, ?string $zone, int $offset): array
	{
		return $this->doctorRepository->findAllByTerm($term, $zone, self::NUM_ITEMS, $offset);
	}

    public function findOneById(int $id): ?Doctor
    {
        return $this->doctorRepository->findOneBy(['id' => $id]);
    }

    public function getCount(): int
    {
        return $this->doctorRepository->getCount();
    }

}