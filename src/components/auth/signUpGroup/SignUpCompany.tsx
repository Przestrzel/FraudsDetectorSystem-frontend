import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import SignUpGroup from './SignUpGroup';
import { signUpCompany } from 'services/auth.service';
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
    name: 'name',
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
    name: 'phoneNumber',
    label: 'Numer telefonu',
    type: 'text',
  },
  {
    name: 'REGON',
    label: 'REGON',
    type: 'text',
  },
  {
    name: 'legalForm',
    label: 'Forma prawna',
    type: 'text',
  },
  {
    name: 'NIP',
    label: 'NIP',
    type: 'number',
  },
  {
    name: 'KRS',
    label: 'KRS',
    type: 'number',
  },
];

const validationSchema = yup.object({
  name: yup.string().required(),
  postalCode: yup.string().required(),
  city: yup.string().required()
});

const SignUpCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notify } = useNotification();
  const user = useSelector((state: RootState) => state.auth.user);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
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
    signUpCompany(mappedData, user.id).then((res) => {
      dispatch(saveUser({
        ...user,
        ...res.data
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