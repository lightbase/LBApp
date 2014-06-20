
$('.spinner').ace_spinner({
    value:0,
    min:0,
    max:10000,
    step:5,
    icon_up:'icon-caret-up',
    icon_down:'icon-caret-down'
});

var base_json = JSON.parse($("#controller-data").text());

$('#file-ext').attr("checked", base_json.metadata.file_ext);
$('#idx-exp').attr("checked", base_json.metadata.idx_exp);

function check_fields(){
    if ($("#idx-exp").is(":checked") == true){
        $("#idx-exp-url").show();
        $("#idx-exp-time").parent().show();
        $(".idx-exp-url-small").show();
        $(".idx-exp-time-small").show();
    }
    else {
        $("#idx-exp-url").hide();
        $("#idx-exp-time").parent().hide();
        $(".idx-exp-url-small").hide();
        $(".idx-exp-time-small").hide();
    }

    if ($("#file-ext").is(":checked") == true){
        $("#file-ext-time").parent().show();
        $(".file-ext-time-small").show();
    }
    else {
        $("#file-ext-time").parent().hide();
        $(".file-ext-time-small").hide();
    }
}

check_fields();
$("#idx-exp").change(check_fields);
$("#file-ext").change(check_fields);
$('#idx-exp-url').val(base_json.metadata.idx_exp_url);
$('#idx-exp-time').val(base_json.metadata.idx_exp_time);
$('#file-ext-time').val(base_json.metadata.file_ext_time);

$('#button-save').click(function(){

    base_json.metadata.idx_exp = $('#idx-exp').is(':checked');
    base_json.metadata.idx_exp_url = $('#idx-exp-url').val();
    base_json.metadata.idx_exp_time = parseInt($('#idx-exp-time').val());
    base_json.metadata.file_ext = $('#file-ext').is(':checked');
    base_json.metadata.file_ext_time = parseInt($('#file-ext-time').val());

    $.ajax({
        type: 'put',
        url: window.location,
        data: {'json_base': JSON.stringify(base_json)},
        cache: false,
        success: function(data, textStatus, jqXHR ){
            window.location.href =  '/base/list';
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown)
            Utils.error('Por favor Tente novamente mais tarde!');
        }
    });
});
