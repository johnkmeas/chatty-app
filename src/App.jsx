import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          key: 123
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          key: 456
        }
      ]
    };
    this.socket = null;
  }

  addNewMessage(username, messageContent) {
      const newMessage = {
        username: username,
        content: messageContent,
        key: Date.now()
      };
    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    // console.log(this.socket);
    // this.socket.ws();
    const ws = new WebSocket("ws://localhost:4000");
    this.socket = ws;
    this.socket.onopen = function (event) {
      console.log("Connected to server!");
      // console.log(this.socket.send('Sending to server'));
      // this.socket.send('Well this sent to server');
    };
    this.socket.onmessage = (event) => {
      console.log('onmessage =>', event.data);
      const broadcastMessage = JSON.parse(event.data);
      console.log('broadcastMessage', broadcastMessage);
      console.log('broadcast parts', broadcastMessage.username);

      const newMessage = {
        username: broadcastMessage.username,
        content: broadcastMessage.content,
        id: broadcastMessage.id,
        key: Date.now()
      };
      const userNameChange = {
        currentUser: broadcastMessage.username
      };

      // const newUserName = this.state.currentUser.concat(userNameChange);

      const newMessageList = this.state.messages.concat(newMessage);
      this.setState({
        currentUser: {name: broadcastMessage.username},
        messages: newMessageList
      });

    };

  }

// render() {
//   // more code here..
//   componentDidMount()
// }


  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <nav>
          <h1>Chatty</h1>
        </nav>
        <MessageList messages={this.state.messages}></MessageList>
        <ChatBar addMessage={this.addNewMessage.bind(this)} currentUser={this.state.currentUser.name}></ChatBar>
      </div>
    );
  }
}

export default App;
