<?php

namespace App\Entity;

use App\Repository\DoctorRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DoctorRepository::class)]
class Doctor extends User
{
	private string $role = 'ROLE_DOCTOR';
	public function __construct()
	{
		parent::__construct();
		$this->roles[] = $this->role;
	}

    #[ORM\Column(length: 150)]
    private string $phone;

    #[ORM\Column(options: ['default' => false])]
    private bool $isVerified;


    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getIsVerified(): ?bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(bool $isVerified): self
    {
        $this->isVerified = $isVerified;

        return $this;
    }
}
