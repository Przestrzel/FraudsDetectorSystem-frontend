import React from 'react';
import Card from 'components/common/card/Card';
import Input from 'components/common/input/Input';

import styles from './Login.module.scss';
import Button from 'components/common/button/Button';

const inputs = [
  {
    label: 'E-mail',
  },
  {
    label: 'Password',
    type: 'password',
  }
];

const Login = () => {
  return (
    <div className={ styles.loginPage }>
      <Card className={ styles.loginPageCard }>
        <h2>Log in</h2>
        <div className={ styles.loginPageInputs }>
          { inputs.map((input) => (
            <Input
              className={ styles.loginPageInput }
              key={ input.label }
              label={ input.label }
              type={ input.type }
            />
          )) }
          <div className={ styles.loginPageButtons }>
            <Button text='Forgot password?' size='small' />
          </div>
          <div className={ styles.loginPageButtons }>
            <Button text='Sign up' />
            <Button text='Log in' variant='contained'/>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
