const Movie = require('../models/Movies');
const { StatusCode } = require('../utilities/KeyMaster');
const exceptions = require('../utilities/Exceptions');
const { raw } = require('objection');


const create =  async function (body) {
	try {
		const data = await Movie.query().insert(body);
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

const listMovies =  async function()  {
	try {
		const data = await Movie.query().select('*');
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

const index = async function ({ text })  {
	try {
		const query = text.toLowerCase();
		const data = await Movie.query()
			.where(raw('lower("name"::text)'), 'like', `%${query}%`)
			.orWhere(raw('lower("description"::text)'), 'like', `%${query}%`)
			.orWhere(raw('lower("genres"::text)'), 'like', `%${query}%`)
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

const getMovie = async function ({ id })  {
	try {
		const data = await Movie.query()
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

const deleteMovie =  async function({ id })  {
	try {
		const data = await Movie.query()
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

module.exports = { create,
	listMovies,
	index,
	deleteMovie,
	getMovie};
