const router = require('express').Router();

router.get('/', (req, res) => {
	res.status(200).send('GET ALL');
});

router.get('/:id', (req, res) => {
	const id = req.params.id;

	res.status(200).send('GET 1');
});

router.post('/', (req, res) => {
	res.status(200).send('POST');
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	res.status(200).send('DELETE');
});

module.exports = router;
