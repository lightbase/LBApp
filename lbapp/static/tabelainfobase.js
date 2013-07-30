var widgets = document.getElementById('infobase');
    widgets.appendChild(tabela());
function tabela(){

    var div = document.createElement('div');
    var table = document.createElement('table');
    var thead= document.createElement('thead');
    var thead_tr = document.createElement('tr');
    var thead_td;
    var tbody= document.createElement('tbody');
    var tbody_tr;
    var tbody_td;
    var tr = document.createElement('tr');
    var h1;
    var field;


    // inicio thead


   
        thead_td = document.createElement('td');
        h1 = document.createElement('b');
        h1.innerText = 'Nome';
        thead_td.appendChild(h1);
        thead_tr.appendChild(thead_td);
        thead.appendChild(thead_tr);
        thead_td = document.createElement('td');
        h1 = document.createElement('b');
        h1.innerText = 'Multi-Valorado';
        thead_td.appendChild(h1);
        thead_tr.appendChild(thead_td);
        thead.appendChild(thead_tr);

    // fim thead

    // inicio tbody

            tbody_tr = document.createElement('tr');
            tbody_td = document.createElement('td');
            h2 = document.createElement('b');
            h2.innerText = 'Sigilo'; 
            tbody_td.appendChild(h2);
            tbody_tr.appendChild(tbody_td);
            tbody_td = document.createElement('td');
            h2 = document.createElement('b');
            h2.innerText = 'Sim/Não';
            tbody_td.appendChild(h2);
            tbody_tr.appendChild(tbody_td);
            tbody.appendChild(tbody_tr);

    // fim tbody

    table.appendChild(thead);
    table.appendChild(tbody);
    table.setAttribute('id', "tabela1");
    table.setAttribute('class', 'table table-condensed table-striped table-bordered');
    div.appendChild(table);

return div

}
