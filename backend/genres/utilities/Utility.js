const Task = require('../database/models/Task');
const { TASK_STATUSES } = require('./Constants');
// const bcrypt = require('bcrypt');
/**
 *
 * @param {string} email Email to be validated
 * @returns {boolean} true if email is valid else false
 */
const isEmailValid = function (email) {
	const validationRegex = new RegExp(
		/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g,
	);

	return validationRegex.test(email);
};

/**
 *
 * @param {string} password Password to be validated
 */
const isPasswordValid = function (password) {
	const validationRegex =
		/(^(?=.*[~|`|!|@|#|$|%|^|&|*|(|)|_|=|+|-])[0-9a-zA-Z~`!@#$%^&*()_=+-]{10,})/g;
	return validationRegex.test(password);
};

const isUsernameValid = function (username) {
	const validationRegex = /(^[A-Za-z0-9_]{3,})+$/g;
	return validationRegex.test(username);
};

// /**
//  *
//  * @param {string} text plain text that has to be encrypted
//  * @param {number} saltRounds number of rounds for salt
//  * @returns {string} encrypted hash
//  */
// const getHash = async function (text, saltRounds) {
// 	return await bcrypt.hash(text, saltRounds);
// };

// /**
//  *
//  * @param {string} plain plain text that needs to be validated
//  * @param {string} hash encrypted hash that will validate plain text
//  * @returns {boolean} true if hash compare is success else false
//  */
// const isHashValid = async function (plain, hash) {
// 	return await bcrypt.compare(plain, hash);
// };

/**
 *
 * @param {string} text Text that you want to capitalize
 * @example toCapitalizedCase(text)
 * @returns {string} Capitalized Text
 */

const getStandardString = function (text) {
	return text.replace(/_|:|-/g, ' ').replace(/ +(?= )/g, '');
};

const replaceSpace = function (text) {
	return text.replace(/ /g, '_');
};

const getVaultKey = function (user, type,institution) {
	return `${user.tenant_id}_${user.client_id}/${replaceSpace(type)}/${replaceSpace(institution)}`;
	// return `${user.id}_${user.tenant_id}/${domain}`;
};
const getHostName = function (webUrl) {
	const url = new URL(webUrl);
	return url.hostname.split('.')[1];
};

const modifyTask = async (task) => {
	if (task.dependent_task_id) {
		const dependentTask = await Task.query().findById(task.dependent_task_id);
		const status = dependentTask.status;
		if (
			status === TASK_STATUSES.NEW ||
			status === TASK_STATUSES.IN_PROGRESS ||
			status === TASK_STATUSES.BLOCKED
		) {
			task.status = TASK_STATUSES.BLOCKED;
		}
		if (status === TASK_STATUSES.PAST_DUE) {
			task.status = TASK_STATUSES.PAST_DUE;
		}
		if (status === TASK_STATUSES.COMPLETED) {
			task.status = TASK_STATUSES.NEW;
		}
	} else {
		task.status = TASK_STATUSES.NEW;
	}
	return task;
};

const modifyOnUpdate = async (id, task) => {
	try {
		if (task.status === TASK_STATUSES.COMPLETED) {
			await Task.query()
				.where('dependent_task_id', id)
				.patch({ status: TASK_STATUSES.NEW });
		}
	} catch (err) {
		console.log(err);
	}
};

/**
 *
 * @param {Date} date
 * @param {number} numWeeks
 * @returns
 */
const getDateAfterWeeks = (date, numWeeks) => {
	date.setDate(date.getDate() + numWeeks * 7);
	return date;
};

module.exports = {
	isEmailValid,
	// getHash,
	// isHashValid,
	getStandardString,
	isPasswordValid,
	isUsernameValid,
	getVaultKey,
	getHostName,
	modifyTask,
	modifyOnUpdate,
	getDateAfterWeeks,
};
