$(function () {


    $.validator.addMethod('alphanumeric', function (value, element) {
        /*http://stackoverflow.com/questions/4977898/check-for-valid-sql-column-name*/
        return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value);
    }, "Preencha com caracteres válidos");
    $.validator.addMethod('base_repetition', function (value, element) {
        var base_names = JSON.parse($('#base_names').text()),
            not_exists = true;
        $.each(base_names, function (k, v) {
            if (v.nome_base == value) {
                not_exists = false;
                return false;
            }
        });
        return not_exists;
    }, "Esta base já existe.");
    basedata = new Object();
    var x = {
        errorElement: 'span',
        errorClass: 'help-inline',
        focusInvalid: false,
        rules: {
            name: {
                required: true,
                alphanumeric: "required",
                base_repetition: "required",
                maxlength: 23
            },
            description: {
                required: true,
                maxlength: 255
            },
            password: {
                required: true,
                maxlength: 14,
                minlength: 8
            },
            password_again: {
                required: true,
                equalTo: '#base-password',
            },
            index_export: {
                required: false
            },
            index_url: {
                url: true,
                required: {
                    depends: function (element) {
                        var checked = false;
                        if ($("#index_export:checked").val() !== undefined) {
                            checked = true
                        }
                        return checked
                    }
                }
            },
            index_time: {
                required: false
            },
            document_extract: {
                required: false

            },
            extraction_time: {
                required: false
            },
            state: {
                required: false
            },
            platform: {
                required: false
            },
            subscription: {
                required: false
            },
            gender: 'required',
            agree: 'required'
        },

        messages: {
            name: {
                required: "É necessario preencher o campo",
                maxlength: "Digite não mais que 23 caracteres"
            },
            description: {
                required: "É necessario preencher o campo",
                maxlength: "Digite não mais que 255 caracteres"
            },
            index_url: {
                required: "É necessario preencher o campo"
            },
            password: {
                required: "É necessario preencher o campo",
                maxlength: "Digite não mais que 14 characteres.",
                minlength: "Digite no minimo 8 caracteres"
            },
            password_again: {
                required: "É necessario preencher o campo",
                equalTo: "Insira o mesmo valor da 'senha'",
            },
        },

        invalidHandler: function (event, validator) { //display error alert on form submit   
            $('.alert-error', $('.login-form')).show();
        },

        highlight: function (e) {
            $(e).closest('.control-group').removeClass('info').addClass('error');
        },

        success: function (e) {
            $(e).closest('.control-group').removeClass('error').addClass('info');
            $(e).remove();
        },

        errorPlacement: function (error, element) {
            if (element.is(':checkbox') || element.is(':radio')) {
                var controls = element.closest('.controls');
                if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
                else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
            } else if (element.is('.chzn-select')) {
                error.insertAfter(element.siblings('[class*="chzn-container"]:eq(0)'));
            } else error.insertAfter(element);
        },

        submitHandler: function (form) {},
        invalidHandler: function (form) {}
    };

    $('[data-rel=tooltip]').tooltip();


    var $validation = true;
    $('#fuelux-wizard').ace_wizard().on('change', function (e, info) {
        if (info.step == 1 && $validation) {
            if (!$('#validation-form').valid()) return false;
        }
    }).on('stepclick', function (e) {
        //return false;//prevent clicking on steps
    });

    // VERIFY IF CAPSLOCK IS ON IN PASSWORD

    $('#base-password').keypress(function (e) {
        kc = e.keyCode ? e.keyCode : e.which;
        sk = e.shiftKey ? e.shiftKey : ((kc == 16) ? true : false);
        if (((kc >= 65 && kc <= 90) && !sk) || ((kc >= 97 && kc <= 122) && sk)) {
            alert('Tecla CAPSLOCK esta ativada!\nSenha apenas com letras minúsculas.');
        }
    });


    $('#validation-form').show();
    $('#modal-wizard .modal-header').ace_wizard();
    $('#modal-wizard .wizard-actions .btn[data-dismiss=modal]').removeAttr('disabled');

    $('#validation-form').submit(function () {
        var formdata = $("#validation-form").serializeArray();
        var returnArray = new Object();
        returnArray['doc_extract'] = false;
        returnArray['index_export'] = false;
        returnArray['index_url'] = '';
        returnArray['index_time'] = '0';
        returnArray['extract_time'] = '0';
        $.each(formdata, function (i, v) {
            /*if (v.name == "doc_extract"){
                            v.value = true
                        }
                        if (v.name == "index_export"){
                            v.value = true
                        }*/
            if (v.name != 'doc_extract' || v.name != 'index_export') {
                returnArray[v.name] = v.value;
            }
        });
        if (!("doc_extract" in returnArray)) {
            returnArray["doc_extract"] = false;
        }
        if (!("index_export" in returnArray)) {
            returnArray["index_export"] = false;
        }
        return returnArray;
    });
    $("#control-group-URL").hide();
    $("#index_export").click(function () {
        if ($("#index_export:checked").val() == undefined) {
            $("#control-group-URL").hide();
        } else {
            $("#control-group-URL").show();
        }
    });

    $("#control-group-DOC").hide();
    $("#doc_extract").click(function () {
        if ($("#doc_extract:checked").val() == undefined) {
            $("#control-group-DOC").hide();
        } else {
            $("#control-group-DOC").show();
        }
    });

    var button = document.getElementById("button-submit");
    $("#button-submit").click(function () {
        if ($("#fuelux-wizard").wizard("selectedItem").step == 1) {
            $('#validation-form').validate(x);
            $("#fuelux-wizard").wizard("next");
            var formdata = $("#validation-form").serializeArray();
            var returnArray = new Object();
            returnArray['doc_extract'] = false;
            returnArray['index_export'] = false;
            returnArray['index_url'] = '';
            returnArray['index_time'] = '0';
            returnArray['extract_time'] = '0';
            $.each(formdata, function (i, v) {
                /*if (v.name == "doc_extract"){
                                v.value = true
                            }
                            if (v.name == "index_export"){
                                v.value = true
                            }*/
                returnArray[v.name] = v.value;
            });
            if (!("doc_extract" in returnArray)) {
                returnArray["doc_extract"] = false;
            }
            if (!("index_export" in returnArray)) {
                returnArray["index_export"] = false;
            }
            basedata["metadata"] = returnArray;
            basedata["structure"] = base.structure;
            basedata["context"] = base.context.context;
            base.metadata = returnArray;
            delete returnArray["password_again"];
            return false;
        }
        if ($("#fuelux-wizard").wizard("selectedItem").step == 2 && base.context.validate() == true) {
            $("#fuelux-wizard").wizard("next");
        }
        if ($('#fuelux-wizard').wizard("selectedItem").step == 3) {
            var textarea = document.getElementById("nestable-output");
            $(textarea).text(base.json);
            textarea.setAttribute('style', 'height: 100px; overflow: auto; border: 2px #C0C0C0 solid');
            //textarea.setAttribute('readonly');
            button.setAttribute('style', 'display:none;');
            //textarea.disabled = true;
        }
    });

    $("#step1-button").click(function () {
        button.setAttribute('style', 'display:inline;');
    });
    $("#step2-button").click(function () {
        button.setAttribute('style', 'display:inline;');
    });

    $("#button-prev").click(function () {
        if ($('#fuelux-wizard').wizard("selectedItem").step == 2) {
            button.setAttribute('style', 'display:inline;');
        }
    });

    $("#save-data").click(function () {
        var button = document.getElementById("save-data");
        button.setAttribute("disabled");
        $("#button-submit").click();
        bootbox.dialog("Deseja realmente salvar base?", [{
            "label": "Salvar",
            "class": "btn btn-succes",
            callback: function () {
                $.ajax({
                    type: 'post',
                    url: '/base/new',
                    data: {
                        json_base: base.json
                    },
                    success: function (data, textStatus, jqXHR) {
                        bootbox.dialog("Obrigado! Sua base foi salva com sucesso!", [{
                            "label": "OK",
                            "class": "btn-small btn-primary",
                            "href": '/base/list',
                        }]);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                             console.log(jqXHR, textStatus, errorThrown)
                             Utils.error('Por favor Tente novamente mais tarde!');
                    }
                });
            }
        }, {
            "label": "Cancelar",
            "class": "btn btn-danger",
        }]);
           });


});
$(document).ready(function () {
    /*$('#spinner1').ace_spinner({value:0,min:0,max:200,step:10, btn_up_class:'btn-info' , btn_down_class:'btn-info'})*/

    $('#spinner2').ace_spinner({
        value: 0,
        min: 0,
        max: 200,
        step: 10,
        btn_up_class: 'btn-info',
        btn_down_class: 'btn-info'
    })
    $('button[data-action="create-field"]').click(function () {
        base.create_field(remand = false, check_valid = true);
    });
    $('button[data-action="create-group"]').click(function () {
        base.create_group();
    });
    $('button[data-action="expand-all"]').click(function () {
        $('.dd').nestable('expandAll');
    });
    $('button[data-action="collapse-all"]').click(function () {
        $('.dd').nestable('collapseAll');
    });
    $('button[data-action="remove-element"]').click(function () {
        base.remove_element();
    });
    $('a[data-action="auto-append"]').click(function () {
        if (base.auto_append) {
            base.auto_append = false;
            $('#auto-append-info').hide();
        } else {
            base.auto_append = true;
            $('#auto-append-info').show();
        }
    });

    // Initialize first field
    base.create_field();

    var drop_callback = function (drop_info) {
        // Select list-item and focus on form
        base.context.focus_on('base-context-' + drop_info.sourceId + '-form');
        if (base.auto_append) {
            if (base.current_item.is_group) {
                base.auto_append_el = $(base.current_item).children('ol')[0];
            } else {
                base.auto_append_el = undefined;
            }
        }

    }

    $('#nestable').nestable({
        group: 1,
        maxDepth: 10,
        dropCallback: drop_callback
    })

});
$(function () {
    $('[data-rel=tooltip]').tooltip({
        container: 'body'
    });
    $('[data-rel=popover]').popover({
        container: 'body'
    });

    //$('textarea[class*=autosize]').autosize({append: "\n"});
    $('textarea[class*=limited]').each(function () {
        var limit = parseInt($(this).attr('data-maxlength')) || 100;
        $(this).inputlimiter({
            "limit": limit,
            remText: '%n character%s remaining...',
            limitText: 'max allowed : %n.'
        });
    });

    $("#eq > span").css({
        width: '90%',
        'float': 'left',
        margin: '15px'
    }).each(function () {
        // read initial values from markup and remove that
        var value = parseInt($(this).text(), 10);
        $(this).empty().slider({
            value: value,
            range: "min",
            animate: true

        });
    });

    $('#spinner1').ace_spinner({
        value: 0,
        min: 0,
        max: 200,
        step: 10,
        btn_up_class: 'btn-info',
        btn_down_class: 'btn-info'
    })
        .on('change', function () {
            //alert(this.value)
        });
    $('#spinner2').ace_spinner({
        value: 0,
        min: 0,
        max: 10000,
        step: 100,
        icon_up: 'icon-caret-up',
        icon_down: 'icon-caret-down'
    });
    $('#spinner3').ace_spinner({
        value: 0,
        min: -100,
        max: 100,
        step: 10,
        icon_up: 'icon-plus',
        icon_down: 'icon-minus',
        btn_up_class: 'btn-success',
        btn_down_class: 'btn-danger'
    });

    $('#base-color').colorpicker();
    //$('#base-color').ace_colorpicker();

    $('#base-color').focusout(function () {
        //var colorpickerToShow = document.getElementById('colorpicker-to-show'),
        colorpicker = document.getElementById('base-color'),
        //colorpickerValue = colorpicker.value;

        colorpicker.setAttribute('style', 'background-color:' + colorpicker.value + ';')
        /*colorpickerToShow.setAttribute('style', 'background-color:' + colorpickerValue + '; width: 8px; height: 10px;');*/
    });


});
