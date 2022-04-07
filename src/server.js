const express = require('express');

const morgan = require('morgan');

const movies = require('./routes/movies');
const music = require('./routes/music');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
