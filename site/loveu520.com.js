var loveu520_com = function() {
	debug('Init loveu520_com class');
	
	this.run = function() {
		debug('Strat run');
		
		var tid = window.location.search.match(/tid=(\d+)/)[1];
		
		debug("tid: " + tid);
		

		ajax_it("http://" + window.location.host + "/ajax.php", "action=GetFirstPostText&inajax=1&tid=" + tid, "xml").success(function(xml_doc) {
			debug(xml_doc);
			
			var content = $("root", xml_doc).text();
			
			debug(content);
			
			$("#firstmessage").html(content);
			
			// This site must logged user can view content only after liked or not liked
			var $subtitle = $(".subtitle");
			if ($subtitle != null) {
				$subtitle.css("color", "#F00").hide().slideDown("slow");
			}
		});

		debug("Not Ajax just hidden content & Changed Content");
	}
};