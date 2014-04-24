
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
        "mRender": function (data, type, full) {
            return '<a href="/api/'+ full.nome_base+'">'+ full.id_base +'</a>'
        }
    },{
        "sTitle": "Cor",
        "sClass": "base-color",
        "bSortable": false,
        "sWidth": "3%",
        "sDefaultContent": "",
        "mData": "",
        "mRender": function (data, type, full) {
            var base_color = full.json_base.metadata.color
            return '<div style="width: 16px; height: 16px; background-color: '+ base_color +';"></div>'
        }
    },{
        "sTitle": "Nome",
        "sClass": "base-name",
        "sWidth": "15%",
        "sDefaultContent": "",
        "mData": "",
        "mRender": function (data, type, full) {
            return '<a href="'+ get_route(full.nome_base, 'explore_base')+'">'+ full.nome_base +'</a>'
        }
    },{
        "sTitle": "Descrição",
        "sClass": "base-description",
        "bSortable": false,
        "sWidth": "45%",
        "mData": "json_base.metadata.description"
    },{
        "sTitle": "Data",
        "sClass": "base-dt",
        "sWidth": "10%",
        "mData": "dt_base"
    },{
        "mData": "",
        "sDefaultContent": "",
        "bSortable": false,
        "sTitle": "",
        "sClass": "base-action-buttons",
        "sWidth": "10%",
}];

var get_action_buttons_tpl = function(base){
    return $('<div class="hidden-phone visible-desktop action-buttons">'+
        '<a class="blue view-base-'+ base.id_base +'" href="#">'+
            '<i class="icon-zoom-in bigger-130"></i>'+
        '</a>'+
        '<a class="grey view-model-'+ base.id_base +'" href="#">'+
            '<i class="icon-file bigger-130"></i>'+
        '</a>'+
        '<a class="green edit-base-'+ base.id_base +'" href="'+ get_route(base.nome_base, 'edit_base') +'">'+
            '<i class="icon-pencil bigger-130"></i>'+
        '</a>'+
        '<a class="blue config-base-'+ base.id_base +'" href="'+ get_route(base.nome_base, 'config_base') +'">'+
            '<i class="icon-cog bigger-130"></i>'+
        '</a>'+
        '<a class="red delete-base-'+ base.id_base +'" href="#">'+
            '<i class="icon-trash bigger-130"></i>'+
        '</a>'+
    '</div>'+
    '<div class="hidden-desktop visible-phone">'+
        '<div class="inline position-relative">'+
            '<button class="btn btn-minier btn-yellow dropdown-toggle" data-toggle="dropdown">'+
                '<i class="icon-caret-down icon-only bigger-120"></i>'+
            '</button>'+
            '<ul class="dropdown-menu dropdown-icon-only dropdown-yellow pull-right dropdown-caret '+
                    'dropdown-close">'+
                '<li>'+
                    '<a href="#" class="tooltip-info view-base-'+ base.id_base +'" ' +
                        'data-rel="tooltip" title="Base" data-original-title="View">'+
                    '<span class="blue">'+
                        '<i class="icon-zoom-in bigger-120"></i>'+
                    '</span>'+
                    '</a>'+
                '</li>'+
                '<li>'+
                    '<a href="'+ get_route(base.nome_base, 'config_base') +'" class="tooltip-info config-base-'+ base.id_base +'" ' +
                        'data-rel="tooltip" title="Configurar" data-original-title="View">'+
                    '<span class="blue">'+
                        '<i class="icon-cog bigger-120"></i>'+
                    '</span>'+
                    '</a>'+
                '</li>'+
                '<li>'+
                    '<a href="#" class="tooltip-info view-model-'+ base.id_base +'" ' +
                        'data-rel="tooltip" title="Modelo" data-original-title="View">'+
                    '<span class="grey">'+
                        '<i class="icon-file bigger-120"></i>'+
                    '</span>'+
                    '</a>'+
                '</li>'+
                '<li>'+
                    '<a href="'+ get_route(base.nome_base, 'edit_base') +'" class="tooltip-success edit-base-'+ base.id_base +'" ' +
                        'data-rel="tooltip" title="Editar" data-original-title="Edit">'+
                    '<span class="green">'+
                        '<i class="icon-edit bigger-120"></i>'+
                    '</span>'+
                    '</a>'+
                '</li>'+
                '<li>'+
                    '<a href="#" class="tooltip-error" delete-base-'+ base.id_base +'" ' +
                        'data-rel="tooltip" title="Deletar" data-original-title="Delete">'+
                    '<span class="red">'+
                        '<i class="icon-trash bigger-120"></i>'+
                    '</span>'+
                    '</a>'+
                '</li>'+
            '</ul>'+
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
    bootbox.dialog('<h3 class="blue">'+ event.data.data.nome_base +'</h3>'+
        '<pre>' + formatJson(event.data.data.json_base) + '</pre>',
    [{
        "label" : "Fechar",
        "class" : "btn-small btn-primary",
    }]);
};

var view_model_event = function(event){
    bootbox.dialog('<h3 class="blue">'+ event.data.data.nome_base +'</h3>' +
        '<pre>' + formatJson(event.data.data.reg_model) + '</pre>',
    [{
        "label" : "Fechar",
        "class" : "btn-small btn-primary",
    }]);
};

var delete_base_event = function(event){
    bootbox.dialog('<h3 class="red">Deletar base '+ event.data.data.nome_base +' ?</h3>', [{
        "label" : "Deletar Base",
        "class" : "btn btn-danger",
        callback: function() {
            $.ajax({
                type: 'DELETE',
                url: get_route(event.data.data.nome_base, 'delete_base'),
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
    "bJQueryUI": false,
    "bProcessing": true,
    "bServerSide": true,
    "bPaginate": true,
    "sPageLast": false,
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
        $action_td.find('.view-base-' + aData.id_base).click({data: aData}, view_base_event);
        $action_td.find('.view-model-' + aData.id_base).click({data: aData}, view_model_event);
        $action_td.find('.delete-base-' + aData.id_base).click({data: aData}, delete_base_event);
    },
    "sDom": "<'row-fluid'<'span4'l><'span4'r><'span4'f>>t<'row-fluid'<'span6'i><'span6'p>>",
    "oLanguage": {
        "oPaginate": {
            "sFirst": "<<",
            "sLast": ">>",
            "sNext": ">",
            "sPrevious": "<"
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

