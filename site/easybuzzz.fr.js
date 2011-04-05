var easybuzzz_fr = function() {
	debug("Init easybuzzz_fr class");
	
	this.run = function() {
		debug("Start run");
		
		var lines = $("script:not(script[src]):contains(edge.create)").text().split("\n");
		
		$.each(lines, function(index, line) {
			var matchs = line.match(/var cc = '(.*)'/);
			if (matchs !== null) {
				debug(matchs[1]);
				
				$("#over").remove();
				$("#vid_real").html(matchs[1]);
				
				debug("Not Ajax just parse coding & Changed Content");
			}
		});
	}
};