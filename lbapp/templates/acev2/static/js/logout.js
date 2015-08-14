$(document).ready(function(){
        $("#logout_action").click(function(){
			console.log("Acção de sair!!");

        $.ajax({
            type : 'POST',
            url : getLogoutURL(),
            cache: false,
            success: function(data, textStatus, jqXHR ){
                console.log("Requisição enviada com sucesso");
                window.location.href =  '/login';
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR, textStatus, errorThrown);
                console.log("Erro ao enviar requisição!");
                //Utils.error('Por favor Tente novamente mais tarde!');
            }
        });
    });
});

function getLogoutURL(){
    var loginResouce = "/logout";
    var location = window.location;
    var baseUrl = location.protocol + "//" + location.hostname + loginResouce
    return baseUrl;
}



