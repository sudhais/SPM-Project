// App.js
import React from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import './App.css'

//component
import Home from './components/Home'

import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";

import SideNavBar from './components/SideBar'
import AnalyzeResult from './pages/AnalyzeResult'
import HistoryHome from './pages/HistoryHome';
import HistoryDetails from './pages/HistoryDetails'

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
        <Route path='/history' element={<HistoryHome/>}></Route>
        <Route path='/history/details' element={<HistoryDetails/>}></Route>
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
