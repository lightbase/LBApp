
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

var COLUMNS = [{
        "sTitle": "ID",
        "sClass": "base-id",
        "sWidth": "5%",
        "mData": "",
        "sDefaultContent": "",
        "mRender": function (data, type, base) {
            return '<a href="/api/'+ base.metadata.name +'">'+ base.metadata.id_base +'</a>'
        }
    },{
        "sTitle": "Cor",
        "sClass": "base-color",
        "bSortable": false,
        "sWidth": "3%",
        "sDefaultContent": "",
        "mData": "",
        "mRender": function (data, type, base) {
            var base_color = base.metadata.color
            return '<div style="width: 16px; height: 16px; background-color: '+ base_color +';"></div>'
        }
    },{
        "sTitle": "Nome",
        "sClass": "base-name",
        "sWidth": "15%",
        "sDefaultContent": "",
        "mData": "",
        "mRender": function (data, type, base) {
            return '<a href="'+ get_route(base.metadata.name, 'explore_base')+'">'+ base.metadata.name +'</a>'
        }
    },{
        "sTitle": "Descrição",
        "sClass": "base-description",
        "bSortable": false,
        "sWidth": "44%",
        "mData": "metadata.description"
    },{
        "sTitle": "Data",
        "sClass": "base-dt",
        "sWidth": "10%",
        "mData": "metadata.dt_base"
    },{
        "mData": "",
        "sDefaultContent": "",
        "bSortable": false,
        "sTitle": "",
        "sClass": "base-action-buttons",
        "sWidth": "11%",
}];

var get_action_buttons_tpl = function(base){
    return $('<div class="hidden-phone visible-desktop action-buttons">'+
        '<a class="blue view-base-'+ base.metadata.id_base +'" href="#">'+
            '<i class="icon-zoom-in bigger-130"></i>'+
        '</a>'+
        '<a class="grey view-model-'+ base.metadata.id_base +'" href="#">'+
            '<i class="icon-file bigger-130"></i>'+
        '</a>'+
        '<a class="green edit-base-'+ base.metadata.id_base +'" href="'+ get_route(base.metadata.name, 'edit_base') +'">'+
            '<i class="icon-pencil bigger-130"></i>'+
        '</a>'+
        '<a class="blue config-base-'+ base.metadata.id_base +'" href="'+ get_route(base.metadata.name, 'config_base') +'">'+
            '<i class="icon-cog bigger-130"></i>'+
        '</a>'+
        '<a href="/base/'+base.metadata.name+'/download">'+
            '<i class="icon-download-alt bigger-130"></i>'+
        '</a>'+
        '<a class="red delete-base-'+ base.metadata.id_base +'" href="#">'+
            '<i class="icon-trash bigger-130"></i>'+
        '</a>'+
    '</div>'+
    '<div>'+
        '<div>'+
                    '<a href="#" class="tooltip-info view-base-'+ base.metadata.id_base +'" ' +
                        'data-rel="tooltip" title="Base" data-original-title="View">'+
                    '<span class="blue">'+
                        '<i class="fa fa-search-plus fa-lg"></i> '+
                    '</span>'+
                    '</a>'+
                    '&nbsp'+
                    '<a href="'+ get_route(base.metadata.name, 'config_base') +'" class="tooltip-info config-base-'+ base.metadata.id_base +'" ' +
                        'data-rel="tooltip" title="Configurar" data-original-title="View">'+
                    '<span class="grey">'+
                        '<i class="fa fa-cog fa-lg"></i>'+
                    '</span>'+
                    '</a>'+
                    '&nbsp'+
                    '<a href="#" class="tooltip-info view-model-'+ base.metadata.id_base +'" ' +
                        'data-rel="tooltip" title="Modelo" data-original-title="View">'+
                    '<span class="blue">'+
                        '<i class="fa fa-file-code-o fa-lg"></i>'+
                    '</span>'+
                    '</a>'+
                    '&nbsp'+
                    '<a href="'+ get_route(base.metadata.name, 'edit_base') +'" class="tooltip-success edit-base-'+ base.metadata.id_base +'" ' +
                        'data-rel="tooltip" title="Editar" data-original-title="Edit">'+
                    '<span class="green">'+
                        '<i class="fa fa-edit fa-lg"></i>'+
                    '</span>'+
                    '</a>'+
                    '&nbsp'+
                    '<a href="#" class="tooltip-error" delete-base-'+ base.metadata.id_base +'" ' +
                        'data-rel="tooltip" title="Deletar" data-original-title="Delete">'+
                    '<span class="red">'+
                        '<i class="fa fa-trash fa-lg"></i>'+
                    '</span>'+
                    '</a>'+
                    '&nbsp'+
                    '<a href="#" class="tooltip-info" ' +
                        'data-rel="tooltip" title="Compartilhar" data-original-title="Compartilhar" '+
                        'data-toggle="modal" data-target="#shareModal" ' +  
						'data-baseid="' + base.metadata.name+ '">'+
                    '<span class="blue">'+
                        '<i class="fa fa-share fa-lg"></i>'+
                    '</span>'+
                    '</a>'+
        '</div>'+
    '</div>');
}

var formatJson = function(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 4);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    var regex = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;
    return json.replace(regex, function (match) {
        var cls = 'blue';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'dark';
            } else {
                cls = 'green';
            }
        } else if (/true|false/.test(match)) {
            cls = 'blue';

        } else if (/null/.test(match)) {
            cls = 'blue';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

var view_base_event = function(event){
bootbox.alert('<h3 class="blue">'+ event.data.base.metadata.name+'</h3>' +
        '<pre>' + formatJson(event.data.base) + '</pre>',
        function() { });
};


var view_model_event = function(event){
	console.log("Teste de view_model_event");
    bootbox.alert('<h3 class="blue">'+ event.data.base.metadata.name+'</h3>' +
        '<pre>' + formatJson(event.data.base.metadata.model) + '</pre>',
        function() {});
};


var delete_base_event = function(event){
    bootbox.dialog('<h3 class="red">Deletar base '+ event.data.base.metadata.name +' ?</h3>', [{
        "label" : "Deletar Base",
        "class" : "btn btn-danger",
        callback: function() {
            $.ajax({
                type: 'DELETE',
                url: get_route(event.data.base.metadata.name, 'delete_base'),
                cache: false,
                success: function(data, textStatus, jqXHR ){
                    window.location.reload();
                },
                error: function(jqXHR, textStatus, errorThrown){
                }
            });
        }
        },{
            "label" : "Cancelar",
            "class" : "btn btn-light",
        }]
    );
};


$("#datatable").dataTable({
        "bJQueryUI": true,
        "bProcessing": true,
        "bServerSide": true,
        "bPaginate": true,
        "sPageLast": true,
        "bInfo": true,
        "aaSorting": [[0, "asc"]],
        "sAjaxSource": get_route(null, 'list_bases'),
        "aoColumns": COLUMNS,
        "bFilter": true,
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {

            var $action_td = $(nRow).find('.base-action-buttons');
            var $tpl = get_action_buttons_tpl(aData)

            $action_td.append($tpl);
            $action_td.find('[data-rel="tooltip"]').tooltip({placement: 'left'});
            $action_td.find('.view-base-' + aData.metadata.id_base).click({base: aData}, view_base_event);
            $action_td.find('.view-model-' + aData.metadata.id_base).click({base: aData}, view_model_event);
            $action_td.find('.delete-base-' + aData.metadata.id_base).click({base: aData}, delete_base_event);
            //$action_td.find('.share-base-' + aData.metadata.id_base).click({base: aData} );
        },
        //"sDom": "<'row-fluid'<'span2'l><'span2'r><'span2'f>>t<'row-fluid'<'span4'i><'span4'p>>",
        "oLanguage": {
            "oPaginate": {
                "sFirst": "Primeiro",
                "sLast": "Último",
                "sNext": "Próximo",
                "sPrevious": "Anterior"
            },
            "sEmptyTable": "Não foram encontrados registros",
            "sInfo": "<span>Exibindo de <b>_START_</b> até <b>_END_</b> de <b>_TOTAL_</b> registros encontrados.</span>",
            "sInfoEmpty": " ",
            "sInfoFiltered": "",
            "sInfoThousands": ".",
            "sLengthMenu": "Exibir _MENU_ registros",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sSearch": "Pesquisa:",
            "sZeroRecords": "Não foram encontrados registros"
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
                    Utils.error('Por favor Tente novamente mais tarde!');
                }
        });	
    });






