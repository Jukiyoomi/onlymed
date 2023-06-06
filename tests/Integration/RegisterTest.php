<?php

namespace Integration;

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

		$form['registration_form[firstname]'] = $faker->firstName();
		$form['registration_form[lastname]'] = $faker->lastName();
		$form['registration_form[email]'] = $faker->email();
		$form['registration_form[password][first]'] = $password;
		$form['registration_form[password][second]'] = $password;
		$form['registration_form[agreeTerms]'] = true;

		$client->submit($form);

		$this->assertResponseRedirects('/');
	}
}