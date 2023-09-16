<?php

namespace App\EventSubscriber;

use Psr\Log\LoggerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class NameFormatSubscriber implements EventSubscriberInterface
{
	public function __construct(
		private LoggerInterface $logger,
	){}

	public function onKernelController(ControllerEvent $event): void
	{
		$controller = $event->getController();
		$request = $event->getRequest();

		$method = null;

		// when a controller class defines multiple action methods, the controller
		// is returned as [$controllerInstance, 'methodName']
		if (is_array($controller)) {
			$method = $controller[1];
		}

		if (!(in_array($method, ['register', 'newDoctor']) && $request->isMethod('POST'))) {
			$this->logger->info('Name Format Subscriber => Not handling this request URI. Ending...');
			return;
		}

		$this->logger->info('Name Format Subscriber => method: ' . $method);

		$all = $request->request->all();

        if (array_key_exists('patient_form', $all)) {
            $formId = "patient_form";
        } else {
            $formId = "doctor_form";
        }
        $firstname = $all[$formId]['firstname'];
        $lastname = $all[$formId]['lastname'];
		$this->logger->info('Name Format Subscriber => Formatting name...');

		if ($firstname) $all[$formId]['firstname'] = $this->formatName($firstname);
		if ($lastname) $all[$formId]['lastname'] = $this->formatName($lastname);

		$request->request->replace($all);
	}

	private function formatName(string $firstname): string
	{
		$nameToArray = explode(' ', $firstname);
		$formattedName = ucfirst(strtolower($nameToArray[0]));
		array_shift($nameToArray);

		foreach ($nameToArray as $item) {
			$formattedName .= ' ' . strtoupper(substr($item, 0, 1)) . '.';
		}

		return $formattedName;
	}

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::CONTROLLER => 'onKernelController',
        ];
    }
}
