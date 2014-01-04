var fs = require('fs');

exports.usersList = {
	name: "usersList",
	description: "List users on server",
	inputs: { required: [], optional: [] },
	run: function(api, connection, next) {
		connection.response.users = api.user.getList()
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
		var user = api.user.findByName(connection.params.username);
		if (user) {
			api.user.getSites(user, function(sites) {
				connection.response.userSites = sites;
				next(connection, true);
			}, function(error) {
				connection.error = "Couldn't complete operation, internal error #425031";
				next(connection, true);
			});
		} else {
			connection.error = "Couldn't find user with specified name";
			next(connection, true);
		}
	}
}
