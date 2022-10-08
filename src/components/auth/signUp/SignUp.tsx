import React, { useState } from 'react';
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
import CheckboxLabel from 'components/common/checkboxLabel/CheckboxLabel';

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
    name: 'birthdate',
    label: 'Birthdate',
    type: 'date',
    defaultValue: dayjs().format('YYYY-MM-DD'),
  },
];

const companyInputs = [
  {
    name: 'company-name',
    label: 'Company name',
    type: 'text',
  },
  {
    name: 'nip',
    label: 'NIP',
    type: 'text',
  },
  {
    name: 'krs',
    label: 'KRS',
    type: 'text',
    defaultValue: dayjs().format('YYYY-MM-DD'),
  },
];

const SignUp = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
      'confirm-password': '',
      'name': '',
      'surname': '',
      date: dayjs().format('YYYY-MM-DD'),
      'company-name': null,
      nip: null,
      krs: null
    } });
  const { notify } = useNotification();
  const navigate = useNavigate();
  const [ isCompany, setIsCompany ] = useState(false);

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
    <AuthCard className={ `
    ${ styles.registerContainer }
    ${ isCompany ? styles.registerExtended : '' }` }>
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

            <CheckboxLabel
              isChecked={ isCompany }
              onCheck={ (isChecked: boolean) => setIsCompany(isChecked) }
              text='Are you part of company?' />

            <div className={ `
            ${ styles.companyContainer }
            ${ isCompany ? styles.companyVisible : '' }` }>
              { companyInputs.map((input) => (
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
            </div>
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