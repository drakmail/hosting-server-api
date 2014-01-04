var fs = require('fs');

exports.user = function(api, next) {
	api.user = {
		// Find user by name
		findByName: function(name) {
			return api.registeredUsers.filter(function(u) { return u.name === name; })[0];
		},
		// Find all user sites
		getSites: function(user, next, error) {
			fs.readdir('/etc/nginx/sites-enabled/', function(err, files) {
				if (err) {
					error(err);
				} else {
					// Like 'drakmail.default'
					regexp = new RegExp("^"+user.name+"\\.(.*)");
					sites = files.filter(function(s) {
						return regexp.test(s);
					}).map(function(s) {
						return s.match(regexp)[1];
					});
					next(sites);
				}
			});
		},
		// Return list of all registered users
		getList: function() {
			return api.registeredUsers.map(function(item) { return {
				name: item.name,
				active: item.active,
				limit: item.limit
			}});
		}
	}
  next();
}
