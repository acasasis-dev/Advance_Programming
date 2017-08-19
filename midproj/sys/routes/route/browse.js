var router = require('express').Router()
var mid = require('../../midwares')
var db = require('../../lib/db')()

router.use(mid.authed)

router.get('/', (req, res) => {
	const query = `select * from post_category`

	db.query(query, (err, results) => {
		res.render('browse', { posts : results })
	})
})

router.get('/:catid', (req, res) => {
	const query = `select * from post where post_category=${req.params.catid}`

	db.query(query, (err, results) => {
		res.render('posts', { posts: results, catid: req.params.catid })
	})
})

router.get('/:catid/:postid', (req, res) => {
	const query = `select * from post where id=${req.params.postid}`

	db.query(query, (err, results) => {
		res.render('specview', { posts: results, catid: req.params.catid })
	})
})

exports.browse = router