import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import SignUpGroup from './SignUpGroup';
import { signUpOrganisation } from 'services/auth.service';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from 'store/auth.slice';
import { routes } from 'utils/config.utils';
import { RootState } from 'store/store';
import { NotificationType } from 'types/app.types';
import useNotification from 'hooks/useNotification';
import { messages } from 'utils/messages.utils';
import { cloneDeep } from 'lodash';

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
  {
    name: 'shareholders',
    label: 'Udziałowcy',
    type: 'text',
  },
  {
    name: 'phone_number',
    label: 'Numer telefonu',
    type: 'text',
  },
  {
    name: 'REGON',
    label: 'REGON',
    type: 'text',
  },
  {
    name: 'legal_form',
    label: 'Forma prawna',
    type: 'text',
  },
];

const validationSchema = yup.object({
  institutionName: yup.string().required(),
  postalCode: yup.string().required(),
  city: yup.string().required()
});

const SignUpOrganisation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notify } = useNotification();
  const user = useSelector((state: RootState) => state.auth.user);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      institutionName: '',
      postalCode: '',
      city: ''
    } });

  const onSubmit = (data) => {
    if(!user) {
      return;
    }
    const mappedData = cloneDeep(data);
    mappedData.shareholders =
      mappedData.shareholders.split(',').map((shareholder) => shareholder.trim());

    signUpOrganisation(mappedData, user.email).then(() => {
      dispatch(saveUser({
        ...user,
        ...data
      }));
      notify('Zarejestrowałeś instytucję!', NotificationType.INFO);
      navigate(routes.auctions);
    }).catch(() => {
      notify(messages.unexpected, NotificationType.ERROR);
    });
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