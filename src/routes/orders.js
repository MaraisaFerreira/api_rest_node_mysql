const router = require('express').Router();

const db = require('../db');

router.get('/', (req, res) => {
	const sql = 'SELECT * FROM orders';

	db.query(sql, (err, result) => {
		if (err) {
			return res.status(500).send({
				message: 'Error',
				err,
			});
		}
		res.status(200).send({
			message: 'Success. GET all orders.',
			result,
		});
	});
});

router.get('/:id', (req, res) => {
	const id = req.params.id;

	const sql = 'SELECT * FROM orders WHERE cod = ?';

	db.query(sql, [id], (err, result) => {
		if (err) {
			return res.status(500).send({
				message: 'Error',
				err,
			});
		}
		res.status(200).send({
			message: `Success. GET order cod ${id}.`,
			result,
		});
	});
});

router.post('/', (req, res) => {
	const order = {
		cod_travel: req.body.cod_travel,
		cod_client: req.body.cod_client,
		amount: req.body.amount,
	};

	if (!order.cod_travel || !order.cod_client || !order.amount) {
		return res.status(400).send({
			message: 'All fields MUST BE filled',
		});
	}

	const sql =
		'INSERT INTO orders (cod_travel, cod_client, amount) VALUES (?,?,?)';

	db.query(
		sql,
		[order.cod_travels, order.cod_client, order.amount],
		(err, result) => {
			if (err) {
				return res.status(500).send({
					message: 'ERROR. Order DID NOT insert',
					err,
				});
			}
			res.status(200).send({
				message: 'Success. Order inserted',
				cod: result.insertID,
			});
		}
	);
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	const sql = 'DELETE FROM orders WHERE cod = ?';

	db.query(sql, [id], (err, result) => {
		if (err) {
			return res.status(500).send({
				message: 'ERROR. Order DID NOT delete',
				err,
			});
		}
		res.status(200).send({
			message: 'Order deleted',
		});
	});
});

module.exports = router;
