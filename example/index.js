const express = require('express');
const MongoLeon = require('../src');
const app = express();

app.use(MongoLeon.init());

app.listen(8080);
