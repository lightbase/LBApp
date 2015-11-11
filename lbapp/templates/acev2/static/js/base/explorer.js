
/*
 * Editable Defaults 
 */

//$.fn.editable.defaults.mode = 'popup';
$.fn.editable.defaults.mode = 'inline';


/*
 * Routes definitions 
 */

var get_route = function(route, id, path){

    var base = $('#base-name').text();
    console.log('obtendo route : ' + route);
    var routes = {
        'get_base': $('link#get_base_route').attr('href').replace('_base', base),
        'get_registries': $('link#get_registries_route').attr('href').replace('_base', base),
        'delete_reg': $('link#delete_reg_route').attr('href').replace('_base', base)
            .replace('_id', id).replace('_path', path),
        'delete_reg_path': $('link#delete_reg_path_route').attr('href').replace('_base', base)
            .replace('_id', id).replace('_path', path),
        'create_reg': $('link#create_reg').attr('href').replace('_base', base)
    }
    console.log('rota obtida  :'  + routes[route]);
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

/**
 * Retorna o template para a coluna padrão da tabela, que será utilizado na renderização de cada
 * linha da tabela.
 * @returns {string} template da coluna padrão
 */
var get_default_column_actions_tpl = function(){
    // TODO : Corrigir ícones
    return '<div class="hidden-phone visible-desktop action-buttons">'+
        '<a class="blue view-reg" href="javascript:void(0)">'+
            '<i class="fa fa-search-plus fa-lg"></i>'+
        '</a>'+
        '<a class="green edit-reg" href="javascript:void(0)">'+
            '<i class="fa fa-edit fa-lg"></i>'+
        '</a>'+
        '<a class="red delete-reg" href="javascript:void(0)">'+
            '<i class="fa fa-trash fa-lg"></i>'+
        '</a>'+
    '</div>'
    // TODO : Verificar  por que aparece no desktop e corrigir css para mobile
    /*
    +'<div class="hidden-desktop visible-phone">'+
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
                        '<i class="icon-trash bigger-120">Deletar</i>'+
                    '</span>'+
                    '</a>'+
                '</li>'+
            '</ul>'+
        '</div>'+
    '</div>';
    */
}

/**
 * Retorna a coluna padrão da tabela, que é a primeira coluna, que possui o link para inserção de registro.
 * Na renderização de cada linha, será renderizado o que foi definido em mRender.
 * @returns {{sTitle: string, sClass: string, bSortable: boolean, sWidth: string, sDefaultContent: string, mData: string, mRender: Function}}
 */
var get_default_column_table = function () {
    return {
        "sTitle": '<a class="add-reg icon-plus-sign bigger-120" href="javascript:void(0);" data-tooltip="tooltip" title="Adicionar registro">+</a>',
        "sClass": '',
        "bSortable": false,
        "sWidth": "9%",
        "sDefaultContent": "",
        "mData": '',
        "mRender": function (data, type, source) {
            return get_default_column_actions_tpl();
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
 * Eventos relacionados a cada linha de registros.
 */

var view_reg_event = function(e){
    var registry = e.data;
    delete registry[''];
    bootbox.dialog(
    {
        "message" : '<h3 class="blue">JSON</h3>' + '<pre>' + Utils.formatJson(registry) + '</pre>',
        "label" : "Fechar",
        "class" : "btn-small btn-primary",
    });
};

var edit_reg_event = function(e){
    // JSON que irá conter todos os registros da linha.
    // id_reg irá representar o ID do registro a ser editado.
    var rowValue = {};
    rowValue['id_reg'] = $(this).closest('tr').attr('id');

    // TODO : Verificar como será feito para uma base grande onde
    // TODO : todas as colunas não estão contidas na tabela
    $(this).closest('tr').find('.editable').each(function(i, cell){
        var cell = $(cell);
        rowValue[cell.data('title')] = cell.text();
    });

    var form = new RegForm(TABLE_DATA.base, rowValue);

    bootbox.confirm(form.html(), function(result) {
        //console.log('result : ' + result);
        if (result) {
            var data = form.validate();
            //console.log('validado..');
            if (data) form.update(data);
            else return false;
        }
    });

};

var delete_reg_event = function(e){
    var path = $(this).closest('tr').attr('id');
    var id_reg = path.split('-')[1];
    var real_path = path.split('-').length > 2? path.split('-').slice(2).join('-'): null;
    if (real_path)
        var url = get_route('delete_reg_path', id_reg, to_path(real_path));
    else
        var url = get_route('delete_reg', id_reg);
    bootbox.dialog( {
        message : '<h3 class="red">Deseja realmente deletar o registro ?</h3>',
        buttons : {
            confirm : {
                label: "Sim",
                className: "btn btn-danger",
                callback: function () {
                    $.ajax({
                        type: 'DELETE',
                        url: url,
                        success: function (data, textStatus, jqXHR) {
                            // Registro deletado com sucesso
                            $("#datatable").dataTable().fnDraw();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log('Erro ao deletar registros..');
                        }
                    });
                }
            },
            cancel : {
            label : "Não",
            class : "btn btn-light"
            }
        }
    });
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

        // Forma id do elemento : reg-<id>-<descrição campo>
        var tr_id = $(editable).closest('tr').attr('id');
        var editable_id = tr_id + '-' + $(editable).attr('data-title');

        var path = editable_id.split('-').slice(2).join('-');
        var real_path = to_path(path);

        $(editable).attr('name', editable_id);
        $(editable).attr('id', real_path);
        $(editable).attr('data-pk', tr_id.split('-')[1]);
        /* Não será necessário, pois células não serão editáveis
        $(editable).on('hidden', function(e, reason){
            if(reason === 'save' || reason === 'nochange') {
                console.log("save2="+editable_id);
                var next = $(this).parent('td').next().find('.editable');
                next.editable('show');
            }
        });*/
        $(editable).editable('toggleDisabled');
    })
};

var getFieldEditableOptions = function(field, value){
    var options = {};
    var datatype = field.datatype.toLowerCase();
    // Funções de validações
    var requiredField = function(){
      if(field.required){
        if (value !== undefined && value.trim() == '') {
            return 'This field is required';
        }
      }
    };
    var isEmailValid = function(value){
        var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!re.test(value)){
            return 'This field isn\'t a valid email address.';
        };
    };

    var isUrlValid = function(value){
        var re = /^HTTP|HTTP|http(s)?:\/\/(www\.)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,40}(:[0-9]{1,40})?(\/.*)?$/;
        if(!re.test(value)){
            return 'This field isn\'t a valid URL.';
        };
    };

    var isNumberValid = function(value){
      var re = /^-{0,1}\d*$/;
      if(!re.test(value)){
          return 'This field isn\'t a valid number.';
      };
    };

    var isDecimalValid = function(value){
      var re = /^-{0,1}\d*\.{0,1}\d+$/;
      if(!re.test(value)){
          return 'This field isn\'t a valid decimal.';
      };
    };

    var functions = {};
    functions['email'] = isEmailValid;
    functions['url'] = isUrlValid;
    functions['integer'] = isNumberValid;
    functions['decimal'] = isDecimalValid;

    var defaultOptions = {
        type : datatype,
        title : field.name,
        value : value,
        validate : function(value){
            requiredField();
            // Validar outros campos
            var functionValida = functions[datatype];
            if(functionValida !== undefined){
                var retorno = functionValida(value);
                if(retorno !== undefined){
                    return retorno;
                }
            }
        }
    };
    options['date'] = {
        type : 'combodate',
        title : field.name,
        value : value,
        format: 'DD/MM/YYYY',
        viewFormat: 'DD/MM/YYYY',
        template: 'DD/MM/YYYY',
        combodate :{
            maxYear : 2020
        },
        validate : function(value){
            requiredField();
            // Validar outros campos
        }
    };
    options['datetime'] = {
        type : 'combodate',
        title : field.name,
        value : value,
        format: 'DD/MM/YYYY hh:mm:ss',
        viewFormat: 'DD/MM/YYYY hh:mm:ss',
        template: 'DD/MM/YYYY hh:mm:ss',
        combodate :{
            maxYear : 2020,
            minuteStep: 1
        },
        validate : function(value){
            requiredField();
            // Validar outros campos
        }
    };
    options['time'] = {
        type : 'combodate',
        title : field.name,
        value : value,
        format: 'hh:mm:ss',
        viewFormat: 'hh:mm:ss',
        template: 'hh:mm:ss',
        combodate :{
            minuteStep: 1
        },
        validate : function(value){
            requiredField();
            // Validar outros campos
        }
    };
    if(options[datatype]){
        return options[datatype];
    }else{
        return defaultOptions;
    }
};

/**
 * Representa uma célula da tabela
 * @param struct estrutura na qual a célula faz referência
 * @param data dado da célula
 * @constructor
 */
var Cell = function (struct, data){
    this.init(struct, data);
};

Cell.prototype = {

    init: function(struct, data){
        this.struct = struct;
        this.data = data;
    },

    wrapper_tpl: '<div class="multi"></div>',

    /**
     * Retorna o template do elemento HTML que será renderizado para cada célula
     * da tabela, no qual irá mostrar o valor do campo.
     * @param data
     * @returns {string}
     */
    get_cell_tpl: function (data){
        if (data == undefined) {
            data = this.data;
        }
        return '<a href="javascript:void(0)" '+
           ' data-type="'+this.struct.datatype.toLowerCase()+'"'+
           ' data-title="'+this.struct.name+'"'+
           ' class="editable editable-click">'+data+'</a>';
    },

    file_download_tpl: function (file) {
        var edit_tpl = $(this.get_cell_tpl());
        if (file){
            edit_tpl.addClass('file-content');
            edit_tpl.html('<span class="blue">' + file.nome_doc + '</span>');
        }
        return this.to_html(edit_tpl);
    },

    json_tpl: function (json) {
        var edit_tpl = $(this.get_cell_tpl());
        edit_tpl.addClass('json-content');
        edit_tpl.html('<span class="blue">JSON</span>');
        return '<div data-field-alias="'+this.struct.alias+'" class="hidden">'+
            Utils.stringify(json)+'</div>' + this.to_html(edit_tpl);
    },

    /**
     * Obtém o conteúdo padrão de cada célula. Na renderização de cada celula, é adicionado
     * informações a esse template para identificar o valor da célula.
     * @returns {*|string}
     */
    get_content: function (){
        var field = Fields.get_field(this.struct);
        if (this.struct.multivalued) {
            var content = this.get_multi_content(field);
        }else if (field instanceof Fields.mapping.FileDataType) {
            var content = this.file_download_tpl(this.data);
        }else if (field instanceof Fields.mapping.JsonDataType) {
            var content = this.json_tpl(this.data);
        }else {
            var content = this.get_cell_tpl();
        }
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
                var editable_tpl = self.get_cell_tpl(val);
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

var RegForm = function (base, values) {
    this.init(base, values);
};

RegForm.prototype = $.extend({ }, Cell.prototype, {

    init: function(base, values){
        this.base = base;
        this.values = values;
        this.edition = false;
        if(values !== undefined){
            this.edition = true;
        }
        this.editables = [ ];
    },

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

    /**
     * Método responsável por gerar o elemento HTML que irá conter o
     * valor de um campo do registro da base.
     * @param field Campo no qual se refere o valor
     * @returns {*|jQuery}
     */
    editable_tpl: function (field) {
        var dataTypeField = field.datatype.toLowerCase();
        /*if(dataTypeField === 'date'){
            dataTypeField = 'combodate';
        }*/
        var a = '<a href="#" '
        //+ ' data-type="'+dataTypeField+'"'
        //if(dataTypeField == 'date'){
        //   a = a + ' data-format="dd/mm/yyyy"';
        //}
        + ' data-title = "'+field.name+'"'
        +' class="editable editable-click">';
        var valor;
        if (this.values !== undefined){
            valor = this.values[field.name];
            a = a + valor;

        }
        a = a + '</a>';

        //console.log('HTML gerado para mostrar campo : ' + a);
        // TODO : Alterar editable para colocar propriedade dependendo do campo.
        var editable = $(a).editable(getFieldEditableOptions(field, valor));
        /*
        if(dataTypeField == 'date') {
            console.log('campo data..');

        }*/

        //console.log('HTML gerado para mostrar campo : ' + editable.prop('outerHTML'));
        $(editable).on('hidden', function(e, reason){
            if(reason === 'save' || reason === 'nochange') {
                // Mostra o próximo campo editável.
                var next = $(this).parent('td').parent('tr').next().find('.editable');
                next.editable('show');
            }
        });
        this.editables.push(editable);
        return editable;
    },

    /**
     * Monta o HTML que será utilizado para exibir o formulário de inclusão de um
     * registro da base.
     * @param base base na qual será incluso o registro
     * @param table_id ID do elemento da tabela no qual será inserido o registro
     * @param label
     * @returns {*|jQuery|HTMLElement}
     */
    html: function (base, table_id, label, valores) {
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

        // Para cada campo da base monta uma tabela(HTML), que será o formulário
        // de inserção de registro.
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
        //console.log("validating ....");
        // TODO : Validar novamente os campos, pois pode ter campo está vazio.
        var data = { };
        var self = this;

        $(this.editables).each(function (i, editable) {
            var table_id = editable.parents('table').attr('id');
            var field_name = editable.data('title');
            var path = table_id.split('-');

            //console.log('HTML : ' + $(editable).parent().html());
            var value = $(editable).editable('getValue', true);
            //console.log('valor anterio : ' + value);
            //console.log('tipo : ' + $(editable).editable('option', 'type'));

            var type = $(editable).data('editable').input['type'];
            //console.log('Realizando parse para tipo : ' + type);
            if( type !== undefined) {
                if (type == 'combodate') {
                    value = moment(value).format($(editable).data('editable').input['options']['format']);
                    console.log('valor posterior : ' + value);
                }else if(type == 'integer'){
                    value = Number(value);
                    console.log('valor posterior : ' + value);
                }
            }
            path.push(field_name);
            path = path.slice(1); // remove base
            self.set_value(data, path, value)
        });

        return data;
    },

    submit: function (dataReceived) {
        var base = $('#base-name').text();
        $.ajax({
            type: 'post',
            url: '/base/'+base+'/doc',
            data: {
                value: JSON.stringify(dataReceived)
            },
            async: false,
            success: function (data, textStatus, jqXHR) {
                console.log('Registro inserido com sucesso!');
                bootbox.alert("Registro inserido com sucesso!", function(){});
                $("#datatable").dataTable().fnDraw();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                 console.log(jqXHR, textStatus, errorThrown);
                var response = JSON.parse(jqXHR['responseText']);
                // TODO Padornizar componente para mostrar erro.
                bootbox.alert('Erro ao tentar inserir registro! <br>Tipo  :   ' + response.type + '<br>Mensagem : ' + response.error_message , function(){});
            }
        });
    },

    update: function (dataReceived) {
        var base = $('#base-name').text();
        var id_reg = this.values['id_reg'].split('-')[1];

        $.ajax({
            type:'put',
            url: '/base/'+base+'/explore',
            data: {
                id: id_reg,
                value: JSON.stringify(dataReceived)
            },
            async: false,
            success: function (data, textStatus, jqXHR) {
                console.log('Registro atualizado com sucesso!');
                bootbox.alert("Registro atualizado com sucesso!", function(){});
                $("#datatable").dataTable().fnDraw();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var response = JSON.parse(jqXHR['responseText']);
                // TODO Padornizar componente para mostrar erro.
                bootbox.alert('Erro ao tentar inserir registro! <br>Tipo  :   ' + response.type + '<br>Mensagem : ' + response.error_message , function(){});
            }
        });
    }
});

/**
 * Obtém os metadados da tabela
 * @param base base  ou grupo na qual se refere as informações
 * @param depth
 * @returns {{base: *, name: (base.metadata.name|*), alias: (field.field.alias|*|a.alias), description: (base.metadata.description|*), multivalued: *, columns: *[], inner_tables: Array}}
 */
var get_table_metadata = function (base, depth) {
    var table_metadata = {
        base: base,
        name: base.metadata.name,
        alias: base.metadata.alias,
        description: base.metadata.description,
        multivalued: base.metadata.multivalued,
        columns: [get_default_column_table()],
        inner_tables: [ ] 
    };

    // Adiciona as colunas definidas na base.
    // Somente deixa visível as 5 primeiras colunas.
    // Para cada coluna define em mRender a função utilizada
    // para renderizar cada célula
    base.content.forEach(function(struct, index){
        if (struct.field){
            if ($.inArray('Ordenado', struct.field.indices) != -1 ||
                $.inArray('Unico', struct.field.indices) != -1) {
                var bSortable = true;
            }else {
                var bSortable = false;
            }

            var bVisible = index > 5? false: true;

            table_metadata.columns.push({
                "sTitle": '<a data-toggle="tooltip" title="" data-original-title="'+
                    struct.field.description+'">'+struct.field.alias+'</a>',
                //"sClass": 'ws word',
                "bSortable": bSortable,
                "bVisible": bVisible, 
                "sDefaultContent": "",
                "mData": struct.field.name,
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
                content: get_table_metadata(struct.group, struct.group.metadata.name)
            };
            table_metadata.inner_tables.push(inner_table);
        }
    });
    return table_metadata;
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

/**
 * This function allows you to 'post process' each row after it have been generated for each table draw,
 * but before it is rendered on screen. This function might be used for setting the row class name etc.
 * @param table_data table data
 * @returns {Function}
 */
var fnRowCallback = function (table_data) {
    return function (nRow, aData, iDisplayIndex) {
        // Obtém o template do elememento HTML que representa o valor
        var editables = $(nRow).find('.editable');
        // Obtém as ações padrões definidas na primeira coluna
        var $action_td = $(nRow).find('.action-buttons');
        // TODO : Corrigir para mobile
        //var $hidden_ul = $(nRow).find('ul');
        var oTable = this;

        if (oTable.attr('id') == 'datatable') {
            var row_id = 'reg-' + aData._metadata.id_doc;
        } else if (table_data.multivalued) {
            var row_id = oTable.attr('id') + '-' + iDisplayIndex;
        } else {
            var row_id = oTable.attr('id');
        }

        $(nRow).attr('id', row_id);

        config_editables(editables);
        $('[data-toggle="tooltip"]').tooltip();

        // Para cada elemento HTML da div action-buttons (default_column_actions_tpl),
        // associa um evento .
        $action_td.find('.view-reg').click(  aData, view_reg_event);
        $action_td.find('.edit-reg').click(  aData, edit_reg_event);
        $action_td.find('.delete-reg').click(aData, delete_reg_event);
        //$hidden_ul.find('.view-reg').click(  aData, view_reg_event);
        //$hidden_ul.find('.edit-reg').click(  aData, edit_reg_event);
        //$hidden_ul.find('.delete-reg').click(aData, delete_reg_event);

        // TODO :Verifica se está funcionando
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
                    var data = aData;
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

/**
 * This function is called on every 'draw' event, and allows you to dynamically modify any aspect you want about the created DOM.
 * @param base base na qual a tabela se refere
 * @returns {Function}
 */
var fnDrawCallback = function (base) {
    return function (oSettings) {
        $(this).find('.add-reg').off().on('click', function (e) {
            console.log("event: " + e.type);
            var form = new RegForm(base);
            bootbox.confirm(form.html(), function(result) {
                console.log('result : ' + result);
                if (result) {
                    var data = form.validate();
                    console.log('validado..');
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
        //console.log('base encontrada : ' + Utils.stringify(BASE));
    },
    error: function(jqXHR, textStatus, errorThrown){
        console.error("Erro ao obter a base...");
    }
});


var TABLE_DATA = get_table_metadata(BASE);

var dataTable = $("#datatable").dataTable({
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
