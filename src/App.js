import React from 'react';
import './App.css';

import { ToastContainer } from "react-toastify";
import Home from './Home'
import 'react-toastify/dist/ReactToastify.css'
import './Css/Main.css'

function App() {
  //if (window.location.href.match('http:')) window.location.href = window.location.href.replace('http', 'https')
  document.body.style.background = "rgb(235,235,235)"
  return (
    <div className="App">
      <ToastContainer autoClose={3000}></ToastContainer>
      <Home></Home>
    </div>
  );
}

export default App;
