/*
 * Author  : Zeuxis Lo (http://zeuxis.me)
 * Version : 0.2.4
 * Create  : 2011-03-14 14:07
 * Modified: 2011-03-29 11:44
 */

// Configure (Because optional page added, so commented)
//var DEBUG = false;

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

function is_subdomain(hosts) {
	if (/mypagediy/.test(hosts) === true) {
		hosts[0] = hosts[1] + "." + hosts[2];
	}
	
	return hosts;
}

// Class
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

var tenkucity_com = function() {
	debug('Init tenkucity_com class');
	
	this.run = function() {
		debug('Strat run');
		
		var $post_block = $("table.fo:first-child").parent();
		var pid = $post_block.attr("id").replace("post_", "");
		var tid = window.location.pathname.match(/thread-(\d+)-\d+-\d+\.html/)[1];
		
		debug("Block: " + $post_block);
		debug("PID: " + pid);

		ajax_it("http://" + window.location.host + "/forum.php", "mod=viewthread&display=true&tid=" + tid + "&viewpid=" + pid + "&inajax=1", "xml").success(function(xml_doc) {
			debug(xml_doc);
			
			var content = $("root", xml_doc).text();
			
			debug(content);
			
			$post_block.html(content);
			
			debug("Ended Ajax & Changed Content");
		});
	}
};

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

var mypagediy_com = function() {
	debug('Init mypagediy_com class');
	
	this.run = function() {
		debug('Strat run');
		
		$("#hidden-content").show();
		
		debug("Not Ajax just hidden content & Changed Content");
	}
};

var ideapit_net = function() {
	debug('Init ideapit_net class');
	
	this.run = function() {
		debug('Strat run');
		
		$("#hiden_content").show();
		
		debug("Not Ajax just hidden content & Changed Content");
	}
};

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

var akzone_com_hk = function() {
	debug("Init akzone_com_hk class");
	
	this.run = function() {
		debug("Start run");
		
		var url = window.location.href;
		var id = url.match(/id=(\d+)/)[1];
		
		debug("URL: " + url)
		debug("ID: " + id)
		
		$.get("http://akzone.com.hk/fb_like.php", {
			"zone": "forum",
			"id": id,
			"url": url	
		}, function(html) {
			window.location.reload();
		});
	}
	
};

(function($) {	
	
	debug("Start JetIt");
	
	try {
		var hosts = window.location.host.match(/^(?:[0-9a-zA-Z]+\.)?([0-9a-zA-Z]+)\.([0-9a-zA-Z]+)/);
		hosts = is_subdomain(hosts);
		debug(hosts)
		
		var class_name = hosts[0].replace(/\./g, "_"); 
		debug(class_name);
		
		var instance = new window[class_name](); 
		debug(instance);
	
		instance.run();
	}catch(e) {
		if (DEBUG === false) {
			alert("Not Supported site");
		}else{
			debug(e);	
		}
	}
	
	debug("Ended");
	
})(jQuery);