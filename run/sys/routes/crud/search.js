var express = require('express')
var router = express.Router()
var mid = require('../../lib/midwares')

router.get('/', mid.gen.logged, (req, res) => {
	res.render('search/init')
})

router.post('/', mid.gen.logged, mid.gen.isNull(__filename), mid.gen.isIDnf(__filename), (req, res) => {
	var db = require('../../lib/db')()

    db.query(`select * from \`cars\` where \`id\` = ${req.body.id}`, (err, results) => {
        if(err) res.redirect('/search')		
        render(results)
	})

    function render(cars) {
         res.render('search/found', { cars: cars })
	}

})

exports.search = router
