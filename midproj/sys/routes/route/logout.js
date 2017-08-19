var router = require('express').Router()
var mid = require('../../midwares')

router.get('/', (req, res) => {
	var db = require('../../lib/db')()

	const query = `update user set auth="0" where auth="1"`

	db.query(query, (err, results) => {
			res.redirect('/login')
	})
})

exports.logout = router
