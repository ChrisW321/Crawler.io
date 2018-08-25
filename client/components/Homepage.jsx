import { Component } from 'react';
import CreateCrawl from './CreateCrawl.jsx';
import SavedCrawls from './SavedCrawls.jsx';
import PickForMe from './PickForMe.jsx';
import styles from './Homepage.css';

export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: <PickForMe />,
        }
    }

    render() {
        return (
            <div className="masterContainer">
                <div>
                    <span className="homepageTabs" onClick={() => this.setState({ view: <CreateCrawl /> })}>Create A PubCrawl </span>
                    <span className="homepageTabs">Suggested PubCrawls </span>
                    <span className="homepageTabs" onClick={() => this.setState({ view: <SavedCrawls /> })}>Your PubCrawls </span>
                    <span className="homepageTabs" onClick={() => this.setState({ view: <PickForMe /> })}>Pick For Me</span>
                </div>
                <div>
                    {this.state.view}
                </div>
            </div>
        )
    }
}
