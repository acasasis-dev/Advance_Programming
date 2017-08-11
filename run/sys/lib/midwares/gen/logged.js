module.exports = (req, res, next) => {
    var db = require('../../../lib/db')()
    var user

    db.query(`select username from users where auth="true"`, (err, results, fields) => {
        if(!results[0])	
            res.render('login/loginfirst')
        else
            next()
    })
}