import React, { Component } from 'react';
import ReactTransitionGroup from 'react-transition-group';
const moment = require('moment');


class Tweed extends Component {
  constructor(props){
    super(props);
    this.state = {
      newMode: this.props.newMode,
      formState: false,
      editVal: null,
      id: this.props.id,
    }
    this.editTweed = this.editTweed.bind(this);
    this.handleEditInput = this.handleEditInput.bind(this);
    this.afterForm = this.afterForm.bind(this);
  }

  componentDidMount() {
    this.props.newTweedMounted();
    this.setState({newMode: false});
  }

  afterForm() {
    this.props.editTweed(this.state.editVal, this.props.tweed.id, this.props.index, this.props.tweed.username);
    this.setState({formState: false});
  }

  editTweed() {
    this.setState({
      formState: true,
      editVal: this.props.tweed.tweed_text,
    });
  }

  handleEditInput(e) {
    this.setState({editVal: e.target.value})
    console.log(e.target.value);
}

  render() {
    // this.setState({newMode: false});
    const twDate = new Date(parseInt(this.props.tweed.tweed_time));
    const twEditDate = new Date(parseInt(this.props.tweed.edited_time))
    let edited_time = null;
    let newMode = 'tweed-old';
    let btnBox = null;
    if (this.state.newMode === true) {
      newMode = 'tweed-new';
    }
    if (this.props.tweed.edited === true) {
      edited_time = <p>This post has been edited.  Last Edit: {moment(twEditDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
    }
    if (this.props.tweed.username === this.props.user) {
      btnBox =  
        <div className='button-box'>
          <div className='x-box' onClick={this.props.deleteTweed} id={`del${this.props.tweed.id}`}>X</div>
          <div onClick={this.editTweed}>Edit</div>
        </div>
    }
    if (this.state.formState === true) {
      return (
        <div id={`tweed${this.state.id}`} ref='tweed' className={newMode}>
          <div className='text-div'>
            <form id={`edit${this.state.id}`} onSubmit={(e) => {
              e.preventDefault();
              this.afterForm();
            }}>
              <input className='editInput' type='text-area' name='editedTweed' value={this.state.editVal} onChange={this.handleEditInput}/>
              <input className='editSubmit' type='submit' />
            </form>
          </div>
          <div className='button-box'>
            <div className='x-box' onClick={() => {
              this.props.deleteTweed}}
              id={`del${this.props.tweed.id}`}>X</div>
            <div onClick={this.editTweed}>Edit</div>
          </div>
          <div className='date-div'>
            <p>Created: {moment(twDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
            {edited_time}
          </div>
        </div>
      )
    } else {
      return (
        <div id={`tweed${this.props.tweed.id}`} ref='tweed' className={newMode}>
          {btnBox}
          <div className='text-div'>
            <p>{this.props.tweed.tweed_text}</p>
            <p>- {this.props.tweed.username}</p>
          </div>
          <br/>
          <div className='date-div'>
            <p>Created: {moment(twDate).format('MMMM Do YYYY, h:mm:ss a')}</p>
            {edited_time}
          </div>
        </div>
      )
    }
  }
}

export default Tweed;