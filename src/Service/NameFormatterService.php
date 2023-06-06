<?php

namespace App\Service;

class NameFormatterService
{
	public static function formatName(string $firstname): string
	{
		$nameToArray = explode(' ', $firstname);
		$formattedName = ucfirst(strtolower($nameToArray[0]));
		array_shift($nameToArray);

		foreach ($nameToArray as $item) {
			$formattedName .= ' ' . strtoupper(substr($item, 0, 1)) . '.';
		}

		return $formattedName;
	}
}