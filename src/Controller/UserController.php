<?php

namespace App\Controller;

use App\Entity\Doctor;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Service\DoctorService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
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

	#[Route('/api/address', name: 'app.address.edit', methods: ['PUT'])]
	public function addAddress(#[CurrentUser] ?Doctor $user, Request $request, EntityManagerInterface $manager): JsonResponse
	{
		if (!$user) {
			return $this->json([
				'user' => null,
				'error' => 'User not found'
			], Response::HTTP_NOT_FOUND);
		}
		$payload = json_decode($request->getContent(), true);

		$address = $payload['address'];

		if (!$address) {
			return $this->json([
				'user' => null,
				'error' => 'Address not found'
			], Response::HTTP_NOT_FOUND);
		}

		$user = $manager->getRepository(Doctor::class)->find(1);
		$user->setAddress($address);
		$manager->persist($user);
		$manager->flush();

		return $this->json([
//			'user' => $user,
			'error' => null
		], Response::HTTP_OK);
	}
}
