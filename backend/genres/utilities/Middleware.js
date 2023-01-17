const { StatusCode } = require('./KeyMaster');

/** @type {import("express").RequestHandler} */
exports.crossOriginResource = function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE',
	);

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', '*');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	if (req.method === 'OPTIONS') {
		res.sendStatus(StatusCode.SUCCESS);
	} else {
		next();
	}
};

/**
 * @type {import("express").RequestHandler}
 * @param {Object} req
 * @param {Object} req.response
 * @param {Object} req.response.error
 * @param {Object} req.response.error.status
 * @param {Object} req.response.error.message
 * @param {Object} req.response.result
 * @param {Object} req.response.result.status
 * @param {Object} req.response.result.data
 * @param {Object} req.response.result.event_name
 * @param {Object} req.response.result.sensitive_data
 *
 */
exports.sendResponse = function (req, res) {
	if (!req.response) {
		res.sendStatus(403);
	}

	const { result, error } = req.response;

	if (error) {
		res.status(error.status).json({ message: error.message });
	} else if (result) {
		if (result.event_name) {
			console.log(result.event_name);
		}

		if (result.event) {
			console.log(result.event);
			//Send data on kafka with this event
		}

		res.status(result.status).json(result.data);
	} else {
		res.sendStatus(500);
	}
};
