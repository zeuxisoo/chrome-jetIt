/*
 * Author: Zeuxis Lo (http://zeuxis.me)
 * Create: 2011-03-14 14:07
 */

DEBUG = false;

function debug(message) {
	if (DEBUG === true) {
		console.log(message);
	}
}

(function($, undefined) {
	
	debug("Start JetIt");
	
	var $post_block = $(".viewthread:first-child .postmessage .t_msgfont");
	var id = $post_block.attr("id").replace("postmessage_", "");
	
	debug("Block: " + $post_block);
	debug("ID: " + id);
	
	$.ajax({
		"header": {
			"User-Agent": "	Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; en-US; rv:1.9.2.15) Gecko/20110303 Firefox/3.6.15",
			"X-Alt-Referer": document.location.href
		},
		"url": "http://www.getjetso.com/forum/viewthread.php",
		"data": "action=paging&pid=" + id + "&inajax=1",
		"cache": false,
		"dataType": "xml",
		"success": function(xml_doc) {
			debug(xml_doc);
			
			var content = $("root", xml_doc).text();
			
			debug(content);
			
			$post_block.html(content);
			
			debug("Ended JetIt");
		}
	});
	
})(jQuery);