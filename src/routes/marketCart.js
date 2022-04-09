const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
	const sql = 'SELECT * FROM market_cart';

	db.query(sql, (err, result) => {
		if (err) {
			return res.status(500).send({ message: 'Fail', err });
		}

		res.status(200).send({
			message: 'Success',
			amount: result.length,
			result,
		});
	});
});

router.get('/:id', (req, res) => {
	const id = req.params.id;

	const sql = 'SELECT * FROM market_cart WHERE cart_id = ?';

	db.query(sql, [id], (err, result) => {
		if (err) {
			return res.status(500).send({ message: 'Fail', err });
		}

		res.status(200).send({ message: 'Success', result });
	});
});

router.post('/', (req, res) => {
	const order = {
		amount: req.body.amount,
		product_id: req.body.product_id,
	};

	const sql =
		'INSERT INTO market_cart (cart_amount, cart_product_id) VALUES (?,?)';

	db.query(sql, [order.amount, order.product_id], (err, result) => {
		if (err) {
			return res.status(500).send({ message: 'Fail', err });
		}

		res.status(200).send({
			message: 'Success',
			result,
		});
	});
});

router.patch('/:id', (req, res) => {
	const id = req.params.id;
	const order = {
		amount: req.body.amount,
		product_id: req.body.product_id,
	};

	const slq = `UPDATE market_cart SET
                cart_amount = ?, cart_product_id = ?
                WHERE cart_id = ?`;

	db.query(slq, [order.amount, order.product_id, id], (err, result) => {
		if (err) {
			return res.status(500).send({ message: 'Fail', err });
		}

		res.status(200).send({
			message: 'Success',
			order,
		});
	});
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	const sql = 'DELETE FROM market_cart WHERE cart_id = ?';

	db.query(sql, [id], (err, result) => {
		if (err) {
			return res.status(500).send({ message: 'Fail', err });
		}

		res.status(200).send({
			message: 'Success',
			result,
		});
	});
});

module.exports = router;
