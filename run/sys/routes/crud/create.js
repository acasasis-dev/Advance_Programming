var express = require('express')
var router = express.Router()
var mid = require('../../lib/midwares')

router.get('/', (req, res) => {
        res.render('create/init')
})

router.post('/', mid.isNull(__filename), (req, res) => {
        var db = require('../../lib/db')()
        db.query(`insert into \`cars\` (\`make\`, \`model\`, \`year\`, \`plnum\`, \`cond\`)
                values ("${req.body.make}", "${req.body.model}", ${req.body.year},
                        "${req.body.plnum}", "${req.body.cond}")`, (err, results, fields) => {
                                if(err) console.error
                                res.redirect('/read')
        })
})

exports.create = router
