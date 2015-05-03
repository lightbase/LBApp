define([ "jquery", "underscore", "backbone", "models/snippet", "collections/snippets", "views/my-form-snippet" ], 
function($, _, Backbone, SnippetModel, SnippetsCollection, MyFormSnippetView) {
	return SnippetsCollection.extend({
		model : SnippetModel,
		initialize : function() {
			this.counter = {};
			this.on("add", this.giveUniqueId);
		},
		giveUniqueId : function(snippet) {
			if (!snippet.get("fresh")) {
				return;
			}
			snippet.set("fresh", false);
			var snippetType = snippet.attributes.fields.id.value;

			if (typeof this.counter[snippetType] === "undefined") {
				this.counter[snippetType] = 0;
			} else {
				this.counter[snippetType] += 1;
			}

			snippet.setField("id", snippetType + "-" + this.counter[snippetType]);

			if (typeof snippet.get("fields")["id2"] !== "undefined") {
				snippet.setField("id2", snippetType + "2-" + this.counter[snippetType]);
			}
		},
		containsFileType : function() {
			return !(typeof this.find(function(snippet) {
				return snippet.attributes.title === "File Button"
			}) === "undefined");
		},
		renderAll : function() {
			return this._render(true);
		},
		renderAllClean : function() {
			return this._render(false);
		},
		_render : function(render){
			return this.map(function(snippet) {
				return new MyFormSnippetView({
					model : snippet
				}).render(render);
			});
		},
		toLightbase : function(){
			// form data is the first element (idx 0)
			var formData = this.at(0);
			var base = {
				"metadata" : {
					"file_ext" : false,
					"idx_exp" : false,
					"idx_exp_url" : "",
					"idx_exp_time" : "0",
					"file_ext_time" : "0",
					"name" : formData.getValue('name'),
					"description" : formData.getValue('description'),
					"password" : formData.getValue('password'),
					"color" : formData.getValue('color')
				},
				"content" : []
			};
			
			// contents begin at idx 1
			for(i=1; i < this.length; i++){
				base['content'].push(this.at(i).toLightbase());
			}
						
			return base;
		}
	});
});
