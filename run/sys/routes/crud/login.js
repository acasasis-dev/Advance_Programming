var express = require('express')
var router = express.Router()
var mid = require('../../lib/midwares')

router.get('/', mid.iHost, mid.noDB, (req, res) => {
	res.render('login/init')
})

router.post('/', mid.isNull(__filename), mid.auth, (req, res) => {
	res.redirect('/home')
})

exports.login = router
