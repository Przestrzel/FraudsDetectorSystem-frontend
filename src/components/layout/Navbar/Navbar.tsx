import React, { useCallback } from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { routes } from 'utils/config.utils';
import { Link } from 'react-router-dom';

import styles from './Navbar.module.scss';
import { logout } from 'services/__mocked__/auth.service';
import { setAuthToken } from 'utils/auth.utils';
import { withSnackbar } from 'notistack';
import useNotification from 'hooks/useNotification';
import { NotificationType } from 'types/app.types';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'store/auth.slice';

const Navbar = () => {
  const { notify } = useNotification();
  const dispatch = useDispatch();

  const iconSx = useCallback((isOnLeft: boolean) => {
    return { display: { xs: 'none', md: 'flex' },
      ...isOnLeft ? { mr: 1 } : { ml: 1 },
      width: 30,
      height: 30,
      fill: 'white'
    };
  }, []);

  const onLogout = useCallback(() => {
    logout()
      .then(() => {
        dispatch(logoutUser());
        setAuthToken('');
      })
      .finally(() => {
        notify('You have been logged out', NotificationType.INFO);
      });
  }, []);

  return (
    <AppBar position='sticky'>
      <Container maxWidth={ false }>
        <Toolbar disableGutters={ true } variant='dense'>
          <Link to={ routes.dashboard } className={ styles.link }>
            <HomeRoundedIcon sx={ iconSx(true) } />
            Home
          </Link>

          <button className={ styles.logout } onClick={ onLogout }>
            Logout
            <LogoutIcon sx={ iconSx(false) } />
          </button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default withSnackbar(Navbar);