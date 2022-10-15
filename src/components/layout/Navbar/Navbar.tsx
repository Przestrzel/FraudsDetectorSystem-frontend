import React, { useCallback, useState } from 'react';
import { AppBar, Container, Popover, Toolbar } from '@mui/material';
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
import { logout } from 'services/auth.service';
import { setAuthToken } from 'utils/auth.utils';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import useNotification from 'hooks/useNotification';
import { NotificationType } from 'types/app.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { logoutUser } from 'store/auth.slice';
import { useWeb3React } from '@web3-react/core';
import useBlockchain from 'hooks/useBlockchain';
import { messages } from 'utils/messages.utils';

type Props = {
  isLoggedIn: boolean;
} & WithSnackbarProps;

const Navbar = ({ isLoggedIn }: Props ) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [ anchorEl, setAnchorEl ] = useState<HTMLButtonElement>(null);
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
        notify('Wylogowałeś się!', NotificationType.INFO);
        navigate(routes.login);
      }).catch(() => {
        notify(messages.unexpected, NotificationType.ERROR);
      });
  }, []);

  return (
    <AppBar position='sticky'>
      <Container maxWidth={ false }>
        <Toolbar disableGutters={ true } variant='dense'>
          <Link to={ routes.auctions } className={ styles.link }>
            <DescriptionIcon sx={ iconSx(true) } />
            Lista przetargów
          </Link>
          { isLoggedIn &&
          <Link to={ routes.addAuction } className={ styles.link }>
            <AddCircleIcon sx={ iconSx(true) } />
            Dodaj przetarg
          </Link>
          }
          <div className={ styles.rightNav }>
            { active && user != null ?
              <div className={ styles.connected }>
                <Button
                  className={ styles.addMoneyButton }
                  text='Doładuj konto'
                  onClick={ () => addMoney() } />
                Połączony <CheckCircleIcon />
              </div> :
              <div className={ styles.disconnected }>Brak połączenia <RemoveCircleIcon /></div> }
            { isLoggedIn && (!user?.companyName && !user?.institutionName) &&
              <div>
                <Button
                  className={ styles.addMoneyButton }
                  onClick={ (e) => setAnchorEl(e.currentTarget) }
                  text='Profil' />
                <Popover
                  open={ anchorEl != null }
                  anchorEl={ anchorEl }
                  onClose={ () => setAnchorEl(null) }
                  anchorOrigin={ {
                    vertical: 'bottom',
                    horizontal: 'left',
                  } }>
                  <div
                    className={ styles.popoverElement }
                    onClick={ () => {
                      setAnchorEl(null);
                      navigate(routes.signUpCompany);
                    } }
                  >
                    Zarejestruj firmę
                  </div>
                  <div
                    className={ styles.popoverElement }
                    onClick={ () => {
                      setAnchorEl(null);
                      navigate(routes.signUpOrganisation);
                    } }
                  >
                    Zarejestruj instytucję
                  </div>
                </Popover>
              </div>
            }
            { isLoggedIn ?
              <button className={ styles.logout } onClick={ onLogout }>
                Wyloguj się
                <ExitToAppIcon sx={ iconSx(false) } />
              </button> :
              <Link to={ routes.login } className={ styles.logout }>
                Zaloguj się
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