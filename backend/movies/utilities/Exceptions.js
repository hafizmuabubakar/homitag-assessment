/* eslint-disable no-mixed-spaces-and-tabs */
const {
	ValidationError,
	NotFoundError,
	// DBError,
	// ConstraintViolationError,
	UniqueViolationError,
	NotNullViolationError
	// ForeignKeyViolationError,
	// CheckViolationError,
	// DataError
} = require('objection');
const { StatusCode } = require('./KeyMaster');
// const { getStandardString } = require('./Utility');

/**
 * @summary Handles Objection exceptions
 * @param {object} err Objection js error object
 * @example getError(err : ValidationError)
 * @returns JavaScript object which includes message, error type, data
 */
const getError = function (err) {
	if (err instanceof UniqueViolationError) {
		return {
			status: StatusCode.CONFLICT,
			message:
				err.columns.length > 0
					? `${err.columns[0]
						.replace(/_|:|-/g, ' ')
						.replace(/ +(?= )/g, '')} already exists`
					: 'Unknown Error'
			// message: err.columns.length > 0 ? getStandardString(`${err.columns[0]} already exists`) : 'Unknown Error',
		};
	}

	if (err instanceof NotFoundError) {
		return {
			status: StatusCode.NOT_FOUND,
			message: err.message
		};
	}

	if (err instanceof NotNullViolationError) {
		return {
			status: StatusCode.BAD_REQUEST,
			message: `${err.column.replace(/_|:|-/g, ' ')} cannot be null`
			// message: err.columns.length > 0 ? (`${err.columns[0]
			// 	.replace(/_|:|-/g, ' ')
			// 	.replace(/ +(?= )/g, '')} cannot be null`
			// ) : ('Unknown Error')
		};
	}

	if (err instanceof ValidationError) {
		return {
			status: StatusCode.BAD_REQUEST,
			message: err.message.replace(/:|-/g, ' ').replace(/ +(?= )/g, '')
		};
	}

	return {
		status: StatusCode.NOT_FOUND,
		message: err.message
	};
};

module.exports = { getError };
