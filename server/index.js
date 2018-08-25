require('dotenv').config();
const express = require('express');



const app = express();
const port = process.env.PORT || 4075;

app.use('/', express.static('./public'));


app.listen(port);
console.log(`Listening on port http://127.0.0.1:${port}`)
