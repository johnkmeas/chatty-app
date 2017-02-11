import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    // .. code in the render function
    console.log("Rendering <MessageList/>");

    const msgComps = this.props.messages.map(({ username: uName, content: cnt, key: key, color: color }) => {
      return (
        <Message username={ uName } content={ cnt } key={ key } color={ color } />
        );
    })
    console.log(this.props.messages)
    // const colorUsername = {
    //   color: this.props.color
    // };
    console.log("this.props.messages", this.props.messages)
    const incoming = this.props.incomingMessage;

    console.log('this.props.incomingMessage',this.props.incomingMessage)

    return (
      <div className="messageList">
        {msgComps}
        <div className="message system">
          {incoming}
        </div>
      </div>
    );
  }
}

export default MessageList;