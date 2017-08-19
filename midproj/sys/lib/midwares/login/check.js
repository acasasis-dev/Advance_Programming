module.exports = (req, res, next) => {
    var db = require('../../../lib/db')()

    db.query(`select username from users where auth="true"`, (err, results, fields) => {
	console.log(results)
        if(!results[0])
            next()
        else
            render(results)
    })

    function render(users) {
	res.render('login/logged', {users : users})
    }
}
