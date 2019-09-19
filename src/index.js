const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


/**
 * Initialize Mongo Leon
 * @param app
 * @param DBName
 * @param URL
 * @return {app|Error}
 */
module.exports.init = ({ DBName, URL } = {}) => {
	const app = express();
	const router = express.Router();
	app.disable('x-powered-by');
	app.use('/static', express.static(path.normalize(path.join(__dirname, './static'))));
	if (!DBName || !URL) {
		app.use((req, res, next) => {
			const err = new Error('Please provide a DBName and a URL for MongoLeon in the init argument');
			err.status = 404;
			return next(err);
		});
	}

	// if (/mongodb:/igm.test(URL)) {
	// 	URL = URL.split('mongodb://')[1];
	// }

	const controller = module.require('./controllers');
	app.use(bodyParser.json()); // apply bodyParser.json() to all json request
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use('/mongo-leon', controller(router, {
		DBName,
		URL
	}));
	return app;
};
