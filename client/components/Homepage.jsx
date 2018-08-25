import { Component } from 'react';
import axios from 'axios';


export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            businesses: [],
        }
    }

    componentDidMount() {
        axios.get(`/yelp`)
            .then(res => {
                console.log(res)
                this.setState({businesses: res.data.jsonBody.businesses})
            })
            .catch(err => console.error(err))
    }

    render() {
        return (
            <div>
                <span>Create A PubCrawl </span>
                <span>Suggested PubCrawl </span>
                <span>Your PubCrawls </span>
            </div>
        )
    }
}
