import CodeEditor from '@monaco-editor/react'
import { useState } from 'react';
import axios from 'axios';

import { Link } from "react-router-dom";

function Home() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState([]);

  const analyzeCode = () => {
    console.log('home');
    axios.post('http://localhost:8000/analyze-code', { code })
      .then((response) => {
        setResult(response.data);
        console.log(result);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return(
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
          <Link to={'#'}><button className='analyze-button' onClick={analyzeCode}>Analyze</button></Link>
        </div>
      </header>
    </div>
  )
}

export default Home;