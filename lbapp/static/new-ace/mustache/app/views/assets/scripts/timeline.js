jQuery(function($) {
	$('[data-toggle="buttons-radio"]').on('click', function(e){
		var target = $(e.target);
		var which = parseInt($.trim(target.text()));
		$('[id*="timeline-"]').hide();
		$('#timeline-'+which).show();
	});
});
