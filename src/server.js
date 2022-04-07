const express = require('express');

const morgan = require('morgan');

const movies = require('./routes/movies');
const music = require('./routes/music');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Header',
		'ContentType',
		'Origin',
		'X-Requested-Width',
		'Accept',
		'Authorization'
	);

	if (req.method === 'OPTIONS') {
		res
			.header(
				'Access-Control-Allow-Methods',
				'GET',
				'POST',
				'DELETE',
				'PATCH',
				'PUT'
			)
			.status(200)
			.send({
				message: 'Allow Methods',
			});
	}

	next();
});

app.use('/movies', movies);
app.use('/music', music);

app.use((req, res, next) => {
	const error = new Error('Not Found...');
	error.status = 404;

	next(error);
});

app.use((error, req, res) => {
	res.status(error.status || 500).send({
		error: {
			message: error.message,
		},
	});
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
