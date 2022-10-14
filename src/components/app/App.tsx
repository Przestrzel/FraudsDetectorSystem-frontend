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
import AuctionPage from 'components/auctions/auctionPage/AuctionPage';
import AuctionDetailsPage from 'components/auctions/auctionDetailsPage/AuctionDetailsPage';
import AddAuctionPage from 'components/auctions/addAuctionPage/AddAuctionPage';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../blockchain/connectors';
import SignUpCompany from 'components/auth/signUpGroup/SignUpCompany';
import SignUpOrganisation from 'components/auth/signUpGroup/SignUpOrganisation';

const App = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { active, activate } = useWeb3React();
  const dispatch = useDispatch();

  const isLoggedIn = () => {
    return user !== null;
  };
  const connect = async() => {
    try{
      await activate(injected);
    }catch(e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if(getAuthToken()) {
      getUserData()
        .then(data => {
          const userData = cloneDeep(data);
          dispatch(saveUser(userData));
        });
    }
  }, [ ]);

  useEffect(() => {
    if(!active && isLoggedIn()){
      connect();
    }
  }, [ user ]);

  return (
    <SnackbarProvider maxSnack={ NOTIFICATION_SNACK_LENGTH }>
      <BrowserRouter>
        <Layout isLoggedIn={ isLoggedIn() }>
          { !isLoggedIn() ?
            <Routes>
              <Route path={ routes.login } element={ <Login/> }/>
              <Route path={ routes.signUp } element={ <SignUp/> }/>
              <Route path={ routes.auctions } element={ <AuctionPage /> }/>
              <Route path='*' element={ <Navigate to={ routes.auctions }/> }/>
            </Routes>
            :
            <Routes>
              <Route path={ routes.auctions }>
                <Route path={ routes.addAuction } element={ <AddAuctionPage /> }/>
                <Route path=':id' element={ <AuctionDetailsPage /> }/>
                <Route path='' element={ <AuctionPage /> }/>
              </Route>
              <Route path={ routes.signUp }>
                <Route path={ routes.signUpCompany } element={ <SignUpCompany /> } />
                <Route path={ routes.signUpOrganisation } element={ <SignUpOrganisation /> } />
              </Route>
              <Route path='*' element={ <Navigate to={ routes.auctions }/> }/>
            </Routes>
          }
        </Layout>
      </BrowserRouter>
    </SnackbarProvider>
  );
};

export default App;
