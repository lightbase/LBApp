
function ajax_call(type, url, data){
        return $.ajax({
                type: 'GET',
                url: 'http://neo.lightbase.cc/api/base',
                data: data,
                crossDomain: true,
                dataType: "jsonp",
                cache: false,
                success: function(data, textStatus, jqXHR ){
                    ajax_response = data;
                },
                error: function(jqXHR, textStatus, errorThrown){
                }
        });
}



