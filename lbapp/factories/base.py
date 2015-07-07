import requests
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
        params = {'$$': '{"select": ["name"]}'}
        response = self.send_request('get', self.rest_url, params=params)
        return response.json()['results']


    def list_base(self, **params):
        """ Get all bases from the logged user
        """
        def get_filter_bases_user(bases_user):
            str_bases_user = str(list_bases_user).replace('[','(').replace(']',')')
            filter_bases_user = "name in "+ str_bases_user + "and "
            return filter_bases_user

        def get_bases_user(app_user):
            '''
            Get users' bases
            '''
            list_bases_user = []
            bases_user = app_user.get('bases_user', [])
            print("bases  : " + str(bases_user))
            access_base_user = dict()
            if bases_user is not None:
                for b in bases_user:
                    access_base_user[b['name_base']] = b['access_groups']
                    if access_base_user.__len__() == 0:
                        print("bases_user not defined")
                    self.request.session['bases_user'] = list(access_base_user.keys())
                    list_bases_user = list(access_base_user.keys())
                print("bases  : " + str(list_bases_user))
                return list_bases_user
            else:
                print("User don't have bases")
                return []

        iSortCol = self.request.params.get("iSortCol_0")
        iSortDir = self.request.params.get("sSortDir_0")
        sSearch = self.request.params.get("sSearch") or '%'

        app_user = self.request.session.get('app_user', None)
        print("Usuário sessão : " + str(app_user))
        list_bases_user = get_bases_user(app_user)
        filter_bases_user = ""
        if list_bases_user:
            filter_bases_user = get_filter_bases_user(list_bases_user)
        else:
            return {
                "aaData": [],
                "sEcho": params.get('sEcho', None),
            }

        columns = {
           '0': 'id_base',
           '1': None,
           '2': 'name',
           '3': None,
           '4': 'dt_base'
        }

        column = columns[iSortCol]
        order_by = None
        if column:
            order_by = {
                iSortDir: [column]
            }
        #TODO : Alterar
        #limit = params.get('iDisplayLength'),
        limit = 100


        search = self.get_search(
            order_by = order_by,
            limit = limit,
            offset = params.get('iDisplayStart'),
            literal = filter_bases_user + " upper(struct) like '%"+ sSearch.upper() +"%'"
        )

        response = self.send_request('get', self.rest_url, params=search).json()
        results = response['results']
        return {
            "aaData": results,
            "sEcho": params.get('sEcho'),
            "iTotalRecords": response['limit'],
            "iTotalDisplayRecords": response['result_count']
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
        return self.send_request('get', self.to_url(self.rest_url, self.base, 'doc', id, attr))

    def get_registries(self, search):
        """ Get all registries 
        """
        response = self.send_request('get', self.to_url(self.rest_url, self.base, 'doc'), params=search)
        return response.json()

    def create_registry(self, data):
        """ Create registry 
        """
        response = self.send_request('post', self.to_url(self.rest_url, self.base, 'doc'), data=data)
        if utils.is_integer(response.text):
            return response
        else:
            raise RequestError(response.text)

    def create_registry_path(self, id, path, data):
        """ Create path in registry 
        """
        url = self.to_url(self.rest_url, self.base, 'doc', id, 'path', path)
        response = self.send_request('post', url, data=data)
        return response

    def edit_registry(self, id, data):
        """ Edit registry 
        """
        response = self.send_request('put', self.to_url(self.rest_url, self.base, 'doc', id), data=data)
        if response.text == 'UPDATED':
            return response
        else:
            raise RequestError(response.text)

    def update_reg_path(self, id, path, value):
        """ Edit path in registry 
        """
        url = self.to_url(self.rest_url, self.base, 'doc', id, 'path', path)
        response = self.send_request('put', url, data={'value': value})
        return response

    def edit_registry_path(self, id, path, data):
        """ Edit path in registry 
        """
        url = self.to_url(self.rest_url, self.base, 'doc', id, 'path', path)
        response = self.send_request('put', url, data=data)
        return response

    def delete_registry(self, id):
        """ Delete registry 
        """
        response = self.send_request('delete', self.to_url(self.rest_url, self.base, 'doc', id))
        if response.text == 'DELETED':
            return response
        else:
            raise RequestError(response.text)

    def delete_registry_path(self, id, path):
        """ Delete path in registry 
        """
        url = self.to_url(self.rest_url, self.base, 'doc', id, 'path', path)
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

    def download_doc(self, base):
        url = self.to_url(self.rest_url, base)
        response = requests.get(url)
        return response.text
