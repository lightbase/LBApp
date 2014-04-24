
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

        if (!form.valid()) return false;
        var data = {
            'nm_user': $('#user').val(),
            'passwd_user': $('#passwd_user').val()
        };
        $.ajax({
            type : 'POST',
            url : window.location.href,
            data : data,
            cache: false,
            success: function(data, textStatus, jqXHR ){
                window.location.href =  '/';
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR, textStatus, errorThrown)
                Utils.error('Por favor Tente novamente mais tarde!');
            }
        });
    });
});



