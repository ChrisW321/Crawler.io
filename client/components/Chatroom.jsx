import { Component } from 'react';
import styles from './Chatroom.css';

export default class Chatroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [{
                username: 'Hanjoon',
                msg: 'This crawl is lit Brah!!!'
            }],
        }
    }

    render() {
        return (
            <div className="chatroomContainer">
                <div className="chatroomHeader">Chat Room</div>
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