// App.js
import React from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import Home from './components/Home'
import AnalyzeResult from './pages/AnalyzeResult'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SideNavBar from './components/SideBar'
function App() {
  return (
    <BrowserRouter>
      <SideNavBar />
      <Routes>
        <Route path='/' Component={Home}></Route>
        <Route path='/analyzeResult' element={<AnalyzeResult />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
