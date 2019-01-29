import React from 'react'

import Navbar from './components/Navbar'
// import Router from './router'
import { Route, Switch } from 'react-router-dom'

import HomePage from './pages/HomePage'
import UserProfilePage from './pages/UserProfilePage'
import MyProfilePage from './pages/MyProfilePage'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

class App extends React.Component {
  state = {
    showNotice: false
  }

  toggleNotice = () => this.setState({showNotice: true})

  render() {
    return (
      <>
        <Navbar toggleNotice={this.toggleNotice} />
        {this.state.showNotice && (
          <h1 className="text-success">YOU HAVE LOGGED IN</h1>
        )}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/user/:id"
            component={props => <UserProfilePage {...props} />}
          />
          <Route
            exact
            path="/profile"
            component={props => <MyProfilePage {...props} />}
          />
        </Switch>
      </>
    )
  }
}

export default App
