define([
       "jquery" , "underscore" , "backbone"
       , "collections/snippets" , "collections/my-form-snippets"
       , "views/tab" , "views/my-form"
       , "text!data/input.json", "text!data/radio.json", "text!data/select.json", "text!data/buttons.json"
       , "text!data/custom.json", "text!templates/app/render.html",  "text!templates/app/preview.html", "text!templates/app/about.html", 
], function(
  $, _, Backbone
  , SnippetsCollection, MyFormSnippetsCollection
  , TabView, MyFormView
  , inputJSON, radioJSON, selectJSON, buttonsJSON
  , customJSON, renderTab, previewTab, aboutTab
){
  return {
    initialize: function(){

      //Bootstrap tabs from json.
      new TabView({
        title: "Entrada"
        , collection: new SnippetsCollection(JSON.parse(inputJSON))
      });
      new TabView({
        title: "Radios / Checkboxes"
        , collection: new SnippetsCollection(JSON.parse(radioJSON))
      });
      new TabView({
        title: "Listas"
        , collection: new SnippetsCollection(JSON.parse(selectJSON))
      });
      new TabView({
        title: "Botões"
        , collection: new SnippetsCollection(JSON.parse(buttonsJSON))
      });
      new TabView({
          title: "Custom"
          , collection: new SnippetsCollection(JSON.parse(customJSON))
        });
      new TabView({
        title: "Ver HTML"
        , content: renderTab
      });
      new TabView({
        title: "Sobre"
        , content: aboutTab
      });

      //Make the first tab active!
      $("#components .tab-pane").first().addClass("active");
      $("#formtabs li").first().addClass("active");
      // Bootstrap "My Form" with 'Form Name' snippet.
      new MyFormView({
        title: "Original"
        , collection: new MyFormSnippetsCollection([
          { "title" : "Form Name"
        	  //ao alterar o title deve alterar em my-fom-snippet.js tbm
            , "fields": {
            	"name" : {
            		"label"   : "Nome da Base"
            		, "type"  : "input"
            		, "value" : "Nome da base ..."
            		//TODO , "placeholder" : "......."
            	},
            	"description" : {
            		"label"   : "Descrição"
            		, "type"  : "textarea"
            		, "value" : "..."
            	},
            	"password" : {
            		"label"   : "Senha"
            		, "type"  : "password"
            		, "value" : ""
            	}
            	,
            	"confirmPassword" : {
            		"label"   : "Confirmar Senha"
            		, "type"  : "password"
            		, "value" : ""
            	}
            }
          }
        ])
      });      
    }
  }
});
