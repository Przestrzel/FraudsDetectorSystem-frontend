import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import SignUpGroup from './SignUpGroup';
import { signUpOrganisation } from 'services/auth.service';
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
    name: 'name',
    label: 'Nazwa firmy',
    type: 'text'
  },
  {
    name: 'city',
    label: 'Miasto',
    type: 'text',
  },
  {
    name: 'postalCode',
    label: 'Kod pocztowy',
    type: 'text',
  },
];

const validationSchema = yup.object({
  postalCode: yup.string().required(),
  city: yup.string().required(),
  name: yup.string().required()
});

const SignUpOrganisation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notify } = useNotification();
  const user = useSelector((state: RootState) => state.auth.user);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      city: '',
      postalCode: ''
    } });

  const onSubmit = (data) => {
    if(!user){
      return;
    }
    signUpOrganisation(data, user.id).then((res) => {
      dispatch(saveUser({
        ...user,
        ...res.data
      }));
      notify('Zarejestrowałeś organizację!', NotificationType.INFO);
      navigate(routes.auctions);
    }).catch(() => {
      notify(messages.unexpected, NotificationType.ERROR);
    });
  };

  return (
    <SignUpGroup
      title='Zarejestruj organizację'
      inputs={ inputs }
      handleSubmit={ handleSubmit }
      onSubmit={ onSubmit }
      errors={ errors }
      control={ control } />
  );
};

export default SignUpOrganisation;