(function($) {

    $.fn.explorer = function(settings) {

        var config = {
            'base': { },
            'registries': [ ] 
        };

        if (settings) $.extend(config, settings);

        var explorer = build_explorer(
            config['base'],
            config['registries']
        );

        $(this).append(explorer.html);
    };

    function build_explorer(base, registries) {
        
        var base_name = base.metadata.name,
            base_content = base.content,
            table = new Table(base_name),
            head_row = table.add_head_row(),
            fields_order = [ ],
            groups_order = [ ],
            rows = [ ];
        
        $.each(base_content, function(i, struc){
            if (struc['field']){
                fields_order.push(struc['field'].name);
                header_cell = new TableHeaderCell(struc['field'].name);
                head_row.append(header_cell);
                table.head.append(head_row);
            }
            if (struc['group'])
                groups_order.push(struc['group']);
        });

        $.each(registries, function(i, registry){
            rows = get_registry_rows(base_name, fields_order, groups_order, registry);
            $.each(rows, function(i, row){
                table.body.append(row);
            });
        });
        return table;
    };

    function get_registry_rows(base_name, fields_order, groups_order, registry){

        var rows = [ ],
            actions = [ ],
            body_row = new TableRow(),
            cell_content,
            cell_value,
            field_value; 

        if (groups_order.length > 0)
            actions.push('toggle');
        if (fields_order.length > 0)
            actions.push('edit');

        var action_buttons = new ActionButtons(actions),
            standard_cell = new TableStandardCell(action_buttons.html);
        body_row.append(standard_cell);

        if (fields_order.length > 0){

            $.each(fields_order, function(i, field){

                field_value = registry[field];

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

                cell_content = new EditableAnchor('id', cell_value);
                standard_cell = new TableStandardCell(cell_content.html);
                body_row.append(standard_cell);
            });
        }
        rows.push(body_row);

        if (groups_order.length > 0){
            var group_row = new TableRow(hidden=true),
                registries,
                explorer,
                registries_type;

            $.each(groups_order, function(i, group){

                registries = registry[group.metadata.name];
                if (registries){
                    registries_type = type_of(registries);

                    if (registries_type == 'array')
                        explorer = build_explorer(group, registry[group.metadata.name]);
                    else 
                        explorer = build_explorer(group, [registry[group.metadata.name]]);
                     
                    var standard_cell = new TableStandardCell( 
                        explorer.html, 
                        colspan=fields_order.length + 1
                        );
                    group_row.append(standard_cell)
                }
            });
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

    function Table(id){
        this.base_name = id;
        this.id = id + '-table';

        var div = document.createElement('div');
        var table = document.createElement('table');
        div.setAttribute('style', 'overflow:auto');
        table.setAttribute('id', this.id);
        table.setAttribute('class', 'table table-striped table-bordered');
        table.setAttribute('style', 'width: auto');
        div.appendChild(table);

        this.html = div;
        this.head = new TableHead();
        this.body = new TableBody();

        this.append = function(el){
            table.appendChild(el.html);
        };

        this.add_head_row = function(base_name){
            var toggle_anchor = new ToggleAnchor(this.base_name, this.body),
                header_cell = new TableHeaderCell(toggle_anchor.html),
                head_row = new TableRow();
            head_row.append(header_cell);
            this.head.append(head_row);
            return head_row;
        };

        this.append(this.head);
        this.append(this.body);
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
        else
            td.appendChild(content);
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
    
    TableHead.prototype = new TableProtoType();
    TableBody.prototype = new TableProtoType();
    TableRow.prototype = new TableProtoType();
    TableStandardCell.prototype = new TableProtoType();
    TableHeaderCell.prototype = new TableProtoType();


    function id_to_path(id){
        // Powerfull Regex, Huhn ??
        var path = id.toString().replace(/-/g, '.').replace(/(^|\.)([0-9]+)($|\.)/g, '[$2]$3');
        return path.split('.').pop();
    }
        
    function EditableAnchor(id, text){
        this.id = id + '-xeditable';
        var anchor = document.createElement('a');
        anchor.setAttribute('id', this.id);
        //anchor.setAttribute('data-type', 'date');
        anchor.setAttribute('data-pk', '1');
        anchor.setAttribute('data-original-title', 'Enter data');
        anchor.setAttribute('class','editable editable-click');
        $(anchor).text(text);
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
