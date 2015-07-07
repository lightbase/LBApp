$(document).ready(function(){
    var form = $('#formRegister');
    /*form.validate({
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
    });*/
        $("#register_button").click(function(){

        //if (!form.valid()) return false;
        var data = {
            'id_user': $('#user').val(),
            'name_user': $('#name').val(),
            'email_user': $('#email').val(),
            'passwd_user': $('#passwd_user').val(),
        };
		var default_redirect = getLoginURL();

        $.ajax({
            type : 'POST',
            url : getRegisterURL(),
            data : data,
            cache: false,
            success: function(data, textStatus, jqXHR ){
                console.log("Requisição enviada com sucesso");
					window.location.href = default_redirect;
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR, textStatus, errorThrown);
				console.log("Exceção : ");
				// TODO : Criar função javascript que recebe o Response Text e renderiza
				console.log(jqXHR['responseText']);
				var exception = JSON.parse(jqXHR['responseText']);
				alert(exception['error_message']);
                //Utils.error('Por favor Tente novamente mais tarde!');
            }
        });
    });
});

function getURLResource(resource){
    var location = window.location;
    return location.protocol + "//" + location.hostname + resource
}

function getLoginURL(){
	return getURLResource("/login");
}

function getRegisterURL(){
	return getURLResource("/register");
}
