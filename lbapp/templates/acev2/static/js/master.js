$(document).ready(function(){
    $("#logout").click(function(){
        $.ajax({
            type : 'POST',
            url : $('#logout_route').attr('href'),
            cache: false,
            success: function(data, textStatus, jqXHR ){
                window.location = $('#login_route').attr('href'); 

            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR, textStatus, errorThrown)
                Utils.error('Por favor Tente novamente mais tarde!');
            }
        });
    });
});

