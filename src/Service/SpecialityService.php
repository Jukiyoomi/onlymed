<?php

namespace App\Service;

use App\Repository\SpecialityRepository;

class SpecialityService
{
    private SpecialityRepository $specialityRepository;

    public function __construct(SpecialityRepository $specialityRepository)
    {
        $this->specialityRepository = $specialityRepository;
    }

    public function findAll(): array
    {
        return $this->specialityRepository->findAll();
    }
}