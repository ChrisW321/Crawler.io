import { Component } from 'react';
import CreateCrawl from './CreateCrawl.jsx';
import SavedCrawls from './SavedCrawls.jsx';
import PickForMe from './PickForMe.jsx';
import YourCrawls from './SuggestedCrawls.jsx';
import styles from './Homepage.css';
import Chatroom from './Chatroom.jsx';

export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: <PickForMe />,
            user: 'Chris',
            usernameInput: '',
        }
    }

    updateUser(user) {
        this.setState({ user }, () => console.log(this.state.user))
    }

    changeInput(e, type) {
        e.which === 13 && type === 'user' && this.setUser();
        this.setState({ usernameInput: e.target.value })
    }

    setUser() {
        this.setState({ 
            user: this.state.usernameInput,
            usernameInput: '',
        })
    }

    render() {
        return (
            <div className="masterContainer">
                <div className="twoHalvesInline">
                    <span 
                        className="homepageTabs" 
                        id="firstHomepageTab" 
                        onClick={() => this.setState({ view: <CreateCrawl updateUser={this.updateUser.bind(this)} user={this.state.user}/> })}
                        >Create A PubCrawl 
                    </span>
                    <span className="homepageTabs" onClick={() => this.setState({ view: <YourCrawls user={this.state.user}/> })}>Your Crawls</span>
                    <span className="homepageTabs" onClick={() => this.setState({ view: <SavedCrawls /> })}>Suggested PubCrawls </span>
                    <span className="homepageTabs" onClick={() => this.setState({ view: <PickForMe /> })}>Pick For Me</span>

                </div>
                    <Chatroom user={this.state.user}/>
                    <span className="setUsernameContainer">
                        <span> Current User: {this.state.user}</span>
                        <input className="twoHalvesInline" type="text" size="30" onKeyUp={(e) => this.changeInput(e, 'user')} placeholder="Set your username"/>
                    </span>
                <div>
                    {this.state.view}
                </div>
            </div>
        )
    }
}
