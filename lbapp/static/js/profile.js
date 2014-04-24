$(document).ready(function(){
    var form = $('#profile');
    form.validate({
        rules: {
            email : {
                email : true,
            },
            conf : {
                required : true,
                equalTo : '#new_passwd'
            }
        },
        messages:{
            email : {
                email : "Digite um e-mail valido",
            },
            conf : {
                required : "Obrigatorio",
                equalTo : "Senha e Confirmação deve ser iguais"
            }
        },
        highlight: function (e) {
           $(e).closest('.control-group').removeClass('info').addClass('error');
        },
    });
    $("#up_button").click(function(){
        if(!form.valid()) return false;

            var data = {
                'nm_user': $('#up_user').val(),
                'email_user': $('#email_put').val(),
                'passwd_user': $('#new_passwd').val()
            };
            console.log(data)
            $.ajax({
                type : 'PUT',
                url : window.location.href,
                data : data,
                cache: false,
                success: function(data, textStatus, jqXHR){
                    window.location.herf
                },
                error: function(jqXHR, textStatus, errorThrown){
                    console.log(jqXHR, textStatus, errorThrown)
                    Utils.error('Por favor Tente novamente mais tarde!');
                }
           });
     });
});
