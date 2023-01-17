const express = require('express');
const { crossOriginResource } = require('./utilities/Middleware');
const databaseConfig = require('./database/DatabaseConfig');
const cors = require('cors');

const app = express();
databaseConfig.initializeDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(crossOriginResource);
app.use(cors());


//importing Movie Controller
const { create, listMovies, index, getMovie, deleteMovie } = require('./controllers/Movies');

app.get('/', (req, res) => {
	res.status(200).json({
		code: 200,
		message: 'Application is running fine',
	});
});


//EndPoints For Movie Service:
app.post('/v1/movies/', async (req, res) => {
	const data = await create(req.body);
	res.send(data);
});

app.get('/v1/movies/', async (req, res) => {
	const data = await listMovies();
	res.send(data);
});

app.get('/v1/movies/:id', async (req, res) => {
	const data = await getMovie(req.params);
	res.send(data);
});

app.get('/v1/movies/search/:text', async (req, res) => {
	const data = await index(req.params);
	res.send(data);
});

app.delete('/v1/movies/:id', async (req, res) => {
	const data = await deleteMovie(req.params);
	res.send(data);
});






var server = require('http').createServer(app);
const PORT = process.env.PORT || 4001;
server.listen(PORT, async () => {
	console.log('App started at port', PORT);
	// console.log('DATABASE_URL => ' + process.env.DATABASE_URL);
});
