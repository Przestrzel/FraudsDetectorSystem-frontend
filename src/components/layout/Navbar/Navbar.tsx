import React, { useCallback } from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import { routes } from 'utils/config.utils';
import { Link } from 'react-router-dom';

import styles from './Navbar.module.scss';
import { logout } from 'services/__mocked__/auth.service';
import { setAuthToken } from 'utils/auth.utils';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import useNotification from 'hooks/useNotification';
import { NotificationType } from 'types/app.types';
import { useDispatch } from 'react-redux';
import { logoutUser } from 'store/auth.slice';

type Props = {
  isLoggedIn: boolean;
} & WithSnackbarProps;

const Navbar = ({ isLoggedIn }: Props ) => {
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
          <Link to={ routes.auctions.list } className={ styles.link }>
            <DescriptionIcon sx={ iconSx(true) } />
            Auctions
          </Link>
          { isLoggedIn &&
          <Link to={ routes.auctions.add } className={ styles.link }>
            <AddCircleIcon sx={ iconSx(true) } />
            Add auction
          </Link>
          }
          <div className={ styles.rightNav }>
            { isLoggedIn ?
              <button className={ styles.logout } onClick={ onLogout }>
                Logout
                <ExitToAppIcon sx={ iconSx(false) } />
              </button> :
              <Link to={ routes.login } className={ styles.logout }>
                Log in
                <LoginIcon sx={ iconSx(false) } />
              </Link>

            }
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default withSnackbar(Navbar);