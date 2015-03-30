
if (platform.name != "Chrome"){
    alert("platform not supported!");
    throw "platform not supported!";
}


var base_json = JSON.parse($('#controller-data').text());
$(function () {
    $.validator.addMethod('alphanumeric', function (value, element) {
        /*http://stackoverflow.com/questions/4977898/check-for-valid-sql-column-name*/
        return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value);
    }, "Preencha com caracteres válidos");
    basedata = new Object();
    var x = {
        errorElement: 'span',
        errorClass: 'help-inline',
        focusInvalid: false,
        rules: {
            name: {
                required: true,
                alphanumeric: "required",
                maxlength: 10000
            },
            description: {
                required: true,
                maxlength: 256
            },
            password: {
                required: true,
                maxlength: 14,
                minlength: 8
            },
            password_again: {
                required: true,
                equalTo: '#base-password'
            },
            idx_exp: {
                required: false
            },
            idx_exp_url: {
                url: true,
                required: {
                    depends: function (element) {
                        var checked = false;
                        if ($("#idx_exp:checked").val() !== undefined) {
                            checked = true
                        }
                        return checked
                    }
                }
            },
            idx_exp_time: {
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
                required: "É necessario preencher o campo"
            },
            description: {
                required: "É necessario preencher o campo"
            },
            idx_exp_url: {
                required: "É necessario preencher o campo"
            }
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

        /*errorPlacement: function (error, element) {
            if(element.is(':checkbox') || element.is(':radio')) {
                var controls = element.closest('.controls');
                if(controls.find(':checkbox,:radio').length > 1) controls.append(error);
                else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
            }
            else if(element.is('.chzn-select')) {
                error.insertAfter(element.siblings('[class*="chzn-container"]:eq(0)'));
            }
            else error.insertAfter(element);
        },*/

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


    $('#sample-form').hide();
    $('#validation-form').show();

    $('#modal-wizard .modal-header').ace_wizard();
    $('#modal-wizard .wizard-actions .btn[data-dismiss=modal]').removeAttr('disabled');

    var button = document.getElementById("button-submit");
    $("#button-submit").click(function () {
        if ($("#fuelux-wizard").wizard("selectedItem").step == 1) {
            $('#validation-form').validate(x);
            $("#fuelux-wizard").wizard("next");
            var formdata = $("#validation-form").serializeArray();
            var returnArray = new Object();
            returnArray['file_ext'] = base_json.metadata.file_ext;
            returnArray['idx_exp'] = base_json.metadata.idx_exp;
            returnArray['idx_exp_url'] = base_json.metadata.idx_exp_url;
            returnArray['idx_exp_time'] = base_json.metadata.idx_exp_time;
            returnArray['file_ext_time'] = base_json.metadata.file_ext_time;
            $.each(formdata, function (i, v) {
                returnArray[v.name] = v.value;
            });
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
            textarea.setAttribute('style', 'overflow: auto; height: 100px; border: 2px #C0C0C0 solid;');
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
        $("#button-submit").click();

        var options_tpl =
            '<form id="save-options">' +
            '<label>Opções</label>' +
            '<div>' +
            '<input name="save-option" type="radio" value="update" checked>' +
            '<span class="lbl"> Apenas salvar</span>' +
            '</div>' +
            '<div>' +
            '<input name="save-option" type="radio" value="create" >' +
            '<span class="lbl"> Recriar</span>' +
            '</div>' +
            '</form>';

        bootbox.confirm(options_tpl, function (result) {
            if (result) {
                var save_option = $('#save-options').find('input:checked').val();
                data = {
                    option: save_option,
                    json_base: base.json,
                };
                $.ajax({
                    type: 'post',
                    url: window.location + '?id_base=',
                    data: data,
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
        });
    });


});

$(document).ready(function () {
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

    base.context.edit_mode = true;
    base.build_from_json(base_json);
    base.context.edit_mode = false;

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

    $('#base-color').colorpicker();
    //$('#base-color').ace_colorpicker();

    var colorpicker = document.getElementById('base-color');
    colorpicker.setAttribute('style', 'background-color:' + $('#base-color').val() + ';');

    $('#base-color').focusout(function () {
        //var colorpickerToShow = document.getElementById('colorpicker-to-show'),
        colorpicker = document.getElementById('base-color'),
        //colorpickerValue = colorpicker.value;

        colorpicker.setAttribute('style', 'background-color:' + colorpicker.value + ';')
        /*colorpickerToShow.setAttribute('style', 'background-color:' + colorpickerValue + '; width: 8px; height: 10px;');*/
    });

});
