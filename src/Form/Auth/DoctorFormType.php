<?php

namespace App\Form\Auth;

use App\Entity\Doctor;
use App\Entity\Speciality;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Range;

class DoctorFormType extends RegistrationFormType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        parent::buildForm($builder, $options);
        $builder
			->add('speciality', EntityType::class, [
				'label' => 'Speciality',
				'class' => Speciality::class,
				'choice_label' => 'name',
				'required' => true,
				'multiple' => true,
				'mapped' => false,
				'expanded' => false,
				'choices' => $options['specialities'],
				"error_bubbling" => true,
                'constraints' => [
                    new Range([
                        'min' => 1,
                        'minMessage' => 'You must select at least one speciality.',
                        'max' => 3,
                        'maxMessage' => 'You can select up to 3 specialities.',
                    ])
                ]
			])
			->add('phone', TextType::class, [
				'label' => 'Phone number',
				'required' => true,
				'attr' => [
					'autocomplete' => 'tel',
					'placeholder' => 'Enter your phone number',
				],
				"error_bubbling" => true,
			])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Doctor::class,
        ]);

        $resolver
            ->setRequired('specialities')
            ->setAllowedTypes('specialities', 'array');
    }
}
