var data = JSON.parse(document.getElementById("widgets").textContent).results;

x = document.getElementsByTagName('body')[0];
x.appendChild(to_table("bases", data));


function editable_anchor(id, text){
var anchor = document.createElement('a');
anchor.setAttribute('id', id);
//anchor.setAttribute('href', '');
anchor.setAttribute('data-type', 'text');
anchor.setAttribute('data-pk', '1');
anchor.setAttribute('data-original-title', 'Enter data');
anchor.setAttribute('class','editable editable-click');
anchor.setAttribute('style', 'display: inline;');
anchor.innerText = text;

return anchor;

}

function is_dict(object){
    return Object.prototype.isPrototypeOf(object) && !Array.prototype.isPrototypeOf(object);
}

function is_array(object){
    return Array.prototype.isPrototypeOf(object);
}

function to_table(id, data){

if ($.isEmptyObject(data)) return null;

// INIT ELEMENT VARIABLES

id = id.toString().replace(/\./g,'-'); 
var div = document.createElement('div');
var table = document.createElement('table');
var thead = document.createElement('thead');
var tbody = document.createElement('tbody');
var thead_tr = document.createElement('tr');
var body_tr = document.createElement('tr');
var field;
var field_id;
var thead_td;
var body_td;
var anchor;
var bold;
var obj;

// BUILD TABLE INNER ELEMENTS

for (field in data){

        //if (is_dict(data[field])) continue;

        // THEAD 

        thead_td = document.createElement('td');
        bold = document.createElement('b');
        bold.innerText = field;
        thead_td.appendChild(bold);
        thead_tr.appendChild(thead_td);

        // BODY

        field_id = id + '-' + field;
        anchor = editable_anchor(field_id, data[field])
        body_td = document.createElement('td');
        body_td.appendChild(anchor);
        body_tr.appendChild(body_td);
}

//APPEND TABLE CHILD ELEMENTS

div.setAttribute('style', 'overflow:auto');
table.setAttribute('id', id);
table.setAttribute('class', 'table table-condensed table-striped table-bordered');
thead.appendChild(thead_tr);
tbody.appendChild(body_tr);
table.appendChild(thead);
table.appendChild(tbody);
div.appendChild(table);

return div

}
