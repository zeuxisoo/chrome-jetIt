var citytalk_tw = function() {
	debug('Init citytalk_tw class');
	
	this.run = function() {
		debug('Strat run');
		
		var tid = window.location.search.match(/tid=(\d+)/)[1];
		
		debug("tid: " + tid);
		
		$.post("http://" + window.location.host + "/oauth/fb_sns_thread_like.php", {
			"tid": tid
		}, function(data) {			
			if (data.success) {
				window.location.reload();
			}
		}, "json");
	}
}