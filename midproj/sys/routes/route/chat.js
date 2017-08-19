var router = require('express').Router()
var mid = require('../../midwares')
var db = require('../../lib/db')()
var online

router.use(mid.authed)

router.get('/', (req, res) => {
	res.render('chatsel')
})

router.post('/', (req, res) => {
	res.redirect(`/chat/${req.body.uname}`)
})

router.get('/:uname', (req, res) => {
	const query = `select username from user where auth="1"`

	db.query(query, (err, results) => {
		con(results[0].username)
	})

	function con(par) {
		online = par

		const query1 = `select chat from msg where user1="${online}" and user2="${req.params.uname}" \
					or user1="${req.params.uname}" and user2="${online}"`

		db.query(query1, (err, results) => {
			res.render('chat', { chats: results, uname: req.params.uname })
		})
	}
})

router.post('/:uname', (req, res) => {
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

		var chat = `${online} @ ${compdate} "\t": ${req.body.chat}`

		const query1 = `insert into msg(user1, user2, chat) values("${online}", "${req.params.uname}", \
			"${chat}")`

		db.query(query1)

		res.redirect(`/chat/${req.params.uname}`)
})

exports.chat = router