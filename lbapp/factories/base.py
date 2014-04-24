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

    def list_base(self, **params):
        """ Get all bases 
        """

        iSortCol = self.request.params.get("iSortCol_0")
        iSortDir = self.request.params.get("sSortDir_0")
        sSearch = self.request.params.get("sSearch") or '%'

        columns = {
           '0': 'id_base',
           '1': None,
           '2': 'nome_base',
           '3': None,
           '4': 'dt_base'
        }

        column = columns[iSortCol]
        order_by = None
        if column:
            order_by = {
                iSortDir: [column]
            }

        search = self.get_search(
            select = [
                'id_base',
                'nome_base',
                'json_base',
                'reg_model',
                'dt_base'
            ],
            order_by = order_by,
            limit = params.get('iDisplayLength'),
            offset = params.get('iDisplayStart'),
            literal = "Upper(json_base) like '%"+ sSearch.upper() +"%'"
        )

        """
        iDisplayLength = self.request.params.get("iDisplayLength"),
        iDisplayStart = self.request.params.get("iDisplayStart"),
        sEcho = self.request.params.get("sEcho"),
        iSortCol = self.request.params.get("iSortCol_0"),
        iSortDir = self.request.params.get("sSortDir_0")
        """

        response = self.send_request('get', self.rest_url, params=search).json()
        return {
            "aaData": response['results'],
            "sEcho": params.get('sEcho'),
            "iTotalRecords": response['limit'],
            "iTotalDisplayRecords": response['result_count'],
        }

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

    def get_registries(self, search):
        """ Get all registries 
        """
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

    def update_reg_path(self, id, path, value):
        """ Edit path in registry 
        """
        url = self.to_url(self.rest_url, self.base, 'reg', id, 'path', path)
        response = self.send_request('put', url, data={'value': value})
        return response

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

    def create_json_doc(self, data):
        try:
            response = self.send_request('post', self.rest_url, data=data)
            return ('1')
        except:
            return ('2')

    def create_json_base(self, data):
        response = self.send_request('post', self.rest_url, data=data)
        return response

    def creat_json_reg(self):

        return [ ]
