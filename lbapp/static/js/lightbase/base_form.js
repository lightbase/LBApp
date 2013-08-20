
/* DataType Defaults */

var DATATYPES= [
    'Texto',
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
    'Arquivo',
    'HTML',
    'Email',
    'JSON'
];

var DATATYPE_ICONS = {
    'Texto'            :'icon-text-width',
    'AlfaNumerico'     :'icon-font',
    'Documento'        :'icon-file-text',
    'Inteiro'          :'icon-info',
    'Decimal'          :'iDecimal',
    'Moeda'            :'icon-usd',
    'AutoEnumerado'    :'icon-list-ol',
    'Data'             :'icon-calendar',
    'Hora'             :'icon-time',
    'Imagem'           :'icon-picture',
    'Som'              :'icon-volume-up',
    'Video'            :'icon-film',
    'URL'              :'icon-globe',
    'Verdadeiro/Falso' :'icon-check',
    'Arquivo'          :'icon-file',
    'HTML'             :'icon-code',
    'Email'            :'iEmail',
    'JSON'             :'iJSON'
};

/* Indices Defaults */

var INDICES = [
    'Textual', // Update document on change.
    'Ordenado', // Update document on change.
    'Unico',
    'Fonetico',
    'Fuzzy',
    'Vazio', // Update document on change.
];

/* Index Versus Datatypes prohibitions Defaults.
   Each datatype cannot be created with related index. */

var PROHIBITIONS= {
    'AlfaNumerico': [
    ],
    'Documento': [
        'Ordenado',
        'Unico',
    ],
    'Inteiro': [
        'Fonetico',
        'Fuzzy',
    ],
    'Decimal': [
        'Fonetico',
        'Fuzzy',
    ],
    'Moeda': [
        'Fonetico',
        'Fuzzy',
    ],
    'AutoEnumerado': [
        'Fonetico',
        'Fuzzy',
        'Vazio'
    ],
    'Data/Hora': [
        'Fonetico',
        'Fuzzy',
    ],
    'Data': [
        'Fonetico',
        'Fuzzy',
    ],
    'Hora': [
        'Fonetico',
        'Fuzzy',
    ],
    'Imagem': [
        'Ordenado',
        'Unico',
        'Fonetico',
        'Fuzzy',
    ],
    'Som': [
        'Ordenado',
        'Unico',
        'Fonetico',
        'Fuzzy',
    ],
    'Video': [
        'Ordenado',
        'Unico',
        'Fonetico',
        'Fuzzy',
    ],
    'URL': [
        'Fonetico',
        'Fuzzy',
    ],
    'Verdadeiro/Falso': [
        'Unico',
        'Fonetico',
        'Fuzzy',
    ],
    'Texto': [
        'Ordenado',
        'Unico',
    ],
    'Arquivo': [
        'Ordenado',
        'Unico',
    ],
    'HTML': [
        'Ordenado',
        'Unico',
    ],
    'Email': [
    ],
    'JSON': [
        'Ordenado',
        'Unico',
    ]
}


function log(l){
    console.log(l)
}


/* Form Classes and html definitions. */

function Label(field_id, text){

    var label = document.createElement('label'),
        bold = document.createElement('b');
    label.setAttribute('for', field_id);
    $(bold).text(text);
    label.appendChild(bold);
    this.field_id = field_id;
    this.text = text;
    this.html = label;
}

function Controls(fields){

    if (!$.isArray(fields)) throw new TypeError('fields must be instance of Array');
    var controls = document.createElement('div');
    controls.setAttribute('class', 'controls');
    for (var f in fields)
        controls.appendChild(fields[f]);
    this.fields = fields;
    this.html = controls;
}

function ControlGroup(label, controls, cls){

    var control_group = document.createElement('div');
    control_group.setAttribute('class', 'control-group ' + cls);

    if(label instanceof Label) control_group.appendChild(label.html);
    else throw new TypeError('label is not instance of Label');
    if(controls instanceof Controls) control_group.appendChild(controls.html);
    else throw new TypeError('controls is not instance of Controls');

    this.label = label;
    this.controls = controls;
    this.html = control_group;
}

function Form(id, elements){

    var form_id = ['base', 'context', id, 'form'].join('-'),
        form = document.createElement('form'),
        attributes = {
            'id'     : form_id,
            'data-id': id,
            'style'  : 'display:block'
        };
    $.each(attributes, function(k, v){
        form.setAttribute(k, v);
    });
    for (var e in elements)
        form.appendChild(elements[e].html);

    this.id = form_id;
    this.data_id = id;
    this.elements = elements;
    this.html = form;
}

function FormActions(id){
    this.id = ['base-context', id, 'form-actions'].join('-');
    this.confirm = new ConfirmButton(id);
    this.cancel = new CancelButton(id);
    this.edit = new EditButton(id);

    var div = document.createElement('div'),
        span = document.createElement('span');

    $(span).text('   ');
    div.setAttribute('class', 'row-fluid span12');
    div.appendChild(this.confirm.html);
    div.appendChild(span);
    div.appendChild(this.cancel.html);
    div.appendChild(this.edit.html);

    this.html = div;
}

function ConfirmButton(id){
    this.id = ['base-context', id, 'confirm-button'].join('-');
    var button = document.createElement('button'),
        icon = document.createElement('i'),
        attributes = {
            'id'     : this.id,
            'data-id':  id,
            'class'  : 'btn btn-info btn-small',
            'type'   : 'button'
        }
    $.each(attributes, function(k, v){
        button.setAttribute(k, v);
    });
    icon.setAttribute('class', 'icon-ok');
    $(icon).text(' Confirmar');
    button.appendChild(icon);
    this.html = button;
}

function CancelButton(id){
    this.id = ['base-context', id, 'cancel-button'].join('-');
    var button = document.createElement('button'),
        icon = document.createElement('i'),
        attributes = {
            'id'     : this.id,
            'class'  : 'btn btn-small',
            'type'   : 'button',
            'style'  : 'display: none',
            'data-id':  id,
        }
    $.each(attributes, function(k, v){
        button.setAttribute(k, v);
    });
    icon.setAttribute('class', 'icon-undo');
    $(icon).text(' Cancelar');
    button.appendChild(icon);
    this.html = button;
}

function EditButton(id){
    this.id = ['base-context', id, 'edit-button'].join('-');
    var button = document.createElement('button'),
        icon = document.createElement('i'),
        attributes = {
            'id'     : this.id,
            'data-id':  id,
            'class'  : 'btn btn-success btn-small',
            'type'   : 'button',
            'style'  : 'display: none'
        }
    $.each(attributes, function(k, v){
        button.setAttribute(k, v);
    });
    icon.setAttribute('class', 'icon-edit');
    $(icon).text(' Editar');
    button.appendChild(icon);
    this.html = button;
}

function NameField(id){

    this.id = ['base', 'context', id, 'name'].join('-');
    this.label = new Label(this.id, text='Nome');
    var input = document.createElement('input'),
        attributes = {
        'id'         : this.id,
        'name'       : this.id,
        'data-id'    : id,
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

function DescriptionField(id){

    this.id = ['base', 'context', id, 'description'].join('-');
    this.label = new Label(this.id, text='Descrição');
    var input = document.createElement('input'),
        attributes = {
        'id'         : this.id,
        'name'       : this.id,
        'class'      : 'input-xlarge',
        'type'       : 'text',
    };
    $.each(attributes, function(k, v){
        input.setAttribute(k, v);
    });

    this.input = input;
    this.controls = new Controls([this.input]);
    this.html = new ControlGroup(this.label, this.controls).html;
}

function DataTypeField(id){

    this.id = ['base', 'context', id, 'datatype'].join('-');
    this.label = new Label(this.id, text='Tipo');
    this.datatypes = DATATYPES;
    var select = document.createElement('select'),
        attributes = {
            'name'      : this.id,
            'id'        : this.id,
            'data-id'   : id,
            'class'     : 'span7'
        };
    $.each(attributes, function(k, v){
        select.setAttribute(k, v);
    });
    for (var t in this.datatypes){
        var option = document.createElement('option');
        option.setAttribute('id', this.id + '-' + this.datatypes[t]);
        option.setAttribute('value', this.datatypes[t]);
        $(option).text(this.datatypes[t]);
        select.appendChild(option);
    }

    this.input = select;
    this.controls = new Controls([this.input]);
    this.html = new ControlGroup(this.label, this.controls).html;
}

function IndicesField(id){
    this.id = ['base', 'context', id, 'indices'].join('-');
    this.indices = INDICES;
    var controls = new Array(),
        input = [];
    for (var i in this.indices){
        var label = document.createElement('label'),
            checkbox = document.createElement('input');
            span = document.createElement('span');
            attributes = {
                'id'        : this.id + '-' + this.indices[i],
                'name'      : this.id,
                'data-id'   : id,
                'index-name': this.indices[i],
                'type'      : 'checkbox',
                'value'     : this.indices[i]
            };
        $.each(attributes, function(k, v){
            checkbox.setAttribute(k, v);
        });
        if(this.indices[i] == 'Textual')
            checkbox.setAttribute('checked', '');
        label.setAttribute('class', 'span5');
        label.appendChild(checkbox);
        if (PROHIBITIONS[DATATYPES[0]].indexOf(this.indices[i])>-1)
            label.setAttribute('style', 'display: none');
        input.push(checkbox);
        span.setAttribute('class', 'lbl')
        $(span).text(' ' + this.indices[i]);
        label.appendChild(span);
        controls.push(label);
    }
    this.input = input;
    this.label = new Label(this.id, text='Índices');
    this.controls = new Controls(controls);
    this.html = new ControlGroup(this.label, this.controls).html;
}

function RequiredField(id){
    this.id = ['base', 'context', id, 'required'].join('-');
    var label = document.createElement('label'),
        checkbox = document.createElement('input'),
        span = document.createElement('span'),
        attributes = {
            'id'        : this.id,
            'name'      : this.id,
            'data-id'   : id,
            'type'      : 'checkbox',
            'class'     : 'ace-switch ace-switch-6'
        };
    $.each(attributes, function(k, v){
        checkbox.setAttribute(k, v);
    });
    span.setAttribute('class', 'lbl');
    label.appendChild(checkbox);
    label.appendChild(span);
    this.input = checkbox;
    this.label = new Label(this.id, text='Obrigatório');
    this.controls = new Controls([label]);
    this.html = new ControlGroup(this.label, this.controls, cls='pull-left span4').html;
}

function MultivaluedField(id){
    this.id = ['base', 'context', id, 'multivalued'].join('-');
    var label = document.createElement('label'),
        checkbox = document.createElement('input'),
        span = document.createElement('span'),
        attributes = {
            'id'        : this.id,
            'name'      : this.id,
            'data-id'   : id,
            'type'      : 'checkbox',
            'class'     : 'ace-switch ace-switch-6'
        };
    $.each(attributes, function(k, v){
        checkbox.setAttribute(k, v);
    });
    span.setAttribute('class', 'lbl');
    label.appendChild(checkbox);
    label.appendChild(span);
    this.label = new Label(this.id, text='Multivalorado');
    this.controls = new Controls([label]);
    this.html = new ControlGroup(this.label, this.controls, cls='pull-center span7').html;
}

/*
    Plugin Classes.
    BaseContext: Properties from each Base field.
    BaseStructure: Base items that composite its structure.
*/

function BaseContext(context_space){

    this.context_space = context_space;
    var self = this;

    this.__defineGetter__('context', function(){
        var _context = {},
            data_id,
            serial,
            disabled,
            fname;
        $(this.context_space).children('form').each(function(){
            data_id = this.getAttribute('data-id');
            disabled = $(this).find(':input:disabled').removeAttr('disabled');
            _context[data_id] = {};
            _context[data_id].indices = [];
            _context[data_id].multivalued = false;
            _context[data_id].required = false;
            $.each($(this).serializeArray(), function(k,v){
                f_name = v.name.split('-' + data_id + '-')[1];
                if (f_name == 'indices')
                    _context[data_id][f_name].push(v.value);
                else if (f_name == 'required')
                    _context[data_id][f_name] = true;
                else if (f_name == 'multivalued')
                    _context[data_id][f_name] = true;
                else
                    _context[data_id][f_name] = v.value;
            });
            disabled.attr('disabled','disabled');
            if (_context[data_id].indices.length == 0){
                if (_context[data_id].datatype == 'AutoEnumerado')
                    _context[data_id].indices.push('Ordenado');
                else
                    _context[data_id].indices.push('Textual');
            }
        });
        return _context;
    });

    this.validate = function(){
        var is_valid = true;
        $(this.context_space).children('form').each(function(){
            if (!self.edit_mode)
                self.focus_on(this.id);
            if (!$(this).valid())
                is_valid = false;
            if (!$(this).attr('disabled') ){
                is_valid = false;
                if (!self.edit_mode)
                bootbox.alert('Por favor confirme todos os campos.');
                return false;
            }
        });
        return is_valid;
    };

    this.add_rules = function(form){

        $.validator.addMethod('alphanumeric', function (value, element) {
            /*http://stackoverflow.com/questions/4977898/check-for-valid-sql-column-name*/
            return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value);
        }, "Preencha com caracteres válidos");

        $.validator.addMethod('single_level_field', function (value, element) {
            var data_id = element.getAttribute('data-id'),
                parent = $('#nestable-' + data_id + '-item').parent(),
                response = true,
                sibling;
                $(parent).children('li').each(function(){
                    sibling = this.getAttribute('data-id');
                    if(sibling != data_id){
                        if ($('#base-context-' + sibling + '-name')[0].value == value)
                            response = false;
                    }
                });
            return response;
        }, "Proibido repetir no mesmo nível");

        $(form.html).validate({
            invalidHandler: function (event, validator) { //display error alert on form submit   
                //$('.alert-error', $('.login-form')).show();
            },
            highlight: function (e) {
                $(e).closest('.control-group').removeClass('info').addClass('error');
            },
            success: function (e) {
                $(e).closest('.control-group').removeClass('error').addClass('info');
                $(e).remove();
            },
            onkeyup: function(e){
                var is_valid = $(e).valid();
                var field_name = $(e).attr('name').split('-');
                if (is_valid && (field_name[field_name.length -1] == 'name')){
                    var data_id = $(e).attr('data-id');
                    var item_content =  $(['#nestable', data_id, 'content'].join('-'))[0];
                    $(item_content).text($(e).val());
                }
            }
        });

        $(form.elements).each(function(k,v){
            if(v instanceof NameField){
                $(v.input).rules('add', {
                    required: true,
                    alphanumeric: 'required',
                    maxlength: 30,
                    single_level_field: 'required',
                    messages: {
                        required: 'Preencha o campo Nome.',
                        maxlength: 'Máximo de caracteres excedido.'
                    }
                });
            }
            if(v instanceof DescriptionField){
                $(v.input).rules('add', {
                    required: true,
                    maxlength: 256,
                    messages: {
                        required: 'Preencha o campo Descrição.',
                        maxlength: 'Máximo de caracteres excedido.'
                    }
                });
            }
            if(v instanceof DataTypeField){
                var data_id = v.input.getAttribute('data-id'),
                    index_el,
                    required_el,
                    datatype,
                    datatype_icon_el,
                    forbidden_indices;
                $(v.input).on('change',function(e){
                    forbidden_indices = PROHIBITIONS[this.value];
                    datatype = this.value;
                    datatype_icon_el = $(['#nestable', data_id, 'datatype-icon'].join('-'))[0];
                    datatype_icon_el.setAttribute('class', 'bigger-140 blue normal-icon ' + DATATYPE_ICONS[datatype] );
                    $.each(INDICES, function(i, index){
                        index_el = $(['#base', 'context', data_id, 'indices', index].join('-'));
                        if (datatype === 'AutoEnumerado')
                            index_el[0].checked = false;
                        else
                            index_el[0].checked = index == 'Textual'? true: false;
                        if ($.inArray(index, forbidden_indices) != -1){
                            // Forbidden index detected.
                            index_el.parent().hide();
                        }
                        else{
                            // Nothing to worry about.
                            required_el = $(['#base-context', data_id, 'required'].join('-'));
                            if (!((index == 'Vazio') && required_el[0].checked))
                                index_el.parent().show();
                        }
                    });
                });
            }
            if(v instanceof MultivaluedField){}
            if(v instanceof RequiredField){
                $(v.input).change(function(){
                    var data_id = this.getAttribute('data-id'),
                        empty_index_el = $(['#base-context', data_id, 'indices-Vazio'].join('-'));
                        if(v.input.checked){
                            empty_index_el[0].checked = false;
                            empty_index_el.parent().hide();
                        }
                        else
                            empty_index_el.parent().show();
                });
            }
            if(v instanceof IndicesField){}
            if(v instanceof FormActions){
                $(v.confirm.html).click(function(){
                    if (!$(form.html).valid())
                        return false;
                    $(v.html).parent('form').find('select').each(function(i, el){
                        el.setAttribute('init-value', el.value);
                    });
                    $(v.html).parent('form').find('input').each(function(i, el){
                        if (el.type == 'text')
                            el.setAttribute('init-value', el.value);
                        else if (el.type == 'checkbox')
                            el.setAttribute('init-value', el.checked);
                    });
                    $(this).hide();
                    $(['#base-context', $(this).attr('data-id'), 'cancel-button'].join('-')).hide();
                    $(['#base-context', $(this).attr('data-id'), 'edit-button'].join('-')).show();
                    $(v.html).parent('form').find('input').attr('disabled', 'disabled');
                    $(v.html).parent('form').find('select').attr('disabled', 'disabled');
                    $(v.html).parent('form').attr('disabled', 'disabled');
                    base.refresh_item($(this).attr('data-id'));
                });
                $(v.cancel.html).click(function(){
                        $(v.html).parent('form').find('select').each(function(i, el){
                            var init_value = el.getAttribute('init-value');
                            if (init_value)
                                el.value = init_value;
                                $(el).change();
                        });
                        $(v.html).parent('form').find('input').each(function(i, el){
                            var init_value = el.getAttribute('init-value');
                            if (init_value){
                                if (el.type == 'text')
                                    el.value = init_value;
                                else if (el.type == 'checkbox'){
                                    if(init_value == 'true')
                                    el.checked = true;
                                    if(init_value == 'false')
                                    el.checked = false;
                                }
                            }
                        });
                        if (!$(form.html).valid())
                            return false;
                        $(v.html).parent('form').attr('disabled', 'disabled');
                        $(v.html).parent('form').find('input').attr('disabled', 'disabled');
                        $(v.html).parent('form').find('select').attr('disabled', 'disabled');
                        $(this).hide();
                        $(['#base-context', $(this).attr('data-id'), 'confirm-button'].join('-')).hide();
                        $(['#base-context', $(this).attr('data-id'), 'edit-button'].join('-')).show();
                });
                $(v.edit.html).click(function(){
                    $(this).hide();
                    $(v.html).parent('form').removeAttr('disabled');
                    $(v.html).parent('form').find(':input:disabled').removeAttr('disabled');
                    $(['#base-context', $(this).attr('data-id'), 'confirm-button'].join('-')).show();
                    $(['#base-context', $(this).attr('data-id'), 'cancel-button'].join('-')).show();
                });
            }
        });
    };

    this.push_form = function(form){
        $(this.context_space).children('form').each(function(){
            $(this).hide();
        });
        this.context_space.appendChild(form.html);
    };

    this.pop_form = function(form_id){
        $(this.context_space).children('form').each(function(){
            if (this.id == form_id)
                $(this).remove();
        });
    };

    this.focus_on = function(form_id){
        var item_handle;
        $(this.context_space).children('form').each(function(){
            item_content = $(['#nestable', this.getAttribute('data-id'), 'content'].join('-'));
            if (this.id == form_id){
                $(this).show();
                item_content[0].setAttribute('class','dd2-content btn-info no-hover');
            }
            else{
                $(this).hide();
                item_content[0].setAttribute('class','dd2-content no-hover');
            }
        });
    };

    this.__defineGetter__('current_form', function(){
        return $('form[style*="block"]')[0];
    });

    this.__defineGetter__('last_form', function(){
        var forms = $(this.context_space).children('form');
        if (forms.length){
            return forms[forms.length-1].id;
        }
    });
}

function BaseStructure(nestable_space, context){

    this.id = 1;
    this.nestable_space = nestable_space;
    this.context = context;
    this.auto_append = false;
    this.auto_append_el = undefined;
    self = this;

    this.nestable_space.scroll_top = function(){
        var scroll_div = $(this).parent().parent();
        $(scroll_div).stop().animate({
          scrollTop: -$(scroll_div)[0].scrollHeight
        }, duration=1000);
    };

    this.nestable_space.scroll_bottom = function(){
        var scroll_div = $(this).parent().parent();
        $(scroll_div).stop().animate({
          scrollTop: $(scroll_div)[0].scrollHeight
        }, duration=1000);
    };

    this.dd_list = function(){
        var ol = document.createElement('ol');
        ol.setAttribute('class', 'dd-list');
        return ol;
    };

    this.toggle_button = function(data_action, display){
        var button = document.createElement('button');
        button.setAttribute('data-action', data_action);
        button.setAttribute('type', 'button');
        button.setAttribute('style', 'display:' + display);
        return button;
    };

    this.dd_item = function(id, no_children){
        var li = document.createElement("li");
        li.setAttribute('id', ['nestable', id, 'item'].join('-'));
        li_class = no_children ? 'dd-item dd2-item dd-nochildren': 'dd-item dd2-item';
        li.setAttribute('class', li_class);
        li.setAttribute('data-id', id );
        return li;
    };

    this.dd_handle = function(id, group){
        var div = document.createElement("div"),
            datatype_icon = document.createElement('i'),
            move_icon = document.createElement('i');

        for(var init_icon in DATATYPE_ICONS) break;
        if (group)
            datatype_icon.setAttribute('class', 'bigger-140 red normal-icon icon-indent-right');
        else
            datatype_icon.setAttribute('class', 'bigger-140 blue normal-icon ' + DATATYPE_ICONS[init_icon]);
        datatype_icon.setAttribute('id', ['nestable', id, 'datatype-icon'].join('-'));
        move_icon.setAttribute('class', 'drag-icon icon-move');
        div.setAttribute('id', ['nestable', id, 'handle'].join('-'));
        div.setAttribute('class', "dd-handle dd2-handle");
        div.appendChild(datatype_icon);
        div.appendChild(move_icon);
        return div;
    };

    this.dd_content = function(id, text){
        var div = document.createElement("div");
        div.setAttribute('id', ['nestable', id, 'content'].join('-'));
        div.setAttribute('class', 'dd2-content btn-info no-hover');
        $(div).text(text);
        return div
    };

    this.field_form = function(id, field_name, field_desc){
        return new Form(id, [
            new NameField(id),
            new DescriptionField(id),
            new DataTypeField(id),
            new RequiredField(id),
            new MultivaluedField(id),
            new IndicesField(id),
            new FormActions(id)
        ]);
    };

    this.group_form = function(id, group_name, group_desc){
        return new Form(id, [
            new NameField(id),
            new DescriptionField(id),
            new MultivaluedField(id),
            new FormActions(id)
        ]);
    };

    this.get_auto_append_element = function(){
        var append_element = this.nestable_space;
        if(this.auto_append){
            if(this.auto_append_el){
                append_element = this.auto_append_el;
            }
            else{
                if(this.current_item){
                    append_element = this.current_item.is_group?
                        $(this.current_item).children('ol')[0]:
                        this.nestable_space;
                }
                this.auto_append_el = append_element;
            }
        }
        return append_element;
    };

    this.create_field = function(remand, check_valid){

        if(check_valid)
            if(!this.context.validate()) return false;

        var field_name = 'Campo' + this.id,
            field_desc = 'Descrição do campo ' + this.id,
            li = this.dd_item(this.id, no_children=true),
            handle = this.dd_handle(this.id),
            content = this.dd_content(this.id, field_name),
            append_element = this.get_auto_append_element(),
            field_form = this.field_form(this.id, field_name, field_desc);

        li.appendChild(handle);
        li.appendChild(content);
        this.context.push_form(field_form);
        this.context.add_rules(field_form);
        this.id = this.id + 1;
        if(remand) return li;
        append_element.appendChild(li);
        this.context.focus_on(field_form.id);
        this.nestable_space.scroll_bottom();
    };

    this.create_group = function(remand){

        if(!this.context.validate() && !remand) return;

        var group_name = 'Grupo' + this.id,
            group_desc = 'Descrição do grupo ' + this.id,
            group_id = this.id;

        this.id = this.id + 1;

        var li = this.dd_item(group_id),
            collapse_btn = this.toggle_button('collapse', 'block'),
            expand_btn = this.toggle_button('expand', 'none'),
            handle = this.dd_handle(group_id, group=true),
            content = this.dd_content(group_id, group_name),
            ol = this.dd_list();
        if (remand){
            li.appendChild(collapse_btn);
            li.appendChild(expand_btn);
            li.appendChild(handle);
            li.appendChild(content);
            li.appendChild(ol);

            var group_form = this.group_form(group_id, group_name, group_desc);
            this.context.push_form(group_form);
            this.context.add_rules(group_form);
            return li;
        }

        var field1 = this.create_field(remand=true),
            field2 = this.create_field(remand=true),
            append_element = this.get_auto_append_element();

        ol.appendChild(field1);
        ol.appendChild(field2);

        li.appendChild(collapse_btn);
        li.appendChild(expand_btn);
        li.appendChild(handle);
        li.appendChild(content);
        li.appendChild(ol);

        append_element.appendChild(li);
        var group_form = this.group_form(group_id, group_name, group_desc);
        this.context.push_form(group_form);
        this.context.add_rules(group_form);
        this.nestable_space.scroll_bottom();
        this.context.focus_on(group_form.id);

        if(this.auto_append)
            this.auto_append_el = ol;
    };

    this.get_item_children = function(item_id){
        return this.refresh(
            parse_list=$('#'+item_id).children('ol'),
            remand_children=true
        );
    };

    this.remove_element = function(){
        var form = this.context.current_form,
            item_id = ['nestable', form.getAttribute('data-id'), 'item'].join('-'),
            list_item = $('#' + item_id);

        // Check and block if is user is trying to delete a field which is within a group, 
        // and this group only has one child field.
        if ( list_item.parent().children().length == 1){
            if (list_item.parent()[0].id == this.nestable_space.id){
                alert('A base precisa de ao menos um campo.')
                return false
            }
            else {
                alert('grupos devem ter ao menos 1 campo');
                return false
            }
        }

        // Remove Element Children.
        var item_children = this.get_item_children(item_id);
        $(item_children).each(function(){
            var form_id = ['base', 'context', this.getAttribute('data-id'), 'form'].join('-');
            $('#'+ form_id).remove();
            $(this).remove();
        });

        // Remove Element.
        $('#' + item_id).remove();
        this.context.pop_form(form.id);

        if(!document.contains(this.auto_append_el))
            this.auto_append_el = undefined;

        // Focus on last form.
        var last_form = this.context.last_form;
        if (last_form){
            this.context.focus_on(last_form);
        }
    };

    this.refresh_item = function(data_id){
        var inner_text = $(['#base-context', data_id, 'name'].join('-'))[0].value;
        $(['#nestable', data_id, 'content'].join('-')).text(inner_text);
    };

    this.refresh = function(parse_list, remand_children){
        var data,
            children_list = [],
            depth = 0,
            list  = this;
            step  = function(level, depth){

                var array = [ ],
                    items = level.children('li');
                items.each(function(i)
                {
                    var li   = $(this),
                        item = $.extend({}, li.data()),
                        sub  = li.children('ol'),
                        context_id = ['base', 'context', item.id, 'name'].join('-'),
                        item_name = $('#' + context_id)[0].value;

                    children_list.push(li[0]);

                    if(item_name){
                        $(items[i]).children('div')[1].innerText = item_name;
                    }
                    if (sub.length) {
                        item.children = step(sub, depth + 1);
                    }
                    array.push(item);
                });
                return array;
            };

        var parse_list = parse_list? parse_list :$('#' + this.nestable_space.id);
        data = step(parse_list, depth);
        if (remand_children) return children_list;

        return data;
     };

    this.__defineGetter__('structure', function(){
        return $('.dd').nestable('serialize');
    });

    this.__defineGetter__('json', function(){
        var structure = this.structure,
            context = this.context.context,
            metadata = this.metadata,
            base = {},
            go_further = function(_structure){
                var frame_data,
                    _content = [];
                $.each(_structure, function(i, frame){
                    frame_data = context[frame.id];
                    if (frame.children){
                        _content.push({
                            group: {
                                metadata: {
                                    name: frame_data.name,
                                    description: frame_data.description,
                                    multivalued: frame_data.multivalued,
                                },
                                content: go_further(frame.children)
                            }
                        });
                    }
                    else{
                        _content.push({
                            field: {
                                name: frame_data.name,
                                description: frame_data.description,
                                datatype: frame_data.datatype,
                                required: frame_data.required,
                                multivalued: frame_data.multivalued,
                                indices: frame_data.indices
                            }
                        });
                    }
                });
                return _content;
            };
        base.metadata = metadata;
        base.content = go_further(structure);
        return JSON.stringify(base);
    });

    this.__defineGetter__('current_item', function(){
        var item_id,
            _current_item,
            current_form = this.context.current_form;
        if (current_form){
            item_id = ['nestable', current_form.getAttribute('data-id'), 'item'].join('-');
            _current_item = $('#' + item_id)[0];
            if (_current_item){
                _current_item.is_group = $(_current_item).children('ol').length > 0;
            }
            return _current_item;
        }
        return undefined;
    });

    this.context_element = function(data_id, field_name, index){
        var id_list = ['#base-context', data_id, field_name];
        if (index)
            id_list.push(index);
        return $(id_list.join('-'));
    }

    this.build_from_json = function(json_base){
        var data,
            ids = [],
            step  = function(content){
                var field,
                    group,
                    child,
                    children,
                    data_id,
                    response = [];

                $(content).each(function(){
                    if(this.field){
                        field = self.create_field(remand=true);
                        data_id = $(field).attr('data-id');
                        ids.push(data_id);

                        self.context_element(data_id, 'name').val(this.field.name);
                        self.context_element(data_id, 'description').val(this.field.description);
                        self.context_element(data_id, 'datatype').val(this.field.datatype);
                        self.context_element(data_id, 'multivalued').val(this.field.multivalued);
                        self.context_element(data_id, 'required').val(this.field.required);

                        $.each(this.field.indices, function(i, index){
                            self.context_element(data_id, 'indices', index).attr('checked', true);
                        });
                        response.push(field);
                    }
                    else if(this.group){
                        group = self.create_group(remand=true);

                        data_id = $(group).attr('data-id');
                        ids.push(data_id);
                        self.context_element(data_id, 'name').val(this.group.metadata.name);
                        self.context_element(data_id, 'description').val(this.group.metadata.description);
                        self.context_element(data_id, 'multivalued').attr('checked',
                            this.group.metadata.multivalued);

                        children = step(this.group.content);
                        $.each(children, function(i, child){
                            $(group).children('ol')[0].appendChild(child);
                        });
                        response.push(group);
                    }
                });
                return response;
            };
        items = step(json_base.content);
        $.each(items, function(i, item){
            self.nestable_space.appendChild(item);
        });
        $.each(ids, function(i, id){
            self.context_element(id, 'confirm-button').click();
        });
        self.context.focus_on(self.context.last_form);
        return items;
    };
}

/* Initialize plugin */

var nestable_space = document.getElementById('base-structure'),
    context_space = document.getElementById('base-context'),
    context = new BaseContext(context_space),
    base = new BaseStructure(nestable_space, context);











