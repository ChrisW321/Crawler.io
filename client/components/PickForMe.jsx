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
            loader: <div className="loaderCentering"><Loader type={'spin'} color={'blue'} height={200} width={200}/></div>,
            view: <MainView sendIt={this.sendIt.bind(this)}/>,
        }
    }

    sendIt() {
        this.setState({ view: this.state.loader })
        axios.get('/user/pubcrawl/picked')
        .then(res => {
            console.log(res)
            this.setState({ crawls: res.data }, () => {
                setTimeout(() => this.setState({ view: <DisplayCrawls crawls={this.state.crawls}/> }), 2000)
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
        <div className="inputHeader">How much fun?</div>
        <input className="PickForMeInput" type="number" max="5" min="0" placeholder="0-5" required="true"/>
        <div className="inputHeader">How bougie we getting?</div>
        <input className="PickForMeInput" type="number" max="5" min="0" placeholder="0-5" required="true"/>
        <div className="inputHeader">How long we going?</div>
        <input className="PickForMeInput" type="number" max="5" min="0" placeholder="hours" required="true"/>
        <div className="inputHeader">Bars? Clubs? Both???</div>
        <select>
            <option>Bars</option>
            <option>Clubs</option>
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
                    <span className="textInlineWithImage">#{index + 1}&nbsp;&nbsp;</span>
                    {crawl.pubCrawl.map((business, index) => <Business info={business} index={index}/>)}
                </div>
            )
        })}
    </div>
)

const Business = ({ info, index }) => (
    <span>
        <div className="inlineBlock">
                <div className="textInlineWithImage">{index + 1}. {info.name}&nbsp;</div>
        </div>
        <div className="inlineBlock">
            <img className="businessImage" src={info.image_url} /> 
        </div>
        <div className="inlineBlock">
        </div>

    </span>
)