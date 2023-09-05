<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\DoctorService;
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
		if (!$user) {
			return new JsonResponse('Logged user not found', Response::HTTP_NOT_FOUND);
		}

		return $this->json([
			'user' => $user,
		], Response::HTTP_OK, [], ['groups' => 'user:read']);
	}

    #[Route('/api/search', name: 'app.search', methods: ['GET'])]
    public function search(#[CurrentUser] ?User $user, Request $request, DoctorService $doctorService): JsonResponse
    {
        if (!$user) {
			return new JsonResponse('Logged user not found', Response::HTTP_NOT_FOUND);
		}

        $offset = $request->query->get('offset');
        $zone = $request->query->get('zone') ?? null;
        $searchTerm = $request->query->get('term');

        $doctors = $doctorService->findAllByTerm($searchTerm, $zone, $offset);

        return $this->json([
			"count" => count($doctors),
            'doctors' => $doctors,
            'error' => null
        ], Response::HTTP_OK, [], ['groups' => 'doctor:read']);
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

		return $this->json([
			'user' => $user,
		], Response::HTTP_OK, [], ['groups' => 'user:read']);
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

		return $this->json([
			'user' => $user,
		], Response::HTTP_OK, [], ['groups' => 'user:read']);
	}
}
