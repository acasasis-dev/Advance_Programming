module.exports = (req, res, err, next) => {
	if(err.code = 'ENOENT')
		res.render('oerror/ihost')
	else next()
}