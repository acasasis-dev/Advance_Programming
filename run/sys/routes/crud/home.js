var express = require('express')
var router = express.Router()
var mid = require('../../lib/midwares')

router.get('/', mid.gen.logged, (req, res) => {
        res.render('home/init')
})

exports.home = router
