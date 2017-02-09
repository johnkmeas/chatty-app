import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    // .. code in the render function
    console.log("Rendering <MessageList/>");


    // const msgComps = this.props.messages.map(function(msg){
    //   return (<Message username={msg.username} content={msg.content}/>);
    // })

    const msgComps = this.props.messages.map(({ username: uName, content: cnt, key: key }) => {
      console.log('id=>', key);
      return (<Message username={ uName } content={ cnt } key={ key }/>);
    })

    return (
      <div className="messageList">
        {msgComps}
      </div>
    );
  }
}
export default MessageList;