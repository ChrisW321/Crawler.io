import { Component } from 'react';
import Homepage from './Homepage.jsx';
import styles from './Login.css';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
        }
    }

    handleSubmit() {
        this.setState({ loggedIn: true })
    }

    render() {
        if (!this.state.loggedIn) {
            return (
                <div id="loginContainer">
                    <form className="loginForm">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" />
                        <div id="lower">
                            <input type="checkbox" /><label className="check" htmlFor="checkbox">Keep me logged in</label>
                            <input type="submit" value="Login" onClick={() => this.handleSubmit()}/>
                        </div>
                    </form>
            </div>
            )
        } else {
            return <Homepage />
        }
    }
}
