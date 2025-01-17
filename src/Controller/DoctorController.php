<?php

namespace App\Controller;

use App\Entity\Doctor;
use App\Service\DoctorService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class DoctorController extends AbstractController
{
	#[Route('/api/search', name: 'app.search', methods: ['GET'])]
	public function search(Request $request, DoctorService $doctorService): JsonResponse
	{
        $doctors = [];
        $hasMore = false;

		$offset = $request->query->get('offset');
		$zone = $request->query->get('zone') ?? null;
		$searchTerm = $request->query->get('term');


        $countDoctors = $doctorService->getCount();

        if ($countDoctors > 0) {
            $doctors = $doctorService->findAllByTerm($searchTerm, $zone, $offset);
            $currentTotal = DoctorService::NUM_ITEMS * $offset;

            if (count($doctors) > DoctorService::NUM_ITEMS) {
                $hasMore = $currentTotal + count($doctors) <= $countDoctors;
            }
        }

		return $this->json([
            'doctors' => $doctors,
            'hasMore' => $hasMore,
        ], Response::HTTP_OK, [], ['groups' => 'doctor:read']);
	}

    #[Route('/api/doctors/{id}', name: 'app.doctor.details', methods: ['GET'])]
	public function details(int $id, DoctorService $doctorService): JsonResponse
	{
		$foundDoctor = $doctorService->findOneById($id);

        if (!$foundDoctor) {
            return $this->json('Doctor not found', Response::HTTP_NOT_FOUND);
        }

		return $this->json($foundDoctor, Response::HTTP_OK, [], ['groups' => 'doctor:read']);
	}

    #[Route('/api/doctor/address', name: 'app.doctors.address.edit', methods: ['PUT'])]
    public function edit(#[CurrentUser] ?Doctor $user, Request $request, EntityManagerInterface $manager): JsonResponse
    {
        $parameters = json_decode($request->getContent(), true);

        $address = $parameters['address'];

        if (isset($address)) {
            if ($address === $user->getAddress()) {
                return $this->json([
                    "error" => "Les informations n'ont pas changées",
                    "path" => "address"
                ], Response::HTTP_BAD_REQUEST, [], ['groups' => 'user:read']);
            }
            $user->setAddress($address);
        }

        $manager->flush();

        return $this->json([], Response::HTTP_OK);
    }
}
