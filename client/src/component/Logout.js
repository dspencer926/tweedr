import React, { Component } from 'react';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div id='auth-div' className='on-top'>

      </div>
    ) 
  }
}

export default Logout;