// App.js
import React, { useState } from 'react'

import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import './App.css'

//component
import Home from './components/Home'
import History from './pages/History'

import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' 
          element={
            <ProtectedRoutes>
              <HomePage/>
            </ProtectedRoutes> 
          }
          />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' Component={Home}></Route>
        <Route path='/test' element={<History/>} ></Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export function ProtectedRoutes(props){
  if(localStorage.getItem('user')){
    return props.children
  }else{
    return <Navigate to="/login"/>
  }
}

export default App
