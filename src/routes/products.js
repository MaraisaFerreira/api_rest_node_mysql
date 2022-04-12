const router = require('express').Router();

const db = require('../db');

router.get('/', (req, res) => {
	const sql = 'SELECT * FROM products';

	db.query(sql, (err, result) => {
		if (err) {
			return res.status(500).send({
				message: 'Error',
				err,
			});
		}

		res.status(200).send({
			message: 'Success. GET all products',
			result,
		});
	});
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	const sql = 'SELECT * FROM products WHERE cod = ?';

	db.query(sql, [id], (err, result) => {
		if (err) {
			return res.status(500).send({
				message: 'Error',
				err,
			});
		}

		res.status(200).send({
			message: `Success. GET products - cod ${id}`,
			result,
		});
	});
});

router.post('/', (req, res) => {
	const product = {
		name: req.body.name,
		trademark: req.body.trademark,
		category: req.body.category,
		available: req.body.available,
		price: req.body.price,
		url_img: req.body.url_img || '',
	};

	if (
		!product.name ||
		!product.trademark ||
		!product.category ||
		!product.available ||
		!product.price
	) {
		return res.status(400).send({
			message:
				'At least Name, Trademark, Category, Available, Price MUST BE filled!',
		});
	}

	const sql =
		'INSERT INTO products (name, trademark, category, available, price, url_img) VALUES (?,?,?,?,?,?)';

	db.query(
		sql,
		[
			product.name,
			product.trademark,
			product.category,
			product.available,
			product.price,
			product.url_img,
		],
		(err, result) => {
			if (err) {
				return res.status(500).send({
					message: 'ERROR! Product DID NOT insert on db',
					err,
				});
			}
			res.status(200).send({
				message: 'Success. Product Inserted.',
				product_id: result.insertId,
			});
		}
	);
});

router.patch('/:id', (req, res) => {
	const id = req.params.id;

	const product = {
		name: req.body.name,
		trademark: req.body.trademark,
		category: req.body.category,
		available: req.body.available,
		price: req.body.price,
		url_img: req.body.url_img || '',
	};

	if (
		!product.name ||
		!product.trademark ||
		!product.category ||
		!product.available ||
		!product.price
	) {
		return res.status(400).send({
			message:
				'At least Name, Trademark, Category, Available, Price MUST BE filled!',
		});
	}

	const sql =
		'UPDATE products SET name = ?, trademark = ?, category = ?, available = ?, price = ?, url_img = ? WHERE cod = ?';

	db.query(
		sql,
		[
			product.name,
			product.trademark,
			product.category,
			product.available,
			product.price,
			product.url_img,
			id,
		],
		(err, result) => {
			if (err) {
				return res.status(500).send({
					message: `ERROR! Product ${id} DID NOT update`,
					err,
				});
			}
			res.status(200).send({
				message: `Success! Product ${id} updated`,
				log: result.message,
			});
		}
	);
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	const sql = 'DELETE FROM products WHERE cod = ?';

	db.query(sql, [id], (err, result) => {
		if (err) {
			return res.status(500).send({
				message: 'ERROR! Product DID NOT delete',
				err,
			});
		}
		res.status(200).send({
			message: 'Success. Product deleted',
		});
	});
});

module.exports = router;
