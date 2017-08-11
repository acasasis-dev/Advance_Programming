require('dotenv').config()

var express = require('express')
var app = express()

require('./sys/core/boot')(app)
require('./sys/routes')(app)

app.get('/', (req, res) => {
	res.redirect('/login')
})

app.listen(app.get('port'), () => {
	console.log(`Listening to port ${app.get('port')}`)
})
