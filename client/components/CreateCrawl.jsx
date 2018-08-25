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
        axios.get(`/yelp`)
            .then(res => {
                console.log(res)
                this.setState({businesses: res.data.jsonBody.businesses})
                console.log(this.state)
            })
            .catch(err => console.error(err))
    }

    changeInput(key) {
        this.setState({input: key})
        console.log(this.state.input)
    }

    render() {
        const { businesses } = this.state
        return (
            <div>
                <div>
                    <input type="text" onKeyUp={(e) => this.changeInput(e.target.value)}/><button>Search</button>
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