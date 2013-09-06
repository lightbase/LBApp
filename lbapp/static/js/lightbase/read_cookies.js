var all_cookies = $.cookie();

function RenderCookies(){
    this.allcookies = all_cookies;

    this.doHeader = function(){
        $.each(this.allcookies, function(cookieName, cookieValue){
            //console.log(JSON.stringify(cookieName) + ":" + JSON.stringify(cookieValue));
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
