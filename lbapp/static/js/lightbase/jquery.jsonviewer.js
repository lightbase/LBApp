(function($) {

    $.fn.jsonviewer = function(settings) {

        var config = {
            'base_name': null, 
            'base_content': [],
            'registries': [] 
        };

        if (settings) $.extend(config, settings);

        var EXPLORER = build_explorer(
            config['base_name'],
            config['base_content'],
            config['registries']
        );

        $(this).append(EXPLORER);
              
    };

    function build_explorer(base_name, base_content, registries) {
        
        var table = new Table(base_name),
            thead = new TableHead(base_name),
            tbody = new TableBody(base_name),
            head_row = new TableRow(base_name + '-head'),
            toggle_anchor = new ToggleAnchor(base_name, tbody),
            header_cell = new TableHeaderCell(base_name, toggle_anchor.html),
            fields_order = [ ],
            groups_order = [ ],
            field,
            group;

        head_row.append(header_cell);
        thead.append(head_row);
        
        $.each(base_content, function(i, struc){
            if (struc['field']){
                field = struc['field'];
                fields_order.push(field.name);
                cell_id = base_name + '-' + field.name;
                header_cell = new TableHeaderCell(cell_id, field.name);
                head_row.append(header_cell);
                thead.append(head_row);
            }
            if (struc['group']){
                group = struc['group'];
                groups_order.push(group.metadata.name);
            }
        });

        console.log(groups_order)

        rows = [ ];
        $.each(registries, function(i, registry){
            rows = get_registry_rows(base_name, fields_order, groups_order, registry);
            $.each(rows, function(i, row){
                tbody.append(row);
            });
        });

        table.append(thead);
        table.append(tbody);
        return table.html;
    };

    function get_registry_rows(base_name, fields_order, groups_order, registry){
        var rows,
            body_row,
            action_buttons,
            standard_cell,
            cell_id,
            field_value; 

        body_row = new TableRow(base_name + '-body');
        action_buttons = new ActionButtons();
        standard_cell = new TableStandardCell(base_name, action_buttons.html);
        body_row.append(standard_cell);

        $.each(groups_order, function(i, group){
            console.log(i, group)
        });

        $.each(fields_order, function(i, field){

            cell_id = base_name + '-' + field;
            field_value = registry[field];
            if (field_value){

                field_type = type_of(field_value);
                
                if (field_type != 'object' && field_type != 'array'){
                    standard_cell = new TableStandardCell(cell_id, field_value.toString());
                    body_row.append(standard_cell);
                }
                else if (field_type == 'object'){
                    standard_cell = new TableStandardCell(cell_id, JSON.stringify(field_value));
                    body_row.append(standard_cell);
                }
                else if (field_type == 'array'){
                }
            }
        });
        return [body_row];
    }

    function ActionButtons(){
        var div = document.createElement('div');
            anchor = document.createElement('a');
            icon = document.createElement('i');
        icon.setAttribute('class', 'icon-pencil bigger-130');
        anchor.setAttribute('class', 'green');
        anchor.setAttribute('href', 'javascript: void(0)');
        div.setAttribute('class', 'hidden-phone visible-desktop action-buttons');
        anchor.appendChild(icon);
        div.appendChild(anchor);
        this.html = div;
    }

    function Table(id){
        this.id = id + '-table';
        var div = document.createElement('div');
        var table = document.createElement('table');
        div.setAttribute('style', 'overflow:auto');
        table.setAttribute('id', this.id);
        table.setAttribute('class', 'table table-striped table-bordered table-hover');
        table.setAttribute('style', 'width: auto');
        div.appendChild(table);
        this.html = div;
        this.append = function(el){
            table.appendChild(el.html);
        }
    }

    function TableHead(id){
        this.id = id + '-thead';
        var thead = document.createElement('thead');
        thead.setAttribute('id', this.id);
        this.html = thead;
    }

    function TableBody(id){
        this.id = id + '-tbody';
        var tbody = document.createElement('tbody');
        tbody.setAttribute('id', this.id);
        this.html = tbody;
    }

    function TableRow(id, colspan){
        this.id = id + '-tr';
        var tr = document.createElement('tr');
        if (colspan) tr.setAttribute('colspan', colspan);
        tr.setAttribute('id', this.id);
        this.html = tr;
    }

    function TableStandardCell(id, content){
        this.id = id + '-td';
        var td = document.createElement('td');
        td.setAttribute('id', this.id);
        if (type_of(content) == 'string')
            $(td).text(content);
        else
            td.appendChild(content);
        this.html = td;
    }

    function TableHeaderCell(id, content){
        this.id = id + '-th';
        var th = document.createElement('th');
        th.setAttribute('id', this.id);
        th.setAttribute('class', 'sorting');
        if (type_of(content) == 'string')
            $(th).text(content);
        else
            th.appendChild(content);
        this.html = th;
    }

    function ToggleAnchor(text, toggle){
        var anchor = document.createElement('a');
        anchor.setAttribute('href', '#' + toggle.id);
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
        anchor.setAttribute('data-type', 'date');
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
