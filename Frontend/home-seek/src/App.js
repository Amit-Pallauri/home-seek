import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'
import './App.css';
import RegisterPage from './pages/RegisterPage';
import Loginpage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
// import DetailPage from './pages/DetailPage';
import ListingPage from './pages/ListingPage';
import ChatPage from './pages/ChatPage'
import ForgotPassword from './pages/ForgotPassword';
import RevivePassword from './pages/RevivePassword';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/signUp' component={RegisterPage}/>  
        <Route exact path='/signIn' component={Loginpage}/>
        <Route exact path='/forgotPassword' component={ForgotPassword}/>
        <Route exact path='/revivePassword/:token' component={RevivePassword}/>
        <Route exact path='/chat' component={ChatPage} />
        <Route exact path='/owner/listing/create' component={ListingPage} />
        <Redirect to='/' />  
      </Switch>
      {/* <DetailPage />
      <ListingPage /> */}
    </div>
  );
}

export default App;
