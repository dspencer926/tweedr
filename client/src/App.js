import React, { Component } from 'react';
import './App.css';
import TweedBox from './component/TweedBox';
import Nav from './component/Nav';
import Auth from './component/Auth';
import Footer from './component/Footer';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tweeds: null,
      apiFetched: false,
      loggedIn: false,
      user: null,
      inputBox: '',
      editBox: null,
      signUpStyle: null,
      logInStyle: null,
      logOutStyle: null,
      status: null,
      authNotice: null,
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleEditInput = this.handleEditInput.bind(this);
    this.editTweed = this.editTweed.bind(this);
    this.addTweed = this.addTweed.bind(this);
    this.stateHandler = this.stateHandler.bind(this);
    this.deleteTweed = this.deleteTweed.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.signUpSubmit = this.signUpSubmit.bind(this);
    this.logInSubmit = this.logInSubmit.bind(this);
    this.xOut = this.xOut.bind(this);
    // this.signUp = this.signUp.bind(this);
  }

  componentDidMount() {
    let user = localStorage.getItem('username');
    console.log(user)
    if (user) {
      this.setState({
        loggedIn: true,
        user: user,
      })
    }
    fetch ('/api/tweeds')
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      console.log(json);
      let tweedList = json.data.tweeds;
      console.log(tweedList);
      tweedList.sort(function(a, b) {
        return parseInt(b.tweed_time) - parseInt(a.tweed_time);
      })
      this.setState({
        tweeds: tweedList,
        apiFetched: true,
      })
      console.log(this.state.tweeds);
    })
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  signUp() {
    console.log('signup');
    this.setState({
      status: 'signUp',
      authNotice: null,
    });
  }

  logIn() {
    console.log('login');
    this.setState({
      status: 'logIn',
      authNotice: null,
    });
  }

  logOut() {
    fetch('auth/logout')
    .then((res) => {
      return res.json();
    })
    .then((json) =>{
      console.log(json);
      if (json.message === 'ok') {
        this.setState({
          loggedIn: false,
          user: null,
        }, () => {localStorage.removeItem("username")})
      }
    })
  }

  signUpSubmit(e) {
    e.preventDefault();
    console.log('signingup')
    fetch('/auth/register', {
      method: 'POST',
      'credentials': 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      })
    })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      if (json.message === 'ok') {
        console.log(json);
        this.setState({
          loggedIn: true,
          user: json.user,
          status: null,
        }, () => {localStorage.setItem("username", json.user)}) 
      } else if (json.message === 'User already exists') {
        this.setState({authNotice: <p className='auth-notice'>Username taken</p>});
      } else {
        this.setState({authNotice: <p className='auth-notice'>An error occurred</p>});
      }
    })
  }

  xOut() {
    this.setState({status: null});
  }

  logInSubmit(e) {
    e.preventDefault();
    fetch('/auth/login', {
      method: 'POST',
      'credentials': 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      })
    })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json);
      if (json.message === 'ok') {
        this.setState({
          loggedIn: true,
          user: json.user,
          status: null,
        }, () => {localStorage.setItem("username", json.user)})
      } else if (json.message === 'noUser') {
        this.setState({authNotice: <p className='auth-notice'>User does not exist</p>})
      } else if (json.message === 'noPwd') {
        this.setState({authNotice: <p className='auth-notice'>Invalid password</p>})
      } else if (json.message.message === 'Missing credentials') {
        this.setState({authNotice: <p className='auth-notice'>Please enter a username and password</p>})
      } else {
        this.setState({authNotice: <p className='auth-notice'>An error occurred</p>})
      }
    })
  }

  addTweed(e) {
    e.preventDefault();
    if (this.state.inputBox !== '') {
      fetch('/api/tweeds/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          tweed: this.state.inputBox,
          user: this.state.user,
        })
      })
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        console.log(json);
        let newTweed = json.data.tweed
        newTweed.username = this.state.user;
        if (json.message === 'ok') {
          this.stateHandler('add', newTweed);
        } else {
          console.log('error');
        }
        this.setState({inputBox: ''});
      })
    }
  }

  handleInput(e) {
    this.setState({inputBox: e.target.value});
    console.log(this.state.inputBox);
  }

  handleEditInput(e) {
      this.setState({editBox: e.target.value})
  }

  editTweed(tweedMsg, tweedId, index, username) {
    // e.preventDefault();                                    // Got from stackoverflow... have NO IDEA what it means :)
    //let regex = /\d+\.?(\d+)?/;                             // I've gathered it's a regular expression, but I'll have to
    //let id = parseFloat((e.target.id).match(regex)[0]);     // look at the MDN to learn more about it.  Looks complicated
    fetch(`/api/tweeds/${tweedId}`, {                         // Oh... turns out I didn't need it anyway :P
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        tweed: tweedMsg,
      })
    })
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      console.log(json);
      if (json.message === 'ok') {
        this.stateHandler('edit', {
          tweed_text: json.data.tweed.tweed_text, 
          tweed_time: json.data.tweed.tweed_time, 
          edited: json.data.tweed.edited, 
          edited_time: json.data.tweed.edited_time,
          id: json.data.tweed.id,
          index: index,
          username: username,
        })
      }
    })
  }                                                         

  deleteTweed(e) {
    let regex = /\d+\.?(\d+)?/;
    let id = parseFloat((e.target.id).match(regex)[0]);
    console.log(id);
    fetch (`/api/tweeds/${id}`, {method: 'DELETE'})
    .then((res) => {
      return res.json()
    })
    .then((json) => {
      console.log(json);
      if (json.message === 'tweed deleted') {
        this.stateHandler('delete', id);
      } else {
        console.log('error');
      }
    })
  }

  stateHandler(action, tweedInfo) {         // tweedInfo will either be a new/edited tweed or the ID number of tweed to be deleted
    switch (action) {
      case 'add': 
        this.setState((prevState) => ({
          tweeds: prevState.tweeds.concat(tweedInfo).sort(function(a, b) {
            return parseInt(b.tweed_time) - parseInt(a.tweed_time)})
          }));
        break;
      case 'edit': 
        let newMsg = tweedInfo.tweed_text;
        let index = tweedInfo.index;
        let newArr = this.state.tweeds;
        newArr[index] = {
          id: tweedInfo.id, 
          tweed_text: tweedInfo.tweed_text, 
          tweed_time: tweedInfo.tweed_time, 
          edited: tweedInfo.edited, 
          edited_time: tweedInfo.edited_time,
          username: tweedInfo.username};
        this.setState((prevState) => {
          tweeds: newArr
        });
        break;
      case 'delete': 
        this.setState((prevState) => ({
          tweeds: prevState.tweeds.filter((val) => {return parseInt(val.id) !== parseInt(tweedInfo)})
        }));
    }
  }



  render() {
    if (this.state.apiFetched === true) {
      return (
        <div className="App">
          <Nav 
            loggedIn={this.state.loggedIn}
            user={this.state.user}
            signUp={this.signUp}
            logIn={this.logIn}
            logOut={this.logOut}/>
          <div id='mid-section'>
            <div id='tweed-box-container'>
              <div id='auth-dox-div'>
                <Auth 
                  authNotice={this.state.authNotice}
                  xOut={this.xOut}
                  status={this.state.status}
                  signUpSubmit={this.signUpSubmit}
                  logInSubmit={this.logInSubmit}/>
                {/*<div id='login-box' className={this.state.logInStyle}></div>
                <div id='signup-box' className={this.state.signUpStyle}></div>
                <div id='logout-box' className={this.state.logOutStyle}></div>*/}
              </div>
              <TweedBox 
              loggedIn={this.state.loggedIn}
              tweeds={this.state.tweeds} 
              user={this.state.user}
              deleteTweed={this.deleteTweed} 
              addTweed={this.addTweed}
              newInputBox={this.state.inputBox}
              handleInput={this.handleInput}
              editBox={this.state.editBox}
              editTweed={this.editTweed}/>
            </div>
          </div>
          <Footer />
        </div>
    )} else {
      return (
        <div>
          <Nav />
          <p>Loading</p>
        </div>
      )
    }
  }
}

export default App;
