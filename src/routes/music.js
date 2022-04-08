const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).send({
		message: 'Get all musics',
	});
});

router.get('/:id', (req, res) => {
	const id = req.params.id;

	res.status(200).send({
		message: `Get music by id - ${id}`,
		id,
	});
});

router.post('/', (req, res) => {
	const music = {
		title: req.body.title,
		category: req.body.category || '',
		artist: req.body.artist,
		price: req.body.price,
	};

	res.status(200).send({
		message: 'Post music',
		music,
	});
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	res.status(200).send({
		message: `Delete music by id - ${id}`,
		id,
	});
});

module.exports = router;
