<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\DoctorRepository;
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
		], Response::HTTP_OK);
	}

    #[Route('/search', name: 'app.search', methods: ['GET'])]
    public function search(#[CurrentUser] ?User $user, Request $request, DoctorRepository $doctorRepository): JsonResponse
    {
//        if (!$user) {
//            return $this->json([
//                'user' => null,
//                'error' => 'User not found'
//            ], Response::HTTP_NOT_FOUND);
//        }

        $offset = $request->query->get('offset');
        $searchTerm = $request->query->get('term');

        $doctors = $doctorRepository->findAllByTerm($searchTerm, $offset);

        return $this->json([
            'doctors' => $doctors,
            'error' => null
        ], Response::HTTP_OK, [], ['groups' => 'doctor:read']);
    }
}
