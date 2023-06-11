<?php

namespace App\Controller;

use App\Entity\Doctor;
use App\Entity\Patient;
use App\Entity\User;
use App\Form\DoctorFormType;
use App\Form\RegistrationFormType;
use App\Service\NameFormatterService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class RegistrationController extends AbstractController
{
    #[Route('/register', name: 'app_register')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): Response
    {
        $user = new Patient();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
			$user->setFirstname(NameFormatterService::formatName($form->get('firstname')->getData()));

			$user->setPassword(
                $userPasswordHasher->hashPassword(
                    $user,
                    $form->get('password')->getData()
                )
            );

			$entityManager->persist($user);
            $entityManager->flush();
            // do anything else you need here, like send an email

            return $this->redirectToRoute('app_login');
        }

        return $this->render('registration/register.html.twig', [
            'form' => $form->createView(),
        ]);
    }

	#[Route('/doctor', name: 'app_register_doctor')]
	public function newDoctor(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): Response
	{
		$user = new Doctor();
		$form = $this->createForm(DoctorFormType::class, $user);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$user->setFirstname(NameFormatterService::formatName($form->get('firstname')->getData()));

			$user->setPassword(
				$userPasswordHasher->hashPassword(
					$user,
					$form->get('password')->getData()
				)
			);

			$entityManager->persist($user);
			$entityManager->flush();
			// do anything else you need here, like send an email

			return $this->redirectToRoute('app_login');
		}

		return $this->render('registration/doctor.html.twig', [
			'form' => $form->createView(),
		]);
	}
}
