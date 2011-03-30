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

function clear_subdomain(hosts) {
	if (/mypagediy|17t17p|livdig/.test(hosts) === true) {
		hosts.shift();
	}
	
	if (hosts.length >= 4) {
		for(var i=0; i<hosts.length-3; i++) {
			hosts.shift();
		}
	}
	
	return hosts;
}

function fix_prefix_class_name(class_name) {
	if (/[0-9]/.test(class_name[0]) == true) {
		class_name = "map_" + class_name;	
	}	
	return class_name;
}