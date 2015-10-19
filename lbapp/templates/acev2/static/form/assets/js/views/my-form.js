define([ "jquery", "underscore", "backbone", "views/temp-snippet", "helper/pubsub", "text!templates/app/renderform.html" ], 
function($, _, Backbone, TempSnippetView, PubSub, _renderForm) {
	return Backbone.View.extend({
		tagName : "fieldset",
		
		initialize : function() {
			this.collection.on("add", this.render, this);
			this.collection.on("remove", this.render, this);
			this.collection.on("change", this.render, this);
			this.collection.on("error", this.showError, this);
			PubSub.on("mySnippetDrag", this.handleSnippetDrag, this);
			PubSub.on("tempMove", this.handleTempMove, this);
			PubSub.on("tempDrop", this.handleTempDrop, this);
			this.$build = $("#build");
			
			$('*').on('mouseenter', function() { hoverElem = this; });
			
			this.renderForm = _.template(_renderForm);
			this.render();
		}, 
		
		render : function() {
            console.log("Evento para ações do mouse");
			// Render Snippet Views
			this.$el.empty();
			var that = this;
			var containsFile = false;

			// render all fields already defined
			_.each(this.collection.renderAll(), function(snippet) {
				that.$el.append(snippet);
			});
			
			// update global var
            //console.log("Estou renderizando o meu form");
			base_form = this.collection.toLightbase();
			console.log("BASE = "+JSON.stringify(base_form));

			// create a dictionary with some values to be rendered
			var values = {
				multipart : this.collection.containsFileType(),
				text : _.map(this.collection.renderAllClean(), function(e) {
					return e.html()
				}).join("\n"),
				formJSON : JSON.stringify(this.collection.toJSON(), null, 3),
				baseJSON : JSON.stringify(base_form, null, 3)
			};

			// descomentar se quiser "ver" o form ...
            console.log("FORM : " + values['text']);
			// $("#renderform").html(values['text']);
			$("#render").val(that.renderForm(values));
			$("#json_form").html(values['formJSON']);
			$("#json_base").html(values['baseJSON']);

			this.$el.appendTo("#build form");
			this.delegateEvents();
		}, 

		getBottomAbove : function(eventY) {
			var myFormBits = $(this.$el.find(".component"));
			var topelement = _.find(myFormBits, function(renderedSnippet) {
				if (($(renderedSnippet).position().top + $(renderedSnippet).height()) > eventY - 90) {
					return true;
				} else {
					return false;
				}
			});
			if (topelement) {
				return topelement;
			} else {
				return myFormBits[0];
			}
		},

		handleSnippetDrag : function(mouseEvent, snippetModel) {
			$("body").append(new TempSnippetView({
				model : snippetModel
			}).render());
			this.collection.remove(snippetModel);
			PubSub.trigger("newTempPostRender", mouseEvent);
		},

		handleTempMove : function(mouseEvent) {
			$(".target").removeClass("target");
			if (mouseEvent.pageX >= this.$build.position().left 
					&& mouseEvent.pageX < (this.$build.width() + this.$build.position().left)
					&& mouseEvent.pageY >= this.$build.position().top 
					&& mouseEvent.pageY < (this.$build.height() + this.$build.position().top)) {
				$(this.getBottomAbove(mouseEvent.pageY)).addClass("target");
			} else {
				$(".target").removeClass("target");
			}
		},
		
		handleTempDrop : function(mouseEvent, model, index) {
			if (mouseEvent.pageX >= this.$build.position().left 
					&& mouseEvent.pageX < (this.$build.width() + this.$build.position().left)
					&& mouseEvent.pageY >= this.$build.position().top 
					&& mouseEvent.pageY < (this.$build.height() + this.$build.position().top)) {
				var index = $(".target").index();
				$(".target").removeClass("target");
				this.collection.add(model, {
					at : index + 1
				});
			} else {
				$(".target").removeClass("target");
			}
		},
		
		showError: function (model, error) {
		    console.log("ERROR: "+error+". MODEL="+JSON.stringify(model));
		}
		
	})
});
