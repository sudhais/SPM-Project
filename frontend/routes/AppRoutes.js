// backend/AppRoutes.js
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from '../App' // Import your main App component
import AnalysisResults from '../../frontend/src/AnalysisResults' // Import the AnalysisResults component

function AppRoutes() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/analysis-results' component={AnalysisResults} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  )
}

export default AppRoutes
