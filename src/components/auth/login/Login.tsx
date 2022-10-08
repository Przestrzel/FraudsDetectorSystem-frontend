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
import { login } from 'services/__mocked__/auth.service';
import { saveUser } from 'store/auth.slice';
import { setAuthToken } from 'utils/auth.utils';
import { messages } from 'utils/messages.utils';
import { NotificationType } from 'types/app.types';

const inputs = [
  {
    name: 'email',
    label: 'E-mail',
    type: 'e-mail'
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
  }
];

const Login = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: ''
    } });
  const { notify } = useNotification();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    login(data)
      .then(userData => {
        const user = cloneDeep(userData);
        delete user.accessToken;
        delete user.refreshToken;
        dispatch(saveUser(user));
        setAuthToken(userData.accessToken);
        notify('You have successfully logged in!', NotificationType.SUCCESS);
      }).catch(() => {
        notify(messages.unExpected, NotificationType.ERROR);
      });
  };

  const onForgotPassword = () => {
    navigate(routes.forgotPassword);
  };

  const onSignUp = () => {
    navigate(routes.signUp);
  };

  return (
    <AuthCard>
      <h2>Welcome!</h2>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className={ styles.loginPageInputs }>
          { inputs.map((input) => (
            <Input
              key={ input.label }
              control={ control }
              label={ input.label }
              type={ input.type }
              name={ input.name }
            />
          )) }
          <div className={ styles.loginPageButtons }>
            <Button text='Forgot password?' size='small' onClick={ onForgotPassword } />
          </div>
          <div className={ styles.loginPageButtons }>
            <Button text='Sign up' onClick={ onSignUp }/>
            <Button text='Log in' variant='contained' type='submit'/>
          </div>
        </div>
      </form>
    </AuthCard>
  );
};

export default withSnackbar(Login);
