import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserCard from './components/card/UserCard';
import { Login } from './components/login/login';
import {Switch, Route} from 'react-router-dom';
import { Register } from './components/register/register';
import dashboard from './dashboard/dashboard';

function App() {
  return (
    <div className="container-fluid">
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/dashboard" exact component={dashboard}/>
      </Switch>
    </div>
  );
}

export default App;
