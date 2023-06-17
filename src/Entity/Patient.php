<?php

namespace App\Entity;

use App\Repository\PatientRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PatientRepository::class)]
class Patient extends User
{
	private string $role = 'ROLE_PATIENT';
	public function __construct()
	{
		parent::__construct();
		$this->roles[] = $this->role;
	}
}
