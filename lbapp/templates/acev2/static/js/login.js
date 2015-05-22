$(document).ready(function(){
    var form = $('#form');
    form.validate({
        rules:{
            user : {
                required : true
            },
            passwd : {
                required : true
            },
        },
        messages:{
            user : {
                required : "Obrigatorio."
            },
            passwd : {
                required : "Obigatorio"
            },
        },
        highlight: function (e) {
            $(e).closest('.control-group').removeClass('info').addClass('error');
        },
    });
        $("#login_button").click(function(){

        //if (!form.valid()) return false;
        var data = {
            'nm_user': $('#user').val(),
            'passwd_user': $('#passwd_user').val(),
			'url_forwarder' : window.location.href
        };
            console.log("Dados : " + data);

        $.ajax({
            type : 'POST',
            url : getLoginURL(),
            data : data,
            cache: false,
            success: function(data, textStatus, jqXHR ){
                console.log("Requisição enviada com sucesso");
                window.location.href =  '/';
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR, textStatus, errorThrown);
                console.log("Usuário logado!");
                //Utils.error('Por favor Tente novamente mais tarde!');
            }
        });
    });
});

function getLoginURL(){
    var loginResouce = "/login";
    var location = window.location;
    var baseUrl = location.protocol + "//" + location.hostname + loginResouce
    return baseUrl;
}



