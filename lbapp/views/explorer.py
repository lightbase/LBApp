
from pyramid.view import view_config
from pyramid.view import view_defaults
from lbapp import rest_url
from lbapp.lib import utils
import requests
import json
from pyramid.response import Response
from pyramid.exceptions import HTTPNotFound

@view_defaults(route_name='tmp_storage')
class TemporayStorage():

    def __init__(self, request):
        self.request = request
        self.base_id = self.request.matchdict['id']

    @view_config(request_method='POST')
    def create(self):
        base = requests.get('%s/%s' %(rest_url, self.base_id)).json()
        if base.get('_status'):
            return Response(status=500)
        base_name = base.get('nome_base')

        params = dict(self.request.params)
        files = {params['file'].filename: params['file'].file}
        response = requests.post('%s/%s/doc' %(rest_url, base_name), files=files)
        return Response(response.text, status=response.status_code)

    @view_config(route_name='delete_tmp_storage', request_method='DELETE')
    def delete(self):
        base = requests.get('%s/%s' %(rest_url, self.base_id)).json()
        if base.get('_status'):
            return Response(status=500)
        storage = self.request.matchdict['storage']
        base_name = base.get('nome_base')
        response = requests.delete('%s/%s/doc/%s' % (rest_url, base_name, storage))
        return Response(status=response.status_code)


