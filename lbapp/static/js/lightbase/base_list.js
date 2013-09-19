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
        color = base.json_base.metadata.color;

    tr = document.createElement("tr");
    tr.setAttribute('id', 'tr-' + i);

    fastlinkclass.BaseListID(tr, id);
    fastlinkclass.BaseListColor(tr, color);
    fastlinkclass.BaseListName(tr, id, name);
    fastlinkclass.BaseListDate(tr, date);
    fastlinkclass.BaseListEdit(tr, tbody, id);
    fastlinkclass.BaseListDelete(tr, tbody, id);
    fastlinkclass.BaseListConfig(tr, tbody, id);
    fastlinkclass.BaseListJson(tr, tbody, id, base);
    fastlinkclass.BaseListReg(tr, tbody, id, base);
    fastlinkclass.BaseListPhoneButton(id);
    fastlinkclass.BaseListPhoneEdit(id);
    fastlinkclass.BaseListPhoneDelete(id);
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

        /*$.each($.cookie(), function(){
            cookieNumber += 1;

        });*/

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


    this.BaseListID = function(tr, id){
        var td = document.createElement("td");
        var a = document.createElement("a");

        //a.setAttribute('href', '#');
        //a.innerText = id;
        $(td).text(id);
        tr.appendChild(td);

    }

    this.BaseListColor = function(tr, color){
        var td = document.createElement("td");
        var a = document.createElement("a");
        var div = document.createElement("div");

        div.setAttribute('style', 'width: 16px; height: 16px; background-color: ' + color + ';');

        td.appendChild(div);
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

    this.BaseListDate = function(tr, date){
        var td = document.createElement("td");
        var a = document.createElement("a");

        //a.setAttribute('href', '#');
        //a.innerText = date;
        var date_data = date.split(' ')[0];
        var data_content = date_data.split('-');
        var date_time = date.split(' ')[1];
        var time_content = date_time.split(':');
        var time_content_seconds = time_content[2].split('.');
        var data = data_content[2] + '/' + data_content[1] + '/' + data_content[0] + ' ' + time_content[0] + ':' + time_content[1];

        $(td).text(data);
        tr.appendChild(td);

    }

    this.BaseListEdit = function(tr, tbody, id){
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
        i.setAttribute('rel', 'tooltip');
        i.setAttribute('title', 'Editar');
        td.setAttribute('class', 'td-actions');
        td.setAttribute('id', 'td-actions' + id);
        div.setAttribute('class', 'hidden-phone visible-desktop action-buttons');
        div.setAttribute('id', 'div-' + id);

        $("[rel=tooltip]").tooltip({placement: 'top'});

        a.appendChild(i);
        div.appendChild(a);
        td.appendChild(div);
        tr.appendChild(td);
        tbody.appendChild(tr);
        /*for (var y=0; y<this.json.length; y++){
            if (this.json[y].id_base == id && this.cookieNumber < 7){
                var jsonContent = this.json[y];
                $('#edit-' + id).click(function(e){
                    $.cookie('cookie_' + id, JSON.stringify(jsonContent), {path: '/'});

                });
            }
        }*/

    }

    this.BaseListDelete = function(tr, tbody, id){
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
        i.setAttribute('rel', 'tooltip');
        i.setAttribute('title', 'Deletar');
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

    this.BaseListConfig = function(tr, tbody, id){
        var td = document.getElementById("td-actions" + id);
        var div = document.getElementById("div-" + id);
        var a = document.createElement("a");
        var i = document.createElement("i");
        var button = document.createElement("button");
        var ul = document.createElement("ul");
        var li = document.createElement("li");
        var span = document.createElement("span");

        a.setAttribute('class', 'blue dialogify');
        a.setAttribute('href', '/config');
        i.setAttribute('class', 'icon-cog bigger-130');
        i.setAttribute('id', 'config-' + id);
        i.setAttribute('rel', 'tooltip');
        i.setAttribute('title', 'Configurações');
        a.appendChild(i);
        div.appendChild(a);
        tbody.appendChild(tr);


        $(function() {
            $("#div_config").dialog({
                autoOpen: false,
                modal: true,
                width: 800,
                height: 500,
                // buttons: {
                //     "Fechar": function() {
                //         $(this).dialog("close");
                //     }
                // }
            });
            $(".dialogify").on("click", function(e) {
                e.preventDefault();
                $("#div_config").html("");
                $("#div_config").dialog("option", "title", "Configurações").dialog("open");
                $("#div_config").load(this.href, function() {
                    // $(this).dialog("option", "title", $(this).find("h1").text());
                    // $(this).find("h1").remove();
                });
            });
        });
    }

    this.BaseListJson = function(tr, tbody, id, base){
        var td = document.getElementById("td-actions" + id);
        var div = document.getElementById("div-" + id);
        var a = document.createElement("a");
        var i = document.createElement("i");
        var button = document.createElement("button");
        var ul = document.createElement("ul");
        var li = document.createElement("li");
        var span = document.createElement("span");

        a.setAttribute('class', 'grey');
        i.setAttribute('class', 'icon-th-list');
        i.setAttribute('id', 'json-' + id);
        i.setAttribute('rel', 'tooltip');
        i.setAttribute('title', 'Json');
        a.appendChild(i);
        div.appendChild(a);
        tbody.appendChild(tr);

        $("#json-" + id).click(function(){
            var val = JSON.stringify(base.json_base);
            bootbox.dialog(fastlinkclass.FormatJson(val), [{
                "label" : "Fechar",
                "class" : "btn-small btn-primary",
                }
            ]);
        });

    }

    this.BaseListReg = function(tr, tbody, id, base){
        var td = document.getElementById("td-actions" + id);
        var div = document.getElementById("div-" + id);
        var a = document.createElement("a");
        var i = document.createElement("i");
        var button = document.createElement("button");
        var ul = document.createElement("ul");
        var li = document.createElement("li");
        var span = document.createElement("span");

        a.setAttribute('class', 'blue');
        i.setAttribute('class', 'icon-file');
        i.setAttribute('id', 'reg-' + id);
        i.setAttribute('rel', 'tooltip');
        i.setAttribute('title', 'Reg');
        a.appendChild(i);
        div.appendChild(a);
        tbody.appendChild(tr);

        $("#reg-" + id).click(function(){
            var val = JSON.stringify(base.reg_model);
            bootbox.dialog(fastlinkclass.FormatJson(val), [{
                "label" : "Fechar",
                "class" : "btn-small btn-primary",
                }
            ]);
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
        divin.setAttribute('id', 'divin_' + id);
        button.setAttribute('class', 'btn btn-minier btn-yellow dropdown-toggle');
        button.setAttribute('data-toggle', 'dropdown');
        i.setAttribute('class', 'icon-caret-down icon-only bigger-120')

        button.appendChild(i);
        divin.appendChild(button);
        divout.appendChild(divin);
        td.appendChild(divout);

    }

    this.BaseListPhoneEdit = function(id){
        var divin = document.getElementById("divin_" + id);
        var i = document.createElement("i");
        var ul = document.createElement("ul");
        var li = document.createElement("li");
        var span = document.createElement("span");
        var a = document.createElement("a");

        i.setAttribute('class', 'icon-edit bigger-120');
        i.setAttribute('id', 'edit-' + id);
        span.setAttribute('class', 'green');
        a.setAttribute('class', 'tooltip-success');
        a.setAttribute('data-rel', 'tooltip');
        a.setAttribute('title', 'Edit');
        a.setAttribute('href', '/base/' + id + '/edit');
        ul.setAttribute('class', 'dropdown-menu dropdown-icon-only dropdown-yellow pull-right dropdown-caret dropdown-close');
        ul.setAttribute('id', 'ul_' + id);

        span.appendChild(i);
        a.appendChild(span);
        li.appendChild(a);
        ul.appendChild(li);
        divin.appendChild(ul);

        /*for (var y=0; y<this.json.length; y++){
            if (this.json[y].id_base == id && this.cookieNumber < 7){
                var jsonContent = this.json[y];
                $('#edit-phone-' + id).click(function(e){
                    $.cookie('cookie_' + id, JSON.stringify(jsonContent), {path: '/'});

                });
            }
        }*/

    }

    this.BaseListPhoneDelete = function(id){
        var ul = document.getElementById("ul_" + id);
        var li = document.createElement("li");
        var span = document.createElement("span");
        var a = document.createElement("a");
        var i = document.createElement("i");

        i.setAttribute('class', 'icon-trash bigger-120');
        i.setAttribute('id', 'delete-phone-' + id);
        span.setAttribute('class', 'red');
        a.setAttribute('class', 'tooltip-error');
        a.setAttribute('data-rel', 'tooltip');
        a.setAttribute('title', 'Delete');

        span.appendChild(i);
        a.appendChild(span);
        li.appendChild(a);
        ul.appendChild(li);

        $("#delete-phone-" + id).click(function(){
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

    this.FormatJson = function(val) {
        var retval = '';
        var str = val;
        var pos = 0;
        var strLen = str.length;
        var indentStr = '&nbsp;&nbsp;&nbsp;&nbsp;';
        var newLine = '<br />';
        var character = '';

        for (var i=0; i<strLen; i++) {
          character = str.substring(i,i+1);
          if (character == '}' || character == ']') {
              retval = retval + newLine;
              pos = pos - 1;
              for (var j=0; j<pos; j++) {
                  retval = retval + indentStr;
              }
          }

          retval = retval + character;

          if (character == '{' || character == '[' || character == ',') {
              retval = retval + newLine;
              if (character == '{' || character == '[') {
                  pos = pos + 1;
              }

              for (var k=0; k<pos; k++) {
                  retval = retval + indentStr;
              }
          }
        }
        return retval;
    }
}

