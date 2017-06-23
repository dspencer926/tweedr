import React, { Component } from 'react';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }
// don't forget conditional rendering for log in/out
  componentDidMount() {
    this.setState({
      username: '',
      password: '',
      reset: false,
    })
  }

  userInput(e) {
    this.setState({username: e.target.value});
    console.log(this.state.username);
  }

  passwordInput(e) {
    this.setState({password: e.target.value});
    console.log(this.state.password);
  }

  render() {
    let authBox = null;
    if (this.props.status === 'signUp') {
      authBox = <Signup 
        authNotice={this.props.authNotice}
        signUpSubmit={this.props.signUpSubmit}
        xOut={this.props.xOut}/>;
    } else if (this.props.status === 'logIn') {
      authBox = <Login 
        authNotice={this.props.authNotice}
        logInSubmit={this.props.logInSubmit}
        xOut={this.props.xOut}/>;
    } else if (this.props.status === 'logOut') {
      authBox = <Logout />
    } 
    return authBox
  }
}

export default Auth;