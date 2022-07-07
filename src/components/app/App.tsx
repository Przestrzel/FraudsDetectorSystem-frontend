import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { routes } from 'utils/config.utils';
import 'styles/index.scss';
import Login from 'components/auth/login/Login';
import ForgotPassword from 'components/auth/forgotPassword/ForgotPassword';
import SignUp from 'components/auth/signUp/SignUp';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ routes.login } element={ <Login/> }/>
        <Route path={ routes.forgotPassword } element={ <ForgotPassword/> }/>
        <Route path={ routes.signUp } element={ <SignUp/> }/>
        <Route path='*' element={ <Navigate to={ routes.login }/> }/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
