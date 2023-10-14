// App.js
import React from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import './App.css'

//component
import Home from './components/Home'
import History from './pages/History'

import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";

import SideNavBar from './components/SideBar'
import AnalyzeResult from './pages/AnalyzeResult'

function App() {

  return (
    <BrowserRouter>
      <SideNavBar />
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
        <Route path='/history' element={<History/>} ></Route>
        <Route path='/analyzeResult' element={<AnalyzeResult />}></Route>
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
