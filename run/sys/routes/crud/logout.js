var express = require('express')
var router = express.Router()
var mid = require('../../lib/midwares')

router.get('/', mid.gen.logged, (req, res) => {
	var db = require('../../lib/db')()

	db.query(`update users set auth="false" where auth="true"`, (err, results) => {
		if(err) res.send(err)
	})

	res.redirect('/login')
})

exports.logout = router
