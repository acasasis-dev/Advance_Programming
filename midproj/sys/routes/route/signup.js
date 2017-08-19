var router = require('express').Router()
var mid = require('../../midwares')

router.get('/', (req, res) => {
	res.render('signup', req.query)
})

router.post('/', mid.isNull(__filename), mid.existed, mid.match, (req, res) => {
	var db = require('../../lib/db')()

	const query = `insert into user (username, password, email, birthdate, user_type, auth) \
				values("${req.body.username}", "${req.body.password}", "${req.body.email}", \
				"${req.body.date}", "Normal", "0")`

	db.query(query, (err, results) => {
		if(err) throw err
		res.redirect('/login')
	})
})

exports.signup = router
