const express = require('express');

const movies = require('./routes/movies');
const music = require('./routes/music');

const PORT = process.env.PORT || 3001;

const app = express();

app.use('/movies', movies);
app.use('/music', music);

app.get('/', (req, res) => {
	res.status(200).send({
		message: 'Hello World!',
	});
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
