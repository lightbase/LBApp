
$('.spinner').ace_spinner({
    value:0,
    min:0,
    max:10000,
    step:5,
    icon_up:'icon-caret-up',
    icon_down:'icon-caret-down'
});

var base_json = JSON.parse($("#controller-data").text());

$('#doc-extract').attr("checked", base_json.metadata.doc_extract);
$('#index-export').attr("checked", base_json.metadata.index_export);

function check_fields(){
    if ($("#index-export").is(":checked") == true){
        $("#index-url").show();
        $("#index-time").parent().show();
        $(".index-url-small").show();
        $(".index-time-small").show();
    }
    else {
        $("#index-url").hide();
        $("#index-time").parent().hide();
        $(".index-url-small").hide();
        $(".index-time-small").hide();
    }

    if ($("#doc-extract").is(":checked") == true){
        $("#extract-time").parent().show();
        $(".extract-time-small").show();
    }
    else {
        $("#extract-time").parent().hide();
        $(".extract-time-small").hide();
    }
}

check_fields();
$("#index-export").change(check_fields);
$("#doc-extract").change(check_fields);
$('#index-url').val(base_json.metadata.index_url);
$('#index-time').val(base_json.metadata.index_time);
$('#extract-time').val(base_json.metadata.extract_time);

$('#button-save').click(function(){

    base_json.metadata.index_export = $('#index-export').is(':checked');
    base_json.metadata.index_url = $('#index-url').val();
    base_json.metadata.index_time = parseInt($('#index-time').val());
    base_json.metadata.doc_extract = $('#doc-extract').is(':checked');
    base_json.metadata.extract_time = parseInt($('#extract-time').val());

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
