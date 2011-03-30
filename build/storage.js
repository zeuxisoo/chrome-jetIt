Storage = {
	
	add: function(name, value) {
		if (localStorage.hasOwnProperty(name)) {
			return false;
		}
		
		storage.set(name, value);
		return true;
	},
	
	set: function(name, value) {
		localStorage[name] = value;	
	},
	
	get: function(name) {
		return localStorage[name];
	},
	
	delete: function(name) {
		localStorage.removeItem(name);	
	},
	
	clear: function() {
		localStorage.clear	
	}
	
}