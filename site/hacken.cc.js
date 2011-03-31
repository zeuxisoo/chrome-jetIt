var www_hacken_cc = function() {
	debug('Init hacken_cc class');
	
	this.run = function() {
		debug('Strat run');
		
		var tid = window.location.href.match(/thread-(\d+)/)[1];
		
		ajax_it("http://" + window.location.host + "/bbs/plugins/fblike/like.php", "tid=" + tid + "&action=like&inajax=1", "xml").success(function(xml_doc) {
			debug(xml_doc);
			
			$.get(window.location.href, function(html) {
				var content = $(".showhide", html).html();
				
				debug(content);
				
				var $locked = $(".locked:eq(0)");
				if ($locked != null) {
					$locked.attr("class", "showhide").prepend(content);
				}
			}, "html");
		});
		
		debug("Not Ajax just hidden content & Changed Content");
	}
}