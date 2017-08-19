var fs = require('fs')

module.exports = app => {
	fs.readdir(__dirname + '/route', (err, mods) => {
		if(err) console.error

		mods.forEach( cur => {
			var routes = require(`./route/${cur}`)
			Object.keys(routes).forEach(cur => {
				app.use(`/${cur}`, routes[cur])
			})
		})
	})
}
