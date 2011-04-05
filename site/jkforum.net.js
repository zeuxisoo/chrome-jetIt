var jkforum_net = function() {
	debug('Init jkforum_net class');
	
	this.run = function() {
		debug('Strat run');
		
		var $post_block = $("table.fo:first-child").parent();
		var pid = $post_block.attr("id").replace("post_", "");
		var tid = window.location.pathname.match(/thread-(\d+)-\d+-\d+\.html/)[1];
		
		debug("Block: " + $post_block);
		debug("PID: " + pid);

		ajax_it("http://" + window.location.host + "/forum.php", "mod=viewthread&show=true&tid=" + tid + "&viewpid=" + pid + "&inajax=1", "xml").success(function(xml_doc) {
			debug(xml_doc);
			
			var content = $("root", xml_doc).text();
			
			debug(content);
			
			$post_block.html(content);
			
			debug("Ended Ajax & Changed Content");
		});
	}
};