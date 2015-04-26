var baseJson = "";

function salvar(){
	console.log("salvar ..."+baseJson);
	
	//TODO arrumar ... gambiarra enquanto o bootbox nao funciona
	$.ajax({
        type: 'post',
        url: '/base/new',
        data: {
            json_base: baseJson
        },
        success: function (data, textStatus, jqXHR) {
        	alert('Obrigado! Sua base foi salva com sucesso!');		           
        },
        error: function (jqXHR, textStatus, errorThrown) {
             console.log(jqXHR, textStatus, errorThrown)
             //Utils.error('Por favor Tente novamente mais tarde!');
        }
	});
	
	/*
	bootbox.dialog("Deseja realmente salvar base?", [{
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
	}]);
	*/
}		 