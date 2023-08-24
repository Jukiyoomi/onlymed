<?php

namespace App\Controller;

use App\Entity\Doctor;
use App\Entity\User;
use App\Service\DoctorService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route('/api')]
class UserController extends AbstractController
{
	#[Route('/dashboard', name: 'app.dashboard', methods: ['GET'])]
	public function hello(#[CurrentUser] ?User $user): JsonResponse
	{
		if (!$user) {
			return $this->json([
				'user' => null,
				'error' => 'User not found'
			], Response::HTTP_NOT_FOUND);
		}

		return $this->json([
			'user' => $user,
			'error' => null
		], Response::HTTP_OK, [], ['groups' => 'user:read']);
	}

    #[Route('/search', name: 'app.search', methods: ['GET'])]
    public function search(#[CurrentUser] ?User $user, Request $request, DoctorService $doctorService): JsonResponse
    {
        if (!$user) {
            return $this->json([
                'user' => null,
                'error' => 'User not found'
            ], Response::HTTP_NOT_FOUND);
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

	#[Route('/address', name: 'app.address.edit', methods: ['PUT'])]
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
