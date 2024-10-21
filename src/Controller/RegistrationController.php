<?php

namespace App\Controller;

use App\Entity\Doctor;
use App\Entity\Patient;
use App\Entity\User;
use App\Form\Auth\DoctorFormType;
use App\Form\Auth\PatientFormType;
use App\Service\SpecialityService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class RegistrationController extends AbstractController
{
    #[Route('/register', name: 'app_register')]
    public function register(#[CurrentUser] ?User $user, Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): Response
    {
		if ($user) {
			return $this->redirectToRoute('app_default');
		}

        $user = new Patient();
        $form = $this->createForm(PatientFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
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
			'error' => $form->getErrors()->current(),
        ]);
    }

	#[Route('/doctor', name: 'app_register_doctor')]
	public function newDoctor(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager, SpecialityService $service): Response
	{
		$user = new Doctor();
		$form = $this->createForm(DoctorFormType::class, $user, [
            'specialities' => $service->findAll(),
        ]);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
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
			'error' => $form->getErrors()->current(),
		]);
	}
}
