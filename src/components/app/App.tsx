import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { routes, NOTIFICATION_SNACK_LENGTH } from 'utils/config.utils';

import SignUp from 'components/auth/signUp/SignUp';
import Login from 'components/auth/login/Login';
import 'styles/index.scss';
import { SnackbarProvider } from 'notistack';

const App = () => {
  return (
    <Provider store={ store }>
      <SnackbarProvider maxSnack={ NOTIFICATION_SNACK_LENGTH }>
        <BrowserRouter>
          <Routes>
            <Route path={ routes.login } element={ <Login/> }/>
            <Route path={ routes.signUp } element={ <SignUp/> }/>
            <Route path='*' element={ <Navigate to={ routes.login }/> }/>
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  );
};

export default App;
