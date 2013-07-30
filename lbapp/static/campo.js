var infobase = document.getElementById('infobase3');
    infobase.appendChild(criarbase3());



function criarbase3(){

var form = document.createElement('form');
var fieldset = document.createElement('fieldset');
var legend = document.createElement('legend');
var label = document.createElement('label');
var input = document.createElement('input');
var select = document.createElement('select');
var option = document.createElement('option');

// titulo
legend.innerText = 'Campos';
fieldset.appendChild(legend);
// campo nome
label.innerText =  'Nome: ';
input.setAttribute('type', 'text');
input.setAttribute('placeholder', 'Nome Base');
label.appendChild(input);
fieldset.appendChild(label);
// campo descriçãoi
label = document.createElement('label');
input = document.createElement('input');
label.innerText =  'Descrição: ';
input.setAttribute('type', 'text');
input.setAttribute('placeholder', 'Descrição Base');
label.appendChild(input);
fieldset.appendChild(label);
// campo tipo

options = [
]


label = document.createElement('label');
select = document.createElement('select');
option = document.createElement('option');
option.innerText = 'Alfa Numérico';
select.appendChild(option);
option = document.createElement('option');
option.innerText = 'Documentos';
select.appendChild(option);
option = document.createElement('option');
option.innerText = 'Inteiro';
select.appendChild(option);
option = document.createElement('option');
option.innerText = 'Decimal';
select.appendChild(option);
option = document.createElement('option');
option.innerText = 'Moeda';
select.appendChild(option);
option = document.createElement('option');
option.innerText = 'Alto Enumerado';
select.appendChild(option);
option = document.createElement('option');
option.innerText = 'Data';
select.appendChild(option);
option = document.createElement('option');
option.innerText = 'Hora';
select.appendChild(option);
option = document.createElement('option');
option.innerText = 'Imagem';
select.appendChild(option);
option = document.createElement('option');
option.innerText = 'Som';
select.appendChild(option);
option = document.createElement('option');
option.innerText = 'Vídeo';
select.appendChild(option);
option = document.createElement('option');
option.innerText = 'URL';
select.appendChild(option);
option = document.createElement('option');
option.innerText = 'Verdadeiro/Falso';
select.appendChild(option);
option = document.createElement('option');
option.innerText = 'Texto';
select.appendChild(option);
option = document.createElement('option');
option.innerText = 'Arquivo';
select.appendChild(option);
option = document.createElement('option');
option.innerText = 'HTML';
select.appendChild(option);
option = document.createElement('option');
option.innerText = 'E-mail';
select.appendChild(option);
label.innerText = 'Tipo: ';
label.appendChild(select);
fieldset.appendChild(label);
// campo indexação
label = document.createElement('label');
label.innerText = 'Indexação: ';
fieldset.appendChild(label);
label = document.createElement('label');
input = document.createElement('input');
input.innerHTML = 'sim';
input.setAttribute('type', 'checkbox');
input.setAttribute('value', '1');
label.appendChild(input);
input = document.createElement('input');
input.setAttribute('type', 'checkbox');
input.setAttribute('value', '2');
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
