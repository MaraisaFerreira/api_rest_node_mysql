const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).send({
		message: 'Get all movies...',
	});
});

router.get('/:id', (req, res) => {
	const id = req.params.id;

	res.status(200).send({
		message: `Get movie by id - ${id}`,
		id,
	});
});

router.post('/', (req, res) => {
	const movie = {
		title: req.body.title,
		year: req.body.year,
		category: req.body.category || '',
		rating: req.body.rating,
		url_banner: req.body.url_banner || '',
		price: req.body.price,
	};

	res.status(200).send({
		message: 'Post movies...',
		movie,
	});
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	res.status(200).send({
		message: `Delete movie by id - ${id}`,
		id,
	});
});

module.exports = router;
