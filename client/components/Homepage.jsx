import { Component } from 'react';
import CreateCrawl from './CreateCrawl.jsx';


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
                    <span>Create A PubCrawl </span>
                    <span>Suggested PubCrawls </span>
                    <span>Your PubCrawls </span>
                </div>
                <div>
                    PubCrawl
                </div>
                <div>
                    {this.state.view}
                </div>
            </div>
        )
    }
}
