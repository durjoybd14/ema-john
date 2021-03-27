import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Order from './components/Order/Order';
import Manage from './components/Manage/Manage';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import LogIn from './components/LogIn/LogIn';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {/* <h3>Email:{loggedInUser.email}</h3> */}

      <Router>
        <Header></Header>

        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>

          <Route path="/order">
            <Order></Order>
          </Route>

          <PrivateRoute path="/manage">
            <Manage></Manage>
          </PrivateRoute>

          <Route path="/login">
            <LogIn />
          </Route>

          <PrivateRoute path="/shipment">
            <Shipment />
          </PrivateRoute>

          <Route path="/product/:productKey">
            <ProductDetails></ProductDetails>
          </Route>

          <Route exact path="/">
            <Shop></Shop>
          </Route>

          <Route path="/*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
