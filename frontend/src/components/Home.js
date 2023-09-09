import React, { useState, useEffect } from 'react'
import CodeEditor from '@monaco-editor/react'
import '../App.css'
import { Link } from 'react-router-dom'

function Home() {
  const [code, setCode] = useState('')
  const [codeSize, setCodeSize] = useState(0)
  const [codeLine, setCodeLine] = useState(0)
  const [ifElseCount, setIfElseCount] = useState(0)
  const [selectedOption, setSelectedOption] = useState('codeSize')
  const [userInput, setUserInput] = useState('')

  useEffect(() => {
    // Update if-else count whenever code changes
    countIfElseStatements(code)
  }, [code])

  const handleCodeChange = (value) => {
    setCode(value)
    setCodeSize(value.length)
    const linesOfCode = value
      .split('\n')
      .filter((line) => line.trim() !== '').length
    setCodeLine(linesOfCode)
  }

  const handleAnalyzeClick = () => {
    // Store codeSize, codeLine, ifElseCount, selectedOption, and userInput in local storage
    localStorage.setItem('code', code)
    localStorage.setItem('codeSize', codeSize)
    localStorage.setItem('codeLine', codeLine)
    localStorage.setItem('ifElseCount', ifElseCount)
    localStorage.setItem('selectedOption', selectedOption)
    localStorage.setItem('userInput', userInput)
  }

  const countIfElseStatements = (codeToCount) => {
    // Split code into lines
    const lines = codeToCount.split('\n')
    let count = 0
    let stack = 0

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      if (line.startsWith('if')) {
        stack++
      } else if (line.startsWith('else if') || line.startsWith('else')) {
        if (stack > 0) {
          count++
        }
      }

      if (line.endsWith('{')) {
        stack++
      } else if (line.endsWith('}')) {
        stack--
      }
    }

    setIfElseCount(count)
  }

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value)
  }

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value)
  }

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
              onChange={handleCodeChange}
              height='500px'
              width='800px'
            />
          </div>

          <div className='option-input'>
            <label>
              Select Option:
              <select value={selectedOption} onChange={handleOptionChange}>
                <option value='codeSize'>Code Size</option>
                <option value='codeLine'>Code Line</option>
                <option value='ifElseCount'>If-Else Count</option>
              </select>
            </label>
            <label>
              Check Exceeds or not (Integer):
              <input
                type='number'
                value={userInput}
                onChange={handleUserInputChange}
              />
            </label>
          </div>

          <Link
            to={{
              pathname: '/analyzeResult',
              state: {
                selectedOption: selectedOption,
                userInput: userInput,
              },
            }}
            onClick={handleAnalyzeClick}
          >
            <button className='analyze-button'>Analyze</button>
          </Link>
        </div>
      </header>
    </div>
  )
}

export default Home
