import React from 'react'

import Navbar from './components/Navbar'
// import Router from './router'
import { Route, Switch } from 'react-router-dom'

import HomePage from './pages/HomePage'
import UserProfilePage from './pages/UserProfilePage'
import MyProfilePage from './pages/MyProfilePage'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

export const LangContext = React.createContext()

class App extends React.Component {
  state = {
    lang: 'english'
  }

  setLang = newLanguage => {
    this.setState({lang: newLanguage})
  }

  render() {
    return (
      <LangContext.Provider
        value={{ lang: this.state.lang, setLang: this.setLang }}
      >
        <Navbar />
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
      </LangContext.Provider>
    )
  }
}

export default App
