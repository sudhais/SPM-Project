import React, { useState, useEffect } from 'react'
import CodeEditor from '@monaco-editor/react'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Home() {
  const [code, setCode] = useState('')
  const [codeCount, setCodeCount] = useState(0) //save as 0
  const [codeLine, setCodeLine] = useState(0)
  const [ifElseCount, setIfElseCount] = useState(0)
  const [singleLineComments, setSingleLineComments] = useState(0)
  const [multiLineComments, setMultiLineComment] = useState(0)
  const [classes, setClasses] = useState(0)
  const [methods, setMethods] = useState(0)
  const [whileLoops, setWhileLoops] = useState(0)
  const [forLoops, setForLoops] = useState(0)
  const [selectedOption, setSelectedOption] = useState('singleLineComments')
  const [userInput, setUserInput] = useState('')
  const [result, setResult] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    // Update if-else count whenever code changes
    countIfElseStatements(code)
    countSingleLineComments(code)
    countMultiLineComments(code)
    countClasses(code)
    countMethods(code)
    countWhileLoops(code)
    countForLoops(code)
  }, [code])

  const handleCodeChange = (value) => {
    setCode(value)
    setCodeCount(value.length)
    const linesOfCode = value
      .split('\n').length;
      // .filter((line) => line.trim() !== '').length
    setCodeLine(linesOfCode)
  }

  const handleAnalyzeClick = () => {
    if(code !== ""){
      // Store codeCount, codeLine, ifElseCount, selectedOption, and userInput in local storage
      localStorage.setItem('code', code)
      localStorage.setItem('codeCount', codeCount)
      localStorage.setItem('codeLine', codeLine)
      localStorage.setItem('ifElseCount', ifElseCount)
      localStorage.setItem('singleLineComments', singleLineComments)
      localStorage.setItem('multiLineComments', multiLineComments)
      localStorage.setItem('whileLoops', whileLoops)
      localStorage.setItem('forLoops', forLoops)
      localStorage.setItem('methods', methods)
      localStorage.setItem('classes', classes)
      localStorage.setItem('selectedOption', selectedOption)
      localStorage.setItem('userInput', userInput)

      axios.post('http://localhost:8000/analyze-code', { code })
        .then((response) => {
          setResult(response.data);
          // console.log(response.data);
          const objStr = JSON.stringify(response.data);
          localStorage.setItem('result', objStr);
          // console.log(result);
          navigate('/analyzeResult');
        })
        .catch((error) => {
          console.error(error);
        });
    }else{
      alert("please enter the code")
    }
    
      

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

  const countSingleLineComments = (javaCode) => {
    const lines = javaCode.split('\n')
    let commentCount = 0

    for (const line of lines) {
      const trimmedLine = line.trim()
      if (trimmedLine.startsWith('//')) {
        commentCount++
      }
    }
    setSingleLineComments(commentCount)
  }

  const countMultiLineComments = (javaCode) => {
    const commentRegex = /\/\*[\s\S]*?\*\//g
    const comments = javaCode.match(commentRegex)
    const commentCount = comments ? comments.length : 0

    setMultiLineComment(commentCount)
  }

  const countClasses = (codeToCount) => {
    const lines = codeToCount.split('\n')
    let classCount = 0

    for (const line of lines) {
      const trimmedLine = line.trim()

      // Check if the line starts with "class" followed by a valid class name
      if (
        trimmedLine.match(/^class\s+[A-Za-z_$][A-Za-z0-9_$]*\s*\{/) ||
        line.includes('class')
      ) {
        classCount++
      }
    }

    setClasses(classCount)
  }

  const countMethods = (codeToCount) => {
    const lines = codeToCount.split('\n')
    let methodCount = 0
    let insideMethod = false

    for (const line of lines) {
      const trimmedLine = line.trim()

      // Check if the line starts with a valid method signature
      if (
        trimmedLine.match(/^[A-Za-z_$][A-Za-z0-9_$]*\s*\([^)]*\)\s*\{/) ||
        line.includes('void')
      ) {
        methodCount++
        insideMethod = true
      } else if (insideMethod && trimmedLine.endsWith('}')) {
        insideMethod = false
      }
    }

    setMethods(methodCount)
  }

  const countWhileLoops = (codeToCount) => {
    const lines = codeToCount.split('\n')
    let whileLoopCount = 0

    for (const line of lines) {
      // Check if the line contains a 'while' loop statement
      if (line.includes('while')) {
        whileLoopCount++
      }
    }

    setWhileLoops(whileLoopCount)
  }

  const countForLoops = (codeToCount) => {
    const lines = codeToCount.split('\n')
    let forLoopCount = 0

    for (const line of lines) {
      // Check if the line contains a 'for' loop statement
      if (line.includes('for')) {
        forLoopCount++
      }
    }

    setForLoops(forLoopCount)
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
              Select option:
              <select value={selectedOption} onChange={handleOptionChange}>
                <option value='singleLineComments'>Single line comment</option>
                <option value='multiLineComments'>Multi line comments</option>
                <option value='classes'>Classes</option>
                <option value='methods'>Methods </option>
                <option value='whileLoops'>While loops </option>
                <option value='forLoops'>For loops </option>
                <option value='codeLine'>Code line</option>
                <option value='ifElseCount'>If-Else count</option>
              </select>
            </label>
            <label>
              Check exceeds or not (Integer):
              <input
                type='number'
                value={userInput}
                onChange={handleUserInputChange}
              />
            </label>
          </div>

          <Link
            // to={{
            //   pathname: '/analyzeResult',
            //   state: {
            //     selectedOption: selectedOption,
            //     userInput: userInput,
            //   },
            // }}
            // state={handleAnalyzeClick}
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
