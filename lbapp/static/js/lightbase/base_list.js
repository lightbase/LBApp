var base_content = JSON.parse(document.getElementById("controller-base").innerHTML);

//w = JSON.parse(base_content);
$.each(base_content, function(i, base){
    createLine(i, base);
});

    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var label = document.createElement("label");
    var input = document.createElement("input");
    var span = document.createElement("span");
    var div = document.createElement("div");
    var a = document.createElement("a");
    var i = document.createElement("i");
    var button = document.createElement("button");
    var ul = document.createElement("ul");
    var li = document.createElement("li");

function createLine(i, base){
    var tbody = document.getElementById("tbody"),
        tr = document.createElement("tr"),
        id = base.id_base,
        name = base.nome_base,
        data = base.dt_base;
    tr.setAttribute('id', 'tr-' + i);
    BaseListID(id, tr);
    BaseListName(name, tr);
    BaseListDate(data, tr);
    BaseListEdit(tr, tbody, id);
    BaseListDelete(tr, tbody, id);
}


function BaseListID(id, tr){
    var td = document.createElement("td");
    var a = document.createElement("a");

    a.setAttribute('href', '#');
    a.innerText = id;
    td.appendChild(a);
    tr.appendChild(td);
    this.html = td;

}

function BaseListName(name, tr){
    var td = document.createElement("td");
    var a = document.createElement("a");

    a.setAttribute('href', '#');
    a.innerText = name;
    td.appendChild(a);
    tr.appendChild(td);
    this.html = td;

}

function BaseListDate(data, tr){
    var td = document.createElement("td");
    var a = document.createElement("a");

    a.setAttribute('href', '#');
    a.innerText = data;
    td.appendChild(a);
    tr.appendChild(td);
    this.html = td;

}

function BaseListEdit(tr, tbody, id){
    var td = document.createElement("td");
    var a = document.createElement("a");
    var div = document.createElement("div");
    var i = document.createElement("i");
    var button = document.createElement("button");
    var ul = document.createElement("ul");
    var li = document.createElement("li");
    var span = document.createElement("span");

    a.setAttribute('class', 'green');
    a.setAttribute('href', '/base/' + id + '/edit');
    i.setAttribute('class', 'icon-pencil bigger-130');
    i.setAttribute('id', 'edit-' + id);
    td.setAttribute('class', 'td-actions');
    td.setAttribute('id', 'td-actions' + id);
    div.setAttribute('class', 'hidden-phone visible-desktop action-buttons');
    div.setAttribute('id', 'div-' + id);
    a.appendChild(i);
    div.appendChild(a);
    td.appendChild(div);
    tr.appendChild(td);
    tbody.appendChild(tr);
    this.html = td;

}

function BaseListDelete(tr, tbody, id){
    var td = document.getElementById("td-actions" + id);
    var div = document.getElementById("div-" + id);
    var a = document.createElement("a");
    var i = document.createElement("i");
    var button = document.createElement("button");
    var ul = document.createElement("ul");
    var li = document.createElement("li");
    var span = document.createElement("span");

    a.setAttribute('class', 'red');
    i.setAttribute('class', 'icon-trash bigger-130');
    i.setAttribute('id', 'delete-' + id);
    a.appendChild(i);
    div.appendChild(a);
    tbody.appendChild(tr);
    this.html = td;

$("#delete-" + id).click(function(){
    bootbox.dialog("Deseja realmente deletar base?", [{
        "label" : "Sim",
        "class" : "btn-small btn-primary",
        callback: function() {
            $.ajax({
                type: 'POST',
                url: window.location,
                data: {"id_base": id},
                cache: false,
                success: function(data, textStatus, jqXHR ){
                window.location.reload();
                },
                error: function(jqXHR, textStatus, errorThrown){
                }
            });
        }
        },{
        "label" : "Não",
        "class" : "btn-small btn-danger",
        }]
    );
});

$('#edit-' + id).click(function(id){
    header.linkToBase(base_fast_menu, id);
    header.linkToBase_onHover(base_fast_menu, id);
    header.linkToBase_onHover_Info(base_fast_menu, id);

});

}

