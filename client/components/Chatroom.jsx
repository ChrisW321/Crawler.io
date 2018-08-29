import { Component } from 'react';
import styles from './Chatroom.css';

export default class Chatroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            msg: '',
        }
        this.socket = io();
    }

    componentDidMount() {
        this.socket.on('chat sent', (data) => {
            this.state.chats.unshift( data );
            this.setState({ chats: this.state.chats })
        });
    }

    updateMsg(e) {
        if (e.which === 13) {
            this.sendMsg();
            this.setState({ msg: ''})
        } else {
            this.setState({ msg: e.target.value })
        }
    }

    sendMsg() {
        this.socket.emit('chat sent', { username: this.props.user, msg: this.state.msg })
        this.setState({ msg: '' })
    }

    render() {
        return (
            <div className="chatroomContainer">
                <div className="chatroomHeader">
                    Chat Room 
                    <input type="text" onKeyUp={(e) => this.updateMsg(e)} placeholder="Send a msg"/>
                </div>
                {this.state.chats.map(chat => <Chat chat={chat}/> )}
            </div>
        )
    }
}

const Chat = ({ chat }) => (
    <div className="chatroomHeader" id="chat">
        @{chat.username}: {chat.msg}
    </div>
)