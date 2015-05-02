define([ 'jquery', 'underscore', 'backbone' ], function($, _, Backbone) {
	return Backbone.Model.extend({
		initialize : function() {
			this.set("fresh", true);
		},
		defaults : {
			"metadata" : {
				"file_ext" : false,
				"idx_exp" : false,
				"idx_exp_url" : "",
				"idx_exp_time" : "0",
				"file_ext_time" : "0",
				"name" : "",
				"description" : "",
				"password" : "",
				"color" : ""
			},
			"content" : []
		},
		setData : function (collection){
			var obj = collection.toJSON();
			this.setMetadata(obj[0]["fields"]);
			this.setContent(obj, collection.length);
		},
		setMetadata : function(form){
			//console.log('metadata=' + JSON.stringify(form["name"]));
			var _meta = this.get('metadata');			
			//console.log("name="+ form["name"]["value"]);
			_meta['name'] = form["name"]["value"];			
			_meta['description'] = form["description"]["value"];
			_meta['password'] = form["password"]["value"];
			_meta['color'] = form["color"]["value"];
			this.set('metadata', _meta);
			//console.log('metadata_apos=' + JSON.stringify(this.get('metadata')));
		}, 
		setContent : function(obj,size){
			var fields = new Array();
			for (i = 1; i < size; i++) {
				//console.log('FIELDS:::::::::' + JSON.stringify(obj[i]["fields"]));

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
								
				if(obj[i]["fields"]["indices"] != undefined){
					var value = obj[i]["fields"]["indices"]["value"];
					var lista = value.split(',');
					for(j=0; j < lista.length; j++){
						var split = lista[j].split(":");
						if(split[1] == "true"){
							field['field']['indices'].push(split[0]);
						}
					}
				}
				
				field['field']['name'] = obj[i]["fields"]["id"]["value"]
				field['field']['alias'] = obj[i]["fields"]["label"]["value"]
				field['field']['datatype'] = obj[i]["fields"]["datatype"]["value"]
				field['field']['description'] = obj[i]["fields"]["description"]["value"]				
				field['field']['multivalued'] = obj[i]["fields"]["multivalued"]["value"]
				
				if(obj[i]["fields"]["required"] != undefined){
					field['field']['required'] = obj[i]["fields"]["required"]["value"]
				}
				
				//TODO rever os campos necessarios ... ainda da bug no drag&drop de alguns componentes. 
				//EX: email lança --> Uncaught TypeError: Cannot read property 'value' of undefined
				
				//TODO tratar campos adicionais ...

				fields.push(field);
			}			
			this.set("content", fields);
		}/*,
		validate: function (attrs) {
	        //console.log('validating base: '+JSON.stringify(attrs));
	        var errors = [];
	        
	        //validate base values
	        var meta = attrs['metadata'];
	        
	        if(! this.validateString(meta['name'])){
	        	//console.log('base name error ...');
	        	errors.push({name: 'name', message: 'O nome da base é obrigatório'});
	        }
	        
	        if(! this.validateString(meta['password'])){
	        	//console.log('base name error ...');
	        	errors.push({name: 'name', message: 'A senha é obrigatória'});
	        }
	        
	        
	        //validate fields

	        
	        
	        return errors.length > 0 ? errors : false;
	        //return "Erro ... nome da base"
	        
	    }, 
	    validateString: function (value){
	        if(value == null || value == ''){
	        	return false;
	        }
		}*/
/*
		validate : function(attrs) {
			if (!attrs.email) {
				return 'Please fill email field.';
			}
			if (!attrs.feedback) {
				return 'Please fill feedback field.';
			}
		}

		,
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
		},*/

	});
});
