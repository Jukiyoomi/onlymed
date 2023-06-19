<?php

namespace App\DataFixtures;

use App\Entity\Speciality;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class SpecialityFixture extends Fixture
{
	public function load(ObjectManager $manager): void
	{
		$data = file(__DIR__ . '/readme.txt');

		foreach ($data as $line) {
			$speciality = new Speciality();
			$speciality->setName(trim($line));
			$manager->persist($speciality);
		}
		// $product = new Product();
		// $manager->persist($product);

		$manager->flush();
	}
}