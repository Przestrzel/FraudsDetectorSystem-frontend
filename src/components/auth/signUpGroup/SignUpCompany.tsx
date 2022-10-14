import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import SignUpGroup from './SignUpGroup';

const inputs = [
  {
    name: 'companyName',
    label: 'Company Name',
    type: 'text'
  },
  {
    name: 'NIP',
    label: 'NIP',
    type: 'text',
  },
  {
    name: 'KRS',
    label: 'KRS',
    type: 'text',
  },
];

const validationSchema = yup.object({
  NIP: yup.number().required(),
  KRS: yup.number().required(),
  companyName: yup.string().required()
});

const SignUpCompany = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      companyName: '',
      NIP: '',
      KRS: ''
    } });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <SignUpGroup
      title='Register company'
      inputs={ inputs }
      handleSubmit={ handleSubmit }
      onSubmit={ onSubmit }
      errors={ errors }
      control={ control } />
  );
};

export default SignUpCompany;