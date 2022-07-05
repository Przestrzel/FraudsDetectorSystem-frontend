import Card from 'components/common/card/Card';
import React, { ReactNode } from 'react';
import styles from './AuthCard.module.scss';

type Props = {
  children?: ReactNode;
};

const AuthCard = ({ children }: Props) => {
  return (
    <div className={ styles.authPage }>
      <Card className={ styles.authPageCard }>
        { children }
      </Card>
    </div>
  );
};

export default AuthCard;