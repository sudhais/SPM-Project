import parser, {JavaLexer2} from "./inheritanceLevel.js";
import JavaLexer from "./codeTokens.js";
import {isClassDeclaration, isMethodDeclaration, isBranchStatement, isIterativeStatement, isSwitchStatement} from './tokenIdentifier.js';


export default function analyzeJavaCode(javaCode) {
    // Remove comments from the code
    const codeWithoutComments = javaCode.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, '');
    
    let nestingLevel = 0;
    let currentNesting = 0;
    let classStart = 0;
    let inherite = 0;
    
    let classes = null;
    let method = null;
    // let icb = 0;
    let caseCount = countCase(codeWithoutComments);
    fineInheritanceLevel(javaCode);
    let recursionValue = 0;
    let recursion = false;
    
    var report = {
      code : [],
      icb : 0
    }
    // Split the code into lines
    const lines = codeWithoutComments.split('\n');
    
    for (const line of lines) {
      const stateReport = {
        line: '',
        metric: {
          sizeFactor: 0,
          typeOfControlStructure: 0,
          nestedLevelOfControlStructure: 0,
          inheritanceLevelOfStatement: 0,
          totalWeight: 0,
          wc: 0,
          className: null,
          methodName: null
        }
      }  

      if (line.includes('{')) {
        classStart++;
      }
      if (line.includes('}')) {
        classStart--;
      }

      const tokenArray = JavaLexer.tokenize(line);

      stateReport.line = line;

      if(isBranchStatement(line)){
        stateReport.metric.typeOfControlStructure = 1;
        if (line.includes('&&') || line.includes('||')) {
          stateReport.metric.typeOfControlStructure++;
        }
      }
      if(isIterativeStatement(line)){
        stateReport.metric.typeOfControlStructure = 2;
        if (line.includes('&&') || line.includes('||')) {
          stateReport.metric.typeOfControlStructure++;
        }
      }
      if(isSwitchStatement(line)){
        stateReport.metric.typeOfControlStructure = caseCount;
      }

      stateReport.metric.sizeFactor = tokenArray.tokens.length;
      if(isClassDeclaration(line)){
        stateReport.metric.sizeFactor = 0;
        let className = getClassIdentifier(line);
        // console.log(className);
        classes = className;
        currentNesting = 0;
        if(classStart > 0){
          inherite = parser.determineInheritanceLevel(className);
        }else{
          inherite = 0;
        }
        
      }
      if(isMethodDeclaration(line)){
        currentNesting = 0;
        stateReport.metric.sizeFactor = 2;

        let methodName = getMethodIdentifier(line);
        // console.log(methodName);
        method = methodName;
        recursionValue = 0;
        recursion = false;
        
      }

      if(!isClassDeclaration(line) && !isMethodDeclaration(line)){
        // Detect opening curly braces
        if (line.includes('{')) {
          currentNesting++;
          if (currentNesting > nestingLevel) {
            nestingLevel = currentNesting;
          }
        }
      } 

      stateReport.metric.nestedLevelOfControlStructure = currentNesting < 1 ? 0: currentNesting;

      stateReport.metric.inheritanceLevelOfStatement = inherite;

      stateReport.metric.totalWeight = stateReport.metric.inheritanceLevelOfStatement + stateReport.metric.nestedLevelOfControlStructure + stateReport.metric.typeOfControlStructure;

      stateReport.metric.wc = stateReport.metric.totalWeight * stateReport.metric.sizeFactor;

      report.icb += stateReport.metric.wc;

      stateReport.metric.className = classes;
      stateReport.metric.methodName = method;

      // console.log(stateReport.line, "S:", stateReport.metric.sizeFactor, ", Wc:", stateReport.metric.typeOfControlStructure, ", Wn:", stateReport.metric.nestedLevelOfControlStructure, ", Wi:", stateReport.metric.inheritanceLevelOfStatement, ", Wt: ", stateReport.metric.totalWeight, ", WC: ", stateReport.metric.wc, ", icb: ", report.icb, ", class: ", stateReport.metric.className, ", method: ", stateReport.metric.methodName);

      if(!isClassDeclaration(line) && !isMethodDeclaration(line)){
        recursionValue += stateReport.metric.wc;
        if(line.includes(stateReport.metric.methodName)){
          recursion = true;
        }
        // Detect closing curly braces
        if (line.includes('}')) {
          currentNesting--;
        }
      }
      report.code.push(stateReport);
      
      if(recursion == true && currentNesting <= 0){
          report.icb += recursionValue;
          recursion = false;
          // console.log(recursionValue);
          // console.log(report.icb);
      }

    }
  
    return report;
  }

  function countCase(code){
    const lines = code.split('\n');
    var count = 0;
    for (const line of lines) {
      let l = line.trim();
      if(l.startsWith('case')){
        count++;
      }
    }
    return count;
  }

  function fineInheritanceLevel(code){
    const lines = code.split('\n');
    for (const line of lines) {
      const {tokens} = JavaLexer2.tokenize(line);
      parser.input = tokens;
      parser.classDeclaration(line);
    }
    
  }

  function getClassIdentifier(javaCode){
    let line = javaCode.trim();
    let arr = line.split(' ');
    let i = 0;
    for(const a of arr){
        if(a == 'class') break;
        i++;
    }
    i++
    return getOnlyCharacters(arr[i]);
}

function getMethodIdentifier(javaCode){
  let line = javaCode.trim();
  let arr = line.split(' ');
  let i = 0;
  for(const a of arr){
      if(a == 'void' || a == 'int' || a == 'float' || a == 'double' || a == 'char' || a == 'String') break;
      i++;
  }
  i++
  if(arr[i].includes('(')){
    let idx = arr[i].indexOf('(');
    arr[i] = arr[i].substring(0, idx)
  }
  
  return getOnlyCharacters(arr[i]);
}

function getOnlyCharacters(inputString) {
  // Use a regular expression to match only letters (uppercase and lowercase)
  const lettersOnly = inputString.match(/[A-Za-z]+/g);

  // Check if lettersOnly is an array and join the matches into a single string
  if (Array.isArray(lettersOnly)) {
      return lettersOnly.join('');
  }

  // If there are no matches, return an empty string
  return '';
}