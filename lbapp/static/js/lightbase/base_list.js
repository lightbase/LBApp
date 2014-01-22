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
        date = base.dt_base,
        color = base.json_base.metadata.color;

    tr = document.createElement("tr");
    tr.setAttribute('id', 'tr-' + i);

    fastlinkclass.baseListID(tr, id);
    fastlinkclass.baseListColor(tr, color);
    fastlinkclass.baseListName(tr, id, name);
    fastlinkclass.baseListDate(tr, date);
    fastlinkclass.baseListEdit(tr, tbody, id, name);
    fastlinkclass.baseListDelete(tr, tbody, id, name);
    fastlinkclass.baseListConfig(tr, tbody, id, base);
    fastlinkclass.baseListJson(tr, tbody, id, base);
    fastlinkclass.baseListReg(tr, tbody, id, base);
    fastlinkclass.baseListPhoneButton(id);
    fastlinkclass.baseListPhoneEdit(id, name);
    fastlinkclass.baseListPhoneDelete(id, name);
    fastlinkclass.baseListPhoneConfig(tr, tbody, id);
    fastlinkclass.baseListPhoneJson(tr, tbody, id, base);
    fastlinkclass.baseListPhoneReg(tr, tbody, id, base);
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


    this.baseListID = function(tr, id){
        var td = document.createElement("td");
        var a = document.createElement("a");

        //a.setAttribute('href', '#');
        //a.innerText = id;
        $(td).text(id);
        tr.appendChild(td);

    }

    this.baseListColor = function(tr, color){
        var td = document.createElement("td");
        var a = document.createElement("a");
        var div = document.createElement("div");

        div.setAttribute('style', 'width: 16px; height: 16px; background-color: ' + color + ';');

        td.appendChild(div);
        tr.appendChild(td);

    }

    this.baseListName = function(tr, id, name){
        var td = document.createElement("td");
        var a = document.createElement("a");

        a.setAttribute('href', '/base/' + name + '/explore');
        $(a).text(name);
        td.appendChild(a);
        tr.appendChild(td);

    }

    this.baseListDate = function(tr, date){
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

    this.baseListEdit = function(tr, tbody, id, name){
        var td = document.createElement("td");
        var a = document.createElement("a");
        var div = document.createElement("div");
        var i = document.createElement("i");
        var button = document.createElement("button");
        var ul = document.createElement("ul");
        var li = document.createElement("li");
        var span = document.createElement("span");

        a.setAttribute('class', 'green');
        a.setAttribute('href', '/base/' + name + '/edit');
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

    this.baseListDelete = function(tr, tbody, id, name){
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
                        type: 'DELETE',
                        url: window.location + "?base=" + name,
                        //data: {"id_base": id},
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

    this.baseListConfig = function(tr, tbody, id, base){
        var td = document.getElementById("td-actions" + id);
        var div = document.getElementById("div-" + id);
        var a = document.createElement("a");
        var i = document.createElement("i");
        var button = document.createElement("button");
        var ul = document.createElement("ul");
        var li = document.createElement("li");
        var span = document.createElement("span");

        a.setAttribute('class', 'blue dialogify');
        // a.setAttribute('href', '/config');
        i.setAttribute('class', 'icon-cog bigger-130');
        i.setAttribute('id', 'config-' + id);
        i.setAttribute('rel', 'tooltip');
        i.setAttribute('title', 'Configurações');
        a.appendChild(i);
        div.appendChild(a);
        tbody.appendChild(tr);

        $("#config-" + id).click(function(){
            var id_base = base.id_base,
                json_base = base.json_base;
            bootbox.dialog('<form id="form">' +
                             '</form>', [{
                'label':'Fechar',
                'class':'btn btn-primary',
                
            }]
            );
            config_table.findTableID();
            config_table.exportIndex();
            config_table.controlGroupURL();
            config_table.urlIndex();
            config_table.indexTime();
            config_table.docExtract();
            config_table.controlGroupDOC();
            config_table.extractTime();
            config_table.buttons();
            config_table.javascript(base);

        });

    }

    this.baseListJson = function(tr, tbody, id, base){
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
            bootbox.dialog(fastlinkclass.formatJson(val), [{
                "label" : "Fechar",
                "class" : "btn-small btn-primary",
                }
            ]);
        });

    }

    this.baseListReg = function(tr, tbody, id, base){
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
            bootbox.dialog(fastlinkclass.formatJson(val), [{
                "label" : "Fechar",
                "class" : "btn-small btn-primary",
                }
            ]);
        });

    }

    this.baseListPhoneButton = function(id){
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

    this.baseListPhoneEdit = function(id, name){
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
        a.setAttribute('title', 'Editar');
        a.setAttribute('href', '/base/' + name + '/edit');
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

    this.baseListPhoneDelete = function(id, name){
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
        a.setAttribute('title', 'Deletar');

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
                        data: {"base": name},
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

        this.baseListPhoneConfig = function(tr, tbody, id){
        var ul = document.getElementById("ul_" + id);
        var li = document.createElement("li");
        var span = document.createElement("span");
        var a = document.createElement("a");
        var i = document.createElement("i");

        i.setAttribute('class', 'icon-cog bigger-120');
        i.setAttribute('id', 'config-phone-' + id);
        span.setAttribute('class', 'blue');
        a.setAttribute('class', 'tooltip-error');
        a.setAttribute('data-rel', 'tooltip');
        a.setAttribute('title', 'Configurar');

        span.appendChild(i);
        a.appendChild(span);
        li.appendChild(a);
        ul.appendChild(li);

    }

    this.baseListPhoneJson = function(tr, tbody, id, base){
        var ul = document.getElementById("ul_" + id);
        var li = document.createElement("li");
        var span = document.createElement("span");
        var a = document.createElement("a");
        var i = document.createElement("i");

        i.setAttribute('class', 'icon-th-list bigger-120');
        i.setAttribute('id', 'json-phone-' + id);
        span.setAttribute('class', 'gray');
        a.setAttribute('class', 'tooltip-error');
        a.setAttribute('data-rel', 'tooltip');
        a.setAttribute('title', 'Json');

        span.appendChild(i);
        a.appendChild(span);
        li.appendChild(a);
        ul.appendChild(li);

        $("#json-phone-" + id).click(function(){
            var val = JSON.stringify(base.json_base);
            bootbox.dialog(fastlinkclass.FormatJson(val), [{
                "label" : "Fechar",
                "class" : "btn-small btn-primary",
                }
            ]);
        });

    }

    this.baseListPhoneReg = function(tr, tbody, id, base){
        var ul = document.getElementById("ul_" + id);
        var li = document.createElement("li");
        var span = document.createElement("span");
        var a = document.createElement("a");
        var i = document.createElement("i");

        i.setAttribute('class', 'icon-file bigger-120');
        i.setAttribute('id', 'reg-phone-' + id);
        span.setAttribute('class', 'blue');
        a.setAttribute('class', 'tooltip-error');
        a.setAttribute('data-rel', 'tooltip');
        a.setAttribute('title', 'Reg');

        span.appendChild(i);
        a.appendChild(span);
        li.appendChild(a);
        ul.appendChild(li);

        $("#reg-phone-" + id).click(function(){
            var val = JSON.stringify(base.reg_model);
            bootbox.dialog(fastlinkclass.FormatJson(val), [{
                "label" : "Fechar",
                "class" : "btn-small btn-primary",
                }
            ]);
        });

    }


    this.formatJson = function(val) {
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

