import React, { useCallback } from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { routes } from 'utils/config.utils';
import { Link } from 'react-router-dom';

import styles from './Navbar.module.scss';

const Navbar = () => {
  const iconSx = useCallback((isOnLeft: boolean) => {
    return { display: { xs: 'none', md: 'flex' },
      ...isOnLeft ? { mr: 1 } : { ml: 1 },
      width: 30,
      height: 30,
      fill: 'white'
    };
  }, []);

  return (
    <AppBar position='sticky'>
      <Container maxWidth={ false }>
        <Toolbar disableGutters={ true } variant='dense'>
          <Link to={ routes.dashboard } className={ styles.link }>
            <HomeRoundedIcon sx={ iconSx(true) } />
            Home
          </Link>

          <button className={ styles.logout }>
            Logout
            <LogoutIcon sx={ iconSx(false) } />
          </button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;