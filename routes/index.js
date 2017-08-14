var express = require('express');
var router = express.Router();

var Article = require('../models/article');
/**
 *
 *___ _____ _   ___ _____   _  _ ___ ___ ___
 / __|_   _/_\ | _ \_   _| | || | __| _ \ __|
 \__ \ | |/ _ \|   / | |   | __ | _||   / _|
 |___/ |_/_/ \_\_|_\ |_|   |_||_|___|_|_\___|
 *
 *
 */

router.get('/articles', (req, res, next) => {
	Article.findAll().then((data) => {
		return data
	}).then((data) => {
		res.send(data || []);
	});
});

router.get('/articles/:id', (req, res, next) => {
	Article.find({where: {id: req.params.id}}).then((data) => {
		return data
	}).then((data) => {
		if (data.title) {
			return res.json({
				title: data.title
			})
		} else {
			return res.sendStatus('404')
		}
	});
});
router.post('/articles', function (req, res, next) {
	Article.create(req.body)
		.then(function (created) {
			res.json({
				message: 'Created successfully',
				article: created
			});
		})
		.catch(next);
});
router.put('/articles/:id', function (req, res, next) {
	Article.update(req.body, {
		where: {id: req.params.id},
		returning: true
	})
		.then(results => {
			// console.log(results);
			// console.log(results[1][0]);
			let rez = results[1][0];
			res.json({
				message:'Updated successfully',
				article: rez
			})
		})
		.catch(next);
});


module.exports = router;
