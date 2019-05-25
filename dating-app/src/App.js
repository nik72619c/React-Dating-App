import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserCard from './components/card/UserCard';
import { Login } from './components/login/login';
import {Switch, Route} from 'react-router-dom';
import { Register } from './components/register/register';

function App() {
  return (
    <div className="container-fluid">
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/register" exact component={Register}/>
      </Switch>
    </div>
  );
}

export default App;
