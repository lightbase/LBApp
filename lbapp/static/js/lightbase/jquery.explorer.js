
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
    control_group.setAttribute('class', 'control-group ' + cls);
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

function NameField(label){

    this.label = new Label(label);
    var input = document.createElement('input'),
        attributes = {
        'name'       : label,
        'class'      : 'input-medium',
        'type'       : 'text',
    };
    $.each(attributes, function(k, v){
        input.setAttribute(k, v);
    });
    this.input = input;
    this.controls = new Controls([this.input]);
    this.html = new ControlGroup(this.label, this.controls).html;
}

function Form(elements){
    var form = document.createElement('form');
    for (var e in elements) form.appendChild(elements[e].html);
    this.elements = elements;
    this.html = form;
}

function custom_alert(text){
     var template = 
    '<div class="alert alert-danger" style="display: none; ">' +
        '<button type="button" class="close" data-dismiss="alert">' +
            '<i class="icon-remove"></i>' +
        '</button>' +
        '<span></span>' +
    '</div>', 
        dom = $(template);
    dom.find('span').text(text);
    $('body').append(dom);
    dom.delay(200).fadeIn().delay(4000).fadeOut();
}

(function($) {

    var config = {
        'base': { },
        'registries': [ ] 
    };

    $.fn.explorer = function(settings) {

        if (settings) $.extend(config, settings);

        if (config['registries'].length < 1){
            $(this).text('Sem registros');
            return false;
        }

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

        var rows = [ ],
            actions = [ ],
            body_row = new TableRow(),
            registry_id = id? id: registry['id_reg'],
            cell_content,
            cell_value,
            field_id, 
            field_value; 

        if (groups_order.length > 0) actions.push('toggle');
        if (fields_order.length > 0) actions.push('edit');
        if (multi) actions.push('delete');

        var action_buttons = new ActionButtons(actions, registry_id),
            standard_cell = new TableStandardCell(action_buttons.html);
        body_row.append(standard_cell);

        if (fields_order.length > 0){

            $.each(fields_order, function(i, field){

                field_value = registry[field.name];

                if (field_value){
                    field_type = type_of(field_value);
                    if (field_type != 'object' && field_type != 'array')
                        cell_value = field_value.toString()
                    else if (field_type == 'object')
                        cell_value = JSON.stringify(field_value);
                    else if (field_type == 'array')
                        cell_value = field_value.join(',');
                }
                else cell_value = '';

                field_id = [registry_id, field.name].join('-');
                cell_content = new EditableAnchor(field_id, cell_value, field.datatype);
                standard_cell = new TableStandardCell(cell_content.html);
                body_row.append(standard_cell);
            });
        }
        rows.push(body_row);

        if (groups_order.length > 0){
            var group_row = new TableRow(hidden=true),
                group_id,
                registries,
                explorer = [ ];

            $.each(groups_order, function(i, group){

                group_id = [registry_id, group.metadata.name].join('-');
                registries = registry[group.metadata.name];
                if (registries){
                    if (type_of(registries) == 'array')
                        explorer.push(
                            build_explorer(group, registry[group.metadata.name], group_id, multi=true)
                        );
                    else 
                        explorer.push(build_explorer(group, [registry[group.metadata.name]], group_id));
                }
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

    function ActionButtons(actions, data){
        var div = document.createElement('div'),
            button;
        div.setAttribute('class', 'hidden-phone visible-desktop action-buttons');
        $.each(actions, function(i, action){
            if (action == 'add') button = new AddButton(data);
            if (action == 'edit') button = new EditButton(data);
            if (action == 'toggle') button = new ToggleButton(data);
            if (action == 'delete') button = new DeleteButton(data);
            div.appendChild(button.html);
        });
        this.html = div;
    }

    function get_base_level(path){

        var base = config.base,
            structure;
        function search(base, name){
            for (var content in base.content){
                structure = base.content[content];
                if (structure.group) {
                    if (structure.group.metadata.name == name) 
                        return structure.group;
                }
            }
        }
        if (path[0] == '__root__') return base;
        else {
            path.forEach(function(crumb){
                base = search(base, crumb)
            });
        }
        return base;
    }

    function build_level_form(base){
        var elements = [ ],
            field;
        $.each(base.content, function(i, structure){
            if (structure.field){
                field = new NameField(structure.field.alias);
                elements.push(field)
            }
        });
        var form = new Form(elements);
        bootbox.confirm(form.html, function(result) {
            if (result){
                
            }
        });
    }

    function AddButton(data_table){
        var anchor = document.createElement('a');
        anchor.setAttribute('class', 'icon-plus-sign bigger-130');
        anchor.setAttribute('href', 'javascript: void(0)');

        if (data_table) anchor.setAttribute('data-table', data_table);
        else anchor.setAttribute('data-table', '__root__');

        $(anchor).click(function(e){
            var data_table = $(e.target).attr('data-table'),
                path = data_table.split('-'),
                level, 
                form;
            if (path.length > 1) path.splice(0, 1);
            level = get_base_level(path);
            form = build_level_form(level);
        });

        this.html = anchor;
    }

    function EditButton(){
        var anchor = document.createElement('a');
        anchor.setAttribute('class', 'icon-pencil bigger-130 green');
        anchor.setAttribute('href', 'javascript: void(0)');
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
        anchor.setAttribute('href', 'javascript: void(0)');
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

    function DeleteButton(data_id){
        var anchor = document.createElement('a'),
            icon = document.createElement('i');
        anchor.setAttribute('class', 'red icon-trash bigger-130');
        anchor.setAttribute('data-id', data_id);
        anchor.setAttribute('href', 'javascript: void(0)');
        $(anchor).click(function(){
            bootbox.confirm('Deletar registro?', function(result){
                if(result){
                }
            });
        });
        this.html = anchor;
    }

    function Table(id, base, multi){
        this.name = base.metadata.alias? base.metadata.alias: base.metadata.name;

        var table = document.createElement('table');
        if (id) table.setAttribute('id', id);
        table.setAttribute('class', 'table table-striped table-bordered');
        table.setAttribute('style', 'width: auto');

        this.html = table;
        this.head = new TableHead();
        this.body = new TableBody();

        this.add_head_row = function(){
            var toggle_anchor = new ToggleAnchor(this.name, this.body),
                action_button = new ActionButtons(['add'], id),
                header_cell_content = multi? [action_button, toggle_anchor]: [toggle_anchor],
                header_cell = new TableHeaderCell(header_cell_content),
                head_row = new TableRow();
            head_row.append(header_cell);
            this.head.append(head_row);
            return head_row;
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

    function TableRow(hidden){
        var tr = document.createElement('tr');
        if (hidden) tr.setAttribute('style', 'display: none')
        this.html = tr;
    }

    function TableStandardCell(content, colspan){
        var td = document.createElement('td');
        if (type_of(content) == 'string')
            $(td).text(content);
        else if (type_of(content) == 'array'){
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
        if (type_of(content) == 'string')
            $(th).text(content);
        else if (type_of(content) == 'array'){
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
        anchor.setAttribute('href', 'javascript: void(0)');
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
        
    function EditableAnchor(id, text, datatype){
        this.id = id;
        var id_split = id.split('-'),
            data_pk = id_split.splice(0, 1),
            anchor = document.createElement('a'),
            editable_attrs = {
                'id':                   this.id,
                'data-original-title':  'Enter data',
                'class':                'editable editable-click',
                'data-type':            'text',
                'data-pk':              data_pk,
                'data-url':             window.location.pathname,
                'data-name':            id_to_path(id_split.join('-'))
            };
        $.each(editable_attrs, function(key, value){
            anchor.setAttribute(key, value);
        });
        $(anchor).text(text);
        $(anchor).editable('toggleDisabled');
        this.html = anchor;
    }

    function type_of(obj){
        var type_handler = new TypeHandler(obj);
        return type_handler.type();
    }

    function TypeHandler(value) {
        // number, boolean, string, object, array, date
        this._type = this.get_type(value);
    };

    TypeHandler.prototype.type = function() { return this._type; }

    TypeHandler.prototype.get_type = function(value) {
        var base_type = typeof value;
        var result = "unsupported"
        switch (base_type) {
            case "number": result = base_type; break;
            case "string": result = base_type; break;
            case "boolean": result = base_type; break;
            case "object":
                if (Number.prototype.isPrototypeOf(value)) { result = "number"; break; }
                if (String.prototype.isPrototypeOf(value)) { result = "string"; break; }
                if (Date.prototype.isPrototypeOf(value)) { result = "date"; break; }
                if (Array.prototype.isPrototypeOf(value)) { result = "array"; break; }
                if (Object.prototype.isPrototypeOf(value)) { result = "object"; break; }
        }
        return result;
    };

})(jQuery);
