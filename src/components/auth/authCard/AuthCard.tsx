import Card from 'components/common/card/Card';
import React, { ReactNode } from 'react';
import styles from './AuthCard.module.scss';

type Props = {
  children?: ReactNode;
  className?: string;
};

const AuthCard = ({ children, className='' }: Props) => {
  return (
    <div className={ styles.authPage }>
      <Card className={ `${ styles.authPageCard } ${ className }` }>
        { children }
      </Card>
    </div>
  );
};

export default AuthCard;