const path = require('path');
const { ErrorTypes, StatusCodeHandler } = require('../utils');
const DBA = require('../dba');

module.exports = (router, connection) => {
	router.post('/:operation', async (req, res) => {
		const { operation } = req.params;
		let response;
		switch (String(operation)
		.toUpperCase()) {
			case 'QUERY':
				response = await DBA.doQuery(connection, req.body);
				break;
			case 'AGGREGATION':
				response = await DBA.doAggregation(req.body);
				break;
			default:
				return res.status(400)
				.json({
					success: false,
					message: 'Sorry, you must provide a valid operation as query or aggregation',
					error: ErrorTypes.VALIDATION_ERROR
				});
		}


		const statusCode = StatusCodeHandler(response.error);

		return res.status(statusCode)
		.json(response);
	});
	router.get('/list', async (req, res) => {
		const response = await DBA.listCollections();

		const statusCode = StatusCodeHandler(response.error);

		return res.status(statusCode)
		.json(response);
	});
	router.get('/*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../views/index.html'));
	});

	return router;
};
