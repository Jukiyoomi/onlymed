<?php

namespace App\DataFixtures;

use App\Entity\Doctor;
use App\Entity\Speciality;
use App\Repository\SpecialityRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class DoctorFixture extends Fixture implements DependentFixtureInterface
{

    private SpecialityRepository $specialityRepository;

    public function __construct(SpecialityRepository $specialityRepository)
    {
        $this->specialityRepository = $specialityRepository;
    }

    public function load(ObjectManager $manager)
    {
        for ($i = 0; $i < 30; $i++) {
             $doctor = new Doctor();
             $doctor->setFirstName('Doctor ' . $i);
             $doctor->setLastName('Doctor ' . $i);
             $doctor->setEmail('doctor' . $i . '@gmail.com');
             $doctor->setPassword('doctor' . $i);
             $doctor->setPhone('phone ' . $i);
             for ($j = 0; $j < 3; $j++) {
                 $doctor->addSpeciality(
                     $this->specialityRepository->findRandom()
                 );
             }
             $manager->persist($doctor);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return array(SpecialityFixture::class);
    }
}