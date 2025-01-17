<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class UserController extends AbstractController
{
	#[Route('/api/dashboard', name: 'app.dashboard', methods: ['GET'])]
	public function hello(#[CurrentUser] ?User $user): JsonResponse
	{
		return $this->json($user, Response::HTTP_OK, [], ['groups' => 'user:read']);
	}

	#[Route('/user/delete', name: 'app.user.delete', methods: ['GET', 'DELETE'])]
	public function deleteAccount(#[CurrentUser] ?User $user, UserRepository $repository): Response
	{
		$session = new Session();
		$session->invalidate();

		$repository->remove($user, true);

		return $this->redirectToRoute('app_login');
	}

	#[Route('/api/user/email', name: 'app.user.email.edit', methods: ['PUT'])]
	public function editEmail(#[CurrentUser] ?User $user, Request $request, EntityManagerInterface $manager): JsonResponse
	{
		$parameters = json_decode($request->getContent(), true);

		$oldMail = $parameters['oldMail'];
		$newMail = $parameters['newMail'];

		if ($oldMail !== $user->getEmail()) {
			return new JsonResponse([
				'error' => 'Old mail is not correct',
				"path" => "oldMail"
			], Response::HTTP_BAD_REQUEST);
		}

		if ($oldMail === $newMail) {
			return new JsonResponse([
				'error' => 'Old mail and new mail are the same',
				"path" => "newMail"
			], Response::HTTP_BAD_REQUEST);
		}

		$user->setEmail($newMail);
		$manager->flush();

		return $this->json([], Response::HTTP_OK);
	}

	#[Route('/api/user/password', name: 'app.user.password.edit', methods: ['PUT'])]
	public function editPassword(#[CurrentUser] ?User $user, Request $request, EntityManagerInterface $manager, UserPasswordHasherInterface $userPasswordHasher): JsonResponse
	{
		$parameters = json_decode($request->getContent(), true);

		$oldPassword = $parameters['oldPassword'];
		$newPassword = $parameters['newPassword'];
		$confirmPassword = $parameters['confirmPassword'];

		if (!$userPasswordHasher->isPasswordValid($user, $oldPassword)) {
			return new JsonResponse([
				'error' => 'Old password is not correct.',
				"path" => "oldPassword"
			], Response::HTTP_BAD_REQUEST);
		}

		if ($oldPassword === $newPassword) {
			return new JsonResponse([
				'error' => 'Old password and new password must not be identical.',
				"path" => "newPassword"
			], Response::HTTP_BAD_REQUEST);
		}

		if ($newPassword !== $confirmPassword) {
			return new JsonResponse([
				'error' => 'New password and confirm password must be identical.',
				"path" => "confirmPassword"
			], Response::HTTP_BAD_REQUEST);
		}

		$user->setPassword(
			$userPasswordHasher->hashPassword(
				$user,
				$newPassword
			)
		);

		$manager->flush();

		return $this->json([], Response::HTTP_OK);
	}

	#[Route('/api/user/general', name: 'app.user.general.edit', methods: ['PUT'])]
	public function edit(#[CurrentUser] ?User $user, Request $request, EntityManagerInterface $manager): JsonResponse
	{
		$parameters = json_decode($request->getContent(), true);

		$firstname = $parameters['firstname'];
		$lastname = $parameters['lastname'];

		if (isset($firstname)) {
            if ($firstname === $user->getFirstname()) {
                return $this->json([
                    "error" => "Les informations n'ont pas changées",
                    "path" => "firstname"
                ], Response::HTTP_BAD_REQUEST, [], ['groups' => 'user:read']);
            }
            $user->setFirstname($firstname);
        }

        if (isset($lastname)) {
            if ($lastname === $user->getLastname()) {
                return $this->json([
                    "error" => "Les informations n'ont pas changées",
                    "path" => "lastname"
                ], Response::HTTP_BAD_REQUEST, [], ['groups' => 'user:read']);
            }
            $user->setLastname($lastname);
		}


		$manager->flush();

		return $this->json([], Response::HTTP_OK);
	}
}
