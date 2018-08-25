import { Component } from 'react';
import axios from 'axios';


export default class CreateCrawl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            businesses: [],
            input: ''
        }
    }

    componentDidMount() {
        this.searchYelp('tempest')
    }

    searchYelp(input) {
        axios.get(`/yelp/${input}`)
        .then(res => {
            console.log(res)
            this.setState({businesses: res.data.jsonBody.businesses})
            console.log(this.state)
        })
        .catch(err => console.error(err))
    }

    changeInput(e) {
        console.log(e.which)
        if (e.which === 13) {
            this.handleSubmit()
        }
        this.setState({input: e.target.value})
        console.log(this.state.input)
    }

    handleSubmit() {
        this.searchYelp(this.state.input);
        this.setState({input: ''})
    }

    render() {
        const { businesses } = this.state
        return (
            <div>
                <div>
                    <input type="text" onKeyUp={(e) => this.changeInput(e)}/><button onClick={() => this.handleSubmit()}>Search</button>
                </div>
                {businesses.map(business => <Business info={business}/>)}
            </div>
        )
    }
}

const Business = ({ info }) => (
    <div>
        <div>{info.name}</div>
        <div><img src={info.image_url} /></div>
    </div>
)