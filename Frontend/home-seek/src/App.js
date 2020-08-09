import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'
import './App.css';
import RegisterPage from './pages/RegisterPage';
import Loginpage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/signUp' component={RegisterPage}/>  
        <Route exact path='/signIn' component={Loginpage}/>
        <Redirect to='/' />  
      </Switch>
    </div>
  );
}

export default App;
