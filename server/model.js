const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO, { useNewUrlParser: true } , (err, result) => {
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

const getAllCrawls = (cb) => {
    PubCrawl.find()
    .then(data => cb(null, data))
    .catch(err => console.error(err));
}


module.exports = {
    saveCrawl,
    getCrawlsByUser,
    getAllCrawls,
};
