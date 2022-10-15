import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import { cloneDeep } from 'lodash';
import { useDispatch } from 'react-redux';
import useNotification from 'hooks/useNotification';
import AuthCard from 'components/auth/authCard/AuthCard';
import Input from 'components/common/input/Input';
import Button from 'components/common/button/Button';

import styles from './Login.module.scss';
import { routes } from 'utils/config.utils';
import { login } from 'services/auth.service';
import { saveUser } from 'store/auth.slice';
import { setAuthToken } from 'utils/auth.utils';
import { messages } from 'utils/messages.utils';
import { NotificationType } from 'types/app.types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const inputs = [
  {
    name: 'email',
    label: 'E-mail',
    type: 'e-mail'
  },
  {
    name: 'password',
    label: 'Hasło',
    type: 'password',
  }
];

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: ''
    } });
  const { notify } = useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    login(data)
      .then(({ data: userData }) => {
        const user = cloneDeep(userData);
        setAuthToken(userData.access_token);
        setAuthToken(userData.refresh_token, true);
        delete user.access_token;
        delete user.refresh_token;
        dispatch(saveUser(user));
        notify('Zalogowałeś się!', NotificationType.SUCCESS);
      }).catch(() => {
        notify(messages.unexpected, NotificationType.ERROR);
      });
  };

  const onSignUp = () => {
    navigate(routes.signUp);
  };

  return (
    <AuthCard>
      <h2>Witaj!</h2>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className={ styles.loginPageInputs }>
          { inputs.map((input) => (
            <Input
              key={ input.label }
              control={ control }
              label={ input.label }
              type={ input.type }
              name={ input.name }
              error={ errors[ input.name ]?.message != null }
            />
          )) }
          <div className={ styles.loginPageButtons }>
            <Button text='Rejestracja' onClick={ onSignUp }/>
            <Button text='Zaloguj się' variant='contained' type='submit'/>
          </div>
        </div>
      </form>
    </AuthCard>
  );
};

export default withSnackbar(Login);
