import React from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { routes } from 'utils/config.utils';
import { Link } from 'react-router-dom';

import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <AppBar position='sticky'>
      <Container maxWidth={ false }>
        <Toolbar disableGutters={ true } variant='dense'>
          <Link to={ routes.dashboard } className={ styles.link }>
            <HomeRoundedIcon sx={ { display: { xs: 'none', md: 'flex' },
              mr: 1,
              width: 30,
              height: 30,
              fill: 'white'
            } } />
            Home
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;