import React from "react"
import { Route, Switch } from "react-router-dom"

import HomePage from './pages/HomePage'
import UserProfilePage from './pages/UserProfilePage'
import MyProfilePage from './pages/MyProfilePage'

const Router = props => (
  <>
    {props.children}
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/user/:id" component={props => <UserProfilePage {...props} />} />
      <Route exact path="/profile" component={props => <MyProfilePage {...props} />} />
    </Switch>
  </>
)

export default Router