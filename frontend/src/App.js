// App.js
import React, { useState } from 'react'
import CodeEditor from '@monaco-editor/react'
import './App.css'

function App() {
  const [code, setCode] = useState('')

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='container'>
          <h1 className='title'>Code Analyzer</h1>
          <p className='subtitle'>Enter your code below and click "Analyze"</p>
          <div className='code-editor'>
            <CodeEditor
              language='java'
              value={code}
              onChange={(value) => setCode(value)}
              height='500px'
              width='800px'
            />
          </div>
          <button className='analyze-button'>Analyze</button>
        </div>
      </header>
    </div>
  )
}

export default App
