<?php

namespace App\Form\Auth;

use App\Entity\Doctor;
use App\Entity\Speciality;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Count;

class DoctorFormType extends UserRegistrationFormType
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
//				'mapped' => false,
				'expanded' => false,
				'choices' => $options['specialities'],
				"error_bubbling" => true,
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
