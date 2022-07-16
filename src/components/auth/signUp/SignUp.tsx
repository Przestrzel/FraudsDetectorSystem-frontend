import React from 'react';
import { useSnackbar, withSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthCard from 'components/auth/authCard/AuthCard';
import Button from 'components/common/button/Button';
import Input from 'components/common/input/Input';

import styles from './SignUp.module.scss';
import { routes } from 'utils/config.utils';
import dayjs from 'dayjs';
import { signUp } from 'services/__mocked__/auth.service';
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
  },
  {
    name: 'confirm-password',
    label: 'Confirm password',
    type: 'password',
  },
  {
    name: 'first-name',
    label: 'First name',
    type: 'text',
  },
  {
    name: 'last-name',
    label: 'Last name',
    type: 'text',
  },
  {
    name: 'date',
    label: 'Birthdate',
    type: 'date',
    defaultValue: dayjs().format('YYYY-MM-DD'),
  },
];

const SignUp = () => {
  const { control, handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    signUp(data)
      .then(() => {
        enqueueSnackbar('You have successfully sign up!', {
          variant: NotificationType.SUCCESS
        });
      });
  };

  const onGoBackToLogin = () => {
    navigate(routes.login);
  };

  return (
    <AuthCard>
      <h2>Register</h2>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className={ styles.signUpPageInputs }>
          <div className={ styles.signUpPageInputsCentered }>
            { inputs.map((input) => (
              <Input
                key={ input.label }
                control={ control }
                label={ input.label }
                type={ input.type }
                name={ input.name }
                className={ `${ styles[ input.name ] }` }
                { ...input }
              />
            )) }
            <div className={ styles.signUpButtons }>
              <Button text='Go back to login' onClick={ onGoBackToLogin }/>
              <Button text='Sign up' variant='contained' type='submit'/>
            </div>
          </div>
        </div>
      </form>
    </AuthCard>
  );
};

export default withSnackbar(SignUp);