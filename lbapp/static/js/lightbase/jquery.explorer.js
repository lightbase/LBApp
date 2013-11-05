
/*!
 * explorer jQuery Plugin - Copyright (c) 2013 Antony Carvalho
 * Dual-licensed under the BSD or MIT licenses
 */

var tpls = {
    /*dictDefaultMessage :
        '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i> Arraste os arquivos</span>' +
        '<span class="smaller-80 grey"> (ou clique)</span> <br />' +
        '<i class="upload-icon icon-cloud-upload blue icon-3x"></i>',*/

    dictDefaultMessage :
        '<span class="bolder"><i class="icon-cloud-upload red"></i> Arraste os arquivos (ou clique)</span>',

    dictResponseError:
        'Error while uploading file!',

    previewTemplate:
        '<div class="dz-preview dz-file-preview">' +
           '<div class="dz-details">' +
              '<div class="dz-filename">' +
                 '<span data-dz-name>' +
                 '</span>' +
              '</div>' +
              '<div class="dz-size" data-dz-size></div>' +
              '<img data-dz-thumbnail />  ' +
           '</div>' +
           '<div class="progress progress-small progress-success progress-striped active">' +
                '<span class="bar" data-dz-uploadprogress></span>' +
           '</div>' +
           '<div class="dz-success-mark"><span></span></div>' +
           '<div class="dz-error-mark"><span></span></div>' +
           '<div class="dz-error-message"><span data-dz-errormessage></span></div>' +
        '</div>',

    get_mock_file: function(file, dropzone){
        var $mock_file =$(
        '<div class="dz-preview dz-file-preview dz-processing dz-success">'+
            '<div class="dz-details">'+
               '<div class="dz-filename"><span data-dz-name="">'+file.nome_doc+'</span></div>'+
            '</div>'+
            '<div class="dz-success-mark"><span></span></div>'+
            '<a class="dz-remove" href="javascript:undefined;">Remover</a>'+
        '</div>');

        $mock_file.find('.dz-remove').click(function(e){
            _mock_file = $(e.target).parent('.dz-preview');
            _mock_file.id = file.id_doc;
            dropzone.remove_mock_file(_mock_file);
        });
        return $mock_file;
    },
};

function FieldSet(structure){
    this.structure = structure;
    this.elements = [ ];
    var fieldset = document.createElement('fieldset'),
        legend_el = document.createElement('legend');
    $(legend_el).text(structure.metadata.alias);
    fieldset.appendChild(legend_el);
    this.html = fieldset;
}

function Label(text){
    var label = document.createElement('label'),
        bold = document.createElement('b');
    $(bold).text(text);
    label.appendChild(bold);
    this.text = text;
    this.html = label;
}

function ControlGroup(label, controls, cls){
    var control_group = document.createElement('div');
    if (cls) control_group.setAttribute('class', 'control-group ' + cls);
    else control_group.setAttribute('class', 'control-group');
    control_group.appendChild(label.html);
    control_group.appendChild(controls.html);
    this.label = label;
    this.controls = controls;
    this.html = control_group;
}

function Controls(fields){
    var controls = document.createElement('div');
    controls.setAttribute('class', 'controls');
    for (var f in fields)
        controls.appendChild(fields[f]);
    this.fields = fields;
    this.html = controls;
}

function Form(id){
    this.id = id;
    this.elements = [ ];
    this.html = document.createElement('form');

    var self = this;
    if (id) this.html.setAttribute('id', id);

    $(this.html).validate({
        highlight: function (e) {
            $(e).closest('.control-group').removeClass('info').addClass('error');
        },
        success: function (e) {
            $(e).closest('.control-group').removeClass('error').addClass('info');
            $(e).remove();
        },
        onkeyup: function(e){
            $(e).valid()
        }
    });

    this.is_valid = function(elements){
        if (!elements) {
            Fields.add_class_rules();
            elements = this.elements;
        }
        var _is_valid = true;
        for (var element in elements){
            if (elements[element] instanceof FieldSet)
                _is_valid = this.is_valid(elements[element].elements);
            else
                _is_valid = elements[element].is_valid();
            if (!_is_valid) break;
        }
        return _is_valid;
    };

    this.serialize = function(elements){
        var registry = { },
            input_val;
        elements.forEach(function(element){
            if (element instanceof FieldSet){
                registry[element.structure.metadata.name] = self.serialize(element.elements);
            }
            else {
                registry[element.structure.name] = element.get_val();
            }
        });
        return registry;
    };

    this.render_extra_inputs = function(){

        $(".wysiwyg-editor").ace_wysiwyg().prev().addClass('wysiwyg-style2');
        //try {
            $(".dropzone").dropzone({
                init: function(){

                    var $dz_message = $(this.element).find('.dz-default.dz-message');
                        $uploaded = $(this.element).find('.uploaded'),
                        mock_files = [ ], self = this;

                    $uploaded.children().each(function(){
                        var file = JSON.parse($(this).text()),
                            $mock_file = tpls.get_mock_file(file, self);
                        mock_files.push($mock_file);
                    })

                    if (mock_files.length > 0){
                        $dz_message.hide();
                        mock_files.forEach(function($mock_file){
                            $(self.element).append($mock_file);
                        });
                    }

                    this.remove_mock_file = function($mock_file) {
                        $mock_file.remove();
                        $('#'+ $mock_file.id).remove();
                        if ($(self.element).children('.dz-preview').length == 0)
                            $dz_message.show()
                    };

                    this.options.maxFiles = $(this.element).attr('multivalued') == 'true'? null: 1;
                    this.on("success", function(file, response) {
                        file.id = response;
                        var uploaded_group = $(this.element).find('.uploaded');
                        uploaded = document.createElement('div');
                        uploaded.setAttribute('id', file.id);
                        var file_mask = JSON.stringify(Fields.get_file_mask(file.id));
                        $(uploaded).text(file_mask);
                        uploaded_group.append(uploaded);
                    });
                    this.on("removedfile", function(file) {
                        if (!file.id) { return; } // The file hasn't been uploaded
                        var rest_url = $('#rest_url').text(),
                            base_name = $('#base_name').text(),
                            url = [rest_url, base_name, 'doc', file.id].join('/');
                        //$.ajax('tmp-storage/' + file.id, {
                        $.ajax(url, {
                            type: 'delete',
                            async: true,
                            success: function(){
                                var to_remove = $('#' + file.id);
                                to_remove.remove();
                            }
                        });
                    });
                },
                paramName: "file", // The name that will be used to transfer the file
                maxFilesize: 20, // MB
                addRemoveLinks : true,
                dictMaxFilesExceeded: 'Este campo permite apenas um arquivo.',
                dictDefaultMessage: tpls.dictDefaultMessage,
                dictResponseError: tpls.dictResponseError,
                previewTemplate: tpls.previewTemplate,
            });
        /*}
        catch(e) {
              alert('Dropzone does not support older browsers!');
        }*/
    };
}

function FormProtoType(){
    this.append = function(el){
        this.elements.push(el);
        this.html.appendChild(el.html);
    }
}

Form.prototype = new FormProtoType();
FieldSet.prototype = new FormProtoType();

(function($) {

    var config = {
        'base': { },
        'registries': [ ]
    };

    $.fn.explorer = function(settings) {

        if (settings) $.extend(config, settings);

        var explorer = build_explorer(
            base = config['base'],
            registries = config['registries'],
            id = null,
            multi = true
        );

        $(this).append(explorer.html);
    };

    function build_explorer(base, registries, id, multi) {

        var table;
        if (base.metadata.alias) table = new Table(id, base, multi);
        else table = new Table(id, base, multi=true);

        var base_content = base.content,
            multivalued = base.metadata.multivalued,
            head_row = table.add_head_row(),
            fields_order = [ ],
            groups_order = [ ],
            rows = [ ],
            tooltip;

        $.each(base_content, function(i, struc){
            if (struc['field']){
                fields_order.push(struc.field);
                tooltip = new Tooltip(struc.field.alias, struc.field.description);
                header_cell = new TableHeaderCell(tooltip);
                head_row.append(header_cell);
                table.head.append(head_row);
            }
            if (struc['group'])
                groups_order.push(struc.group);
        });

        var registry_id;
        $.each(registries, function(i, registry){
            if (multivalued)
                registry_id = id? [id, i].join('-'): id;
            else
                registry_id = id;
            rows = get_registry_rows(base, fields_order, groups_order, registry, registry_id, multi);
            $.each(rows, function(i, row){
                table.body.append(row);
            });
        });
        return table;
    };

    function get_registry_rows(base, fields_order, groups_order, registry, id, multi){

        var rows = [ ],
            actions = [ ],
            registry_id = id? id: registry['id_reg'],
            body_row = new TableRow(registry_id),
            cell_content,
            cell_value,
            field_id,
            field_value;

        if (groups_order.length > 0) actions.push(new ToggleButton(registry_id));
        if (fields_order.length > 0) actions.push(new EditButton(base, registry_id, registry));
        if (multi) actions.push(new DeleteButton(base, registry_id, rows));

        var action_buttons = new ActionButtons(actions),
            standard_cell = new TableStandardCell(action_buttons.html);
        body_row.append(standard_cell);

        if (fields_order.length > 0){

            $.each(fields_order, function(i, field){

                field_value = registry[field.name];
                field_type = Utils.type_of(field_value);

                if (field_type == 'object')
                    cell_value = JSON.stringify(field_value);
                else if (field_type == 'array')
                    cell_value = field_value;
                else if (field_type == 'boolean')
                    cell_value = field_value.toString();
                else if (field_type == 'string')
                    cell_value = field_value;
                else
                    cell_value = '';

                field_id = [registry_id, field.name].join('-');
                cell_content = get_cell_content(field_id, cell_value, field);
                //cell_content = new EditableAnchor(field_id, cell_value, field);
                standard_cell = new TableStandardCell(cell_content.html);
                body_row.append(standard_cell);
            });
        }
        rows.push(body_row);

        if (groups_order.length > 0){
            var group_row = new TableRow(registry_id, hidden=true),
                group_id,
                registries,
                explorer = [ ];

            $.each(groups_order, function(i, group){

                group_id = [registry_id, group.metadata.name].join('-');
                registries = registry[group.metadata.name];
                if (registries) {
                    if (Utils.type_of(registries) != 'array')
                        registries = [registries];
                }
                else registries =  [ ];

                explorer.push(
                    build_explorer(group, registries, group_id, group.metadata.multivalued)
                );
            });
            var standard_cell = new TableStandardCell(
                content = explorer,
                colspan = fields_order.length + 1
            );
            group_row.append(standard_cell)
            rows.push(group_row);
        }
        return rows;
    }

    function ActionButtons(actions){
        var div = document.createElement('div');
        div.setAttribute('class', 'hidden-phone visible-desktop action-buttons');
        $.each(actions, function(i, action){
            div.appendChild(action.html);
        });
        this.html = div;
    }

    function build_level_form(base, wrapper, path){
        var elements = [ ],
            field,
            fieldset,
            field_path,
            group_path,
            level_form;

        base.content.forEach(function(structure){
            if (structure.field){
                field_path =  path? path + '-' + structure.field.name: structure.field.name;
                field = Fields.get_field(structure.field, field_path);
                elements.push(field);
            }
            if (structure.group && !structure.group.metadata.multivalued){
                fieldset = new FieldSet(structure.group);
                group_path = path? path + '-' + structure.group.metadata.name: structure.group.metadata.name;
                level_form = build_level_form(structure.group, fieldset, group_path);
                elements.push(level_form);
            }
        });
        elements.forEach(function(element){
            wrapper.append(element);
        });
        return wrapper;
    }

    function edit_level_form(base, registry, wrapper, path){
        var elements = [ ],
            field,
            fieldset,
            field_path,
            group_path,
            level_form;

        base.content.forEach(function(structure){
            if (structure.field){
                field_path =  path? path + '-' + structure.field.name: structure.field.name;
                field = Fields.get_field(structure.field, field_path);
                field.set_val(registry[structure.field.name]);
                elements.push(field);
            }
            if (structure.group && !structure.group.metadata.multivalued){
                fieldset = new FieldSet(structure.group);
                group_path = path? path + '-' + structure.group.metadata.name: structure.group.metadata.name;
                level_form = edit_level_form(structure.group, registry[structure.group.metadata.name],
                    fieldset, group_path);
                elements.push(level_form);
            }
        });
        elements.forEach(function(element){
            wrapper.append(element);
        });
        return wrapper;
    }

    function AddButton(table){
        var anchor = document.createElement('a');
        anchor.setAttribute('class', 'icon-plus-sign bigger-130');
        anchor.setAttribute('href', 'javascript:;');
        anchor.setAttribute('data-tooltip', 'tooltip');
        anchor.setAttribute('title', 'Adicionar registro');
        $(anchor).click(function(e){

            var form = new Form(table.id);
            build_level_form(table.base, form);

            bootbox.confirm(form.html, 'Cancelar', 'Salvar', function(result) {
                if (result){
                    if (!form.is_valid()){
                        Utils.error('Por favor, preencha os campos corretamente!');
                        return false;
                    }
                    var fields_order = [ ],
                        groups_order = [ ],
                        registry = form.serialize(form.elements),
                        id = table.id,
                        multi = true;
                        pk = null , name = null;
                    if (id){
                        var split = id.split('-'),
                            pk = split.shift(),
                            name = id_to_path(split.join('-'));
                    }
                    $.ajax({
                        type: 'post',
                        url: window.location,
                        data: {
                            method: 'POST',
                            pk: pk,
                            name: name,
                            value: JSON.stringify(registry)
                        },
                        success: function(data, textStatus, jqXHR ){
                            table.base.content.forEach(function(struc){
                                if (struc.field) fields_order.push(struc.field);
                                if (struc.group) groups_order.push(struc.group);
                            });
                            console.log(data, textStatus, jqXHR)
                            registry = JSON.parse(data);
                            //id = id? id + '-' + data: data;
                            id = registry.id_reg;
                            table.add_body_row(fields_order, groups_order, registry, id, multi);
                            Utils.success('Registro salvo com sucesso!');
                        },
                        error: function(jqXHR, textStatus, errorThrown){
                            var response = JSON.parse(jqXHR.responseText);
                            Utils.error(response._error_message);
                        }
                    });
                }
                else {
                    // Delete unused uploaded files.
                    var base_name = $('#base_name').text(),
                        rest_url = $('#rest_url').text();
                    $(form.html).find('.uploaded').children().each(function(i, uploaded_el){
                        var url = [rest_url, base_name, 'doc', uploaded_el.id].join('/');
                        console.log(url)
                        //$.ajax('tmp-storage/' + uploaded_el.id, {
                        $.ajax(url, {
                            type: 'delete',
                            async: true,
                        });
                    });
                }
            });
            $('.modal').center(false);
            form.render_extra_inputs();
        });
        anchor = $(anchor);
        anchor.tooltip();
        this.html = anchor[0];
    }

    function EditButton(base, id, registry){
        var anchor = document.createElement('a');
        anchor.setAttribute('class', 'icon-pencil bigger-130 green');
        anchor.setAttribute('href', 'javascript:;');
        anchor.setAttribute('data-tooltip', 'tooltip');
        anchor.setAttribute('title', 'Editar registro');
        $(anchor).click(function(){
            var form = new Form(id);
            edit_level_form(base, registry, form);

            bootbox.confirm(form.html, 'Cancelar', 'Salvar', function(result) {
                if (result){
                    if (!form.is_valid()){
                        Utils.error('Por favor, preencha os campos corretamente!');
                        return false;
                    }
                    var fields_order = [ ],
                        groups_order = [ ],
                        registry = form.serialize(form.elements),
                        multi = true,
                        split = id.toString().split('-'),
                        pk = split.shift(),
                        name = id.length > 1? id_to_path(split.join('-')): null;

                    $.each(config.base.content, function(i, struc){
                        if (struc.field) fields_order.push(struc.field);
                        if (struc.group) groups_order.push(struc.group);
                    });

                    $.ajax({
                        //type: 'put',
                        type: 'post',
                        url: window.location,
                        data: {
                            method: 'PUT',
                            pk: pk,
                            name: name,
                            value: JSON.stringify(registry)
                        },
                        success: function(data, textStatus, jqXHR ){
                            console.log(data, textStatus, jqXHR)
                            var old_rows = $('tr[data-id="{0}"]'.format(pk)),
                                new_rows = get_registry_rows(
                                    base,
                                    fields_order,
                                    groups_order,
                                    JSON.parse(data),
                                    null,
                                    true
                                );
                            update_rows(pk, old_rows, new_rows);
                            Utils.success('Registro salvo com sucesso!');
                        },
                        error: function(jqXHR, textStatus, errorThrown){
                            var response = JSON.parse(jqXHR.responseText);
                            Utils.error(response._error_message);
                        }
                    });
                }
            });
            $('.modal').center(false);
            form.render_extra_inputs();
        });
        anchor = $(anchor);
        anchor.tooltip();
        this.html = anchor[0];
    }

    function ToggleButton(id){
        var anchor = document.createElement('a'),
            icon = document.createElement('i');
        anchor.setAttribute('class', 'icon-double-angle-right bigger-130 toggle-close');
        anchor.setAttribute('href', 'javascript:;');
        anchor.setAttribute('id', 'toggle-button-' + id);
        anchor.setAttribute('data-tooltip', 'tooltip');
        anchor.setAttribute('title', 'Ver grupos');
        $(anchor).click(function(){
            $(this).closest('tr').next().toggle(150);
            var icon = $(this).attr('class');
            if ($(this).hasClass('icon-double-angle-right'))
                $(this).attr('class', 'icon-double-angle-down bigger-130 toggle-open');
            else
                $(this).attr('class', 'icon-double-angle-right bigger-130 toggle-close');
        });
        anchor = $(anchor);
        anchor.tooltip();
        this.html = anchor[0];
    }

    function DeleteButton(base, data_id, rows){
        var anchor = document.createElement('a'),
            icon = document.createElement('i');
        anchor.setAttribute('class', 'red icon-trash bigger-130');
        anchor.setAttribute('data-id', data_id);
        anchor.setAttribute('data-tooltip', 'tooltip');
        anchor.setAttribute('title', 'Deletar registro');
        anchor.setAttribute('href', 'javascript:;');
        $(anchor).click(function(){
            bootbox.confirm('Deletar registro?', 'Cancelar', 'Deletar', function(result){
                if(result){
                    var data_split = data_id.toString().split('-'),
                        pk = data_split[0],
                        name = null,
                        url = window.location  + '?pk=' + pk;
                    if (data_split.length > 1){
                        name = id_to_path(data_split.splice(1, data_split.length).join('-'));
                        url = url + '&name=' + name;
                    }

                    var fields_order = [ ], groups_order = [ ];

                    $.each(config.base.content, function(i, struc){
                        if (struc.field) fields_order.push(struc.field);
                        if (struc.group) groups_order.push(struc.group);
                    });
                    $.ajax({
                        //type: 'delete',
                        type: 'post',
                        url: url,
                        data: {
                            method: 'DELETE',
                            pk: pk,
                            name: name
                        },
                        success: function(data, textStatus, jqXHR ){
                            if (data == 'DELETED'){
                                rows.forEach(function(row){
                                    $(row.html).remove();
                                });
                                Utils.success('Registro deletado com sucesso!');
                                return true;
                            }
                            var old_rows = $('tr[data-id="{0}"]'.format(pk));
                            var new_rows = get_registry_rows(
                                base,
                                fields_order,
                                groups_order,
                                JSON.parse(data),
                                null,
                                true
                            );
                            update_rows(pk, old_rows, new_rows);
                            Utils.success('Registro deletado com sucesso!');
                        },
                        error: function(jqXHR, textStatus, errorThrown){
                            var response = JSON.parse(jqXHR.responseText);
                            Utils.error(response._error_message);
                        }
                    });
                }
            });
            $('.modal').center(false);
        });
        anchor = $(anchor);
        anchor.tooltip();
        this.html = anchor[0];
    }

    function update_rows(id, old_rows, new_rows){
        var to_click = [ ];
        var toggle_buttons = $('a[id|="toggle-button-{0}"]'.format(id));
        toggle_buttons.each(function(i, el){
            if ($(el).hasClass('toggle-open'))
                to_click.push(el.id);
        });
        var parent = old_rows.parent();
        old_rows.remove();
        new_rows.forEach(function(row){
            parent.append(row.html);
        });
        to_click.forEach(function(id){
            $('#' + id).click();
        });
    }

    function Table(id, base, multi){
        this.id = id;
        this.base = base;
        this.name = base.metadata.alias? base.metadata.alias: base.metadata.name;
        var self = this;

        var table = document.createElement('table');
        if (id) table.setAttribute('id', id);
        table.setAttribute('class', 'table table-striped table-bordered');
        table.setAttribute('style', 'width: auto');

        this.html = table;
        this.head = new TableHead();
        this.body = new TableBody();

        this.add_head_row = function(){

            var toggle_anchor = new ToggleAnchor(this.name, this.body),
                add_button = new AddButton(this),
                action_buttons = new ActionButtons([add_button]),
                header_cell_content = multi? [action_buttons, toggle_anchor]: [toggle_anchor],
                header_cell = new TableHeaderCell(header_cell_content),
                head_row = new TableRow();
            head_row.append(header_cell);
            this.head.append(head_row);
            return head_row;
        };

        this.add_body_row = function(fields_order, groups_order, registry, id, multi){
            var rows = get_registry_rows(this.base, fields_order, groups_order, registry, id, multi);
            rows.forEach(function(row){
                self.body.append(row);
            });
        };

        this.html.appendChild(this.head.html);
        this.html.appendChild(this.body.html);
    }

    function TableHead(){
        var thead = document.createElement('thead');
        this.html = thead;
    }

    function TableBody(){
        var tbody = document.createElement('tbody');
        this.html = tbody;
    }

    function TableRow(id, hidden){
        var tr = document.createElement('tr');
        if (id) tr.setAttribute('data-id', id);
        if (hidden) tr.setAttribute('style', 'display: none');
        this.html = tr;
    }

    function TableStandardCell(content, colspan){
        var td = document.createElement('td');
        if (Utils.type_of(content) == 'string')
            $(td).text(content);
        else if (Utils.type_of(content) == 'array'){
            content.forEach(function(el){
                td.appendChild(el.html);
            });
        }
        else td.appendChild(content);
        if (colspan) td.setAttribute('colspan', colspan);
        this.html = td;
    }

    function TableHeaderCell(content){
        var th = document.createElement('th');
        th.setAttribute('class', 'sorting');
        if (Utils.type_of(content) == 'string')
            $(th).text(content);
        else if (Utils.type_of(content) == 'array'){
            content.forEach(function(element){
                th.appendChild(element.html);
            });
        }
        else
            th.appendChild(content.html);
        this.html = th;
    }

    function ToggleAnchor(text, toggle){
        var anchor = document.createElement('a');
        anchor.setAttribute('href', 'javascript:;');
        $(anchor).text(text);
        $(anchor).click(function(){
            $(toggle.html).toggle(200);
        });
        this.html = anchor;
    }

    function TableProtoType(){
        this.append = function(el){
            this.html.appendChild(el.html);
        }
    }

    Table.prototype = new TableProtoType();
    TableHead.prototype = new TableProtoType();
    TableBody.prototype = new TableProtoType();
    TableRow.prototype = new TableProtoType();
    TableStandardCell.prototype = new TableProtoType();
    TableHeaderCell.prototype = new TableProtoType();

    function id_to_path(id){
        // Powerfull Regex, Huhn ??
        return id.toString().replace(/-/g, '.').replace(/(^|\.)([0-9]+)($|\.)/g, '[$2]$3');
    }

    function Tooltip(text, tip){
        var anchor = document.createElement('a');
        anchor.setAttribute('data-toggle', 'tooltip');
        anchor.setAttribute('title', tip);
        $(anchor).text(text);
        $(anchor).mouseover(function(el){
            $(this).tooltip('show');
        });
        this.html = anchor;
    }

    function EditableAnchor(id, text, structure){
        this.id = id;
        var id_split = id.split('-'),
            data_pk = id_split.splice(0, 1),
            anchor = document.createElement('div'),
            home_url = $('#home_url').text(),
            base_id = $('#base_id').text(),
            editable_attrs = {
                'id':                   id,
                'data-original-title':  structure.alias,
                //'class':                'editable editable-click',
                'data-type':            'text',
                'data-pk':              data_pk,
                'data-url':             window.location,
                'data-name':            id_to_path(id_split.join('-'))
            };

        $.each(editable_attrs, function(key, value){
            anchor.setAttribute(key, value);
        });

        $(anchor).text(text.toString());
        //$(anchor).editable('toggleDisabled');
        this.html = anchor;
    }

    function is_file_mask(obj){
        var properties = ['id_doc', 'nome_doc', 'mimetype'],
            ct = 0;
        for (var property in obj) {
            if ($.inArray(property, properties) < 0)
                return false;
            ct ++;
        }
        if (ct > 3)
            return false;
        return true;
    }

    function get_cell_content(id, value, structure){
        field = Fields.get_field(structure);
        if (structure.multivalued)
            return get_multi_cell_content(id, value, structure, field);
        if (field instanceof FileField)
            return new FileDownloadAnchor(value);
        else
            return new EditableAnchor(id, value, structure);
    }

    function get_multi_cell_content(field_id, cell_value, structure, field){
        var wrapper = new MultivaluedWrapper(),
            download_anchor, elm;
        if (field instanceof FileField && Utils.type_of(cell_value) == 'array'){
            cell_value.forEach(function(val){
                download_anchor = new FileDownloadAnchor(val).html;
                wrapper.add_elm(download_anchor)
            });
        }
        else if (Utils.type_of(cell_value) == 'array'){
            cell_value.forEach(function(val){
                elm = new EditableAnchor(field_id, val, structure, field).html;
                wrapper.add_elm(elm)
            });
        }
        return wrapper;
    }

    function MultivaluedWrapper(){
        var div = document.createElement('div');
        div.setAttribute('style', 'overflow-y: auto; overflow-x: hidden;max-height: 100px;');
        this.html = div;
        this.add_elm = function(elm){
            if (this.html.hasChildNodes()){
                var hr = document.createElement('hr');
                this.html.appendChild(hr);
                this.html.appendChild(elm);
            }
            else
                this.html.appendChild(elm);
        };
    }

    function FileDownloadAnchor(file){
        var rest_url = $('#rest_url').text();
            text = '', href = '';
        if (Utils.type_of(file) == 'string'){
            try{
                file = JSON.parse(file);
            }
             catch (e){}
        }
        if (Utils.type_of(file) == 'object'){
            var text = file.nome_doc;
            var href = [rest_url, config.base.metadata.name, 'doc', file.id_doc, 'download'].join('/');
        }
        var tpl = $('<a href="'+href+'" data-toggle="tooltip" title="baixar arquivo">'+text+'</a>');
        tpl.tooltip();
        this.html = $(tpl)[0];
    }

})(jQuery);

