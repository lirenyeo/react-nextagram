import React from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Modal } from 'reactstrap'

import LoginForm from './LogInForm'
import SignUpForm from './SignUpForm'

class AuthenticationModal extends React.Component {
  state = {
    modal: false,
    showLogIn: true
  }

  toggleForm = () => this.setState({ showLogIn: !this.state.showLogIn })

  closeModal = () => this.setState({modal: false})

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      email: '',
      password: ''
    })
  }

  logout = () => {
    localStorage.removeItem('jwt')
    this.forceUpdate()
  }

  render() {
    const { jwt } = localStorage
    return (
      <div>
        {jwt ? (
          <a href="#" className="nav-link" onClick={this.logout}>
            Log Out
          </a>
        ) : (
          <a href="#" className="nav-link" onClick={this.toggle}>
            Login
          </a>
        )}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          {this.state.showLogIn ? (
            <LoginForm closeModal={this.closeModal} toggleForm={this.toggleForm} />
          ) : (
            <SignUpForm closeModal={this.closeModal} toggleForm={this.toggleForm} />
          )}
        </Modal>
      </div>
    )
  }
}

export default withRouter(AuthenticationModal)
