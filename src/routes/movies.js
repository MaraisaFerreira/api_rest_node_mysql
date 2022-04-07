const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).send({
		message: 'Get movies...',
	});
});

router.get('/:id', (req, res) => {
	const id = req.params.id;

	res.status(200).send({
		message: 'Get movie by id',
		id,
	});
});

router.post('/', (req, res) => {
	res.status(200).send({
		message: 'Post movies...',
	});
});

module.exports = router;
