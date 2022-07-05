import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from 'components/common/button/Button';
import AuthCard from 'components/auth/authCard/AuthCard';
import Input from 'components/common/input/Input';
import styles from './ForgotPassword.module.scss';
import { routes } from 'utils/config.utils';

const inputs = [
  {
    name: 'email',
    label: 'E-mail',
    type: 'e-mail'
  }
];

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const onGoBackToLogin = () => {
    navigate(routes.login);
  };

  return (
    <AuthCard>
      <h2>Account recovery</h2>
      <p>If you want to change your password, provide e-mail address of your account</p>
      <p>We will send you a link for password changing</p>

      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className={ styles.forgotPasswordPageInputs }>
          { inputs.map((input) => (
            <Input
              key={ input.label }
              control={ control }
              label={ input.label }
              type={ input.type }
              name={ input.name }
            />
          )) }
          <div className={ styles.forgotPasswordPageButtons }>
            <Button text='Go back to login' onClick={ onGoBackToLogin }/>
            <Button text='Send' variant='contained' type='submit' />
          </div>
        </div>
      </form>
    </AuthCard>
  );
};

export default ForgotPassword;