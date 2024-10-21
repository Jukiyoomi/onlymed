<?php

namespace App\Tests\Integration;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Faker\Factory;

class RegisterTest extends WebTestCase
{
	public function testRegister(): void
	{
		$faker = Factory::create();

		$client = static::createClient();
		$crawler = $client->request('GET', '/register');

		$this->assertResponseIsSuccessful();

		$form = $crawler->selectButton('Register')->form();

		$password = $faker->password();

		$form['patient_form[firstname]'] = $faker->firstName();
		$form['patient_form[lastname]'] = $faker->lastName();
		$form['patient_form[email]'] = $faker->email();
		$form['patient_form[password][first]'] = $password;
		$form['patient_form[password][second]'] = $password;
		$form['patient_form[agreeTerms]'] = true;

		$client->submit($form);

		$this->assertResponseRedirects('/login');
	}

	public function testRegisterDoctor(): void
	{
		$faker = Factory::create();

		$client = static::createClient();
		$crawler = $client->request('GET', '/doctor');

		$this->assertResponseIsSuccessful();

		$form = $crawler->selectButton('Register')->form();

		$password = $faker->password(8);

		$form['doctor_form[firstname]'] = $faker->firstName();
		$form['doctor_form[lastname]'] = $faker->lastName();
		$form['doctor_form[email]'] = $faker->email();
		$form['doctor_form[phone]'] = $faker->phoneNumber();
		$form['doctor_form[password][first]'] = $password;
		$form['doctor_form[password][second]'] = $password;
		$form['doctor_form[speciality]'] = '1';
		$form['doctor_form[agreeTerms]'] = true;

		$client->submit($form);

		$this->assertResponseRedirects('/login');
	}
}