var infobase = document.getElementById('infobase2');
    infobase.appendChild(criarbase1());



function criarbase1(){

var form = document.createElement('form');
var fieldset = document.createElement('fieldset');
var legend = document.createElement('legend');
var label = document.createElement('label');
var input = document.createElement('input');
// titulo
legend.innerText = 'Grupos';
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
label.innerText = 'Multivalorado: ';
input.setAttribute('type', 'checkbox');
input.setAttribute('value', '1');
label.appendChild(input);
fieldset.appendChild(label);


form.appendChild(fieldset);
infobase.appendChild(form);







}
