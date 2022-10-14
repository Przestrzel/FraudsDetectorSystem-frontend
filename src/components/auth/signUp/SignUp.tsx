import React from 'react';
import { withSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthCard from 'components/auth/authCard/AuthCard';
import Button from 'components/common/button/Button';
import Input from 'components/common/input/Input';

import styles from './SignUp.module.scss';
import { routes } from 'utils/config.utils';
import dayjs from 'dayjs';
import { signUp } from 'services/auth.service';
import { NotificationType } from 'types/app.types';
import useNotification from 'hooks/useNotification';
import { messages } from 'utils/messages.utils';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required().oneOf(
    [ yup.ref('password'), null ], 'Passwords must match'
  ),
  name: yup.string().required(),
  surname: yup.string().required(),
  birthdayDate: yup.date().required()
});

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
    name: 'confirmPassword',
    label: 'Confirm password',
    type: 'password',
  },
  {
    name: 'name',
    label: 'First name',
    type: 'text',
  },
  {
    name: 'surname',
    label: 'Last name',
    type: 'text',
  },
  {
    name: 'birthdayDate',
    label: 'Birthdate',
    type: 'date',
    defaultValue: dayjs().format('YYYY-MM-DD'),
  },
];

const SignUp = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      surname: '',
      blockchainPublicKey: '0',
      birthdayDate: dayjs().format('YYYY-MM-DD')
    } });
  const { notify } = useNotification();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    signUp(data)
      .then(() => {
        notify('You have successfully sign up!', NotificationType.SUCCESS);
        navigate(routes.login);
      }).catch(() => {
        notify(messages.unexpected, NotificationType.ERROR);
      });
  };

  const onGoBackToLogin = () => {
    navigate(routes.login);
  };

  return (
    <AuthCard className={ styles.registerContainer }>
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
                error={ errors[ input.name ]?.message != null }
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