var infobase = document.getElementById('infobase1');
    infobase.appendChild(criarbase());



function criarbase(){

var form = document.createElement('form');
var fieldset = document.createElement('fieldset');
var legend = document.createElement('legend');
var label = document.createElement('label');
var input = document.createElement('input');
// titulo
legend.innerText = 'Bases';
fieldset.appendChild(legend);
// campo nome
label.innerText =  'Nome: ';
input.setAttribute('type', 'text');
input.setAttribute('placeholder', 'Nome Base');
label.appendChild(input);
fieldset.appendChild(label);
// campo descrição
label = document.createElement('label');
input = document.createElement('input');
label.innerText =  'Descrição: ';
input.setAttribute('type', 'text');
input.setAttribute('placeholder', 'Descrição Base');
label.appendChild(input);
fieldset.appendChild(label);
//campo exportar
label = document.createElement('label');
input = document.createElement('input');
label.innerText = 'Exportar indice: ';
input.setAttribute('type', 'checkbox');
input.setAttribute('value', '1');
label.appendChild(input);
input = document.createElement('input');
input.setAttribute('type', 'checkbox');
input.setAttribute('value', '2');
label.appendChild(input);
fieldset.appendChild(label);
// campo url
label = document.createElement('label');
input = document.createElement('input');
label.innerText =  'URL do indexador: ';
input.setAttribute('type', 'text');
input.setAttribute('placeholder', 'Descrição Base');
label.appendChild(input);
fieldset.appendChild(label);
// campo tempo de indexação
label = document.createElement('label');
input = document.createElement('input');
label.innerText =  'Tempo de espera da indexação: ';
input.setAttribute('type', 'text');
input.setAttribute('placeholder', 'Descrição Base');
label.appendChild(input);
fieldset.appendChild(label);
// campo exportar indice
label = document.createElement('label');
input = document.createElement('input');
label.innerText = 'Exportar indice: ';
input.setAttribute('type', 'checkbox');
input.setAttribute('value', '1');
label.appendChild(input);
input = document.createElement('input');
input.setAttribute('type', 'checkbox');
input.setAttribute('value', '2');
label.appendChild(input);
fieldset.appendChild(label);
// campo tempo de indexação
label = document.createElement('label');
input = document.createElement('input');
label.innerText =  'Tempo de espera da indexação: ';
input.setAttribute('type', 'text');
input.setAttribute('placeholder', 'Descrição Base');
label.appendChild(input);
fieldset.appendChild(label);


form.appendChild(fieldset);
infobase.appendChild(form);







}
