<?php

namespace App\DataFixtures;

use App\Entity\Doctor;
use App\Repository\SpecialityRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class DoctorFixture extends Fixture implements DependentFixtureInterface
{

    private SpecialityRepository $specialityRepository;

    public function __construct(SpecialityRepository $specialityRepository)
    {
        $this->specialityRepository = $specialityRepository;
    }

    public function load(ObjectManager $manager): void
	{
		$faker = Factory::create("fr_FR");
        for ($i = 0; $i < 50; $i++) {
             $doctor = new Doctor();
             $doctor->setFirstName($faker->firstName);
             $doctor->setLastName($faker->lastName);
             $doctor->setEmail($faker->email);
			 $doctor->setAddress($faker->address);
             $doctor->setPassword($faker->password);
             $doctor->setPhone($faker->phoneNumber);
                 $doctor->setSpeciality(
                     $this->specialityRepository->findRandom()
                 );
             $manager->persist($doctor);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return array(SpecialityFixture::class);
    }
}