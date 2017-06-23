import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  componentDidMount() {
    this.setState({
      username: '',
      password: '',
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
    return (
      <div id='auth-div' className='on-top'>
        <div className='x-out' onClick={this.props.xOut}>x</div>
        <div className='auth-msg'>Log In!</div>
        <form onSubmit={this.props.logInSubmit}>
          <input name='username' type='text' onChange={(e) => {this.userInput(e)}}/>
          <input name='password' type='password' onChange={(e) => {this.passwordInput(e)}}/>
          <input type='submit' className='submit-btn'/>
        </form>
        {this.props.authNotice}
      </div>
    ) 
  }
}

export default Login;