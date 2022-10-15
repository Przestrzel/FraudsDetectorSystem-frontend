import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import SignUpGroup from './SignUpGroup';
import { signUpCompany } from 'services/auth.service';
import { routes } from 'utils/config.utils';
import { useNavigate } from 'react-router';
import { saveUser } from 'store/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import useNotification from 'hooks/useNotification';
import { NotificationType } from 'types/app.types';
import { messages } from 'utils/messages.utils';

const inputs = [
  {
    name: 'companyName',
    label: 'Nazwa firmy',
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notify } = useNotification();
  const user = useSelector((state: RootState) => state.auth.user);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      companyName: '',
      NIP: '',
      KRS: ''
    } });

  const onSubmit = (data) => {
    if(!user){
      return;
    }
    signUpCompany(data, user.id).then(() => {
      dispatch(saveUser({
        ...user,
        ...data
      }));
      notify('Zarejestrowałeś firmę!', NotificationType.INFO);
      navigate(routes.auctions);
    }).catch(() => {
      notify(messages.unexpected, NotificationType.ERROR);
    });
  };

  return (
    <SignUpGroup
      title='Zarejestruj firmę'
      inputs={ inputs }
      handleSubmit={ handleSubmit }
      onSubmit={ onSubmit }
      errors={ errors }
      control={ control } />
  );
};

export default SignUpCompany;