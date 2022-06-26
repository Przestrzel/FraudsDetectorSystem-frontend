import React from 'react';
import Card from 'components/common/card/Card';

import styles from './Login.module.scss';

const Login = () => {
  return (
    <div className={ styles.loginPage }>
      <Card className={ styles.loginPageCard }>
        <h2>Log in</h2>
      </Card>
    </div>
  );
};

export default Login;
