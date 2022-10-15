import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import SignUpGroup from './SignUpGroup';

const inputs = [
  {
    name: 'institutionName',
    label: 'Nazwa instytucji',
    type: 'text'
  },
  {
    name: 'postalCode',
    label: 'Kod pocztowy',
    type: 'text',
  },
  {
    name: 'city',
    label: 'Miasto',
    type: 'text',
  },
];

const validationSchema = yup.object({
  institutionName: yup.string().required(),
  postalCode: yup.string().required(),
  city: yup.string().required()
});

const SignUpOrganisation = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      institutionName: '',
      postalCode: '',
      city: ''
    } });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <SignUpGroup
      title='Zarejestruj instytucję'
      inputs={ inputs }
      handleSubmit={ handleSubmit }
      onSubmit={ onSubmit }
      errors={ errors }
      control={ control } />
  );
};

export default SignUpOrganisation;