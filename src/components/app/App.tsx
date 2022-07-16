import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { routes, NOTIFICATION_SNACK_LENGTH } from 'utils/config.utils';

import SignUp from 'components/auth/signUp/SignUp';
import Login from 'components/auth/login/Login';
import 'styles/index.scss';
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import Layout from 'components/layout/Layout';

const App = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const isLoggedIn = () => {
    return user !== null;
  };

  return (
    <SnackbarProvider maxSnack={ NOTIFICATION_SNACK_LENGTH }>
      <BrowserRouter>
        { ! isLoggedIn() ?
          <Routes>
            <Route path={ routes.login } element={ <Login/> }/>
            <Route path={ routes.signUp } element={ <SignUp/> }/>
            <Route path='*' element={ <Navigate to={ routes.login }/> }/>
          </Routes>
          :
          <Layout>
            <Routes>
              <Route path={ routes.dashboard } element={ <div/> }/>
              <Route path='*' element={ <Navigate to={ routes.dashboard }/> }/>
            </Routes>
          </Layout>
        }
      </BrowserRouter>
    </SnackbarProvider>
  );
};

export default App;
