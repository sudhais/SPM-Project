import React, { useEffect, useState, useRef } from 'react'
import { useLocation} from "react-router-dom"
import './AnalyzeResult.css'
import { PieChart, Pie, Cell } from 'recharts'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer'
import { Button } from 'antd'

function HistoryDetails() {
  const [code, setCode] = useState('')
  const [codeCount, setCodeCount] = useState(0)
  const [codeLine, setCodeLine] = useState(0)
  const [ifElseCount, setIfElseCount] = useState(0)
  const [singleLineComments, setSingleLineComments] = useState(0)
  const [multiLineComments, setMultiLineComment] = useState(0)
  const [methods, setMethods] = useState(0)
  const [whileLoops, setWhileLoops] = useState(0)
  const [forLoops, setForLoops] = useState(0)
  const [classes, setClasses] = useState(0)
  const [userInput, setUserInput] = useState(0) // User input value
  const [selectedOption, setSelectedOption] = useState('codeCount')
  const [exceededMessage, setExceededMessage] = useState('')
  const componentRef = useRef()
  const [finalData, setFinalData] = useState('');

  const location = useLocation();
  const retrievedData = location.state;
  console.log(retrievedData);

  useEffect(() => {
    // Retrieve values from local storage
    const storedCodeLine = parseInt(localStorage.getItem('codeLine'), 10) || 0
    const storedMethods = parseInt(localStorage.getItem('methods'), 10) || 0
    const storedWhileLoops =
      parseInt(localStorage.getItem('whileLoops'), 10) || 0
    const storedForLoops = parseInt(localStorage.getItem('forLoops'), 10) || 0
    const storedSingleLineComments =
      parseInt(localStorage.getItem('singleLineComments'), 10) || 0
    const storedMultiLineComment =
      parseInt(localStorage.getItem('multiLineComments'), 10) || 0
    const storedClasses = parseInt(localStorage.getItem('classes'), 10) || 0
    const storedIfElseCount =
      parseInt(localStorage.getItem('ifElseCount'), 10) || 0
    const storedUserInput = parseInt(localStorage.getItem('userInput'), 10) || 0 // Parse as an integer
    const storedSelectedOption =
      localStorage.getItem('selectedOption') || 'codeCount'
  
  // Get selected option from local storage

    setFinalData(retrievedData)

    setCodeLine(storedCodeLine)
    setIfElseCount(storedIfElseCount)
    setSingleLineComments(storedSingleLineComments)
    setMultiLineComment(storedMultiLineComment)
    setMethods(storedMethods)
    setWhileLoops(storedWhileLoops)
    setForLoops(storedForLoops)
    setClasses(storedClasses)
    setUserInput(storedUserInput)
    setSelectedOption(storedSelectedOption)
  }, [])

  // Define a function to determine if a value exceeds the user input
  const isExceeded = (value) => {
    return value > userInput
  }

  useEffect(() => {
    // Compare the selected option with the corresponding value and set the exceeded message
    if (selectedOption === 'codeCount' && codeCount > userInput) {
      setExceededMessage('Code Count exceeds the specified value')
    } else if (selectedOption === 'codeLine' && codeLine > userInput) {
      setExceededMessage('Code Lines exceed the specified value')
    } else if (selectedOption === 'ifElseCount' && ifElseCount > userInput) {
      setExceededMessage('If-Else Count exceeds the specified value')
    } else if (
      selectedOption === 'singleLineComments' &&
      singleLineComments > userInput
    ) {
      setExceededMessage('Single Line Comments exceeds the specified value')
    } else if (
      selectedOption === 'multiLineComments' &&
      multiLineComments > userInput
    ) {
      setExceededMessage('Multi Line Comments exceeds the specified value')
    } else if (selectedOption === 'classes' && classes > userInput) {
      setExceededMessage('Classes exceeds the specified value')
    } else if (selectedOption === 'methods' && methods > userInput) {
      setExceededMessage('Methods exceeds the specified value')
    } else if (selectedOption === 'whileLoops' && whileLoops > userInput) {
      setExceededMessage('While Loops exceeds the specified value')
    } else if (selectedOption === 'forLoops' && forLoops > userInput) {
      setExceededMessage('For Loops exceeds the specified value')
    } else {
      setExceededMessage('')
    }
  }, [])

  // Define PDF styles inline
  const pdfStyles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    title: {
      fontSize: 24, // Adjusted font size
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center', // Center align the title
      backgroundColor: 'red', // Add a light background color
      padding: 10,
      borderRadius: '5px', // Round the corners of the code block
      marginTop: 10,
      whiteSpace: 'pre-wrap', // Allow line breaks
      overflowWrap: 'break-word', // Word wrap for long lines
    },
    label: {
      fontSize: 14, // Adjusted font size
      fontWeight: 'bold', // Make labels bold
      marginBottom: 5,
      color: '#333', // Darken label text color
      backgroundColor: '#f7f7f7', // Add a light background color
      padding: 10,
      borderRadius: '5px', // Round the corners of the code block
      marginTop: 10,
      whiteSpace: 'pre-wrap', // Allow line breaks
      overflowWrap: 'break-word', // Word wrap for long lines
    },
    value: {
      fontSize: 16, // Adjusted font size
      marginBottom: 10,
      backgroundColor: '#f7f7f7', // Add a light background color
      padding: 10,
      borderRadius: '5px', // Round the corners of the code block
      marginTop: 10,
      whiteSpace: 'pre-wrap', // Allow line breaks
      overflowWrap: 'break-word', // Word wrap for long lines
    },
    pdfDocument: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      border: '1px solid #ccc', // Add a border for a clean look
      borderRadius: '5px', // Round the corners of the result box
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
    },
    exceededMessage: {
      color: 'red',
      backgroundColor: '#f7f7f7', // Add a light background color
      padding: 10,
      borderRadius: '5px', // Round the corners of the code block
      marginTop: 10,
      whiteSpace: 'pre-wrap', // Allow line breaks
      overflowWrap: 'break-word', // Word wrap for long lines
    },
    codeBlock: {
      fontSize: 14,
      backgroundColor: '#f7f7f7', // Add a light background color
      padding: 10,
      borderRadius: '5px', // Round the corners of the code block
      marginTop: 10,
      whiteSpace: 'pre-wrap', // Allow line breaks
      overflowWrap: 'break-word', // Word wrap for long lines
      border: '1px solid #ccc', // Add a border for a clean look
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
      color: '#000', // Use a dark color for code text
    },
  })

  const data = [
    { name: 'Single Line', value: singleLineComments },
    { name: 'Multi Lines', value: multiLineComments },
    { name: 'Code Line', value: codeLine },
    { name: 'If else count', value: ifElseCount },
    { name: 'Classes', value: classes },
    { name: 'Methods', value: methods },
    { name: 'For Loops', value: forLoops },
    { name: 'While Loops', value: whileLoops },
  ]




  // Define custom colors for your charts
  const colors = ['#FF6633', '#FFB399', '#FF33FF']

  function generatePieChartSVG(data) {
    return (
      <PieChart width={200} height={200}>
        <Pie
          dataKey='value'
          isAnimationActive={false}
          data={data}
          cx='50%'
          cy='50%'
          outerRadius={60}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    )
  }

  function generateBarChartSVG(data) {
    return (
      <BarChart
        width={200}
        height={150}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Bar dataKey='value' fill='#8884d8'>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    )
  }

  return (
    <div>
    <div className='analyze-result-container' ref={componentRef}>
      <div className='code-editor'>
        <h2 className='analyze-result-heading'>Code Analysis Report</h2>
        <BarChart
          width={1000}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 200,
            left: 0,
            bottom: 10,
          }}
          barSize={30}
        >
          <XAxis
            dataKey='name'
            scale='point'
            padding={{ left: 16, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray='3 3' />
          <Bar dataKey='value' background={{ fill: '#eee' }}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </div>

      <div className='result-details'>
        <p>User Input Value: {userInput}</p>
        {exceededMessage && (
          <p className='exceeded-message'>{exceededMessage}</p>
        )}
        <p className={isExceeded(singleLineComments) ? 'exceeded' : ''}>
          single LineComments: {singleLineComments}
        </p>
        <p className={isExceeded(multiLineComments) ? 'exceeded' : ''}>
          Multi Line Comments: {multiLineComments}
        </p>
        <p className={isExceeded(codeLine) ? 'exceeded' : ''}>
          Code Lines: {codeLine}
        </p>
        <p className={isExceeded(classes) ? 'exceeded' : ''}>
          Classes: {classes}
        </p>
        <p className={isExceeded(methods) ? 'exceeded' : ''}>
          Methods: {methods}
        </p>
        <p className={isExceeded(whileLoops) ? 'exceeded' : ''}>
          While Loops: {whileLoops}
        </p>
        <p className={isExceeded(forLoops) ? 'exceeded' : ''}>
          For Loops: {forLoops}
        </p>
        <p className={isExceeded(ifElseCount) ? 'exceeded' : ''}>
          If-Else Count: {ifElseCount}
        </p>
        <PieChart width={400} height={400}>
          <Pie
            dataKey='value'
            isAnimationActive={false}
            data={data}
            cx='50%'
            cy='50%'
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
        {/* // Style and colorize the BarChart */}

        {/* PDF download button */}
        <PDFDownloadLink
          document={
            <Document>
              <Page size='A4' style={pdfStyles.page}>
                <View style={[pdfStyles.section, pdfStyles.pdfDocument]}>
                  <Text style={pdfStyles.title}>Code Analysis Report</Text>
                  <Text style={pdfStyles.codeBlock}>User Code:</Text>
                  <Text style={pdfStyles.codeBlock}>{code}</Text>
                  <Text style={pdfStyles.label}>
                    User Input Value for {selectedOption} is : {userInput}
                  </Text>
                  {exceededMessage && (
                    <View>
                      <Text style={pdfStyles.exceededMessage}>
                        Exceeded Message: {exceededMessage}
                      </Text>
                    </View>
                  )}
                  <Text style={pdfStyles.label}>
                    Single Line Comments: {singleLineComments}
                  </Text>
                  <Text style={pdfStyles.label}>Code Lines: {codeLine}</Text>
                  <Text style={pdfStyles.label}>
                    If-Else Count: {ifElseCount}
                  </Text>

                  {/* Include the PieChart SVG */}
                  <View style={pdfStyles.chartContainer}>
                    {generatePieChartSVG(data)}
                  </View>

                  {/* Include the BarChart SVG */}
                  <View style={pdfStyles.chartContainer}>
                    {generateBarChartSVG(data)}
                  </View>
                </View>
              </Page>
            </Document>
          }
          fileName='code_analysis_report.pdf'
        >
          {({ blob, url, loading, error }) => (
            <button className='pdf-download-button'>
              {loading ? 'Loading document...' : 'Download Report Analysis'}
            </button>
          )}
        </PDFDownloadLink>
      </div>
      </div>
      
      <table className="table table-bordered" >
        <thead>
          <tr>
            <th scope="col">Class Name</th>
            <th scope="col">Method Name</th>
            <th scope="col">Line No</th>
            <th scope="col">Statement</th>
            <th scope="col">S</th>
            <th scope="col">Wi</th>
            <th scope="col">Wc</th>
            <th scope="col">Wn</th>
            <th scope="col">W</th>
            <th scope="col">S*W</th>
          </tr>
        </thead>
        <tbody>
          {finalData.reports &&
            finalData.reports.map((val, index) => (
              <tr key={index}>
                <td>{val.class}</td>
                <td>{val.method}</td>
                <th scope="row">{val.lineNo}</th>
                <td>{val.statement}</td>
                <td>{val.size}</td>
                <td>{val.inheritence}</td>
                <td>{val.control}</td>
                <td>{val.nested}</td>
                <td>{val.total}</td>
                <td>{val.multiply}</td>
              </tr>
            ))}
          <tr><td></td>
            <td></td>
            <td></td>
            <th scope="row">ICB Value</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <th scope="row">{finalData.value}</th></tr>
        </tbody>
      </table>
    
      <center>
        <button type="button" className="btn btn-danger">Back</button>
      </center>
    </div>
    
  )
}

export default HistoryDetails
