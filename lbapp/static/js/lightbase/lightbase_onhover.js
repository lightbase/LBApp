function LightbaseOnHover(){

    this.ShowItems = function(){
        var ulBase = document.createElement("ul"),
            div = document.getElementById("lightbase_hover_div"),
            li = document.createElement("li"),
            a = document.getElementById("lightbase_hover_a");

        ulBase.setAttribute('class', 'nav ace-nav pull-left');

        ulBase.appendChild(li);
        ulBase.appendChild(a);
        div.appendChild(ulBase);

        $('#lightbase_hover_a').hover(function(){
            $('#lightbase_hover_a').dropdown('toggle');
        });
    }
}

lightbaseonhover = new LightbaseOnHover();
//lightbaseonhover.ShowItems();
