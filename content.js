/*
 * Author  : Zeuxis Lo (http://zeuxis.me)
 * Version : 0.2
 * Create  : 2011-03-14 14:07
 * Modified: 2011-03-15 13:28
 */

// Configure
DEBUG = false;

// Helper
function debug(message) {
	if (DEBUG === true) {
		console.log(message);
	}
}

function ajax_it(url, data, data_type) {
	return $.ajax({
		"header": {
			"User-Agent": "	Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; en-US; rv:1.9.2.15) Gecko/20110303  Firefox/3.6.15",
			"X-Alt-Referer": document.location.href
		},
		"url": url,
		"data": data,
		"cache": false,
		"dataType": data_type
	});	
}

// Class
var getjetso_com = function() {
	debug('Init getjetso class');
	
	this.run = function() {
		debug('Strat run');
		
		var $post_block = $(".viewthread:first-child .postmessage .t_msgfont");
		var pid = $post_block.attr("id").replace("postmessage_", "");
		
		debug("Block: " + $post_block);
		debug("PID: " + pid);
		
		ajax_it("http://www.getjetso.com/forum/viewthread.php", "action=paging&pid=" + pid + "&inajax=1", "xml").success(function(xml_doc) {
			debug(xml_doc);
			
			var content = $("root", xml_doc).text();
			
			debug(content);
			
			$post_block.html(content);
			
			debug("Ended Ajax & Changed Content");
		});
	}
};

var tenkucity_com = function() {
	debug('Init tenkucity class');
	
	this.run = function() {
		debug('Strat run');
		
		var $post_block = $("table.fo:first-child").parent();
		var pid = $post_block.attr("id").replace("post_", "");
		var tid = window.location.pathname.match(/thread-(\d+)-\d+-\d+\.html/)[1];
		
		debug("Block: " + $post_block);
		debug("PID: " + pid);

		ajax_it("http://tenkucity.com/forum.php", "mod=viewthread&display=true&tid=" + tid + "&viewpid=" + pid + "&inajax=1", "xml").success(function(xml_doc) {
			debug(xml_doc);
			
			var content = $("root", xml_doc).text();
			
			debug(content);
			
			$post_block.html(content);
			
			debug("Ended Ajax & Changed Content");
		});
	}
};

(function($) {
	
	debug("Start JetIt");
	
	var instance = new window[window.location.host.replace("www.", "").replace(".", "_")]();
	
	debug(instance);
	
	instance.run();
	
	debug("Ended");
	
})(jQuery);