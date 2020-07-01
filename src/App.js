import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';


import User from "./component/Dashboard/User";
import Dashboard from "./component/Dashboard/Dashboard";
import UserView from "./component/Dashboard/UserView";
import Login from "./component/Login/Login";
import SignUp from "./component/SignUp/SignUp";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddUserView from "./component/Dashboard/AddUserView";
import AddNew from "./component/Dashboard/AddNew";
import Charts from "./component/Dashboard/Charts"

// import { HashRouter, Route, Switch } from 'react-router-dom';

function App() {
  // // const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
  // const UserView = React.lazy(() => import('./component/UserView'));
  // const Add = React.lazy(() => import('./component/Add'));
  // const Home = React.lazy(() => import('./component/Home'));

  // const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
  let isLogged = localStorage.getItem('isLogged')
  return (
   
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/dashboard" exact component={Dashboard} />
          {/* <Route path="/dashboard" exact>
            <UserView />
          </Route> */}
          <Route path="/adduser" exact>
            <AddUserView />
          </Route>
          <Route path="/signUp" exact>
            <SignUp />
          </Route>
          {/* <Route path="/user" exact>
            <User />
          </Route> */}
          <Route path="/addnew" exact>
            <AddNew />
          </Route>
          <Route path="/userview" exact>
            <UserView />
          </Route>
          <Route path="/chart" exact>
            <Charts />
          </Route>


          )
        </Switch>
        <ToastContainer />
      </Router>
 
  );
}

export default App;
