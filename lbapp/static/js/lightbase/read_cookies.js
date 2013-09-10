var all_cookies = $.cookie();
var cookieValue;

function RenderCookies(){
    this.allcookies = all_cookies;
    this.doHeader = function(){
        $.each(this.allcookies, function(cookieName, baseAttributes){
            cookieValue = JSON.parse(baseAttributes);
            if (cookieValue != ''){
                header.linkToBase(cookieValue);
                header.linkToBase_onHover(cookieValue);
                header.linkToBase_onHover_Info(cookieValue);
            }

        });

    }

}

rendercookies = new RenderCookies();
rendercookies.doHeader();
