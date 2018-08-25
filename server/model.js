// const { Pool } = require('pg');

// const config = {
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
// }

// const pool = new Pool(config)
// pool.connect((err, result) => {
//     if (err) console.error(err);
// })


// const getSearchResults = function (searchTerm, cb) {
//     const query = "SELECT * FROM searchlisting WHERE listingId = ANY (VALUES (" + searchTerm + "));";
//     pool.query(query, (err, result) => {
//       if (err) {
//         console.log(err)
//       } else {
//         cb(null, result.rows)
//       }
//     });
// };

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO, (err, result) => {
    if (err) console.error(err);
})

const pubCrawlSchema = new mongoose.Schema({
    user: String,
    pubCrawl: Array
})
const PubCrawl = mongoose.model('pubCrawl', pubCrawlSchema)

const saveCrawl = (crawl, cb) => {
    console.log(crawl, 'crawl')
    const newPubCrawl = new PubCrawl({
        user: crawl.user,
        pubCrawl: crawl.data,
    })
    newPubCrawl.save();
}

const getCrawlsByUser = (user, cb) => {
    console.log(user)
    PubCrawl.find({ user })
    .then(data => cb(null, data))
    .catch(err => cb(err));
}


module.exports = {
    saveCrawl,
    getCrawlsByUser,
};
