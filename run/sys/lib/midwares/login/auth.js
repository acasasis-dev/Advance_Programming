module.exports = (req, res, next) => {
    var db = require('../../../lib/db')()

    db.query('select * from users', (err, results, fields) => {
        for(x = 0; x < results.length; x ++) {
            if(results[x].username == req.body.username) {
                if(results[x].password == req.body.password)
                        next()
                else
                    res.render('login/wpass')
                return
            }
        }
        res.render('login/notfound')
    })
}