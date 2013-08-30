(function($) {

    $.fn.jsonviewer = function(settings) {

        var config = {
            'type_prefix': false,
            'json_name': 'unknown',
            'json_data': null,
        };

        if (settings) $.extend(config, settings);
        console.log(config['json_data'])
        var main_accordion;

        this.each(function(key, element) {
            main_accordion = format_value(config['json_name'], config['json_data']);
        });
    
        $(this).append(main_accordion.html);

        return this;

    };

    function Table(id, data){

        this.id = id.toString().replace(/\./g,'-');
        this.data = data;

        this.get_html = function(){
            // INIT ELEMENT VARIABLES
            var div = document.createElement('div');
            var table = document.createElement('table');
            var thead = document.createElement('thead');
            var tbody = document.createElement('tbody');
            var thead_tr = document.createElement('tr');
            var body_tr = document.createElement('tr');
            var field;
            var field_id;
            var thead_td;
            var body_td;
            var anchor;
            var bold;
            var obj

            // BUILD TABLE INNER ELEMENTS
            for (field in this.data){
                //if (is_dict(data[field])) continue;

                // THEAD 
                thead_td = document.createElement('td');
                bold = document.createElement('b');
                bold.innerText = field;
                thead_td.appendChild(bold);
                thead_tr.appendChild(thead_td);

                // BODY
                field_id = this.id + '-' + field;
                anchor = editable_anchor(field_id, this.data[field])
                body_td = document.createElement('td');
                body_td.appendChild(anchor);
                body_tr.appendChild(body_td);
            }

            //APPEND TABLE CHILD ELEMENTS
            div.setAttribute('style', 'overflow:auto');
            table.setAttribute('id', this.id);
            table.setAttribute('class', 'table table-condensed table-striped table-bordered');
            thead.appendChild(thead_tr);
            tbody.appendChild(body_tr);
            table.appendChild(thead);
            table.appendChild(tbody);
            div.appendChild(table);
            return div
        }

        this.html = $.isEmptyObject(data)? null: this.get_html();
    }

    function id_to_path(id){
        // Powerfull Regex, Huhn ??
        return id.toString().replace(/-/g, '.').replace(/(^|\.)([0-9]+)($|\.)/g, '[$2]$3');
    }
        
    function editable_anchor(id, text){
        var anchor = document.createElement('a');
        anchor.setAttribute('id', id);
        //anchor.setAttribute('href', '');
        anchor.setAttribute('data-type', 'text');
        anchor.setAttribute('data-pk', '1');
        anchor.setAttribute('data-original-title', 'Enter data');
        anchor.setAttribute('class','editable editable-click');
        anchor.setAttribute('style', 'display: inline;');
        anchor.innerText = text;
        return anchor
    }

    function AccordionInner(content){
        var html;
        var inner = document.createElement('div');
        inner.setAttribute('class', 'accordion-inner');
        for (var i in content){
            html = content[i].html;
            if (html != null) inner.appendChild(html);
        }
        this.content = content;
        this.html = inner;
    }

    function AccordionBody(id, inner){
        var body = document.createElement('div');
        var body_id = id.toString().replace(/\./g,'-') + '-collapse'; 
        body.setAttribute('class', 'accordion-body collapse');
        body.setAttribute('id', body_id);
        body.appendChild(inner.html);
        this.id = body_id;
        this.inner = inner
        this.html = body;
    }

    function AccordionToggle(id){
        var href = '#' + id.toString().replace(/\./g,'-') + '-collapse';
        var data_parent = '#' + id; 
        var text = id_to_path(id);
        var toggle = document.createElement('a');
        toggle.setAttribute('class', 'accordion-toggle');
        toggle.setAttribute('href', href);
        toggle.setAttribute('data-toggle', 'collapse');
        toggle.setAttribute('data-parent', data_parent);
        $(toggle).text(text);
        this.text = text
        this.html = toggle;
    }

    function AccordionHead(toggle){
        var head = document.createElement('div');
        head.setAttribute('class','accordion-heading');
        head.appendChild(toggle.html);
        this.toggle = toggle;
        this.html = head;
    }

    function AccordionGroup(head, body){
        var group = document.createElement('div');
        group.setAttribute('class','accordion-group');
        group.appendChild(head.html);
        group.appendChild(body.html);
        this.head = head;
        this.body = body
        this.html = group;
    }

    function Accordion(id){
        var accordion = document.createElement('div');
        accordion.setAttribute('class', 'accordion');
        // For some weird cause, bootstrap's accordion does not work without replacing ids
        var id = id.toString().replace(/\./g,'-') + '-accordion'
        accordion.setAttribute('id', id);
        this.id = id 
        this.html = accordion;
    }

    function accordion_group(id, text, content){
        // HEAD STUFF
        var toggle = new AccordionToggle(id, text);
        var head = new AccordionHead(toggle);
        // BODY STUFF
        var inner = new AccordionInner(content);
        var body = new AccordionBody(id, inner);
        // APPEND ACCORDION STUFF
        var group = new AccordionGroup(head, body);
        return group;
    }

    function format_value(name, data, parent_id) {

        if (parent_id)
            var id = parent_id + '-' + name;
        else
            var id = name;

        var data_type = type_of(data),
            content_type,
            table_data = { },
            content_data = [ ],
            accordion = new Accordion(id);

        for (var _name in data){
            content_type = type_of(data[_name]);
            if (content_type == 'object' || content_type == "array"){
                content_data.push(format_value(_name, data[_name], id));
            }
            else {
                table_data[_name] = data[_name];
            }
        }

        var table = new Table(id, table_data);
        content_data.push(table);
		group = accordion_group(id, 'group_text', content_data.reverse());
		accordion.group = group;
		accordion.html.appendChild(group.html);

        return accordion;
    };

    function type_of(obj){
        var type_handler = new TypeHandler(obj);
        return type_handler.type();
    }

    // number, boolean, string, object, array, date
    function TypeHandler(value) {
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
