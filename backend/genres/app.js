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
const  genreController  = require('./controllers/Genres');

app.get('/', (req, res) => {
	res.status(200).json({
		code: 200,
		message: 'Application is running fine',
	});
});

	


//EndPoints For Genres Service:
app.post('/v1/genres/', async (req, res) => {
	const data = await genreController.createGenre(req.body);
	res.send(data);
});

app.get('/v1/genres/', async (req, res) => {
	const data = await genreController.listGenre();

	res.send(data);
});

app.get('/v1/genres/:id', async (req, res) => {
	const data = await genreController.getGenre(req.params);
	res.send(data);
});

app.get('/v1/genres/search/:text', async (req, res) => {
	const data= await genreController.index(req.params);
	res.send(data);
});

app.delete('/v1/genres/:id', async (req, res) => {
	const data = await genreController.deleteGenre(req.params);
	res.send(data);
});






var server = require('http').createServer(app);
const PORT = process.env.PORT || 4002;
server.listen(PORT, async () => {
	console.log('App started at port', PORT);
	// console.log('DATABASE_URL => ' + process.env.DATABASE_URL);
});
