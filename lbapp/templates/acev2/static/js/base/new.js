var base_form;
//var baseModel;

    function validateBase(){
	var obj = base_form;//$.parseJSON( baseJson );
	console.log('********** base_form='+base_form);
	var errors = [];
	
	validateMetadata(obj, errors);
    validateContents(obj, errors);
	
    console.log("ERRORS: "+errors);
    
    return errors;
}

function validateMetadata(obj, errors){
	var meta = obj['metadata'];

	if(! validateString(meta['name'])){
		errors.push('O nome da base é obrigatório');
    }    
	if(meta['name'] == 'Nome da base ...'){
		errors.push('O nome da base é inválido');
	}
	if(meta['name'].split(' ').length > 1){
		errors.push('O nome da base não pode conter espaços');
	}
	
    if(! validateString(meta['password'])){
    	errors.push('A senha da base é obrigatória');
    }
    
    if(! validateString(meta['color'])){
    	errors.push('A cor é obrigatória');
    }
}


var fieldNames = [];

function validateContents(obj, errors){
	var contents = obj['content'];
	
	console.log("CONTENTS="+JSON.stringify(contents));
	
	if(contents.length == 0){
		errors.push('É necessária a criação de ao menos um campo');
	}
	
	for(i=0; i < contents.length; i++){
		validateContent(contents[i], errors);
	}
	
}

function validateSnippet(attrs){
	var errors = [];
	
	console.log("validateSnippet JS: "+JSON.stringify(attrs));
	
	var fields = attrs['fields'];
	var value = null;
	if(fields['id'] !== undefined){
		value = fields['id']['value'];
	}
	
	validateIdField(value, errors);
	
	return errors;	
}
function _teste(){
	console.log("chegou aqui ................................");
}

function validateContent(obj, errors){
	console.log('validateContent='+JSON.stringify(obj));
	
	var field = obj['field'];
	
	validateIdField(field['name'], errors);
	
	if(! validateString(field['alias'])){
		errors.push('O alias do campo '+field['name']+' é obrigatório');
    }  
}

function validateIdField(value, errors){
	console.log('validateIdField='+value);
	if(! validateString(value)){
		errors.push('O nome (ID) do campo é obrigatório');
	}else if(! validateNameId(value)){
		errors.push('O nome (ID) do campo é inválido: '+value);
	}else if(fieldNameExists(value)){
		errors.push('O nome (ID) do campo deve ser único: '+value);
	}else{
		// is valid, append to fieldNames array
		fieldNames.push(value);
	}
}

function fieldNameExists(name){
	if(fieldNames.indexOf(name) != -1){
		return true;
	}
	return false;
}

// TODO : Agrupar em um arquivo de LIB validações da base.
function validateNameId(name){
	return /^[a-z_][a-z0-9_]*$/.test(name);
}

function validateString(value){
    if(value == null || value == ''){
    	return false;
    }
    return true;
}

function salvar(){
	console.log("salvar ..."+JSON.stringify(base_form));
	
	/*var errors = validateBase();
	if(errors.length > 0){
		alert(errors.join('\n'));
		return;
	}*/
	
	//TODO arrumar ... gambiarra enquanto o bootbox nao funciona
	$.ajax({
        type: 'post',
        url: '/base/new',
        data: {
            json_base: JSON.stringify(base_form)
        },
        success: function (data, textStatus, jqXHR) {
        	alert('Obrigado! Sua base foi salva com sucesso!');		           
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var response = JSON.parse(jqXHR['responseText']);
            var message = response.error_message;
            bootbox.alert("erro ao salvar base : " + message);

             //Utils.error('Por favor Tente novamente mais tarde!');
        }
	});
	
	
	/*bootbox.dialog("Deseja realmente salvar base?", [{
		"label": "Salvar",
		"class": "btn btn-succes",
		callback: function () {
			$.ajax({
		        type: 'post',
		        url: '/base/new',
		        data: {
		            json_base: baseJson
		        },
		        success: function (data, textStatus, jqXHR) {
		            bootbox.dialog("Obrigado! Sua base foi salva com sucesso!", [{
		                "label": "OK",
		                "class": "btn-small btn-primary",
		                "href": '/base/list',
		            }]);
		        },
		        error: function (jqXHR, textStatus, errorThrown) {
	                 console.log(jqXHR, textStatus, errorThrown)
	                 Utils.error('Por favor Tente novamente mais tarde!');
	            }
			});
		}
	}, {
		"label": "Cancelar",
		"class": "btn btn-danger",
	}]);*/
	
}		 