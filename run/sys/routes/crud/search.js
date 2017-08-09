var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
	res.render('search/init')
})

router.post('/', (req, res, next) => {
	if(req.body.id == '')
		res.render('search/null')
	else
		next()
}, (req, res, next) => {
	var db = require('../../lib/db')()

    db.query(`select id from cars where id = ${req.body.id}`, (err, results) => {
    	if(err) console.error
        if(!results[0]) res.render('search/notfound')
        else next()
	})
}, (req, res) => {
	var db = require('../../lib/db')()

    db.query(`select * from cars where id = ${req.body.id}`, (err, results) => {
        if(err) res.redirect('/search')
		render(results)
	})

    function render(cars) {
         res.render('search/found', { cars: cars })
	}

})

exports.search = router
