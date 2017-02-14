import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    // .. code in the render function
    console.log("Rendering <MessageList/>");

    const msgComps = this.props.messages.map(({ username, content, key, color, incomingMessage}) => {
      return (
        <Message username={ username } content={ content } key={ key } color={ color } incomingMessage={ incomingMessage }/>
      );
    })

    return (
      <div className="messageList">
        { msgComps }
      </div>
    );
  }
}

export default MessageList;
