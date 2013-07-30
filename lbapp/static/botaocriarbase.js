function Nestables(){
    this.id = 13;
    this.create_base = function(){
        var li = document.createElement("li");
        var div = document.createElement("div");
        li.setAttribute('class', "dd-item");
        li.setAttribute('data-id', this.id );
        div.setAttribute('class', "dd-handle");
        div.innerText = 'Item';
        li.appendChild(div);
        this.id = this.id + 1;

        return li
    }


}

new_id = new Nestables();

$("button").click(function(){

var ol = document.getElementById("ol1");
ol.appendChild(new_id.create_base());
});
