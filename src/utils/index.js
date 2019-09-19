/**
 * Returns Status Code Numbers based on the Error Construct from @ErrorTypes
 * @param error
 * @return {number}
 * @constructor
 */
const StatusCodeHandler = (error = undefined) => {
	switch (error) {
		case 'ENTRY_NOT_FOUND':
			return 404;
		case 'VALIDATION_ERROR':
			return 400;
		case 'ENTRY_EXISTS':
			return 400;
		case 'FATAL_ERROR':
			return 500;
		default:
			return 200;
	}
};

/**
 * Error Types.
 * @type {{
 * ENTRY_NOT_FOUND: string,
 * FATAL_ERROR: string,
 * AUTHORISATION_ERROR: string,
 * VALIDATION_ERROR: string,
 * ENTRY_DELETED: string,
 * ENTRY_EXISTS: string
 * }}
 */
const ErrorTypes = {
	VALIDATION_ERROR: 'VALIDATION_ERROR',
	FATAL_ERROR: 'FATAL_ERROR',
	ENTRY_EXISTS: 'ENTRY_EXISTS',
	ENTRY_DELETED: 'ENTRY_EXISTS',
	ENTRY_NOT_FOUND: 'ENTRY_NOT_FOUND',
	AUTHORISATION_ERROR: 'AUTHORISATION_ERROR',
	TOKEN_EXPIRED: 'TOKEN_EXPIRED',
	PERMISSION_ERROR: 'PERMISSION_ERROR',
	TOKEN_INVALID: 'TOKEN_INVALID'
};

class ErrorTrap {
	constructor(e) {
		this.message = e.message;
		this.success = false;
		this.error = ErrorTypes.FATAL_ERROR;
	}
}


const SanitizeParams = (__param__) => {
	let p = String(__param__);
	String(__param__)
	.replace(/\s/igm, '') // replace all white spaces with nothing
	.replace(/[']/igm, '"') // replace all ' with "
	.replace(/[{}]/igm, '') // replace all matching braces {} with nothing.
	.split(/[,:]/igm) // separate all texts that matches the separators ,;
	.filter(key => !key.includes('"')) // filter for those without the double strings.
	.forEach((key) => {
		if (!_.isFinite(Number(key))) {
			// replace them with the double strings if it's not a number or a string.
			p = p.replace(key, `"${key}"`);
		}
	});
	if (String(p)
	.trim() !== '') {
		return JSON.parse(p); // Parse it.
	}
	return null;
};
module.exports = {
	StatusCodeHandler,
	ErrorTypes,
	ErrorTrap,
	SanitizeParams
};
