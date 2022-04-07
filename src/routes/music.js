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
	res.status(200).send({
		message: 'Post music',
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
