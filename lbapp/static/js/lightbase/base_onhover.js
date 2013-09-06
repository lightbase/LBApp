var json = {"base": [{"color": "#006600"}, {"primeirabase":[{"nome_base": "base1"},{"id_base": "1"}], "segundabase": [{"nome_base": "base2"},{"id_base": "2"}]}]};
var base_fast_menu = document.getElementById("base-fast-menu");
    //base_data = JSON.parse(document.getElementById("controller-base")),
    //linktobase = new linkToBase();

function Header(){

    this.base_fast_menu = base_fast_menu;

    this.linkToBase = function(cookieValue){

        var li = document.createElement("li"),
            a = document.createElement("a"),
            i = document.createElement("i");

        li.setAttribute('id', 'fast_link_li_' + cookieValue);
        li.setAttribute('style', 'background-color:' + json.base[0].color);
        a.setAttribute('data-toggle', 'dropdown');
        //a.setAttribute('class', 'dropdown-toggle');
        a.setAttribute('href', 'http://10.1.0.8/base/1/edit');
        a.setAttribute('id', cookieValue);
        i.setAttribute('class', 'icon-th-list icon-animated-vertical');
        i.setAttribute('style', 'width: 50px;');

        a.appendChild(i);
        li.appendChild(a);
        this.base_fast_menu.appendChild(li);

        this.html = li;

        $('#fast_link_li_' + cookieValue).hover(function(){
            $('#' + cookieValue).dropdown('toggle');
        });

    }

    this.linkToBase_onHover = function(cookieValue){
        var li_div_to_append = document.getElementById("fast_link_li_" + cookieValue),
            li = document.createElement("li"),
            ul = document.createElement("ul");

        ul.setAttribute('class', 'pull-right dropdown-navbar dropdown-menu dropdown-caret dropdown-closer');
        ul.setAttribute('id', 'fast_link_ul_' + cookieValue);
        li.setAttribute('class', 'nav-header');

        li.innerHTML = json.base[1].segundabase[0].nome_base;
        ul.appendChild(li);
        li_div_to_append.appendChild(ul);

        this.html = li;

    }

    this.linkToBase_onHover_Info = function(cookieValue){
        var ul = document.getElementById("fast_link_ul_" + cookieValue),
            li = document.createElement("li"),
            a = document.createElement("a"),
            img = document.createElement("img"),
            span1 = document.createElement("span"),
            span2 = document.createElement("span"),
            span3 = document.createElement("span"),
            i = document.createElement("i");
            button = document.createElement("button");

            span1.setAttribute('class', 'blue');
            span2.setAttribute('class', 'msg-title');
            span3.setAttribute('class', 'msg-body');
            a.setAttribute('href', '#');
            img.setAttribute('class', 'msg-photo');
            img.setAttribute('src', '/static/ace-final/assets/avatars/avatar.png');
            img.setAttribute('alt', 'Alex Avatar');
            button.setAttribute('class', 'btn btn-small btn-primary');
            button.setAttribute('id', 'button_' + cookieValue);

            $(button).text('Deletar');
            $(span1).text('Base:' + ' ' + json.base[1].segundabase[0].nome_base);
            span2.appendChild(span1);
            //$(span2).text('Ciao sociis natoque penatibus et auctor ...');
            span3.appendChild(span2);
            span3.appendChild(button);
            a.appendChild(span3);
            //a.appendChild(img);
            li.appendChild(a);
            ul.appendChild(li);

            $('#button_' + cookieValue).click(function(e){
                $.removeCookie('cookie_' + cookieValue);
                location.reload();

            });

            this.html = li;

    }

}

header = new Header(base_fast_menu);

/*function linkToBase(){
    var li = document.createElement("li"),
        a = document.createElement("a"),
        i = document.createElement("i");

    li.setAttribute('id', 'fast_link_li_1');
    li.setAttribute('class', 'green');
    a.setAttribute('data-toggle', 'dropdown');
    //a.setAttribute('class', 'dropdown-toggle');
    a.setAttribute('href', '#');
    a.setAttribute('id', 'a');
    i.setAttribute('class', 'icon-th-list icon-animated-vertical');
    i.setAttribute('style', 'width: 50px;');

    a.appendChild(i);
    li.appendChild(a);
    base_fast_menu.appendChild(li);

    this.html = li;

    $('#fast_link_li_1').hover(function(){
        $('#a').dropdown('toggle');
    });

}

function linkToBase_onHover(){
var li_div_to_append = document.getElementById("fast_link_li_1"),
    li = document.createElement("li"),
    ul = document.createElement("ul");

    ul.setAttribute('class', 'pull-right dropdown-navbar dropdown-menu dropdown-caret dropdown-closer');
    ul.setAttribute('id', 'fast_link_ul_1');
    li.setAttribute('class', 'nav-header');

    li.innerHTML = "Base";
    ul.appendChild(li);
    li_div_to_append.appendChild(ul);

    this.html = li;

}

function linkToBase_onHover_Info(){
var ul = document.getElementById("fast_link_ul_1"),
    li = document.createElement("li"),
    a = document.createElement("a"),
    img = document.createElement("img"),
    span1 = document.createElement("span"),
    span2 = document.createElement("span"),
    span3 = document.createElement("span"),
    i = document.createElement("i");

    span1.setAttribute('class', 'blue');
    span1.innerHTML = 'Alex:';
    span2.setAttribute('class' ,'msg-title');
    span3.setAttribute('class', 'msg-body');
    img.setAttribute('class', 'msg-photo');
    img.setAttribute('src', '/static/ace-final/assets/avatars/avatar.png');
    img.setAttribute('alt', 'Alex Avatar');

    span2.appendChild(span1);
    span3.appendChild(span2);
    a.appendChild(span2);
    a.appendChild(img);
    li.appendChild(a);
    ul.appendChild(li);

    this.html = li;

}

linktobase = new linkToBase();
linkToBase_onhover = new linkToBase_onHover();
linkToBase_onhover_info = new linkToBase_onHover_Info();*/
