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
  const searchRequest = {
    term:'Temple',
    location: 'san francisco, ca'
  };
  
  const yelpClient = yelp.client(apiKey);

  app.get('/yelp', (req, res) => {
      console.log('get yelp request received')
      yelpClient.search(searchRequest).then(data => {
          res.send(data);
      }).catch(err => res.send(err))
  })
  
//   client.search(searchRequest).then(response => {
//     const firstResult = response.jsonBody.businesses[0];
//     const prettyJson = JSON.stringify(firstResult, null, 4);
//     console.log(prettyJson);
//   }).catch(e => {
//     console.log(e);
//   });
app.listen(port);
console.log(`Listening on port http://127.0.0.1:${port}`)
