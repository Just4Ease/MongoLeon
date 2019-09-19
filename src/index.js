const express = require('express');
const path = require('path');


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

	const controller = module.require('./controllers');
	app.use('/mongo-leon', controller(router, {
		DBName,
		URL
	}));
	return app;
};
