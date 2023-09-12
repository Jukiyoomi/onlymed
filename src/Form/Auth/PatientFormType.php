<?php

namespace App\Form\Auth;

use App\Entity\Patient;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PatientFormType extends UserRegistrationFormType
{
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Patient::class,
        ]);
    }
}
