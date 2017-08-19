module.exports = file => {
		return (req, res, next) => {
				var db = require('../../../lib/db')()

    			db.query(`select id from cars where id = ${req.body.id}`, (err, results) => {
    				if(err) console.error
        			if(!results[0]) res.render(`${file.split('/')[file.split('/').length - 1].split('.')[0]}/notfound`)
        			else next()
				})
		}
}