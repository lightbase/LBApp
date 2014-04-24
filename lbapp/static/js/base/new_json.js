$(document).ready(function(){
    $('#create').click(function(){
        var list = $('textarea').show();
        var last = $(list).last();
        var data_id = $(last).attr('id');
        var id = data_id + 1
        var tpl = '<textarea class="span6" type="text" name="description" id="'+id+'" class="span4" style="width: 80%; margin-top: 15px; margin-left: 0px; height: 70px;"></textarea>'
        $('#insert_json').append(tpl);
    });
});

$('#del').click(function(){
    var list = $('textarea').show();
    var last = $(list).last();
    var attr = $(last).attr('id');
    var id = "#" + attr
    if(id == "#0"){
        $('#0').val(" ");
        return false
    }
    $(id).remove();
});

$('#json_text').click(function(){
    $('textarea').each(function(i, textarea){
        var data = {
        'json_base': $(textarea).val()
    };
    $.ajax({
        type : 'POST',
        url : '/base/new/doc',
        data : data,
        cache : false,
        success: function(data, textStatus, jqXHR){
            Utils.success('base criada com sucesso');
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown)
            console.log(jqXHR.responseText)
            Utils.error("Porfavor verifique seu json");
        }
     });
  });
});

$('#json_text').click(function(){
    $('#text_json').slideUp( 300 ).delay( 1000  ).fadeIn( 1500 );
});
