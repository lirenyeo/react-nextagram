import React from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import {
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
    errorMessage: '',
  }

  handleInput = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ isLoading: true })
    const { email, password } = this.state
    Axios({
      method: 'post',
      url: 'https://insta.nextacademy.com/api/v1/login',
      data: {
        email,
        password
      }
    })
      .then(resp => {
        localStorage.setItem('jwt', resp.data.auth_token)
        this.props.closeModal()
        this.setState({ isLoading: false })
      })
      .catch(err => {
        console.log(err)
        this.setState({ isLoading: false, errorMessage: err.message })
      })
  }

  render() {
    const { email, password, errorMessage, isLoading } = this.state
    return (
      <>
        <ModalHeader toggle={this.toggle}>Login</ModalHeader>
        <ModalBody>
        { errorMessage && <p className='text-danger'>{errorMessage}</p> }
          <Form id="login-form" onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={this.handleInput}
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={this.handleInput}
              />
            </FormGroup>
          </Form>
          <p style={{ fontSize: '0.9em' }}>
            New member?{' '}
            <a href="#" onClick={this.props.toggleForm}>
              Sign up here.
            </a>
          </p>
        </ModalBody>
        <ModalFooter>
          <input
            className="btn btn-primary"
            type="submit"
            form="login-form"
            value={isLoading ? 'Logging in...' : 'Log In'}
            disabled={isLoading}
          />
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </>
    )
  }
}

export default withRouter(LoginForm)
