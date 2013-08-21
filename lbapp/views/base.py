from pyramid.view import view_config
from lbapp import rest_url
import requests
import json
from pyramid.response import Response

@view_config(route_name='create_base', renderer='../templates/base/new.pt')
def create_base(request):
    if request.params:
        response = requests.post('%s/base' %(rest_url), params=request.params).json()
        if response.get('_status') == 500:
            return Response(status=500)
        
    return {'json_base': 'json_base'}

@view_config(route_name='edit_base', renderer='../templates/base/edit.pt')
def edit_base(request):

    base_name = request.matchdict['base_name']
    search = '{"select": ["json_base"], "literal": "nome_base=\'%s\'"}' %(base_name)

    params = {'$$': search}
    response = requests.get('%s/base' %(rest_url), params=params).json()
    
    base_json = response['results'][0]['json_base']
    return {'base_json': json.dumps(base_json)}

@view_config(route_name='list_base', renderer='../templates/base/list.pt')
def list_base(request):
    return {'json_base': 'json_base'}



