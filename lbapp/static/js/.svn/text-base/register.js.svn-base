$(document).ready(function(){
    var form = $('#form');
    form.validate({
        rules:{
            email : {
                required : true,
                email : true
            },
            user : {
                required : true
            },
            passwd : {
                required : true
            },
            conf : {
                required : true,
                equalTo : '#passwd_user'
            },
        },
        messages:{
            email : {
                required : "Obrigatorio.",
                email : "Digite um e-mail valido"
            },
            user : {
                required : "Obrigatorio."
            },
            passwd : {
                required : "Obigatorio"
            },
            conf : {
                required : "Obrigatorio",
                equalTo : "Campos Senha e Confirmação devem Ser iguais"
            },
         },
         highlight: function (e) {
            $(e).closest('.control-group').removeClass('info').addClass('error');
          },
    });
    $("#save_button").click(function(){

        if (!form.valid()) return false;
        var data = {
            'email_user': $('#email').val(),
            'nm_user': $('#user').val(),
            'passwd_user': $('#passwd_user').val()
        };
        $.ajax({
            type : 'POST',
            url : window.location.href,
            data : data,
            cache: false,
            success: function(data, textStatus, jqXHR ){
                window.location.href =  'login';
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR, textStatus, errorThrown)
                Utils.error('Por favor Tente novamente mais tarde!');
            }
        });
    });
});
