module.exports = (req, res, next) => {
    var db = require('../../lib/db')()

    db.query('select * from users', (err, results, fields) => {
    	if(results[0].username == req.body.username) {
    		if(results[0].password == req.body.password)
    			next()
    		else
    			res.render('login/wpass')
    	}
    	else
    		res.render('login/notfound')
    })
}