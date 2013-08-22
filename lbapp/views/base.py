from pyramid.view import view_config
from lbapp import rest_url
import requests
import json
from pyramid.response import Response

@view_config(route_name='create_base', renderer='../templates/base/new.pt')
def create_base(request):
    if request.params:
        response = requests.post('%s/base' %(rest_url), params=request.params)
        try:
            int(response.text)
            return Response(response.text, status=200)
        except:
            return Response(status=500)
        
    return {'json_base': 'json_base'}

@view_config(route_name='edit_base', renderer='../templates/base/edit.pt')
def edit_base(request):

    if request.params:
        base_json = request.params['json_base']
        base_id = request.matchdict['base_id']
        params = dict(
            json_base = base_json,
        )
        response = requests.put('%s/base/%s' %(rest_url, base_id), params=params)
        if response.text == 'UPDATED':
            return Response(status=200)
        else:
            return Response(status=500)

    base_id = request.matchdict['base_id']
    response = requests.get('%s/base/%s' %(rest_url, base_id)).json()
    base_json = response['json_base']

    return {'base_json': json.dumps(base_json)}

@view_config(route_name='list_base', renderer='../templates/base/list.pt')
def list_base(request):
    response = requests.get('%s/base' %(rest_url), params=request.params).json()
    result = response['results']
    return {'r': json.dumps(result)}



