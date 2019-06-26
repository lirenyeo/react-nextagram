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
  Input,
} from 'reactstrap'

class SignUpForm extends React.Component {
  state = {
    email: '',
    username: '',
    password: '',
    isLoading: false,
    hasError: false,
  }

  handleInput = ({target}) => {
    this.setState({
      [target.name]: target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({isLoading: true})
    Axios.post('https://insta.nextacademy.com/api/v1/users/', {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
    })
    .then(res => {
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

  render() {
    const { email, password, username, hasError, isLoading } = this.state
    return (
      <>
        <ModalHeader toggle={this.toggle}>Sign Up</ModalHeader>
        <ModalBody>
        { hasError && <p className='text-danger'>Invalid credentials. Try again.</p> }

          <Form id="login-form" onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label>Username</Label>
              <Input type="text" name="username" value={username} onChange={this.handleInput} />
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
          <p style={{ fontSize: '0.9em' }}>
            Already a member?{' '}
            <a href="#" onClick={this.props.toggleForm}>
              Log in here.
            </a>
          </p>
        </ModalBody>
        <ModalFooter>
          <input
            className="btn btn-primary"
            type="submit"
            value="Sign Up"
            form="login-form"
          />
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </>
    )
  }
}

export default withRouter(SignUpForm)
