var express = require('express')
var router = express.Router()
var mid = require('../../lib/midwares')

router.get('/', mid.gen.logged, (req, res) => {
    res.render('update/init')
})

router.post('/', mid.gen.logged, mid.gen.isNull(__filename), mid.gen.isIDnf(__filename), (req, res) => {
        var db = require('../../lib/db')()
        db.query(`update \`cars\` set ${req.body.reqcol} = "${req.body.newcont}"
                where id = ${req.body.id}`, (err, results, fields) => {
                        if(err) console.error
                        res.redirect('/read')
        })
})

exports.update = router
