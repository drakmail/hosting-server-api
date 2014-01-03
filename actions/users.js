var fs = require('fs');

exports.usersList = {
	name: "usersList",
	description: "List users on server",
	inputs: { required: [], optional: [] },
	run: function(api, connection, next) {
		connection.response.users = api.registeredUsers.map(function(item) { return { name: item.name, active: item.active } });
		next(connection, true);
	}
}

exports.userSites = {
	name: "userSites",
	description: "List sites, activated by user",
	inputs: {
		required: ['username'], optional: []
	},
	run: function(api, connection, next) {

		var user = api.registeredUsers.filter(function(u) {
	    return u.name === connection.params.username; // filter out
		})[0];

		if (user) {
			fs.readdir('/etc/nginx/sites-enabled/', function(err, files) {
				if (err) {
					connection.error = "Couldn't complete operation, internal error #425031";
					next(connection, true);
				} else {
					// Like 'drakmail.default'
					regexp = new RegExp("^"+user.name+"\\.(.*)");
					connection.response.userSites = files.filter(function(s) {
						return regexp.test(s);
					}).map(function(s) {
						return s.match(regexp)[1];
					});
					next(connection, true);
				}
			});
		} else {
			connection.error = "Couldn't find user with specified name";
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
			var user = api.registeredUsers.filter(function(u) {
				return u.name === connection.params.username; // filter out
			})[0];

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
