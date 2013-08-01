
function log(l){
    console.log(l)
}

function is_dict(object){
    return Object.prototype.isPrototypeOf(object) && !Array.prototype.isPrototypeOf(object);
}

function is_array(object){
    return Array.prototype.isPrototypeOf(object);
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

function Form(id, control_group_list){

    // <form id=[id] class="form-horizontal"> [control_group_list] </form>
    var form = document.createElement('form');
    form.setAttribute('class','form-horizontal');
    form.setAttribute('id', id + '-form');

    if (is_array(control_group_list)){
        for (var g in control_group_list){
            var control_group = control_group_list[g];
            if(control_group.control_group instanceof ControlGroup){
                form.appendChild(control_group.control_group.html);
            }
            else throw new TypeError('control_group is not instance of ControlGroup');
        }
    }
    else throw new TypeError('control_group_list must be instance of Array');

    this.id = id;
    this.control_group_list = control_group_list;
    this.html = form;
}

function NameField(id, cls){

    this.id = id + '-name';
    this.class = cls;

    var input = document.createElement('input');
    input.setAttribute('id', this.id);
    input.setAttribute('name', this.id);
    input.setAttribute('type', 'text');
    if (this.class) input.setAttribute('class', this.class);
    else input.setAttribute('class', 'span2');

    this.label = new Label(this.id, text='Nome');
    this.controls = new Controls([input]);
    this.control_group = new ControlGroup(this.label, this.controls);
}

function DescriptionField(id, cls){

    this.id = id + '-description';
    this.class = cls;

    var input = document.createElement('input');
    input.setAttribute('id', this.id);
    input.setAttribute('name', this.id);
    input.setAttribute('type', 'text');
    if (this.class) input.setAttribute('class', this.class);
    else input.setAttribute('class', 'span4');

    this.label = new Label(this.id, text='Descrição');
    this.controls = new Controls([input]);
    this.control_group = new ControlGroup(this.label, this.controls);
}

function DataTypeField(id){
    this.id = id + '-datatype';
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
    select.setAttribute('class', 'span2');
    for (var t in this.datatypes){
        var option = document.createElement('option');
        option.setAttribute('id', this.id + '-' + this.datatypes[t]);
        option.setAttribute('value', this.datatypes[t]);
        option.innerText = this.datatypes[t];
        select.appendChild(option);
    }

    this.label = new Label(this.id, text='Tipo');
    this.controls = new Controls([select]);
    this.control_group = new ControlGroup(this.label, this.controls);
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
    this.control_group = new ControlGroup(this.label, this.controls);

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
    this.control_group = new ControlGroup(this.label, this.controls);
}


// Example usage

id = 'base-metadata';
//id = 'base-context-1';

base_fields = [

    new NameField(id),
    new DescriptionField(id),
    new DataTypeField(id),
    new IndicesField(id),
    new MultivaluedField(id)

]

base_metadata = $('#base-metadata-form').serializeArray()

_form = new Form(id, base_fields);

function BaseContext(context_space){

    this.context_space = context_space;
    this.show_form = function(form){
        this.context_space.innerHTML = '';
        this.context_space.appendChild(form.html)
    }


}

function NestableBase(nestable_space, context){

    this.id = 1;
    this.nestable_space = nestable_space;
    this.context = context;
    this.elements = [];

    this.create_field = function(){

        var element_id = 'nestable-field-' + this.id

        var li = document.createElement("li");
        li.setAttribute('id', element_id + '-item');
        li.setAttribute('class', "dd-item");
        li.setAttribute('data-id', this.id );

        var div = document.createElement("div");
        div.setAttribute('id', element_id + '-handle');
        div.setAttribute('class', "dd-handle");
        div.innerText = 'Campo' + this.id;

        li.appendChild(div);
        this.nestable_space.appendChild(li)
        this.elements.push(element_id)
        this.id = this.id + 1;

        var context_id = 'base-context-' + this.id;
        var field_form = [
            new NameField(context_id),
            new DescriptionField(context_id),
            new DataTypeField(context_id),
            new IndicesField(context_id),
            new MultivaluedField(context_id)
        ]

        var form = new Form(context_id, field_form);
        this.context.show_form(form);

    }

    this.remove_element = function(id){
        var id = 'nestable-field-' + id + '-item';
        var field = document.getElementById(id);
        field.parentNode.removeChild(field);
        var element_index = this.elements.indexOf(id);
        delete this.elements[element_index];
    }

    this.__defineGetter__('structure', function(){
        return $('.dd').nestable('serialize');
    });

}

nestable_space = document.getElementById('ol1');
context_space = document.getElementById('infobase2');

context = new BaseContext(context_space)

nest = new NestableBase(nestable_space, context)












