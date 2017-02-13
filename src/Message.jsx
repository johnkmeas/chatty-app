import React, {Component} from 'react';

class Message extends Component {
  render() {
    const userColor = {
      color: this.props.color
    };
    // .. code in the render function
    console.log("Rendering <Message/>");
    return (
      <div>
        <div className="message">
          <span className="message-username" style={userColor}> {this.props.username}</span>
          <span className="message-content"><p>{this.props.content}</p></span>
        </div>
        <div className="message system">
          {this.props.incomingMessage}
        </div>
      </div>
    );
  }
}

export default Message;

