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
      ],
      incomingMessage: 'w'
    };
    this.socket = null;
  }
  componentWillMount(){

  }

  addNewMessage(username, messageContent) {
      const newMessage = {
        type: 'postMessage',
        username: username,
        content: messageContent,
        key: Date.now()
      };
    this.socket.send(JSON.stringify(newMessage));
  }

  changeUsername(username){
     const currentName = this.state.currentUser.name;
    if (currentName != username){

      const sendChangeName = {
        "type": "postNotification",
        "content": "UserA has changed their name to UserB." + username }

      var newUsername = JSON.stringify(sendChangeName);
      this.socket.send(newUsername);
    }

    // var newUsername = JSON.stringify(username);
    // this.socket.send(newUsername);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    // console.log(this.socket);
    // this.socket.ws();
    const ws = new WebSocket("ws://localhost:4000");
    this.socket = ws;
    this.socket.onopen = function (event) {
      console.log("Connected to server!", event);

      // this.setState({
      //   countLogin: broadcastMessage.countLogin
      // });

      // console.log(this.socket.send('Sending to server'));
      // this.socket.send('Well this sent to server');
    };
    this.socket.onmessage = (event) => {
      const broadcastMessage = JSON.parse(event.data);
      console.log("usercount: ", broadcastMessage.countLogin);
      const newMessage = {
        username: broadcastMessage.username,
        content: broadcastMessage.content, //TODO remove unwanted in message content
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
        messages: newMessageList,
        countLogin: broadcastMessage.countLogin
      });


      switch(broadcastMessage.type) {
        case "incomingMessage":
          // this.setState({
          //   incomingMessage: { incomingMessage }
          // });
          // handle incoming message
          console.log("incomingMessage", broadcastMessage);
          break;
        case "incomingNotification":
          // handle incoming notification
          console.log("Name changed", broadcastMessage);
          this.setState({
            //
            incomingMessage: "A User change their name to :"
          });
          // this.state.incomingMessage = broadcastMessage.content);
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + broadcastMessage.type);
      }
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
        <nav className="navbar">

          <h1>Chatty</h1>
          <h5>{this.state.countLogin} Users Online</h5>
        </nav>
        <MessageList incomingMessage={this.state.incomingMessage} messages={this.state.messages}></MessageList>
        <ChatBar changeUser={this.changeUsername.bind(this)} addMessage={this.addNewMessage.bind(this)} currentUser={this.state.currentUser.name}></ChatBar>
      </div>
    );
  }
}

export default App;
