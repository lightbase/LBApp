define([
       "jquery", "underscore", "backbone"
      , "views/temp-snippet"
      , "helper/pubsub"
      , "text!templates/app/renderform.html"
], function(
  $, _, Backbone
  , TempSnippetView
  , PubSub
  , _renderForm
){
  return Backbone.View.extend({
    tagName: "fieldset"
    , initialize: function(){
    	console.log("...........................");
      this.collection.on("add", this.render, this);
      this.collection.on("remove", this.render, this);
      this.collection.on("change", this.render, this);
      PubSub.on("mySnippetDrag", this.handleSnippetDrag, this);
      PubSub.on("tempMove", this.handleTempMove, this);
      PubSub.on("tempDrop", this.handleTempDrop, this);
      this.$build = $("#build");
      this.renderForm = _.template(_renderForm);
      this.render();
    }
		
    , render : function() {			
			// Render Snippet Views
			this.$el.empty();
			var that = this;
			var containsFile = false;
			
			//render all fields already defined
			_.each(this.collection.renderAll(), function(snippet) { that.$el.append(snippet); });

			//starting base (object) creation
			var base = JSON.parse('{"metadata":{"file_ext":false,"idx_exp":false,"idx_exp_url":"","idx_exp_time":"0","file_ext_time":"0","name":"","description":"","password":"","color":""}, "content":[]}');
			var obj = this.collection.toJSON();

			// parse form (first element, idx=0)
			console.log('title=' + JSON.stringify(obj[0]["fields"]["name"]));
			base['metadata']['name'] = obj[0]["fields"]["name"]["value"];
			base['metadata']['description'] = obj[0]["fields"]["description"]["value"];
			base['metadata']['password'] = obj[0]["fields"]["password"]["value"];

			// TODO tratar cor, indices (textual, etc...) e campos novos
			// adicionais (que nao estao no banco ainda: size, min, max, etc)

			// parsing fields (first field, idx=1)
			for (i = 1; i < this.collection.length; i++) {
				console.log('FIELDS:::::::::' + JSON.stringify(obj[i]["fields"]));

				var field = {
					"field" : {
						"name" : "",
						"alias" : "",
						"description" : "",
						"datatype" : "",
						"required" : false,
						"multivalued" : false,
						"indices" : []
					}
				};
				
				field['field']['name'] = obj[i]["fields"]["id"]["value"]
				field['field']['alias'] = obj[i]["fields"]["label"]["value"]
				field['field']['description'] = obj[i]["fields"]["description"]["value"]
				field['field']['required'] = obj[i]["fields"]["required"]["value"]
				field['field']['multivalued'] = obj[i]["fields"]["multivalued"]["value"]
				//TODO rever os campos necessarios ... ainda da bug no drag&drop de alguns componentes. 
				//EX: email lança --> Uncaught TypeError: Cannot read property 'value' of undefined
				
				//TODO tratar tipo (datatype) e campos adicionais ...
				
				console.log("FIELD=====" + JSON.stringify(field));

				base["content"].push(field);
			}
			var values = {
					multipart : this.collection.containsFileType(),
					text : _.map(this.collection.renderAllClean(), function(e) {return e.html()}).join("\n"),
					formJSON : JSON.stringify(this.collection.toJSON()),
					baseJSON : JSON.stringify(base)
				};
			
			//descomentar se quiser "ver" o form ... $("#render_form").html(values['text']);
			$("#render").val(that.renderForm(values));
			$("#json_form").html(values['formJSON']);
			$("#json_base").html(values['baseJSON']);

			this.$el.appendTo("#build form");
			this.delegateEvents();
		}

    , getBottomAbove: function(eventY){
      var myFormBits = $(this.$el.find(".component"));
      var topelement = _.find(myFormBits, function(renderedSnippet) {
        if (($(renderedSnippet).position().top + $(renderedSnippet).height()) > eventY  - 90) {
          return true;
        }
        else {
          return false;
        }
      });
      if (topelement){
        return topelement;
      } else {
        return myFormBits[0];
      }
    }

    , handleSnippetDrag: function(mouseEvent, snippetModel) {
      $("body").append(new TempSnippetView({model: snippetModel}).render());
      this.collection.remove(snippetModel);
      PubSub.trigger("newTempPostRender", mouseEvent);
    }

    , handleTempMove: function(mouseEvent){
      $(".target").removeClass("target");
      if(mouseEvent.pageX >= this.$build.position().left &&
          mouseEvent.pageX < (this.$build.width() + this.$build.position().left) &&
          mouseEvent.pageY >= this.$build.position().top &&
          mouseEvent.pageY < (this.$build.height() + this.$build.position().top)){
        $(this.getBottomAbove(mouseEvent.pageY)).addClass("target");
      } else {
        $(".target").removeClass("target");
      }
    }

    , handleTempDrop: function(mouseEvent, model, index){
      if(mouseEvent.pageX >= this.$build.position().left &&
         mouseEvent.pageX < (this.$build.width() + this.$build.position().left) &&
         mouseEvent.pageY >= this.$build.position().top &&
         mouseEvent.pageY < (this.$build.height() + this.$build.position().top)) {
        var index = $(".target").index();
        $(".target").removeClass("target");
        this.collection.add(model,{at: index+1});
      } else {
        $(".target").removeClass("target");
      }
    }    
  })
});
