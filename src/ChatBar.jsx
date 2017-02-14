/*jshint esversion: 6 */
import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentUser,
      content: ''
    };
  }

  enterMessage(e) {
    if (e.key === 'Enter') {
      this.props.addMessage(this.state.username, this.state.content);
    }
  }

  enterUsername(e) {
    if (e.key === 'Enter') {
      this.props.changeUser(this.state.username)
    }
  }

  updateUsername(e) {
    this.setState({username: e.target.value});
  }
  updateContent(e) {
    this.setState({content: e.target.value});
  }

  render() {
    // .. code in the render function
    console.log("Rendering <CharBar/>");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onChange={this.updateUsername.bind(this)}
        placeholder={this.props.currentUser} value={this.state.username} onKeyDown={this.enterUsername.bind(this)}/>

        <input className="chatbar-message" onChange={this.updateContent.bind(this)}
        value={this.state.content} placeholder="Type a message and hit ENTER" onKeyDown={this.enterMessage.bind(this)}/>
      </footer>
    );
  }
}

export default ChatBar;
