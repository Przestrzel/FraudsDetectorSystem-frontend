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
import styles from './SignUpGroup.module.scss';
import useBlockchain from 'hooks/useBlockchain';

const inputs = [
  {
    name: 'bidderName',
    label: 'Nazwa firmy',
    type: 'text'
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
    name: 'regon',
    label: 'REGON',
    type: 'text',
  },
  {
    name: 'legalForm',
    label: 'Forma prawna',
    type: 'text',
  },
  {
    name: 'nip',
    label: 'NIP',
    type: 'number',
  },
  {
    name: 'krs',
    label: 'KRS',
    type: 'number',
  },
];

const validationSchema = yup.object({
  bidderName: yup.string().required(),
  city: yup.string().required(),
  shareholders: yup.string().required(),
  phoneNumber: yup.string().required(),
  regon: yup.string().required(),
  legalForm: yup.string().required(),
  nip: yup.string().required(),
  krs: yup.string().required(),
});

const SignUpCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blockchainService = useBlockchain();
  const { notify } = useNotification();
  const user = useSelector((state: RootState) => state.auth.user);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      bidderName: '',
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

    const callback = () => {
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
    blockchainService.registerOfferent(mappedData.bidderName, mappedData.nip, callback);
  };

  return (
    <SignUpGroup
      title='Zarejestruj firmę'
      inputs={ inputs }
      className={ styles.signUpCompany }
      handleSubmit={ handleSubmit }
      onSubmit={ onSubmit }
      errors={ errors }
      control={ control } />
  );
};

export default SignUpCompany;