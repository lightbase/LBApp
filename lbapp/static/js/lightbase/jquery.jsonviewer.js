(function($) {

    $.fn.jsonviewer = function(settings) {

        var config = {
            'base_name': null, 
            'reg_model': {},
            'registries': [] 
        };

        if (settings) $.extend(config, settings);

        var EXPLORER = build_explorer(
            config['base_name'],
            config['reg_model'],
            config['registries']
        );

        $(this).append(EXPLORER);
              
    };

    function build_explorer(base_name, reg_model, registries) {
        
        var table = new Table(base_name),
            thead = new TableHead(base_name),
            tbody = new TableBody(base_name),
            head_row = new TableRow(base_name + '-head'),
            toggle_anchor = new ToggleAnchor(base_name, tbody),
            header_cell,
            standard_cell,
            cell_id,
            field_type;

        header_cell = new TableHeaderCell(base_name, toggle_anchor.html);
        head_row.append(header_cell);
        thead.append(head_row);

        var ORDERED = [ ];

        for (var field in reg_model){
            ORDERED.push(field);
            cell_id = base_name + '-' + field;
            header_cell = new TableHeaderCell(cell_id, field);
            head_row.append(header_cell);
            thead.append(head_row);
        }

        $.each(registries, function(i, registry){
            
            body_row = new TableRow(base_name + '-body');
            var action_buttons = new ActionButtons();
            standard_cell = new TableStandardCell(base_name, action_buttons.html);
            body_row.append(standard_cell);

            $.each(ORDERED, function(i, field){
                var field_value = registry[field];
                if (field_value){

                    field_type = type_of(field_value);
                    
                    if (field_type != 'object' && field_type != 'array'){
                        standard_cell = new TableStandardCell(cell_id, field_value.toString());
                        body_row.append(standard_cell);
                        tbody.append(body_row);
                    }
                    else if (field_type == 'object'){
                        standard_cell = new TableStandardCell(cell_id, JSON.stringify(field_value));
                        body_row.append(standard_cell);
                        tbody.append(body_row);
                    }
                    else if (field_type == 'array'){
                    }


                }
            });

            for (var field in registry){
                var field_value = registry[field];
            }
            tbody.append(body_row);
        });

        table.append(thead);
        table.append(tbody);
        return table.html;
    };

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

    function TableRow(id){
        this.id = id + '-tr';
        var tr = document.createElement('tr');
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
        var th = document.createElement('th'),
            toggle_anchor;
        th.setAttribute('id', this.id);
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
            $(toggle.html).toggle();
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
