import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthCard from 'components/auth/authCard/AuthCard';
import Button from 'components/common/button/Button';
import Input from 'components/common/input/Input';

import styles from './SignUp.module.scss';
import { routes } from 'utils/config.utils';

const inputs = [];

const SignUp = () => {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
  };

  const onGoBackToLogin = () => {
    navigate(routes.login);
  };

  return (
    <AuthCard>
      <h2>Register</h2>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className={ styles.signUpPageInputs }>
          { inputs.map((input) => (
            <Input
              key={ input.label }
              control={ control }
              label={ input.label }
              type={ input.type }
              name={ input.name }
            />
          )) }
          <div className={ styles.signUpButtons }>
          </div>
          <div className={ styles.signUpButtons }>
            <Button text='Go back to login' onClick={ onGoBackToLogin }/>
            <Button text='Sign up' variant='contained' type='submit'/>
          </div>
        </div>
      </form>
    </AuthCard>
  );
};

export default SignUp;