function Config_Tables(){

	this.findTableID = function(){
		form = document.getElementById('form');
	}

	this.controlGroupURL = function(){
		var controlGroupURL = document.createElement('div');

		controlGroupURL.setAttribute('id', 'control-group-URL');

		form.appendChild(controlGroupURL);

	}

	this.controlGroupDOC = function(){
		var controlGroupDOC = document.createElement('div');

		controlGroupDOC.setAttribute('id', 'control-group-DOC');

		form.appendChild(controlGroupDOC);

		form.appendChild(controlGroupDOC);

	}


	this.exportIndex = function(){
		var divControlGroup = document.createElement('div'),
			labelControl = document.createElement('label'),
			divControls = document.createElement('div'),
			span = document.createElement('span'),
			spanlbl = document.createElement('span'),
			label = document.createElement('label'),
			input = document.createElement('input'),
            br = document.createElement('br');

			divControlGroup.setAttribute('class', 'control-group');
			labelControl.setAttribute('class', 'control-label');
			$(label).text('Exportar Indice: ');
			divControls.setAttribute('class', 'controls');
			span.setAttribute('class', 'span5');
			spanlbl.setAttribute('class', 'lbl');
			input.setAttribute('name', 'index_export');
			input.setAttribute('id', 'index_export');
			input.setAttribute('class', 'ace-switch ace-switch-6');
			input.setAttribute('type', 'checkbox');

			label.appendChild(input);
			label.appendChild(spanlbl);
			span.appendChild(label);
			divControls.appendChild(span);
            divControls.appendChild(br);
			divControlGroup.appendChild(labelControl);
			divControlGroup.appendChild(divControls);
			form.appendChild(divControlGroup);

	}

	this.urlIndex = function(){
		var URLID = document.getElementById('control-group-URL');
			divControlGroup = document.createElement('div'),
		 	divControls = document.createElement('div'),
			label = document.createElement('label'),
			span = document.createElement('span'),
			input = document.createElement('input');

			divControlGroup.setAttribute('class', 'control-group');
			label.setAttribute('id', 'URL-label');
			label.setAttribute('class', 'control-label');
			label.setAttribute('for', 'URL');
			$(label).text('URL do Indexador: ');
			divControls.setAttribute('class', 'controls');
			span.setAttribute('class', 'span5');
			input.setAttribute('class', 'span6');
			input.setAttribute('type', 'text');
			input.setAttribute('id', 'URL_input');
			input.setAttribute('name', 'index_url');
			input.setAttribute('style', 'width: 470px;');

			span.appendChild(input);
			divControls.appendChild(span);
			divControlGroup.appendChild(label);
			divControlGroup.appendChild(divControls);
			URLID.appendChild(divControlGroup);

			// cgu.appendChild(divControlGroup);

			// divControlGroupURL.appendChild(divControlGroup);

			//colocar dentro da div control-group-URL
			//divControlGroupURL = document.getElementById('control-group-URL');
			

	}

	this.indexTime = function(){
		var URLID = document.getElementById('control-group-URL');
			divControlGroup = document.createElement('div'),
		 	divControls = document.createElement('div'),
		 	divSpace6 = document.createElement('div'),
			label = document.createElement('label'),
			span = document.createElement('span'),
			input = document.createElement('input');

			divControlGroup.setAttribute('class', 'control-group');
			label.setAttribute('for', 'name');
			label.setAttribute('class', 'control-label');
			label.setAttribute('for', 'URL');
			$(label).text('Tempo de expera da indexação: ');
			divControls.setAttribute('class', 'controls');
			span.setAttribute('class', 'span5');
			input.setAttribute('name', 'index_time');
			input.setAttribute('type', 'text');
			input.setAttribute('class', 'input-mini');
			input.setAttribute('id', 'spinner1');
			divSpace6.setAttribute('class', 'space-6');

			span.appendChild(input);
			span.appendChild(divSpace6);
			divControls.appendChild(span);
			divControlGroup.appendChild(label);
			divControlGroup.appendChild(divControls);
			URLID.appendChild(divControlGroup);

			//colocar dentro da div control-group-URL

	}

	this.docExtract = function(){
		var divControlGroup = document.createElement('div'),
			labelControl = document.createElement('label'),
			divControls = document.createElement('div'),
			span = document.createElement('span'),
			label = document.createElement('label'),
			input = document.createElement('input');
			spanlbl = document.createElement('span'),

			divControlGroup.setAttribute('class', 'control-group');
			labelControl.setAttribute('class', 'control-label');
			$(label).text('Extrair: ');
			divControls.setAttribute('class', 'controls');
			span.setAttribute('class', 'span5');
			spanlbl.setAttribute('class', 'lbl');
			input.setAttribute('name', 'doc_extract');
			input.setAttribute('id', 'doc_extract');
			input.setAttribute('class', 'ace-switch ace-switch-6');
			input.setAttribute('type', 'checkbox');

			label.appendChild(input);
			label.appendChild(spanlbl);
			span.appendChild(label);
			divControls.appendChild(span);
			divControlGroup.appendChild(labelControl);
			divControlGroup.appendChild(divControls);
			form.appendChild(divControlGroup);
		
	}

	this.extractTime = function(){
		var DOCID = document.getElementById('control-group-DOC');
			divControlGroup = document.createElement('div'),
		 	divControls = document.createElement('div'),
		 	divSpace6 = document.createElement('div'),
			label = document.createElement('label'),
			span = document.createElement('span'),
			input = document.createElement('input');

			divControlGroup.setAttribute('class', 'control-group');
			label.setAttribute('for', 'name');
			label.setAttribute('class', 'control-label');
			label.setAttribute('for', 'URL');
			$(label).text('Tempo de espera da extração');
			divControls.setAttribute('class', 'controls');
			span.setAttribute('class', 'span5');
			input.setAttribute('name', 'extract_time');
			input.setAttribute('type', 'text');
			input.setAttribute('class', 'input-mini');
			input.setAttribute('id', 'spinner2');
			divSpace6.setAttribute('class', 'space-6');

			span.appendChild(input);
			span.appendChild(divSpace6);
			divControls.appendChild(span);
			divControlGroup.appendChild(label);
			divControlGroup.appendChild(divControls);
			DOCID.appendChild(divControlGroup);

			//colocar dentro da div control-group-DOC
		
	}

	this.buttons = function(){
		var divButtons = document.createElement('div'),
			buttonSave = document.createElement('button'),
			buttonSaveIcon = document.createElement('i'),
			buttonCancel = document.createElement('button'),
			buttonCancelIcon = document.createElement('i');

			divButtons.setAttribute('id', 'submit-buttons');
			divButtons.setAttribute('class', 'row-fluid wizard-actions');
			buttonSave.setAttribute('id', 'button-save');
			buttonSave.setAttribute('class', 'btn btn-primary');
			buttonSave.setAttribute('style', 'width: 95px;');
			buttonSaveIcon.setAttribute('class', 'icon-arrow-right icon-on-right');
			// buttonCancel.setAttribute('id', 'button-cancel');
			// buttonCancel.setAttribute('class', 'btn btn-prev');
			// buttonCancel.setAttribute('style', 'margin: 0px 15px;');
			// buttonCancelIcon.setAttribute('class', 'icon-arrow-left');

			// buttonCancel.appendChild(buttonCancelIcon);
			// $(buttonCancel).text('Cancelar');
			// divButtons.appendChild(buttonCancel);
			buttonSave.appendChild(buttonSaveIcon);
			$(buttonSave).text('Salvar');
			divButtons.appendChild(buttonSave);
			form.appendChild(divButtons);
	}

	this.javascript = function(base){
		var script = document.createElement('script');
        $('#spinner1').ace_spinner({value:0,min:0,max:10000,step:1, icon_up:'icon-caret-up', icon_down:'icon-caret-down'});
        $('#spinner2').ace_spinner({value:0,min:0,max:10000,step:1, icon_up:'icon-caret-up', icon_down:'icon-caret-down'});

		$("#control-group-URL").hide();
        $("#control-group-DOC").hide();

		if (base.json_base.metadata.index_export == true){
			$('#index_export').attr("checked",true);
		}

		if (base.json_base.metadata.doc_extract == true){
			$('#doc_extract').attr("checked",true);
		}

		if ($("#index_export").is(":checked") == true){
            $("#control-group-URL").show();
        }else{
            $("#control-group-URL").hide();
        }

        if ($("#doc_extract").is(":checked") == true){
            $("#control-group-DOC").show();
        }else{
            $("#control-group-DOC").hide();
        }

		$("#index_export").click(function(){
            if ($("#index_export").is(":checked") == true){
                $("#control-group-URL").show();
            }else{
                $("#control-group-URL").hide();
            }
        });
   
        $("#doc_extract").click(function(){
            if ($("#doc_extract").is(":checked") == true){
                $("#control-group-DOC").show();
            }else{
                $("#control-group-DOC").hide();
            }
        });	

        $('#URL_input').val(base.json_base.metadata.index_url);
		$('#spinner1').val(base.json_base.metadata.index_time);
		$('#spinner2').val(base.json_base.metadata.extract_time);

        var toValidate = {
        	submitHandler: function(form){
        		var index_export,
            	doc_extract;	

		        if ($('#index_export:checked').val() != undefined){
		            index_export = true;
		            if ($('#URL_input').val()){

		            }
		        }else{
		            index_export = false;
		        }

		        if ($('#doc_extract:checked').val() != undefined){
		            doc_extract = true;
		        }else{
		            doc_extract = false;
		        }

		        base.json_base.metadata.index_export = index_export;
				base.json_base.metadata.index_url = $('#URL_input').val();
		        base.json_base.metadata.index_time = parseInt($('#spinner1').val());
		        base.json_base.metadata.doc_extract = doc_extract;
		        base.json_base.metadata.extract_time = parseInt($('#spinner2').val());

		        $.ajax({
	                type: 'put',
	                url: '/config',
	                data: {"base": base.nome_base, "json_base": JSON.stringify(base.json_base)},
	                cache: false,
	                success: function(data, textStatus, jqXHR ){
	                	bootbox.dialog("Obrigado! Sua base foi alterada com sucesso!", [{
                                        "label" : "OK",
                                        "class" : "btn-small btn-primary",
                                        "href": '/base/list',
                                        }]
                        );
	                },
	                error: function(jqXHR, textStatus, errorThrown){
	                	bootbox.dialog("Ocorreu um erro ao salvar!\n Tente novamente", [{
                                        "label" : "OK",
                                        "class" : "btn-small btn-primary",
                                        // "href": '/base/list',
                                        }]
                        );
	                }
	            });

        	},
        	rules: {
        		index_export: {
                    required: false
            	},
            	index_url: {
                    url: true,
            		required: {
                        depends: function(element){
                            var checked = false;
                            if ($("#index_export").attr("checked",true)){
                                checked = true
                            }
                            return checked
                        }   
                	}                                     
            	},
            	index_time: {
                    required: false
            	},
            	document_extract: {
                	required: false
            	},
            	extraction_time: {
                	required: false
            	},
        	},
        	messages: {
        		index_url: {
        			required: 'É necessário preencher este campo.',
        			url: 'Digite uma url valida'
        		}
        	}
        };

        $('#button-save').click(function(){
        	$('#form').validate(toValidate);
        });

/*$('#button-cancel').click(function(){
	//bootbox.close();
    //alert('blaa');
});*/

        script.setAttribute('type', 'text/javascript');


        form.appendChild(script);
	}

}

config_table = new Config_Tables();
