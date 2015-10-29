
var get_route = function(base, route){
    var routes = {
        'edit_base': $('link#edit_base_route').attr('href').replace('_base', base),
        'config_base': $('link#config_base_route').attr('href').replace('_base', base),
        'delete_base': $('link#delete_base_route').attr('href').replace('_base', base),
        'explore_base': $('link#explore_base_route').attr('href').replace('_base', base),
        'list_bases': $('link#list_base_route').attr('href')
    }
    return routes[route];
};


$.ajax({
      type: 'GET',
      url: get_route(null, 'list_bases'),
      async: false,
      data: 'Echo=1&iColumns=6&sColumns=%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=10&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=false&mDataProp_2=&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=true&mDataProp_3=metadata.description&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=false&mDataProp_4=metadata.dt_base&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=true&mDataProp_5=&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1',
      success: function(data, textStatus, jqXHR ){
            console.log('indo buscar base ...');
            BASE = JSON.parse(data);
            var images = ["http://static.bolsademulher.com/sites/default/files/styles/big-featured/public/bicicleta-faz-bem.jpg?itok=zucKeUUu", "http://cursosgratis.blog.br/wp-content/uploads/2012/02/comunicempresarial.jpg", "http://media-cdn.tripadvisor.com/media/photo-s/03/07/61/63/grande-hotel-campos-do.jpg", "http://www.seguronoticias.com/wp-content/uploads/2015/09/sa%C3%BAde-m%C3%A9dico.jpg"]
            $.each(BASE.aaData, function(i, base) {
                var html = '';
                var size = '300';
                if(i == 0) {
                    size = '600';
                }
                html += '<div class="padding lead"><h2><a href="'+get_route(base.metadata.name, 'explore_base')+'">'+base.metadata.name+'</h2></a></div>';
                $("#base"+(i+1)).html(html);
                $("#base"+(i+1)).css({ 
                    backgroundImage: "url('"+images[i]+"')", 
                    backgroundSize: size+"px"
                });

            });
      },
      error: function(jqXHR, textStatus, errorThrown){
            console.error("Erro ao obter a base...");
      }
});



$("#shareModal").on("show.bs.modal", function(event){
        var recipient = $(event.relatedTarget).data('baseid');
        $(event.currentTarget).find('#base_share').val(recipient);
		$('#base_share').val(recipient);
		$('#username_share').val('');
});


$("#share_button").click(function(){
    	var data = {
    		'usernames' : $('#username_share').val(),
    		'base' : $('#base_share').val()
};

$.ajax({
        type : 'POST',
        url : '/base/share',
        data : data,
        cache: false,
        success: function(data, textStatus, jqXHR ){
    				console.log("Requsição enviada com sucesso!");
					$("#shareModal").modal('toggle');
        },
        error: function(jqXHR, textStatus, errorThrown){
                    console.log(jqXHR, textStatus, errorThrown)
					//console.log(JSON.parse(jqXHR['responseText']));
					if(jqXHR['responseText'] != ''){
						Utils.error(jqXHR['responseText']);
					}else{
                        Utils.error('Por favor Tente novamente mais tarde!');
					}
                }
        });	
});






