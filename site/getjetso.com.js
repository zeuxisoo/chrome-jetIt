var getjetso_com = function() {
	debug('Init getjetso_com class');
	
	this.run = function() {
		debug('Strat run');
		
		var $post_block = $(".viewthread:first-child .postmessage .t_msgfont");
		var pid = $post_block.attr("id").replace("postmessage_", "");
		
		debug("Block: " + $post_block);
		debug("PID: " + pid);
		
		ajax_it("http://" + window.location.host + "/forum/viewthread.php", "action=paging&pid=" + pid + "&inajax=1", "xml").success(function(xml_doc) {
			debug(xml_doc);
			
			var content = $("root", xml_doc).text();
			
			debug(content);
			
			$post_block.html(content);
			
			debug("Ended Ajax & Changed Content");
		});
	}
};