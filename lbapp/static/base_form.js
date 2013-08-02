
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
    //this.elements = [];

    this.__defineGetter__('serialize', function(){

        for (var f in nestable_space){
            $el = $(nestable_space[f]);
            console.log($el.is('form'))
        }
    });

    this.push_form = function(form){
        for (var f in this.context_space.childNodes){
            if (this.context_space.childNodes[f].id){
                this.hide(this.context_space.childNodes[f]);
            }
        }
        this.context_space.appendChild(form.html)
        //this.elements.push(form.id);
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
    this.elements = [];


    this.create_field = function(){

        var element_id = 'nestable-' + this.id
        var field_name = 'Campo' + this.id;
        var field_desc = 'Descrição do campo ' + this.id;

        var li = document.createElement("li");
        li.setAttribute('id', element_id + '-item');
        li.setAttribute('class', "dd-item");
        li.setAttribute('data-id', this.id );

        var div = document.createElement("div");
        div.setAttribute('id', element_id + '-handle');
        div.setAttribute('class', "dd-handle");
        div.innerText = field_name;

        li.appendChild(div);
        this.nestable_space.appendChild(li)
        this.elements.push(element_id)

        var context_id = 'base-context-' + this.id;
        var field_form = [
            new NameField(context_id, placeholder=field_name),
            new DescriptionField(context_id, placeholder=field_desc),
            new DataTypeField(context_id),
            new IndicesField(context_id),
            new MultivaluedField(context_id)
        ]

        var form = new Form(context_id, field_form);
        this.context.push_form(form);
        this.id = this.id + 1;
    }

    this.remove_element = function(id){
        var item_id = 'nestable-' + id + '-item';
        var form_id = 'base-context-' + id + '-form';
        var field = document.getElementById(item_id);
        field.parentNode.removeChild(field);

        this.context.pop_form(form_id)
        var element_index = this.elements.indexOf(item_id);
        delete this.elements[element_index];
    }

    this.__defineGetter__('structure', function(){
        return $('.dd').nestable('serialize');
    });

}

nestable_space = document.getElementById('ol1');
context_space = document.getElementById('infobase2');

context = new BaseContext(context_space)

//base_metadata = $('#base-metadata-form').serializeArray()
nest = new BaseStructure(nestable_space, context)












