var router = require('express').Router()
var mid = require('../../midwares')
var db = require('../../lib/db')()

router.use(mid.authed)

router.get('/', (req, res) => {
	const q = `select username from user where auth="1"`

	db.query(q, (err, results) => {
		comp(results[0].username)
	})

	function comp(par) {
		const query = `select * from post where author="${par}"`

		db.query(query, (err, results) => {
			res.render('userposts', { posts : results })
		})
	}
})

router.get('/:id', (req, res) => {
	const query = `select * from post where id=${req.params.id}`

	db.query(query, (err, results) => {
		res.render('userview', { posts : results })
	})
})

router.get('/:id/edit', (req, res) => {
	const query = `select * from post where id=${req.params.id}`

	db.query(query, (err, results) => {
		res.render('edit', { posts : results })
	})
})

router.post('/:id/edit', (req, res) => {
	const query = `update post set post_title="${req.body.title}", \
				post_content="${req.body.content}" where \
				id=${req.params.id}`

	db.query(query)

	res.redirect('/userposts')
})

router.get('/:id/delete', (req, res) => {
	const query = `delete from post where id=${req.params.id}`

	db.query(query)

	res.redirect('/userposts')
})

exports.userposts = router