var morgan = require('morgan')
var serveStatic = require('serve-static')
var path = require('path')
var bodyParser = require('body-parser')

module.exports = app => {
	app.set('port', process.argv[2] || process.env.PORT || 1234)
	app.set('view engine', 'pug')
	app.set('views', path.dirname(__dirname) + '/views')
	app.use(serveStatic(path.dirname(__dirname) + '/styles'))
	app.use(morgan('dev'))
	app.use(bodyParser.urlencoded({extended: true}))
	app.use(bodyParser.json())
}

