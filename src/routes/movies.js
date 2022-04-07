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
	res.status(200).send({
		message: 'Post movies...',
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
