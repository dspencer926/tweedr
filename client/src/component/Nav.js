import React, { Component } from 'react';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidUpdate() {

  }
// don't forget conditional rendering for log in/out
  render() {
    let logInBox;
    let onClick;
    if (this.props.loggedIn === true) {
      logInBox = this.props.user;
      onClick = null;
    } else {
      logInBox = 'Log In'
      onClick = this.props.logIn;
    }
    return (
      <nav>
        <header>Welcome to Tweed<span id='red'>r</span>, the Tweediest forum on the Tweed<span id='red'>r</span>net</header>
        <div>
          <ul id='nav-list'>
            <li>Home</li>
            <li>About</li>
            <li onClick={this.props.signUp}>Sign Up</li>
            <li onClick={onClick}>{logInBox}</li>
            <li onClick={this.props.logOut}>Log Out</li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav;