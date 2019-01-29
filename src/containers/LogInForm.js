import React from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Button, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    hasError: false,
    isLoading: false,
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
      console.log('Successfully logged in!', res.data.auth_token)
      localStorage.setItem('jwt', res.data.auth_token)
      this.props.closeModal()
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
    const { email, password, hasError, isLoading } = this.state
    return (
      <>
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
          <p style={{fontSize: '0.9em'}}>New member? <a href="#" onClick={this.props.toggleForm}>Sign up here.</a></p>
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
    )
  }
}

export default withRouter(LoginForm)