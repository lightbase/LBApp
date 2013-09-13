from pyramid.view import view_config
from lbapp import rest_url
from lbapp.lib import utils
import requests
import json
from pyramid.response import Response
from pyramid.exceptions import HTTPNotFound

@view_config(route_name='create_base', renderer='../templates/base/new.pt')
def create_base(request):
    if request.params:
        response = requests.post('%s/base' %(rest_url), params=request.params)
        try:
            int(response.text)
            return Response(response.text, status=200)
        except:
            return Response(status=500)

    search = {'select': ['nome_base']}
    response = requests.get('%s/base' %(rest_url), params={'$$': json.dumps(search)}).json()
    if response.get('_status') == 500 or response.get('_status') == 404:
        raise Exception(str(response))

    base_names = response['results']
        
    return {'base_names': json.dumps(base_names)}

@view_config(route_name='edit_base', renderer='../templates/base/edit.pt')
def edit_base(request):

    if request.params:
        base_json = request.params['json_base']
        base_id = request.matchdict['base_id']
        params = {'json_base': base_json}
        response = requests.put('%s/base/%s' %(rest_url, base_id), params=params)
        if response.text == 'UPDATED':
            return Response(status=200)
        else:
            return Response(status=500)

    base_id = request.matchdict['base_id']
    response = requests.get('%s/base/%s' %(rest_url, base_id)).json()
    if response.get('_status') == 500 or response.get('_status') == 404:
        raise Exception(str(response))
        
    base_json = response['json_base']

    return {'base_json': json.dumps(base_json)}

@view_config(route_name='list_base', renderer='../templates/base/list.pt')
def list_base(request):
    if request.params:
        base_id = request.params['id_base']
        response = requests.delete('%s/base/%s' %(rest_url, base_id))
        if response.text == 'DELETED':
            return Response(status=200)
        else:
            return Response(status=500)
    response = requests.get('%s/base?$$={"select":"*"}' %(rest_url)).json()
    result = response['results']
    return {'r': json.dumps(result)}

@view_config(route_name='explore_base', renderer='../templates/base/explore.pt')
def explore_base(request):

        
    base_id = request.matchdict['base_id']
    response = requests.get('%s/base/%s' %(rest_url, base_id)).json()
    if response.get('_status') == 500 or response.get('_status') == 404:
        raise Exception(str(response))
    base_name = response['nome_base']
    base_json = response['json_base']

    if request.params:
        id_reg = request.params['pk']
        params = dict(
            path = request.params.get('name'),
            value = request.params.get('value')
        )
        response = requests.post('%s/reg/%s/%s/sharp' % (rest_url, base_name, id_reg), params=params)
        if response.text == 'UPDATED':
            return Response(status=200)
        else:
            return Response(status=500)

    response = requests.get('%s/reg/%s' %(rest_url, base_name)).json()
    if response.get('_status') == 500 or response.get('_status') == 404:
        raise Exception(str(response))
    
    results = response['results']
    registries = [result['json_reg'] for result in results]

    explorer = {
        'json_base': base_json,
        'registries': registries,
    }

    return {'explorer': json.dumps(explorer, ensure_ascii=False)}




