
function log(l){
    console.log(l)
}

function is_dict(object){
    return Object.prototype.isPrototypeOf(object) && !Array.prototype.isPrototypeOf(object);
}

function is_array(object){
    return Array.prototype.isPrototypeOf(object);
}

function FormField(id, placeholder){

    var input = document.createElement('input')
    input.setAttribute('type', 'text');
    input.setAttribute('id', id);
    if(placeholder) input.setAttribute('placeholder', placeholder);

    this.id = id;
    this.placeholder = placeholder;
    this.html = input
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

function Controls(form_field, help){

    // <div class="controls"> [form_field] [help]</div>
    var controls = document.createElement('div');
    controls.setAttribute('class', 'controls');

    if (form_field instanceof FormField) controls.appendChild(form_field.html);
    else throw new TypeError('form_field is not instance of FormField');
    if (help){
        if (help instanceof InlineHelp) controls.appendChild(help.html);
        else throw new TypeError('help is not instance of InlineHelp');
    }

    this.form_field = form_field;
    this.help = help;
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
    form.setAttribute('class','form-horizantal');
    form.setAttribute('id', id);

    if (is_array(control_group_list)){
        for (var g in control_group_list){
            var control_group = control_group_list[g];
            if(control_group instanceof ControlGroup) form.appendChild(control_group.html);
            else throw new TypeError('control_group is not instance of ControlGroup');
        }
    }
    else throw new TypeError('control_group_list must be instance of Array');

    this.id = id;
    this.control_group_list = control_group_list;
    this.html = form;
}



function Radio(id){

    var radio = document.createElement('label');
    checkbox.setAttribute('class', 'checkbox');
    var label = document.createElement('label');
    var input = document.createElement('input');
}

function BaseDataForm(id, base_fields){

    /*
    Class for redering a new base form.
    Base fields example:
    [
        {
            name:'Nome',
            placeholder: 'Nome da base',
            help: 'O nome deve ser único',
        },
        {
            name:'Descrição',
            placeholder: 'Descrição da base',
        }
    ]
    */

    this.id = id;
    this.base_fields = base_fields;
    this.control_group_list = new Array();

    for (var f in this.base_fields){
        var field = base_fields[f];

        // Get main info.
        var field_id = this.id + '.' + field.name ;
        var text = field.name;

        // Build field's label.
        var label = new Label(field_id, text);

        // Build field.
        var placeholder = field.placeholder? field.placeholder: null;
        var form_field = new FormField(field_id, placeholder=placeholder);

        // Wrap field.
        var help = field.help? new InlineHelp(field.help): null;
        var controls = new Controls(form_field, help=help);

        // Append to Group.
        var control_group = new ControlGroup(label, controls);
        this.control_group_list.push(control_group);
    }

    this.form = new Form(this.id, this.control_group_list);
}

function Field(val){

    this.__defineGetter__("value", function(){
        return this._value;
    });

    this.__defineSetter__("value", function(val){
        this._value = val +1;
    });

    this.value = val
}
