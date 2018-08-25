import { Component } from 'react';
import styles from './PickForMe.css';

export default class PickForMe extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="PickForMeContainer">
                Pick for me
                <div>How lit we gettin?</div>
                <input type="number" max="5" min="0" />
                <div>How bougie we gettin?</div>
                <input type="number" max="5" min="0" />
                {/* <div>When we goin?</div>
                <input type="date" />
                <div>How late we goin?</div>
                <input type="time" /> */}
                <div>How long we goin?</div>
                <input type="number" max="5" min="0" placeholder="hours"/>
                <div>Bars? Clubs? Both???</div>
                <select>
                    <option>Bar</option>
                    <option>Club</option>
                    <option>Both!!!</option>
                </select>
                <div>
                    <button className="sendItButton">Fuckin' Send It!!!</button>
                </div>
            </div>
        )
    }
}