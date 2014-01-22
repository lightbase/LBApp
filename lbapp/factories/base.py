
from lbapp.factories import RequestFactory
from lbapp.exception import RequestError
from lbapp.lib import utils

class BaseFactory(RequestFactory):

    def __init__(self, request):
        self.request = request
        self.base = self.request.matchdict.get('base') or self.request.params.get('base')

    def get_bases(self):
        """ Get list of bases names
        """
        params = {'$$': '{"select": ["nome_base"]}'}
        response = self.send_request('get', self.rest_url, params=params)
        return response.json()['results']

    def list_base(self):
        """ Get all bases 
        """
        params = {'$$': '{"select":"*"}'}
        response = self.send_request('get', self.rest_url, params=params)
        return response.json()['results']

    def get_base(self, attr=None):
        """ Get base attributes 
        """
        return self.send_request('get', self.to_url(self.rest_url, self.base, attr))

    def create_base(self, data):
        """ Create base
        """
        response = self.send_request('post', self.rest_url, data=data)
        if utils.is_integer(response.text):
            return response
        else:
            raise RequestError(response.text)

    def edit_base(self, data):
        """ Update base
        """
        url = self.to_url(self.rest_url, self.base)
        response = self.send_request('put', url, data=data)
        if response.text == 'UPDATED':
            return response
        else:
            raise RequestError(response.text)

    def delete_base(self):
        """ Delete base
        """
        url = self.to_url(self.rest_url, self.base)
        response = self.send_request('delete', url)
        if response.text == 'DELETED':
            return response
        else:
            raise RequestError(response.text)

    def get_registry(self, id, attr=None):
        """ Get registry attributes
        """
        return self.send_request('get', self.to_url(self.rest_url, self.base, 'reg', id, attr))

    def get_registries(self):
        """ Get all registries 
        """
        search = {'$$': '{"select":["json_reg"]}'}
        response = self.send_request('get', self.to_url(self.rest_url, self.base, 'reg'), params=search)
        return response.json()

    def create_registry(self, data):
        """ Create registry 
        """
        response = self.send_request('post', self.to_url(self.rest_url, self.base, 'reg'), data=data)
        if utils.is_integer(response.text):
            return response
        else:
            raise RequestError(response.text)

    def create_registry_path(self, id, path, data):
        """ Create path in registry 
        """
        url = self.to_url(self.rest_url, self.base, 'reg', id, 'path', path)
        response = self.send_request('post', url, data=data)
        return response

    def edit_registry(self, id, data):
        """ Edit registry 
        """
        response = self.send_request('put', self.to_url(self.rest_url, self.base, 'reg', id), data=data)
        if response.text == 'UPDATED':
            return response
        else:
            raise RequestError(response.text)

    def edit_registry_path(self, id, path, data):
        """ Edit path in registry 
        """
        url = self.to_url(self.rest_url, self.base, 'reg', id, 'path', path)
        response = self.send_request('put', url, data=data)
        return response

    def delete_registry(self, id):
        """ Delete registry 
        """
        response = self.send_request('delete', self.to_url(self.rest_url, self.base, 'reg', id))
        if response.text == 'DELETED':
            return response
        else:
            raise RequestError(response.text)

    def delete_registry_path(self, id, path):
        """ Delete path in registry 
        """
        url = self.to_url(self.rest_url, self.base, 'reg', id, 'path', path)
        response = self.send_request('delete', url)
        return response
