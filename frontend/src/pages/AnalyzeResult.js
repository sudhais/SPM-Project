import React, { useEffect, useState } from 'react'
import './AnalyzeResult.css'
import CodeEditor from '@monaco-editor/react'
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

function AnalyzeResult() {
  const [code, setCode] = useState('')
  const [codeCount, setCodeCount] = useState(0)
  const [codeLine, setCodeLine] = useState(0)
  const [ifElseCount, setIfElseCount] = useState(0)
  const [userInput, setUserInput] = useState(0) // User input value
  const [selectedOption, setSelectedOption] = useState('codeCount')
  const [exceededMessage, setExceededMessage] = useState('')

  useEffect(() => {
    // Retrieve values from local storage
    const storedCode = localStorage.getItem('code')
    const storedCodeCount = parseInt(localStorage.getItem('codeCount'), 10) || 0 // the 10 is decimal here
    const storedCodeLine = parseInt(localStorage.getItem('codeLine'), 10) || 0
    const storedIfElseCount =
      parseInt(localStorage.getItem('ifElseCount'), 10) || 0
    const storedUserInput = parseInt(localStorage.getItem('userInput'), 10) || 0 // Parse as an integer
    const storedSelectedOption =
      localStorage.getItem('selectedOption') || 'codeCount' // Get selected option from local storage

    setCode(storedCode)
    setCodeCount(storedCodeCount)
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
    if (selectedOption === 'codeCount' && codeCount > userInput) {
      setExceededMessage('Code Count exceeds the specified value')
    } else if (selectedOption === 'codeLine' && codeLine > userInput) {
      setExceededMessage('Code Lines exceed the specified value')
    } else if (selectedOption === 'ifElseCount' && ifElseCount > userInput) {
      setExceededMessage('If-Else Count exceeds the specified value')
    } else {
      setExceededMessage('')
    }
  }, [codeCount, codeLine, ifElseCount, selectedOption, userInput])

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
    { name: 'Code Count', value: codeCount },
    { name: 'Code Line', value: codeLine },
    { name: 'If else count', value: ifElseCount },
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
    <div className='analyze-result-container'>
      <h2 className='analyze-result-heading'>Code Analysis Report</h2>
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
        <p className={isExceeded(codeCount) ? 'exceeded' : ''}>
          Code Count: {codeCount}
        </p>
        <p className={isExceeded(codeLine) ? 'exceeded' : ''}>
          Code Lines: {codeLine}
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
        <BarChart
          width={400}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey='name'
            scale='point'
            padding={{ left: 10, right: 10 }}
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
                  <Text style={pdfStyles.label}>Code Count: {codeCount}</Text>
                  <Text style={pdfStyles.label}>Code Lines: {codeLine}</Text>
                  <Text style={pdfStyles.label}>
                    If-Else Count: {ifElseCount}
                  </Text>

                  {/* Include the PieChart and BarChart SVGs */}
                  <View style={pdfStyles.chartContainer}>
                    {generatePieChartSVG(data)}
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
  )
}

export default AnalyzeResult
