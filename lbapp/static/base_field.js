var json ={
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
                }
             ]
          };

function base_field(){
        for ( in json){
            var element = base.create_field(remand=true);
            var to_input = document.getElementById("base-structure");
            to_input.appendChild(element);
            var element_id = element.getAttribute("data-id");
            var input_to_append = "base-context-" + element_id + "-name";
            var field_id = document.getElementById(input_to_append);
            field_id.value = json.content[0].field.name;
        }
}
