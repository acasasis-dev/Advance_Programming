module.exports = (req, res, next) => {
	if(req.body.password == req.body.confirm)
		next()
	else
		res.render('signup/unmatch')
}