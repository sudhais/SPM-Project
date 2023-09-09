import React, { useEffect, useState } from 'react'
import './AnalyzeResult.css'
import CodeEditor from '@monaco-editor/react'
import '../Result.css'

function AnalyzeResult() {
  const [code, setCode] = useState('')
  const [codeSize, setCodeSize] = useState(0)
  const [codeLine, setCodeLine] = useState(0)
  const [ifElseCount, setIfElseCount] = useState(0)
  const [userInput, setUserInput] = useState(0) // User input value
  const [selectedOption, setSelectedOption] = useState('codeSize')
  const [exceededMessage, setExceededMessage] = useState('')

  useEffect(() => {
    // Retrieve values from local storage
    const storedCode = localStorage.getItem('code')
    const storedCodeSize = parseInt(localStorage.getItem('codeSize'), 10) || 0
    const storedCodeLine = parseInt(localStorage.getItem('codeLine'), 10) || 0
    const storedIfElseCount =
      parseInt(localStorage.getItem('ifElseCount'), 10) || 0
    const storedUserInput = parseInt(localStorage.getItem('userInput'), 10) || 0 // Parse as an integer
    const storedSelectedOption =
      localStorage.getItem('selectedOption') || 'codeSize' // Get selected option from local storage

    setCode(storedCode)
    setCodeSize(storedCodeSize)
    setCodeLine(storedCodeLine)
    setIfElseCount(storedIfElseCount)
    setUserInput(storedUserInput)
    setSelectedOption(storedSelectedOption) // Set selected option from local storage
  }, [])

  // Define a function to determine if a value exceeds the user input
  const isExceeded = (value) => {
    return value > userInput
  }

  useEffect(() => {
    // Compare the selected option with the corresponding value and set the exceeded message
    if (selectedOption === 'codeSize' && codeSize > userInput) {
      setExceededMessage('Code Size exceeds the specified value')
    } else if (selectedOption === 'codeLine' && codeLine > userInput) {
      setExceededMessage('Code Lines exceed the specified value')
    } else if (selectedOption === 'ifElseCount' && ifElseCount > userInput) {
      setExceededMessage('If-Else Count exceeds the specified value')
    } else {
      setExceededMessage('')
    }
  }, [codeSize, codeLine, ifElseCount, selectedOption, userInput])

  return (
    <div className='analyze-result-container'>
      <h2 className='analyze-result-heading'>Code Analysis Results</h2>
      <div className='code-editor'>
        <CodeEditor
          language='java'
          value={code}
          height='500px'
          width='600px'
          options={{ readOnly: true }}
        />
      </div>
      <div className='result-details'>
        <p>User Input Value: {userInput}</p>
        {exceededMessage && (
          <p className='exceeded-message'>{exceededMessage}</p>
        )}

        <p className={isExceeded(codeSize) ? 'exceeded' : ''}>
          Code Size: {codeSize}
        </p>
        <p className={isExceeded(codeLine) ? 'exceeded' : ''}>
          Code Lines: {codeLine}
        </p>
        <p className={isExceeded(ifElseCount) ? 'exceeded' : ''}>
          If-Else Count: {ifElseCount}
        </p>
      </div>
    </div>
  )
}

export default AnalyzeResult
