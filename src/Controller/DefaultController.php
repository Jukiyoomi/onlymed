<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class DefaultController extends AbstractController
{
    #[Route('/', name: 'app_default')]
    public function index(#[CurrentUser] ?User $user): Response
    {
		if (!$user) {
			return $this->redirectToRoute('app_login');
		}
        return $this->render('default/index.html.twig');
    }
}
