import { Component } from 'react';
import axios from 'axios';
import styles from './PickForMe.css';
import { isObject } from 'util';

export default class PickForMe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crawls: []
        }
    }

    sendIt() {
        axios.get('/user/pubcrawl/picked')
        .then(res => {
            console.log(res)
            this.setState({ crawls: res.data })
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="PickForMeContainer">
                <div className="inputHeader">How lit we gettin?</div>
                <input className="PickForMeInput" type="number" max="5" min="0" placeholder="0-5"/>
                <div className="inputHeader">How bougie we gettin?</div>
                <input className="PickForMeInput" type="number" max="5" min="0" placeholder="0-5"/>
                {/* <div>When we goin?</div>
                <input type="date" />
                <div>How late we goin?</div>
                <input type="time" /> */}
                <div className="inputHeader">How long we goin?</div>
                <input className="PickForMeInput" type="number" max="5" min="0" placeholder="hours"/>
                <div className="inputHeader">Bars? Clubs? Both???</div>
                <select>
                    <option>Bar</option>
                    <option>Club</option>
                    <option>Both!!!</option>
                </select>
                <div>
                    <button className="sendItButton" onClick={() => this.sendIt()}>Send It!!!</button>
                </div>
            </div>
        )
    }
}