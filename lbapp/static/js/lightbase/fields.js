
var Fields = new Object();

(function(){
    var origAppend = $.fn.append;
    $.fn.append = function () {
        return origAppend.apply(this, arguments).trigger("append");
    };

    // Add validation methods
    jQuery.extend(jQuery.validator.messages, {
        //http://stackoverflow.com/a/2457053/1538560
        required: "Este campo é obrigatório.",
    });
    $.validator.addMethod('text_validator', function(value, element){
        return true;
    }, 'Inválido.');
    $.validator.addMethod('textarea_validator', function(value, element){
        return true
    }, 'Inválido.');
    $.validator.addMethod('document_validator', function(value, element){
        return true
    }, 'Inválido.');
    $.validator.addMethod('integer_validator', function(value, element){
        if (value == '') return true;
        return /^\d+$/.test(value);
    }, 'Valor deve ser um número inteiro.');
    $.validator.addMethod('decimal_validator', function(value, element){
        if (value == '') return true;
        return /^(\d+\.?\d*|\.\d+)$/.test(value)
    }, 'Valor deve ser decimal.');
    $.validator.addMethod('money_validator', function(value, element){
        return true;
    }, 'Valor incorreto.');
    $.validator.addMethod('selfenumerated_validator', function(value, element){
        return false
    }, 'Inválido.');
    $.validator.addMethod('date_validator', function(value, element){
        //if (value == '') return true;
        //return /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(value);
        return true;
    }, 'Formato válido: ???');
    $.validator.addMethod('time_validator', function(value, element){
        //if (value == '') return true;
        //return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value)
        return true;
    }, 'Formato válido: ???');
    $.validator.addMethod('datetime_validator', function(value, element){
        if (value == '') return true;
        return true;
    }, 'Formato válido: ???');
    $.validator.addMethod('image_validator', function(value, element){
        return true
    }, 'Inválido.');
    $.validator.addMethod('sound_validator', function(value, element){
        return true
    }, 'Inválido.');
    $.validator.addMethod('video_validator', function(value, element){
        return true
    }, 'Inválido.');
    $.validator.addMethod('url_validator', function(value, element){
        return true; // HTML 5
    }, 'URL inválida.');
    $.validator.addMethod('boolean_validator', function(value, element){
        return true;
    }, 'Inválido.');
    $.validator.addMethod('file_validator', function(value, element){
        return true
    }, 'Inválido.');
    $.validator.addMethod('html_validator', function(value, element){
        return true
    }, 'HTML inválido.');
    $.validator.addMethod('email_validator', function(value, element){
        if (value == '') return true;
        return  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    }, 'e-mail inválido.');
    $.validator.addMethod('json_validator', function(value, element){
        if (value == '') return true;
        try {
            JSON.parse(value);
            return true;
        }
        catch (e){
            return false;
        }
    }, 'JSON inválido.');

    // Add class rules
    Fields.add_class_rules = function(){

        $.validator.addClassRules({
            'required-validator':       {'required': true},
            'text-validator':           {'text_validator': 'required'},
            'textarea-validator':       {'textarea_validator': 'required'},
            'document-validator':       {'document_validator': 'required'},
            'integer-validator':        {'integer_validator': 'required'},
            'decimal-validator':        {'decimal_validator': 'required'},
            'money-validator':          {'money_validator': 'required'},
            'selfenumerated-validator': {'selfenumerated_validator': 'required'},
            'date-validator':           {'date_validator': 'required'},
            'time-validator':           {'time_validator': 'required'},
            'datetime-validator':       {'datetime_validator': 'required'},
            'image-validator':          {'image_validator': 'required'},
            'sound-validator':          {'sound_validator': 'required'},
            'video-validator':          {'video_validator': 'required'},
            'url-validator':            {'url_validator': 'required'},
            'boolean-validator':        {'boolean_validator': 'required'},
            'file-validator':           {'file_validator': 'required'},
            'html-validator':           {'html_validator': 'required'},
            'email-validator':          {'email_validator': 'required'},
            'json-validator':           {'json_validator': 'required'}
        });
    }
})(jQuery.validator);

var BaseField = Class.extend({
        init: function(structure){
            this.structure = structure;
            this.label = new Label(structure.alias);
            this.controls = new Controls([this.wrap[0]]);
            this.html = new ControlGroup(this.label, this.controls).html;
            if(structure.required)
                $(this.input).addClass('required-validator');
        },
        get_val: function(){
            return this.input.val();
        },
        set_val: function(val){
            this.input.val(val);
        },
        is_valid: function(){
            return this.input.valid();
        }
    }),
    TextAreaField = BaseField.extend({
        get_tpl: function(structure){
            return '<div class="input-prepend">'+
                        '<textarea name="'+structure.name+'" class="input-xlarge textarea-validator ' +
                'type="text"></textarea>'+
            '</div>';
        },
        init: function(structure){
            this.wrap = $(this.get_tpl(structure));
            this.input = this.wrap.find('textarea');
            this._super(structure);
        }
    }),
    TextField = BaseField.extend({
        get_tpl: function(structure){
            return '<div class="input-prepend">'+
                '<span class="add-on">'+
                    '<i class="icon-text-width"></i>'+
                '</span>'+
                '<input name="'+structure.name+'" class="input-medium text-validator" type="text">'+
            '</div>';
        },
        init: function(structure){
            this.wrap = $(this.get_tpl(structure));
            this.input = this.wrap.find('input');
            this._super(structure);
        }
    }),
    FileField = BaseField.extend({
        get_tpl: function(structure){
            var rest_url = $('#rest_url').text(),
                base_name = $('#base_name').text(),
                form_action = [rest_url, base_name, 'doc'].join('/');
            //var path_split =  window.location.pathname.split('/');
            //path_split[path_split.length -1] = 'tmp-storage';
            //var form_action = path_split.join('/'),
                tpl =
                '<form action="'+ form_action +'" class="dropzone">'+
                   '<div class="uploaded" style="display: none"></div>' +
                   '<div class="fallback">'+
                         '<input name="'+structure.name+'" type="file" multiple="" />'+
                    '</div>'+
                '</form>';
            return tpl
        },
        preview_tpl: function(filename){
            var $preview_tpl = $('<div class="dz-preview dz-file-preview dz-processing dz-success">'+
                '<div class="dz-details">'+
                   '<div class="dz-filename"><span data-dz-name="">'+filename+'</span></div>'+
                   //'<div class="dz-size" data-dz-size=""><strong>9.8</strong> KB</div>'+
                   //'<img data-dz-thumbnail="">  '+
                '</div>'+
                //'<div class="progress progress-small progress-success progress-striped active"><span class="bar" data-dz-uploadprogress="" style="width: 100%; "></span></div>'+
                '<div class="dz-success-mark"><span></span></div>'+
                '<a class="dz-remove" href="javascript:undefined;">Remover</a>'+
            '</div>');
            $preview_tpl.find('.dz-remove').click(function(e){
                $(e.target).parent('.dz-preview').remove();
            });
            return $preview_tpl;
        },
        init: function(structure, path){

            this.is_file = true;
            this.form = $(this.get_tpl(structure));
            this.structure = structure;
            this.id = path + '-dropzone';
            this.form.attr('multivalued', this.structure.multivalued);
            this.form.attr('file-type', this.structure.datatype);
            this.form.attr('id', this.id);
            this.input = this.form.find('input');
            this.label = new Label(structure.alias);
            this.controls = new Controls([this.form[0]]);
            this.html = new ControlGroup(this.label, this.controls).html;
        },
        get_val: function(){
            var uploaded = [ ],
                file_mask = { },
                self = this;
                uploaded_group = this.form.find('.uploaded');
            uploaded_group.children().each(function(i, uploaded_el){
                //file_mask = Fields.get_file_mask(uploaded_el.getAttribute('id'));
                file_mask = JSON.parse($(uploaded_el).text());
                uploaded.push(file_mask);
            });
            if (uploaded.length > 0){
                // We have uploaded files
                var one_file = this.structure.multivalued? [uploaded[0]]: uploaded[0];
                return uploaded.length > 1? uploaded: one_file;
            }
            else{
                // Files are the same
                return this.structure.multivalued? [ ]: '';
            }
        },
        add_file: function(file){
            var uploaded_group = this.form.find('.uploaded'),
                uploaded = $(document.createElement('div')).text(JSON.stringify(file));
            $(uploaded).attr('id', file.id_doc);
            uploaded_group.append(uploaded);
        },
        set_val: function(val){
            var self = this;
            if (Utils.type_of(val) == 'array'){
                val.forEach(function(file){
                    self.add_file(file);
                });
            }
            else if (Utils.type_of(val) == 'object'){
                self.add_file(val);
            }
        },
        is_valid: function(){
            return true;
        }
    }),
    DocumentField = FileField.extend({}),
    ImageField = FileField.extend({}),
    SoundField = FileField.extend({}),
    VideoField = FileField.extend({}),
    IntegerField = BaseField.extend({
        get_tpl: function(structure){
            return '<div class="input-prepend">'+
                '<span class="add-on">'+
                    '<i class="icon-info"></i>'+
                '</span>'+
                '<input name="'+structure.name+'" class="input-medium integer-validator" type="text">'+
            '</div>';
        },
        init: function(structure){
            this.wrap = $(this.get_tpl(structure));
            this.input = this.wrap.find('input');
            this._super(structure);
        }
    }),
    DecimalField = BaseField.extend({
        get_tpl: function(structure){
            return '<div class="input-prepend">'+
                '<span class="add-on">'+
                    '<i class="icon-"></i>'+
                '</span>'+
                '<input name="'+structure.name+'" class="input-medium decimal-validator" type="text">'+
            '</div>';
        },
        init: function(structure){
            this.wrap = $(this.get_tpl(structure));
            this.input = this.wrap.find('input');
            this._super(structure);
        }
    }),
    MoneyField = BaseField.extend({
        get_tpl: function(structure){
            return '<div class="input-prepend">'+
                '<span class="add-on">'+
                    '<i class="icon-usd"></i>'+
                '</span>'+
                '<input name="'+structure.name+'" class="input-medium money-validator" type="text">'+
            '</div>';
        },
        init: function(structure){
            this.wrap = $(this.get_tpl(structure));
            this.input = this.wrap.find('input');
            this._super(structure);
        }
    }),
    SelfEnumeratedField = BaseField.extend({
        get_tpl: function(structure){
            return '<div class="input-prepend">'+
                '<span class="add-on">'+
                    '<i class="icon-list-ol"></i>'+
                '</span>'+
                '<input name="'+structure.name+'" class="input-medium selfenumerated-validator" type="text">'+
            '</div>';
        },
        init: function(structure){
            this.wrap = $(this.get_tpl(structure));
            this.input = this.wrap.find('input');
            this._super(structure);
        }
    }),
    DateField = BaseField.extend({
        get_tpl: function(structure){
            return '<div class="input-prepend">'+
                '<span class="add-on">'+
                    '<i class="icon-calendar"></i>'+
                '</span>'+
                '<input name="'+structure.name+'" class="input-medium date-validator" type="text">'+
            '</div>';
        },
        init: function(structure){
            this.wrap = $(this.get_tpl(structure));
            this.input = this.wrap.find('input');
            this._super(structure);
        }
    }),
    TimeField = BaseField.extend({
        get_tpl: function(structure){
            return '<div class="input-prepend">'+
                '<span class="add-on">'+
                    '<i class="icon-time"></i>'+
                '</span>'+
                '<input name="'+structure.name+'" class="input-medium time-validator" type="text">'+
            '</div>';
        },
        init: function(structure){
            this.wrap = $(this.get_tpl(structure));
            this.input = this.wrap.find('input');
            this._super(structure);
        }
    }),
    DateTimeField = BaseField.extend({
        get_tpl: function(structure){
            return '<div class="input-prepend">'+
                '<span class="add-on">'+
                    '<i class="icon-"></i>'+
                '</span>'+
                '<input name="'+structure.name+'" class="input-medium datetime-validator" type="text">'+
            '</div>';
        },
        init: function(structure){
            this.wrap = $(this.get_tpl(structure));
            this.input = this.wrap.find('input');
            this._super(structure);
        }
    }),
    UrlField = BaseField.extend({
        get_tpl: function(structure){
            return '<div class="input-prepend">'+
                '<span class="add-on">'+
                    '<i class="icon-globe"></i>'+
                '</span>'+
                '<input name="'+structure.name+'" class="input-medium url-validator" type="text">'+
            '</div>';
        },
        init: function(structure){
            this.wrap = $(this.get_tpl(structure));
            this.input = this.wrap.find('input');
            this._super(structure);
        }
    }),
    BooleanField = BaseField.extend({
        get_tpl: function(structure){
            return '<label>'+
                '<input name="'+structure.name+'" type="checkbox" class="ace boolean-validator">'+
                '<span class="lbl"></span>'+
            '</label>';
        },
        init: function(structure){
            this.wrap = $(this.get_tpl(structure));
            this.input = this.wrap.find('input');
            this._super(structure);
        },
        get_val: function(){
            return this.input.is(':checked');
        },
        set_val: function(val){
            this.input.attr('checked', val);
        }
    }),
    HtmlField = BaseField.extend({
        tpl: '<div class="wysiwyg-editor html-validator"></div>',
        init: function(structure){
            this.wrap = $(this.tpl);
            this.input = this.wrap;
            this._super(structure);
            var _html = this.html;
            /*$(_html).bind("append", function(event) {
                //$(_html).unbind();
                //$(".wysiwyg-editor").ace_wysiwyg().prev().addClass('wysiwyg-style2');
                alert('Hello, world!');
            });*/
        },
        get_val: function(){
            return this.input.html();
        },
        set_val: function(val){
            this.input.html(val);
        },
        is_valid: function(){
            return true;
        }
    }),
    EmailField = BaseField.extend({
        tpl:
            '<div class="input-prepend">'+
                '<span class="add-on">'+
                    '<i class="icon-envelope-alt"></i>'+
                '</span>'+
                '<input class="input-medium email-validator" type="text">'+
            '</div>',

        init: function(structure){
            this.wrap = $(this.tpl);
            this.input = this.wrap.find('input');
            this._super(structure);
        }
    }),
    JsonField = BaseField.extend({
        get_tpl: function(structure){
            return '<div class="input-prepend">'+
                        '<textarea name="'+structure.name+'" class="input-xlarge json-validator ' +
                'type="text"></textarea>'+
            '</div>';
        },
        init: function(structure){
            this.wrap = $(this.get_tpl(structure));
            this.input = this.wrap.find('textarea');
            this._super(structure);
        }
    }),
    MultivaluedField = Class.extend({
        init: function(structure, path){
            var tpl = this.get_tpl(),
                self = this;
            this.structure = structure;
            this.field_class = Fields.datatype_mapping[structure.datatype];
            this.FIELDS = [ ];
            this.nav_tabs = tpl.find('.nav-tabs');
            this.tab_content = tpl.find('.tab-content');
            this.tab_index = tpl.find('.tab-index');
            tpl.find('.add-tab').click(function(e){ self.add() });
            this.html = tpl[0];
        },
        add: function(val){
            this.prev_tab = this.nav_tab_tpl('previous-tab', 'icon-chevron-up', 'Anterior', this.previous),
            this.next_tab = this.nav_tab_tpl('next-tab', 'icon-chevron-down', 'Próximo', this.next),
            this.remove_tab = this.nav_tab_tpl('remove-tab', 'red icon-remove', 'Remover', this.remove);

            this.tab_content.children().each(function(i, el){
                $(el).removeClass('active');
            });

            var field = new this.field_class(this.structure);
            if (val) field.set_val(val);
            var new_field = this.tab_content_tpl('active', field);
            this.tab_content.append(new_field);
            this.FIELDS.push(field);
            new_field.attr('data-index', this.FIELDS.indexOf(field));

            if (!this.has_tabs){
                this.nav_tabs.append(this.remove_tab);
                this.nav_tabs.append(this.prev_tab);
                this.nav_tabs.append(this.next_tab);
            }

            this.has_tabs = true;
            var _length = $(this.tab_content).children().length,
                _tab_index = _length + '/' + _length;
            $(this.tab_index).text(_tab_index);
        },
        remove: function(event){
            var self = event.data.super,
                active = self.tab_content.find('.active'),
                data_index = active.attr('data-index');
            active.remove();
            delete self.FIELDS[data_index];
            $(self.tab_content.children()[0]).addClass('active')
            var _length = $(self.tab_content).children().length,
                _tab_index = _length > 0? '1/' + _length: '';
            $(self.tab_index).text(_tab_index);
        },
        previous: function(event){
            var self = event.data.super,
                active = self.tab_content.find('.active');
            if (active.prev().length == 0)
                return false;
            $(active).removeClass('active');
            var $prev = $(active).prev().addClass('active'),
                _tab_index = $prev.index() +1 + '/' + $(self.tab_content).children().length;
            $(self.tab_index).text(_tab_index);
        },
        next: function(event){
            var self = event.data.super,
                active = self.tab_content.find('.active');
            if (active.next().length == 0)
                return false;
            $(active).removeClass('active');
            var $next = $(active).next().addClass('active');
                _tab_index = $next.index() +1 + '/' + $(self.tab_content).children().length;
            $(self.tab_index).text(_tab_index);
        },
        get_val: function(){
            var values = [ ];
            this.FIELDS.forEach(function(field){
                values.push(field.get_val());
            });
            return values
        },
        set_val: function(val){
            var self = this;
            if (Utils.type_of(val) == 'array'){
                val.forEach(function(v){
                    self.add(v);
                });
            }
        },
        is_valid: function(){
            var valid = true;
            this.FIELDS.forEach(function(field){
                valid = field.is_valid();
                if (!valid) return;
            });
            return valid;
        },
        get_tpl: function(){
            return $('<div class="tabbable tabs-right">'+
                '<ul class="nav nav-tabs">'+
                    '<li class="add-tab">'+
                        '<a href="#add" data-toggle="tooltip" title="Adicionar">'+
                            '<i class="green icon-plus bigger-110"></i>'+
                        '</a>'+
                    '</li>'+
                '</ul>'+
                '<div class="tab-content" style="min-height: 99px;">'+
                '</div>'+
                '<a href="javascript:void(0)" class="pull-right tab-index"></a>'+
            '</div>');
        },
        nav_tab_tpl: function(tab_class, icon_class, text, fn){
            return $('<li class="'+tab_class+'">'+
                '<a href="#" data-toggle="tooltip" title="'+text+'">'+
                    '<i class="'+icon_class+' bigger-110"></i>'+
                 '</a>'+
            '</li>').click({super: this}, fn);
        },
        tab_content_tpl: function(content_class, field){
              var $tab_content = $('<div class="'+content_class+' tab-pane"></div>');
              $tab_content.append($(field.html));
              return $tab_content;
        },
    });

Fields.get_file_mask = function(uuid){
    return {
        id_doc: null,
        nome_doc: null,
        mimetype: null,
        uuid: uuid,
    }
};

Fields.datatype_mapping = {
    'Text':             TextField,
    'Document':         DocumentField,
    'Integer':          IntegerField,
    'Decimal':          DecimalField,
    'Money':            MoneyField,
    'SelfEnumerated':   SelfEnumeratedField,
    'DateTime':         DateField,
    'Date':             TimeField,
    'Time':             DateTimeField,
    'Image':            ImageField,
    'Sound':            SoundField,
    'Video':            VideoField,
    'Url':              UrlField,
    'Boolean':          BooleanField,
    'TextArea':         TextAreaField,
    'File':             FileField,
    'Html':             HtmlField,
    'Email':            EmailField,
    'Json':             JsonField
};

Fields.get_field = function(structure, path){
    var field_class = Fields.datatype_mapping[structure.datatype];
    if (structure.multivalued){
        var test_instance = new field_class(structure, path);
        if (test_instance instanceof FileField)
            return test_instance;
        else
            return new MultivaluedField(structure, path);
    }
    else {
        return new field_class(structure, path);
    }
};

