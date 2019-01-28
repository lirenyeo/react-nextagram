import React from "react"

import Navbar from './components/Navbar'
import Router from './router'

import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navbar />
      </Router>
    )
  }
}

export default App
