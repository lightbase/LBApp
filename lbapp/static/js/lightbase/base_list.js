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
    var tbody = document.getElementById("tbody");
    var tr = document.createElement("tr");
    tr.setAttribute('id', 'tr-' + i);
    console.log(base)
    $.each(base, function(k, v){
        if (k == "id_base"){
            BaseListID(k, v, tr);
        }
        if (k == "nome_base"){
            BaseListName(k, v, tr);
        }
        if (k == "dt_base"){
            BaseListDate(k, v, tr);
        }
        if (k == "id_base"){
            BaseListEdit(tr, tbody, v);
            BaseListDelete(tr, tbody, v, tbody);
        }
    });
//    BaseListDelete(tr, tbody);
}

function BaseListID(k, v, tr){
    var td = document.createElement("td");
    var a = document.createElement("a");

    a.setAttribute('href', '#');
    a.innerText = v;
    td.appendChild(a);
    tr.appendChild(td);
    this.html = td;

}

function BaseListName(k, v, tr){
    var td = document.createElement("td");
    var a = document.createElement("a");

    a.setAttribute('href', '#');
    a.innerText = v;
    td.appendChild(a);
    tr.appendChild(td);
    this.html = td;

}

function BaseListDate(k, v, tr){
    var td = document.createElement("td");
    var a = document.createElement("a");

    a.setAttribute('href', '#');
    a.innerText = v;
    td.appendChild(a);
    tr.appendChild(td);
    this.html = td;

}

function BaseListEdit(tr, tbody, v){
    var td = document.createElement("td");
    var a = document.createElement("a");
    var div = document.createElement("div");
    var i = document.createElement("i");
    var button = document.createElement("button");
    var ul = document.createElement("ul");
    var li = document.createElement("li");
    var span = document.createElement("span");

    a.setAttribute('class', 'green');
    a.setAttribute('href', 'http://localhost/base/' + v + '/edit');
    i.setAttribute('class', 'icon-pencil bigger-130');
    td.setAttribute('class', 'td-actions');
    td.setAttribute('id', 'td-actions' + v);
    div.setAttribute('class', 'hidden-phone visible-desktop action-buttons');
    div.setAttribute('id', 'div-' + v);
    a.appendChild(i);
    div.appendChild(a);
    td.appendChild(div);
    tr.appendChild(td);
    tbody.appendChild(tr);
    this.html = td;

}

function BaseListDelete(tr, tbody, v){
    var td = document.getElementById("td-actions" + v);
    var div = document.getElementById("div-" + v);
    var a = document.createElement("a");
    var i = document.createElement("i");
    var button = document.createElement("button");
    var ul = document.createElement("ul");
    var li = document.createElement("li");
    var span = document.createElement("span");

    a.setAttribute('class', 'red');
    a.setAttribute('href', '#');
    i.setAttribute('class', 'icon-trash bigger-130');
    a.appendChild(i);
    div.appendChild(a);
    tbody.appendChild(tr);
    this.html = td;

}

/*function BaseListPhoneEdit(tr, td, tbody){
    var a = document.createElement("a");
    var div_o = document.createElement("div");
    var div_i = document.createElement("div");
    var i = document.createElement("i");
    var i_button = document.createElement("i");
    var button = document.createElement("button");
    var ul = document.createElement("ul");
    var li = document.createElement("li");
    var span = document.createElement("span");

    i.setAttribute('class', 'icon-edit bigger-120');
    span.setAttribute('class', 'green');
    a.setAttribute('class', 'tooltip-success');
    a.setAttribute('href', 'http://localhost/base/' +  + 'edit');
    a.setAttribute('data-rel', 'tooltip');
    a.setAttribute('title', 'Edit');
    div_o.setAttribute('class', 'hidden-desktop visible-phone');
    div_o.setAttribute('id', 'div');
    div_i.setAttribute('class', 'inline position-relative');
    div_i.setAttribute('id', 'div-h');
    ul.setAttribute('class', 'dropdown-menu dropdown-icon-only dropdown-yellow pull-right dropdown-caret dropdown-close');
    button.setAttribute('class', 'btn btn-minier btn-yellow dropdown-toggle');
    button.setAttribute('data-toggle', 'dropdown');
    i_button.setAttribute('class', 'icon-caret-down icon-only bigger-120');

    button.appendChild(i_button);
    div_i.appendChild(button);
    span.appendChild(i);
    a.appendChild(span);
    li.appendChild(a);
    ul.appendChild(li);
    div_i.appendChild(ul);
    div_o.appendChild(div_i);
    console.log(td);
    td.appendChild(div_o);
    BaseListPhoneDelete(ul)

}

function BaseListPhoneDelete(ul){
    var li = document.createElement("li");
    var span = document.createElement("span");
    var a = document.createElement("a");
    var i = document.createElement("i");

    i.setAttribute('class', 'icon-trash bigger-120');
    span.setAttribute('class', 'red');
    a.setAttribute('class', 'tooltip-error');
    a.setAttribute('href', '#');
    a.setAttribute('data-rel', 'tooltip');
    a.setAttribute('title', 'Delete');

    span.appendChild(i);
    a.appendChild(span);
    li.appendChild(a);
    ul.appendChild(li);

}*/

/*basetable = new BaseTable(base_content); 

function BaseTable(base_content){

    this.base_content = base_content;

    this.renderTo = function (element){
        var line;
        $.each(this.base_content, function(i, base){
            console.log(base);
            table_line = new TableLine(base);
            element.appendChild(table_line.html);
        });

    };
}

function TableLine(base){
    this.base = base;

    var tr = document.createElement("tr"),
        listName = new BaseListName(this.base.nome_base),
        listID = new BaseListID(this.base.id_base),
        listDate = new BaseListDate(this.base.dt_base),
        listEdit = new BaseListEdit();

    tr.appendChild(listName.html);
    tr.appendChild(listID.html);
    tr.appendChild(listDate.html);
    tr.appendChild(listEdit.html);
    this.html = tr;
}*/
