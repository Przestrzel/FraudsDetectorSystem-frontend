import React from 'react';
import Navbar from './Navbar/Navbar';

import styles from './Layout.module.scss';

type Props = {
  children: React.ReactNode;
  isLoggedIn: boolean;
};

const Layout = ({ children, isLoggedIn }: Props) => {
  return (
    < >
      <Navbar isLoggedIn={ isLoggedIn } />
      <div className={ styles.layout }>
        { children }
      </div>
    </>
  );
};

export default Layout;