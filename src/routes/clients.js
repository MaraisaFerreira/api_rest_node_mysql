const router = require('express').Router();

const db = require('../db');

router.get('/', (req, res) => {
	const sql = 'SELECT * FROM clients';

	db.query(sql, (err, result) => {
		if (err) {
			return res.status(500).send({
				message: 'Error',
				err,
			});
		}
		res.status(200).send({
			message: 'Success. GET all clients.',
			result,
		});
	});
});

router.get('/:id', (req, res) => {
	const id = req.params.id;

	const sql = 'SELECT * FROM clients WHERE cod = ?';

	db.query(sql, [id], (err, result) => {
		if (err) {
			return res.status(500).send({
				message: 'Error',
				err,
			});
		}
		result.length < 1
			? res.status(200).send({
					message: `Client cod ${id} does not exists`,
			  })
			: res.status(200).send({
					message: `Success. GET client cod ${id}.`,
					result,
			  });
	});
});

router.post('/', (req, res) => {
	const client = {
		name: req.body.name,
		ID: req.body.ID,
		zipcode: req.body.zipcode,
		country: req.body.country,
		phone: req.body.phone,
	};

	if (
		!client.name ||
		!client.ID ||
		!client.zipcode ||
		!client.country ||
		!client.phone
	) {
		return res.status(400).send({
			message: 'All fields MUST BE filled.',
		});
	}

	const sql =
		'INSERT INTO clients (name, ID, zipcode, country, phone) VALUES (?,?,?,?,?)';

	db.query(
		sql,
		[client.name, client.ID, client.zipcode, client.country, client.phone],
		(err, result) => {
			if (err) {
				return res.status(500).send({
					message: 'Client DID NOT insert on db',
				});
			}
			res.status(200).send({
				message: 'Success. Client inserted on db',
				client_id: result.insertId,
			});
		}
	);
});

router.patch('/:id', (req, res) => {
	const id = req.params.id;

	const client = {
		name: req.body.name,
		ID: req.body.ID,
		zipcode: req.body.zipcode,
		country: req.body.country,
		phone: req.body.phone,
	};

	if (
		!client.name ||
		!client.ID ||
		!client.zipcode ||
		!client.country ||
		!client.phone
	) {
		return res.status(400).send({
			message: 'All fields MUST BE filled.',
		});
	}

	const sql =
		'UPDATE clients SET name = ?, ID = ?, zipcode = ?, country = ?, phone = ? WHERE cod = ?';

	db.query(
		sql,
		[client.name, client.ID, client.zipcode, client.country, client.phone, id],
		(err, result) => {
			if (err) {
				return res.status(500).send({
					message: 'ERROR. Client DID NOT update.',
					err,
				});
			}
			res.status(200).send({
				message: 'Success. Client updated.',
				log: result.message,
			});
		}
	);
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	const sql = 'DELETE FROM clients WHERE cod = ?';

	db.query(sql, [id], (err, result) => {
		if (err) {
			return res.status(500).send({
				message: 'Client DID NOT delete',
				err,
			});
		}
		res.status(200).send({
			message: 'Success. Client deleted',
		});
	});
});

module.exports = router;
