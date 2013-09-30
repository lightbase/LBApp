
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
            else {
                _is_valid = $(elements[element].input).valid();
                if (!_is_valid) console.log($(elements[element].input));
                
            }
            if (!_is_valid) break;
        }
        return _is_valid;
    };

    this.serialize = function(elements){
        var registry = { };
        elements.forEach(function(element){
            if (element instanceof FieldSet){
                registry[element.structure.metadata.name] = self.serialize(element.elements);
            }
            else {
                registry[element.structure.name] = element.input.value;
            }
        });
        return registry;
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
        if (base.metadata['alias']) table = new Table(id, base, multi);
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
            rows = get_registry_rows(fields_order, groups_order, registry, registry_id, multi);
            $.each(rows, function(i, row){
                table.body.append(row);
            });
        });
        return table;
    };

    function get_registry_rows(fields_order, groups_order, registry, id, multi){

        console.log(fields_order, groups_order, registry, id, multi)

        var rows = [ ],
            actions = [ ],
            registry_id = id? id: registry['id_reg'],
            body_row = new TableRow(registry_id),
            cell_content,
            cell_value,
            field_id, 
            field_value; 

        if (groups_order.length > 0) actions.push(new ToggleButton());
        if (fields_order.length > 0) actions.push(new EditButton(registry_id));
        delete_backup = {
            fields_order: fields_order,
            groups_order: groups_order,
            registry: registry,
            id: id,
            multi: multi
        }
        if (multi) actions.push(new DeleteButton(registry_id, rows, delete_backup=delete_backup));

        var action_buttons = new ActionButtons(actions),
            standard_cell = new TableStandardCell(action_buttons.html);
        body_row.append(standard_cell);

        if (fields_order.length > 0){

            $.each(fields_order, function(i, field){

                field_value = registry[field.name];

                if (field_value){
                    field_type = Utils.type_of(field_value);
                    if (field_type != 'object' && field_type != 'array')
                        cell_value = field_value.toString()
                    else if (field_type == 'object')
                        cell_value = JSON.stringify(field_value);
                    else if (field_type == 'array')
                        cell_value = field_value.join(',');
                }
                else cell_value = '';

                field_id = [registry_id, field.name].join('-');
                cell_content = new EditableAnchor(field_id, cell_value, field);
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

    function build_level_form(base, wrapper){
        var elements = [ ],
            field,
            fieldset,
            level_form;
        base.content.forEach(function(structure){
            if (structure.field && !structure.field.multivalued){
                field = Fields.get_field(structure.field);
                elements.push(field);
            }
            if (structure.group && !structure.group.metadata.multivalued){
                fieldset = new FieldSet(structure.group);
                level_form = build_level_form(structure.group, fieldset);
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
        $(anchor).click(function(e){

            var form = new Form(table.id);
            build_level_form(table.base, append_to=form);

            bootbox.confirm(form.html, function(result) {
                if (result){
                    if (!form.is_valid()){
                        Utils.alert('Por favor, preencha os campos corretamente!');
                        return false;
                    }
                    var fields_order = [ ], 
                        groups_order = [ ], 
                        registry = form.serialize(form.elements), 
                        id = table.id, 
                        multi = true;
                        pk = null , name = null;
                    if (id){
                        var split = id.split('-');
                        pk = split.shift();
                        name = id_to_path(split.join('-'));
                    }
                    $.ajax({
                        type: 'post',
                        url: window.location,
                        data: {
                            pk: pk,
                            name: name,
                            value: JSON.stringify(registry)
                        },
                        success: function(data, textStatus, jqXHR ){
                            table.base.content.forEach(function(struc){
                                if (struc.field) fields_order.push(struc.field);
                                if (struc.group) groups_order.push(struc.group);
                            });
                            id = id? id + '-' + data: data;
                            table.add_body_row(fields_order, groups_order, registry, id, multi);
                        },
                        error: function(jqXHR, textStatus, errorThrown){
                            Utils.alert('Erro ao adicionar registro');
                        }
                    });
                }
            });
        });
        this.html = anchor;
    }

    function EditButton(){
        var anchor = document.createElement('a');
        anchor.setAttribute('class', 'icon-pencil bigger-130 green');
        anchor.setAttribute('href', 'javascript:;');
        $(anchor).click(function(){
            var editables = $(this).closest('tr').find('.editable');
            $.each(editables, function(i, editable){
                $(editable).editable('toggleDisabled');
            });
        });
        this.html = anchor;
    }

    function ToggleButton(){
        var anchor = document.createElement('a'),
            icon = document.createElement('i');
        anchor.setAttribute('class', 'icon-double-angle-right bigger-130');
        anchor.setAttribute('href', 'javascript:;');
        $(anchor).click(function(){
            $(this).closest('tr').next().toggle(150);
            var icon = $(this).attr('class');
            if (icon == 'icon-double-angle-right bigger-130')
                $(this).attr('class', 'icon-double-angle-down bigger-130');
            else
                $(this).attr('class', 'icon-double-angle-right bigger-130');
        });
        this.html = anchor;
    }

    function DeleteButton(data_id, rows, delete_backup){
        var anchor = document.createElement('a'),
            icon = document.createElement('i');
        anchor.setAttribute('class', 'red icon-trash bigger-130');
        //anchor.setAttribute('data-id', data_id);
        anchor.setAttribute('href', 'javascript:;');
        $(anchor).click(function(){
            bootbox.confirm('Deletar registro?', function(result){
                if(result){
                    var data_split = data_id.toString().split('-'),
                        pk = data_split[0],
                        name = null,
                        url = window.location  + '?pk=' + pk;
                    if (data_split.length > 1){
                        name = id_to_path(data_split.splice(1, data_split.length).join('-'));
                        url = url + '&name=' + name; 
                    } 
                    
                    $.ajax({
                        type: 'delete',
                        url: url,
                        success: function(data, textStatus, jqXHR ){
                            var old_rows = $('tr[data-id="{0}"]'.format(pk));
                            var new_rows = get_registry_rows(
                                delete_backup.fields_order,
                                delete_backup.groups_order,
                                JSON.parse(data),
                                delete_backup.id,
                                delete_backup.multi
                            );
                            update_rows(old_rows, new_rows);
                        },
                        error: function(jqXHR, textStatus, errorThrown){
                            custom_alert('Erro ao remover registro');
                        }
                    });
                }
            });
        });
        this.html = anchor;
    }

    function update_rows(old_rows, new_rows){
        console.log(old_rows, new_rows)
        parent = old_rows.parent();
        old_rows.remove();
        new_rows.forEach(function(row){
            parent.append(row.html);
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
            var rows = get_registry_rows(fields_order, groups_order, registry, id, multi);
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
        tr.setAttribute('data-id', id);
        if (hidden) tr.setAttribute('style', 'display: none')
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
            anchor = document.createElement('a'),
            editable_attrs = {
                'id':                   this.id,
                'data-original-title':  structure.alias,
                'class':                'editable editable-click',
                'data-type':            'text',
                'data-pk':              data_pk,
                'data-url':             window.location,
                'data-name':            id_to_path(id_split.join('-'))
            };
        $.each(editable_attrs, function(key, value){
            anchor.setAttribute(key, value);
        });
        $(anchor).text(text);
        $(anchor).editable('toggleDisabled');
        this.html = anchor;
    }

})(jQuery);

