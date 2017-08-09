var express = require('express')
var router = express.Router()
var mid = require('../../lib/midwares')

router.get('/', (req, res) => {
    res.render('delete/init')
})

router.post('/', mid.isNull(__filename), mid.isIDnf(__filename), (req, res) => {
    var db = require('../../lib/db')()

    db.query(`delete from \`cars\` where \`id\` = ${req.body.id}`, (err, results, fields) => {
            if(err) console.error
            res.redirect('/read')
    })
})

exports.delete = router
