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
        this.state.crawl.push({ name: info.name, image_url: info.image_url });
        this.setState({ crawl: this.state.crawl })
        console.log(this.state.crawl)
    }

    removeFromCrawl(info) {
        const { crawl } = this.state;
        console.log('remove called');
        const index = crawl.indexOf(info);
        index !== -1 && crawl.splice(index, 1);
        this.setState({ crawl })
    }

    savePubCrawl() {
        axios.post(`/user/pubCrawl/${this.state.crawl}`)
        alert('Saved')
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
                        {businesses.map(business => <Business info={business} addToCrawl={this.addToCrawl.bind(this)} canAdd={true}/>)}
                    </div>

                    <div className="twoHalvesInline" id="newCrawlList">
                        Your PubCrawl
                        <button onClick={() => this.savePubCrawl()}>Create it and Save</button>
                        {crawl.map(business => <Business info={business} removeFromCrawl={this.removeFromCrawl.bind(this)} canAdd={false}/>)}
                    </div>
                </div>
            </div>
        )
    }
}

const Business = ({ info, addToCrawl, removeFromCrawl, canAdd }) => (
    <div onClick={() => canAdd ? addToCrawl(info) : removeFromCrawl(info)}>
        <div>{info.name}</div>
        <div><img className="businessImage" src={info.image_url} /></div>
    </div>
)