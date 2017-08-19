module.exports = (req, res, next) => {
	var mysql = require('mysql')

	var db = mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME
	})

	db.connect( err => {
		if(err) {
			if(err.code == 'ECONNREFUSED')
				res.render('database/nconn')
			else if(err.code == 'ER_ACCESS_DENIED_ERROR')
				res.render('database/wpass')
			else
				res.render('database/ukdberr')
		}
		else
			next()
	})
}