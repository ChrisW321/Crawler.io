import { Component } from 'react';
import axios from 'axios';
import styles from './PickForMe.css';
import Loader from './Loader.jsx';

export default class PickForMe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crawls: [],
            loading: false,
            loader: <Loader type={'spin'} color={'blue'} height={300} width={300}/>,
            view: <MainView sendIt={this.sendIt.bind(this)}/>,
        }
    }

    sendIt() {
        this.setState({ view: this.state.loader })
        axios.get('/user/pubcrawl/picked')
        .then(res => {
            console.log(res)
            this.setState({ crawls: res.data }, () => {
                setTimeout(() => this.setState({ view: <DisplayCrawls crawls={this.state.crawls}/> }), 1000)
            })
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="PickForMeContainer">
                {this.state.view}
            </div>
        )
    }
};

const MainView = ({ sendIt }) => (
    <div className="PickForMeContainer">
        <div className="inputHeader">How lit we gettin?</div>
        <input className="PickForMeInput" type="number" max="5" min="0" placeholder="0-5"/>
        <div className="inputHeader">How bougie we gettin?</div>
        <input className="PickForMeInput" type="number" max="5" min="0" placeholder="0-5"/>
        <div className="inputHeader">How long we goin?</div>
        <input className="PickForMeInput" type="number" max="5" min="0" placeholder="hours"/>
        <div className="inputHeader">Bars? Clubs? Both???</div>
        <select>
            <option>Bar</option>
            <option>Club</option>
            <option>Both!!!</option>
        </select>
        <div>
            <button className="sendItButton" onClick={() => sendIt()}>Send It!!!</button>
        </div>
    </div>
)

const DisplayCrawls = ({ crawls }) => ( 
    <div className="SavedCrawlsContainer">
        {crawls.reverse().map((crawl, index) => {
            return (
                <div>
                    <span className="textInlineWithImage">#{index}&nbsp;&nbsp;</span>
                    {crawl.pubCrawl.map((business, index) => <Business info={business} index={index}/>)}
                </div>
            )
        })}
    </div>
)

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