<?php

namespace App\Entity;

use App\Repository\DoctorRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: DoctorRepository::class)]
class Doctor extends User
{
	private string $role = 'ROLE_DOCTOR';
	public function __construct()
	{
		parent::__construct();
		$this->roles[] = $this->role;
		$this->specialities = new ArrayCollection();
		$this->isVerified = false;
	}

    #[ORM\Column(length: 150)]
    private string $phone;

    #[ORM\Column]
    private bool $isVerified;

	#[ORM\ManyToMany(targetEntity: Speciality::class, inversedBy: 'doctors')]
	private Collection $specialities;

	#[ORM\Column]
	private ?string $address = null;

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

	public function getSpecialities(): Collection
	{
		return $this->specialities;
	}

	public function addSpeciality(Speciality $speciality): self
	{
		if (!$this->specialities->contains($speciality)) {
			$this->specialities[] = $speciality;
		}

		return $this;
	}

	public function removeSpeciality(Speciality $speciality): self
	{
		$this->specialities->removeElement($speciality);

		return $this;
	}

	/**
	 * @return string|null
	 */
	public function getAddress(): ?string
	{
		return $this->address;
	}

	/**
	 * @param string|null $address
	 */
	public function setAddress(?string $address): void
	{
		$this->address = $address;
	}


}
