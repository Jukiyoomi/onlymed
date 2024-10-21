<?php

namespace App\EventSubscriber;

use Psr\Log\LoggerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthorizationSubscriber implements EventSubscriberInterface
{
	public function __construct(
		private LoggerInterface $logger,
		private TokenStorageInterface $tokenStorage
	){}

    public function onKernelRequest(RequestEvent $event): void
    {
		$request = $event->getRequest();

		$this->logger->info('Authorization Subscriber called');
		$this->logger->info('Authorization Subscriber => Request path: ' . $request->getPathInfo());

		if (!str_contains($request->getPathInfo(), '/api')) {
			$this->logger->info('Authorization Subscriber => Not handling this request URI. Ending...');
			return;
		};

		$this->logger->info('Authorization Subscriber => Getting authenticated user');
		$user = $this->tokenStorage->getToken()->getUser();

		if ($user instanceof UserInterface) {
			$this->logger->info('Authorization Subscriber => User found: ' . $user->getUserIdentifier());
			return;
		}

		$this->logger->info('Authorization Subscriber => Sending response');
		$event->setResponse(new JsonResponse([
			'error' => 'User not authenticated'
		], Response::HTTP_NOT_FOUND));
	}

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => 'onKernelRequest',
        ];
    }
}
