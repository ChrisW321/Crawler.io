import { Component } from 'react';
import CreateCrawl from './CreateCrawl.jsx';
import SavedCrawls from './SavedCrawls.jsx';
import PickForMe from './PickForMe.jsx';
import YourCrawls from './SuggestedCrawls.jsx';
import styles from './Homepage.css';

export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: <PickForMe />,
            user: 'chris'
        }
    }

    updateUser(user) {
        this.setState({ user }, () => console.log(this.state.user))
    }

    render() {
        return (
            <div className="masterContainer">
                <div>
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
                <div>
                    {this.state.view}
                </div>
            </div>
        )
    }
}
