const { ErrorTypes, SanitizeParams } = require('../utils');

const _ = require('lodash');
const { MongoClient } = require('mongodb');


/**
 *  Commander That Does The Main Operation on the database.
 * @param db
 * @param payload
 * @return {Promise<any>}
 */
const commander = (db, payload) => new Promise((resolve, reject) => {
	const {
		filters,
		projection,
		sort,
		limit,
		skip,
		collectionName,
	} = payload;
	if (String(sort)
	.trim() !== '') {
		return db.collection(collectionName)
		.find(SanitizeParams(filters) || {}, SanitizeParams(projection) || {})
		.limit(Number(limit || 50))
		.skip(skip || 0)
		.sort(SanitizeParams(sort))
		.toArray((_err_, data) => (_err_ ? reject(_err_) : resolve(data)));
	}
	return db.collection(collectionName)
	.find(SanitizeParams(filters), SanitizeParams(projection))
	.limit(Number(limit || 50))
	.skip(skip || 0)
	.toArray((_err_, data) => (_err_ ? reject(_err_) : resolve(data)));
});

/**
 * Run aggregation commands.
 * @param db
 * @param payload
 * @return {Promise<any>}
 */
const aggregate = (db, payload) => new Promise((resolve, reject) => {
	const {
		pipeline,
		collectionName,
	} = payload;
	return db.collection(collectionName)
	.aggregate(SanitizeParams(pipeline))
	.toArray((_err_, data) => (_err_ ? reject(_err_) : resolve(data)));
});


module.exports = {
	async doAggregation(connection, payload) {
		try {
			const { DBName, URL } = connection;
			const client = await MongoClient.connect(URL);
			const db = client.db(DBName);
			const result = await (aggregate(db, payload));
			await client.close();
			return {
				success: true,
				data: result
			};
		} catch (e) {
			return {
				success: false,
				message: e.message,
				error: ErrorTypes.FATAL_ERROR
			};
		}
	},
	async doQuery(connection, payload) {
		try {
			const { DBName, URL } = connection;
			const client = await MongoClient.connect(URL);
			const db = client.db(DBName);
			const result = await (commander(db, payload));
			await client.close();
			return {
				success: true,
				data: result
			};
		} catch (e) {
			return {
				success: false,
				message: e.message,
				error: ErrorTypes.FATAL_ERROR
			};
		}
	},
	async listCollections(connection) {
		try {
			const { DBName, URL } = connection;
			const client = await MongoClient.connect(URL);
			const db = client.db(DBName);
			const result = await db.listCollections()
			.toArray();
			await client.close();
			return {
				success: true,
				data: result
			};
		} catch (e) {
			return {
				success: false,
				message: e.message,
				error: ErrorTypes.FATAL_ERROR
			};
		}
	}
};
