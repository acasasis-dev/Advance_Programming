var express = require('express')
var router = express.Router()
var mid = require('../../lib/midwares')

router.get('/', mid.gen.logged, (req, res) => {
        var db = require('../../lib/db')()

        db.query('select * from cars', (err, results, fields) => {
                if(err) return res.send(err)
                render(results)
        })

        function render(cars) {
                res.render('read/init', {cars : cars})
        }
})

exports.read = router
