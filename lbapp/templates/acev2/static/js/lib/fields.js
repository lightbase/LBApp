
/**
 *
 * Fields Definitions. All Types must inherit abstract class
 * for more info about base class, please see:
 *
 * https://github.com/vitalets/x-editable/blob/master/src/inputs/abstract.js
 *
 * Conversion order:
 *
 * On Render
 * 1: html2value
 * 2: str2value
 * 3: value2input
 *
 * After Submit
 * 4: input2value
 * 5: value2str 
 * 6: value2submit
 *
 * Render again
 * 7: value2html 
 *
 **/

var Fields = { }; 

(function ($) {
    "use strict";

    /**
     * Text Data Type
    **/

    var TextDataType = function (options) {
        this.init('text', options, TextDataType.defaults);
    };

    $.fn.editableutils.inherit(TextDataType , $.fn.editabletypes.text);

    $.extend(TextDataType.prototype, {


        html2value: function(html) {
            //console.log(html)
            return $('<div>').html(html).text();
        },

        str2value: function(str) {
            return str;
        }, 

        value2input: function(value) {
            this.$input.val(value);
        },

        input2value: function() { 
            //return {'xxx':'xxx3x'}
            return this.$input.val();
        }, 
        
        value2str: function(value) {
            // Not used           
            return value;
        }, 

        value2submit: function(value) {
            // Not used           
            return value;
        },

        value2html: function(value, element) {
            $(element)[this.options.escape ? 'text' : 'html']($.trim(value));
        },
    });

    TextDataType.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
        inputclass: 'input-large'
    });

    $.fn.editabletypes.text = TextDataType;

    /**
     * File Data Type
    **/

    var FileDataType = function (options) {
        this.init('file', options, FileDataType.defaults);
    };

    $.fn.editableutils.inherit(FileDataType , $.fn.editabletypes.abstractinput);

    $.extend(FileDataType.prototype, {
        html2value: function(html) {
            //console.log(html)
            return $('<div>').html(html).text();
        },

        str2value: function(str) {
            return str;
        }, 

        value2input: function(value) {

            var input = this.$input;
            //console.log(input.parent().closest('td'));

            var drop_zone = this.$input.dropzone({
                init: function(){
                    this.on("success", function(file, response) {
                    });
                    this.on("addedfile", function(file) { 
                    });
                }
            });
            bootbox.confirm(drop_zone, 'Cancelar', 'Salvar', function(result) {
            });
            this.$input.val(value);
        },

        input2value: function() { 
            return this.$input.val();
        }, 
        
        value2str: function(value) {
            return value;
        }, 

        value2submit: function(value) {
            return value;
        },

        value2html: function(value, element) {
            $(element)[this.options.escape ? 'text' : 'html']($.trim(value));
        },
    });

    FileDataType.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: '<form action="/file-upload" class="dropzone" id="my-awesome-dropzone"></form>',
        showbuttons: false

    });

    $.fn.editabletypes.file = FileDataType;

    /**
     * Document Data Type
    **/

    var DocumentDataType = function (options) {
        this.init('document', options, DocumentDataType.defaults);
    };

    $.fn.editableutils.inherit(DocumentDataType , $.fn.editabletypes.file);

    $.extend(DocumentDataType.prototype, {
    });

    DocumentDataType.defaults = $.extend({}, $.fn.editabletypes.file.defaults, {
    });

    $.fn.editabletypes.document = DocumentDataType;

    /**
     * Integer Data Type
    **/

    var IntegerDataType = function (options) {
        this.init('integer', options, IntegerDataType.defaults);
    };

    $.fn.editableutils.inherit(IntegerDataType , $.fn.editabletypes.text);

    $.extend(IntegerDataType.prototype, {
    });

    IntegerDataType.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
    });

    $.fn.editabletypes.integer = IntegerDataType;

    /**
     * Decimal Data Type
    **/

    var DecimalDataType = function (options) {
        this.init('decimal', options, DecimalDataType.defaults);
    };

    $.fn.editableutils.inherit(DecimalDataType , $.fn.editabletypes.text);

    $.extend(DecimalDataType.prototype, {
    });

    DecimalDataType.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
    });

    $.fn.editabletypes.decimal = DecimalDataType;

    /**
     * Money Data Type
    **/

    var MoneyDataType = function (options) {
        this.init('money', options, MoneyDataType.defaults);
    };

    $.fn.editableutils.inherit(MoneyDataType , $.fn.editabletypes.text);

    $.extend(MoneyDataType.prototype, {
    });

    MoneyDataType.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
    });

    $.fn.editabletypes.money = MoneyDataType;

    /**
     * SelfEnumerated Data Type
    **/

    var SelfEnumeratedDataType = function (options) {
        this.init('selfenumerated', options, SelfEnumeratedDataType.defaults);
    };

    $.fn.editableutils.inherit(SelfEnumeratedDataType , $.fn.editabletypes.text);

    $.extend(SelfEnumeratedDataType.prototype, {
    });

    SelfEnumeratedDataType.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
    });

    $.fn.editabletypes.selfenumerated = SelfEnumeratedDataType;

    /**
     * DateTime Data Type
    **/

    var DateTimeDataType = function (options) {
        this.init('datetime', options, DateTimeDataType.defaults);
    };

    $.fn.editableutils.inherit(DateTimeDataType , $.fn.editabletypes.text);

    $.extend(DateTimeDataType.prototype, {
    });

    DateTimeDataType.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
    });

    $.fn.editabletypes.datetime = DateTimeDataType;

    /**
     * Date Data Type
    **/

    var DateDataType = function (options) {
        this.init('date', options, DateDataType.defaults);
    };

    $.fn.editableutils.inherit(DateDataType , $.fn.editabletypes.text);

    $.extend(DateDataType.prototype, {
    });

    DateDataType.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
    });

    $.fn.editabletypes.date = DateDataType;

    /**
     * Time Data Type
    **/

    var TimeDataType = function (options) {
        this.init('time', options, TimeDataType.defaults);
    };

    $.fn.editableutils.inherit(TimeDataType , $.fn.editabletypes.text);

    $.extend(TimeDataType.prototype, {
    });

    TimeDataType.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
    });

    $.fn.editabletypes.time = TimeDataType;

    /**
     * Image Data Type
    **/

    var ImageDataType = function (options) {
        this.init('image', options, ImageDataType.defaults);
    };

    $.fn.editableutils.inherit(ImageDataType , $.fn.editabletypes.abstractinput);

    $.extend(ImageDataType.prototype, {
    });

    ImageDataType.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
    });

    $.fn.editabletypes.image = ImageDataType;

    /**
     * Sound Data Type
    **/

    var SoundDataType = function (options) {
        this.init('sound', options, SoundDataType.defaults);
    };

    $.fn.editableutils.inherit(SoundDataType , $.fn.editabletypes.abstractinput);

    $.extend(SoundDataType.prototype, {
    });

    SoundDataType.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
    });

    $.fn.editabletypes.sound = SoundDataType;

    /**
     * Video Data Type
    **/

    var VideoDataType = function (options) {
        this.init('video', options, VideoDataType.defaults);
    };

    $.fn.editableutils.inherit(VideoDataType , $.fn.editabletypes.abstractinput);

    $.extend(VideoDataType.prototype, {
    });

    VideoDataType.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
    });

    $.fn.editabletypes.video = VideoDataType;

    /**
     * Url Data Type
    **/

    var UrlDataType = function (options) {
        this.init('url', options, UrlDataType.defaults);
    };

    $.fn.editableutils.inherit(UrlDataType , $.fn.editabletypes.text);

    $.extend(UrlDataType.prototype, {
    });

    UrlDataType.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
    });

    $.fn.editabletypes.url = UrlDataType;

    /**
     * Boolean Data Type
    **/

    var BooleanDataType = function (options) {
        this.init('boolean', options, BooleanDataType.defaults);
    };

    $.fn.editableutils.inherit(BooleanDataType , $.fn.editabletypes.text);

    $.extend(BooleanDataType.prototype, {
    });

    BooleanDataType.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
        tpl: '<input type="checkbox"></input>'
    });

    $.fn.editabletypes.boolean = BooleanDataType;

    /**
     * TextArea Data Type
    **/

    var TextAreaDataType = function (options) {
        this.init('textarea', options, TextAreaDataType.defaults);
    };

    $.fn.editableutils.inherit(TextAreaDataType , $.fn.editabletypes.textarea);

    $.extend(TextAreaDataType.prototype, {
    });

    TextAreaDataType.defaults = $.extend({}, $.fn.editabletypes.textarea.defaults, {
    });

    $.fn.editabletypes.textarea = TextAreaDataType;

    /**
     * Html Data Type
    **/

    var HtmlDataType = function (options) {
        this.init('html', options, HtmlDataType.defaults);
    };

    $.fn.editableutils.inherit(HtmlDataType , $.fn.editabletypes.text);

    $.extend(HtmlDataType.prototype, {

        value2input: function(value) {

            var input = this.$input;
            var self = this
            
            bootbox.confirm(input, 'Cancelar', 'Salvar', function(result) {
                if (result){
                    var val = wysiwyg.html();
                    $(self.options.scope).html(val);
                }
            });

            var wysiwyg = $(input).ace_wysiwyg();
            input.prev().addClass('wysiwyg-style2');
            input.height('350px').width(input.prev().width());

            var init_val = $(self.options.scope).html();
            input.html(init_val);
             
        },

    });

    HtmlDataType.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
        tpl: '<div></div>'
    });

    $.fn.editabletypes.html = HtmlDataType;

    /**
     * Email Data Type
    **/

    var EmailDataType = function (options) {
        this.init('email', options, EmailDataType.defaults);
    };

    $.fn.editableutils.inherit(EmailDataType , $.fn.editabletypes.text);

    $.extend(EmailDataType.prototype, {
    });

    EmailDataType.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
    });

    $.fn.editabletypes.email = EmailDataType;

    /**
     * Json Data Type
    **/

    var JsonDataType = function (options) {
        this.init('json', options, JsonDataType.defaults);
    };

    $.fn.editableutils.inherit(JsonDataType , $.fn.editabletypes.textarea);

    $.extend(JsonDataType.prototype, {
        html2value: function(html) {
            return $(this.options.scope).prev().text();
        },
    });

    JsonDataType.defaults = $.extend({}, $.fn.editabletypes.textarea.defaults, {
    });

    $.fn.editabletypes.json = JsonDataType;

    /**
     *  Multivalued Field
    **/

    var Multivalued = function (options) {
        this.init('multivalued', options, Multivalued.defaults);
    };

    $.fn.editableutils.inherit(Multivalued, $.fn.editabletypes.abstractinput);

    $.extend(Multivalued.prototype, {
    });

    Multivalued.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
    });

    //$.fn.editabletypes.multivalued = Multivalued;

    /*
     *  Fields mapping
     */
    
    Fields.mapping = {
        'TextDataType':             TextDataType,
        'DocumentDataType':         DocumentDataType,
        'IntegerDataType':          IntegerDataType,
        'DecimalDataType':          DecimalDataType,
        'MoneyDataType':            MoneyDataType,
        'SelfEnumeratedDataType':   SelfEnumeratedDataType,
        'DateTimeDataType':         DateDataType,
        'DateDataType':             TimeDataType,
        'TimeDataType':             DateTimeDataType,
        'ImageDataType':            ImageDataType,
        'SoundDataType':            SoundDataType,
        'VideoDataType':            VideoDataType,
        'UrlDataType':              UrlDataType,
        'BooleanDataType':          BooleanDataType,
        'TextAreaDataType':         TextAreaDataType,
        'FileDataType':             FileDataType,
        'HtmlDataType':             HtmlDataType,
        'EmailDataType':            EmailDataType,
        'JsonDataType':             JsonDataType
    };

    Fields.get_field = function(struct){

        var Field = Fields.mapping[struct.datatype + 'DataType'];
        var field = new Field();

        if (struct.multivalued){
            if (field instanceof FileDataType) return field;
            if (field instanceof JsonDataType) return field;
            else return new Multivalued();
        }
        else {
            return field;
        }
    };

}(window.jQuery));
