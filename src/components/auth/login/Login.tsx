import React from 'react';
import { useForm } from 'react-hook-form';
import Card from 'components/common/card/Card';
import Input from 'components/common/input/Input';
import Button from 'components/common/button/Button';

import styles from './Login.module.scss';

const inputs = [
  {
    name: 'email',
    label: 'E-mail',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
  }
];

const Login = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={ styles.loginPage }>
      <Card className={ styles.loginPageCard }>
        <h2>Log in</h2>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <div className={ styles.loginPageInputs }>
            { inputs.map((input) => (
              <Input
                className={ styles.loginPageInput }
                key={ input.label }
                control={ control }
                label={ input.label }
                type={ input.type }
                name={ input.name }
              />
            )) }
            <div className={ styles.loginPageButtons }>
              <Button text='Forgot password?' size='small' />
            </div>
            <div className={ styles.loginPageButtons }>
              <Button text='Sign up' />
              <Button text='Log in' variant='contained' type='submit'/>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
