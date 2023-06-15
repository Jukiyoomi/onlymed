<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Serializer\SerializerInterface;

class DefaultController extends AbstractController
{
    #[Route('/', name: 'app_default')]
    public function index(): Response
    {
        return $this->render('default/index.html.twig');
    }

	#[Route('/api/dashboard', name: 'app.dashboard', methods: ['GET'])]
	public function hello(#[CurrentUser] ?User $user, SerializerInterface $serializer): JsonResponse
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
}
