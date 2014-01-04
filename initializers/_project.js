exports._project = function(api, next){
  // modify / append the api global variable
  // I will be run as part of actionHero's boot process
	
	api.registeredUsers = [
		{name: "drakmail", token: "am3vxs", active: true, limit: 5},
		{name: "fat0troll", token: "ololo", active: false, limit: 2}
	]

  next();
}
