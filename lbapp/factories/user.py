from lbapp.factories import RequestFactory
from lbapp.exception import RequestError
from lbapp.lib import utils
from lbapp import config as global_config
from pyramid.security import remember
from pyramid.security import forget 
from pyramid.response import Response
import json

USER_PASSWD_INVALID = "Username or password invalid"

class UserFactory(RequestFactory):

    def __init__(self, request):
         self.request = request

    def login(self, **data):
        url_app_user = self.to_url(self.rest_url, '_app_user/doc')
        id_app_user = data['nm_user']
        params = {'$$': '{"select": ["*"],"literal":"id_user=\''+id_app_user+'\'"}'}
        response_app_user = self.send_request('get', url_app_user, params=params)
        print("Resultado busca usuário : " + str(response_app_user.json()))
        list_user = response_app_user.json()['results']
        if list_user:
            user = list_user[0]
            print("User : " + str(user))
            passwd = user['passwd_user']
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
        url = self.to_url(self.rest_url, 'user')
        response = self.send_request('post', url, data=data)
        if utils.is_integer(response.text):
            return response
        else:
            raise RequestError(response.text)

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
