from lbapp.factories import RequestFactory
from lbapp.exception import RequestError
from lbapp.lib import utils
from lbapp import config as global_config
from pyramid.security import remember
from pyramid.security import forget 
from pyramid.response import Response
import ast
import json
import datetime

USER_PASSWD_INVALID = "Username or password invalid"

class UserFactory(RequestFactory):

    def __init__(self, request):
         self.request = request

    def get_url_base_user(self):
        return self.to_url(self.rest_url, '_app_user/doc')

    def get_user(self, id_app_user):
        try:
            url_app_user = self.get_url_base_user()
            params = {'$$': '{"select": ["*"],"literal":"id_user=\''+id_app_user+'\'"}'}
            response_app_user = self.send_request('get', url_app_user, params=params)
            print("Resultado busca usuário : " + str(response_app_user.json()))
            list_user = response_app_user.json()['results']
            if list_user:
                user = list_user[0]
                print("User : " + str(user))
                return user
            else:
                return None
        except Exception as e:
            print("Erro ao buscar usuário : " + str(e))
            return None

    def login(self, **data):
        id_app_user = data['nm_user']
        user = self.get_user(id_app_user)
        if user:
            passwd = user.get('passwd_user', '')
            if passwd == data['passwd_user']:
                headers = remember(self.request, id_app_user)
                self.request.session['id_app_user'] = id_app_user
                self.request.session['app_user'] = user
                self.request.session.changed()
                return Response('OK', headers=headers)
            else:
                raise RequestError(USER_PASSWD_INVALID)
        else:
            raise RequestError(USER_PASSWD_INVALID)

    def logout(self, **data):
        headers = forget(self.request)
        if 'id_app_user' in self.request.session:
            del self.request.session['id_app_user']
        if 'app_user' in self.request.session:
            del self.request.session['app_user']
        self.request.session.changed()
        return Response(charset='utf8', headers=headers)

    def register(self, **data):
        today = datetime.date.today()
        data['creation_date_user'] = today.strftime("%d/%m/%Y")
        data['status_user'] = True
        groups = []
        #TODO Configurar grupo padrão para criação de usuário
        groups.append('admin_base')
        data['groups_user'] = groups
        newData = dict()
        newData['value'] = json.dumps(data)
        url = self.to_url(self.rest_url, '_app_user/doc')
        print("Data a ser enviado : " + str(newData))
        response = self.send_request('post', url, data=newData)
        if utils.is_integer(response.text):
            return response
        else:
            raise RequestError(response.text)

    def update_base_user(self, id_app_user, name_base, access_group=None):
        user = self.get_user(id_app_user)
        if user is None:
           raise RequestError("Usuário não existe!")
        bases_user = user.get('bases_user', [])
        metadata_user = user['_metadata']
        id_doc = metadata_user['id_doc']
        created_base = {'access_groups' : [access_group], 'name_base' : name_base}
        bases_user.append(created_base)
        user['bases_user'] = bases_user
        print("User a ser atualizado : " + str(user))

        #Atualiza user
        responseUser = self.send_request('put', self.get_url_base_user() + '/' + str(id_doc), data={'value': json.dumps(user)})
        name_bases_user = self.request.session.get('bases_user', [])
        name_bases_user.append(name_base)
        self.request.session['app_user'] = user

    def get_profile(self, user):
        url = self.to_url(self.rest_url, 'user', user)
        response = self.send_request('get', url)
        return response.json()

    def put_profile(self, user, **data):
        url = self.to_url(self.rest_url, 'user', user)
        response = self.send_request('put', url, data=data)
        if utils.is_integer(response.text):
            return response
        else:
            raise RequestError(respnse.text)
