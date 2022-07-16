import React from 'react';
import Navbar from './Navbar/Navbar';

import styles from './Layout.module.scss';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    < >
      <Navbar />
      <div className={ styles.layout }>
        { children }
      </div>
    </>
  );
};

export default Layout;