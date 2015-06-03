define([
       "jquery", "underscore", "backbone",
       "views/snippet", "views/temp-snippet",
       "helper/pubsub"
], function(
  $, _, Backbone,
  SnippetView, TempSnippetView,
  PubSub
){
  return SnippetView.extend({
    events:{
      "click"   : "preventPropagation" //stops checkbox / radio reacting.
      , "mousedown" : "mouseDownHandler"
      , "mouseup"   : "mouseUpHandler"
    }

    , mouseDownHandler : function(mouseDownEvent){
      mouseDownEvent.stopPropagation();
      mouseDownEvent.preventDefault();
      var that = this;
      //popover
      $(".popover").remove();
      this.$el.popover("show");
      $(".popover #save").on("click", this.saveHandler(that));
      $(".popover #cancel").on("click", this.cancelHandler(that));
      //add drag event for all but form name
      if(this.model.get("title") !== "Form Name"){
        $("body").on("mousemove", function(mouseMoveEvent){
          if(
            Math.abs(mouseDownEvent.pageX - mouseMoveEvent.pageX) > 10 ||
            Math.abs(mouseDownEvent.pageY - mouseMoveEvent.pageY) > 10
          ){
            that.$el.popover('destroy');
            PubSub.trigger("mySnippetDrag", mouseDownEvent, that.model);
            that.mouseUpHandler();
          };
        });
      }
    }

    , preventPropagation: function(e) {
      e.stopPropagation();
      e.preventDefault();
    }

    , mouseUpHandler : function(mouseUpEvent) {
        $("body").off("mousemove");
    }

		    ,
		saveHandler : function(boundContext) {
			return function(mouseEvent) {
				mouseEvent.preventDefault();
				var fields = $(".popover .field");
				_.each(fields, function(e) {

					var $e = $(e), 
						type = $e.attr("data-type"), 
						name = $e.attr("id");

					//TODO The placeholder attribute works with the following input types: text, search, url, tel, email, and password.

					switch (type) {
						/*case "input":
						case "number":
						case "password":
							TODO var placeholder = $e.attr("placeholder");
							console.log("placeholder="+placeholder);
							boundContext.model.setField(name, $e.val());
							break;*/
						case "checkbox":
							boundContext.model.setField(name, $e.is(":checked"));
							break;
						case "textarea-split":
							boundContext.model.setField(name, 
							_.chain($e.val().split("\n"))
							  .map(function(t) {
								return $.trim(t)
							}).filter(function(t) {
								return t.length > 0
							}).value());
							break;
						case "select":
							var valarr = _.map($e.find("option"), function(e) {
								return {
									value : e.value,
									selected : e.selected,
									label : $(e).text()
								};
							});
							boundContext.model.setField(name, valarr);
							break;
						//comportamento default para: input, password e textarea.
						//todos os campos que possuem comportamento diferente do default,
						//devem ter uma clausula case especifica
						default:
							boundContext.model.setField(name, $e.val());
					}
				});
				boundContext.model.trigger("change");
				$(".popover").remove();
			}
		}

    , cancelHandler : function(boundContext) {
      return function(mouseEvent) {
        mouseEvent.preventDefault();
        $(".popover").remove();
        boundContext.model.trigger("change");
      }
    }

  });
});
