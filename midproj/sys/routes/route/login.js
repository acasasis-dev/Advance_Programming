var router = require('express').Router()
var mid = require('../../midwares')

router.use(mid.check)

router.get('/', (req, res) => {
	res.render('login', req.query)
})

router.post('/', mid.isNull(__filename), (req, res) => {
	var db = require('../../lib/db')()

	const query = `select password, user_type from user where username="${req.body.username}"`
	const que = `update user set auth="1" where username="${req.body.username}"`

	db.query(query, (err, results) => {
		if(!results[0])
			return res.redirect('/login?nonexist')
		else if(results[0].password === req.body.password) {
			db.query(que)
			if(results[0].user_type === 'Admin')
				res.redirect('/admin')
			else
				res.redirect('/home')
		}
		else
			res.redirect('/login?incorrect')
	})
})

exports.login = router
