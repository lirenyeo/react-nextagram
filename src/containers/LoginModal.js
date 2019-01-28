import React from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

class LoginModal extends React.Component {
  state = {
    modal: false,
    email: '',
    password: '',
    hasError: false,
    isLoading: false,
    showLogIn: true,
  }

  toggleForm = () => this.setState({showLogIn: !this.state.showLogIn})

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      email: '',
      password: '',
    })
  }

  handleInput = ({target}) => {
    this.setState({
      [target.name]: target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({isLoading: true})
    Axios.post('https://insta.nextacademy.com/api/v1/login', {
      email: this.state.email,
      password: this.state.password,
    })
    .then(res => {
      console.log(res.data.auth_token)
      localStorage.setItem('jwt', res.data.auth_token)
      this.setState({
        modal: false,
        hasError: false,
        email: '',
        password: '',
        isLoading: false,
      })
    })
    .catch(err => {
      console.log(err)
      this.setState({
        hasError: true,
        isLoading: false,
      })
    })
  }

  logout = () => {
    localStorage.removeItem('jwt')
    this.forceUpdate()
  }

  render() {
    const { email, password, modal, hasError, isLoading } = this.state
    const { jwt } = localStorage
    return (
      <div>
        {
          jwt
            ? <a className='nav-link' onClick={this.logout}>Log Out</a>
            : <a className='nav-link' onClick={this.toggle}>Login</a>
        }
        <Modal isOpen={modal} toggle={this.toggle} className={this.props.className}>
          {
            this.state.showLogIn
              ? <>
                  <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                  <ModalBody>

                    { hasError && <p className='text-danger'>Invalid credentials. Try again.</p> }

                    <Form id='login-form' onSubmit={this.handleSubmit}>
                      <FormGroup>
                        <Label>Email</Label>
                        <Input type="email" name="email" value={email} onChange={this.handleInput} />
                      </FormGroup>
                      <FormGroup>
                        <Label>Password</Label>
                        <Input type="password" name="password" value={password} onChange={this.handleInput} />
                      </FormGroup>
                    </Form>
                    <p style={{fontSize: '0.9em'}}>New member? <a href="#" onClick={this.toggleForm}>Sign up here.</a></p>
                  </ModalBody>
                  <ModalFooter>
                    <input
                      className='btn btn-primary'
                      type="submit"
                      value={isLoading ? 'Logging In...' : 'Log In'}
                      form='login-form'
                      disabled={isLoading}
                    />
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                </>

              : <>
                  <ModalHeader toggle={this.toggle}>Sign Up</ModalHeader>
                    <ModalBody>
                      <Form id='login-form' onSubmit={this.handleSubmit}>
                        <FormGroup>
                          <Label>Username</Label>
                          <Input type="text" name="username" />
                        </FormGroup>
                        <FormGroup>
                          <Label>Email</Label>
                          <Input type="email" name="email" value={email} onChange={this.handleInput} />
                        </FormGroup>
                        <FormGroup>
                          <Label>Password</Label>
                          <Input type="password" name="password" value={password} onChange={this.handleInput} />
                        </FormGroup>
                      </Form>
                      <p style={{fontSize: '0.9em'}}>Already a member? <a href="#" onClick={this.toggleForm}>Log in here.</a></p>
                    </ModalBody>
                    <ModalFooter>
                      <input
                        className='btn btn-primary'
                        type="submit"
                        value="Sign Up"
                        form='login-form'
                        disabled={isLoading}
                      />
                      <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </>
          }
        </Modal>
      </div>
    )
  }
}

export default withRouter(LoginModal)