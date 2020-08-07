import React from 'react';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import Loginpage from './pages/Loginpage';
import LogOutPage from './pages/LogOutPage';

function App() {
  return (
    <div className="App">
      <h1>RegisterPage</h1>
      <RegisterPage />
      <h1>LoginPage</h1>
      <Loginpage />
      <h1>Logout</h1>
      <LogOutPage />
    </div>
  );
}

export default App;
