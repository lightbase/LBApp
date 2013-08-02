
function log(l){
    console.log(l)
}

function is_dict(object){
    return Object.prototype.isPrototypeOf(object) && !Array.prototype.isPrototypeOf(object);
}

function is_array(object){
    return Array.prototype.isPrototypeOf(object);
}

function FluidRowWrapper(){
    var div = document.createElement('div');
    div.setAttribute('class', 'row-fluid');
    this.html = div;
}
function InlineHelp(text){

    // <span class="help-inline">[text]</span>
    var help = document.createElement('span');
    help.setAttribute('help-inline', text);

    this.text = text;
    this.html = help;
}

function Label(field_id, text){

    // <label class="control-label" for=[field_id]> [text] </label>
    var label = document.createElement('label');
    label.setAttribute('class', 'control-label');
    label.setAttribute('for', field_id);
    label.innerText = text;

    this.field_id = field_id;
    this.text = text;
    this.html = label;
}

function Controls(fields){

    // <div class="controls"> [fields]</div>
    if (!is_array(fields)) throw new TypeError('fields must be instance of Array');
    var controls = document.createElement('div');
    controls.setAttribute('class', 'controls');

    for (var f in fields){
        controls.appendChild(fields[f]);
    }

    this.fields = fields;
    this.html = controls;
}

function ControlGroup(label, controls){

    // <div class="control-group"> [label] [controls]</div>
    var control_group = document.createElement('div');
    control_group.setAttribute('class', 'control-group');

    if(label instanceof Label) control_group.appendChild(label.html);
    else throw new TypeError('label is not instance of Label');
    if(controls instanceof Controls) control_group.appendChild(controls.html);
    else throw new TypeError('controls is not instance of Controls');

    this.label = label;
    this.controls = controls;
    this.html = control_group;
}

function Form(id, elements){

    // <form id=[id] > [control_group_list] </form>
    var form = document.createElement('form');
    form.setAttribute('id', id + '-form');
    form.setAttribute('style', 'display:block');

    for (var e in elements) form.appendChild(elements[e].html);

    this.id = id;
    this.elements = elements;
    this.html = form;
}

function NameField(id, placeholder){

    this.id = id + '-name';
    this.wrapper = new FluidRowWrapper();
    this.label = new Label(this.id, text='Nome');

    var input = document.createElement('input');
    input.setAttribute('id', this.id);
    input.setAttribute('name', this.id);
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', placeholder);

    this.wrapper.html.appendChild(this.label.html);
    this.wrapper.html.appendChild(input);
    this.html = this.wrapper.html;
}

function DescriptionField(id, placeholder){

    this.id = id + '-description';
    this.wrapper = new FluidRowWrapper();
    this.label = new Label(this.id, text='Descrição');

    var input = document.createElement('input');
    input.setAttribute('id', this.id);
    input.setAttribute('name', this.id);
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', placeholder);

    this.wrapper.html.appendChild(this.label.html);
    this.wrapper.html.appendChild(input);
    this.html = this.wrapper.html;
}

function DataTypeField(id){
    this.id = id + '-datatype';
    this.wrapper = new FluidRowWrapper();
    this.label = new Label(this.id, text='Tipo');
    this.datatypes = [
        'AlfaNumerico',
        'Documento',
        'Inteiro',
        'Decimal',
        'Moeda',
        'AutoEnumerado',
        'Data',
        'Hora',
        'Imagem',
        'Som',
        'Video',
        'URL',
        'Verdadeiro/Falso',
        'Texto',
        'Arquivo',
        'HTML',
        'Email'
    ]

    var select = document.createElement('select');
    select.setAttribute('name', this.id);
    select.setAttribute('class', 'span5');
    for (var t in this.datatypes){
        var option = document.createElement('option');
        option.setAttribute('id', this.id + '-' + this.datatypes[t]);
        option.setAttribute('value', this.datatypes[t]);
        option.innerText = this.datatypes[t];
        select.appendChild(option);
    }

    this.wrapper.html.appendChild(this.label.html);
    this.wrapper.html.appendChild(select);
    this.html = this.wrapper.html;
}

function IndicesField(id){

    this.id = id + '-indices';
    this.indices = [
        'SemIndice',
        'Textual',
        'Ordenado',
        'Unico',
        'Fonetico',
        'Fuzzy',
        'Vazio',
    ]

    var controls = new Array();
    for (var i in this.indices){
        var label = document.createElement('label');
        var checkbox = document.createElement('input');
        checkbox.setAttribute('id', this.id + '-' + this.indices[i]);
        checkbox.setAttribute('name', this.id);
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('value', this.indices[i]);
        label.appendChild(checkbox);
        controls.push(label);
    }

    this.label = new Label(this.id, text='Índices');
    this.controls = new Controls(controls);
    this.html = new ControlGroup(this.label, this.controls).html;

}

function MultivaluedField(id){

    this.id = id + '-multivalued';

    var label = document.createElement('label');
    var checkbox = document.createElement('input');
    checkbox.setAttribute('id', this.id);
    checkbox.setAttribute('name', this.id);
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('value', '1');
    label.appendChild(checkbox);

    this.label = new Label(this.id, text='Multivalorado');
    this.controls = new Controls([label]);
    this.html = new ControlGroup(this.label, this.controls).html;
}

function BaseContext(context_space){

    this.context_space = context_space;

    this.__defineGetter__('context', function(){
        this._context = {};
        for (var f in this.context_space.childNodes){
            var el = this.context_space.childNodes[f];
            if (el.id && $(el).is('form')){
                var el_id = el.id.split('-')[2]
                var serial = $('#' + el.id).serializeArray();
                this._context[el_id] = {};
                for (var s in serial){
                    var f_name = serial[s].name.split('-')[serial[s].name.split('-').length-1];
                    this._context[el_id][f_name] = serial[s].value;
                }
            }
        }
        return this._context;

    });

    this.push_form = function(form){
        for (var f in this.context_space.childNodes){
            if (this.context_space.childNodes[f].id){
                this.hide(this.context_space.childNodes[f]);
            }
        }
        this.context_space.appendChild(form.html)
    }

    this.pop_form = function(form_id){
        for (var f in this.context_space.childNodes){
            if (this.context_space.childNodes[f].id == form_id){
                this.remove_element(this.context_space.childNodes[f]);
            }
        }
    }

    this.focus_on = function(form_id){
        for (var f in this.context_space.childNodes){
            var _form_id = this.context_space.childNodes[f].id
            if (_form_id){
                if (_form_id == form_id){
                    this.show(this.context_space.childNodes[f]);
                }
                else{
                    this.hide(this.context_space.childNodes[f]);
                }
            }
        }
    }

    this.remove_element = function(element){
        element.parentNode.removeChild(element);
    }

    this.show = function(element){
        element.style.display = 'block';
    }

    this.hide = function(element){
        element.style.display = 'none';
    }

}

function BaseStructure(nestable_space, context){

    this.id = 1;
    this.nestable_space = nestable_space;
    this.context = context;

    this.dd_list = function(){
        var ol = document.createElement('ol');
        ol.setAttribute('class', 'dd-list');
        return ol;
    }

    this.toggle_button = function(data_action, display){
        var button = document.createElement('button');
        button.setAttribute('data-action', data_action);
        button.setAttribute('type', 'button');
        button.setAttribute('style', 'display:' + display);
        return button;
    }

    this.dd_item = function(id, no_children){
        var li = document.createElement("li");
        li.setAttribute('id', ['nestable', id, 'item'].join('-'));
        li_class = no_children ? 'dd-item dd-nochildren': 'dd-item';
        li.setAttribute('class', li_class);
        li.setAttribute('data-id', id );
        return li;
    }

    this.dd_handle = function(id, text){
        var div = document.createElement("div");
        div.setAttribute('id', ['nestable', id, 'handle'].join('-'));
        div.setAttribute('class', "dd-handle");
        div.innerText = text;
        return div;
    }

    this.field_form = function(id, field_name, field_desc){
        var context_id = ['base', 'context', id].join('-');
        return new Form(context_id, [
            new NameField(context_id, placeholder=field_name),
            new DescriptionField(context_id, placeholder=field_desc),
            new DataTypeField(context_id),
            new IndicesField(context_id),
            new MultivaluedField(context_id)
        ]);
    }

    this.group_form = function(id, group_name, group_desc){
        var context_id = ['base', 'context', id].join('-');
        return new Form(context_id, [
            new NameField(context_id, placeholder=group_name),
            new DescriptionField(context_id, placeholder=group_desc),
            new MultivaluedField(context_id)
        ]);
    }

    this.create_field = function(remand){

        var field_name = 'Campo' + this.id;
        var field_desc = 'Descrição do campo ' + this.id;

        var li = this.dd_item(this.id, no_children=true);
        var div = this.dd_handle(this.id, field_name);
        li.appendChild(div);

        var field_form = this.field_form(this.id, field_name, field_desc);
        this.context.push_form(field_form);
        this.id = this.id + 1;
        if(remand) return li;

        this.nestable_space.appendChild(li)
    }

    this.create_group = function(){
        var group_name = 'Grupo' + this.id;
        var group_desc = 'Descrição do grupo ' + this.id;
        var group_id = this.id;
        this.id = this.id + 1;

        var li = this.dd_item(group_id);
        var collapse_btn = this.toggle_button('collapse', 'block');
        var expand_btn = this.toggle_button('expand', 'none');
        var div = this.dd_handle(group_id, group_name);
        var ol = this.dd_list();
        var field1 = this.create_field(remand=true);
        var field2 = this.create_field(remand=true);
        ol.appendChild(field1);
        ol.appendChild(field2);

        li.appendChild(collapse_btn);
        li.appendChild(expand_btn);
        li.appendChild(div);
        li.appendChild(ol);

        this.nestable_space.appendChild(li)
        var group_form = this.group_form(group_id, group_name, group_desc);
        this.context.push_form(group_form);
    }

    this.remove_element = function(){
        var form = $('form[style*="block"]')[0];
        if(!form) return false;
        var nestable_id = form.id.split('-')[form.id.split('-').length - 2];
        var item_id = 'nestable-' + nestable_id + '-item';
        var field = document.getElementById(item_id);
        field.parentNode.removeChild(field);
        this.context.pop_form(form.id)
    }

    this.__defineGetter__('structure', function(){
        return $('.dd').nestable('serialize');
    });

}

nestable_space = document.getElementById('ol1');
context_space = document.getElementById('infobase2');

context = new BaseContext(context_space)

nest = new BaseStructure(nestable_space, context)












