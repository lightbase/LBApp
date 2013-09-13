(function($) {

    $.fn.explorer = function(settings) {

        var config = {
            'base': { },
            'registries': [ ] 
        };

        if (settings) $.extend(config, settings);

        if (config['registries'].length < 1){
            $(this).text('Sem registros');
            return false;
        }

        var explorer = build_explorer(
            base = config['base'],
            registries = config['registries']
        );

        $(this).append(explorer.html);
    };

    function build_explorer(base, registries, id) {
        
        var table;
        if (base.metadata['alias'])
            table = new Table(base.metadata.alias);
        else
            table = new Table(base.metadata.name);

        var base_content = base.content,
            multivalued = base.metadata['multivalued'],
            head_row = table.add_head_row(),
            fields_order = [ ],
            groups_order = [ ],
            rows = [ ],
            tooltip;
        
        $.each(base_content, function(i, struc){
            if (struc['field']){
                fields_order.push(struc['field']);
                tooltip = new Tooltip(struc['field'].alias, struc['field'].description)
                header_cell = new TableHeaderCell(tooltip.html);
                head_row.append(header_cell);
                table.head.append(head_row);
            }
            if (struc['group'])
                groups_order.push(struc['group']);
        });

        var registry_id;
        $.each(registries, function(i, registry){
            if (multivalued)
                registry_id = id? [id, i].join('-'): id;
            else
                registry_id = id;
            rows = get_registry_rows(fields_order, groups_order, registry, registry_id);
            $.each(rows, function(i, row){
                table.body.append(row);
            });
        });
        return table;
    };

    function get_registry_rows(fields_order, groups_order, registry, id){

        var rows = [ ],
            actions = [ ],
            body_row = new TableRow(),
            registry_id = id? id: registry['id_reg'],
            cell_content,
            cell_value,
            field_id, 
            field_value; 

        if (groups_order.length > 0)
            actions.push('toggle');
        if (fields_order.length > 0)
            actions.push('edit');

        actions.push('delete');

        var action_buttons = new ActionButtons(actions),
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
                        explorer.push(build_explorer(
                            group, registry[group.metadata.name], group_id, multi=true
                        ));
                    else 
                        explorer.push(build_explorer(group, [registry[group.metadata.name]], group_id));
                }
            });
            var standard_cell = new TableStandardCell( 
                explorer, 
                colspan=fields_order.length + 1
            );
            group_row.append(standard_cell)
            rows.push(group_row);
        }
        return rows;
    }

    function ActionButtons(actions){
        var div = document.createElement('div'),
            button;
        div.setAttribute('class', 'hidden-phone visible-desktop action-buttons');
        $.each(actions, function(i, action){
            if (action == 'edit')
                button = new EditButton();
            if (action == 'toggle')
                button = new ToggleButton();
            if (action == 'delete')
                button = new DeleteButton();
            div.appendChild(button.html);
        });
        this.html = div;
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

    function DeleteButton(){
        var anchor = document.createElement('a'),
            icon = document.createElement('i');
        anchor.setAttribute('class', 'red icon-trash bigger-130');
        anchor.setAttribute('href', 'javascript: void(0)');
        $(anchor).click(function(){
        });
        this.html = anchor;
    }

    function Table(name){
        this.name = name;

        var table = document.createElement('table');
        table.setAttribute('class', 'table table-striped table-bordered');
        table.setAttribute('style', 'width: auto');

        this.html = table;
        this.head = new TableHead();
        this.body = new TableBody();

        this.add_head_row = function(){
            var toggle_anchor = new ToggleAnchor(this.name, this.body),
                header_cell = new TableHeaderCell(toggle_anchor.html),
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
        else
            th.appendChild(content);
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

    function Tooltip(text, tooltip){
        var anchor = document.createElement('a');
        anchor.setAttribute('data-toggle', 'tooltip');
        anchor.setAttribute('title', tooltip);
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
