
var Fields = new Object();

(function(){

    // Add validation methods

    $.validator.addMethod('text_validator', function(value, element){
        if (value == '') return true;
        return true;
    }, '');
    $.validator.addMethod('alphanumeric_validator', function(value, element){
        if (value == '') return true;
        return /^[a-z0-9]+$/i.test(value);
    }, '');
    $.validator.addMethod('document_validator', function(value, element){
    }, '');
    $.validator.addMethod('integer_validator', function(value, element){
        if (value == '') return true;
        return /^\d+$/.test(value);
    }, 'Valor deve ser um número inteiro.');
    $.validator.addMethod('decimal_validator', function(value, element){
        if (value == '') return true;
        return /^(\d+\.?\d*|\.\d+)$/.test(value)
    }, '');
    $.validator.addMethod('coin_validator', function(value, element){
        if (value == '') return true;
    }, '');
    $.validator.addMethod('selfenumerated_validator', function(value, element){
    }, '');
    $.validator.addMethod('date_validator', function(value, element){
        if (value == '') return true;
        return /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(value);
    }, 'Formato válido: ');
    $.validator.addMethod('time_validator', function(value, element){
        if (value == '') return true;
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value)
    }, '');
    $.validator.addMethod('datetime_validator', function(value, element){
        if (value == '') return true;
    }, '');
    $.validator.addMethod('image_validator', function(value, element){
    }, '');
    $.validator.addMethod('sound_validator', function(value, element){
    }, '');
    $.validator.addMethod('video_validator', function(value, element){
    }, '');
    $.validator.addMethod('url_validator', function(value, element){
        return true; // HTML 5
    }, '');
    $.validator.addMethod('boolean_validator', function(value, element){
        return true; 
    }, '');
    $.validator.addMethod('file_validator', function(value, element){
    }, '');
    $.validator.addMethod('html_validator', function(value, element){
    }, '');
    $.validator.addMethod('email_validator', function(value, element){
        if (value == '') return true;
        return  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    }, '');
    $.validator.addMethod('json_validator', function(value, element){
        if (value == '') return true;
        try {
            JSON.parse(value);
            return true;
        }
        catch (e){
            return false;
        }
    }, 'Insira um JSON válido.');

    // Add class rules
    Fields.add_class_rules = function(){

        $.validator.addClassRules({
            'text-validator':{
                'text_validator': 'required'
            },
            'alphanumeric-validator':{
                'alphanumeric_validator': 'required'
            },
            'document-validator':{
                'document_validator': 'required'
            },
            'integer-validator':{
                'integer_validator': 'required'
            },
            'decimal-validator':{
                'decimal_validator': 'required'
            },
            'coin-validator':{
                'coin_validator': 'required'
            },
            'selfenumerated-validator':{
                'selfenumerated_validator': 'required'
            },
            'date-validator':{
                'date_validator': 'required'
            },
            'time-validator':{
                'time_validator': 'required'
            },
            'datetime-validator':{
                'datetime_validator': 'required'
            },
            'image-validator':{
                'image_validator': 'required'
            },
            'sound-validator':{
                'sound_validator': 'required'
            },
            'video-validator':{
                'video_validator': 'required'
            },
            'url-validator':{
                'url_validator': 'required'
            },
            'boolean-validator':{
                'boolean_validator': 'required'
            },
            'file-validator':{
                'file_validator': 'required'
            },
            'html-validator':{
                'html_validator': 'required'
            },
            'email-validator':{
                'email_validator': 'required'
            },
            'json-validator':{
                'json_validator': 'required'
            }
        });
    }
})(jQuery.validator);

    var BaseField = Class.extend({
        init: function(structure){
            this.structure = structure;
            this.label = new Label(structure.alias);
            this.controls = new Controls([this.input]);
            this.html = new ControlGroup(this.label, this.controls).html;
        }
    }),
    TextField = BaseField.extend({
        init: function(structure){
            var attributes = {
                'name'       : structure.name,
                'class'      : 'input-medium text-validator',
                'type'       : 'text',
            };
            this.input = document.createElement('input');
            for (attr in attributes) {this.input.setAttribute(attr, attributes[attr]);}
            this._super(structure);
        }
    }),
    AlphaNumericField = BaseField.extend({
        init: function(structure){
            var attributes = {
                'name'       : structure.name,
                'class'      : 'input-medium alphanumeric-validator',
                'type'       : 'text',
            };
            this.input = document.createElement('input');
            for (attr in attributes) {this.input.setAttribute(attr, attributes[attr])}
            this._super(structure);
        }
    }),
    DocumentField = BaseField.extend({
    }),
    IntegerField = BaseField.extend({
        init: function(structure){
            var attributes = {
                'name'       : structure.name,
                'class'      : 'input-medium integer-validator',
                'type'       : 'text',
            };
            this.input = document.createElement('input');
            for (attr in attributes) {this.input.setAttribute(attr, attributes[attr])}
            this._super(structure);
        }
    }),
    DecimalField = BaseField.extend({
        init: function(structure){
            var attributes = {
                'name'       : structure.name,
                'class'      : 'input-medium decimal-validator',
                'type'       : 'text',
            };
            this.input = document.createElement('input');
            for (attr in attributes) {this.input.setAttribute(attr, attributes[attr])}
            this._super(structure);
        }
    }),
    CoinField = BaseField.extend({
        init: function(structure){
            var attributes = {
                'name'       : structure.name,
                'class'      : 'input-medium coin-validator',
                'type'       : 'text',
            };
            this.input = document.createElement('input');
            for (attr in attributes) {this.input.setAttribute(attr, attributes[attr])}
            this._super(structure);
        }
    }),
    SelfEnumeratedField = BaseField.extend({
        init: function(structure){
            var attributes = {
                'name'       : structure.name,
                'class'      : 'input-medium',
                'type'       : 'text',
            };
            this.input = document.createElement('input');
            for (attr in attributes) {this.input.setAttribute(attr, attributes[attr])}
            this._super(structure);
        }
    }),
    DateField = BaseField.extend({
        init: function(structure){
            var attributes = {
                'name'       : structure.name,
                'class'      : 'input-medium date-validator',
                'type'       : 'text',
            };
            this.input = document.createElement('input');
            for (attr in attributes) {this.input.setAttribute(attr, attributes[attr])}
            this._super(structure);
        }
    }),
    TimeField = BaseField.extend({
        init: function(structure){
            var attributes = {
                'name'       : structure.name,
                'class'      : 'input-medium time-validator',
                'type'       : 'text',
            };
            this.input = document.createElement('input');
            for (attr in attributes) {this.input.setAttribute(attr, attributes[attr])}
            this._super(structure);
        }
    }),
    DateTimeField = BaseField.extend({
        init: function(structure){
            var attributes = {
                'name'       : structure.name,
                'class'      : 'input-medium datetime-validator',
                'type'       : 'text',
            };
            this.input = document.createElement('input');
            for (attr in attributes) {this.input.setAttribute(attr, attributes[attr])}
            this._super(structure);
        }
    }),
    ImageField = BaseField.extend({
        init: function(structure){
            var attributes = {
                'name'       : structure.name,
                'class'      : 'input-medium',
                'type'       : 'text',
            };
            this.input = document.createElement('input');
            for (attr in attributes) {this.input.setAttribute(attr, attributes[attr])}
            this._super(structure);
        }
    }),
    SoundField = BaseField.extend({
        init: function(structure){
            var attributes = {
                'name'       : structure.name,
                'class'      : 'input-medium json-field',
                'type'       : 'text',
            };
            this.input = document.createElement('input');
            for (attr in attributes) {this.input.setAttribute(attr, attributes[attr])}
            this._super(structure);
        }
    }),
    VideoField = BaseField.extend({
        init: function(structure){
            var attributes = {
                'name'       : structure.name,
                'class'      : 'input-medium json-field',
                'type'       : 'text',
            };
            this.input = document.createElement('input');
            for (attr in attributes) {this.input.setAttribute(attr, attributes[attr])}
            this._super(structure);
        }
    }),
    URLField = BaseField.extend({
        init: function(structure){
            var attributes = {
                'name'       : structure.name,
                'class'      : 'input-medium url-validator',
                'type'       : 'text',
            };
            this.input = document.createElement('input');
            for (attr in attributes) {this.input.setAttribute(attr, attributes[attr])}
            this._super(structure);
        }
    }),
    BooleanField = BaseField.extend({
        init: function(structure){
            var attributes = {
                'name'       : structure.name,
                'class'      : 'input-medium boolean-validator',
                'type'       : 'text',
            };
            this.input = document.createElement('input');
            for (attr in attributes) {this.input.setAttribute(attr, attributes[attr])}
            this._super(structure);
        }
    }),
    FileField = BaseField.extend({
        init: function(structure){
            var attributes = {
                'name'       : structure.name,
                'class'      : 'input-medium',
                'type'       : 'text',
            };
            this.input = document.createElement('input');
            for (attr in attributes) {this.input.setAttribute(attr, attributes[attr])}
            this._super(structure);
        }
    }),
    HTMLField = BaseField.extend({
        init: function(structure){
            var attributes = {
                'name'       : structure.name,
                'class'      : 'input-medium html-validator',
                'type'       : 'text',
            };
            this.input = document.createElement('input');
            for (attr in attributes) {this.input.setAttribute(attr, attributes[attr])}
            this._super(structure);
        }
    }),
    EmailField = BaseField.extend({
        init: function(structure){
            var attributes = {
                'name'       : structure.name,
                'class'      : 'input-medium email-validator',
                'type'       : 'text',
            };
            this.input = document.createElement('input');
            for (attr in attributes) {this.input.setAttribute(attr, attributes[attr])}
            this._super(structure);
        }
    }),
    JSONField = BaseField.extend({
        init: function(structure){
            var attributes = {
                'name'       : structure.name,
                'class'      : 'input-medium json-validator',
                'type'       : 'text',
            };
            this.input = document.createElement('input');
            for (attr in attributes) {this.input.setAttribute(attr, attributes[attr])}
            this._super(structure);
        }
    });

Fields.get_field = function(structure){
    var datatype_mapping = {
        'Texto': TextField,
        'AlfaNumerico': AlphaNumericField,
        'Documento': DocumentField,
        'Inteiro': IntegerField,
        'Decimal': DecimalField,
        'Moeda': CoinField,
        'AutoEnumerado': SelfEnumeratedField,
        'Data': DateField,
        'Hora': TimeField,
        'Data/Hora': DateTimeField,
        'Imagem': ImageField,
        'Som': SoundField,
        'Video': VideoField,
        'URL': URLField,
        'Verdadeiro/Falso': BooleanField,
        'Arquivo': FileField,
        'HTML': HTMLField,
        'Email': EmailField,
        'JSON': JSONField
    };
    var field_class = datatype_mapping[structure.datatype];
    return new field_class(structure);
};

