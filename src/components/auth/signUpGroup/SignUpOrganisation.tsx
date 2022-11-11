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
import useBlockchain from 'hooks/useBlockchain';

const inputs = [
  {
    name: 'institutionName',
    label: 'Nazwa instytucji',
    type: 'text'
  },
  {
    name: 'city',
    label: 'Miasto',
    type: 'text',
  }
];

const validationSchema = yup.object({
  postalCode: yup.string().required(),
  city: yup.string().required(),
  institutionName: yup.string().required()
});

const SignUpOrganisation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blockchainService = useBlockchain();
  const { notify } = useNotification();
  const user = useSelector((state: RootState) => state.auth.user);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      institutionName: '',
      city: '',
      postalCode: ''
    }
  });

  const onSubmit = (data) => {
    if(!user){
      return;
    }
    blockchainService.registerAdvertiser(data.institutionName, data.city)
      .then(() => {
        signUpOrganisation(data, user.id).then((res) => {
          const response = res.data;
          delete response.id;
          dispatch(saveUser({
            ...user,
            ...response
          }));
          notify('Zarejestrowałeś organizację!', NotificationType.INFO);
          navigate(routes.auctions);
        }).catch(() => {
          notify(messages.unexpected, NotificationType.ERROR);
        });
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