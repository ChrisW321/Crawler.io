import { Component } from 'react';
import axios from 'axios';

export default class SavedCrawls extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        axios.get('/user/pubcrawl')
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}