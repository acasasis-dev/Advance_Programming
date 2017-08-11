var express = require('express')
var router = express.Router()
var mid = require('../../lib/midwares')

router.get('/', (req, res) => {
	res.render('signup/init')
})

router.post('/', mid.gen.isNull(__filename), mid.signup.exist, mid.signup.unMatch, (req, res) => {
    var db = require('../../lib/db')()
    db.query(`insert into \`users\` (\`username\`, \`password\`, \`auth\`)
        values ("${req.body.username}", "${req.body.password}", "false")`, (err, results, fields) => {
                if(err) console.error
                res.redirect('/login')
        })
})

exports.signup = router