// App.js
import React from 'react'

import Home from './components/Home'
import AnalyzeResult from './pages/AnalyzeResult'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home}></Route>
        <Route path='/analyzeResult' element={<AnalyzeResult />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
