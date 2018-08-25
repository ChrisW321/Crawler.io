import { Component } from 'react';
import axios from 'axios';

export default class SavedCrawls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crawls: []
        }
    }

    componentDidMount() {
        axios.get('/user/pubcrawl/chris')
        .then(res => {
            console.log(res)
            this.setState({ crawls: res.data })
        })
        .catch(err => console.log(err))
    }

    render() {
        const { crawls } = this.state;
        return (
            <div>
                {crawls.map((crawl, index) => crawl.pubCrawl.map(business => <Business info={business} index={index}/>))}
            </div>
        )
    }
}

const Business = ({ info, index }) => (
    <div>PubCrawl#{index + 1}
        <div>{info.name}</div>
        <div><img className="businessImage" src={info.image_url} /></div>
    </div>
)