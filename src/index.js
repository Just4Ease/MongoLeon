const express = require('express');
const path = require('path');
const Config = require('./config');


module.exports.init = (connection) => {
	const app = express();
	const config = new Config();
	const router = express.Router();
	app.disable('x-powered-by');
	app.use('/static', express.static(path.join(config.root, './static')));

	const controller = module.require('./controllers');
	app.use('/mongo-leon', controller(router, connection));
	return app;
};
