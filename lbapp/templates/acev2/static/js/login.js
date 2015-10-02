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
        };
		var default_path = '/base/list';
        var path_url = window.location.pathname;
		console.log("Pathname : " + path_url);

        $.ajax({
            type : 'POST',
            url : getLoginURL(),
            data : data,
            cache: false,
            success: function(data, textStatus, jqXHR ){
                console.log("Requisição enviada com sucesso");
				if(path_url.indexOf('login') != -1 || path_url == '/'){
					console.log("Redirecionando default : " + getURLResource(default_path));
					window.location.href = getURLResource(default_path);
				}else{
					console.log("Redirecionando : " + getURLResource(path_url));
                	window.location.href = getURLResource(path_url);
				}
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR, textStatus, errorThrown);
				console.log("Exceção : ");
				// TODO : Criar função javascript que recebe o Response Text e renderiza
				console.log(jqXHR['responseText']);
				alert(jqXHR['responseText']);
				//var exception = JSON.parse(jqXHR['responseText']);
				//alert(exception['error_message']);
                //Utils.error('Por favor Tente novamente mais tarde!');
            }
        });
    });

    var formregister = $('#formRegister');
    formregister.validate({
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
    $("#register_button").click(function(){

        //if (!form.valid()) return false;
        var data = {
            'name_user': $('#name').val(),
            'email_user': $('#email').val(),
            'passwd_user': $('#register_passwd_user').val(),
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
    return location.protocol + "//" + location.hostname + ":" + location.port + resource
}

function getLoginURL(){
	return getURLResource("/login");
}
function getRegisterURL(){
	return getURLResource("/register");
}

