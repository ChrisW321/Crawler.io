import { Component } from 'react';
// import styles from './SuggestedCrawls.css';
import axios from 'axios';

export default class YourCrawls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crawls: []
        }
    }

    componentDidMount() {
        axios.get(`/user/pubCrawl/${this.props.user}`)
        .then(res => {
            console.log(res.data)
            this.setState({ crawls: res.data })
        })
        .catch(err => console.log(err))
    }

    render() {
        const { crawls } = this.state;
        return (
            <div className="SavedCrawlsContainer">
                {crawls.map((crawl, index) => {
                    return (
                        <div>
                            <span className="textInlineWithImage">#{index}&nbsp;&nbsp;</span>
                            {crawl.pubCrawl.map((business, index) => <Business info={business} index={index}/>)}
                        </div>
                    )
                })}
            </div>
        )
    }
}

const Business = ({ info, index }) => (
    <span>
        <div className="inlineBlock">
                <div className="textInlineWithImage">{index + 1} {info.name}&nbsp;</div>
        </div>
        <div className="inlineBlock">
            <img className="businessImage" src={info.image_url} /> 
        </div>
        <div className="inlineBlock">
        </div>

    </span>
)