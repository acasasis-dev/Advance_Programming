var router = require('express').Router()
var mid = require('../../midwares')
var db = require('../../lib/db')()
var online
var date = new Date()

var compdate = date.getFullYear() + '-' +
	con(date.getMonth() + 1) + '-' +
	con(date.getDate()) + ' ' +
	con(date.getHours()) + ':' +
	con(date.getMinutes()) + ':' +
	con(date.getSeconds())

function con(par) {
	return (par < 10 ? '0' : '') + par
}

router.use(mid.authed)

router.get('/', (req, res) => {
	const query = `select * from post_category`

	db.query(query, (err, results) => {
		res.render('create', { cats: results })
	})
})

router.post('/', mid.isNull(__filename), (req, res) => {
	const q = `select username from user where auth="1"`

	db.query(q, (err, results) => {
		con(results[0].username)
	})

	function con(par) {
		online = par

		db.query(`insert into post(author, post_category, post_title, post_content, post_date) \
				values("${online}", "${req.body.postcat}", "${req.body.post_title}", "${req.body.post_content}", "${compdate}")`)

		res.redirect('/home')
	}
})

exports.create = router
