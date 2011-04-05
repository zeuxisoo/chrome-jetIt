(function($) {
	
	debug("Start JetIt");
	
	try {
		var hosts = window.location.host.split(".");
		hosts = clear_subdomain(hosts);
		debug(hosts)
		
		var class_name = hosts.join("_");
		class_name = fix_prefix_class_name(class_name);
		debug(class_name);
		
		var instance = new window[class_name](); 
		debug(instance);
	
		instance.run();
	}catch(e) {
		if (DEBUG === false) {
			alert("Smart Search Enabled...Please check it work or not work after 20min!");
			
			(function(s){
				s.type = 'text/javascript';
				s.src = chrome.extension.getURL('smart.js');
				(document.getElementsByTagName("head").item(0)||document.body).appendChild(s);
			})(document.createElement('script'));
		}else{
			debug(e);	
		}
	}
	
	debug("Ended");
	
})(jQuery);