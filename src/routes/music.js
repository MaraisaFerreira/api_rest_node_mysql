const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/', (req, res) => {
	const sql = 'SELECT * FROM music';

	db.query(sql, (err, result) => {
		if (err) {
			return res.status(500).send({
				message: 'Error to get all musics',
				error: err,
			});
		}

		res.status(200).send({
			message: 'Get all musics',
			result,
		});
	});
});

router.get('/:id', (req, res) => {
	const id = req.params.id;

	const sql = 'SELECT * FROM music WHERE music_id = ?';

	db.query(sql, [id], (err, result) => {
		if (err) {
			return res.status(500).send({
				message: 'No music was found',
				err,
			});
		}

		res.status(200).send({
			message: `Get music - id: ${id}`,
			result,
		});
	});
});

router.post('/', (req, res) => {
	const music = {
		title: req.body.title,
		category: req.body.category || '',
		artist: req.body.artist,
		price: req.body.price,
	};

	const sql =
		'INSERT INTO music (music_title, music_category, music_artist, music_price) VALUES (?,?,?,?)';

	db.query(
		sql,
		[music.title, music.category, music.artist, music.price],
		(err, result) => {
			if (err) {
				return res.status(500).send({
					message: 'Data DID NOT inserted!',
					error: err,
				});
			}

			res.status(200).send({
				message: 'Insert data success!',
				music,
			});
		}
	);
});

router.patch('/:id', (req, res) => {
	const id = req.params.id;
	const { title } = req.body;
	const { category } = req.body;
	const { artist } = req.body;
	const { price } = req.body;

	const sql =
		'UPDATE music SET ' +
		'music_title= ?, music_category = ?, music_artist = ?, music_price = ? ' +
		'WHERE music_id = ?';

	db.query(sql, [title, category, artist, price, id], (err, result) => {
		if (err) {
			return res.status(500).send({
				message: 'DID NOT updated',
				err,
			});
		}
		res.status(200).send({
			message: 'Success',
			music: {
				id,
				title,
				category,
				artist,
				price,
			},
		});
	});
});

router.delete('/:id', (req, res) => {
	const id = req.params.id;

	const sql = 'DELETE FROM music WHERE music_id = ?';

	db.query(sql, [id], (err, result) => {
		if (err) {
			return res.status(500).send({
				message: 'Data DID NOT deleted',
				err,
			});
		}

		res.status(200).send({
			message: `Delete music - id: ${id}`,
			id,
		});
	});
});

module.exports = router;
