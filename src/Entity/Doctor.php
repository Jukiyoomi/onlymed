<?php

namespace App\Entity;

use App\Repository\DoctorRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: DoctorRepository::class)]
class Doctor extends User
{
	private string $role = 'ROLE_DOCTOR';
	public function __construct()
	{
		parent::__construct();
		$this->roles[] = $this->role;
		$this->isVerified = false;
	 	$this->appointments = new ArrayCollection();
	}

    #[ORM\Column(length: 150)]
    private string $phone;

    #[ORM\Column]
    private bool $isVerified;

	#[ORM\ManyToOne(targetEntity: Speciality::class, inversedBy: 'doctors')]
	#[Groups(['doctor:read', 'doctor:read:one', 'appt:read'])]
	private Speciality $speciality;

	#[ORM\Column]
	#[Groups(['user:read', 'doctor:read', 'doctor:read:one', 'appt:read'])]
	private ?string $address = null;

    #[ORM\OneToMany(mappedBy: 'doctor', targetEntity: Appointment::class)]
    private Collection $appointments;

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

	/**
	 * @return Speciality
	 */
	public function getSpeciality(): Speciality
	{
		return $this->speciality;
	}

	/**
	 * @param Speciality $speciality
	 */
	public function setSpeciality(Speciality $speciality): void
	{
		$this->speciality = $speciality;
	}



	public function getAddress(): ?string
	{
		return $this->address;
	}

	public function setAddress(?string $address): void
               	{
               		$this->address = $address;
               	}

    public function getAppointments(): Collection
    {
        return $this->appointments;
    }

    public function addAppointment(Appointment $appointment): self
    {
        if (!$this->appointments->contains($appointment)) {
            $this->appointments->add($appointment);
            $appointment->setDoctor($this);
        }

        return $this;
    }

    public function removeAppointment(Appointment $appointment): self
    {
        if ($this->appointments->removeElement($appointment)) {
            // set the owning side to null (unless already changed)
            if ($appointment->getDoctor() === $this) {
                $appointment->setDoctor(null);
            }
        }

        return $this;
    }
}
