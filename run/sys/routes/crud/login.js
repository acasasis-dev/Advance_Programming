var express = require('express')
var router = express.Router()
var mid = require('../../lib/midwares')

router.get('/', mid.db.iHost, mid.db.noDB, (req, res) => {
	res.render('login/init')
})

router.post('/', mid.gen.isNull(__filename), mid.login.auth, (req, res) => {
	var db = require('../../lib/db')()

	db.query(`update users set auth="true" where username="${req.body.username}"`, (err, results) => {
		if(err) res.send(err)
	})

	res.redirect('/home')
})

exports.login = router
