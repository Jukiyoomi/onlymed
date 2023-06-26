<?php

namespace App\Service;

use App\Repository\DoctorRepository;

class DoctorService
{
	private DoctorRepository $doctorRepository;

	public function __construct(DoctorRepository $doctorRepository)
	{
		$this->doctorRepository = $doctorRepository;
	}

	public function findAllByTerm(string $term, int $offset): array
	{
		$numItemsPerPage = 10;
		return $this->doctorRepository->findAllByTerm($term, $numItemsPerPage, $offset);
	}
}