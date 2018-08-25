import { Component } from 'react';
import CreateCrawl from './CreateCrawl.jsx';
import SavedCrawls from './SavedCrawls.jsx';

export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: <CreateCrawl />,
        }
    }

    render() {
        return (
            <div>
                <div>
                    <span onClick={() => this.setState({ view: <CreateCrawl /> })}>Create A PubCrawl </span>
                    <span>Suggested PubCrawls </span>
                    <span onClick={() => this.setState({ view: <SavedCrawls /> })}>Your PubCrawls </span>
                    <span>Choose For Me </span>
                </div>
                <div>
                    {this.state.view}
                </div>
            </div>
        )
    }
}
