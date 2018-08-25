require('dotenv').config();
const express = require('express');
const yelp = require('yelp-fusion');
const model = require('./model.js');

const app = express();
const port = process.env.PORT || 4075;

app.use('/', express.static('./public'));

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET');
    next();
  });

  const apiKey = process.env.YELP_API_KEY
  const yelpClient = yelp.client(apiKey);

  const JSONgraphql = `{
    "query": "business(term: $business_name, location: $location) {
        name
        id
        rating
        url
    }",
    "variables": {
        "business_name": "garaje-san-francisco",
        "location": "san francisco, ca"
    }
}`

  app.get('/yelp/:searchQuery', (req, res) => {
    const searchRequest = {
        term: req.params.searchQuery,
        location: "san francisco, ca"
    };
    yelpClient.search(searchRequest).then(data => {
        res.send(data);
    }).catch(err => res.send(err))
  })

  app.post('/user/pubCrawl/:crawl', (req,res) => {
    console.log('crawls post called')
    const { crawl } = req.params;
    model.saveCrawl(crawl, (err, data) => {
        res.statusCode = err ? 400 : 200
        res.send(err || data)
    })
  })
  

app.listen(port);
console.log(`Listening on port http://127.0.0.1:${port}`)
