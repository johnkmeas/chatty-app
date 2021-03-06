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
      incomingMessage: ''
    };
    this.socket = null;
  }

  addNewMessage(username, messageContent) {
      const newMessage = {
        type: 'postMessage',
        username: username,
        content: messageContent,
        color: this.state.currentUser.color,
        key: Date.now()
      };
    this.socket.send(JSON.stringify(newMessage));
  }

  changeUsername(username){
  //TODO modify so that content shows old user name an the new user name
    if (username){
      const sendChangeName = {
        "type": "postNotification",
        "content": "A user's name has changed to " + username,
        "username": username
      };

      var newUsername = JSON.stringify(sendChangeName);
      this.socket.send(newUsername);
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    const ws = new WebSocket("ws://localhost:4000");
    this.socket = ws;

    this.socket.onopen = function (event) {
      console.log("Connected to server!");
    };

    this.socket.onmessage = (event) => {
      const broadcastMessage = JSON.parse(event.data);

      if(broadcastMessage.type === 'counter'){
        console.log('On open counter', broadcastMessage.countLogin);
        this.setState({
          countLogin: broadcastMessage.countLogin
        });
      }

      if(broadcastMessage.type === "incomingMessage"){
        console.log("incomingMessage", broadcastMessage);

        const newMessage = {
          username: broadcastMessage.username,
          content: broadcastMessage.content, //TODO remove unwanted in message content
          id: broadcastMessage.id,
          color: broadcastMessage.color,
          key: Date.now()
        };

        const newMessageList = this.state.messages.concat(newMessage);

        this.setState({
          messages: newMessageList
        });
      }

      if(broadcastMessage.type === 'incomingNotification'){
        console.log("Name changed", broadcastMessage);

        const incomingNotice = {
          incomingMessage: broadcastMessage.content,
          key: Date.now()
        };
        const incomingNotification = this.state.messages.concat(incomingNotice);
        this.setState({
          messages: incomingNotification
        });
      }

      if(broadcastMessage.type === "change_color"){
        console.log("colorchanged", broadcastMessage.color);

        this.setState({
          currentUser: {color: broadcastMessage.color}
        });
        console.log("currentUser color", this.state.currentUser.color);
      }
    };

  }

  render() {
    console.log("Rendering <App/>");

    return (
      <div>
        <nav className="navbar">
          <h1>Chatty</h1>
          <h5>{this.state.countLogin} Users Online</h5>
        </nav>
        <div><img src={'https://static1.squarespace.com/static/53ceb8c9e4b065e3be15b341/t/556796c2e4b0ac562a5da37d/1432852162641/KIC-Landscape.png'} alt="boohoo" className="background-img"/></div>
        <MessageList color={this.state.currentUser.color }  messages={this.state.messages}></MessageList>
        <ChatBar changeUser={this.changeUsername.bind(this)} addMessage={this.addNewMessage.bind(this)} currentUser={this.state.currentUser.name}></ChatBar>
      </div>
    );
  }
}

export default App;
