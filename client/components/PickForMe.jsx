import { Component } from 'react';

export default class PickForMe extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
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
                <input type="number" placeholder="hours"/>
                <div>Bars? Clubs? Both???</div>
                <select>
                    <option>Bar</option>
                    <option>Club</option>
                    <option>Both!!!</option>
                </select>


            </div>
        )
    }
}