import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from 'components/auth/login/Login';
import SignUp from 'components/auth/signUp/SignUp';
import { routes } from 'utils/config.utils';
import { store } from 'store/store';
import 'styles/index.scss';

const App = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Routes>
          <Route path={ routes.login } element={ <Login/> }/>
          <Route path={ routes.signUp } element={ <SignUp/> }/>
          <Route path='*' element={ <Navigate to={ routes.login }/> }/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
