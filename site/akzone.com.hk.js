var akzone_com_hk = function() {
	debug("Init akzone_com_hk class");
	
	this.run = function() {
		debug("Start run");
		
		var url = window.location.href;
		var id = url.match(/id=(\d+)/)[1];
		
		debug("URL: " + url)
		debug("ID: " + id)

		$.get("http://" + window.location.host + "/fb_like.php", {
			"zone": "forum",
			"id": id,
			"url": url	
		}, function(html) {
			window.location.reload();
		});
	}
	
};