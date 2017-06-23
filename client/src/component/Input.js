 import React, { Component } from 'react';

 class Input extends Component {
   render() {
     return(
        <form id='add-form'>
          <input id='add-text' name='newTweed' type='text' placeholder='Add new Tweed!' value={this.props.newInputBox} onChange={this.props.handleInput}/>
          <input id='add-submit' type='submit' onClick={((e) => {
            this.props.addTweed(e);
            this.props.makeNewMode()})} />
        </form>
     )
   }
 }

 export default Input;