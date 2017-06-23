import React, { Component } from 'react';
import Tweed from './Tweed';
import Input from './Input';

class TweedBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMode: false,
    }
    this.makeNewMode = this.makeNewMode.bind(this);
    this.newTweedMounted = this.newTweedMounted.bind(this);
  }

  componentWillMount() {
    console.log(`box will mount newMOde = ${this.state.newMode}`)
  }

  componentDidMount() {
    console.log(`box did mount newMOde = ${this.state.newMode}`)
  }

  makeNewMode() {
    console.log(`enter makeNew Func ${this.state.newMode}`)
    this.setState({newMode: true});
    console.log(`leave makeNew Func ${this.state.newMode}`)
  }

  newTweedMounted() {
    console.log(`new Tweed MOunted ${this.state.newMode}`)
    this.setState({newMode: false});
  }

  render() {
    console.log(`enter Render tweedBox newMode = ${this.state.newMode}`)
    let addBox = <p className='logInToPost'>Log in to post!</p>;
    if (this.props.loggedIn) {
      addBox = 
        <Input
          newInputBox={this.props.newInputBox} 
          handleInput={this.props.handleInput}
          addTweed={this.props.addTweed}
          makeNewMode={this.makeNewMode} />
    }
    return (
      <div id='tweed-box'>
        <div id='add-form-div'>
          {addBox}
        </div>
        <ul>
          {this.props.tweeds.map((tweed, index) => 
            {
              if ((index === 0) && (this.state.newMode === true)) {
                return <Tweed 
                  tweed={tweed} 
                  index={index}
                  key={tweed.id}
                  twId={tweed.id}
                  user={this.props.user}
                  editTweed={this.props.editTweed}
                  deleteTweed={this.props.deleteTweed}
                  handleInput={this.props.handleInput}
                  editBox={this.props.editBox}
                  editTweed={this.props.editTweed}
                  makeNewMode={this.makeNewMode}
                  newMode={true}
                  newTweedMounted={this.newTweedMounted} />  
              } else {
                return <Tweed
                  tweed={tweed} 
                  index={index}
                  key={tweed.id}
                  twId={tweed.id}
                  user={this.props.user}
                  editTweed={this.props.editTweed}
                  deleteTweed={this.props.deleteTweed}
                  handleInput={this.props.handleInput}
                  editBox={this.props.editBox}
                  editTweed={this.props.editTweed}
                  makeNewMode={this.makeNewMode}
                  newMode={false}
                  newTweedMounted={this.newTweedMounted} /> 
              }
            } 
          )}
        </ul>
      </div>
    )
  }
}

export default TweedBox;