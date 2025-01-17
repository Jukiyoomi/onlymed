<?php

namespace App\Entity;

use App\Repository\SpecialityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SpecialityRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Speciality
{
    use TimestampTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
	#[Groups(['appt:read', 'doctor:read'])]
	private ?int $id = null;

    #[ORM\Column(length: 190)]
    #[Groups(['doctor:read', 'appt:read'])]
    private ?string $name = null;

	#[ORM\OneToMany(mappedBy: 'speciality', targetEntity: Doctor::class)]

	private Collection $doctors;

	public function __construct()
	{
		$this->doctors = new ArrayCollection();
	}

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

	public function getDoctors(): Collection
	{
		return $this->doctors;
	}


}
