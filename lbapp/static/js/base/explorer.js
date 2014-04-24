
/*
 * Editable Defaults 
 */

$.fn.editable.defaults.ajaxOptions = {type: "PUT"};
$.fn.editable.defaults.mode = 'popup';
$.fn.editable.defaults.url= window.location;

/*
 * Routes definitions 
 */

var get_route = function(route, id, path){

    var base = $('#base-name').text();
    var routes = {
        'get_base': $('link#get_base_route').attr('href').replace('_base', base),
        'get_registries': $('link#get_registries_route').attr('href').replace('_base', base),
        'delete_reg': $('link#delete_reg_route').attr('href').replace('_base', base)
            .replace('_id', id).replace('_path', path),
        'delete_reg_path': $('link#delete_reg_path_route').attr('href').replace('_base', base)
            .replace('_id', id).replace('_path', path),
    }
    return routes[route];
};

/*
 * Templates
 */

var plus_buttons_tpl = function(){
    return [
        '<a class="green">'+
            '<i class="icon-plus bigger-130"></i>'+
        '</a>',
        '<li>'+
            '<a class="tooltip-success" ' +
                'data-rel="tooltip" title="Ver grupos" data-original-title="Edit">'+
            '<span class="green">'+
                '<i class="icon-plus bigger-120"></i>'+
            '</span>'+
            '</a>'+
        '</li>'
    ];
};

var action_buttons_tpl = function(){
    return '<div class="hidden-phone visible-desktop action-buttons">'+
        '<a class="grey view-reg" href="javascript:void(0)">'+
            '<i class="icon-file bigger-130"></i>'+
        '</a>'+
        '<a class="green edit-reg" href="javascript:void(0)">'+
            '<i class="icon-pencil bigger-130"></i>'+
        '</a>'+
        '<a class="red delete-reg" href="javascript:void(0)">'+
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
                    '<a href="javascript:void(0)" class="tooltip-info view-reg" ' +
                        'data-rel="tooltip" title="Modelo" data-original-title="View">'+
                    '<span class="grey">'+
                        '<i class="icon-file bigger-120"></i>'+
                    '</span>'+
                    '</a>'+
                '</li>'+
                '<li>'+
                    '<a href="javascript:void(0)" class="tooltip-success edit-reg" ' +
                        'data-rel="tooltip" title="Editar" data-original-title="Edit">'+
                    '<span class="green">'+
                        '<i class="icon-edit bigger-120"></i>'+
                    '</span>'+
                    '</a>'+
                '</li>'+
                '<li>'+
                    '<a href="javascript:void(0)" class="tooltip-error delete-reg" ' +
                        'data-rel="tooltip" title="Deletar" data-original-title="Delete">'+
                    '<span class="red">'+
                        '<i class="icon-trash bigger-120"></i>'+
                    '</span>'+
                    '</a>'+
                '</li>'+
            '</ul>'+
        '</div>'+
    '</div>';
}

var default_column_tpl = function () {
    return {
        "sTitle": '<a class="add-reg icon-plus-sign bigger-120" href="javascript:void(0);" data-tooltip="tooltip" title="Adicionar registro"></a>',
        "sClass": '',
        "bSortable": false,
        "sWidth": "7%",
        "sDefaultContent": "",
        "mData": '',
        "mRender": function (data, type, source) {
            return action_buttons_tpl();
        }
    }
};

var inner_table_tpl = function (id){
    return ''+ 
     '<table id="'+id+'">'+
        '<thead>'+
        '</thead>'+
        '<tbody>'+
        '</tbody>'+
    '</table>';
};

var inner_wrapper_tpl = function (){
    return '<div class="innerDetails"></div>';
};

var sDom_tpl = function () {
    return ""+
    "<'row-fluid'"+
        "<'span4'l>"+
        "<'span2'r>"+
        "<'span3'C<'clear'>>"+
        "<'span3'f>"+
    ">"+
    "t"+
    "<'row-fluid'"+
        "<'span6'i>"+
        "<'span6'p>"+
    ">"; 
};

/*
 * Events
 */

var view_reg_event = function(e){
    var registry = e.data.json_reg == undefined? e.data: e.data.json_reg;
    delete registry[''];
    bootbox.dialog('<h3 class="blue">JSON</h3>' +
        '<pre>' + Utils.formatJson(registry) + '</pre>',
    [{
        "label" : "Fechar",
        "class" : "btn-small btn-primary",
    }]);
};

var edit_reg_event = function(e){
    $(this).closest('tr').find('.editable').editable('toggleDisabled');
};

var delete_reg_event = function(e){
    var path = $(this).closest('tr').attr('id');
    var id_reg = path.split('-')[1];
    var real_path = path.split('-').length > 2? path.split('-').slice(2).join('-'): null;
    if (real_path)
        var url = get_route('delete_reg_path', id_reg, to_path(real_path));
    else
        var url = get_route('delete_reg', id_reg);
    bootbox.dialog('<h3 class="red">Deletar registro?</h3>', [{
        "label" : "Deletar",
        "class" : "btn btn-danger",
        callback: function() {
            $.ajax({
                type: 'DELETE',
                url: url,
                success: function(data, textStatus, jqXHR ){
                    window.location.reload();
                },
                error: function(jqXHR, textStatus, errorThrown){
                    Utils.error();
                }
            });
        }
        },{
            "label" : "Cancelar",
            "class" : "btn btn-light",
        }]
    );
};

var download_file_event = function(e){
    if (!$(this).hasClass('editable-disabled')) return;
    bootbox.dialog('<h3 class="blue">'+$(this).text()+'</h3><h4>Baixar arquivo ?</h4>', [{
        "label" : "Baixar",
        "class" : "btn btn-success",
        callback: function() {
            $.ajax({
                type: 'GET',
                url: '',
            });
        }
        },{
            "label" : "Cancelar",
            "class" : "btn btn-light",
        }]
    );
}

var display_json_event = function (e) {
    if (!$(this).hasClass('editable-disabled')) return;
    var field_name = $(this).prev().data().fieldAlias;
    var json = $(this).prev().text();
    bootbox.dialog('<h3 class="blue">'+ field_name +'</h3>' +
        '<pre>' + Utils.formatJson(json) + '</pre>',
    [{
        "label" : "Fechar",
        "class" : "btn-small btn-primary",
    }]);
};

/*
 * Page Scripts
 */

var to_path = function(str){
    return str.replace(/-/g, '.').replace(/(^|\.)([0-9]+)($|\.)/g, '[$2]$3');
};

var config_editables = function(editables){
    $(editables).each(function(i, editable){

        var tr_id = $(editable).closest('tr').attr('id');
        var editable_id = tr_id + '-' + $(editable).attr('data-title');
        var path = editable_id.split('-').slice(2).join('-');
        var real_path = to_path(path);

        $(editable).attr('name', editable_id);
        $(editable).attr('id', real_path);
        $(editable).attr('data-pk', tr_id.split('-')[1]);
        $(editable).on('hidden', function(e, reason){
            if(reason === 'save' || reason === 'nochange') {
                var next = $(this).parent('td').next().find('.editable');
                next.editable('show');
            }
        });
        $(editable).editable('toggleDisabled');
    })
};

var Cell = function (struct, data){
    this.init(struct, data);
};

Cell.prototype = {

    init: function(struct, data){
        this.struct = struct;
        this.data = data;
    },

    wrapper_tpl: '<div class="multi"></div>',

    editable_tpl: function (data){
        if (data == undefined) data = this.data;
        return '<a href="javascript:void(0)" '+
           ' data-type="'+this.struct.datatype.toLowerCase()+'"'+
           ' data-title="'+this.struct.name+'"'+
           ' class="editable editable-click">'+data+'</a>';
    },

    file_download_tpl: function (file) {
        var edit_tpl = $(this.editable_tpl());
        if (file){
            edit_tpl.addClass('file-content');
            edit_tpl.html('<span class="blue">' + file.nome_doc + '</span>');
        }
        return this.to_html(edit_tpl);
    },

    json_tpl: function (json) {
        var edit_tpl = $(this.editable_tpl());
        edit_tpl.addClass('json-content');
        edit_tpl.html('<span class="blue">JSON</span>');
        return '<div data-field-alias="'+this.struct.alias+'" class="hidden">'+
            Utils.stringify(json)+'</div>' + this.to_html(edit_tpl);
    },

    get_content: function (){
        var field = Fields.get_field(this.struct);
        if (this.struct.multivalued)
            var content = this.get_multi_content(field);
        else if (field instanceof Fields.mapping.FileDataType)
            var content = this.file_download_tpl(this.data);
        else if (field instanceof Fields.mapping.JsonDataType)
            var content = this.json_tpl(this.data);
        else
            var content = this.editable_tpl();
        return content;
    },

    get_multi_content: function (field){
        var wrapper = $(this.wrapper_tpl);
        var self = this;

        if (field instanceof Fields.mapping.FileDataType && Utils.type_of(this.data) == 'array'){
            this.data.forEach(function(val){
                self.add_to_wrapper(wrapper, self.file_download_tpl(val));
            });
        }
        else if (field instanceof Fields.mapping.JsonDataType && Utils.type_of(this.data) == 'array'){
            this.data.forEach(function(val){
                self.add_to_wrapper(wrapper, self.json_tpl(val));
            });
        }
        else if (Utils.type_of(this.data) == 'array'){
            this.data.forEach(function(val){
                var editable_tpl = self.editable_tpl(val);
                self.add_to_wrapper(wrapper, editable_tpl);
            });
        }
        return this.to_html(wrapper);
    },

    add_to_wrapper: function (wrapper, child) {
        if (wrapper.children().length > 0){
            var hr = $('<hr/>');
            wrapper.append(hr);
            wrapper.append(child);
        }
        else
            wrapper.append(child);
    },

    to_html: function (dom) {
        return $(dom).wrap('<div>').parent().html();
    }

}; 

var RegForm = function (base) {
    this.init(base);
};

RegForm.prototype = $.extend({ }, Cell.prototype, {

    init: function(base){
        this.base = base;
    },

    editables: [ ],

    wrapper_tpl: '<div class="new-reg"></div>',

    icon_tpl: '<i class="icon-double-angle-right grey"></i>',

    header_tpl: function (label) {
        return  '<h3 class="blue">'+label+'</h3>';
    },

    row_tpl: function (struct, editable) {
        var row = $('<tr>'+
            '<td width="40%">'+struct.alias+'</td>'+
            '<td></td>'+
        '</tr>');
        $(row.find('td')[1]).append(editable);
        return row;
    },

    editable_tpl: function (struct) {
        var a = '<a href="javascript:void(0)" '+
           ' data-type="'+struct.datatype.toLowerCase()+'"'+
           ' data-title="'+struct.name+'"'+
           ' class="editable editable-click"></a>';
        var editable = $(a).editable();
        $(editable).on('hidden', function(e, reason){
            if(reason === 'save' || reason === 'nochange') {
                var next = $(this).parent('td').parent('tr').next().find('.editable');
                next.editable('show');
            }
        });
        this.editables.push(editable);
        return editable;
    },

    html: function (base, table_id, label) {

        if (!base) {
            base = this.base;
            label = this.base.metadata.alias || this.base.metadata.name;
            table_id = this.base.metadata.name;
        }
        else {
            label = label + ' ' + this.icon_tpl + ' ' + base.metadata.alias;
            table_id = table_id + '-' + base.metadata.name;
        }

        var table = $(inner_table_tpl(table_id)).addClass('table table-bordered table-striped');
        var tbody = table.find('tbody');
        var self = this;

        var wrapper = $(this.wrapper_tpl);
        wrapper.append(this.header_tpl(label)).append(table);

        $(base.content).each(function (i, struct) {
            if (struct.field){
                var row = $(self.row_tpl(struct.field, self.editable_tpl(struct.field)));
                tbody.append(row);
            }
            else if (struct.group && !struct.group.metadata.multivalued){
                var inner_html = self.html(struct.group, table_id, label);
                wrapper.append(inner_html);
            }
        });

        return wrapper;
    },

    set_value: function (object, path, value) {

        path.forEach(function (node, index) {
            if (index == path.length - 1){
                object[node] = value;
            }
            else if (!(node in object)){
                object[node] = { };
                object = object[node];
            }
            else {
                object = object[node];
            }
        });
    },

    validate: function () {
        var data = { };
        var self = this;

        $(this.editables).each(function (i, editable) {
            var table_id = editable.parents('table').attr('id');
            var field_name = editable.attr('data-title');
            var path = table_id.split('-');
            var value = $(editable).editable('getValue', true);
            path.push(field_name);
            path = path.slice(1); // remove base
            self.set_value(data, path, value)
        });

        return data;
    },

    submit: function (data) {
        $.ajax({
            type: 'POST',
            data: {
                path: 'path',
                value: JSON.stringify(data),
            }, 
            url: window.location, 
            async: false,
            success: function(data, textStatus, jqXHR ){
                alert(1)
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(2)
            }
        });
    }
});

/*
 * DataTable Data Scripts 
 */

var get_table_data = function (base, depth) {
    var table_data = {
        base: base,
        name: base.metadata.name,
        alias: base.metadata.alias,
        description: base.metadata.description,
        multivalued: base.metadata.multivalued,
        columns: [default_column_tpl()],
        inner_tables: [ ] 
    };
    base.content.forEach(function(struct, index){
        if (struct.field){
            if ($.inArray('Ordenado', struct.field.indices) != -1 || 
                $.inArray('Unico', struct.field.indices) != -1)
                var bSortable = true;  
            else
                var bSortable = false;  

            var bVisible = index > 5? false: true;

            table_data.columns.push({
                "sTitle": '<a data-toggle="tooltip" title="" data-original-title="'+
                    struct.field.description+'">'+struct.field.alias+'</a>',
                //"sClass": 'ws word',
                "bSortable": bSortable,
                "bVisible": bVisible, 
                "sDefaultContent": "",
                "mData": depth == undefined? 'json_reg.' + struct.field.name: struct.field.name,
                "mRender": function (data, type, source) {
                    return new Cell(struct.field, data).get_content();
                },
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                },
            });
        }
        else if (struct.group){
            var _root = depth? false: true;
            var inner_table = {
                root: _root, 
                base: struct.group,
                name: struct.group.metadata.name,
                alias: struct.group.metadata.alias,
                description: struct.group.metadata.description,
                multivalued: struct.group.metadata.multivalued,
                content: get_table_data(struct.group, struct.group.metadata.name)
            };
            table_data.inner_tables.push(inner_table);
        }
    });
    return table_data;
};

var get_inner_table = function (table, registries, par_id) {
    var title_class = table.multivalued? 'add-reg icon-plus-sign bigger-120': '';
    table.content.columns[0].sTitle = 
        '<a class="'+ title_class +'"'+
            'href="javascript:void(0);" data-tooltip="tooltip" title="Adicionar registro"></a>'+
        '<a data-toggle="tooltip" title="" data-original-title="'+ 
        table.description+'">'+table.alias+'</a>';
    var table_id = par_id + '-' + table.name;
    if (registries == undefined){
        registries = [ ];
    }
    else if (Utils.type_of(registries) != 'array'){
        registries = [registries];
    }
    var data_table = $(inner_table_tpl(table_id)).dataTable({
        "bInfo": true,
        "aaData": registries,
        "aoColumns": table.content.columns,
        "bFilter": true,
        "fnRowCallback": fnRowCallback(table.content),
        "fnDrawCallback": fnDrawCallback(table.base),
        "oLanguage": {
            "sEmptyTable": "Não foram encontrados registros",
            "sZeroRecords": "Não foram encontrados registros"
        }
    });
    return $(inner_wrapper_tpl()).append(data_table);
};

/*
 * DataTable Callbacks
 */

var fnRowCallback = function (table_data) {
    return function (nRow, aData, iDisplayIndex) {
        var editables = $(nRow).find('.editable');
        var $action_td = $(nRow).find('.action-buttons');
        var $hidden_ul = $(nRow).find('ul');
        var oTable = this;

        if (oTable.attr('id') == 'datatable')
            var row_id = 'reg-' + aData.json_reg.id_reg;
        else if(table_data.multivalued)
            var row_id = oTable.attr('id') + '-' + iDisplayIndex;
        else
            var row_id = oTable.attr('id');
        $(nRow).attr('id', row_id);

        config_editables(editables);
        $('[data-toggle="tooltip"]').tooltip();

        $action_td.find('.view-reg').click(  aData, view_reg_event);
        $action_td.find('.edit-reg').click(  aData, edit_reg_event);
        $action_td.find('.delete-reg').click(aData, delete_reg_event);
        $hidden_ul.find('.view-reg').click(  aData, view_reg_event);
        $hidden_ul.find('.edit-reg').click(  aData, edit_reg_event);
        $hidden_ul.find('.delete-reg').click(aData, delete_reg_event);
        editables.filter('.file-content').click(download_file_event);
        editables.filter('.json-content').click(display_json_event);

        if (table_data.inner_tables.length > 0){
            var plus_btn = plus_buttons_tpl();
            var td_btn = $(plus_btn[0]);
            var ul_btn = $(plus_btn[1]);
            $action_td.append(td_btn);
            //$hidden_ul.append(ul_btn);
            
            td_btn.click(function () {
                var _inner_tables = [ ];
                table_data.inner_tables.forEach(function(table, index){
                    if (table.root) var data = aData.json_reg;
                    else var data = aData;
                    data = data[table.name]
                    _inner_tables.push(get_inner_table(table, data, row_id));
                });

                if ($(this.children).hasClass('icon-plus')) {
                    $(this.children).removeClass('icon-plus').addClass('icon-minus');
                    var nDetailsRow = oTable.fnOpen(nRow, _inner_tables, 'details');
                    $('div.innerDetails', nDetailsRow).slideDown();
                 }
                 else {
                    $(this.children).removeClass('icon-minus').addClass('icon-plus');
                    $('div.innerDetails', $(nRow).next()[0]).slideUp(function(){
                          oTable.fnClose(nRow);
                    });
                 }
                $('[data-toggle="tooltip"]').tooltip();
            });
        }
    };
};

var fnDrawCallback = function (base) {
    return function (oSettings) {
        $(this).find('.add-reg').click(function (e) {
            var form = new RegForm(base);
            bootbox.confirm(form.html(), function(result) {
                if (result) {
                    var data = form.validate();
                    if (data) form.submit(data);
                    else return false;
                }
            }); 
        });
    };
};

/*
 * Main DataTable
 */

var BASE = { };

$.ajax({
    type: 'GET',
    url: get_route('get_base'),
    async: false,
    success: function(data, textStatus, jqXHR ){
        BASE = JSON.parse(data);
    },
});

var TABLE_DATA = get_table_data(BASE.json_base);

var explorer = $("#datatable").dataTable({
    "bJQueryUI": false,
    "bProcessing": true,
    "bServerSide": true,
    "bPaginate": true,
    "sPageLast": false,
    "bInfo": true,
    "aaSorting": [[0, "asc"]],
    "sAjaxSource": get_route('get_registries'),
    "aoColumns": TABLE_DATA.columns,
    "bFilter": true,
    "fnRowCallback" : fnRowCallback(TABLE_DATA),
    "fnDrawCallback" : fnDrawCallback(TABLE_DATA.base),
    "sDom": sDom_tpl(),
    "oColVis": {
        "buttonText": "Mudar Colunas",
        "bShowAll": true,
         "aiExclude": [ 0 ]
    },
    "oLanguage": {
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

