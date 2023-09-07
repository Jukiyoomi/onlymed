<?php

namespace App\Form;

use App\Entity\Patient;
use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class RegistrationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
			->add('firstname', TextType::class, [
				'label' => 'First name',
				'required' => true,
				'attr' => [
					'autocomplete' => 'given-name',
					'placeholder' => 'Enter your first name',
				],
				"help" => "This will be displayed on your profile.",
				"error_bubbling" => true,
			])
			->add('lastname', TextType::class, [
				'label' => 'Last name',
				'required' => true,
				'attr' => [
					'autocomplete' => 'given-name',
					'placeholder' => 'Enter your last name',
				],
//				"error_bubbling" => true,
			])
            ->add('email', EmailType::class, [
				'label' => 'Email address',
				'required' => true,
				'attr' => [
					'autocomplete' => 'email',
					'placeholder' => 'Enter your email address',
				],
				"error_bubbling" => true,
			])
            ->add('agreeTerms', CheckboxType::class, [
                'mapped' => false,
                'constraints' => [
                    new IsTrue([
                        'message' => 'You should agree to our terms.',
                    ]),
                ],
				"error_bubbling" => true,
			])
            ->add('password', RepeatedType::class, [
                // instead of being set onto the object directly,
                // this is read and encoded in the controller
				'type' => PasswordType::class,
                'mapped' => false,
                'attr' => ['autocomplete' => 'new-password'],
				'invalid_message' => 'The password fields must match.',
				'required' => true,
				'first_options'  => ['label' => 'Password', 'attr' => ['placeholder' => 'Password']],
				'second_options' => ['label' => 'Repeat Password', 'attr' => ['placeholder' => 'Repeat Password']],
				"error_bubbling" => true,
				'constraints' => [
                    new NotBlank([
                        'message' => 'Please enter a password',
                    ]),
                    new Length([
                        'min' => 8,
                        'minMessage' => 'Your password should be at least {{ limit }} characters',
                        // max length allowed by Symfony for security reasons
                        'max' => 4096,
                    ]),
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Patient::class,
        ]);
    }
}
