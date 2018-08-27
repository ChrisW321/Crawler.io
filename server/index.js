require('dotenv').config();
const express = require('express');
const yelp = require('yelp-fusion');
const model = require('./model.js');
const parser = require('body-parser')

const app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('crawl saved', (data) => {
        console.log('crawl saved called data=', data)
        io.emit('crawl saved', data)
    })
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
});

const port = process.env.PORT || 4075;

app.use('/', express.static('./public'));
app.use(parser.json());

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
}`;
const multiQuery = `{
    search(term:"burrito",
           location:"san francisco, ca",
                 limit: 1) {
      total
      business {
        name
        reviews {
          text
          rating
          time_created
          url
        }
      }
    }
    business(id: "garaje-san-francisco") {
          name
          id
          alias
          rating
          url
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

  app.get('/user/pubCrawl/:user', (req, res) => {
      const { user } = req.params
      console.log('get users pub crawls called');
      model.getCrawlsByUser(user, (err, data) => {
        res.statusCode = err ? 400 : 200
        res.send(err || data)
      })
  })

  app.post('/user/pubCrawl', (req,res) => {
        const crawl = req.body;
        console.log('crawls post called, crawl=', crawl)
        model.saveCrawl(crawl, (err, data) => {
        res.statusCode = err ? 400 : 200
        res.send(err || data)
    })
  })

  app.get('/allCrawls', (req, res) => {
      console.log('allcrawls called');
      model.getAllCrawls((err, data) => {
        res.statusCode = err ? 400 : 200
        res.send(err || data)
      })
  })


  http.listen(4075, () => console.log(`Listening on port http://127.0.0.1:${port}`))
