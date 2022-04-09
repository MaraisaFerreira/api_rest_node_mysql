const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
	const sql = 'SELECT * FROM movies';

	db.query(sql, (err, result) => {
		if (err) {
			return res.status(500).send({
				message: 'Error getting movies',
				err,
			});
		}
		res.status(200).send({
			message: 'Get all movies...',
			result,
		});
	});
});

router.get('/:id', (req, res) => {
	const id = req.params.id;

	const sql = 'SELECT * FROM movies WHERE movies_id = ?';

	db.query(sql, [id], (err, result) => {
		if (err) {
			return res.status(500).send({
				message: `Error getting movies id: ${id}`,
				err,
			});
		}
		res.status(200).send({
			message: `Get movie - id: ${id}`,
			result,
		});
	});
});

router.post('/', (req, res) => {
	const movie = {
		title: req.body.title,
		year: req.body.year,
		category: req.body.category || '',
		rating: req.body.rating,
		url_banner: req.body.url_banner || '',
		price: req.body.price,
	};

	const sql = `INSERT INTO movies
			(movies_title, movies_year, movies_category, movies_rating,
				movies_url_banner, movies_price) VALUES (?, ?, ?, ?, ?, ?);`;

	db.query(
		sql,
		[
			movie.title,
			movie.year,
			movie.category,
			movie.rating,
			movie.url_banner,
			movie.price,
		],
		(err, result) => {
			if (err) {
				return res.status(500).send({
					message: 'Movie DID NOT inserted',
					err,
				});
			}

			res.status(200).send({
				message: 'Post movie success',
				movie,
			});
		}
	);
});

router.patch('/:id', (req, res) => {
	const id = req.params.id;
	const movie = {
		title: req.body.title,
		year: req.body.year,
		category: req.body.category,
		rating: req.body.rating,
		url_banner: req.body.url_banner,
		price: req.body.price,
	};

	const sql = `UPDATE movies SET
			movies_title = ?, movies_year = ?, movies_category = ?, movies_rating = ?,
			movies_url_banner = ?, movies_price = ? WHERE movies_id = ?`;

	db.query(
		sql,
		[
			movie.title,
			movie.year,
			movie.category,
			movie.rating,
			movie.url_banner,
			movie.price,
			id,
		],
		(err, result) => {
			if (err) {
				return res.status(500).send({
					message: 'Movie DID NOT updated',
					err,
				});
			}
			res.status(200).send({
				message: `Movie id: ${id} updated`,
				movie: { id, ...movie },
			});
		}
	);
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	const sql = 'DELETE FROM movies WHERE movies_id = ?';

	db.query(sql, [id], (err, result) => {
		if (err) {
			return res.status(500).send({
				message: 'Movie DID NOT deleted',
				err,
			});
		}
		res.status(200).send({
			message: `Deleted movie - id: ${id}`,
			result,
		});
	});
});

module.exports = router;
