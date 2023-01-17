// const dbConfig = require('../../database/DatabaseConfig');
// const azureController = require('../Movies');


// dbConfig.initializeDB();

// var user_id = 111;
// var tenant_id = 111;
// const at = 'Dum Accesss Tokens';
// const rt = 'Dum Refreshs Tokens';
// const epx = 6766676;

// var origin = 'localhost:3000';
// var data = null;

// describe('Movies Authentication', () => {
// 	afterAll(async (done) => {
// 		// KafkaProducer.disconnect(); // when Kafka kicks in
// 		dbConfig.destroyKnex();
// 		done();
// 	});

// 	it('Should successfully give out a redirect URL for Azure authentication consent screen', async () => {
// 		const redirect_url = await azureController.getRedirectUrl(
// 			user_id,
// 			tenant_id,
// 			origin,
// 		);
// 		expect(typeof redirect_url).toEqual('object');
// 	});

// 	it('Should successfully save Azure tokens and user details in the database', async () => {
// 		const { result, error } = await AuthDataManager.save_azure_tokens(
// 			tenant_id,
// 			user_id,
// 			at,
// 			rt,
// 			epx,
// 		);
// 		console.log(error);
// 		data = result.data.id; // id to remove in a certain text
// 		expect(result.status).toEqual(201);
// 	});

// 	it('Should successfully check Azure connection', async () => {
// 		const { result, error } = await azureController.getConnection(
// 			tenant_id,
// 			user_id,
// 		);
// 		console.log(error);
// 		authDataId = result.data.id;
// 		expect(result).toMatchObject({ status: 200 });
// 	});

// 	it('Should successfully delete the saved token record specified by id', async () => {
// 		const { result, error } = await AuthDataManager.delete_azure_tokens(data);
// 		console.log(error);
// 		expect(result.data).toEqual(1);
// 	});
// });


const  movieController  = require('../Movies');
const dbConfig = require('../../database/DatabaseConfig');

const { StatusCode } = require('../../utilities/KeyMaster');

let genreId = ['Fantasy'];
const body = {
	movie: {
		name: 'RAW',
		description:
			'No Description',
		release_date: '2016-09-16',
		genres: genreId,
		duration: 2.14,
		ratings: 7.3,
		created_at: '2022-10-08T20:07:10.977Z',
		updated_at: '2022-10-08T20:07:10.977Z',
	},
};

beforeAll(async () => {
	await dbConfig.initializeDB();
});

afterAll(async (done) => {
	dbConfig.destroyKnex();
	done();
});

describe('UNIT TEST: MOVIE', () => {
	/* [MOVIE] TEST CASES */
	describe('MOVIE TEST CASES', () => {
		/* CREATE */
		it('Should CREATE new movie and output success status code', async () => {
			const { result } = await movieController.create(body.movie);
			body.movie['id'] = result.data.id;
			expect(result).toMatchObject({ status: StatusCode.CREATED });
		});
		/* NOT CREATE */
		it('Should NOT CREATE movie and output bad requeset status code', async () => {
			const { error } = await movieController.create({});
			expect(error).toMatchObject({ status: StatusCode.BAD_REQUEST });
		});

		/* LIST */
		it('Should LIST movie and output success status code', async () => {
			const { result, error} = await movieController.listMovies();
			console.log('Checking Error', error);
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});

		/* GET (ID) */
		it('Should GET BY ID movie and output success status code', async () => {
			const { result } = await movieController.getMovie({ id: body.movie.id });
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});

		/* GET NOT (ID) */
		it('Should NOT GET BY ID movie and output not found status code', async () => {
			const { error } = await movieController.getMovie({ id: 3543875 });
			expect(error).toMatchObject({ status: StatusCode.NOT_FOUND });
		});

		/* INDEXING POSTIVE */
		it('Should Search genre and output success status code', async () => {
			const { result } = await movieController.index({ text: body.movie.name });
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});

		/* INDEXING NEGATIVE */
		it('Should NOT Search genre and output not found status code', async () => {
			const { error } = await movieController.index({
				text: 'odiashjdoisahdos',
			});
			expect(error).toMatchObject({ status: StatusCode.NOT_FOUND });
		});

		/* DELETE */
		it('Should DELETE movie and output success status code', async () => {
			const { result } = await movieController.deleteMovie({ id: body.movie.id });
			expect(result).toMatchObject({ status: StatusCode.SUCCESS });
		});

		/* NOT DELETE */
		it('Should NOT DELETE movie and output not found status code', async () => {
			const { error } = await movieController.deleteMovie({ id: 3543875 });
			expect(error).toMatchObject({ status: StatusCode.NOT_FOUND });
		});
	});
});
