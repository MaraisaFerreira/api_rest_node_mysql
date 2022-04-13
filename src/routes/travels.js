const router = require('express').Router();

const db = require('../db');

router.get('/', (req, res) => {
	const sql = 'SELECT * FROM travels';

	db.query(sql, (err, result) => {
		if (err) {
			return res.status(500).send({
				message: 'Error',
				err,
			});
		}

		res.status(200).send({
			message: 'Success. GET all travels',
			result,
		});
	});
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	const sql = 'SELECT * FROM travels WHERE cod = ?';

	db.query(sql, [id], (err, result) => {
		if (err) {
			return res.status(500).send({
				message: 'Error',
				err,
			});
		}

		res.status(200).send({
			message: `Success. GET travel - cod ${id}`,
			result,
		});
	});
});

router.post('/', (req, res) => {
	const travel = {
		destination: req.body.destination,
		duration: req.body.duration,
		available: req.body.available,
		price: req.body.price,
		url_img: req.body.url_img || '',
	};

	if (
		!travel.destination ||
		!travel.duration ||
		!travel.available ||
		!travel.price
	) {
		return res.status(400).send({
			message:
				'At least fields Destination, Duration, Available and Price MUST BE filled!',
		});
	}

	const sql =
		'INSERT INTO travels (destination, duration, available, price, url_img) VALUES (?,?,?,?,?)';

	db.query(
		sql,
		[
			travel.destination,
			travel.duration,
			travel.available,
			travel.price,
			travel.url_img,
		],
		(err, result) => {
			if (err) {
				return res.status(500).send({
					message: 'ERROR! Travel DID NOT insert on db',
					err,
				});
			}
			res.status(200).send({
				message: 'Success. Travel Inserted.',
				product_id: result.insertId,
			});
		}
	);
});

router.patch('/:id', (req, res) => {
	const id = req.params.id;

	const travel = {
		destination: req.body.destination,
		duration: req.body.duration,
		available: req.body.available,
		price: req.body.price,
		url_img: req.body.url_img || '',
	};

	if (
		!travel.destination ||
		!travel.duration ||
		!travel.available ||
		!travel.price
	) {
		return res.status(400).send({
			message:
				'At least fields Destination, Duration, Available and Price MUST BE filled!',
		});
	}

	const sql =
		'UPDATE travels SET destination = ?, duration = ?, available = ?, price = ?, url_img = ? WHERE cod = ?';

	db.query(
		sql,
		[
			travel.destination,
			travel.duration,
			travel.available,
			travel.price,
			travel.url_img,
			id,
		],
		(err, result) => {
			if (err) {
				return res.status(500).send({
					message: `ERROR! Travel ${id} DID NOT update`,
					err,
				});
			}
			res.status(200).send({
				message: `Success! Travel ${id} updated`,
				log: result.message,
			});
		}
	);
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	const sql = 'DELETE FROM travels WHERE cod = ?';

	db.query(sql, [id], (err, result) => {
		if (err) {
			return res.status(500).send({
				message: 'ERROR! Travel DID NOT delete',
				err,
			});
		}
		res.status(200).send({
			message: 'Success. Travel deleted',
		});
	});
});

module.exports = router;
