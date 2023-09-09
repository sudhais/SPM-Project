// App.js
import React, { useState } from 'react'

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css'

//component
import Home from './components/Home'
import History from './pages/History'

function App() {
  const [code, setCode] = useState('')

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home}></Route>
        <Route path='/test' element={<History/>} ></Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
