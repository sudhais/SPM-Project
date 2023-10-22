import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
import axios from "axios";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer'
import { Button } from 'antd'

function AnalyzeResult() {
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
  const [result, setResult] = useState('');
  const componentRef = useRef()
  // const [graphData, setGraphData] = useState('');
  const [finalData, setFinalData] = useState('');


  useEffect(() => {

    
    
    // Retrieve values from local storage
    const storedCode = localStorage.getItem('code')
    const storedCodeCount = parseInt(localStorage.getItem('codeCount'), 10) || 0 // the 10 is decimal here
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
    
    const storedResult = localStorage.getItem('result');
    var codes = JSON.parse(storedResult);
    const storeduserID = localStorage.getItem('userID') // Get selected option from local storage


    setCode(storedCode)
    setCodeCount(storedCodeCount)
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
    // setResult(storedResult) // Set selected option from local storage
    console.log(storedUserInput);
    var graph = {
      userInput:userInput,
      singleLine: singleLineComments,
      multiLine: multiLineComments,
      codeLine: codeLine,
      classes: classes,
      methods: methods,
      whileLoops: whileLoops,
      forLoops: forLoops,
      ifElseCount: ifElseCount
    }

    var reports =[];

    var line = 1;
    codes.code.map((val)=>{
      var lineName = val.line.split("\r")[0]
      reports = [...reports,{
        class:val.metric.className,
        method:val.metric.methodName,
        lineNo:line,
        statement:lineName,
        size:val.metric.sizeFactor,
        nested:val.metric.nestedLevelOfControlStructure,
        inheritence:val.metric.inheritanceLevelOfStatement,
        control:val.metric.typeOfControlStructure,
        total:val.metric.totalWeight,
        multiply:val.metric.wc
      }]
      line += 1
    })
    // setReportsData(reports)
    var details = {
      userID:storeduserID,
      reports:reports,
      value:codes.icb,
      graphData:graph
    }
    setResult(details)
    console.log(details);

  },[
    codeCount,
    codeLine,
    ifElseCount,
    singleLineComments,
    multiLineComments,
    selectedOption,
    userInput,
    classes,
    forLoops,
    whileLoops,
    methods,
  ])

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
  }, [
    codeCount,
    codeLine,
    ifElseCount,
    singleLineComments,
    multiLineComments,
    selectedOption,
    userInput,
    classes,
    forLoops,
    whileLoops,
    methods,
  ])
  // console.log(result);

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


  async function  handleSave() {
    // Display a prompt and store the project name
    const userInput1 = prompt("Please enter your project name:");

    // Check if the user entered something and display it
    if (userInput1 !== null) {

      const res = await axios.get("http://localhost:8000/api/details?keyword=" + result.userID + "&keyword1=" + userInput1)
      // console.log(res.data.count);
      if(res.data.count === 0){
        const date = new Date();
        const formattedDate = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(date);
        
        var finalDataResult = {
          userID: result.userID,
          projName: userInput1,
          reports: result.reports,
          value: result.value,
          graphData: result.graphData,
          date: formattedDate
        }
        setFinalData(finalDataResult);
        // console.log(finalData);
        axios.post("http://localhost:8000/api/details/new", finalDataResult)
        .then((res)=>{
            alert(`${userInput1} successfully saved`)
        })
      }else{
        alert(`Project name ${userInput1} already exist`)
      }    
    } else {
      alert("You canceled the prompt.");
    }
  }

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
        <CodeEditor
          language='java'
          value={code}
          height='300px'
          width='913px'
          options={{ readOnly: true }}
        />
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
          {result.reports &&
            result.reports.map((val, index) => (
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
            <th scope="row">{result.value}</th></tr>
        </tbody>
      </table>
    
      <center>
        <button type="button" className="btn btn-primary" onClick={()=> handleSave()} >Save</button>
        <Link to={"/home"}><button type="button" className="btn btn-danger">Cancel</button></Link>
      </center>
    </div>
    
  )
}

export default AnalyzeResult
