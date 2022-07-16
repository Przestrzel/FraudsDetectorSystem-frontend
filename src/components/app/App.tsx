import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { routes, NOTIFICATION_SNACK_LENGTH } from 'utils/config.utils';

import { cloneDeep } from 'lodash';
import SignUp from 'components/auth/signUp/SignUp';
import Login from 'components/auth/login/Login';
import { SnackbarProvider } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import Layout from 'components/layout/Layout';
import { getAuthToken } from 'utils/auth.utils';
import { getUserData } from 'services/__mocked__/auth.service';
import { saveUser } from 'store/auth.slice';
import 'styles/index.scss';

const App = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const isLoggedIn = () => {
    return user !== null;
  };

  useEffect(() => {
    if(getAuthToken()) {
      getUserData()
        .then(data => {
          const userData = cloneDeep(data);
          delete userData.token;
          dispatch(saveUser(userData));
        });
    }
  }, []);

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
