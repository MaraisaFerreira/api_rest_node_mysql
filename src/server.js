const express = require('express');

const movies = require('./routes/movies');

const PORT = process.env.PORT || 3001;

const app = express();

app.use('/movies', movies);

app.get('/', (req, res) => {
	res.status(200).send({
		message: 'Hello World!',
	});
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
