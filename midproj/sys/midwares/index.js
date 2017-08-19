exports.match = (req, res, next) => {
	if(req.body.password === req.body.confirm)
		next()
	else
		res.redirect('/signup?dontmatch')
}

exports.authed = (req, res, next) => {
	var db = require('../lib/db')()

	const query = `select username from user where auth="1"`

	db.query(query, (err, results) => {
		if(!results[0])
			res.redirect('/login?badreq')
		else
			next()
	})
}

exports.authedisAdmin = (req, res, next) => {
	var db = require('../lib/db')()

	const query = `select username from user where auth="1" and user_type="Admin"`

	db.query(query, (err, results) => {
		if(!results[0])
			res.redirect('/home')
		else
			next()
	})
}

exports.check = (req, res, next) => {
	var db = require('../lib/db')()

	const query = `select username from user where auth="1"`

	db.query(query, (err, results) => {
		if(!results[0])
			next()
		else
			res.redirect('/home')
	})
}

exports.isNull = file => {
	return (req, res, next) => {
		var results = Object.keys(req.body)
		var flag = 0

		results.forEach( cur => {
			if(!req.body[cur])
				flag = 1
		})

		if(flag == 1)
			res.redirect(`/${file.split('/')[file.split('/').length - 1].split('.')[0]}?noninput`)
		else
			next()
	}
}

exports.existed = (req, res, next) => {
	var db = require('../lib/db')()

	const query = `select username from user where username="${req.body.username}"`

	db.query(query, (err, results) => {
		if(!results[0])
			next()
		else
			res.redirect('/signup?exists')
	})
}