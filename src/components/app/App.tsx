import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { routes } from 'utils/config.utils';
import 'styles/index.scss';
import Login from 'components/auth/login/Login';
import ForgotPassword from 'components/auth/forgotPassword/ForgotPassword';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ routes.login } element={ <Login/> }/>
        <Route path={ routes.forgotPassword } element={ <ForgotPassword/> }/>
        <Route path='*' element={ <Navigate to={ routes.login }/> }/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
