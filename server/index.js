require('dotenv').config();
const express = require('express');


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
  const yelp = require('yelp-fusion');

  const apiKey = process.env.YELP_API_KEY
  
  const yelpClient = yelp.client(apiKey);

  app.get('/yelp/:searchQuery', (req, res) => {
    const searchRequest = {
        term: req.params.searchQuery,
        location: 'san francisco, ca',
    }
        yelpClient.search(searchRequest).then(data => {
            res.send(data);
        }).catch(err => res.send(err))
  })
  

app.listen(port);
console.log(`Listening on port http://127.0.0.1:${port}`)
