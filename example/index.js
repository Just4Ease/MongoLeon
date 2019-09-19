const express = require('express');
const MongoLeon = require('../src');
const app = express();
// const MongoLeonConfig = {
// 	DBName: 'test',
// 	URL: 'localhost:27017'
// };

const MongoLeonConfig = {
	DBName: 'nfs-maps',
	URL: 'mongodb://127.0.0.1:27017/nfs-maps'
};
app.use(MongoLeon.init(MongoLeonConfig));

app.listen(8080);
