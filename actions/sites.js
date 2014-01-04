var fs = require('fs');

exports.newSite = {
	name: "newSite",
	description: "Create new user site",
	inputs: {
		required: ['username', 'sitename', 'sitetype'], optional: []
	},
	run: function(api, connection, next) {
		var user = api.user.findByName(connection.params.username);
		if (user) {
			connection.error = "Not implemented";
			next(connection, true);
		} else {
			connection.error = "Couldn't found user with specified username";
			next(connection, true);
		}
	}
}

exports.destroySite = {
	name: "destroySite",
	description: "Destroy user site",
	inputs: {
		required: ['username', 'sitename'], optional: []
	},
	run: function(api, connection, next) {
		if (connection.params.sitename !== 'default') {
			var user = api.user.findByName(connection.params.username);

			if (user) {
				fs.unlink('/etc/nginx/sites-enabled/'+
						connection.params.username +
						'.' + connection.params.sitename
				, function(err) {
					if (err) {
						connection.error = "Couldn't delete site with specified name";
					} else {
						connection.response.status = "completed";
					}
					next(connection, true);
				});
			} else {
				connection.error = "Couldn't find user with specified name";
				next(connection, true);
			}
		} else {
			connection.error = "Couldn't remove default site";
			next(connection, true);
		}
	}
}
