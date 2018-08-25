import { Component } from 'react';
import axios from 'axios';
import styles from './CreateCrawl.css';

export default class CreateCrawl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            businesses: [],
            input: '',
            crawl: [],
        }
    }

    componentDidMount() {
        this.searchYelp('tempest')
    }

    searchYelp(input) {
        axios.get(`/yelp/${input}`)
        .then(res => {
            console.log(res.data)
            this.setState({businesses: res.data.jsonBody.businesses})
            console.log(this.state)
        })
        .catch(err => console.error(err))
    }

    changeInput(e) {
        e.which === 13 && this.handleSubmit()
        this.setState({ input: e.target.value })
    }

    handleSubmit() {
        this.searchYelp(this.state.input);
        this.setState({ input: '' })
    }

    addToCrawl(info) {
        console.log('addtocrawl called')
        this.state.crawl.push(info);
        this.setState({ crawl: this.state.crawl })
        console.log(this.state.crawl)
    }

    removeFromCrawl() {
        console.log('remove called')
    }

    render() {
        const { businesses, crawl } = this.state
        return (
            <div>
                <div>
                    <input type="text" onKeyUp={(e) => this.changeInput(e)}/><button onClick={() => this.handleSubmit()}>Search</button>
                </div>
                <div>
                    <div className="twoHalvesInline">
                        {businesses.map(business => <Business info={business} addToCrawl={this.addToCrawl.bind(this)} />)}
                    </div>
                    <div className="twoHalvesInline" id="newCrawlList">
                        {crawl.map(business => <Business info={business} removeFromCrawl={this.removeFromCrawl.bind(this)} />)}
                    </div>
                </div>
            </div>
        )
    }
}

const Business = ({ info, addToCrawl }) => (
    <div onClick={() => addToCrawl(info)}>
        <div>{info.name}</div>
        <div><img className="businessImage" src={info.image_url} /></div>
    </div>
)