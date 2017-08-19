var router = require('express').Router()
var mid = require('../../midwares')

router.use(mid.authedisAdmin)

var db = require('../../lib/db')()

router.get('/', (req, res) => {
	res.redirect('/admin/home')
})

router.get('/home', (req, res) => {
	const query = `select username from user where auth="1"`

	db.query(query, (err, result) => {
		res.render('adminhome', {users : result})
	})
})

router.get('/view', (req, res) => {
	const query = `select * from post_category`

	db.query(query, (err, results) => {
		res.render('adminview', { cats : results })
	})
})

router.get('/create', (req, res) => {
	res.render('admincreate')
})

router.post('/create', (req, res) => {
	console.log(req.body)
	var db = require('../../lib/db')()

	const query = `insert into post_category(category_name) values("${req.body.cat}")`

	db.query(query, (err, results) => {
		res.redirect('/admin/home')
	})
})

router.get('/edit/:id', (req, res) => {
	const query = `select * from post_category where id=${req.params.id}`

	db.query(query, (err, results) => {
		res.render('adminedit', { cats : results })
	})
})

router.post('/edit/:id', (req, res) => {
	const query = `update post_category set category_name="${req.body.newcat}" where id="${req.params.id}"`

	db.query(query, (err, results) => {
		res.redirect('/admin/home')
	})
})

exports.admin = router
