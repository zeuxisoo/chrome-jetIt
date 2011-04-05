var map_17t17p_com = function() {
	debug('Init 17t17p_com class');
	
	this.run = function() {
		debug('Strat run');
		
		var pid = $("table[id]:eq(0)").attr("id").replace("pid", "");
		
		$("#postmessage_" + pid).html($("#display_infos").html());
		
		debug("Not Ajax just hidden content & Changed Content");
	}
};