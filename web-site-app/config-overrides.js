const { alias } = require('react-app-rewire-alias')

module.exports = function override(config) {
	alias({
		'@type': 'src/Types',
		'@route': 'src/Route',
		'@page': 'src/Page',
		'@hook': 'src/Hooks',
		'@util': 'src/Utils',
		'@component': 'src/Component',
		'@lang': 'src/lang',
		'@api': 'src/API',
		'@http': 'src/http',
		'@store': 'src/Store',
		'@image': 'public/Image',
	})(config)

	return config
}
