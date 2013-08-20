var json_base ={
             "metadata":{
                "name":"asdf",
                "description":"dgh",
                "index_url":"",
                "index_time":"0",
                "extract_time":"0",
                "doc_extract":false,
                "index_export":false
             },
             "content":[
                {
                   "field":{
                      "name":"a",
                      "description":"a",
                      "datatype":"AlfaNumerico",
                      "required":false,
                      "multivalued":false,
                      "indices":[
                         "Nenhum"
                      ]
                   }
                },
                {
                   "field":{
                      "name":"d",
                      "description":"d",
                      "datatype":"AlfaNumerico",
                      "required":false,
                      "multivalued":false,
                      "indices":[
                         "Nenhum"
                      ]
                   }
                },
                {
                   "group":{
                      "metadata":{
                         "name":"d",
                         "description":"d",
                         "multivalued":false
                      },
                      "content":[
                         {
                            "field":{
                               "name":"b",
                               "description":"b",
                               "datatype":"AlfaNumerico",
                               "required":false,
                               "multivalued":false,
                               "indices":[
                                  "Nenhum"
                               ]
                            }
                         },
                         {
                            "field":{
                               "name":"c",
                               "description":"c",
                               "datatype":"AlfaNumerico",
                               "required":false,
                               "multivalued":false,
                               "indices":[
                                  "Nenhum"
                               ]
                            }
                         }
                      ]
                   }
                },
                {
                   "field":{
                      "name":"e",
                      "description":"e",
                      "datatype":"AlfaNumerico",
                      "required":false,
                      "multivalued":false,
                      "indices":[
                         "Nenhum"
                      ]
                   }
                },
             ]
          };

function base_field(){
var element = base.create_field(remand=true);
var to_input = document.getElementById("base-structure");
var element_id = element.getAttribute("data-id");
var input_to_append = "base-context-" + element_id + "-name";
var field_id = document.getElementById(input_to_append);
        $.each(json, function(k, v){
            if (k == "content"){
                $.each(v, function(k, v){
                    $.each(v, function(k, v){
                        if (k == "field"){
                            console.log(JSON.stringify(v));
                            element = base.create_field(remand=true);
                            to_input = document.getElementById("base-structure");
                            to_input.appendChild(element);
                            element_id = element.getAttribute("data-id");
                            name_to_append = "base-context-" + element_id + "-name";
                            desc_to_append = "base-context-" + element_id + "-description";
                            field_name = document.getElementById(name_to_append);
                            field_desc = document.getElementById(desc_to_append);
                            field_name.value = v.name;
                            field_desc.value = v.description;
                        }else if (k == "group"){
                           base_group(k, v);
                        }
                    });
                });
            }
        });
}

function base_group(k, v){
    $.each(v.content, function(k, v){
        $.each(v, function(k, v){
            if (k == "field"){
            }
        });
    });
}


var name_field_id = function(data_id){
}
var description_field_id = function(data_id){
}
var datatype_field_id = function(data_id){
}
var multivalued_field_id = function(data_id){
}
var required_field_id = function(data_id){
}
var indices_field_id = function(data_id){
}


var build_base = function(json_base){
    var data,
        depth = 0,
        list  = this;
        step  = function(content, depth){
            var field;    

            $(content).each(function(){
                if(this.field){
                    field = base.create_field(remand=true);
                    //console.log(field);
                }
                else if(this.group){
                    step(this.group.content, depth + 1);
                }
            }); 
        };  
                
    data = step(json_base.content, depth);
    return data;
};
//build_base(json_base)








////////////////////////////////////////////////

            /*if (k == "content"){
            console.log(JSON.stringify(k) + JSON.stringify(v));
            }*/

            /*if("field" in v){
                var element = base.create_field(remand=true);
                var to_input = document.getElementById("base-structure");
                to_input.appendChild(element);
                var element_id = element.getAttribute("data-id");
                var input_to_append = "base-context-" + element_id + "-name";
                var field_id = document.getElementById(input_to_append);
             //   field_id.value = JSON.stringify(v.field.name);
                console.log(JSON.stringify(k) + ":" + JSON.stringify(v));
            }*/

            /*if("group" in v){
                var element = base.create_field(remand=true);
                var to_input = document.getElementById("base-structure");
                to_input.appendChild(element);
                var element_id = element.getAttribute("data-id");
                var input_to_append = "base-context-" + element_id + "-name";
                var field_id = document.getElementById(input_to_append);
                //field_id.value = JSON.stringify(v.content.group.name);
            }
            console.log(JSON.stringify(v.group));*/
