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
        response = requests.post('%s' %(rest_url), data=dict(request.params))
        if utils.is_integer(response.text):
            return Response(response.text, status=200)
        else:
            return Response(status=500)

    search = {'select': ['nome_base']}
    response = requests.get('%s' %(rest_url), params={'$$': json.dumps(search)}).json()
    if response.get('_status') == 500 or response.get('_status') == 404:
        raise Exception(str(response))

    base_names = response['results']
    return {'base_names': json.dumps(base_names)}

@view_config(route_name='edit_base', renderer='../templates/base/edit.pt')
def edit_base(request):

    if request.params:

        option = request.params['option']
        base_json = request.params['json_base']
        base_id = request.matchdict['base_id']

        if option == 'update':
            params = {'json_base': base_json}
            response = requests.put('%s/%s' %(rest_url, base_id), data=params)
            if response.text == 'UPDATED':
                return Response(status=200)
            else:
                return Response(status=500)
        if option == 'create':
            response = requests.delete('%s/%s' %(rest_url, base_id))
            if response.text == 'DELETED':
                params = {'json_base': base_json}
                response = requests.post('%s' %(rest_url), data=params)
                if utils.is_integer(response.text):
                    return Response(response.text, status=200)
                else:
                    return Response(status=500)
            return Response(status=500)

    base_id = request.matchdict['base_id']
    response = requests.get('%s/%s' %(rest_url, base_id)).json()
    if response.get('_status') == 500 or response.get('_status') == 404:
        raise Exception(str(response))

    base_json = response['json_base']

    return {'base_json': json.dumps(base_json)}

@view_config(route_name='list_base', renderer='../templates/base/list.pt')
def list_base(request):

    if request.method == 'DELETE':
        base_id = request.params['id_base']
        response = requests.delete('%s/%s' %(rest_url, base_id))
        if response.text == 'DELETED':
            return Response(status=200)
        else:
            return Response(status=500)

    response = requests.get('%s?$$={"select":"*"}' %(rest_url)).json()
    results = response['results']
    return {'results': json.dumps(results)}

@view_config(route_name='explore_base', renderer='../templates/base/explore.pt')
def explore_base(request):

    base_id = request.matchdict['base_id']
    response = requests.get('%s/%s' %(rest_url, base_id)).json()
    if response.get('_status') == 500 or response.get('_status') == 404:
        raise Exception(str(response))
    base_name = response['nome_base']
    base_json = response['json_base']
    request.rest_url = rest_url
    request.base_name = base_name

    if request.method == 'POST':
        _method = request.params['method']
        if _method == 'POST':
            id = request.params['pk']
            if id == '':
                data = dict(json_reg = request.params.get('value'))
                response = requests.post('%s/%s/reg' % (rest_url, base_name), data=data)
                if utils.is_integer(response.text):
                    response = requests.get('%s/%s/reg/%s' % (rest_url, base_name, response.text))
            else:
                data = dict(
                    name = request.params.get('name'),
                    value = request.params.get('value')
                )
                response = requests.post('%s/%s/reg/%s/path' % (rest_url, base_name, id), data=data)
            return Response(response.text, status=response.status_code)

        elif _method == 'PUT':
            id = request.params['pk']
            name  = request.params['name']
            if name == '':
                data = dict(json_reg = request.params.get('value'))
                response = requests.put('%s/%s/reg/%s' % (rest_url, base_name, id), data=data)
                if response.text == 'UPDATED':
                    response = requests.get('%s/%s/reg/%s' % (rest_url, base_name, id))
            else:
                data = dict(
                    name = request.params.get('name'),
                    value = request.params.get('value')
                )
                response = requests.put('%s/%s/reg/%s/path' % (rest_url, base_name, id), data=data)
            return Response(response.text, status=response.status_code)

        elif _method == 'DELETE':
            id_reg = request.params['pk']
            if request.params.get('name', None):
                response = requests.delete('%s/%s/reg/%s/path/%s' % (rest_url, base_name, id_reg, request.params['name']))
            else:
                response = requests.delete('%s/%s/reg/%s' % (rest_url, base_name, id_reg))
            return Response(response.text, status=response.status_code)

    response = requests.get('%s/%s/reg' %(rest_url, base_name)).json()
    if response.get('_status') == 500 or response.get('_status') == 404:
        raise Exception(str(response))

    results = response['results']
    registries = [result['json_reg'] for result in results]

    explorer = {
        'json_base': base_json,
        'registries': registries,
    }

    return {'explorer': json.dumps(explorer, ensure_ascii=False)}

@view_config(route_name='config', renderer='../templates/base/config_tables.pt')
def config_base(request):

    if request.method == 'PUT':
        base_json = request.params['json_base']
        base_id = request.params['id_base']
        response = requests.put('%s/%s' %(rest_url, base_id), data={'json_base': base_json})
        if response.text == 'UPDATED':
            return Response(status=200)
        else:
            return Response(status=500)

    return {}
