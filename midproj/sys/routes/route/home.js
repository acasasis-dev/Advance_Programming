var router = require('express').Router()
var mid = require('../../midwares')

router.use(mid.authed)

router.get('/', (req, res) => {
	var db = require('../../lib/db')()

	const query = `select username from user where auth="1"`

	db.query(query, (err, result) => {
		res.render('home', {users : result})
	})
})

exports.home = router
