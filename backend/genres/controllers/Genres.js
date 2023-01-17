const Genres = require('../models/Genres');
const { StatusCode } = require('../utilities/KeyMaster');
const exceptions = require('../utilities/Exceptions');
const { raw } = require('objection');


const createGenre = async function (body)  {
	try {
		const data = await Genres.query().insert(body);
		return {
			result: {
				status: StatusCode.CREATED,
				data: data,
			},
		};
	} catch (err) {
		return { error: exceptions.getError(err) };
	}
};

const listGenre = async function () {
	try {
		const data = await Genres.query().select('*');
		return {
			result: {
				status: StatusCode.SUCCESS,
				data: data,
			},
		};
	} catch (err) {
		return { error: exceptions.getError(err) };
	}
};

const getGenre = async function ({ id }) {
	try {
		const data = await Genres.query()
			.where({ id: id })
			.throwIfNotFound('Record not found');
		return {
			result: {
				status: StatusCode.SUCCESS,
				data: data,
			},
		};
	} catch (err) {
		return { error: exceptions.getError(err) };
	}
};

const index = async function ({ text }) {
	try {
		const query = text.toLowerCase();
		const data = await Genres.query()
			.where(raw('lower("name"::text)'), 'like', `%${query}%`)
			.orWhere(raw('lower("description"::text)'), 'like', `%${query}%`)
			.throwIfNotFound('No record found');

		return {
			result: {
				status: StatusCode.SUCCESS,
				data: data,
			},
		};
	} catch (err) {
		return { error: exceptions.getError(err) };
	}
};

const deleteGenre = async function ({ id }) {
	try {
		const data = await Genres.query()
			.delete()
			.where({ id: id })
			.throwIfNotFound('Record not found');
		return {
			result: {
				status: StatusCode.SUCCESS,
				data: data,
			},
		};
	} catch (err) {
		return { error: exceptions.getError(err) };
	}
};

module.exports = {createGenre,
	deleteGenre,
	listGenre,
	index,
	getGenre
	
};
