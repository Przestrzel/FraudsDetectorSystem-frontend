import React, { useCallback } from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Button from 'components/common/button/Button';
import LoginIcon from '@mui/icons-material/Login';
import { routes } from 'utils/config.utils';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Navbar.module.scss';
import { logout } from 'services/__mocked__/auth.service';
import { setAuthToken } from 'utils/auth.utils';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import useNotification from 'hooks/useNotification';
import { NotificationType } from 'types/app.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { logoutUser } from 'store/auth.slice';
import { useWeb3React } from '@web3-react/core';
import useBlockchain from 'hooks/useBlockchain';

type Props = {
  isLoggedIn: boolean;
} & WithSnackbarProps;

const Navbar = ({ isLoggedIn }: Props ) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { notify } = useNotification();
  const { active } = useWeb3React();
  const { addMoney } = useBlockchain();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        setAuthToken('', true);
      })
      .finally(() => {
        notify('You have been logged out', NotificationType.INFO);
        navigate(routes.login);
      });
  }, []);

  return (
    <AppBar position='sticky'>
      <Container maxWidth={ false }>
        <Toolbar disableGutters={ true } variant='dense'>
          <Link to={ routes.auctions } className={ styles.link }>
            <DescriptionIcon sx={ iconSx(true) } />
            Auctions
          </Link>
          { isLoggedIn &&
          <Link to={ routes.addAuction } className={ styles.link }>
            <AddCircleIcon sx={ iconSx(true) } />
            Add auction
          </Link>
          }
          <div className={ styles.rightNav }>
            { active && user != null ?
              <div className={ styles.connected }>
                <Button
                  className={ styles.addMoneyButton }
                  text='Add money'
                  onClick={ () => addMoney() } />
                Connected <CheckCircleIcon />
              </div> :
              <div className={ styles.disconnected }>Not connected <RemoveCircleIcon /></div> }
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