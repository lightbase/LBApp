define([ "jquery", "underscore", "backbone", 
         "collections/snippets", "collections/my-form-snippets", 
         "views/tab", "views/my-form", 
         "text!data/fields.json", "text!data/groups.json", 
         "text!data/arquivos.json",
         "text!templates/app/render.html" 
],function($, _, Backbone, SnippetsCollection, 
		MyFormSnippetsCollection, 
		TabView, MyFormView, 
		fieldsJSON, groupsJSON, 
		arquivosJSON,
		renderTab) {
	return {
		initialize : function() {
            console.log("Montando campos..");
            console.log("Campos : " + JSON.parse(fieldsJSON));
			// Bootstrap tabs from json.
			new TabView({
				title : "Campos",
				collection : new SnippetsCollection(JSON.parse(fieldsJSON))
			});
			new TabView({
				title : "Arquivos",
				collection : new SnippetsCollection(JSON.parse(arquivosJSON))
			});

			new TabView({
				title : "Grupos",
				collection : new SnippetsCollection(JSON.parse(groupsJSON))
			});
            /*
			new TabView({
				title : "Padrão",
				collection : new SnippetsCollection(JSON.parse(defaultJSON))
			});
			*/
			new TabView({
				title : "Ver HTML",
				content : renderTab
			});

			// Make the first tab active!
			$("#components .tab-pane").first().addClass("active");
			$("#formtabs li").first().addClass("active");
			
			// Bootstrap "My Form" with 'Form Name' snippet.
			new MyFormView({
				title : "Original",
				collection : new MyFormSnippetsCollection([ {
					"title" : "Form Name"
					// ao alterar o title deve alterar em my-fom-snippet.js tbm
					,
					"fields" : {
						"name" : {
							"label" : "Nome da Base",
							"type" : "input",
							"value" : "Nome da base ..."
						// "placeholder" : "......."
						},
						"description" : {
							"label" : "Descrição",
							"type" : "textarea",
							"value" : "..."
						},
						"password" : {
							"label" : "Senha",
							"type" : "password",
							"value" : ""
						},
						"confirmPassword" : {
							"label" : "Confirmar Senha",
							"type" : "password",
							"value" : ""
						},
						"color" : {
							"label" : "Cor",
							"type" : "color",
							"value" : ""
						}
					}
				} ])
			});//end new MyFormView
			
		}//end initialize
	}
});
