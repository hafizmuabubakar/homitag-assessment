const  genreController  = require('../Genres');
const dbConfig = require('../../database/DatabaseConfig');

const { StatusCode } = require('../../utilities/KeyMaster');

let genreId = 0;
const body = {
	genre: {
		id: genreId,
		name: 'Action',
		description: 'All action movies',
	},
};

beforeAll(async () => {
	dbConfig.initializeDB();
});

afterAll(async (done) => {
	dbConfig.destroyKnex();
	done();
});

describe('UNIT TEST: GENRE', () => {
	/* [GENRE] TEST CASES */
	describe('GENRE TEST CASES', () => {
		/* CREATE */
		it('Should CREATE new genre and output success status code', async () => {
			const { result } = await genreController.createGenre(body.genre);
			body.genre['id'] = result.data.id;
			expect(result).toMatchObject({ status: StatusCode.CREATED });
		});
		/* NOT CREATE */
		it('Should NOT CREATE genre and output bad requeset status code', async () => {
			const { error } = await genreController.createGenre({});
			expect(error).toMatchObject({ status: StatusCode.BAD_REQUEST });
		});

		/* LIST */
		it('Should LIST genres and output success status code', async () => {
			const { result } = await genreController.listGenre();
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});

		/* GET (ID) */
		it('Should GET BY ID genre and output success status code', async () => {
			const { result } = await genreController.getGenre({ id: body.genre.id });
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});

		/* INDEXING POSTIVE */
		it('Should Search genre and output success status code', async () => {
			const { result } = await genreController.index({ text: body.genre.name });
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});

		/* INDEXING NEGATIVE */
		it('Should NOT Search genre and output not found status code', async () => {
			const { error } = await genreController.index({
				text: 'odiashjdoisahdos',
			});
			expect(error).toMatchObject({ status: StatusCode.NOT_FOUND });
		});

		/* GET NOT (ID) */
		it('Should NOT GET BY ID genre and output not found status code', async () => {
			const { error } = await genreController.getGenre({ id: 3543875 });
			expect(error).toMatchObject({ status: StatusCode.NOT_FOUND });
		});

		/* DELETE */
		it('Should DELETE genre and output success status code', async () => {
			const { result } = await genreController.deleteGenre({ id: body.genre.id });
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});

		/* NOT DELETE */
		it('Should NOT DELETE genre and output not found status code', async () => {
			const { error } = await genreController.deleteGenre({ id: 3543875 });
			expect(error).toMatchObject({ status: StatusCode.NOT_FOUND });
		});
	});
});