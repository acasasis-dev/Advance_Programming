module.exports = (req, res, next) => {
	var db = require('../../../lib/db')()

    db.query(`select username from users where username="${req.body.username}"`, (err, results) => {
    	if(!results[0])
    		next()
    	else
    		res.render('signup/exist')
   	})
}