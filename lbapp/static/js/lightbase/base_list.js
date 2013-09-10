var json = JSON.parse(document.getElementById("controller-base").innerHTML);

var base_content = JSON.parse($('#controller-base').text());
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

var tbody = document.getElementById("tbody");

fastlinkclass = new FastLinkClass();

$.each(json, function(i, base){
    var id = base.id_base,
        name = base.nome_base,
        date = base.dt_base;


    tr = document.createElement("tr");
    tr.setAttribute('id', 'tr-' + i);

    fastlinkclass.BaseListID(tr, id, name);
    fastlinkclass.BaseListName(tr, id, name);
    fastlinkclass.BaseListDate(tr, id, name, date);
    fastlinkclass.BaseListEdit(tr, tbody, id, name);
    fastlinkclass.BaseListDelete(tr, tbody, id, name);
    fastlinkclass.BaseListPhone(id);
    //fastlinkclass.createLine(i, base);
});


/*    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var label = document.createElement("label");
    var input = document.createElement("input");
    var span = document.createElement("span");
    var div = document.createElement("div");
    var a = document.createElement("a");
    var i = document.createElement("i");
    var button = document.createElement("button");
    var ul = document.createElement("ul");
    var li = document.createElement("li");*/

function FastLinkClass(){

        var cookieNumber = 0;

        $.each($.cookie(), function(){
            cookieNumber += 1;

        });

        this.json = json;
        this.cookieNumber = cookieNumber;

    /*this.createLine = function(i, base){
        this.nome_base = base.nome_base;
        this.id_base = base.id_base;
        this.dt_base = base.dt_base;

        var tbody = document.getElementById("tbody"),
            tr = document.createElement("tr");
        tr.setAttribute('id', 'tr-' + i);
        this.BaseListID(tr);
        this.BaseListName(tr);
        this.BaseListDate(tr);
        this.BaseListEdit(tr, tbody);
        this.BaseListDelete(tr, tbody);
    }*/


    this.BaseListID = function(tr, id, name){
        var td = document.createElement("td");
        var a = document.createElement("a");

        //a.setAttribute('href', '#');
        //a.innerText = id;
        $(td).text(id);
        tr.appendChild(td);

    }

    this.BaseListName = function(tr, id, name){
        var td = document.createElement("td");
        var a = document.createElement("a");

        a.setAttribute('href', '/base/' + id + '/explore');
        $(a).text(name);
        td.appendChild(a);
        tr.appendChild(td);

    }

    this.BaseListDate = function(tr, id, name, date){
        var td = document.createElement("td");
        var a = document.createElement("a");

        //a.setAttribute('href', '#');
        //a.innerText = date;
        $(td).text(date);
        tr.appendChild(td);

    }

    this.BaseListEdit = function(tr, tbody, id, name){
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
        for (var y=0; y<this.json.length; y++){
            if (this.json[y].id_base == id && this.cookieNumber < 7){
                var jsonContent = this.json[y];
                $('#edit-' + id).click(function(e){
                    $.cookie('cookie_' + id, JSON.stringify(jsonContent), {path: '/'});

                });
            }
        }

    }

    this.BaseListDelete = function(tr, tbody, id, name){
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

    }

    this.BaseListPhoneButton = function(id){
        var td = document.getElementById("td-actions" + id);
        var a = document.createElement("a");
        var divin = document.createElement("div");
        var divout = document.createElement("div");
        var i = document.createElement("i");
        var button = document.createElement("button");
        var ul = document.createElement("ul");
        var li = document.createElement("li");
        var span = document.createElement("span");

        divout.setAttribute('class', 'hidden-desktop visible-phone');
        divin.setAttribute('class', 'inline position-relative');
        button.setAttribute('class', 'btn btn-minier btn-yellow dropdown-toggle');
        button.setAttribute('data-toggle', 'dropdown');
        i.setAttribute('class', 'icon-caret-down icon-only bigger-120')

        button.appendChild(i);
        divin.appendChild(button);
        divout.appendChild(divin);
        td.appendChild(divout);

    }
}

