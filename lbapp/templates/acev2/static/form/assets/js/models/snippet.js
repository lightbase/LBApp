define([ 'jquery', 'underscore', 'backbone' ], 
function($, _, Backbone) {
	return Backbone.Model.extend({
		initialize : function() {
			this.set("fresh", true);
		},
		getValues : function() {
			return _.reduce(this.get("fields"), function(o, v, k) {
				if (v["type"] == "select") {
					o[k] = _.find(v["value"], function(o) {
						return o.selected
					})["value"];
				} else {
					o[k] = v["value"];
				}
				return o;
			}, {});
		},
		idFriendlyTitle : function() {
			return this.get("title").replace(/\W/g, '').toLowerCase();
		},
		setField : function(name, value) {
			var fields = this.get("fields")
			fields[name]["value"] = value;
			this.set("fields", fields);
		},
		getField : function(name) {
			var fields = this.get("fields")
			return fields[name];
		},
		getValue : function(fieldName){
			var field = this.getField(fieldName);
			var value = null;
			if(field !== undefined){
				value = field['value'];
			}
			return value;
		},
		toLightbase : function(){
			/*var field = {
				"field" : {
					"name" : this.getField("id")["value"],
					"alias" : this.getField("label")["value"],
					"description" : this.getField("description")["value"],
					"datatype" : this.getField("datatype")["value"],
					"required" : false,
					"multivalued" : this.getField("multivalued")["value"],
					"indices" : []
				}
			};	*/			
			
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
						
			//obrigatory fields
			field['field']['name'] = this.getValue("id");
			field['field']['alias'] = this.getValue("label");
			field['field']['datatype'] = this.getValue("datatype");
			field['field']['description'] = this.getValue("description");			
			field['field']['multivalued'] = this.getValue("multivalued");
			
			if(this.getField("required") != undefined){
				field['field']['required'] = this.getValue("required")
			}
			
			if(this.getField("indices") != undefined){
				var value = this.getValue("indices");
				var lista = value.split(',');
				for(j=0; j < lista.length; j++){
					var split = lista[j].split(":");
					if(split[1] == "true"){
						field['field']['indices'].push(split[0]);
					}
				}
			}
			
			return field;
		},
		fromLightbase : function(field){
			//TODO
		},
		validate: function (attrs) {
			if(!attrs.fresh){
				console.log("validating: "+JSON.stringify(attrs));
				var errors = validateSnippet(attrs);
				if(errors.length > 0){				
					for(i=0;i<errors.length;i++){
						console.log("ERRO: "+errors[i]);
					}
					return errors;
				}	
			}
						
	    }
	});
});
